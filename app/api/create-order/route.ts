import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { getVerifiedPaymentUser } from "@/lib/paymentAuth";
import { getConfiguredAmount, getPaidSubject, PAYMENT_CURRENCY } from "@/lib/paymentCatalog";
import { getPublicRazorpayKeyId, getRazorpayClient } from "@/lib/razorpay";
import { hasActiveSubjectAccess, savePaymentOrder } from "@/lib/purchases";

export async function POST(req: NextRequest) {
  try {
    const user = await getVerifiedPaymentUser(req);
    if (!user) return NextResponse.json({ error: "Authentication is required." }, { status: 401 });

    const body = await req.json().catch(() => ({}));
    const subjectId = typeof body?.subjectId === "string" ? body.subjectId : "";
    const subject = getPaidSubject(subjectId);
    const amountPaise = subject ? getConfiguredAmount(subject) : null;
    const publicKeyId = getPublicRazorpayKeyId();

    if (!subject) return NextResponse.json({ error: "Invalid or non-purchasable subject." }, { status: 400 });
    if (amountPaise === null) {
      return NextResponse.json({ error: "This subject is not configured for checkout yet." }, { status: 503 });
    }
    if (amountPaise < 100) return NextResponse.json({ error: "Configured amount is below Razorpay minimum." }, { status: 503 });
    if (!publicKeyId) return NextResponse.json({ error: "Razorpay checkout is not configured yet." }, { status: 503 });

    // Prevent duplicate purchase if the authenticated user already has active access to this subject
    const { active: alreadyActive, entitlement: existingEntitlement } = await hasActiveSubjectAccess(
      user.uid,
      subject.id
    );
    if (alreadyActive) {
      return NextResponse.json(
        {
          error: "You already have active access to this subject.",
          alreadyActive: true,
          subjectId: subject.id,
          purchasedAt: existingEntitlement?.purchasedAt || null,
          expiresAt: existingEntitlement?.expiresAt || null,
        },
        { status: 409 }
      );
    }

    const receipt = `os_${Date.now()}_${crypto.randomBytes(4).toString("hex")}`;
    const order = await getRazorpayClient().orders.create({
      amount: amountPaise,
      currency: PAYMENT_CURRENCY,
      receipt,
      notes: {
        subject_id: subject.id,
        user_id: user.uid,
      },
    });

    await savePaymentOrder({
      orderId: order.id,
      uid: user.uid,
      subjectId: subject.id,
      amountPaise,
      currency: PAYMENT_CURRENCY,
      status: "created",
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({
      orderId: order.id,
      amount: amountPaise,
      currency: PAYMENT_CURRENCY,
      keyId: publicKeyId,
      subjectId: subject.id,
    });
  } catch (error) {
    console.error("Razorpay order creation failed.");
    return NextResponse.json({ error: "Unable to create a payment order right now." }, { status: 503 });
  }
}
