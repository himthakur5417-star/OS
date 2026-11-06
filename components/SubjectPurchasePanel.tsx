"use client";

import React, { useCallback, useEffect, useState } from "react";
import Script from "next/script";
import { CheckCircle, Lock, ShieldCheck } from "@phosphor-icons/react";
import { auth, getFirebaseAuth } from "@/lib/firebase";
import { useAuth } from "@/components/AuthContext";
import type { PaidSubjectId } from "@/lib/paymentCatalog";

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => {
      open: () => void;
      on: (event: string, handler: (response: unknown) => void) => void;
    };
  }
}

interface CatalogSubject {
  id: PaidSubjectId;
  title: string;
  amountPaise: number | null;
  currency: string;
  accessDays: number;
  configured: boolean;
}

export interface SubjectEntitlementInfo {
  subjectId: PaidSubjectId;
  active: boolean;
  expired: boolean;
  purchasedAt: string | null;
  expiresAt: string | null;
}

interface Props {
  subjectId: PaidSubjectId;
  entitlement?: SubjectEntitlementInfo | null;
  entitlementLoading?: boolean;
  onEntitlementUpdated?: (updated?: SubjectEntitlementInfo) => Promise<void> | void;
}

function formatAmount(amountPaise: number | null, currency: string): string {
  if (amountPaise === null) return "Price to be configured";
  return new Intl.NumberFormat("en-IN", { style: "currency", currency }).format(amountPaise / 100);
}

function formatExpiryDate(isoDate: string | null | undefined): string {
  if (!isoDate) return "";
  const timestamp = Date.parse(isoDate);
  if (!Number.isFinite(timestamp)) return "";
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(timestamp));
}

export default function SubjectPurchasePanel({
  subjectId,
  entitlement: externalEntitlement,
  entitlementLoading = false,
  onEntitlementUpdated,
}: Props) {
  const { user, openAuthModal } = useAuth();
  const [subject, setSubject] = useState<CatalogSubject | null>(null);
  const [checkoutReady, setCheckoutReady] = useState(false);
  const [scriptReady, setScriptReady] = useState(
    () => typeof window !== "undefined" && typeof window.Razorpay === "function"
  );
  const [scriptError, setScriptError] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [localEntitlement, setLocalEntitlement] = useState<SubjectEntitlementInfo | null>(null);
  const [nowMs, setNowMs] = useState(() => Date.now());

  useEffect(() => {
    if (typeof window !== "undefined" && typeof window.Razorpay === "function") {
      setScriptError(false);
      setScriptReady(true);
    }
  }, [subjectId]);

  useEffect(() => {
    const timer = setInterval(() => setNowMs(Date.now()), 30000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let active = true;
    fetch("/api/payment-catalog", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (!active) return;
        setSubject((data.subjects || []).find((item: CatalogSubject) => item.id === subjectId) || null);
        setCheckoutReady(Boolean(data.checkoutReady));
      })
      .catch(() => {
        if (active) setMessage("Pricing is not available right now.");
      });
    return () => {
      active = false;
    };
  }, [subjectId]);

  const fetchStandaloneEntitlement = useCallback(async () => {
    const firebaseAuth = auth || getFirebaseAuth();
    const currentUser = firebaseAuth?.currentUser;
    if (!user || !currentUser) {
      setLocalEntitlement(null);
      return;
    }

    try {
      const idToken = await currentUser.getIdToken();
      const res = await fetch("/api/payment-entitlements", {
        method: "GET",
        headers: { Authorization: `Bearer ${idToken}` },
        cache: "no-store",
      });
      if (!res.ok) return;
      const data = await res.json();
      const item = data?.entitlements?.[subjectId] as SubjectEntitlementInfo | undefined;
      if (item) {
        setLocalEntitlement(item);
      }
    } catch {
      // Ignore standalone background fetch errors
    }
  }, [subjectId, user]);

  useEffect(() => {
    if (externalEntitlement !== undefined) {
      setLocalEntitlement(externalEntitlement);
      return;
    }
    fetchStandaloneEntitlement();
  }, [externalEntitlement, fetchStandaloneEntitlement]);

  const effectiveEntitlement = localEntitlement ?? externalEntitlement ?? null;
  const expiryTimestamp = effectiveEntitlement?.expiresAt ? Date.parse(effectiveEntitlement.expiresAt) : NaN;
  const isAccessActive = Boolean(
    effectiveEntitlement?.active &&
      Number.isFinite(expiryTimestamp) &&
      expiryTimestamp > nowMs
  );
  const isAccessExpired = Boolean(
    effectiveEntitlement &&
      Number.isFinite(expiryTimestamp) &&
      expiryTimestamp <= nowMs
  );

  const startCheckout = async () => {
    setMessage(null);
    if (!user) {
      openAuthModal("signin");
      return;
    }
    if (isAccessActive) {
      setMessage(
        `Purchased / Access Active until ${formatExpiryDate(effectiveEntitlement?.expiresAt)}.`
      );
      return;
    }
    if (!subject?.configured || !checkoutReady) {
      setMessage("Checkout is not configured for this subject yet.");
      return;
    }
    const firebaseAuth = auth || getFirebaseAuth();
    if (scriptError || !firebaseAuth?.currentUser || !window.Razorpay || !scriptReady) {
      setMessage(
        scriptError
          ? "Razorpay Checkout could not be loaded. Please try again later."
          : "Please sign in again before starting checkout."
      );
      return;
    }

    setBusy(true);
    try {
      const idToken = await firebaseAuth.currentUser.getIdToken();
      const orderResponse = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${idToken}` },
        body: JSON.stringify({ subjectId }),
      });
      const order = await orderResponse.json();
      if (orderResponse.status === 409 && order?.alreadyActive) {
        const activeInfo: SubjectEntitlementInfo = {
          subjectId,
          active: true,
          expired: false,
          purchasedAt: order.purchasedAt || new Date().toISOString(),
          expiresAt: order.expiresAt || null,
        };
        setLocalEntitlement(activeInfo);
        await onEntitlementUpdated?.(activeInfo);
        setBusy(false);
        return;
      }
      if (!orderResponse.ok) throw new Error(order.error || "Unable to create payment order.");

      const checkout = new window.Razorpay({
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        name: "Officium Supremum",
        description: `${subject.title} — ${subject.accessDays}-day access`,
        order_id: order.orderId,
        prefill: { name: user.displayName || "", email: user.email || "" },
        theme: { color: "#34483C" },
        modal: {
          ondismiss: () => {
            setBusy(false);
            setMessage("Checkout was closed without completing payment.");
          },
        },
        handler: async (response: any) => {
          try {
            const verifyResponse = await fetch("/api/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json", Authorization: `Bearer ${idToken}` },
              body: JSON.stringify(response),
            });
            const result = await verifyResponse.json();
            if (!verifyResponse.ok) throw new Error(result.error || "Payment verification failed.");

            const updatedInfo: SubjectEntitlementInfo = {
              subjectId,
              active: true,
              expired: false,
              purchasedAt: result.purchasedAt || new Date().toISOString(),
              expiresAt: result.expiresAt || null,
            };
            setLocalEntitlement(updatedInfo);
            await onEntitlementUpdated?.(updatedInfo);
            setMessage(
              `Payment verified. ${subject.title} access is active until ${formatExpiryDate(result.expiresAt)}.`
            );
          } catch (error: any) {
            setMessage(error?.message || "Payment verification failed. Please contact support.");
          } finally {
            setBusy(false);
          }
        },
      });
      checkout.on("payment.failed", () => {
        setBusy(false);
        setMessage("Payment failed or was declined. No access was granted.");
      });
      checkout.open();
    } catch (error: any) {
      setBusy(false);
      setMessage(error?.message || "Unable to start checkout.");
    }
  };

  if (!subject) return null;

  if (isAccessActive) {
    const formattedExpiry = formatExpiryDate(effectiveEntitlement?.expiresAt);
    return (
      <div className="mt-5 rounded-2xl border border-emerald-700/25 bg-emerald-50/70 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-700/15 text-emerald-800 flex items-center justify-center shrink-0">
            <CheckCircle className="w-4 h-4" weight="bold" />
          </div>
          <div>
            <div className="text-xs font-label uppercase tracking-wider text-emerald-800 font-semibold">
              Purchased / Access Active
            </div>
            <div className="text-sm font-heading font-semibold text-[#0B192C]">
              {subject.title} · Valid until {formattedExpiry}
            </div>
            <div className="mt-1 text-[11px] text-slate-600 font-sans flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>All chapters in this volume open directly in full reader mode</span>
            </div>
          </div>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#34483C] text-[#F3EFE6] text-xs font-label uppercase tracking-wider font-bold shrink-0">
          <CheckCircle className="w-3.5 h-3.5" weight="bold" />
          <span>Access Active</span>
        </div>
      </div>
    );
  }

  const unavailableMessage = scriptError
    ? "Razorpay Checkout could not be loaded. Please try again later."
    : !subject.configured
    ? "Checkout is disabled until this subject price is configured."
    : !checkoutReady
    ? "Checkout is disabled until Razorpay Test Mode and server payment storage are configured."
    : null;

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
        onLoad={() => {
          setScriptError(false);
          setScriptReady(true);
        }}
        onReady={() => {
          setScriptError(false);
          setScriptReady(true);
        }}
        onError={() => {
          setScriptReady(false);
          setScriptError(true);
          setMessage("Razorpay Checkout could not be loaded. Please try again later.");
        }}
      />
      <div className="mt-5 rounded-2xl border border-[#34483C]/20 bg-[#F3EFE6] p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#34483C]/10 text-[#34483C] flex items-center justify-center shrink-0">
            <Lock className="w-4 h-4" weight="bold" />
          </div>
          <div>
            <div className="text-xs font-label uppercase tracking-wider text-[#34483C] font-semibold">
              {isAccessExpired ? "Access Expired · Renew Subject Access" : "Full subject access"}
            </div>
            <div className="text-sm font-heading font-semibold text-[#252923]">
              {formatAmount(subject.amountPaise, subject.currency)} · {subject.accessDays}-day access
            </div>
            <div className="mt-1 text-[11px] text-[#252923]/65 font-sans flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#34483C]" weight="bold" />
              <span>
                {isAccessExpired
                  ? `Previous access expired on ${formatExpiryDate(effectiveEntitlement?.expiresAt)}. Purchase to unlock full chapters again.`
                  : "Verified server-side after captured payment"}
              </span>
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={startCheckout}
          disabled={busy || entitlementLoading || !subject.configured || !checkoutReady || !scriptReady || scriptError}
          className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-[#34483C] hover:bg-[#252923] disabled:opacity-45 disabled:cursor-not-allowed text-[#F3EFE6] text-xs font-label uppercase tracking-wider font-bold transition-colors shadow-sm"
        >
          {busy
            ? "Preparing Checkout…"
            : subject.configured && checkoutReady && scriptReady && !scriptError
            ? "Buy Subject Access"
            : !subject.configured
            ? "Price Not Configured"
            : "Checkout Unavailable"}
        </button>
        {unavailableMessage && <p className="sm:basis-full text-xs text-[#34483C] font-sans" role="status">{unavailableMessage}</p>}
        {message && !unavailableMessage && <p className="sm:basis-full text-xs text-[#34483C] font-sans" role="status">{message}</p>}
      </div>
    </>
  );
}
