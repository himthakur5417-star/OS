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
    const { email, password, name, isSignUp } = body;

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

    // 1. Check if the email belongs to the Admin list
    const isAdmin = isAdminEmail(normalizedEmail);

    if (isAdmin) {
      // Admin verification
      if (trimmedPass !== ADMIN_PASSWORD) {
        logLoginActivity({
          email: normalizedEmail,
          role: "admin",
          status: "failed",
          ip,
          userAgent,
        });

        return NextResponse.json(
          { error: "Invalid admin password." },
          { status: 401 }
        );
      }

      // Successful Admin Authentication
      logLoginActivity({
        email: normalizedEmail,
        role: "admin",
        status: "success",
        ip,
        userAgent,
      });

      recordUser({
        uid: "admin-" + Buffer.from(normalizedEmail).toString("hex").slice(0, 8),
        email: normalizedEmail,
        displayName: name || normalizedEmail.split("@")[0].toUpperCase(),
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
        user: {
          uid: "admin-" + normalizedEmail,
          email: normalizedEmail,
          displayName: name || normalizedEmail.split("@")[0].toUpperCase(),
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
    const existingUsers = getAllUsers();
    const existingUser = existingUsers.find((u) => u.email.toLowerCase() === normalizedEmail);

    const displayName = name || existingUser?.displayName || normalizedEmail.split("@")[0];

    // Log the user login into database
    logLoginActivity({
      email: normalizedEmail,
      role: "user",
      status: "success",
      ip,
      userAgent,
    });

    const recordedUser = recordUser({
      uid: existingUser?.uid || "usr-" + Date.now().toString(36),
      email: normalizedEmail,
      displayName,
      role: "cadet", // internal compatibility with existing UserAccount role
      rollNumber: existingUser?.rollNumber || `OS-MBR-${Math.floor(1000 + Math.random() * 9000)}`,
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
    return NextResponse.json(
      { error: "Authentication system encountered an issue. Please try again." },
      { status: 500 }
    );
  }
}
