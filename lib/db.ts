import fs from "fs";
import path from "path";

export interface Enquiry {
  id: string;
  name: string;
  phone: string;
  email: string;
  program: "defence" | "defense" | "scholars" | "juniors" | "general" | "nda" | "cds" | "afcat" | string;
  source: "contact_page" | "orientation_modal" | "assessment_call" | "manual_entry" | string;
  message: string;
  status: "new" | "contacted" | "in_progress" | "enrolled" | "archived";
  notes?: string;
  createdAt: string;
}

export interface UserAccount {
  uid: string;
  email: string;
  displayName: string;
  role: "admin" | "user" | string;
  rollNumber: string;
  authProvider?: "google.com" | "password" | string;
  phone?: string;
  targetExam?: string;
  createdAt: string;
  lastLogin: string;
}

export interface LoginLog {
  id: string;
  email: string;
  role: string;
  status: "success" | "failed";
  authProvider?: string;
  ip?: string;
  userAgent?: string;
  timestamp: string;
}

export interface TrafficLog {
  id: string;
  path: string;
  userEmail?: string;
  role?: string;
  ip?: string;
  userAgent?: string;
  referrer?: string;
  timestamp: string;
}

export interface DatabaseSchema {
  enquiries: Enquiry[];
  users: UserAccount[];
  login_logs: LoginLog[];
  traffic_logs?: TrafficLog[];
}

const LOCAL_DB_DIR = path.join(process.cwd(), "data");
const LOCAL_DB_FILE = path.join(LOCAL_DB_DIR, "database.json");

const FIREBASE_PROJECT_ID = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "os-web-1cc80";
const FIREBASE_API_KEY = process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyCjC7CXHnESi9GBXNrxiN2PkLLVne-w3k4";
const FIREBASE_DATABASE_ID = process.env.FIREBASE_DATABASE_ID || "default";
const FIRESTORE_BASE_URL = `https://firestore.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}/databases/${FIREBASE_DATABASE_ID}/documents`;

/**
 * Checks whether the current runtime environment is a serverless platform (e.g. Vercel).
 */
export function isServerlessEnv(): boolean {
  return Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME || process.env.VERCEL_ENV);
}

/**
 * Custom error thrown when persistent Cloud Firestore cannot be reached or is disabled.
 */
export class DatabasePersistenceError extends Error {
  public code: string;
  public activationUrl: string;

  constructor(message: string, code = "DB_PERSISTENCE_ERROR") {
    super(message);
    this.name = "DatabasePersistenceError";
    this.code = code;
    this.activationUrl = `https://console.firebase.google.com/project/${FIREBASE_PROJECT_ID}/firestore`;
  }
}

// --- Firestore REST Serialization Helpers ---

function toFirestoreValue(val: any): any {
  if (val === null || val === undefined) return { nullValue: null };
  if (typeof val === "string") return { stringValue: val };
  if (typeof val === "boolean") return { booleanValue: val };
  if (typeof val === "number") {
    if (Number.isInteger(val)) return { integerValue: String(val) };
    return { doubleValue: val };
  }
  if (Array.isArray(val)) {
    return { arrayValue: { values: val.map(toFirestoreValue) } };
  }
  if (typeof val === "object") {
    const fields: Record<string, any> = {};
    for (const [k, v] of Object.entries(val)) {
      if (v !== undefined) {
        fields[k] = toFirestoreValue(v);
      }
    }
    return { mapValue: { fields } };
  }
  return { stringValue: String(val) };
}

function fromFirestoreValue(val: any): any {
  if (!val) return null;
  if ("stringValue" in val) return val.stringValue;
  if ("booleanValue" in val) return val.booleanValue;
  if ("integerValue" in val) return parseInt(val.integerValue, 10);
  if ("doubleValue" in val) return val.doubleValue;
  if ("nullValue" in val) return null;
  if ("arrayValue" in val) return (val.arrayValue.values || []).map(fromFirestoreValue);
  if ("mapValue" in val) {
    const res: Record<string, any> = {};
    for (const [k, v] of Object.entries(val.mapValue?.fields || {})) {
      res[k] = fromFirestoreValue(v);
    }
    return res;
  }
  return null;
}

function toFirestoreFields(obj: Record<string, any>): Record<string, any> {
  const fields: Record<string, any> = {};
  for (const [key, val] of Object.entries(obj)) {
    if (val !== undefined) {
      fields[key] = toFirestoreValue(val);
    }
  }
  return fields;
}

function fromFirestoreDocument<T>(doc: any): T {
  const fields = doc?.fields || {};
  const res: Record<string, any> = {};
  for (const [k, v] of Object.entries(fields)) {
    res[k] = fromFirestoreValue(v);
  }
  if (!res.id && doc?.name) {
    res.id = doc.name.split("/").pop();
  }
  if (!res.createdAt && doc?.createTime) {
    res.createdAt = doc.createTime;
  }
  return res as T;
}

// Cache status of Firestore connectivity
let firestoreCheckResult: {
  available: boolean;
  hasAdminAccess: boolean;
  error?: string;
  code?: string;
  activationUrl: string;
} | null = null;
let lastFirestoreCheckTime = 0;
const FIRESTORE_CHECK_TTL = 120000; // 2-minute memory cache to avoid redundant health check roundtrips

// In-memory traffic count cache
let cachedTrafficTotal: { count: number; time: number } | null = null;

// In-memory login deduplication cache (email:role:status -> timestamp)
const recentLoginCache = new Map<string, number>();

let migrationCompleted = false;
let cachedAccessToken: { token: string; exp: number } | null = null;

async function getFirestoreAuthHeader(userToken?: string): Promise<Record<string, string>> {
  if (userToken) {
    return { Authorization: `Bearer ${userToken}` };
  }
  if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    try {
      if (cachedAccessToken && cachedAccessToken.exp > Date.now() + 60000) {
        return { Authorization: `Bearer ${cachedAccessToken.token}` };
      }
      const raw = process.env.FIREBASE_SERVICE_ACCOUNT_KEY.trim();
      const parsed = JSON.parse(raw.startsWith("{") ? raw : Buffer.from(raw, "base64").toString("utf-8"));
      const { GoogleAuth } = await import("google-auth-library");
      const auth = new GoogleAuth({
        credentials: parsed,
        scopes: [
          "https://www.googleapis.com/auth/datastore",
          "https://www.googleapis.com/auth/cloud-platform"
        ]
      });
      const client = await auth.getClient();
      const tokenRes = await client.getAccessToken();
      if (tokenRes && tokenRes.token) {
        cachedAccessToken = { token: tokenRes.token, exp: Date.now() + 3500 * 1000 };
        return { Authorization: `Bearer ${tokenRes.token}` };
      }
    } catch (e) {
      console.warn("Failed to retrieve Google Service Account access token:", e);
    }
  }
  return {};
}

/**
 * Checks whether Cloud Firestore is currently accessible and enabled.
 * Uses in-memory TTL caching to avoid repeating roundtrips on every database query.
 */
export async function checkFirestoreStatus(): Promise<{
  available: boolean;
  hasAdminAccess: boolean;
  error?: string;
  code?: string;
  activationUrl: string;
}> {
  const activationUrl = `https://console.firebase.google.com/project/${FIREBASE_PROJECT_ID}/firestore`;
  if (firestoreCheckResult && Date.now() - lastFirestoreCheckTime < FIRESTORE_CHECK_TTL) {
    return firestoreCheckResult;
  }

  try {
    const authHeaders = await getFirestoreAuthHeader();
    const res = await fetch(`${FIRESTORE_BASE_URL}/enquiries?pageSize=1&key=${FIREBASE_API_KEY}`, {
      method: "GET",
      headers: { "Content-Type": "application/json", ...authHeaders },
    });

    lastFirestoreCheckTime = Date.now();

    if (res.ok) {
      firestoreCheckResult = { available: true, hasAdminAccess: true, activationUrl };
      return firestoreCheckResult;
    }

    const body = await res.json().catch(() => ({}));
    const message = body?.error?.message || `HTTP ${res.status}`;
    const statusText = body?.error?.status || "";
    const reason = body?.error?.details?.[0]?.reason || "";

    // 1. Is API disabled in Google Cloud?
    if (reason === "SERVICE_DISABLED" || message.includes("disabled") || message.includes("has not been used")) {
      firestoreCheckResult = {
        available: false,
        hasAdminAccess: false,
        code: "FIRESTORE_DISABLED",
        error: `Cloud Firestore API is not enabled for project ${FIREBASE_PROJECT_ID}. Enable it at ${activationUrl}`,
        activationUrl,
      };
      return firestoreCheckResult;
    }

    // 2. Does database not exist?
    if (res.status === 404 && message.includes("does not exist")) {
      firestoreCheckResult = {
        available: false,
        hasAdminAccess: false,
        code: "DATABASE_NOT_CREATED",
        error: `Cloud Firestore database '${FIREBASE_DATABASE_ID}' has not yet been created for project ${FIREBASE_PROJECT_ID}.`,
        activationUrl,
      };
      return firestoreCheckResult;
    }

    // 3. Is Firestore active and enforcing rules, but unauthenticated read is rejected?
    if (res.status === 403 && (statusText === "PERMISSION_DENIED" || message.includes("Missing or insufficient permissions"))) {
      firestoreCheckResult = {
        available: true,
        hasAdminAccess: false,
        code: "PERMISSION_DENIED",
        error: "Cloud Firestore is active and enforcing security rules.",
        activationUrl,
      };
      return firestoreCheckResult;
    }

    firestoreCheckResult = {
      available: false,
      hasAdminAccess: false,
      code: "FIRESTORE_ERROR",
      error: `Cloud Firestore: ${message}`,
      activationUrl,
    };
    return firestoreCheckResult;
  } catch (err: any) {
    lastFirestoreCheckTime = Date.now();
    firestoreCheckResult = {
      available: false,
      hasAdminAccess: false,
      code: "NETWORK_ERROR",
      error: err.message,
      activationUrl,
    };
    return firestoreCheckResult;
  }
}

// --- Firestore Direct Document & Query Access ---

/**
 * Runs a structured query against Cloud Firestore REST API (:runQuery).
 * Allows ordering (e.g. timestamp DESC), field filters, and bounds without client-side array sorting.
 */
export async function runFirestoreQuery<T>(structuredQuery: any, userToken?: string): Promise<T[]> {
  const authHeaders = await getFirestoreAuthHeader(userToken);
  const url = `${FIRESTORE_BASE_URL}:runQuery?key=${FIREBASE_API_KEY}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders },
    body: JSON.stringify({ structuredQuery }),
    cache: "no-store",
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    const message = body?.error?.message || `HTTP ${res.status}`;
    throw new DatabasePersistenceError(`Firestore query failed: ${message}`);
  }

  const data = await res.json();
  if (!Array.isArray(data)) return [];
  return data
    .filter((d: any) => d.document)
    .map((d: any) => fromFirestoreDocument<T>(d.document));
}

/**
 * Counts documents in a collection via Firestore server-side aggregation (:runAggregationQuery).
 * Returns exact count without downloading document bodies into memory.
 */
export async function getFirestoreCollectionCount(
  collection: string,
  userToken?: string,
  whereFilter?: any
): Promise<number> {
  const authHeaders = await getFirestoreAuthHeader(userToken);
  const url = `${FIRESTORE_BASE_URL}:runAggregationQuery?key=${FIREBASE_API_KEY}`;
  const structuredQuery: any = {
    from: [{ collectionId: collection }],
  };
  if (whereFilter) {
    structuredQuery.where = whereFilter;
  }

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders },
    body: JSON.stringify({
      structuredAggregationQuery: {
        structuredQuery,
        aggregations: [{ alias: "totalCount", count: {} }],
      },
    }),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Aggregation query failed: HTTP ${res.status}`);
  }

  const data = await res.json();
  const raw = data?.[0]?.result?.aggregateFields?.totalCount?.integerValue;
  if (raw !== undefined) {
    return parseInt(raw, 10);
  }
  return 0;
}

/**
 * Fetches documents from a Firestore collection with pagination support.
 * Automatically handles nextPageToken when maxResults > 300 to avoid single-page cap.
 */
async function getFirestoreDocuments<T>(collection: string, maxResults = 300, userToken?: string): Promise<T[]> {
  const authHeaders = await getFirestoreAuthHeader(userToken);
  let allDocs: T[] = [];
  let pageToken = "";
  const pageSize = Math.min(maxResults, 300);

  do {
    const pageTokenParam = pageToken ? `&pageToken=${encodeURIComponent(pageToken)}` : "";
    const url = `${FIRESTORE_BASE_URL}/${collection}?pageSize=${pageSize}&key=${FIREBASE_API_KEY}${pageTokenParam}`;
    const res = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json", ...authHeaders },
      cache: "no-store",
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      const message = body?.error?.message || `HTTP ${res.status}`;
      const reason = body?.error?.details?.[0]?.reason || "DATABASE_READ_FAILED";
      throw new DatabasePersistenceError(`Firestore read failed (${collection}): ${message}`, reason);
    }

    const data = await res.json();
    const docs = (data?.documents || []).map((d: any) => fromFirestoreDocument<T>(d));
    allDocs = allDocs.concat(docs);

    pageToken = data?.nextPageToken || "";
  } while (pageToken && allDocs.length < maxResults);

  return allDocs.slice(0, maxResults);
}

export async function getFirestoreDocument<T>(collection: string, docId: string, userToken?: string): Promise<T | null> {
  const authHeaders = await getFirestoreAuthHeader(userToken);
  const sanitizedId = encodeURIComponent(String(docId).replace(/\//g, "_"));
  const url = `${FIRESTORE_BASE_URL}/${collection}/${sanitizedId}?key=${FIREBASE_API_KEY}`;
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json", ...authHeaders },
      cache: "no-store",
    });

    if (res.status === 404) return null;
    if (!res.ok) return null;

    const data = await res.json();
    return fromFirestoreDocument<T>(data);
  } catch (err) {
    return null;
  }
}

export async function setFirestoreDocument<T extends Record<string, any>>(collection: string, docId: string, data: T, userToken?: string): Promise<T> {
  const authHeaders = await getFirestoreAuthHeader(userToken);
  const sanitizedId = encodeURIComponent(String(docId).replace(/\//g, "_"));
  const url = `${FIRESTORE_BASE_URL}/${collection}/${sanitizedId}?key=${FIREBASE_API_KEY}`;
  const fields = toFirestoreFields(data);

  const res = await fetch(url, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", ...authHeaders },
    body: JSON.stringify({ fields }),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    const message = body?.error?.message || `HTTP ${res.status}`;
    const reason = body?.error?.details?.[0]?.reason || "DATABASE_WRITE_FAILED";
    throw new DatabasePersistenceError(`Firestore write failed (${collection}/${docId}): ${message}`, reason);
  }

  const saved = await res.json();
  return fromFirestoreDocument<T>(saved);
}

export async function deleteFirestoreDocument(collection: string, docId: string, userToken?: string): Promise<boolean> {
  const authHeaders = await getFirestoreAuthHeader(userToken);
  const sanitizedId = encodeURIComponent(String(docId).replace(/\//g, "_"));
  const url = `${FIRESTORE_BASE_URL}/${collection}/${sanitizedId}?key=${FIREBASE_API_KEY}`;

  const res = await fetch(url, {
    method: "DELETE",
    headers: { "Content-Type": "application/json", ...authHeaders },
  });

  if (!res.ok && res.status !== 404) {
    const body = await res.json().catch(() => ({}));
    const message = body?.error?.message || `HTTP ${res.status}`;
    throw new DatabasePersistenceError(`Firestore delete failed (${collection}/${docId}): ${message}`);
  }

  return res.ok;
}

// --- Local File Store Helpers (Strictly for Local Development Only) ---

function readLocalDb(): DatabaseSchema {
  try {
    if (fs.existsSync(LOCAL_DB_FILE)) {
      const raw = fs.readFileSync(LOCAL_DB_FILE, "utf-8");
      return JSON.parse(raw);
    }
  } catch (e) {
    console.warn("Failed to read local database.json:", e);
  }
  return { enquiries: [], users: [], login_logs: [], traffic_logs: [] };
}

function writeLocalDb(data: DatabaseSchema): void {
  // Never write to local disk if on serverless (prevent ephemeral useless IO)
  if (isServerlessEnv()) return;
  try {
    if (!fs.existsSync(LOCAL_DB_DIR)) {
      fs.mkdirSync(LOCAL_DB_DIR, { recursive: true });
    }
    fs.writeFileSync(LOCAL_DB_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (e) {
    console.warn("Failed to write local database.json:", e);
  }
}

/**
 * Migrates local data (e.g. genuine enquiry ENQ-2026-001) to Firestore when Firestore is available.
 * Completely idempotent: verifies existence in Firestore before writing so it CANNOT overwrite
 * existing Firestore records with stale local data.
 */
export async function migrateLocalDataToFirestore(): Promise<{ migratedEnquiries: number; migratedUsers: number }> {
  if (migrationCompleted) return { migratedEnquiries: 0, migratedUsers: 0 };

  const local = readLocalDb();
  let migratedEnquiries = 0;
  let migratedUsers = 0;

  try {
    // 1. Migrate genuine enquiries ONLY if they do NOT already exist in Firestore
    for (const enq of local.enquiries || []) {
      try {
        const existingInFirestore = await getFirestoreDocument<Enquiry>("enquiries", enq.id);
        if (!existingInFirestore) {
          await setFirestoreDocument("enquiries", enq.id, enq);
          migratedEnquiries++;
        }
      } catch (e) {
        // Skip on error
      }
    }

    // 2. Migrate users ONLY if they do NOT already exist in Firestore
    for (const u of local.users || []) {
      try {
        const existingInFirestore = await getFirestoreDocument<UserAccount>("users", u.uid);
        if (!existingInFirestore) {
          await setFirestoreDocument("users", u.uid, u);
          migratedUsers++;
        }
      } catch (e) {
        // Skip on error
      }
    }

    migrationCompleted = true;
    return { migratedEnquiries, migratedUsers };
  } catch (err) {
    return { migratedEnquiries, migratedUsers };
  }
}

// --- Unified Database Access Layer ---

/**
 * Determines whether to read from persistent Firestore or local development file.
 * In production/serverless, Firestore is MANDATORY and will NOT fall back to ephemeral /tmp.
 */
async function useFirestore(): Promise<boolean> {
  const status = await checkFirestoreStatus();
  if (status.available) {
    // Auto-migrate local records once connected if admin access is available
    if (!migrationCompleted && status.hasAdminAccess) {
      migrateLocalDataToFirestore().catch(() => {});
    }
    return true;
  }

  // In production (Vercel), only throw if persistent database is genuinely unavailable (not created or API disabled)
  if (isServerlessEnv() || process.env.NODE_ENV === "production") {
    if (status.code === "DATABASE_NOT_CREATED") {
      throw new DatabasePersistenceError(
        `Persistent production database is required. Cloud Firestore database '${FIREBASE_DATABASE_ID}' has not yet been created for project ${FIREBASE_PROJECT_ID}. Please create the database at ${status.activationUrl}`,
        "DATABASE_NOT_CREATED"
      );
    }
    if (status.code === "FIRESTORE_DISABLED") {
      throw new DatabasePersistenceError(
        `Persistent production database is required. Cloud Firestore API is not enabled for project ${FIREBASE_PROJECT_ID}. Enable it at ${status.activationUrl}`,
        "FIRESTORE_DISABLED"
      );
    }
    throw new DatabasePersistenceError(
      `Persistent production database is required. Could not connect to Cloud Firestore: ${status.error}`,
      status.code || "DB_PERSISTENCE_ERROR"
    );
  }

  // In local development only, allow local JSON file with a prominent warning
  console.warn(`[DEV WARNING] Using local data/database.json because Cloud Firestore is not enabled. ${status.error}`);
  return false;
}

// --- Enquiry Repository Methods ---

export async function getAllEnquiries(filter?: { program?: string; status?: string; search?: string }): Promise<Enquiry[]> {
  let list: Enquiry[] = [];

  if (await useFirestore()) {
    try {
      list = await getFirestoreDocuments<Enquiry>("enquiries");
    } catch (e: any) {
      console.warn("Could not read enquiries from Firestore (permission or rules):", e.message);
      const local = readLocalDb();
      list = local.enquiries || [];
    }
  } else {
    const local = readLocalDb();
    list = local.enquiries || [];
  }

  if (filter?.program && filter.program !== "all") {
    list = list.filter((e) => (e.program || "").toLowerCase() === filter.program!.toLowerCase());
  }

  if (filter?.status && filter.status !== "all") {
    list = list.filter((e) => (e.status || "new") === filter.status);
  }

  if (filter?.search) {
    const q = filter.search.toLowerCase();
    list = list.filter(
      (e) =>
        (e.name && e.name.toLowerCase().includes(q)) ||
        (e.phone && e.phone.toLowerCase().includes(q)) ||
        (e.email && e.email.toLowerCase().includes(q)) ||
        (e.message && e.message.toLowerCase().includes(q)) ||
        (e.notes && e.notes.toLowerCase().includes(q)) ||
        (e.id && e.id.toLowerCase().includes(q)) ||
        (e.program && e.program.toLowerCase().includes(q))
    );
  }

  return list.sort((a, b) => {
    const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
    return timeB - timeA;
  });
}

export async function createEnquiry(
  payload: Omit<Enquiry, "id" | "createdAt" | "status"> & { status?: Enquiry["status"] }
): Promise<Enquiry> {
  const year = new Date().getFullYear();
  // Generate high-resolution unique ID to prevent collisions on retries
  const randomSuffix = Math.floor(100 + Math.random() * 900);
  const enqId = `ENQ-${year}-${Date.now().toString().slice(-4)}${randomSuffix}`;

  const newEnquiry: Enquiry = {
    ...payload,
    id: enqId,
    status: payload.status || "new",
    createdAt: new Date().toISOString(),
  };

  if (await useFirestore()) {
    await setFirestoreDocument("enquiries", newEnquiry.id, newEnquiry);
  } else {
    const local = readLocalDb();
    local.enquiries.unshift(newEnquiry);
    writeLocalDb(local);
  }

  return newEnquiry;
}

export async function updateEnquiryStatus(
  id: string,
  status: Enquiry["status"],
  notes?: string
): Promise<Enquiry | null> {
  if (await useFirestore()) {
    try {
      const target = await getFirestoreDocument<Enquiry>("enquiries", id);
      if (!target) return null;

      const updated: Enquiry = {
        ...target,
        status,
        ...(notes !== undefined ? { notes } : {}),
      };
      await setFirestoreDocument("enquiries", id, updated);
      return updated;
    } catch (e: any) {
      console.warn("Failed to update enquiry status in Firestore:", e.message);
    }
  }

  const local = readLocalDb();
  const idx = local.enquiries.findIndex((e) => e.id === id);
  if (idx === -1) return null;

  local.enquiries[idx].status = status;
  if (notes !== undefined) {
    local.enquiries[idx].notes = notes;
  }
  writeLocalDb(local);
  return local.enquiries[idx];
}

export async function deleteEnquiry(id: string): Promise<boolean> {
  if (await useFirestore()) {
    try {
      return await deleteFirestoreDocument("enquiries", id);
    } catch (e: any) {
      console.warn("Failed to delete enquiry from Firestore:", e.message);
    }
  }

  const local = readLocalDb();
  const lenBefore = local.enquiries.length;
  local.enquiries = local.enquiries.filter((e) => e.id !== id);
  if (local.enquiries.length !== lenBefore) {
    writeLocalDb(local);
    return true;
  }
  return false;
}

// --- User Accounts Repository Methods ---

export async function getAllUsers(): Promise<UserAccount[]> {
  let users: UserAccount[] = [];

  if (await useFirestore()) {
    try {
      users = await getFirestoreDocuments<UserAccount>("users");
    } catch (e: any) {
      console.warn("Could not read users from Firestore (permission or rules):", e.message);
      const local = readLocalDb();
      users = local.users || [];
    }
  } else {
    const local = readLocalDb();
    users = local.users || [];
  }

  return users.sort((a, b) => {
    const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
    return timeB - timeA;
  });
}

export async function getUserById(uid: string, userToken?: string): Promise<UserAccount | null> {
  if (await useFirestore()) {
    try {
      const doc = await getFirestoreDocument<UserAccount>("users", uid, userToken);
      if (doc) return doc;
    } catch (e: any) {
      console.warn(`Could not fetch user ${uid} from Firestore:`, e.message);
    }
  }
  const local = readLocalDb();
  return (local.users || []).find((u) => u.uid === uid) || null;
}

/**
 * Looks up a user account by email address using structured query or local cache.
 * Avoids downloading the entire user collection.
 */
export async function getUserByEmail(email: string, userToken?: string): Promise<UserAccount | null> {
  const normalized = String(email || "").trim().toLowerCase();
  if (!normalized) return null;

  if (await useFirestore()) {
    try {
      const results = await runFirestoreQuery<UserAccount>({
        from: [{ collectionId: "users" }],
        where: {
          fieldFilter: {
            field: { fieldPath: "email" },
            op: "EQUAL",
            value: { stringValue: normalized },
          },
        },
        limit: 1,
      }, userToken);

      if (results.length > 0) return results[0];
    } catch (e: any) {
      console.warn(`Could not fetch user by email ${normalized} from Firestore:`, e.message);
    }
  }

  const local = readLocalDb();
  return (local.users || []).find((u) => (u.email || "").trim().toLowerCase() === normalized) || null;
}

export async function recordUser(user: {
  uid: string;
  email: string;
  displayName: string;
  role?: string;
  rollNumber?: string;
  authProvider?: "google.com" | "password" | string;
  phone?: string;
  targetExam?: string;
}, userToken?: string): Promise<UserAccount> {
  const normalizedEmail = String(user.email || "").trim().toLowerCase();
  const normalizedRole: "admin" | "user" = user.role === "admin" ? "admin" : "user";

  // Check existing user by UID first, then by normalized email to prevent duplicate accounts
  const existing = (user.uid ? await getUserById(user.uid, userToken) : null) ||
                   (await getUserByEmail(normalizedEmail, userToken));

  const updatedAccount: UserAccount = {
    uid: user.uid || existing?.uid || `usr-${Date.now().toString(36)}`,
    email: normalizedEmail,
    displayName: user.displayName || existing?.displayName || normalizedEmail.split("@")[0],
    role: normalizedRole,
    rollNumber: user.rollNumber || existing?.rollNumber || `OS-USR-${Math.floor(1000 + Math.random() * 9000)}`,
    authProvider: user.authProvider || existing?.authProvider || "password",
    phone: user.phone || existing?.phone,
    targetExam: user.targetExam || existing?.targetExam,
    createdAt: existing?.createdAt || new Date().toISOString(),
    lastLogin: new Date().toISOString(),
  };

  if (await useFirestore()) {
    try {
      await setFirestoreDocument("users", updatedAccount.uid, updatedAccount, userToken);
    } catch (err: any) {
      console.warn(`Could not persist user ${updatedAccount.uid} to Firestore:`, err.message);
    }
  } else {
    const local = readLocalDb();
    if (!local.users) local.users = [];
    const idx = local.users.findIndex((u) => (u.email || "").trim().toLowerCase() === normalizedEmail || u.uid === updatedAccount.uid);
    if (idx >= 0) {
      local.users[idx] = updatedAccount;
    } else {
      local.users.unshift(updatedAccount);
    }
    writeLocalDb(local);
  }

  return updatedAccount;
}

// --- Login Logs Repository Methods ---

export async function getLoginLogs(limit = 100): Promise<LoginLog[]> {
  let logs: LoginLog[] = [];

  if (await useFirestore()) {
    try {
      // Query recent logs ordered by timestamp DESC directly from Firestore
      logs = await runFirestoreQuery<LoginLog>({
        from: [{ collectionId: "login_logs" }],
        orderBy: [{ field: { fieldPath: "timestamp" }, direction: "DESCENDING" }],
        limit: Math.min(limit, 200),
      });
    } catch (e: any) {
      try {
        logs = await getFirestoreDocuments<LoginLog>("login_logs", limit);
      } catch (err: any) {
        console.warn("Could not read login logs from Firestore:", err.message);
        const local = readLocalDb();
        logs = local.login_logs || [];
      }
    }
  } else {
    const local = readLocalDb();
    logs = local.login_logs || [];
  }

  return logs
    .sort((a, b) => {
      const timeA = a.timestamp ? new Date(a.timestamp).getTime() : 0;
      const timeB = b.timestamp ? new Date(b.timestamp).getTime() : 0;
      return timeB - timeA;
    })
    .slice(0, limit);
}

export async function clearLoginLogs(): Promise<void> {
  if (await useFirestore()) {
    const logs = await getFirestoreDocuments<LoginLog>("login_logs", 500);
    for (const l of logs) {
      await deleteFirestoreDocument("login_logs", l.id).catch(() => {});
    }
  } else {
    const local = readLocalDb();
    local.login_logs = [];
    writeLocalDb(local);
  }
}

export async function logLoginActivity(entry: {
  email: string;
  role: string;
  status: "success" | "failed";
  authProvider?: string;
  userAgent?: string;
  ip?: string;
}): Promise<LoginLog> {
  const normalizedEmail = String(entry.email || "").trim().toLowerCase();
  const normalizedRole = entry.role === "admin" ? "admin" : "user";

  // Server-side deduplication safeguard:
  // If the same email, role, and status was logged within the last 15 seconds, return recent log to avoid duplicate entries
  const dedupKey = `${normalizedEmail}:${normalizedRole}:${entry.status}`;
  const now = Date.now();
  const lastLoggedAt = recentLoginCache.get(dedupKey) || 0;
  if (now - lastLoggedAt < 15000) {
    return {
      id: `dedup-${now}`,
      email: normalizedEmail,
      role: normalizedRole,
      status: entry.status,
      authProvider: entry.authProvider || "password",
      userAgent: entry.userAgent,
      ip: entry.ip,
      timestamp: new Date(lastLoggedAt).toISOString(),
    };
  }
  recentLoginCache.set(dedupKey, now);
  if (recentLoginCache.size > 200) {
    recentLoginCache.forEach((v, k) => {
      if (now - v > 60000) recentLoginCache.delete(k);
    });
  }

  const newLog: LoginLog = {
    id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
    email: normalizedEmail,
    role: normalizedRole,
    status: entry.status,
    authProvider: entry.authProvider || "password",
    userAgent: entry.userAgent,
    ip: entry.ip,
    timestamp: new Date().toISOString(),
  };

  try {
    if (await useFirestore()) {
      await setFirestoreDocument("login_logs", newLog.id, newLog);
    } else {
      const local = readLocalDb();
      if (!local.login_logs) local.login_logs = [];
      local.login_logs.unshift(newLog);
      if (local.login_logs.length > 500) local.login_logs = local.login_logs.slice(0, 500);
      writeLocalDb(local);
    }
  } catch (e) {
    // If logging fails in serverless, do not crash main auth flow, but record error to console
    console.error("Failed to record login audit log:", e);
  }

  return newLog;
}

// --- Traffic Logs Repository Methods ---

export async function logTraffic(entry: {
  path: string;
  ip?: string;
  userAgent?: string;
  referrer?: string;
  userEmail?: string;
  role?: string;
}): Promise<TrafficLog> {
  const normalizedEmail = entry.userEmail ? String(entry.userEmail).trim().toLowerCase() : undefined;
  const newLog: TrafficLog = {
    id: `trf-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
    ...entry,
    userEmail: normalizedEmail,
    timestamp: new Date().toISOString(),
  };

  // Increment in-memory lifetime count cache immediately (without extending TTL)
  if (cachedTrafficTotal) {
    cachedTrafficTotal.count++;
  }

  try {
    if (await useFirestore()) {
      await setFirestoreDocument("traffic_logs", newLog.id, newLog);
    } else {
      const local = readLocalDb();
      if (!local.traffic_logs) local.traffic_logs = [];
      local.traffic_logs.unshift(newLog);
      if (local.traffic_logs.length > 2000) local.traffic_logs = local.traffic_logs.slice(0, 2000);
      writeLocalDb(local);
    }
  } catch (e) {
    console.error("Failed to persist traffic log:", e);
  }

  return newLog;
}

/**
 * Returns total lifetime page views efficiently.
 * Uses native Firestore server-side aggregation (:runAggregationQuery) as authoritative source.
 * A short 15-second cache prevents spamming Firestore on rapid dashboard reloads, while
 * ensuring all serverless instances stay synchronized with the persistent database.
 */
export async function getTrafficCount(): Promise<number> {
  if (cachedTrafficTotal && Date.now() - cachedTrafficTotal.time < 15000) {
    return cachedTrafficTotal.count;
  }

  if (await useFirestore()) {
    try {
      const count = await getFirestoreCollectionCount("traffic_logs");
      if (count >= 0) {
        cachedTrafficTotal = { count, time: Date.now() };
        return count;
      }
    } catch (e) {
      console.warn("Could not get traffic aggregation count from Firestore:", e);
    }
  }

  const local = readLocalDb();
  const count = (local.traffic_logs || []).length;
  cachedTrafficTotal = { count, time: Date.now() };
  return count;
}

/**
 * Returns page views in the past 24 hours.
 * Uses a bounded recent query or filtered aggregation, never downloading the full history.
 */
export async function getRecentTrafficCount(): Promise<number> {
  const sinceTime = Date.now() - 24 * 3600 * 1000;
  const iso24h = new Date(sinceTime).toISOString();

  if (await useFirestore()) {
    try {
      const count = await getFirestoreCollectionCount("traffic_logs", undefined, {
        fieldFilter: {
          field: { fieldPath: "timestamp" },
          op: "GREATER_THAN_OR_EQUAL",
          value: { stringValue: iso24h },
        },
      });
      if (count >= 0) return count;
    } catch (e) {
      // Fall through to bounded query
    }

    try {
      const recent = await getTrafficLogs(150);
      return recent.filter((t) => {
        const time = t.timestamp ? new Date(t.timestamp).getTime() : 0;
        return time >= sinceTime;
      }).length;
    } catch (e) {
      // Fall through to local
    }
  }

  const local = readLocalDb();
  return (local.traffic_logs || []).filter((t) => {
    const time = t.timestamp ? new Date(t.timestamp).getTime() : 0;
    return time >= sinceTime;
  }).length;
}

export async function getTrafficLogs(limit = 100): Promise<TrafficLog[]> {
  let traffic: TrafficLog[] = [];

  if (await useFirestore()) {
    try {
      // Query recent visitor stream ordered by timestamp DESCENDING
      traffic = await runFirestoreQuery<TrafficLog>({
        from: [{ collectionId: "traffic_logs" }],
        orderBy: [{ field: { fieldPath: "timestamp" }, direction: "DESCENDING" }],
        limit: Math.min(limit, 200),
      });
    } catch (e: any) {
      try {
        traffic = await getFirestoreDocuments<TrafficLog>("traffic_logs", limit);
      } catch (err: any) {
        console.warn("Could not read traffic logs from Firestore:", err.message);
        const local = readLocalDb();
        traffic = local.traffic_logs || [];
      }
    }
  } else {
    const local = readLocalDb();
    traffic = local.traffic_logs || [];
  }

  return traffic
    .sort((a, b) => {
      const timeA = a.timestamp ? new Date(a.timestamp).getTime() : 0;
      const timeB = b.timestamp ? new Date(b.timestamp).getTime() : 0;
      return timeB - timeA;
    })
    .slice(0, limit);
}

export async function clearTrafficLogs(): Promise<void> {
  if (await useFirestore()) {
    const traffic = await getFirestoreDocuments<TrafficLog>("traffic_logs", 500);
    for (const t of traffic) {
      await deleteFirestoreDocument("traffic_logs", t.id).catch(() => {});
    }
  } else {
    const local = readLocalDb();
    local.traffic_logs = [];
    writeLocalDb(local);
  }
}

// --- Dashboard KPI Stats ---

export async function getAcademyStats() {
  // Execute independent metric requests concurrently via Promise.all
  const [enquiries, users, logs, totalPageViews, recentPageViews] = await Promise.all([
    getAllEnquiries(),
    getAllUsers(),
    getLoginLogs(100),
    getTrafficCount(),
    getRecentTrafficCount(),
  ]);

  const newEnquiries = enquiries.filter((e) => (e.status || "new") === "new").length;
  const contactedEnquiries = enquiries.filter((e) => e.status === "contacted" || e.status === "in_progress").length;
  const enrolledEnquiries = enquiries.filter((e) => e.status === "enrolled").length;

  const orientationBookings = enquiries.filter((e) => e.source === "orientation_modal").length;
  const contactMessages = enquiries.filter((e) => e.source === "contact_page").length;

  const totalAdmins = users.filter((u) => u.role === "admin").length;
  const totalStandardUsers = users.filter((u) => u.role !== "admin").length;

  const googleUsersCount = users.filter((u) => u.authProvider === "google.com").length;
  const emailPasswordUsersCount = users.filter((u) => u.authProvider !== "google.com").length;

  const totalLogins = logs.length;
  const successfulLogins = logs.filter((l) => l.status === "success").length;
  const failedLogins = logs.filter((l) => l.status === "failed").length;

  const recentLoginsCount = logs.filter(
    (l) => l.timestamp && !isNaN(new Date(l.timestamp).getTime()) && new Date(l.timestamp).getTime() > Date.now() - 24 * 3600 * 1000
  ).length;

  return {
    totalEnquiries: enquiries.length,
    newEnquiries,
    contactedEnquiries,
    enrolledEnquiries,
    orientationBookings,
    contactMessages,
    totalAccounts: users.length,
    totalUsers: users.length,
    totalAdmins,
    totalStandardUsers,
    googleUsersCount,
    emailPasswordUsersCount,
    totalLogins,
    successfulLogins,
    failedLogins,
    recentLoginsCount,
    totalPageViews,
    recentPageViews,
  };
}
