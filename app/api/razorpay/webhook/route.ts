import { NextRequest, NextResponse } from "next/server";
import { reconcileCapturedPayment, verifyWebhookSignature } from "@/lib/razorpay";

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const signature = req.headers.get("x-razorpay-signature") || "";
  if (!verifyWebhookSignature(rawBody, signature)) {
    return NextResponse.json({ error: "Invalid webhook signature." }, { status: 400 });
  }

  try {
    const payload = JSON.parse(rawBody);
    const event = typeof payload?.event === "string" ? payload.event : "";
    if (event !== "payment.captured" && event !== "order.paid") {
      return NextResponse.json({ received: true });
    }

    const payment = payload?.payload?.payment?.entity;
    const order = payload?.payload?.order?.entity;
    const paymentId = typeof payment?.id === "string" ? payment.id : "";
    const orderId = typeof payment?.order_id === "string" ? payment.order_id : typeof order?.id === "string" ? order.id : "";
    if (!paymentId || !orderId) return NextResponse.json({ error: "Webhook payment references are incomplete." }, { status: 400 });

    await reconcileCapturedPayment(orderId, paymentId);
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Razorpay webhook reconciliation failed.");
    return NextResponse.json({ error: "Webhook reconciliation failed." }, { status: 500 });
  }
}
