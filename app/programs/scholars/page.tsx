"use client";

import React from "react";
import Link from "next/link";
import { useModals } from "@/components/ModalContext";
import {
  GraduationCap,
  Target,
  Clock,
  BookOpen,
  CheckCircle,
  ArrowRight,
  Stack,
  ShieldCheck,
  WhatsappLogo,
} from "@phosphor-icons/react";

export default function ScholarsProgramPage() {
  const { openOrientation } = useModals();

  const studySteps = [
    {
      num: "01",
      title: "Testing to Remember",
      desc: "Rather than passively re-reading textbooks, we use quick self-quizzes and targeted practice problems so formulas and concepts remain sharp.",
      icon: Target,
    },
    {
      num: "02",
      title: "The Mistake Journal",
      desc: "Every wrong answer is recorded with root cause analysis—calculation error, forgotten theorem, or conceptual gap—so mistakes never repeat.",
      icon: BookOpen,
    },
    {
      num: "03",
      title: "Full Exam Simulation",
      desc: "Strictly timed 3-hour practice tests under authentic conditions build speed, emotional composure, and time awareness before board and entrance exams.",
      icon: CheckCircle,
    },
    {
      num: "04",
      title: "Sustained Stamina",
      desc: "Disciplined sleep schedules, daily physical activity, and regular mentor checks ensure high motivation without academic burnout.",
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="bg-[#F3EFE6] text-[#252923] min-h-screen relative overflow-x-hidden selection:bg-[#34483C] selection:text-[#F3EFE6]">

      {/* ========================================================================= */}
      {/* 1. SCHOLARS HERO SECTION                                                 */}
      {/* ========================================================================= */}
      <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 border-b border-[#D8D5C8]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          {/* Headline */}
          <h1 className="heading-1 text-[#252923] text-balance">
            Score High in Exams Without Burning Out.
          </h1>

          {/* Subtitle */}
          <p className="body-2 text-[#252923]/75 max-w-2xl mx-auto text-pretty">
            Class 11 and 12 can feel overwhelming when balancing school board syllabus with competitive entrance exams. Officium Supremum gives students a clear daily study routine, focused practice blocks, and proven retention methods.
          </p>

          {/* CTAs */}
          <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => openOrientation("scholars")}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#34483C] hover:bg-[#252923] text-[#F3EFE6] button-sm uppercase tracking-wider transition-colors shadow-soft-sm flex items-center justify-center gap-2"
            >
              <span>Book a Free 20-Minute Call</span>
              <ArrowRight className="w-4 h-4" weight="bold" />
            </button>

            <Link
              href="/resources"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl border border-[#D8D5C8] hover:border-[#34483C] bg-white text-[#252923] button-sm uppercase tracking-wider transition-colors flex items-center justify-center shadow-soft-sm"
            >
              <span>View Study Resources</span>
            </Link>
          </div>

          {/* Quick Indicators */}
          <div className="pt-3 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-[#252923]/70 font-medium">
            <span>• Balanced Board &amp; Entrance Prep</span>
            <span>• Focused 90-Minute Blocks</span>
            <span>• Weekly Accountability Checks</span>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. BALANCING BOARDS AND ENTRANCE EXAMS                                   */}
      {/* ========================================================================= */}
      <section className="py-20 lg:py-24 bg-white border-b border-[#D8D5C8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

            <div className="lg:col-span-5 space-y-3">
              <div className="caption-3 uppercase tracking-widest text-[#B18A58] font-semibold">
                Strategic Time Architecture
              </div>
              <h2 className="heading-2 text-[#252923]">
                Balancing Board Exams and Entrance Tests
              </h2>
              <p className="body-2 text-[#252923]/75 pt-1 text-pretty">
                Many students spend weekdays stressing over school tests and weekends cramming for entrance exams without retaining either. We connect both syllabi so that deep conceptual mastery for entrance exams simultaneously produces top marks in board exams.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">

              <div className="p-7 sm:p-8 rounded-2xl bg-[#F3EFE6] border border-[#D8D5C8] shadow-soft-sm space-y-3.5">
                <div className="w-11 h-11 rounded-xl bg-[#34483C]/10 border border-[#34483C]/20 flex items-center justify-center text-[#34483C]">
                  <Stack className="w-5 h-5" weight="bold" />
                </div>
                <h3 className="title-2 text-[#252923]">
                  Learn Concepts in Depth
                </h3>
                <p className="body-3 text-[#252923]/75 leading-relaxed">
                  Understand core concepts thoroughly once, then practice rapid problem-solving for entrance exams and rigorous step-by-step answers for board exams.
                </p>
              </div>

              <div className="p-7 sm:p-8 rounded-2xl bg-[#F3EFE6] border border-[#D8D5C8] shadow-soft-sm space-y-3.5">
                <div className="w-11 h-11 rounded-xl bg-[#34483C]/10 border border-[#34483C]/20 flex items-center justify-center text-[#34483C]">
                  <Clock className="w-5 h-5" weight="bold" />
                </div>
                <h3 className="title-2 text-[#252923]">
                  Focused 90-Minute Blocks
                </h3>
                <p className="body-3 text-[#252923]/75 leading-relaxed">
                  Study in quiet, uninterrupted 90-minute blocks without notifications. Two disciplined blocks produce superior results to eight hours of distracted study.
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. CORE SCHOLARS PILLARS (4 STEPS TO ACADEMIC SUCCESS)                   */}
      {/* ========================================================================= */}
      <section className="py-20 lg:py-24 bg-[#F3EFE6] border-b border-[#D8D5C8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <div className="caption-3 uppercase tracking-widest text-[#B18A58] font-semibold">
              The 4 Steps to Academic Success
            </div>
            <h2 className="heading-2 text-[#252923]">
              How We Help You Study Smarter
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {studySteps.map((col, idx) => {
              const IconComp = col.icon;
              return (
                <div
                  key={idx}
                  className="p-7 rounded-2xl bg-white border border-[#D8D5C8] shadow-soft-sm space-y-3 hover:border-[#34483C] transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-11 h-11 rounded-xl bg-[#34483C]/10 border border-[#34483C]/20 flex items-center justify-center text-[#34483C]">
                      <IconComp className="w-5 h-5" weight="bold" />
                    </div>
                    <div className="caption-3 text-[#B18A58] uppercase tracking-wider font-semibold">
                      Step {col.num}
                    </div>
                    <h3 className="title-2 text-[#252923]">
                      {col.title}
                    </h3>
                    <p className="body-3 text-[#252923]/75 leading-relaxed">
                      {col.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. SCHOLARS GUIDANCE CALLOUT (Forest Sage Canvas)                        */}
      {/* ========================================================================= */}
      <section className="py-20 lg:py-24 text-center bg-[#34483C] text-[#F3EFE6] relative">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-5">

          <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-[#F3EFE6] mx-auto">
            <GraduationCap className="w-6 h-6" weight="bold" />
          </div>

          <h2 className="heading-2 text-[#F3EFE6] text-balance">
            Book a Free 20-Minute Guidance Call
          </h2>

          <p className="body-2 text-[#F3EFE6]/80 max-w-lg mx-auto text-pretty">
            Speak with an Officium Supremum mentor to review your current syllabus coverage, study schedule, and board or entrance exam targets.
          </p>

          <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => openOrientation("scholars")}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#F3EFE6] hover:bg-white text-[#252923] button-sm uppercase tracking-wider transition-colors shadow-soft-sm"
            >
              Book a Free 20-Minute Call
            </button>
            <a
              href="https://wa.me/918969634656?text=Hello%20Officium%20Supremum,%20I%20would%20like%20guidance%20for%20the%20Scholars%20Program"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl border border-[#F3EFE6]/30 hover:border-[#F3EFE6] text-[#F3EFE6] button-sm uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
            >
              <WhatsappLogo className="w-4 h-4" weight="bold" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>

        </div>
      </section>

    </div>
  );
}
