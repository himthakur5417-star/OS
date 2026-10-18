import { NextRequest } from "next/server";

// Hardcoded core admin emails that ALWAYS have full access
const DEFAULT_ADMIN_EMAILS: string[] = [
  "himthakur5417@gmail.com",
  "osupremum@gmail.com",
  "shiwangit78@gmail.com",
  "palakjha82@gmail.com",
  "admin@officium.academy"
];

// Any additional emails configured via Vercel env (merged seamlessly)
const rawEnvEmails = (process.env.ADMIN_EMAILS || process.env.ADMIN_EMAIL || "")
  .replace(/["']/g, "")
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

export const ADMIN_EMAILS: string[] = Array.from(
  new Set([...DEFAULT_ADMIN_EMAILS.map((e) => e.toLowerCase()), ...rawEnvEmails])
);

// Accepted admin passwords (both master default and any Vercel env var)
const rawEnvPass = (process.env.ADMIN_PASSWORD || "").trim().replace(/^["']|["']$/g, "");
export const VALID_ADMIN_PASSWORDS: string[] = Array.from(
  new Set(["officium@2025", rawEnvPass].filter(Boolean))
);
export const ADMIN_PASSWORD = rawEnvPass || "officium@2025";

export const SESSION_COOKIE_NAME = "os_admin_session";

export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  const clean = String(email).trim().toLowerCase().replace(/["']/g, "");
  return ADMIN_EMAILS.includes(clean);
}

export function isValidAdminPassword(pass: string | null | undefined): boolean {
  if (!pass) return false;
  const clean = String(pass).trim();
  return VALID_ADMIN_PASSWORDS.includes(clean);
}

export function verifyAdminSession(req: NextRequest): boolean {
  const cookie = req.cookies.get(SESSION_COOKIE_NAME);
  const authHeader = req.headers.get("authorization")?.replace("Bearer ", "") || req.headers.get("x-admin-token");
  const token = cookie?.value || authHeader;

  if (!token) return false;
  try {
    const data = JSON.parse(Buffer.from(token, "base64").toString("utf-8"));
    return (
      isAdminEmail(data.email) &&
      data.role === "admin" &&
      data.exp > Date.now()
    );
  } catch (e) {
    return false;
  }
}
