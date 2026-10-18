import { NextRequest, NextResponse } from "next/server";
import { getLoginLogs, clearLoginLogs } from "@/lib/db";
import { verifyAdminSession } from "@/lib/adminAuth";

export async function GET(req: NextRequest) {
  if (!verifyAdminSession(req)) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const limit = parseInt(searchParams.get("limit") || "200", 10);
  const logs = getLoginLogs(limit);

  return NextResponse.json({ logs });
}

export async function DELETE(req: NextRequest) {
  if (!verifyAdminSession(req)) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  clearLoginLogs();
  return NextResponse.json({ success: true, message: "Login logs successfully cleared." });
}
