import { NextRequest, NextResponse } from "next/server";
import { logTraffic } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { path, userEmail, role, referrer } = body;

    const ip = req.headers.get("x-forwarded-for") || undefined;
    const userAgent = req.headers.get("user-agent") || undefined;

    if (path) {
      await logTraffic({
        path: String(path).slice(0, 150),
        userEmail: userEmail ? String(userEmail).trim() : undefined,
        role: role ? String(role) : undefined,
        referrer: referrer ? String(referrer).slice(0, 200) : undefined,
        ip,
        userAgent,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
