"use client";

import React from "react";
import Link from "next/link";
import { useModals } from "@/components/ModalContext";
import {
  GraduationCap,
  Target,
  Clock,
  BookOpen,
  CheckCircle2,
  ArrowRight,
  Layers,
  BarChart3,
  Zap,
  Sparkles,
  ShieldAlert,
} from "lucide-react";

export default function ScholarsProgramPage() {
  const { openOrientation, openAi } = useModals();

  return (
    <div className="bg-[#FAF7F2] text-[#3B2F20] min-h-screen">
      {/* ========================================================================= */}
      {/* 1. SCHOLARS HERO SECTION — Oxford/Cambridge Light Academic Theme          */}
      {/* ========================================================================= */}
      <section className="relative pt-20 pb-24 lg:pt-28 lg:pb-32 border-b border-[#E8DFD0]/80 overflow-hidden bg-gradient-to-b from-[#FFFDF8] via-[#FAF7F2] to-[#F5EFE5]">
        {/* Soft warm radial */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C8A84E]/8 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-[#D4C4A8]/60 shadow-soft-sm">
              <GraduationCap className="w-3.5 h-3.5 text-[#8B6914]" />
              <span className="font-label text-xs uppercase tracking-[0.18em] text-[#8B6914] font-semibold">
                Class 11–12 • Academic Mastery &amp; Competitive Track
              </span>
            </div>

            <h1 className="font-heading text-4xl sm:text-6xl font-semibold tracking-tight text-[#2C1F0F] leading-[1.08]">
              High-Stakes Mastery. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B6914] via-[#C8A84E] to-[#A37D2E]">
                Zero Burnout.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#5A4A35] font-sans leading-relaxed">
              Senior secondary school is where most students crash under the twin pressures of board exams and competitive entrance tests. Officium Supremum builds an airtight study cadence, ruthless time management, and active recall routines.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={() => openOrientation("scholars")}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#2C1F0F] hover:bg-[#3B2F20] text-white font-label font-bold text-xs uppercase tracking-widest shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <span>Book Scholar Diagnostic</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => openAi("planner")}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white hover:bg-[#FFFDF8] border border-[#D4C4A8]/80 text-[#5A4A35] font-label font-semibold text-xs uppercase tracking-widest transition-all shadow-soft-sm hover:shadow-soft-md"
              >
                <span>Plan Today&apos;s 5-Hour Schedule</span>
              </button>
            </div>

            <div className="pt-4 flex items-center gap-6 text-xs text-[#8B7A5E] font-label uppercase tracking-wider">
              <span>• Board + Entrance Synergy</span>
              <span>• Deep Work Protocols</span>
              <span>• Weekly Testing Diagnostics</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. THE DUAL-GOAL BALANCING ENGINE                                        */}
      {/* ========================================================================= */}
      <section className="py-24 bg-[#F5EFE5] border-b border-[#E8DFD0]/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-4">
              <div className="font-label text-xs uppercase tracking-[0.2em] text-[#8B6914] font-semibold">
                Strategic Balance
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl font-medium tracking-tight text-[#2C1F0F] leading-tight">
                Solving the &quot;Boards vs. Competitive&quot; Paradox
              </h2>
              <p className="text-xs sm:text-sm text-[#5A4A35] leading-relaxed font-sans">
                Students often spend weekdays agonizing over school tests and weekends cramming for competitive exams without retaining either. We sync syllabus coverage so concept depth in competitive exams automatically powers board distinction.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-white border border-[#E8DFD0]/80 shadow-soft-sm space-y-3 hover:shadow-soft-md transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] border border-[#D4C4A8]/60 flex items-center justify-center text-[#8B6914]">
                  <Layers className="w-5 h-5" />
                </div>
                <h4 className="font-heading font-semibold text-lg text-[#2C1F0F]">
                  Concept In-Depth Synchronisation
                </h4>
                <p className="text-xs text-[#6B5D4A] leading-relaxed font-sans">
                  Covering theory to the highest depth first, followed by speed drills for objective papers and written formulation for subjective boards.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-[#E8DFD0]/80 shadow-soft-sm space-y-3 hover:shadow-soft-md transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] border border-[#D4C4A8]/60 flex items-center justify-center text-[#8B6914]">
                  <Clock className="w-5 h-5" />
                </div>
                <h4 className="font-heading font-semibold text-lg text-[#2C1F0F]">
                  Strict 90-Minute Deep Work Blocks
                </h4>
                <p className="text-xs text-[#6B5D4A] leading-relaxed font-sans">
                  Eliminating shallow multitasking. Two concentrated 90-minute blocks deliver more retention than 8 hours of distracted studying.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. CORE SCHOLARS PILLARS                                                 */}
      {/* ========================================================================= */}
      <section className="py-24 bg-[#FAF7F2] border-b border-[#E8DFD0]/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="font-label text-xs uppercase tracking-[0.2em] text-[#8B6914] font-semibold">
              The 4 Pillars of Scholar Excellence
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-medium tracking-tight text-[#2C1F0F]">
              Systematic Academic Engineering
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                num: "01",
                title: "Active Recall & Spaced Tests",
                desc: "Replacing passive notebook reading with active flash-drills to permanently anchor formulas and mechanisms.",
              },
              {
                num: "02",
                title: "Error Log Analysis",
                desc: "Every wrong question is categorized by silly mistake, formula lapse, or concept gap, preventing repeated blunders.",
              },
              {
                num: "03",
                title: "Exam Endurance Conditioning",
                desc: "Simulating 3-hour full-syllabus papers under monitored conditions to inoculate against panic and time starvation.",
              },
              {
                num: "04",
                title: "Burnout Defense Protocols",
                desc: "Sleep hygiene, mandatory outdoor exercise, and weekly emotional resilience briefings with senior mentors.",
              },
            ].map((col, idx) => (
              <div key={idx} className="p-6 rounded-xl bg-white border border-[#E8DFD0]/80 shadow-soft-sm space-y-3 hover:shadow-soft-md transition-shadow">
                <div className="font-label text-xs text-[#8B6914] uppercase tracking-widest font-bold">
                  Phase {col.num}
                </div>
                <h4 className="font-heading font-semibold text-lg text-[#2C1F0F]">
                  {col.title}
                </h4>
                <p className="text-xs text-[#6B5D4A] leading-relaxed font-sans">
                  {col.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. SCHOLARS ASSESSMENT CTA                                               */}
      {/* ========================================================================= */}
      <section className="py-24 bg-gradient-to-b from-[#FAF7F2] to-[#FFFDF8] text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-6">
          <div className="w-12 h-12 rounded-xl bg-white border border-[#D4C4A8]/60 shadow-soft-sm flex items-center justify-center text-[#8B6914] mx-auto">
            <GraduationCap className="w-6 h-6" />
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl font-semibold tracking-tight text-[#2C1F0F]">
            Schedule Your Scholar Baseline Assessment
          </h2>

          <p className="text-xs sm:text-sm text-[#5A4A35] font-sans max-w-lg mx-auto leading-relaxed">
            A 20-minute diagnostic session with an Officium Supremum mentor to audit current syllabus completion, time leaks, and exam targets.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => openOrientation("scholars")}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#2C1F0F] hover:bg-[#3B2F20] text-white font-label font-bold text-xs uppercase tracking-widest shadow-md transition-all active:scale-95"
            >
              Book Scholar Diagnostic
            </button>
            <a
              href="https://wa.me/918969634656?text=I%20am%20interested%20in%20the%20Officium%20Supremum%20Scholars%20Program%20(Class%2011-12)"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white border border-[#D4C4A8]/80 text-[#2C1F0F] font-label text-xs uppercase tracking-widest hover:bg-[#FAF7F2] shadow-soft-sm hover:shadow-soft-md transition-all"
            >
              Admissions WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
