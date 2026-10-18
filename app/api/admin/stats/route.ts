import { NextRequest, NextResponse } from "next/server";
import { getAcademyStats } from "@/lib/db";
import { verifyAdminSession } from "@/lib/adminAuth";

export async function GET(req: NextRequest) {
  if (!verifyAdminSession(req)) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const stats = await getAcademyStats();
    return NextResponse.json({ stats });
  } catch (error: any) {
    console.error("Failed to fetch academy stats:", error);
    const status = error?.code === "FIRESTORE_DISABLED" ? 503 : 500;
    return NextResponse.json(
      { 
        error: error?.message || "Failed to retrieve academy statistics from database.",
        code: error?.code || "STATS_ERROR",
        activationUrl: error?.activationUrl,
      },
      { status }
    );
  }
}
