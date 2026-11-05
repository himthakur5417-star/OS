import { getFirestoreDocument, setFirestoreDocument } from "@/lib/db";
import { PAID_SUBJECTS, type PaidSubjectId } from "@/lib/paymentCatalog";

export interface PaymentOrderRecord {
  orderId: string;
  uid: string;
  subjectId: PaidSubjectId;
  amountPaise: number;
  currency: string;
  status: "created" | "paid" | "verification_failed";
  createdAt: string;
  paymentId?: string;
  purchasedAt?: string;
  expiresAt?: string;
}

export interface PaymentEntitlement {
  id: string;
  uid: string;
  subjectId: PaidSubjectId;
  paymentId: string;
  orderId: string;
  status: "active";
  purchasedAt: string;
  expiresAt: string;
}

export interface UserSubjectEntitlementSummary {
  subjectId: PaidSubjectId;
  active: boolean;
  expired: boolean;
  purchasedAt: string | null;
  expiresAt: string | null;
}

const ORDERS_COLLECTION = "payment_orders";
const ENTITLEMENTS_COLLECTION = "payment_entitlements";

function hasServerFirestoreCredentials(): boolean {
  return Boolean(
    process.env.FIREBASE_SERVICE_ACCOUNT_KEY ||
      (process.env.FIREBASE_PRIVATE_KEY && process.env.FIREBASE_CLIENT_EMAIL)
  );
}

export function isPaymentPersistenceConfigured(): boolean {
  return hasServerFirestoreCredentials();
}

function entitlementId(uid: string, subjectId: PaidSubjectId): string {
  return `${uid}_${subjectId}`.replace(/[^a-zA-Z0-9_-]/g, "_");
}

export async function savePaymentOrder(record: PaymentOrderRecord): Promise<void> {
  if (!hasServerFirestoreCredentials()) {
    throw new Error("Payment persistence is not configured.");
  }
  await setFirestoreDocument(ORDERS_COLLECTION, record.orderId, record);
}

export async function getPaymentOrder(orderId: string): Promise<PaymentOrderRecord | null> {
  if (!hasServerFirestoreCredentials()) {
    throw new Error("Payment persistence is not configured.");
  }
  return getFirestoreDocument<PaymentOrderRecord>(ORDERS_COLLECTION, orderId);
}

export async function savePaymentEntitlement(record: Omit<PaymentEntitlement, "id">): Promise<PaymentEntitlement> {
  if (!hasServerFirestoreCredentials()) {
    throw new Error("Payment persistence is not configured.");
  }
  const saved = {
    ...record,
    id: entitlementId(record.uid, record.subjectId),
  } satisfies PaymentEntitlement;
  await setFirestoreDocument(ENTITLEMENTS_COLLECTION, saved.id, saved);
  return saved;
}

export async function getPaymentEntitlement(
  uid: string,
  subjectId: PaidSubjectId
): Promise<PaymentEntitlement | null> {
  if (!uid || !hasServerFirestoreCredentials()) return null;
  const record = await getFirestoreDocument<PaymentEntitlement>(
    ENTITLEMENTS_COLLECTION,
    entitlementId(uid, subjectId)
  );
  // Strict ownership check: never return an entitlement belonging to another user or subject
  if (!record || record.uid !== uid || record.subjectId !== subjectId) {
    return null;
  }
  return record;
}

export function isEntitlementActive(entitlement: PaymentEntitlement | null, now = Date.now()): boolean {
  if (!entitlement || entitlement.status !== "active") return false;
  const expiry = Date.parse(entitlement.expiresAt);
  return Number.isFinite(expiry) && expiry > now;
}

export async function hasActiveSubjectAccess(
  uid: string,
  subjectId: PaidSubjectId,
  now = Date.now()
): Promise<{ active: boolean; entitlement: PaymentEntitlement | null }> {
  if (!uid) return { active: false, entitlement: null };
  const entitlement = await getPaymentEntitlement(uid, subjectId);
  return {
    active: isEntitlementActive(entitlement, now),
    entitlement,
  };
}

export async function getUserSubjectEntitlements(
  uid: string,
  now = Date.now()
): Promise<Record<PaidSubjectId, UserSubjectEntitlementSummary>> {
  const entries = await Promise.all(
    PAID_SUBJECTS.map(async (subject) => {
      const entitlement = uid ? await getPaymentEntitlement(uid, subject.id) : null;
      const active = isEntitlementActive(entitlement, now);
      const expiryMs = entitlement?.expiresAt ? Date.parse(entitlement.expiresAt) : NaN;
      const expired = Boolean(
        entitlement &&
          entitlement.status === "active" &&
          Number.isFinite(expiryMs) &&
          expiryMs <= now
      );
      const summary: UserSubjectEntitlementSummary = {
        subjectId: subject.id,
        active,
        expired,
        purchasedAt: entitlement?.purchasedAt || null,
        expiresAt: entitlement?.expiresAt || null,
      };
      return [subject.id, summary] as const;
    })
  );

  return Object.fromEntries(entries) as Record<PaidSubjectId, UserSubjectEntitlementSummary>;
}
