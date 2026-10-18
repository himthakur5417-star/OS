import { NextRequest, NextResponse } from "next/server";
import { logLoginActivity } from "@/lib/db";
import { 
  SESSION_COOKIE_NAME, 
  verifyAdminRequest, 
  isAdminEmail,
  isValidAdminPassword,
  createSignedAdminToken
} from "@/lib/adminAuth";

// Check current admin session
export async function GET(req: NextRequest) {
  const check = await verifyAdminRequest(req);
  if (!check.authorized || !check.email) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  const adminEmail = check.email;

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
      isValidAdminPassword(trimmedPass)
    ) {
      // Log successful admin login
      await logLoginActivity({
        email: normalizedEmail,
        role: "admin",
        status: "success",
        authProvider: "password",
        userAgent: req.headers.get("user-agent") || undefined,
        ip: req.headers.get("x-forwarded-for") || undefined,
      });

      // 7-day HMAC-SHA256 cryptographically signed session token
      const sessionData = {
        email: normalizedEmail,
        role: "admin" as const,
        exp: Date.now() + 7 * 24 * 3600 * 1000,
      };
      const token = createSignedAdminToken(sessionData);

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
    await logLoginActivity({
      email: normalizedEmail || "unknown-admin-attempt",
      role: "admin",
      status: "failed",
      authProvider: "password",
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
