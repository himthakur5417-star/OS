import { NextRequest, NextResponse } from "next/server";
import { getVerifiedPaymentUser } from "@/lib/paymentAuth";
import { getUserSubjectEntitlements } from "@/lib/purchases";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const user = await getVerifiedPaymentUser(req);
    if (!user) {
      return NextResponse.json(
        { error: "Authentication is required to view subject entitlements." },
        { status: 401, headers: { "Cache-Control": "no-store" } }
      );
    }

    const entitlements = await getUserSubjectEntitlements(user.uid);

    return NextResponse.json(
      { entitlements },
      { status: 200, headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.error("Failed to fetch subject entitlements.");
    return NextResponse.json(
      { error: "Unable to load subject entitlements right now." },
      { status: 503, headers: { "Cache-Control": "no-store" } }
    );
  }
}
