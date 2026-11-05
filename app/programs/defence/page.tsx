"use client";

import React from "react";
import Link from "next/link";
import { useModals } from "@/components/ModalContext";
import {
  Shield,
  CheckCircle2,
  ArrowRight,
  MessageCircle
} from "lucide-react";

export default function DefenceProgramPage() {
  const { openOrientation } = useModals();

  return (
    <div className="bg-[#211C1D] text-[#E8DCC6] min-h-screen relative overflow-hidden selection:bg-[#722F37] selection:text-[#E8DCC6]">

      {/* Subtle Ambient Radial Accents */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[min(600px,100vw)] h-[min(600px,100vw)] bg-[#722F37]/15 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 left-0 w-[min(450px,100vw)] h-[min(450px,100vw)] bg-[#B7A89A]/10 rounded-full blur-[120px]" />
      </div>

      {/* ========================================================================= */}
      {/* 1. DEFENCE HERO SECTION                                                  */}
      {/* ========================================================================= */}
      <section className="relative pt-24 pb-24 lg:pt-32 lg:pb-32 border-b border-[#E8DCC6]/10 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl space-y-6">

            {/* Regimental Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#E8DCC6]/10 border border-[#E8DCC6]/20 shadow-sm">
              <Shield className="w-3.5 h-3.5 text-[#E8DCC6]" />
              <span className="font-label text-xs uppercase tracking-[0.2em] text-[#E8DCC6] font-semibold">
                Defence Leadership Track • NDA • CDS • AFCAT
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-[#E8DCC6] leading-[1.06]">
              The Making of <br />
              <span className="text-[#E8DCC6] italic font-normal">
                an Armed Forces Officer.
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-[#E8DCC6]/80 font-sans leading-relaxed max-w-2xl">
              Success in NDA, CDS, and AFCAT is not decided by how many books you buy, but by how well you remember formulas, solve questions under time pressure, and carry yourself with confidence. We train students with academy-level discipline.
            </p>

            {/* CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => openOrientation("defence")}
                className="px-8 py-4 rounded-full bg-[#722F37] hover:bg-[#853741] text-[#E8DCC6] font-label font-bold text-xs uppercase tracking-widest shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 border border-[#E8DCC6]/20"
              >
                <span>Book a Free Defence Guidance Call</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <Link
                href="/resources/syllabus"
                className="px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 text-[#E8DCC6] border border-[#E8DCC6]/25 font-label font-semibold text-xs uppercase tracking-widest transition-all duration-300 text-center flex items-center justify-center gap-2"
              >
                <span>View Defence Syllabus &amp; Pattern</span>
              </Link>
            </div>

            {/* Academy Maxim Banner */}
            <div className="pt-6 border-l-2 border-[#722F37] pl-5 text-sm sm:text-base font-heading italic text-[#E8DCC6]/90 leading-relaxed">
              &ldquo;The goal is not just to clear an exam — it is to become worthy of wearing the uniform.&rdquo;
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. EXAMINATIONS COVERED MATRIX (NDA / CDS / AFCAT)                       */}
      {/* ========================================================================= */}
      <section className="py-24 relative z-10 bg-[#211C1D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="font-label text-xs uppercase tracking-[0.2em] text-[#B7A89A] font-semibold">
              Three Pathways into the Armed Forces
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#E8DCC6]">
              Preparation for NDA, CDS, and AFCAT
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* NDA Card */}
            <div className="p-8 sm:p-9 rounded-3xl bg-[#282224] border border-[#E8DCC6]/15 hover:border-[#722F37] transition-all duration-300 flex flex-col justify-between shadow-soft-md group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#722F37]/25 border border-[#722F37]/50 flex items-center justify-center text-[#E8DCC6] font-label font-bold text-lg mb-6 group-hover:scale-105 transition-transform">
                  NDA
                </div>
                <h3 className="font-heading text-2xl font-semibold text-[#E8DCC6] mb-2">
                  National Defence Academy
                </h3>
                <div className="text-xs font-label uppercase tracking-wider text-[#B7A89A] mb-4">
                  Army • Navy • Air Force • 10+2 Cadets
                </div>
                <p className="text-xs sm:text-sm text-[#E8DCC6]/75 leading-relaxed font-sans mb-6">
                  Complete preparation covering Mathematics (300 Marks, 30 Chapters) and the General Ability Test (GAT - 600 Marks English &amp; General Studies).
                </p>
                <div className="space-y-2.5 text-xs text-[#E8DCC6]/90 border-t border-[#E8DCC6]/10 pt-4">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#722F37] shrink-0" />
                    <span>4,000+ Solved Math Practice Questions</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#722F37] shrink-0" />
                    <span>50-Question Daily English Practice</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#722F37] shrink-0" />
                    <span>SSB Interview &amp; Personality Preparation</span>
                  </div>
                </div>
              </div>
              <div className="pt-6">
                <button
                  onClick={() => openOrientation("nda")}
                  className="w-full py-3.5 rounded-xl bg-[#722F37] hover:bg-[#853741] text-[#E8DCC6] font-label text-xs uppercase tracking-widest font-bold transition-all shadow-md active:scale-98 border border-[#E8DCC6]/20"
                >
                  Enquire for NDA Batch
                </button>
              </div>
            </div>

            {/* CDS Card */}
            <div className="p-8 sm:p-9 rounded-3xl bg-[#282224] border border-[#E8DCC6]/15 hover:border-[#722F37] transition-all duration-300 flex flex-col justify-between shadow-soft-md group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#722F37]/25 border border-[#722F37]/50 flex items-center justify-center text-[#E8DCC6] font-label font-bold text-lg mb-6 group-hover:scale-105 transition-transform">
                  CDS
                </div>
                <h3 className="font-heading text-2xl font-semibold text-[#E8DCC6] mb-2">
                  Combined Defence Services
                </h3>
                <div className="text-xs font-label uppercase tracking-wider text-[#B7A89A] mb-4">
                  IMA • OTA • INA • AFA • Graduates
                </div>
                <p className="text-xs sm:text-sm text-[#E8DCC6]/75 leading-relaxed font-sans mb-6">
                  Complete preparation for Elementary Mathematics (Complete 22-Chapter Master Volume), English (100 Marks), and General Knowledge.
                </p>
                <div className="space-y-2.5 text-xs text-[#E8DCC6]/90 border-t border-[#E8DCC6]/10 pt-4">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#722F37] shrink-0" />
                    <span>22-Chapter Elementary Mathematics Series</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#722F37] shrink-0" />
                    <span>Current Affairs &amp; Strategic General Knowledge Notes</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#722F37] shrink-0" />
                    <span>Full-Length Mock Test Series</span>
                  </div>
                </div>
              </div>
              <div className="pt-6">
                <button
                  onClick={() => openOrientation("cds")}
                  className="w-full py-3.5 rounded-xl bg-[#722F37] hover:bg-[#853741] text-[#E8DCC6] font-label text-xs uppercase tracking-widest font-bold transition-all shadow-md active:scale-98 border border-[#E8DCC6]/20"
                >
                  Enquire for CDS Batch
                </button>
              </div>
            </div>

            {/* AFCAT Card */}
            <div className="p-8 sm:p-9 rounded-3xl bg-[#282224] border border-[#E8DCC6]/15 hover:border-[#722F37] transition-all duration-300 flex flex-col justify-between shadow-soft-md group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#722F37]/25 border border-[#722F37]/50 flex items-center justify-center text-[#E8DCC6] font-label font-bold text-lg mb-6 group-hover:scale-105 transition-transform">
                  AFCAT
                </div>
                <h3 className="font-heading text-2xl font-semibold text-[#E8DCC6] mb-2">
                  Air Force Common Admission Test
                </h3>
                <div className="text-xs font-label uppercase tracking-wider text-[#B7A89A] mb-4">
                  Flying • Technical • Ground Duty Branches
                </div>
                <p className="text-xs sm:text-sm text-[#E8DCC6]/75 leading-relaxed font-sans mb-6">
                  Speed training in verbal ability, numerical ability, reasoning aptitude, and military awareness with AFSB interview guidance.
                </p>
                <div className="space-y-2.5 text-xs text-[#E8DCC6]/90 border-t border-[#E8DCC6]/10 pt-4">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#722F37] shrink-0" />
                    <span>Speed &amp; Reasoning Practice Sets</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#722F37] shrink-0" />
                    <span>AFSB Interview &amp; Guidance</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#722F37] shrink-0" />
                    <span>Daily Speed &amp; Accuracy Practice</span>
                  </div>
                </div>
              </div>
              <div className="pt-6">
                <button
                  onClick={() => openOrientation("afcat")}
                  className="w-full py-3.5 rounded-xl bg-[#722F37] hover:bg-[#853741] text-[#E8DCC6] font-label text-xs uppercase tracking-widest font-bold transition-all shadow-md active:scale-98 border border-[#E8DCC6]/20"
                >
                  Enquire for AFCAT Batch
                </button>
              </div>
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
      {/* 3. 8 PILLARS OF MENTORSHIP (Breathable Transition - Warm Supporting Cream) */}
      {/* ========================================================================= */}
      <section className="py-24 relative z-10 bg-[#FAF7F2] text-[#211C1D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="font-label text-xs uppercase tracking-[0.2em] text-[#722F37] font-semibold">
              The 8 Pillars of Mentorship
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#211C1D]">
              What Every Student Receives
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { num: "01", title: "Personalized Study Plan", desc: "A clear, day-by-day study roadmap made specifically for your target exam — no generic schedules." },
              { num: "02", title: "1-on-1 Mentor Guidance", desc: "Direct regular advice to track your progress and fix study habits." },
              { num: "03", title: "Daily Study Check", desc: "Daily evening reporting to confirm what you studied, practiced, and revised." },
              { num: "04", title: "Regular Revision & Practice", desc: "Targeted questions and revision tests to make sure you do not forget what you study." },
              { num: "05", title: "Real Mock Tests", desc: "Regular full-length practice tests under real exam conditions." },
              { num: "06", title: "15 Officer-Like Qualities", desc: "Developing character, honesty, teamwork, and courage through daily habits." },
              { num: "07", title: "Daily Routine & Fitness", desc: "Morning fitness routine, time-blocking, and disciplined daily habits." },
              { num: "08", title: "Weekly Mindset Sessions", desc: "Staying motivated, handling stress, and overcoming exam anxiety." },
            ].map((pillar, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-7 rounded-2xl bg-white border border-[#211C1D]/10 space-y-3 shadow-soft-sm hover:shadow-soft-md hover:border-[#722F37]/40 transition-all duration-300"
              >
                <div className="font-label text-xs uppercase tracking-[0.2em] text-[#722F37] font-bold">
                  Pillar {pillar.num}
                </div>
                <h4 className="font-heading font-semibold text-lg text-[#211C1D]">
                  {pillar.title}
                </h4>
                <p className="text-xs text-[#211C1D]/70 leading-relaxed font-sans">
                  {pillar.desc}
                </p>
              </div>
            ))}
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
      {/* 4. CEREMONIAL BURGUNDY CTA BANNER                                        */}
      {/* ========================================================================= */}
      <section className="py-24 text-center relative z-10 bg-[#722F37] text-[#E8DCC6]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-6">
          <div className="w-14 h-14 rounded-2xl bg-[#E8DCC6]/15 border border-[#E8DCC6]/30 flex items-center justify-center text-[#E8DCC6] mx-auto shadow-md">
            <Shield className="w-7 h-7" />
          </div>

          <h2 className="font-heading text-3xl sm:text-5xl font-semibold tracking-tight text-[#E8DCC6] leading-tight">
            Book a Free Defence Guidance Call
          </h2>

          <p className="text-sm sm:text-base text-[#E8DCC6]/85 font-sans max-w-xl mx-auto leading-relaxed">
            We review your current preparation level, syllabus coverage, and study routine before suggesting the right plan.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => openOrientation("defence")}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#211C1D] hover:bg-[#2d2627] text-[#E8DCC6] font-label font-bold text-xs uppercase tracking-widest shadow-xl transition-all active:scale-95 border border-[#E8DCC6]/20"
            >
              Book a Free 20-Minute Call
            </button>
            <a
              href="https://wa.me/918969634656?text=Hello%20Officium%20Supremum,%20I%20would%20like%20guidance%20for%20Defence%20exams"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#E8DCC6]/10 hover:bg-[#E8DCC6]/20 backdrop-blur-sm border border-[#E8DCC6]/30 text-[#E8DCC6] font-label text-xs uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
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
