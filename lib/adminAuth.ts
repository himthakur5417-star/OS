import { NextRequest } from "next/server";
import crypto from "crypto";

// Lazy-init Firebase Admin SDK singleton for serverless environments
let adminAuthInstance: any = null;
async function getAdminAuth() {
  if (adminAuthInstance) return adminAuthInstance;
  try {
    const { initializeApp, getApps, cert } = await import("firebase-admin/app");
    const { getAuth } = await import("firebase-admin/auth");

    const existing = getApps();
    let adminApp = existing.length > 0 ? existing[0] : null;

    if (!adminApp) {
      const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "os-web-1cc80";
      let credential;

      if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
        try {
          const raw = process.env.FIREBASE_SERVICE_ACCOUNT_KEY.trim();
          const parsed = JSON.parse(raw.startsWith("{") ? raw : Buffer.from(raw, "base64").toString("utf-8"));
          credential = cert(parsed);
        } catch (e) {
          console.warn("Failed to parse FIREBASE_SERVICE_ACCOUNT_KEY:", e);
        }
      } else if (process.env.FIREBASE_PRIVATE_KEY && process.env.FIREBASE_CLIENT_EMAIL) {
        try {
          credential = cert({
            projectId,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
          });
        } catch (e) {
          console.warn("Failed to create credential from FIREBASE_PRIVATE_KEY:", e);
        }
      }

      adminApp = initializeApp({
        projectId,
        ...(credential ? { credential } : {}),
      });
    }

    adminAuthInstance = getAuth(adminApp);
    return adminAuthInstance;
  } catch (err) {
    console.warn("Firebase Admin Auth initialization warning (falling back to REST):", err);
    return null;
  }
}

/**
 * Returns strictly the authorized administrator email whitelist from environment variables.
 * NO fallback administrators or hardcoded defaults are permitted.
 */
export function getAdminEmails(): string[] {
  const raw = (process.env.ADMIN_EMAILS || process.env.ADMIN_EMAIL || "");
  return raw
    .replace(/["']/g, "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

// Deprecated export for backwards compatibility with any remaining imports
export const ADMIN_EMAILS: string[] = getAdminEmails();

export const SESSION_COOKIE_NAME = "os_admin_session";

/**
 * Retrieves the cryptographic secret for signing HMAC-SHA256 session tokens.
 * Must be explicitly provided via dedicated ADMIN_SESSION_SECRET environment variable.
 * Deriving or falling back to ADMIN_PASSWORD is strictly prohibited for cryptographic separation.
 */
function getSigningSecret(): string {
  const secret = (process.env.ADMIN_SESSION_SECRET || "").trim().replace(/^["']|["']$/g, "");
  if (!secret || secret.length < 32) {
    throw new Error(
      "FATAL: A dedicated, cryptographically secure ADMIN_SESSION_SECRET (at least 32 characters) must be configured in environment variables. Do not derive or fallback to ADMIN_PASSWORD."
    );
  }
  return secret;
}

/**
 * Verifies if an email belongs to the strictly configured environment whitelist.
 */
export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  const clean = String(email).trim().toLowerCase().replace(/["']/g, "");
  const whitelist = getAdminEmails();
  if (whitelist.length === 0) {
    console.error("CRITICAL: No ADMIN_EMAILS configured in environment. Rejecting admin check.");
    return false;
  }
  return whitelist.includes(clean);
}

/**
 * Timing-safe constant-time comparison for admin security passkey.
 * Strictly checks process.env.ADMIN_PASSWORD without any fallback strings.
 */
export function isValidAdminPassword(pass: string | null | undefined): boolean {
  if (!pass) return false;
  const envPass = (process.env.ADMIN_PASSWORD || "").trim().replace(/^["']|["']$/g, "");
  if (!envPass) {
    console.error("CRITICAL: No ADMIN_PASSWORD configured in environment. Rejecting login.");
    return false;
  }

  const candidate = String(pass).trim();
  // Use SHA-256 digests with crypto.timingSafeEqual to prevent side-channel timing attacks
  const hashCandidate = crypto.createHash("sha256").update(candidate).digest();
  const hashExpected = crypto.createHash("sha256").update(envPass).digest();
  return crypto.timingSafeEqual(hashCandidate, hashExpected);
}

/**
 * Creates a cryptographically signed HMAC-SHA256 token that cannot be forged or tampered with.
 */
export function createSignedAdminToken(payload: { email: string; role: "admin"; exp: number }): string {
  const secret = getSigningSecret();
  const data = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const hmac = crypto.createHmac("sha256", secret).update(data).digest("base64url");
  return `${data}.${hmac}`;
}

/**
 * Verifies the signature, expiration, and role of an HMAC-SHA256 admin token.
 */
export function verifySignedAdminToken(token: string | null | undefined): { email: string; role: string; exp: number } | null {
  if (!token || !token.includes(".")) return null;
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const [dataPart, sigPart] = parts;
  if (!dataPart || !sigPart) return null;

  try {
    const secret = getSigningSecret();
    const expectedSig = crypto.createHmac("sha256", secret).update(dataPart).digest("base64url");
    if (sigPart.length !== expectedSig.length) return null;
    const isSigValid = crypto.timingSafeEqual(Buffer.from(sigPart), Buffer.from(expectedSig));
    if (!isSigValid) return null;

    const payload = JSON.parse(Buffer.from(dataPart, "base64url").toString("utf-8"));
    if (!payload || typeof payload !== "object") return null;
    if (payload.role !== "admin") return null;
    if (typeof payload.exp !== "number" || payload.exp < Date.now()) return null;
    if (!isAdminEmail(payload.email)) return null;

    return payload;
  } catch (e) {
    return null;
  }
}

/**
 * Cryptographically verifies a Firebase ID Token using Firebase Admin SDK server-side,
 * with fallback to Google Identity Toolkit REST verification.
 */
export async function verifyFirebaseIdToken(idToken: string): Promise<{ email: string; uid: string; provider?: string } | null> {
  if (!idToken || typeof idToken !== "string") return null;

  // 1. Primary: Verify via Firebase Admin SDK
  try {
    const adminAuth = await getAdminAuth();
    if (adminAuth) {
      const decoded = await adminAuth.verifyIdToken(idToken, true);
      if (decoded && decoded.email) {
        const provider = decoded.firebase?.sign_in_provider || "google.com";
        return {
          email: decoded.email.trim().toLowerCase(),
          uid: decoded.uid,
          provider,
        };
      }
    }
  } catch (adminErr: any) {
    // If Admin SDK threw token-revoked or expired, immediately reject
    if (adminErr?.code?.includes("auth/id-token-expired") || adminErr?.code?.includes("auth/id-token-revoked")) {
      return null;
    }
  }

  // 2. Secondary: Secure verification via Google Identity Toolkit lookup endpoint
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyCjC7CXHnESi9GBXNrxiN2PkLLVne-w3k4";
  if (!apiKey) return null;

  try {
    const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken }),
    });

    if (!res.ok) return null;
    const data = await res.json();
    const user = data?.users?.[0];
    if (!user || !user.email) return null;

    const provider = user.providerUserInfo?.[0]?.providerId || "password";
    return {
      email: user.email.trim().toLowerCase(),
      uid: user.localId,
      provider,
    };
  } catch (e) {
    return null;
  }
}

/**
 * Synchronous verification of admin session cookie or signed header.
 */
export function verifyAdminSession(req: NextRequest): boolean {
  const cookie = req.cookies.get(SESSION_COOKIE_NAME);
  const authHeader = req.headers.get("authorization")?.replace("Bearer ", "") || req.headers.get("x-admin-token");
  const token = cookie?.value || authHeader;

  if (!token) return false;

  // Verify HMAC-SHA256 signature
  const verified = verifySignedAdminToken(token);
  return Boolean(verified);
}

/**
 * Comprehensive async admin verification supporting both signed sessions and Firebase ID Tokens.
 */
export async function verifyAdminRequest(req: NextRequest): Promise<{ authorized: boolean; email?: string }> {
  const cookie = req.cookies.get(SESSION_COOKIE_NAME);
  const authHeader = req.headers.get("authorization")?.replace("Bearer ", "") || req.headers.get("x-admin-token");
  const token = cookie?.value || authHeader;

  if (!token) return { authorized: false };

  // 1. Check signed HMAC token
  const verified = verifySignedAdminToken(token);
  if (verified) {
    return { authorized: true, email: verified.email };
  }

  // 2. Check if token is a valid Firebase ID Token belonging to an authorized admin
  const fbUser = await verifyFirebaseIdToken(token);
  if (fbUser && isAdminEmail(fbUser.email)) {
    return { authorized: true, email: fbUser.email };
  }

  return { authorized: false };
}
