import crypto from "crypto";
import Razorpay from "razorpay";
import { getPaymentEntitlement, getPaymentOrder, savePaymentEntitlement, savePaymentOrder } from "@/lib/purchases";
import { getPaidSubject, PAYMENT_ACCESS_DAYS, PAYMENT_CURRENCY, type PaidSubjectId } from "@/lib/paymentCatalog";

interface RazorpayConfiguration {
  keyId: string;
  publicKeyId: string;
  keySecret: string;
}

function getRazorpayConfiguration(): RazorpayConfiguration | null {
  const keyId = process.env.RAZORPAY_KEY_ID?.trim() || "";
  const publicKeyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID?.trim() || keyId;
  const keySecret = process.env.RAZORPAY_KEY_SECRET?.trim() || "";

  // Accepts both Razorpay Test Mode and Live Mode keys
  if (!/^(rzp_test_|rzp_live_)[A-Za-z0-9]+$/.test(keyId) || publicKeyId !== keyId || !keySecret) {
    return null;
  }

  return { keyId, publicKeyId, keySecret };
}

export function getRazorpayClient(): Razorpay {
  const configuration = getRazorpayConfiguration();
  if (!configuration) throw new Error("Razorpay configuration is incomplete or invalid.");
  return new Razorpay({ key_id: configuration.keyId, key_secret: configuration.keySecret });
}

export function getPublicRazorpayKeyId(): string | null {
  return getRazorpayConfiguration()?.publicKeyId || null;
}

export function isRazorpayCheckoutConfigured(): boolean {
  return Boolean(getRazorpayConfiguration());
}

export function verifyRazorpaySignature(orderId: string, paymentId: string, signature: string): boolean {
  const configuration = getRazorpayConfiguration();
  if (!configuration) return false;
  const expected = crypto.createHmac("sha256", configuration.keySecret).update(`${orderId}|${paymentId}`).digest("hex");
  const received = Buffer.from(signature, "utf8");
  const calculated = Buffer.from(expected, "utf8");
  return received.length === calculated.length && crypto.timingSafeEqual(received, calculated);
}

export function verifyWebhookSignature(rawBody: string, signature: string): boolean {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET?.trim();
  if (!secret) return false;
  const expected = crypto.createHmac("sha256", secret).update(rawBody).digest("hex");
  const received = Buffer.from(signature, "utf8");
  const calculated = Buffer.from(expected, "utf8");
  return received.length === calculated.length && crypto.timingSafeEqual(received, calculated);
}

export async function reconcileCapturedPayment(orderId: string, paymentId: string, expectedUid?: string) {
  const pending = await getPaymentOrder(orderId);
  if (!pending || pending.status === "verification_failed") {
    throw new Error("Pending payment order was not found.");
  }
  if (expectedUid && pending.uid !== expectedUid) {
    throw new Error("Payment order ownership mismatch.");
  }

  const subject = getPaidSubject(pending.subjectId as PaidSubjectId);
  if (!subject || pending.currency !== PAYMENT_CURRENCY || pending.amountPaise < 100) {
    throw new Error("Payment order configuration mismatch.");
  }

  const client = getRazorpayClient();
  const [payment, order] = await Promise.all([
    client.payments.fetch(paymentId),
    client.orders.fetch(orderId),
  ]);

  if (
    payment.id !== paymentId ||
    payment.order_id !== orderId ||
    payment.status !== "captured" ||
    Number(payment.amount) !== pending.amountPaise ||
    String(payment.currency) !== pending.currency ||
    order.id !== orderId ||
    Number(order.amount) !== pending.amountPaise ||
    String(order.currency) !== pending.currency
  ) {
    throw new Error("Payment status or amount mismatch.");
  }

  const existingEntitlement = await getPaymentEntitlement(pending.uid, pending.subjectId);
  if (existingEntitlement?.paymentId === paymentId) {
    return {
      subjectId: existingEntitlement.subjectId,
      purchasedAt: existingEntitlement.purchasedAt,
      expiresAt: existingEntitlement.expiresAt,
    };
  }

  if (pending.status === "paid" && pending.paymentId === paymentId && pending.expiresAt && pending.purchasedAt) {
    return {
      subjectId: pending.subjectId,
      purchasedAt: pending.purchasedAt,
      expiresAt: pending.expiresAt,
    };
  }

  const purchasedAt = new Date().toISOString();
  const expiresAt = new Date(Date.parse(purchasedAt) + PAYMENT_ACCESS_DAYS * 24 * 60 * 60 * 1000).toISOString();

  await savePaymentEntitlement({
    uid: pending.uid,
    subjectId: pending.subjectId,
    paymentId,
    orderId,
    status: "active",
    purchasedAt,
    expiresAt,
  });

  await savePaymentOrder({
    ...pending,
    status: "paid",
    paymentId,
    purchasedAt,
    expiresAt,
  });

  return { subjectId: pending.subjectId, purchasedAt, expiresAt };
}
