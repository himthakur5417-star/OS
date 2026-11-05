"use client";

import React from "react";
import Link from "next/link";
import { useModals } from "@/components/ModalContext";
import {
  Sparkles,
  BookOpen,
  CheckCircle2,
  Users,
  Calendar,
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  MessageSquare,
  Flame,
  Brain,
  Smile,
  Clock,
  MessageCircle
} from "lucide-react";

export default function JuniorsProgramPage() {
  const { openOrientation } = useModals();

  return (
    <div className="bg-[#211C1D] text-[#E8DCC6] min-h-screen relative overflow-hidden selection:bg-[#722F37] selection:text-[#E8DCC6]">

      {/* Subtle Ambient Radial Accents */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[min(600px,100vw)] h-[min(600px,100vw)] bg-[#722F37]/15 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 left-0 w-[min(450px,100vw)] h-[min(450px,100vw)] bg-[#B7A89A]/10 rounded-full blur-[120px]" />
      </div>

      {/* ========================================================================= */}
      {/* 1. JUNIORS HERO SECTION                                                  */}
      {/* ========================================================================= */}
      <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-28 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl space-y-6">

            {/* Foundation Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#E8DCC6]/10 border border-[#E8DCC6]/20 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#E8DCC6]" />
              <span className="font-label text-xs uppercase tracking-[0.2em] text-[#E8DCC6] font-semibold">
                Class 7–10 • Building Early Study &amp; Life Habits
              </span>
            </div>

            {/* Editorial Display Headline */}
            <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-[#E8DCC6] leading-[1.08]">
              Building Confidence and <br />
              <span className="text-[#E8DCC6] italic font-normal">
                Strong Habits Early.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#E8DCC6]/80 font-sans leading-relaxed">
              Most students learn time management and deep focus only after entering college or board exams, when stress is high. Our Juniors Program helps middle school students build calm daily routines, reading habits, and self-confidence early.
            </p>

            {/* CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => openOrientation("juniors")}
                className="px-8 py-4 rounded-full bg-[#722F37] hover:bg-[#853741] text-[#E8DCC6] font-label font-bold text-xs uppercase tracking-widest shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 border border-[#E8DCC6]/20"
              >
                <span>Book a Free Parent &amp; Student Call</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#habits"
                className="px-8 py-4 rounded-full border border-[#E8DCC6]/30 hover:border-[#E8DCC6] text-[#E8DCC6] font-label text-xs uppercase tracking-widest transition-colors flex items-center justify-center text-center"
              >
                <span>Explore What We Teach</span>
              </a>
            </div>

            {/* Quick Indicators */}
            <div className="pt-4 flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-[#B7A89A] font-label uppercase tracking-widest">
              <span>• No Rote Learning</span>
              <span>• Regular Updates for Parents</span>
              <span>• Small Daily Habits</span>
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
      {/* 2. HABIT BUILDING SECTION (Foundation 01 — Light Cream Transition Ground) */}
      {/* ========================================================================= */}
      <section id="habits" className="py-20 lg:py-28 bg-[#FAF7F2] text-[#211C1D] relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            <div className="lg:col-span-5 space-y-4">
              <div className="font-label text-xs uppercase tracking-[0.2em] text-[#722F37] font-semibold">
                Foundation 01 • Habit Architecture
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#211C1D] leading-tight">
                Daily Habits: Building Routines That Last
              </h2>
              <p className="text-sm sm:text-base text-[#5C524F] leading-relaxed font-sans pt-2">
                Telling a teenager to &ldquo;just study harder&rdquo; usually leads to frustration. We replace lectures with clear, practical routines: 90-minute distraction-free study blocks, phone-free study zones, and a simple daily reflection notebook.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">

              <div className="p-8 sm:p-9 rounded-3xl bg-white border border-[#E8DCC6] shadow-soft-sm hover:shadow-soft-md transition-shadow space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#722F37]/10 border border-[#722F37]/20 flex items-center justify-center text-[#722F37]">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-semibold text-2xl text-[#211C1D]">
                  The 90-Minute Focus Session
                </h3>
                <p className="text-xs sm:text-sm text-[#5C524F] leading-relaxed font-sans">
                  Training young minds to sit and study with focus without reaching for their phones or getting distracted.
                </p>
              </div>

              <div className="p-8 sm:p-9 rounded-3xl bg-white border border-[#E8DCC6] shadow-soft-sm hover:shadow-soft-md transition-shadow space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#722F37]/10 border border-[#722F37]/20 flex items-center justify-center text-[#722F37]">
                  <Calendar className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-semibold text-2xl text-[#211C1D]">
                  Daily Study &amp; Habit Journal
                </h3>
                <p className="text-xs sm:text-sm text-[#5C524F] leading-relaxed font-sans">
                  Students track daily reading, homework, and sports, building genuine pride in their own progress.
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
      {/* 3. READING & COMMUNICATION SECTION (Foundation 02 — Dark Ground)          */}
      {/* ========================================================================= */}
      <section className="py-24 bg-[#211C1D] relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="font-label text-xs uppercase tracking-[0.2em] text-[#B7A89A] font-semibold">
              Foundation 02 • Intellectual Expression
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#E8DCC6]">
              Daily Reading &amp; Confident Speaking
            </h2>
            <p className="text-sm sm:text-base text-[#E8DCC6]/75 font-sans max-w-2xl mx-auto pt-2">
              The ability to read well, understand complex ideas, and speak with confidence is the foundation of long-term success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            <div className="p-8 sm:p-9 rounded-3xl bg-[#282224] border border-[#E8DCC6]/15 shadow-soft-md space-y-4 hover:border-[#722F37] transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#722F37]/25 border border-[#722F37]/50 flex items-center justify-center text-[#E8DCC6]">
                <BookOpen className="w-6 h-6 text-[#E8DCC6]" />
              </div>
              <h3 className="font-heading font-semibold text-2xl text-[#E8DCC6]">
                Active Reading &amp; Vocabulary
              </h3>
              <p className="text-xs sm:text-sm text-[#E8DCC6]/75 leading-relaxed font-sans">
                Reading interesting articles, history stories, and science topics to build vocabulary and understanding.
              </p>
            </div>

            <div className="p-8 sm:p-9 rounded-3xl bg-[#282224] border border-[#E8DCC6]/15 shadow-soft-md space-y-4 hover:border-[#722F37] transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#722F37]/25 border border-[#722F37]/50 flex items-center justify-center text-[#E8DCC6]">
                <MessageSquare className="w-6 h-6 text-[#E8DCC6]" />
              </div>
              <h3 className="font-heading font-semibold text-2xl text-[#E8DCC6]">
                Public Speaking &amp; Debates
              </h3>
              <p className="text-xs sm:text-sm text-[#E8DCC6]/75 leading-relaxed font-sans">
                Weekly speaking exercises and friendly debates that help students overcome stage fright and express ideas clearly.
              </p>
            </div>

            <div className="p-8 sm:p-9 rounded-3xl bg-[#282224] border border-[#E8DCC6]/15 shadow-soft-md space-y-4 hover:border-[#722F37] transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#722F37]/25 border border-[#722F37]/50 flex items-center justify-center text-[#E8DCC6]">
                <Brain className="w-6 h-6 text-[#E8DCC6]" />
              </div>
              <h3 className="font-heading font-semibold text-2xl text-[#E8DCC6]">
                Critical Thinking &amp; Logic
              </h3>
              <p className="text-xs sm:text-sm text-[#E8DCC6]/75 leading-relaxed font-sans">
                Helping students ask good questions, think logically, and explain their thoughts instead of just memorizing answers.
              </p>
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
      {/* 4. ACADEMIC PLANNING SECTION (Foundation 03 — Light Cream Ground)         */}
      {/* ========================================================================= */}
      <section className="py-20 lg:py-28 bg-[#FAF7F2] text-[#211C1D] relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            <div className="lg:col-span-6 space-y-4">
              <div className="font-label text-xs uppercase tracking-[0.2em] text-[#722F37] font-semibold">
                Foundation 03 • Academic Preparation
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#211C1D]">
                School Success Without Last-Minute Stress
              </h2>
              <p className="text-sm sm:text-base text-[#5C524F] leading-relaxed font-sans pt-2">
                We help students finish their school syllabus well in advance while introducing them to Olympiads and foundation concepts. Students enter exams feeling calm and prepared.
              </p>

              <div className="space-y-3 pt-3 text-xs sm:text-sm text-[#211C1D]/90">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#722F37] shrink-0" />
                  <span>3-week revision buffer so school exams feel manageable</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#722F37] shrink-0" />
                  <span>Strong foundation in mathematics and science concepts</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#722F37] shrink-0" />
                  <span>No stressful overnight cramming</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 bg-white p-8 sm:p-9 rounded-3xl border border-[#E8DCC6] shadow-soft-sm space-y-4">
              <div className="font-label text-xs uppercase tracking-[0.2em] text-[#722F37] font-semibold">
                Exploration &amp; Horizons
              </div>
              <h3 className="font-heading font-semibold text-2xl text-[#211C1D]">
                Early Career Awareness
              </h3>
              <p className="text-xs sm:text-sm text-[#5C524F] leading-relaxed font-sans">
                Whether a student is curious about Science &amp; Engineering (JEE/NEET), Defence Services (NDA), Civil Services (UPSC), or Commerce, we help them explore opportunities early.
              </p>
              <div className="grid grid-cols-2 gap-3 pt-2">
                {["Science & JEE/NEET", "Defence & NDA", "Civil Services & Law", "Commerce & Leadership"].map((track, i) => (
                  <div
                    key={i}
                    className="p-3.5 bg-[#FAF7F2] rounded-xl border border-[#E8DCC6] text-xs font-label uppercase tracking-wider text-[#211C1D] font-semibold text-center hover:border-[#722F37] transition-colors"
                  >
                    {track}
                  </div>
                ))}
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
      {/* 5. CONFIDENCE & CHARACTER DEVELOPMENT (Foundation 04 — Dark Ground)      */}
      {/* ========================================================================= */}
      <section className="py-24 bg-[#211C1D] relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <div className="font-label text-xs uppercase tracking-[0.2em] text-[#B7A89A] font-semibold">
              Foundation 04 • Character &amp; Resilience
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#E8DCC6]">
              Building Character &amp; Overcoming Setbacks
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div className="p-8 rounded-3xl bg-[#282224] border border-[#E8DCC6]/15 shadow-soft-md space-y-3 hover:border-[#722F37] transition-all">
              <div className="font-label text-xs uppercase tracking-widest text-[#B7A89A] font-bold">Daily Fitness</div>
              <h3 className="font-heading font-semibold text-xl text-[#E8DCC6]">Sports &amp; Movement</h3>
              <p className="text-xs sm:text-sm text-[#E8DCC6]/75 leading-relaxed font-sans">Regular physical exercise and sports to keep energy high and mind sharp.</p>
            </div>

            <div className="p-8 rounded-3xl bg-[#282224] border border-[#E8DCC6]/15 shadow-soft-md space-y-3 hover:border-[#722F37] transition-all">
              <div className="font-label text-xs uppercase tracking-widest text-[#B7A89A] font-bold">Resilience</div>
              <h3 className="font-heading font-semibold text-xl text-[#E8DCC6]">Learning from Mistakes</h3>
              <p className="text-xs sm:text-sm text-[#E8DCC6]/75 leading-relaxed font-sans">Teaching students that low marks are just clues to what needs practice, not a personal failure.</p>
            </div>

            <div className="p-8 rounded-3xl bg-[#282224] border border-[#E8DCC6]/15 shadow-soft-md space-y-3 hover:border-[#722F37] transition-all">
              <div className="font-label text-xs uppercase tracking-widest text-[#B7A89A] font-bold">Self-Reliance</div>
              <h3 className="font-heading font-semibold text-xl text-[#E8DCC6]">Taking Personal Ownership</h3>
              <p className="text-xs sm:text-sm text-[#E8DCC6]/75 leading-relaxed font-sans">Guiding students to take responsibility for their studies without needing parents to constantly remind them.</p>
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
      {/* 6. PARENT PARTNERSHIP SECTION (Light Cream Ground)                       */}
      {/* ========================================================================= */}
      <section className="py-20 lg:py-28 bg-[#FAF7F2] text-[#211C1D] relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">

          <div className="w-12 h-12 rounded-2xl bg-[#722F37]/10 border border-[#722F37]/20 flex items-center justify-center text-[#722F37] mx-auto">
            <Users className="w-6 h-6" />
          </div>

          <div className="font-label text-xs uppercase tracking-[0.2em] text-[#722F37] font-semibold">
            Partnering With Families
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#211C1D]">
            Working Hand in Hand with Parents
          </h2>

          <p className="text-sm sm:text-base text-[#5C524F] max-w-2xl mx-auto leading-relaxed font-sans">
            We keep parents informed at every step. You receive weekly progress updates, regular mentor calls, and clear visibility into your child&apos;s daily habits.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 text-left">

            <div className="p-6 bg-white rounded-3xl border border-[#E8DCC6] shadow-soft-sm hover:shadow-soft-md transition-shadow">
              <div className="font-label text-xs uppercase tracking-wider text-[#722F37] font-bold mb-1">Weekly Reports</div>
              <p className="text-xs sm:text-sm text-[#5C524F] font-sans leading-relaxed">Weekly summary of study hours, reading milestones, and daily habits.</p>
            </div>

            <div className="p-6 bg-white rounded-3xl border border-[#E8DCC6] shadow-soft-sm hover:shadow-soft-md transition-shadow">
              <div className="font-label text-xs uppercase tracking-wider text-[#722F37] font-bold mb-1">Parent Meetings</div>
              <p className="text-xs sm:text-sm text-[#5C524F] font-sans leading-relaxed">Regular calls with mentors to discuss wellbeing, study balance, and school performance.</p>
            </div>

            <div className="p-6 bg-white rounded-3xl border border-[#E8DCC6] shadow-soft-sm hover:shadow-soft-md transition-shadow">
              <div className="font-label text-xs uppercase tracking-wider text-[#722F37] font-bold mb-1">Less Stress at Home</div>
              <p className="text-xs sm:text-sm text-[#5C524F] font-sans leading-relaxed">Mentors take care of daily follow-ups, bringing peace back to parent-child conversations.</p>
            </div>

          </div>

        </div>
      </section>

      {/* Smooth dissolution: Supporting Cream (#FAF7F2) into Burgundy (#722F37) */}
      <div
        className="w-full h-16 sm:h-24 pointer-events-none relative z-10"
        style={{ background: "linear-gradient(to bottom, #FAF7F2 0%, #F5EDE6 15%, #EAD4D6 35%, #C7828A 60%, #994751 82%, #722F37 100%)" }}
        aria-hidden="true"
      />

      {/* ========================================================================= */}
      {/* 7. ORIENTATION CALLOUT BANNER (#722F37 Burgundy Canvas)                   */}
      {/* ========================================================================= */}
      <section className="py-24 text-center bg-[#722F37] relative z-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-6">

          <h2 className="font-heading text-3xl sm:text-5xl font-semibold text-[#E8DCC6]">
            Give Your Child a Calm, Confident Start
          </h2>

          <p className="text-sm sm:text-base text-[#E8DCC6]/85 font-sans max-w-lg mx-auto leading-relaxed">
            Book a free 20-minute call with an Officium Supremum mentor to discuss your child&apos;s routine and goals.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => openOrientation("juniors")}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#211C1D] hover:bg-[#282224] text-[#E8DCC6] font-label font-bold text-xs uppercase tracking-widest shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95 border border-[#E8DCC6]/20"
            >
              Book a Free 20-Minute Call
            </button>

            <a
              href="https://wa.me/918969634656?text=Hello%20Officium%20Supremum,%20I%20would%20like%20guidance%20for%20the%20Juniors%20Program"
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
