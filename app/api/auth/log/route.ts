import { NextRequest, NextResponse } from "next/server";
import { logLoginActivity, recordUser } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, role, status, userAgent, userDetails } = body;

    // Log the login attempt
    if (email) {
      logLoginActivity({
        email: String(email).trim(),
        role: role || "cadet",
        status: status === "failed" ? "failed" : "success",
        userAgent: userAgent || req.headers.get("user-agent") || undefined,
        ip: req.headers.get("x-forwarded-for") || undefined,
      });
    }

    // If user profile details are provided, record or update in the user directory
    if (userDetails && userDetails.uid && userDetails.email) {
      recordUser({
        uid: userDetails.uid,
        email: userDetails.email,
        displayName: userDetails.displayName || userDetails.email.split("@")[0],
        role: userDetails.role || "cadet",
        rollNumber: userDetails.rollNumber || `OS-${(userDetails.role || "cadet").slice(0, 3).toUpperCase()}-2025`,
        phone: userDetails.phone,
        targetExam: userDetails.targetExam,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Auth logging failed:", error);
    return NextResponse.json({ error: "Failed to record login activity" }, { status: 500 });
  }
}
