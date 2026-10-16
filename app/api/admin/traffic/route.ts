import { NextRequest, NextResponse } from "next/server";
import { getTrafficLogs } from "@/lib/db";
import { verifyAdminSession } from "@/lib/adminAuth";

export async function GET(req: NextRequest) {
  if (!verifyAdminSession(req)) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const limit = parseInt(searchParams.get("limit") || "200", 10);
  const traffic = getTrafficLogs(limit);

  return NextResponse.json({ traffic });
}
