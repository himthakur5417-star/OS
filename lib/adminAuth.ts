import { NextRequest } from "next/server";

export const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@officium.academy";
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "officium@2025";
export const SESSION_COOKIE_NAME = "os_admin_session";

export function verifyAdminSession(req: NextRequest): boolean {
  const cookie = req.cookies.get(SESSION_COOKIE_NAME);
  const authHeader = req.headers.get("authorization")?.replace("Bearer ", "") || req.headers.get("x-admin-token");
  const token = cookie?.value || authHeader;

  if (!token) return false;
  try {
    const data = JSON.parse(Buffer.from(token, "base64").toString("utf-8"));
    return (
      data.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase() &&
      data.role === "admin" &&
      data.exp > Date.now()
    );
  } catch (e) {
    return false;
  }
}
