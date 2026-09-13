import { NextRequest, NextResponse } from "next/server";
import { getAcademyStats } from "@/lib/db";
import { verifyAdminSession } from "@/lib/adminAuth";

export async function GET(req: NextRequest) {
  if (!verifyAdminSession(req)) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  const stats = getAcademyStats();
  return NextResponse.json({ stats });
}
