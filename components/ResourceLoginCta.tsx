"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/components/AuthContext";
import { Lock, ArrowRight, BookOpen } from "lucide-react";

interface ResourceLoginCtaProps {
  returnUrl: string;
  resourceTitle?: string;
}

export default function ResourceLoginCta({ returnUrl, resourceTitle }: ResourceLoginCtaProps) {
  const { user, openAuthModal } = useAuth();

  if (user) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-6 sm:p-8 text-center max-w-2xl mx-auto shadow-sm">
        <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-3">
          <BookOpen className="w-5 h-5 text-emerald-700" />
        </div>
        <h3 className="font-heading text-lg sm:text-xl font-semibold text-emerald-950">
          You are signed in as {user.displayName || "Cadet"}
        </h3>
        <p className="mt-2 text-xs sm:text-sm text-emerald-800 leading-relaxed font-sans max-w-md mx-auto">
          You have full access to all chapter PDFs, solved drill problems, and previous years&apos; answer keys in the study library.
        </p>
        <div className="mt-5">
          <Link
            href="/resources"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0B192C] hover:bg-slate-800 text-white text-xs font-label uppercase tracking-wider font-semibold transition-all shadow-sm"
          >
            <span>Open Study Library</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#C8A84E]" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-[#FAF7F2] p-6 sm:p-8 text-center max-w-2xl mx-auto shadow-sm">
      <div className="w-10 h-10 rounded-full bg-amber-100/80 text-[#0B192C] flex items-center justify-center mx-auto mb-3">
        <Lock className="w-5 h-5 text-[#C8A84E]" />
      </div>
      <h3 className="font-heading text-xl sm:text-2xl font-semibold text-[#0B192C]">
        Sign in to access full study material
      </h3>
      <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed font-sans max-w-lg mx-auto">
        {resourceTitle
          ? `Enrolled students can access complete ${resourceTitle} chapter booklets, detailed step-by-step solutions, and past examination papers in the study library.`
          : "Enrolled students can access complete chapter booklets, detailed step-by-step solutions, and past examination papers in the study library."}
      </p>
      <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => openAuthModal("signin", returnUrl)}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#0B192C] hover:bg-slate-800 text-white text-xs font-label uppercase tracking-wider font-semibold transition-all shadow-sm cursor-pointer"
        >
          <Lock className="w-3.5 h-3.5 text-[#C8A84E]" />
          <span>Sign In to Access Study Material</span>
        </button>
        <Link
          href="/resources"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-label uppercase tracking-wider font-semibold transition-all shadow-sm"
        >
          <span>All Study Materials</span>
        </Link>
      </div>
    </div>
  );
}
