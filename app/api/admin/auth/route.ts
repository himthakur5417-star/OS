import { NextRequest, NextResponse } from "next/server";
import { logLoginActivity } from "@/lib/db";
import { ADMIN_PASSWORD, SESSION_COOKIE_NAME, verifyAdminSession, isAdminEmail } from "@/lib/adminAuth";

// Check current admin session
export async function GET(req: NextRequest) {
  const isValid = verifyAdminSession(req);
  if (!isValid) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  const cookie = req.cookies.get(SESSION_COOKIE_NAME);
  const authHeader = req.headers.get("authorization")?.replace("Bearer ", "") || req.headers.get("x-admin-token");
  const token = cookie?.value || authHeader;
  let adminEmail = "admin@officium.academy";

  if (token) {
    try {
      const data = JSON.parse(Buffer.from(token, "base64").toString("utf-8"));
      if (data.email) adminEmail = data.email;
    } catch (e) {}
  }

  return NextResponse.json({
    authenticated: true,
    admin: {
      email: adminEmail,
      displayName: adminEmail.split("@")[0].toUpperCase() + " (Admin)",
      role: "admin",
    },
  });
}

// Admin login
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    const normalizedEmail = String(email || "").trim().toLowerCase();
    const trimmedPass = String(password || "").trim();

    if (
      isAdminEmail(normalizedEmail) &&
      trimmedPass === ADMIN_PASSWORD
    ) {
      // Log successful admin login
      logLoginActivity({
        email: normalizedEmail,
        role: "admin",
        status: "success",
        userAgent: req.headers.get("user-agent") || undefined,
        ip: req.headers.get("x-forwarded-for") || undefined,
      });

      // 7-day session token
      const sessionData = {
        email: normalizedEmail,
        role: "admin",
        exp: Date.now() + 7 * 24 * 3600 * 1000,
      };
      const token = Buffer.from(JSON.stringify(sessionData)).toString("base64");

      const response = NextResponse.json({
        success: true,
        message: "Admin authentication successful",
        token,
        admin: {
          email: normalizedEmail,
          displayName: normalizedEmail.split("@")[0].toUpperCase(),
          role: "admin",
        },

      });

      const host = req.headers.get("host") || "";
      const isLocalhost = host.includes("localhost") || host.includes("127.0.0.1");
      const isSecure = process.env.NODE_ENV === "production" && !isLocalhost;

      response.cookies.set({
        name: SESSION_COOKIE_NAME,
        value: token,
        httpOnly: true,
        secure: isSecure,
        sameSite: "lax",
        maxAge: 7 * 24 * 3600,
        path: "/",
      });

      return response;
    }

    // Log failed attempt
    logLoginActivity({
      email: normalizedEmail || "unknown-admin-attempt",
      role: "admin",
      status: "failed",
      userAgent: req.headers.get("user-agent") || undefined,
      ip: req.headers.get("x-forwarded-for") || undefined,
    });

    return NextResponse.json(
      { error: "Invalid admin email or security passkey." },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error during authentication." },
      { status: 500 }
    );
  }
}

// Admin logout
export async function DELETE() {
  const response = NextResponse.json({ success: true, message: "Logged out" });
  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: "",
    httpOnly: true,
    maxAge: 0,
    path: "/",
  });
  return response;
}
