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
  Clock
} from "lucide-react";

export default function JuniorsProgramPage() {
  const { openOrientation } = useModals();

  return (
    <div className="bg-[#F5F7FA] text-[#1E3A5F] min-h-screen">
      {/* ========================================================================= */}
      {/* 1. JUNIORS HERO SECTION                                                  */}
      {/* ========================================================================= */}
      <section className="relative pt-20 pb-24 lg:pt-28 lg:pb-32 bg-gradient-to-b from-[#DCEEFF] via-[#EDF5FD] to-[#F5F7FA] border-b border-[#D1E2F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#BBD8F5] shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span className="font-label text-xs uppercase tracking-[0.18em] text-[#1E3A5F] font-semibold">
                Class 7–10 • Building Early Study &amp; Life Habits
              </span>
            </div>

            <h1 className="font-heading text-4xl sm:text-6xl font-semibold tracking-tight text-[#1E3A5F] leading-[1.1]">
              Building Confidence and <br />
              <span className="text-blue-600">
                Strong Habits Early.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-700 font-sans leading-relaxed">
              Most students learn time management and deep focus only after entering college or board exams, when stress is high. Our Juniors Program helps middle school students build calm daily routines, reading habits, and self-confidence early.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={() => openOrientation("juniors")}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#1E3A5F] hover:bg-[#152943] text-white font-label font-bold text-xs uppercase tracking-widest shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <span>Book a Free Parent &amp; Student Call</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#habits"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white hover:bg-slate-100 border border-[#CBD5E1] text-[#1E3A5F] font-label font-semibold text-xs uppercase tracking-widest transition-all text-center shadow-sm"
              >
                Explore What We Teach
              </a>
            </div>

            <div className="pt-4 flex items-center gap-6 text-xs text-slate-600 font-label uppercase tracking-wider">
              <span>• No Rote Learning</span>
              <span>• Regular Updates for Parents</span>
              <span>• Small Daily Habits</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. HABIT BUILDING SECTION                                                */}
      {/* ========================================================================= */}
      <section id="habits" className="py-24 bg-white border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 space-y-4">
              <div className="font-label text-xs uppercase tracking-[0.2em] text-blue-600 font-semibold">
                Foundation 01
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl font-medium tracking-tight text-[#1E3A5F]">
                Daily Habits: Building Routines That Last
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                Telling a teenager to &ldquo;just study harder&rdquo; usually leads to frustration. We replace lectures with clear, practical routines: 90-minute distraction-free study blocks, phone-free study zones, and a simple daily reflection notebook.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-[#F5F7FA] border border-[#E2E8F0] space-y-3">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-blue-600 shadow-sm">
                  <Clock className="w-5 h-5" />
                </div>
                <h4 className="font-heading font-semibold text-lg text-[#1E3A5F]">
                  The 90-Minute Focus Session
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">
                  Training young minds to sit and study with focus without reaching for their phones or getting distracted.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#F5F7FA] border border-[#E2E8F0] space-y-3">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-blue-600 shadow-sm">
                  <Calendar className="w-5 h-5" />
                </div>
                <h4 className="font-heading font-semibold text-lg text-[#1E3A5F]">
                  Daily Study &amp; Habit Journal
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">
                  Students track daily reading, homework, and sports, building genuine pride in their own progress.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. READING & COMMUNICATION SECTION                                       */}
      {/* ========================================================================= */}
      <section className="py-24 bg-[#F5F7FA] border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="font-label text-xs uppercase tracking-[0.2em] text-blue-600 font-semibold">
              Foundation 02
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-medium tracking-tight text-[#1E3A5F]">
              Daily Reading &amp; Confident Speaking
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-sans">
              The ability to read well, understand complex ideas, and speak with confidence is the foundation of long-term success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm space-y-4">
              <div className="w-10 h-10 rounded-xl bg-[#DCEEFF] flex items-center justify-center text-[#1E3A5F]">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-semibold text-xl text-[#1E3A5F]">Active Reading &amp; Vocabulary</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                Reading interesting articles, history stories, and science topics to build vocabulary and understanding.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm space-y-4">
              <div className="w-10 h-10 rounded-xl bg-[#DCEEFF] flex items-center justify-center text-[#1E3A5F]">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-semibold text-xl text-[#1E3A5F]">Public Speaking &amp; Debates</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                Weekly speaking exercises and friendly debates that help students overcome stage fright and express ideas clearly.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm space-y-4">
              <div className="w-10 h-10 rounded-xl bg-[#DCEEFF] flex items-center justify-center text-[#1E3A5F]">
                <Brain className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-semibold text-xl text-[#1E3A5F]">Critical Thinking &amp; Logic</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                Helping students ask good questions, think logically, and explain their thoughts instead of just memorizing answers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. ACADEMIC PLANNING SECTION                                             */}
      {/* ========================================================================= */}
      <section className="py-24 bg-white border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-4">
              <div className="font-label text-xs uppercase tracking-[0.2em] text-blue-600 font-semibold">
                Foundation 03
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl font-medium tracking-tight text-[#1E3A5F]">
                School Success Without Last-Minute Stress
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                We help students finish their school syllabus well in advance while introducing them to Olympiads and foundation concepts. Students enter exams feeling calm and prepared.
              </p>
              
              <div className="space-y-2.5 pt-2 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>3-week revision buffer so school exams feel manageable</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Strong foundation in mathematics and science concepts</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>No stressful overnight cramming</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 bg-[#DCEEFF]/40 p-8 rounded-2xl border border-[#BBD8F5] space-y-4">
              <h4 className="font-heading font-semibold text-lg text-[#1E3A5F]">
                Early Career Awareness
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                Whether a student is curious about Science &amp; Engineering (JEE/NEET), Defence Services (NDA), Civil Services (UPSC), or Commerce, we help them explore opportunities early.
              </p>
              <div className="grid grid-cols-2 gap-3 pt-2">
                {["Science & JEE/NEET", "Defence & NDA", "Civil Services & Law", "Commerce & Leadership"].map((track, i) => (
                  <div key={i} className="p-3 bg-white rounded-lg border border-[#CBD5E1] text-xs font-label uppercase tracking-wider text-[#1E3A5F] font-semibold text-center">
                    {track}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. CONFIDENCE & CHARACTER DEVELOPMENT                                    */}
      {/* ========================================================================= */}
      <section className="py-24 bg-[#F5F7FA] border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <div className="font-label text-xs uppercase tracking-[0.2em] text-blue-600 font-semibold">
              Foundation 04
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-medium tracking-tight text-[#1E3A5F]">
              Building Character &amp; Overcoming Setbacks
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-white border border-[#E2E8F0] space-y-2">
              <div className="font-label text-xs uppercase tracking-wider text-blue-600 font-bold">Daily Fitness</div>
              <h4 className="font-heading font-semibold text-lg text-[#1E3A5F]">Sports &amp; Movement</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">Regular physical exercise and sports to keep energy high and mind sharp.</p>
            </div>

            <div className="p-6 rounded-xl bg-white border border-[#E2E8F0] space-y-2">
              <div className="font-label text-xs uppercase tracking-wider text-blue-600 font-bold">Resilience</div>
              <h4 className="font-heading font-semibold text-lg text-[#1E3A5F]">Learning from Mistakes</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">Teaching students that low marks are just clues to what needs practice, not a personal failure.</p>
            </div>

            <div className="p-6 rounded-xl bg-white border border-[#E2E8F0] space-y-2">
              <div className="font-label text-xs uppercase tracking-wider text-blue-600 font-bold">Self-Reliance</div>
              <h4 className="font-heading font-semibold text-lg text-[#1E3A5F]">Taking Personal Ownership</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">Guiding students to take responsibility for their studies without needing parents to constantly remind them.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. PARENT PARTNERSHIP SECTION                                            */}
      {/* ========================================================================= */}
      <section className="py-24 bg-white border-b border-[#E2E8F0]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="w-12 h-12 rounded-full bg-[#DCEEFF] flex items-center justify-center text-blue-600 mx-auto">
            <Users className="w-6 h-6" />
          </div>

          <div className="font-label text-xs uppercase tracking-[0.2em] text-blue-600 font-semibold">
            Partnering With Families
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl font-medium tracking-tight text-[#1E3A5F]">
            Working Hand in Hand with Parents
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed font-sans">
            We keep parents informed at every step. You receive weekly progress updates, regular mentor calls, and clear visibility into your child&apos;s daily habits.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 text-left">
            <div className="p-4 bg-[#F5F7FA] rounded-xl border border-[#E2E8F0]">
              <div className="font-label text-xs uppercase tracking-wider text-[#1E3A5F] font-bold mb-1">Weekly Reports</div>
              <p className="text-xs text-slate-600 font-sans">Weekly summary of study hours, reading milestones, and daily habits.</p>
            </div>
            <div className="p-4 bg-[#F5F7FA] rounded-xl border border-[#E2E8F0]">
              <div className="font-label text-xs uppercase tracking-wider text-[#1E3A5F] font-bold mb-1">Parent Meetings</div>
              <p className="text-xs text-slate-600 font-sans">Regular calls with mentors to discuss wellbeing, study balance, and school performance.</p>
            </div>
            <div className="p-4 bg-[#F5F7FA] rounded-xl border border-[#E2E8F0]">
              <div className="font-label text-xs uppercase tracking-wider text-[#1E3A5F] font-bold mb-1">Less Stress at Home</div>
              <p className="text-xs text-slate-600 font-sans">Mentors take care of daily follow-ups, bringing peace back to parent-child conversations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. ORIENTATION CTA                                                       */}
      {/* ========================================================================= */}
      <section className="py-24 bg-gradient-to-b from-[#F5F7FA] to-[#DCEEFF] text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-6">
          <h2 className="font-heading text-3xl sm:text-4xl font-semibold tracking-tight text-[#1E3A5F]">
            Give Your Child a Calm, Confident Start
          </h2>

          <p className="text-xs sm:text-sm text-slate-700 font-sans max-w-lg mx-auto">
            Book a free 20-minute call with an Officium Supremum mentor to discuss your child&apos;s routine and goals.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => openOrientation("juniors")}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#1E3A5F] hover:bg-[#152943] text-white font-label font-bold text-xs uppercase tracking-widest shadow-md transition-all active:scale-95"
            >
              Book a Free 20-Minute Call
            </button>

            <a
              href="https://wa.me/918969634656?text=Hello%20Officium%20Supremum,%20I%20would%20like%20guidance%20for%20the%20Juniors%20Program"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white border border-[#CBD5E1] text-[#1E3A5F] font-label font-semibold text-xs uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm"
            >
              Chat with an Advisor on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
