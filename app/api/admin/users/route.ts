import { NextRequest, NextResponse } from "next/server";
import { getAllUsers, recordUser } from "@/lib/db";
import { verifyAdminSession } from "@/lib/adminAuth";

export async function GET(req: NextRequest) {
  if (!verifyAdminSession(req)) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const users = await getAllUsers();
    return NextResponse.json({ users });
  } catch (error: any) {
    console.error("Failed to fetch users:", error);
    const status = error?.code === "FIRESTORE_DISABLED" ? 503 : 500;
    return NextResponse.json(
      { 
        error: error?.message || "Failed to fetch users from database.",
        code: error?.code || "DB_ERROR",
        activationUrl: error?.activationUrl,
      },
      { status }
    );
  }
}

export async function POST(req: NextRequest) {
  if (!verifyAdminSession(req)) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { email, displayName, role, phone, targetExam } = body;

    if (!email || !displayName) {
      return NextResponse.json({ error: "Email and Name are required" }, { status: 400 });
    }

    const assignedRole = role === "admin" ? "admin" : "user";
    const user = await recordUser({
      uid: "user-" + Math.random().toString(36).substr(2, 8),
      email: String(email).trim().toLowerCase(),
      displayName: String(displayName).trim(),
      role: assignedRole,
      rollNumber: `OS-${assignedRole === "admin" ? "ADM" : "USR"}-${Math.floor(1000 + Math.random() * 9000)}`,
      phone,
      targetExam,
    });

    return NextResponse.json({ success: true, user });
  } catch (error: any) {
    console.error("Failed to record user:", error);
    const status = error?.code === "FIRESTORE_DISABLED" ? 503 : 500;
    return NextResponse.json(
      { 
        error: error?.message || "Failed to record user in database.",
        code: error?.code || "DB_ERROR",
        activationUrl: error?.activationUrl,
      },
      { status }
    );
  }
}
