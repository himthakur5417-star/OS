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
  ShieldCheck,
  MessageCircle,
} from "lucide-react";

export default function ScholarsProgramPage() {
  const { openOrientation } = useModals();

  const studySteps = [
    {
      num: "01",
      title: "Testing to Remember",
      desc: "Rather than just reading textbooks again and again, we use short quizzes and practice questions so formulas stay fresh in your mind.",
      icon: Target,
    },
    {
      num: "02",
      title: "Mistake Notebook",
      desc: "Every wrong answer is noted down with the reason why—silly calculation mistake, forgotten formula, or misunderstood concept—so you do not repeat it.",
      icon: BookOpen,
    },
    {
      num: "03",
      title: "Real Exam Practice",
      desc: "Full-length 3-hour practice tests under timed conditions to build speed, accuracy, and confidence before the actual exam.",
      icon: CheckCircle2,
    },
    {
      num: "04",
      title: "Avoiding Burnout",
      desc: "Proper sleep schedules, daily physical exercise, and regular check-ins with your mentor to keep motivation high.",
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="bg-[#211C1D] text-[#E8DCC6] min-h-screen relative overflow-hidden selection:bg-[#722F37] selection:text-[#E8DCC6]">

      {/* Subtle Ambient Radial Accents */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[min(600px,100vw)] h-[min(600px,100vw)] bg-[#722F37]/15 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 left-0 w-[min(450px,100vw)] h-[min(450px,100vw)] bg-[#B7A89A]/10 rounded-full blur-[120px]" />
      </div>

      {/* ========================================================================= */}
      {/* 1. SCHOLARS HERO SECTION                                                 */}
      {/* ========================================================================= */}
      <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-28 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl space-y-6">

            {/* Academic Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#E8DCC6]/10 border border-[#E8DCC6]/20 shadow-sm">
              <GraduationCap className="w-3.5 h-3.5 text-[#E8DCC6]" />
              <span className="font-label text-xs uppercase tracking-[0.2em] text-[#E8DCC6] font-semibold">
                Class 11–12 • Academic Guidance &amp; Exam Preparation
              </span>
            </div>

            {/* Editorial Display Headline */}
            <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-[#E8DCC6] leading-[1.08]">
              Score High in Exams <br />
              <span className="text-[#E8DCC6] italic font-normal">
                Without Burning Out.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#E8DCC6]/80 font-sans leading-relaxed">
              Class 11 and 12 can feel overwhelming when balancing school board exams with entrance tests. Officium Supremum gives students a clear daily study routine, focused practice sessions, and techniques to remember what they study longer.
            </p>

            {/* CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => openOrientation("scholars")}
                className="px-8 py-4 rounded-full bg-[#722F37] hover:bg-[#853741] text-[#E8DCC6] font-label font-bold text-xs uppercase tracking-widest shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 border border-[#E8DCC6]/20"
              >
                <span>Book a Free 20-Minute Call</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <Link
                href="/resources"
                className="px-8 py-4 rounded-full border border-[#E8DCC6]/30 hover:border-[#E8DCC6] text-[#E8DCC6] font-label text-xs uppercase tracking-widest transition-colors flex items-center justify-center text-center"
              >
                <span>View Study Resources</span>
              </Link>
            </div>

            {/* Quick Indicators */}
            <div className="pt-4 flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-[#B7A89A] font-label uppercase tracking-widest">
              <span>• Balanced Board &amp; Entrance Prep</span>
              <span>• Focused 90-Minute Blocks</span>
              <span>• Weekly Progress Checks</span>
            </div>

          </div>
        </div>
      </section>

      {/* Smooth dissolution: Near Black (#211C1D) into Supporting Cream (#FAF7F2) */}
      <div
        className="w-full h-16 sm:h-24 pointer-events-none relative z-10"
        style={{ background: "linear-gradient(to bottom, #211C1D 0%, #34292B 20%, #685354 45%, #B7A89A 70%, #E8DCC6 88%, #FAF7F2 100%)" }}
        aria-hidden="true"
      />

      {/* ========================================================================= */}
      {/* 2. THE DUAL-GOAL BALANCING ENGINE (Light Cream Transition Ground)         */}
      {/* ========================================================================= */}
      <section className="py-20 lg:py-28 bg-[#FAF7F2] text-[#211C1D] relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            <div className="lg:col-span-5 space-y-4">
              <div className="font-label text-xs uppercase tracking-[0.2em] text-[#722F37] font-semibold">
                Strategic Time Architecture
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#211C1D] leading-tight">
                Balancing Board Exams and Entrance Tests
              </h2>
              <p className="text-sm sm:text-base text-[#5C524F] leading-relaxed font-sans pt-2">
                Many students spend weekdays stressing over school tests and weekends cramming for entrance exams without remembering either. We connect both syllabi so that mastering deep concepts for entrance exams automatically helps you score top marks in school boards.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">

              <div className="p-8 sm:p-9 rounded-3xl bg-white border border-[#E8DCC6] shadow-soft-sm hover:shadow-soft-md transition-shadow space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#722F37]/10 border border-[#722F37]/20 flex items-center justify-center text-[#722F37]">
                  <Layers className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-semibold text-2xl text-[#211C1D]">
                  Learn Concepts in Depth
                </h3>
                <p className="text-xs sm:text-sm text-[#5C524F] leading-relaxed font-sans">
                  Learn core concepts thoroughly once, then practice fast problem-solving for entrance exams and step-by-step answers for board exams.
                </p>
              </div>

              <div className="p-8 sm:p-9 rounded-3xl bg-white border border-[#E8DCC6] shadow-soft-sm hover:shadow-soft-md transition-shadow space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#722F37]/10 border border-[#722F37]/20 flex items-center justify-center text-[#722F37]">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-semibold text-2xl text-[#211C1D]">
                  Focused 90-Minute Blocks
                </h3>
                <p className="text-xs sm:text-sm text-[#5C524F] leading-relaxed font-sans">
                  Study in quiet, uninterrupted 90-minute blocks without phone notifications. Two focused blocks produce better results than eight hours of distracted sitting.
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Smooth dissolution: Supporting Cream (#FAF7F2) into Near Black (#211C1D) */}
      <div
        className="w-full h-16 sm:h-24 pointer-events-none relative z-10"
        style={{ background: "linear-gradient(to bottom, #FAF7F2 0%, #E8DCC6 15%, #B7A89A 35%, #685354 60%, #34292B 80%, #211C1D 100%)" }}
        aria-hidden="true"
      />

      {/* ========================================================================= */}
      {/* 3. CORE SCHOLARS PILLARS (4 STEPS TO ACADEMIC SUCCESS)                   */}
      {/* ========================================================================= */}
      <section className="py-24 bg-[#211C1D] relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="font-label text-xs uppercase tracking-[0.2em] text-[#B7A89A] font-semibold">
              The 4 Steps to Academic Success
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#E8DCC6]">
              How We Help You Study Smarter
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {studySteps.map((col, idx) => {
              const IconComp = col.icon;
              return (
                <div
                  key={idx}
                  className="p-8 rounded-3xl bg-[#282224] border border-[#E8DCC6]/15 shadow-soft-md space-y-4 hover:border-[#722F37] transition-all flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#722F37]/25 border border-[#722F37]/50 flex items-center justify-center text-[#E8DCC6]">
                      <IconComp className="w-6 h-6 text-[#E8DCC6]" />
                    </div>
                    <div className="font-label text-xs text-[#B7A89A] uppercase tracking-widest font-semibold">
                      Step {col.num}
                    </div>
                    <h3 className="font-heading font-semibold text-xl text-[#E8DCC6]">
                      {col.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#E8DCC6]/75 leading-relaxed font-sans">
                      {col.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Smooth dissolution: Near Black (#211C1D) into Burgundy (#722F37) */}
      <div
        className="w-full h-16 sm:h-24 pointer-events-none relative z-10"
        style={{ background: "linear-gradient(to bottom, #211C1D 0%, #331C1F 25%, #461E23 50%, #5E262D 75%, #722F37 100%)" }}
        aria-hidden="true"
      />

      {/* ========================================================================= */}
      {/* 4. SCHOLARS ASSESSMENT & GUIDANCE CALLOUT (Burgundy Canvas)              */}
      {/* ========================================================================= */}
      <section className="py-24 text-center bg-[#722F37] relative z-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-6">

          <div className="w-12 h-12 rounded-2xl bg-[#E8DCC6]/15 border border-[#E8DCC6]/30 shadow-soft-sm flex items-center justify-center text-[#E8DCC6] mx-auto">
            <GraduationCap className="w-6 h-6" />
          </div>

          <h2 className="font-heading text-3xl sm:text-5xl font-semibold text-[#E8DCC6]">
            Book a Free 20-Minute Guidance Call
          </h2>

          <p className="text-sm sm:text-base text-[#E8DCC6]/85 font-sans max-w-lg mx-auto leading-relaxed">
            Speak with an Officium Supremum mentor to review your current syllabus coverage, study schedule, and exam goals.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => openOrientation("scholars")}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#211C1D] hover:bg-[#282224] text-[#E8DCC6] font-label font-bold text-xs uppercase tracking-widest shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95 border border-[#E8DCC6]/20"
            >
              Book a Free 20-Minute Call
            </button>
            <a
              href="https://wa.me/918969634656?text=Hello%20Officium%20Supremum,%20I%20would%20like%20guidance%20for%20the%20Scholars%20Program"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-full border border-[#E8DCC6]/30 hover:border-[#E8DCC6] text-[#E8DCC6] font-label text-xs uppercase tracking-widest hover:bg-[#E8DCC6]/10 transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat with an Advisor on WhatsApp</span>
            </a>
          </div>

        </div>
      </section>

      {/* Smooth dissolution: Burgundy (#722F37) into Footer Near Black (#211C1D) */}
      <div
        className="w-full h-16 sm:h-24 pointer-events-none relative z-10"
        style={{ background: "linear-gradient(to bottom, #722F37 0%, #5E262D 25%, #461E23 50%, #331C1F 75%, #211C1D 100%)" }}
        aria-hidden="true"
      />

    </div>
  );
}
