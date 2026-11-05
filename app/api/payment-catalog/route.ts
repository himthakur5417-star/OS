import { NextResponse } from "next/server";
import { getPublicSubjectCatalog } from "@/lib/paymentCatalog";
import { isRazorpayCheckoutConfigured } from "@/lib/razorpay";
import { isPaymentPersistenceConfigured } from "@/lib/purchases";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(
    {
      subjects: getPublicSubjectCatalog(),
      checkoutReady: Boolean(isRazorpayCheckoutConfigured() && isPaymentPersistenceConfigured()),
    },
    { headers: { "Cache-Control": "no-store" } }
  );
}
