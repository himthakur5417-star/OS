import { NextRequest, NextResponse } from "next/server";
import { logLoginActivity, recordUser, getUserById } from "@/lib/db";
import { 
  SESSION_COOKIE_NAME, 
  isAdminEmail,
  createSignedAdminToken,
  verifyFirebaseIdToken
} from "@/lib/adminAuth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, displayName, uid, idToken } = body;

    let verifiedEmail = String(email || "").trim().toLowerCase();
    let verifiedUid = uid;
    let authProvider = "google.com";

    // 1. If Firebase ID token is provided, verify it cryptographically on server
    if (idToken) {
      const fbUser = await verifyFirebaseIdToken(idToken);
      if (fbUser) {
        verifiedEmail = fbUser.email.toLowerCase();
        verifiedUid = fbUser.uid;
        authProvider = fbUser.provider || "google.com";
      } else {
        return NextResponse.json(
          { error: "Invalid or expired Google authentication session. Please sign in again." },
          { status: 401 }
        );
      }
    }

    if (!verifiedEmail || !verifiedEmail.includes("@")) {
      return NextResponse.json({ error: "Invalid email provided by Google." }, { status: 400 });
    }

    const ip = req.headers.get("x-forwarded-for") || undefined;
    const userAgent = req.headers.get("user-agent") || undefined;

    // 2. Check if the authenticated Google email is in the admin whitelist
    const isAdmin = isAdminEmail(verifiedEmail);

    if (isAdmin) {
      // Security check: Admin access via Google MUST provide a verified ID token
      if (!idToken) {
        return NextResponse.json(
          { error: "Admin access requires a verified Firebase authentication token." },
          { status: 403 }
        );
      }

      await logLoginActivity({
        email: verifiedEmail,
        role: "admin",
        status: "success",
        authProvider: "google.com",
        ip,
        userAgent,
      });

      const effectiveUid = verifiedUid || "admin-" + Buffer.from(verifiedEmail).toString("hex").slice(0, 8);
      const effectiveDisplayName = displayName || verifiedEmail.split("@")[0].toUpperCase();

      await recordUser({
        uid: effectiveUid,
        email: verifiedEmail,
        displayName: effectiveDisplayName,
        role: "admin",
        rollNumber: "OS-ADMIN",
        authProvider: "google.com",
      }, idToken);

      // Issue 7-day cryptographically signed HMAC-SHA256 session token
      const sessionData = {
        email: verifiedEmail,
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
          email: verifiedEmail,
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

    // 3. Standard user sign-in via Google (non-admin)
    const existingUser = verifiedUid ? await getUserById(verifiedUid, idToken) : null;
    const effectiveDisplayName = displayName || existingUser?.displayName || verifiedEmail.split("@")[0];

    await logLoginActivity({
      email: verifiedEmail,
      role: "user",
      status: "success",
      authProvider: "google.com",
      ip,
      userAgent,
    });

    const recordedUser = await recordUser({
      uid: verifiedUid || existingUser?.uid || "usr-" + Date.now().toString(36),
      email: verifiedEmail,
      displayName: effectiveDisplayName,
      role: "user",
      rollNumber: existingUser?.rollNumber || `OS-USR-${Math.floor(1000 + Math.random() * 9000)}`,
      authProvider: "google.com",
    }, idToken);

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
    console.error("Google sync error:", err);
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
