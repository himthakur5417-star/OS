import { NextRequest, NextResponse } from "next/server";
import { logLoginActivity } from "@/lib/db";
import { ADMIN_EMAIL, ADMIN_PASSWORD, SESSION_COOKIE_NAME, verifyAdminSession } from "@/lib/adminAuth";

// Check current admin session
export async function GET(req: NextRequest) {
  const isValid = verifyAdminSession(req);
  if (!isValid) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({
    authenticated: true,
    admin: {
      email: ADMIN_EMAIL,
      displayName: "Academy Director",
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
      normalizedEmail === ADMIN_EMAIL.toLowerCase() &&
      trimmedPass === ADMIN_PASSWORD
    ) {
      // Log successful admin login
      logLoginActivity({
        email: ADMIN_EMAIL,
        role: "admin",
        status: "success",
        userAgent: req.headers.get("user-agent") || undefined,
        ip: req.headers.get("x-forwarded-for") || undefined,
      });

      // 7-day session token
      const sessionData = {
        email: ADMIN_EMAIL,
        role: "admin",
        exp: Date.now() + 7 * 24 * 3600 * 1000,
      };
      const token = Buffer.from(JSON.stringify(sessionData)).toString("base64");

      const response = NextResponse.json({
        success: true,
        message: "Admin authentication successful",
        token,
        admin: {
          email: ADMIN_EMAIL,
          displayName: "Academy Director",
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
