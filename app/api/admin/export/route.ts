import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { verifyAdminSession } from "@/lib/adminAuth";

export async function GET(req: NextRequest) {
  if (!verifyAdminSession(req)) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const format = searchParams.get("format") || "sql";

  const dbDir = path.join(process.cwd(), "data");
  const fileName = format === "csv" ? "traffic_and_logins.csv" : "traffic_and_logins.sql";
  const filePath = path.join(dbDir, fileName);

  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: "Export file not generated yet" }, { status: 404 });
  }

  const fileBuffer = fs.readFileSync(filePath);
  const contentType = format === "csv" ? "text/csv" : "application/sql";

  return new NextResponse(fileBuffer, {
    status: 200,
    headers: {
      "Content-Type": contentType,
      "Content-Disposition": `attachment; filename="${fileName}"`,
    },
  });
}
