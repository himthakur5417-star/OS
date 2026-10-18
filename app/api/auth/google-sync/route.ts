import { NextRequest, NextResponse } from "next/server";
import { logLoginActivity, recordUser, getAllUsers } from "@/lib/db";
import { 
  ADMIN_PASSWORD, 
  SESSION_COOKIE_NAME, 
  isAdminEmail 
} from "@/lib/adminAuth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, displayName, uid } = body;

    const normalizedEmail = String(email || "").trim().toLowerCase();

    if (!normalizedEmail || !normalizedEmail.includes("@")) {
      return NextResponse.json({ error: "Invalid email provided by Google." }, { status: 400 });
    }

    const ip = req.headers.get("x-forwarded-for") || undefined;
    const userAgent = req.headers.get("user-agent") || undefined;

    // Check if the authenticated Google email is an administrator
    const isAdmin = isAdminEmail(normalizedEmail);

    if (isAdmin) {
      logLoginActivity({
        email: normalizedEmail,
        role: "admin",
        status: "success",
        ip,
        userAgent,
      });

      recordUser({
        uid: uid || "admin-" + Buffer.from(normalizedEmail).toString("hex").slice(0, 8),
        email: normalizedEmail,
        displayName: displayName || normalizedEmail.split("@")[0].toUpperCase(),
        role: "admin",
        rollNumber: "OS-ADMIN",
      });

      // Issue 7-day session token
      const sessionData = {
        email: normalizedEmail,
        role: "admin",
        exp: Date.now() + 7 * 24 * 3600 * 1000,
      };
      const token = Buffer.from(JSON.stringify(sessionData)).toString("base64");

      const response = NextResponse.json({
        success: true,
        role: "admin",
        redirectTo: "/admin",
        token,
        user: {
          uid: uid || "admin-" + normalizedEmail,
          email: normalizedEmail,
          displayName: displayName || normalizedEmail.split("@")[0].toUpperCase(),
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

    // Standard user sign-in via Google
    const existingUsers = getAllUsers();
    const existingUser = existingUsers.find((u) => u.email.toLowerCase() === normalizedEmail);

    const effectiveDisplayName = displayName || existingUser?.displayName || normalizedEmail.split("@")[0];

    logLoginActivity({
      email: normalizedEmail,
      role: "user",
      status: "success",
      ip,
      userAgent,
    });

    const recordedUser = recordUser({
      uid: uid || existingUser?.uid || "usr-" + Date.now().toString(36),
      email: normalizedEmail,
      displayName: effectiveDisplayName,
      role: "user",
      rollNumber: existingUser?.rollNumber || `OS-USR-${Math.floor(1000 + Math.random() * 9000)}`,
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
    console.error("Google sync error:", err);
    return NextResponse.json(
      { error: "Authentication system encountered an issue. Please try again." },
      { status: 500 }
    );
  }
}
