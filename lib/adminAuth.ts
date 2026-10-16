import { NextRequest } from "next/server";

// List of Admin Emails (configured via env or defaults)
const rawAdminEmails = process.env.ADMIN_EMAILS || process.env.ADMIN_EMAIL || "himthakur5417@gmail.com,osupremum@gmail.com,shiwangit78@gmail.com,palakjha82@gmail.com,admin@officium.academy";


export const ADMIN_EMAILS: string[] = rawAdminEmails
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);


export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "officium@2025";
export const SESSION_COOKIE_NAME = "os_admin_session";

export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email.trim().toLowerCase());
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

