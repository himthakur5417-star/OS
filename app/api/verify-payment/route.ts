import { NextRequest, NextResponse } from "next/server";
import { getVerifiedPaymentUser } from "@/lib/paymentAuth";
import { reconcileCapturedPayment, verifyRazorpaySignature } from "@/lib/razorpay";

export async function POST(req: NextRequest) {
  try {
    const user = await getVerifiedPaymentUser(req);
    if (!user) return NextResponse.json({ error: "Authentication is required." }, { status: 401 });

    const body = await req.json().catch(() => ({}));
    const orderId = typeof body?.razorpay_order_id === "string" ? body.razorpay_order_id.trim() : "";
    const paymentId = typeof body?.razorpay_payment_id === "string" ? body.razorpay_payment_id.trim() : "";
    const signature = typeof body?.razorpay_signature === "string" ? body.razorpay_signature.trim() : "";

    if (!orderId || !paymentId || !signature) {
      return NextResponse.json({ error: "Payment verification fields are incomplete." }, { status: 400 });
    }
    if (!verifyRazorpaySignature(orderId, paymentId, signature)) {
      return NextResponse.json({ error: "Payment signature could not be verified." }, { status: 400 });
    }

    const entitlement = await reconcileCapturedPayment(orderId, paymentId, user.uid);
    return NextResponse.json({
      success: true,
      subjectId: entitlement.subjectId,
      purchasedAt: entitlement.purchasedAt,
      expiresAt: entitlement.expiresAt,
    });
  } catch (error) {
    console.error("Razorpay payment verification failed.");
    return NextResponse.json({ error: "Payment could not be verified or persisted. Please contact support with your order reference." }, { status: 400 });
  }
}
