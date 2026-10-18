import { NextRequest, NextResponse } from "next/server";
import { logLoginActivity, recordUser, getAllUsers } from "@/lib/db";
import { 
  SESSION_COOKIE_NAME, 
  isAdminEmail,
  isValidAdminPassword,
  createSignedAdminToken
} from "@/lib/adminAuth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password, name } = body;

    const normalizedEmail = String(email || "").trim().toLowerCase();
    const trimmedPass = String(password || "").trim();

    if (!normalizedEmail || !normalizedEmail.includes("@")) {
      return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
    }

    if (!trimmedPass || trimmedPass.length < 4) {
      return NextResponse.json({ error: "Password must be at least 4 characters." }, { status: 400 });
    }

    const ip = req.headers.get("x-forwarded-for") || undefined;
    const userAgent = req.headers.get("user-agent") || undefined;

    // 1. Check if the email belongs to the Admin whitelist
    const isAdmin = isAdminEmail(normalizedEmail);

    if (isAdmin) {
      // Admin password verification
      if (!isValidAdminPassword(trimmedPass)) {
        await logLoginActivity({
          email: normalizedEmail,
          role: "admin",
          status: "failed",
          authProvider: "password",
          ip,
          userAgent,
        });

        return NextResponse.json(
          { error: "Invalid admin password." },
          { status: 401 }
        );
      }

      // Successful Admin Authentication
      await logLoginActivity({
        email: normalizedEmail,
        role: "admin",
        status: "success",
        authProvider: "password",
        ip,
        userAgent,
      });

      const effectiveUid = "admin-" + Buffer.from(normalizedEmail).toString("hex").slice(0, 8);
      const effectiveDisplayName = name || normalizedEmail.split("@")[0].toUpperCase();

      await recordUser({
        uid: effectiveUid,
        email: normalizedEmail,
        displayName: effectiveDisplayName,
        role: "admin",
        rollNumber: "OS-ADMIN",
        authProvider: "password",
      });

      // Issue 7-day HMAC-SHA256 cryptographically signed session token
      const sessionData = {
        email: normalizedEmail,
        role: "admin" as const,
        exp: Date.now() + 7 * 24 * 3600 * 1000,
      };
      const token = createSignedAdminToken(sessionData);

      const response = NextResponse.json({
        success: true,
        role: "admin",
        redirectTo: "/admin",
        token,
        user: {
          uid: effectiveUid,
          email: normalizedEmail,
          displayName: effectiveDisplayName,
          role: "admin",
          rollNumber: "OS-ADMIN",
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

    // 2. Regular User Authentication
    const existingUsers = await getAllUsers();
    const existingUser = existingUsers.find((u) => u.email.toLowerCase() === normalizedEmail);

    const displayName = name || existingUser?.displayName || normalizedEmail.split("@")[0];

    // Log the user login into persistent database
    await logLoginActivity({
      email: normalizedEmail,
      role: "user",
      status: "success",
      authProvider: "password",
      ip,
      userAgent,
    });

    const recordedUser = await recordUser({
      uid: existingUser?.uid || "usr-" + Date.now().toString(36),
      email: normalizedEmail,
      displayName,
      role: "user",
      rollNumber: existingUser?.rollNumber || `OS-USR-${Math.floor(1000 + Math.random() * 9000)}`,
      authProvider: "password",
    });

    return NextResponse.json({
      success: true,
      role: "user",
      redirectTo: "/",
      user: {
        uid: recordedUser.uid,
        email: recordedUser.email,
        displayName: recordedUser.displayName,
        role: "user",
        rollNumber: recordedUser.rollNumber,
      },
    });
  } catch (err: any) {
    console.error("Unified auth error:", err);
    const status = err?.code === "FIRESTORE_DISABLED" ? 503 : 500;
    return NextResponse.json(
      { 
        error: err?.message || "Authentication system encountered an issue. Please try again.",
        code: err?.code || "AUTH_ERROR",
        activationUrl: err?.activationUrl,
      },
      { status }
    );
  }
}
