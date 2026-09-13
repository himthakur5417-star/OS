import { NextRequest, NextResponse } from "next/server";
import { getAllUsers, recordUser } from "@/lib/db";
import { verifyAdminSession } from "@/lib/adminAuth";

export async function GET(req: NextRequest) {
  if (!verifyAdminSession(req)) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  const users = getAllUsers();
  return NextResponse.json({ users });
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

    const assignedRole = role || "cadet";
    const user = recordUser({
      uid: "user-" + Math.random().toString(36).substr(2, 8),
      email: String(email).trim().toLowerCase(),
      displayName: String(displayName).trim(),
      role: assignedRole,
      rollNumber: `OS-${assignedRole.slice(0, 3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`,
      phone,
      targetExam,
    });

    return NextResponse.json({ success: true, user });
  } catch (error) {
    return NextResponse.json({ error: "Failed to record user" }, { status: 500 });
  }
}
