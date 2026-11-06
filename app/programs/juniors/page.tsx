"use client";

import React from "react";
import Link from "next/link";
import { useModals } from "@/components/ModalContext";
import {
  Sparkle,
  BookOpen,
  CheckCircle,
  Users,
  Calendar,
  ArrowRight,
  ShieldCheck,
  ChatCircleText,
  Brain,
  Clock,
  WhatsappLogo
} from "@phosphor-icons/react";

export default function JuniorsProgramPage() {
  const { openOrientation } = useModals();

  return (
    <div className="bg-[#F3EFE6] text-[#252923] min-h-screen relative overflow-x-hidden selection:bg-[#34483C] selection:text-[#F3EFE6]">

      {/* ========================================================================= */}
      {/* 1. JUNIORS HERO SECTION                                                  */}
      {/* ========================================================================= */}
      <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 border-b border-[#D8D5C8]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          {/* Headline */}
          <h1 className="heading-1 text-[#252923] text-balance">
            Building Confidence and Strong Habits Early.
          </h1>

          {/* Subtitle */}
          <p className="body-2 text-[#252923]/75 max-w-2xl mx-auto text-pretty">
            Most students learn time management and deep focus only after entering college or high stakes board exams, when stress is high. Our Juniors Program helps middle school students build calm daily routines, active reading habits, and self-confidence early.
          </p>

          {/* CTAs */}
          <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => openOrientation("juniors")}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#34483C] hover:bg-[#252923] text-[#F3EFE6] button-sm uppercase tracking-wider transition-colors shadow-soft-sm flex items-center justify-center gap-2"
            >
              <span>Book a Free Parent &amp; Student Call</span>
              <ArrowRight className="w-4 h-4" weight="bold" />
            </button>

            <a
              href="#habits"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl border border-[#D8D5C8] hover:border-[#34483C] bg-white text-[#252923] button-sm uppercase tracking-wider transition-colors flex items-center justify-center shadow-soft-sm"
            >
              <span>Explore Curriculum</span>
            </a>
          </div>

          {/* Quick Indicators */}
          <div className="pt-3 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-[#252923]/70 font-medium">
            <span>• No Rote Learning</span>
            <span>• Weekly Reports for Parents</span>
            <span>• Small Daily Routines</span>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. HABIT BUILDING SECTION (Foundation 01)                                 */}
      {/* ========================================================================= */}
      <section id="habits" className="py-20 lg:py-24 bg-white border-b border-[#D8D5C8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

            <div className="lg:col-span-5 space-y-3">
              <div className="caption-3 uppercase tracking-widest text-[#B18A58] font-semibold">
                Foundation 01 • Habit Architecture
              </div>
              <h2 className="heading-2 text-[#252923]">
                Daily Habits: Building Routines That Last
              </h2>
              <p className="body-2 text-[#252923]/75 pt-1 text-pretty">
                Telling a teenager to &ldquo;just study harder&rdquo; usually leads to frustration. We replace lectures with clear, practical routines: 90-minute distraction-free study blocks, phone-free study zones, and a simple daily reflection notebook.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">

              <div className="p-7 sm:p-8 rounded-2xl bg-[#F3EFE6] border border-[#D8D5C8] shadow-soft-sm space-y-3.5">
                <div className="w-11 h-11 rounded-xl bg-[#34483C]/10 border border-[#34483C]/20 flex items-center justify-center text-[#34483C]">
                  <Clock className="w-5 h-5" weight="bold" />
                </div>
                <h3 className="title-2 text-[#252923]">
                  The 90-Minute Focus Block
                </h3>
                <p className="body-3 text-[#252923]/75 leading-relaxed">
                  Training young minds to sit and study with focus without reaching for screens or getting distracted.
                </p>
              </div>

              <div className="p-7 sm:p-8 rounded-2xl bg-[#F3EFE6] border border-[#D8D5C8] shadow-soft-sm space-y-3.5">
                <div className="w-11 h-11 rounded-xl bg-[#34483C]/10 border border-[#34483C]/20 flex items-center justify-center text-[#34483C]">
                  <Calendar className="w-5 h-5" weight="bold" />
                </div>
                <h3 className="title-2 text-[#252923]">
                  Daily Study &amp; Habit Log
                </h3>
                <p className="body-3 text-[#252923]/75 leading-relaxed">
                  Students track daily reading, homework, and physical activity, building genuine pride in their progress.
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. READING & COMMUNICATION SECTION (Foundation 02)                        */}
      {/* ========================================================================= */}
      <section className="py-20 lg:py-24 bg-[#F3EFE6] border-b border-[#D8D5C8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <div className="caption-3 uppercase tracking-widest text-[#B18A58] font-semibold">
              Foundation 02 • Intellectual Expression
            </div>
            <h2 className="heading-2 text-[#252923]">
              Daily Reading &amp; Confident Speaking
            </h2>
            <p className="body-2 text-[#252923]/75 pt-1 text-pretty">
              The ability to read well, understand complex ideas, and speak with confidence is the foundation of lifelong leadership.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">

            <div className="p-7 sm:p-8 rounded-2xl bg-white border border-[#D8D5C8] shadow-soft-sm space-y-3.5 hover:border-[#34483C] transition-all">
              <div className="w-11 h-11 rounded-xl bg-[#34483C]/10 border border-[#34483C]/20 flex items-center justify-center text-[#34483C]">
                <BookOpen className="w-5 h-5" weight="bold" />
              </div>
              <h3 className="title-2 text-[#252923]">
                Active Reading &amp; Vocabulary
              </h3>
              <p className="body-3 text-[#252923]/75 leading-relaxed">
                Reading interesting articles, history essays, and scientific developments to build vocabulary and understanding.
              </p>
            </div>

            <div className="p-7 sm:p-8 rounded-2xl bg-white border border-[#D8D5C8] shadow-soft-sm space-y-3.5 hover:border-[#34483C] transition-all">
              <div className="w-11 h-11 rounded-xl bg-[#34483C]/10 border border-[#34483C]/20 flex items-center justify-center text-[#34483C]">
                <ChatCircleText className="w-5 h-5" weight="bold" />
              </div>
              <h3 className="title-2 text-[#252923]">
                Public Speaking &amp; Articulation
              </h3>
              <p className="body-3 text-[#252923]/75 leading-relaxed">
                Weekly speaking exercises and friendly discussions that help students overcome hesitation and express thoughts clearly.
              </p>
            </div>

            <div className="p-7 sm:p-8 rounded-2xl bg-white border border-[#D8D5C8] shadow-soft-sm space-y-3.5 hover:border-[#34483C] transition-all">
              <div className="w-11 h-11 rounded-xl bg-[#34483C]/10 border border-[#34483C]/20 flex items-center justify-center text-[#34483C]">
                <Brain className="w-5 h-5" weight="bold" />
              </div>
              <h3 className="title-2 text-[#252923]">
                Critical Thinking &amp; Logic
              </h3>
              <p className="body-3 text-[#252923]/75 leading-relaxed">
                Helping students ask good questions, think logically, and explain their reasoning rather than rote-memorizing solutions.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. ACADEMIC PLANNING SECTION (Foundation 03)                              */}
      {/* ========================================================================= */}
      <section className="py-20 lg:py-24 bg-white border-b border-[#D8D5C8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

            <div className="lg:col-span-6 space-y-4">
              <div className="caption-3 uppercase tracking-widest text-[#B18A58] font-semibold">
                Foundation 03 • Academic Mastery
              </div>
              <h2 className="heading-2 text-[#252923]">
                School Success Without Last-Minute Stress
              </h2>
              <p className="body-2 text-[#252923]/75 pt-1 text-pretty">
                We help students complete their school syllabus well in advance while introducing them to Olympiads and foundation concepts. Students enter examination halls feeling calm and thoroughly prepared.
              </p>

              <div className="space-y-2.5 pt-2 text-sm text-[#252923]">
                <div className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-[#34483C] shrink-0" weight="bold" />
                  <span>3-week revision buffer so exams never feel panicked</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-[#34483C] shrink-0" weight="bold" />
                  <span>Strong conceptual foundation in mathematics and science</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-[#34483C] shrink-0" weight="bold" />
                  <span>No stressful overnight cramming before tests</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 bg-[#F3EFE6] p-7 sm:p-8 rounded-2xl border border-[#D8D5C8] shadow-soft-sm space-y-3.5">
              <div className="caption-3 uppercase tracking-widest text-[#34483C] font-semibold">
                Exploration &amp; Horizons
              </div>
              <h3 className="title-1 text-[#252923]">
                Early Career Awareness
              </h3>
              <p className="body-3 text-[#252923]/75 leading-relaxed">
                Whether a student is curious about Science &amp; Engineering (JEE/NEET), Defence Services (NDA), Civil Services (UPSC), or Commerce, we help them explore avenues early with guidance.
              </p>
              <div className="grid grid-cols-2 gap-2.5 pt-2">
                {["Science & JEE/NEET", "Defence & NDA", "Civil Services & Law", "Commerce & Leadership"].map((track, i) => (
                  <div
                    key={i}
                    className="p-3 bg-white rounded-xl border border-[#D8D5C8] caption-3 uppercase tracking-wider text-[#252923] font-semibold text-center hover:border-[#34483C] transition-colors"
                  >
                    {track}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. PARENT PARTNERSHIP SECTION                                            */}
      {/* ========================================================================= */}
      <section className="py-20 lg:py-24 bg-[#F3EFE6] border-b border-[#D8D5C8]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">

          <div className="w-11 h-11 rounded-xl bg-[#34483C]/10 border border-[#34483C]/20 flex items-center justify-center text-[#34483C] mx-auto">
            <Users className="w-5 h-5" weight="bold" />
          </div>

          <div className="caption-3 uppercase tracking-widest text-[#B18A58] font-semibold">
            Partnering With Families
          </div>

          <h2 className="heading-2 text-[#252923]">
            Working Hand in Hand with Parents
          </h2>

          <p className="body-2 text-[#252923]/75 max-w-2xl mx-auto text-pretty">
            We keep parents informed at every step. You receive weekly progress summaries, regular mentor calls, and clear visibility into your child&apos;s daily habits without friction at home.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-4 text-left">

            <div className="p-6 bg-white rounded-2xl border border-[#D8D5C8] shadow-soft-sm">
              <div className="caption-3 uppercase tracking-wider text-[#34483C] font-semibold mb-1">Weekly Reports</div>
              <p className="body-3 text-[#252923]/75 leading-relaxed">Weekly summary of study hours, reading milestones, and consistency.</p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-[#D8D5C8] shadow-soft-sm">
              <div className="caption-3 uppercase tracking-wider text-[#34483C] font-semibold mb-1">Parent Meetings</div>
              <p className="body-3 text-[#252923]/75 leading-relaxed">Regular check-ins with mentors to discuss wellbeing and study balance.</p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-[#D8D5C8] shadow-soft-sm">
              <div className="caption-3 uppercase tracking-wider text-[#34483C] font-semibold mb-1">Peace at Home</div>
              <p className="body-3 text-[#252923]/75 leading-relaxed">Mentors handle daily follow-up, restoring warmth to family conversations.</p>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. ORIENTATION CALLOUT BANNER (Forest Sage Canvas)                        */}
      {/* ========================================================================= */}
      <section className="py-20 lg:py-24 text-center bg-[#34483C] text-[#F3EFE6] relative">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-5">
          <h2 className="heading-2 text-[#F3EFE6] text-balance">
            Give Your Child a Calm, Confident Start
          </h2>

          <p className="body-2 text-[#F3EFE6]/80 max-w-lg mx-auto text-pretty">
            Book a free 20-minute call with an Officium Supremum mentor to discuss your child&apos;s routine and goals.
          </p>

          <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => openOrientation("juniors")}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#F3EFE6] hover:bg-white text-[#252923] button-sm uppercase tracking-wider transition-colors shadow-soft-sm"
            >
              Book a Free 20-Minute Call
            </button>

            <a
              href="https://wa.me/918969634656?text=Hello%20Officium%20Supremum,%20I%20would%20like%20guidance%20for%20the%20Juniors%20Program"
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
