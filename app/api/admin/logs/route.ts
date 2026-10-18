import { NextRequest, NextResponse } from "next/server";
import { getLoginLogs, clearLoginLogs } from "@/lib/db";
import { verifyAdminSession } from "@/lib/adminAuth";

export async function GET(req: NextRequest) {
  if (!verifyAdminSession(req)) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get("limit") || "200", 10);
    const logs = await getLoginLogs(limit);

    return NextResponse.json({ logs });
  } catch (error: any) {
    console.error("Failed to fetch login logs:", error);
    const status = error?.code === "FIRESTORE_DISABLED" ? 503 : 500;
    return NextResponse.json(
      { 
        error: error?.message || "Failed to fetch login logs from database.",
        code: error?.code || "DB_ERROR",
        activationUrl: error?.activationUrl,
      },
      { status }
    );
  }
}

export async function DELETE(req: NextRequest) {
  if (!verifyAdminSession(req)) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    await clearLoginLogs();
    return NextResponse.json({ success: true, message: "Login logs successfully cleared." });
  } catch (error: any) {
    console.error("Failed to clear login logs:", error);
    const status = error?.code === "FIRESTORE_DISABLED" ? 503 : 500;
    return NextResponse.json(
      { 
        error: error?.message || "Failed to clear login logs.",
        code: error?.code || "DB_ERROR",
        activationUrl: error?.activationUrl,
      },
      { status }
    );
  }
}
