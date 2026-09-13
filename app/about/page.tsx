"use client";

import React from "react";
import Link from "next/link";
import { useModals } from "@/components/ModalContext";
import { Shield, Target, Compass, Award, CheckCircle2, ArrowRight } from "lucide-react";

export default function AboutPage() {
  const { openOrientation } = useModals();

  return (
    <div className="bg-[#FAFAF9] text-[#0F172A] min-h-screen">
      {/* Hero */}
      <section className="relative pt-20 pb-20 lg:pt-28 lg:pb-24 border-b border-slate-200/60 bg-gradient-to-b from-white via-[#FAF7F2]/60 to-[#FAFAF9]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-slate-200/80 shadow-soft-sm text-xs font-label uppercase tracking-widest text-[#C8A84E]">
            <Compass className="w-3.5 h-3.5 text-[#C8A84E]" />
            <span>The Academy Charter</span>
          </div>

          <h1 className="font-heading text-4xl sm:text-6xl font-semibold tracking-tight text-[#0B192C] leading-tight">
            We Build Systems, Mindsets, &amp; <br />
            <span className="text-[#C8A84E]">Uncompromising Leaders.</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 font-sans leading-relaxed max-w-2xl mx-auto">
            Officium Supremum is not a mass coaching institute. It is a discipline-first learning academy designed to transform ambitious students into future officers and high-performance achievers.
          </p>
        </div>
      </section>

      {/* Core Principles */}
      <section className="py-24 border-b border-slate-200/60 bg-[#FAFAF9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-soft-sm space-y-4 hover:shadow-soft-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200/60 flex items-center justify-center text-[#C8A84E]">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-semibold text-xl text-[#0B192C]">Execution Over Advice</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                Knowledge without a daily cadence is useless. We focus 80% of our energy on daily habit compliance, night briefing audits, and error log reviews.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-soft-sm space-y-4 hover:shadow-soft-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200/60 flex items-center justify-center text-sky-600">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-semibold text-xl text-[#0B192C]">The Academy Standard</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                Modeled after the rigorous routines of India&apos;s premier military and leadership institutions: early wakeups, physical stamina, and mental poise under stress.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-soft-sm space-y-4 hover:shadow-soft-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200/60 flex items-center justify-center text-emerald-600">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-semibold text-xl text-[#0B192C]">Long-Term Retention</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                Active recall testing and structured spaced repetition ensure you do not suffer from the forgetting curve when examination day arrives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final Callout */}
      <section className="py-24 text-center bg-gradient-to-b from-[#FAFAF9] to-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-6">
          <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-[#0B192C]">
            Experience the Officium Supremum Difference
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-sans max-w-lg mx-auto">
            Book an orientation session with our academic mentors to evaluate your goals and build your roadmap.
          </p>
          <div className="pt-2">
            <button
              onClick={() => openOrientation("general")}
              className="px-8 py-4 rounded-xl bg-[#0B192C] hover:bg-[#1E293B] text-white font-label font-bold text-xs uppercase tracking-widest shadow-md hover:shadow-lg transition-all active:scale-95"
            >
              Book Orientation
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
