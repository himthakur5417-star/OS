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
  const { openOrientation } = useModals();

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
                Class 11–12 • Academic Guidance &amp; Exam Preparation
              </span>
            </div>

            <h1 className="font-heading text-4xl sm:text-6xl font-semibold tracking-tight text-[#2C1F0F] leading-[1.08]">
              Score High in Exams <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B6914] via-[#C8A84E] to-[#A37D2E]">
                Without Burning Out.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#5A4A35] font-sans leading-relaxed">
              Class 11 and 12 can feel overwhelming when balancing school board exams with entrance tests. Officium Supremum gives students a clear daily study routine, focused practice sessions, and techniques to remember what they study longer.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={() => openOrientation("scholars")}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#2C1F0F] hover:bg-[#3B2F20] text-white font-label font-bold text-xs uppercase tracking-widest shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <span>Book a Free 20-Minute Call</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <Link
                href="/resources"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white hover:bg-[#FFFDF8] border border-[#D4C4A8]/80 text-[#5A4A35] font-label font-semibold text-xs uppercase tracking-widest transition-all shadow-soft-sm hover:shadow-soft-md text-center"
              >
                <span>View Study Resources</span>
              </Link>
            </div>

            <div className="pt-4 flex items-center gap-6 text-xs text-[#8B7A5E] font-label uppercase tracking-wider">
              <span>• Balanced Board &amp; Entrance Prep</span>
              <span>• Focused Study Blocks</span>
              <span>• Weekly Progress Checks</span>
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
                Balancing Board Exams and Entrance Tests
              </h2>
              <p className="text-xs sm:text-sm text-[#5A4A35] leading-relaxed font-sans">
                Many students spend weekdays stressing over school tests and weekends cramming for entrance exams without remembering either. We connect both syllabi so that mastering deep concepts for entrance exams automatically helps you score top marks in school boards.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-white border border-[#E8DFD0]/80 shadow-soft-sm space-y-3 hover:shadow-soft-md transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] border border-[#D4C4A8]/60 flex items-center justify-center text-[#8B6914]">
                  <Layers className="w-5 h-5" />
                </div>
                <h4 className="font-heading font-semibold text-lg text-[#2C1F0F]">
                  Learn Concepts in Depth
                </h4>
                <p className="text-xs text-[#6B5D4A] leading-relaxed font-sans">
                  Learn core concepts thoroughly once, then practice fast problem-solving for entrance exams and step-by-step answers for board exams.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-[#E8DFD0]/80 shadow-soft-sm space-y-3 hover:shadow-soft-md transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] border border-[#D4C4A8]/60 flex items-center justify-center text-[#8B6914]">
                  <Clock className="w-5 h-5" />
                </div>
                <h4 className="font-heading font-semibold text-lg text-[#2C1F0F]">
                  Focused 90-Minute Study Blocks
                </h4>
                <p className="text-xs text-[#6B5D4A] leading-relaxed font-sans">
                  Study in quiet, uninterrupted 90-minute blocks without phone notifications. Two focused blocks produce better results than eight hours of distracted sitting.
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
              The 4 Steps to Academic Success
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-medium tracking-tight text-[#2C1F0F]">
              How We Help You Study Smarter
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                num: "01",
                title: "Testing to Remember",
                desc: "Rather than just reading textbooks again and again, we use short quizzes and practice questions so formulas stay fresh in your mind.",
              },
              {
                num: "02",
                title: "Mistake Notebook",
                desc: "Every wrong answer is noted down with the reason why—silly calculation mistake, forgotten formula, or misunderstood concept—so you do not repeat it.",
              },
              {
                num: "03",
                title: "Real Exam Practice",
                desc: "Full-length 3-hour practice tests under timed conditions to build speed, accuracy, and confidence before the actual exam.",
              },
              {
                num: "04",
                title: "Avoiding Burnout",
                desc: "Proper sleep schedules, daily physical exercise, and regular check-ins with your mentor to keep motivation high.",
              },
            ].map((col, idx) => (
              <div key={idx} className="p-6 rounded-xl bg-white border border-[#E8DFD0]/80 shadow-soft-sm space-y-3 hover:shadow-soft-md transition-shadow">
                <div className="font-label text-xs text-[#8B6914] uppercase tracking-widest font-bold">
                  Step {col.num}
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
            Book a Free 20-Minute Guidance Call
          </h2>

          <p className="text-xs sm:text-sm text-[#5A4A35] font-sans max-w-lg mx-auto leading-relaxed">
            Speak with an Officium Supremum mentor to review your current syllabus coverage, study schedule, and exam goals.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => openOrientation("scholars")}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#2C1F0F] hover:bg-[#3B2F20] text-white font-label font-bold text-xs uppercase tracking-widest shadow-md transition-all active:scale-95"
            >
              Book a Free 20-Minute Call
            </button>
            <a
              href="https://wa.me/918969634656?text=Hello%20Officium%20Supremum,%20I%20would%20like%20guidance%20for%20the%20Scholars%20Program"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white border border-[#D4C4A8]/80 text-[#2C1F0F] font-label text-xs uppercase tracking-widest hover:bg-[#FAF7F2] shadow-soft-sm hover:shadow-soft-md transition-all"
            >
              Chat with an Advisor on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
