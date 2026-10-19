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
            <span>About Officium Supremum</span>
          </div>

          <h1 className="font-heading text-4xl sm:text-6xl font-semibold tracking-tight text-[#0B192C] leading-tight">
            We Build Strong Habits, Clear Thinking, <br />
            <span className="text-[#C8A84E]">and Confident Leaders.</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 font-sans leading-relaxed max-w-2xl mx-auto">
            Officium Supremum is not a crowded coaching institute. We are a personal mentorship academy that helps students build strong discipline, master their syllabus, and prepare with confidence for school, college, and defence exams.
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
              <h3 className="font-heading font-semibold text-xl text-[#0B192C]">Daily Action Over Endless Advice</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                Advice without daily action does not help. We focus our energy on practical daily habits, regular progress checks, and clearing doubts immediately.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-soft-sm space-y-4 hover:shadow-soft-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200/60 flex items-center justify-center text-sky-600">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-semibold text-xl text-[#0B192C]">High Standards &amp; Good Habits</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                Inspired by the daily discipline of India&apos;s defence academies: a regular morning routine, physical fitness, and staying calm under pressure.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-soft-sm space-y-4 hover:shadow-soft-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200/60 flex items-center justify-center text-emerald-600">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-semibold text-xl text-[#0B192C]">Remembering What You Study</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                We use quick self-quizzes and planned revisions so you remember formulas, vocabulary, and concepts long before examination day arrives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final Callout */}
      <section className="py-24 text-center bg-gradient-to-b from-[#FAFAF9] to-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-6">
          <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-[#0B192C]">
            Talk to an Academic Mentor
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-sans max-w-lg mx-auto">
            Schedule a free 20-minute call with our mentors to discuss your goals and receive a personalized study plan.
          </p>
          <div className="pt-2">
            <button
              onClick={() => openOrientation("general")}
              className="px-8 py-4 rounded-xl bg-[#0B192C] hover:bg-[#1E293B] text-white font-label font-bold text-xs uppercase tracking-widest shadow-md hover:shadow-lg transition-all active:scale-95"
            >
              Book a Free 20-Minute Call
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
