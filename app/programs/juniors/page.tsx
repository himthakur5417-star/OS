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
                Class 7–10 • The Early Advantage Track
              </span>
            </div>

            <h1 className="font-heading text-4xl sm:text-6xl font-semibold tracking-tight text-[#1E3A5F] leading-[1.1]">
              Building Leaders <br />
              <span className="text-blue-600">
                Before High School Arrives.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-700 font-sans leading-relaxed">
              Most students learn time management and deep focus in college — when it is already stressful and late. The Juniors Program instills study discipline, editorial reading, and self-direction in middle school.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={() => openOrientation("juniors")}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#1E3A5F] hover:bg-[#152943] text-white font-label font-bold text-xs uppercase tracking-widest shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <span>Book Family Orientation</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#habits"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white hover:bg-slate-100 border border-[#CBD5E1] text-[#1E3A5F] font-label font-semibold text-xs uppercase tracking-widest transition-all text-center shadow-sm"
              >
                View Curriculum Pillars
              </a>
            </div>

            <div className="pt-4 flex items-center gap-6 text-xs text-slate-600 font-label uppercase tracking-wider">
              <span>• Zero Rote Memorization</span>
              <span>• Parent-Guided Progress</span>
              <span>• Daily Micro-Habits</span>
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
                Habit Architecture: Systems Over Willpower
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                Telling a teenager to "just study harder" produces frustration. We replace lectures with physical routines: the 90-minute study sprint, phone-free focus zones, and structured night journals.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-[#F5F7FA] border border-[#E2E8F0] space-y-3">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-blue-600 shadow-sm">
                  <Clock className="w-5 h-5" />
                </div>
                <h4 className="font-heading font-semibold text-lg text-[#1E3A5F]">
                  The 90-Minute Sprint
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">
                  Training the adolescent brain for sustained uninterrupted focus, completely removing the urge to check gadgets.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#F5F7FA] border border-[#E2E8F0] space-y-3">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-blue-600 shadow-sm">
                  <Calendar className="w-5 h-5" />
                </div>
                <h4 className="font-heading font-semibold text-lg text-[#1E3A5F]">
                  Personalized Cadence Journal
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">
                  Students log daily accomplishments, reading quotas, and physical sports, building natural pride in consistency.
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
              Reading &amp; Eloquent Communication
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-sans">
              The ability to articulate complex thoughts clearly is the single strongest predictor of future leadership.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm space-y-4">
              <div className="w-10 h-10 rounded-xl bg-[#DCEEFF] flex items-center justify-center text-[#1E3A5F]">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-semibold text-xl text-[#1E3A5F]">Editorial Analysis</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                Reading curated essays, historical chronicles, and science briefings, expanding vocabulary and comprehension speed.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm space-y-4">
              <div className="w-10 h-10 rounded-xl bg-[#DCEEFF] flex items-center justify-center text-[#1E3A5F]">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-semibold text-xl text-[#1E3A5F]">Structured Public Speaking</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                Weekly extempore presentations and group debates designed to dissolve stage fright and build commanding vocal delivery.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm space-y-4">
              <div className="w-10 h-10 rounded-xl bg-[#DCEEFF] flex items-center justify-center text-[#1E3A5F]">
                <Brain className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-semibold text-xl text-[#1E3A5F]">Critical Thinking Drills</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                Learning to dissect arguments, evaluate evidence, and form reasoned viewpoints rather than passively regurgitating opinions.
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
                Academic Pacing: Excellence Without Anxiety
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                We align school syllabus mastery with early exposure to competitive thinking (NTSE, Olympiads, Foundation Mathematics). Students conquer their school tests weeks ahead of deadlines.
              </p>
              
              <div className="space-y-2.5 pt-2 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>3-Week Advance Exam Buffer so school finals feel easy</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Mental Mathematics &amp; Conceptual Science Foundations</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Zero Last-Minute Cramming</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 bg-[#DCEEFF]/40 p-8 rounded-2xl border border-[#BBD8F5] space-y-4">
              <h4 className="font-heading font-semibold text-lg text-[#1E3A5F]">
                Early Career Horizon Briefings
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                Whether a junior aspires towards Medicine (NEET), Engineering (JEE), Defence Leadership (NDA), Civil Services (UPSC), or Commerce &amp; Entrepreneurship, we introduce them to the mindset years ahead of their peers.
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
              Confidence Development &amp; Emotional Resilience
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-white border border-[#E2E8F0] space-y-2">
              <div className="font-label text-xs uppercase tracking-wider text-blue-600 font-bold">Physical Stamina</div>
              <h4 className="font-heading font-semibold text-lg text-[#1E3A5F]">Sports &amp; Fitness Quota</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">Mandatory daily movement and physical sports to cultivate vitality and clear brain fog.</p>
            </div>

            <div className="p-6 rounded-xl bg-white border border-[#E2E8F0] space-y-2">
              <div className="font-label text-xs uppercase tracking-wider text-blue-600 font-bold">Mental Toughness</div>
              <h4 className="font-heading font-semibold text-lg text-[#1E3A5F]">Mistake Reframing</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">Training students to view poor test scores as diagnostic feedback rather than personal failure.</p>
            </div>

            <div className="p-6 rounded-xl bg-white border border-[#E2E8F0] space-y-2">
              <div className="font-label text-xs uppercase tracking-wider text-blue-600 font-bold">Inner Discipline</div>
              <h4 className="font-heading font-semibold text-lg text-[#1E3A5F]">Self-Accountability</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">Gradually shifting the student from needing parental nagging to taking self-directed ownership.</p>
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
            Collaborative Growth
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl font-medium tracking-tight text-[#1E3A5F]">
            The Parent Partnership Protocol
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed font-sans">
            We partner closely with parents. You receive transparent weekly consistency logs, monthly growth milestones, and direct mentor touchpoints. No surprises, no guessing.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 text-left">
            <div className="p-4 bg-[#F5F7FA] rounded-xl border border-[#E2E8F0]">
              <div className="font-label text-xs uppercase tracking-wider text-[#1E3A5F] font-bold mb-1">Weekly Reports</div>
              <p className="text-xs text-slate-600 font-sans">Hours invested, books read, and journal completions sent every Sunday.</p>
            </div>
            <div className="p-4 bg-[#F5F7FA] rounded-xl border border-[#E2E8F0]">
              <div className="font-label text-xs uppercase tracking-wider text-[#1E3A5F] font-bold mb-1">Parent Briefings</div>
              <p className="text-xs text-slate-600 font-sans">Dedicated calls to discuss emotional wellbeing, focus habits, and school balance.</p>
            </div>
            <div className="p-4 bg-[#F5F7FA] rounded-xl border border-[#E2E8F0]">
              <div className="font-label text-xs uppercase tracking-wider text-[#1E3A5F] font-bold mb-1">Zero Nagging</div>
              <p className="text-xs text-slate-600 font-sans">Mentors take over the accountability role, restoring harmony in family dynamics.</p>
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
            Give Your Child the Early Advantage
          </h2>

          <p className="text-xs sm:text-sm text-slate-700 font-sans max-w-lg mx-auto">
            Book a 20-minute diagnostic session with an Officium Supremum senior mentor to evaluate study routines and roadmap options.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => openOrientation("juniors")}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#1E3A5F] hover:bg-[#152943] text-white font-label font-bold text-xs uppercase tracking-widest shadow-md transition-all active:scale-95"
            >
              Book Juniors Orientation Call
            </button>

            <a
              href="https://wa.me/918969634656?text=I%20am%20interested%20in%20the%20Officium%20Supremum%20Juniors%20Program%20(Class%207-10)"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white border border-[#CBD5E1] text-[#1E3A5F] font-label font-semibold text-xs uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm"
            >
              Inquire on WhatsApp (+91 8969634656)
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
