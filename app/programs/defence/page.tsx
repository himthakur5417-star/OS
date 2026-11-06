"use client";

import React from "react";
import Link from "next/link";
import { useModals } from "@/components/ModalContext";
import {
  ShieldCheck,
  CheckCircle,
  ArrowRight,
  WhatsappLogo,
  Target,
  Compass,
  Trophy
} from "@phosphor-icons/react";

export default function DefenceProgramPage() {
  const { openOrientation } = useModals();

  return (
    <div className="bg-[#F3EFE6] text-[#252923] min-h-screen relative overflow-x-hidden selection:bg-[#34483C] selection:text-[#F3EFE6]">

      {/* ========================================================================= */}
      {/* 1. DEFENCE HERO SECTION                                                  */}
      {/* ========================================================================= */}
      <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 border-b border-[#D8D5C8]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          {/* Headline */}
          <h1 className="heading-1 text-[#252923] text-balance">
            The Making of an Armed Forces Officer.
          </h1>

          {/* Subheadline */}
          <p className="body-2 text-[#252923]/75 max-w-2xl mx-auto text-pretty">
            Success in NDA, CDS, and AFCAT is not decided by how many books you buy, but by how well you remember formulas, solve questions under time pressure, and carry yourself with confidence. We train students with academy-level daily discipline.
          </p>

          {/* CTAs */}
          <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => openOrientation("defence")}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#34483C] hover:bg-[#252923] text-[#F3EFE6] button-sm uppercase tracking-wider transition-colors shadow-soft-sm flex items-center justify-center gap-2"
            >
              <span>Book a Free Defence Guidance Call</span>
              <ArrowRight className="w-4 h-4" weight="bold" />
            </button>

            <Link
              href="/resources/syllabus"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl border border-[#D8D5C8] hover:border-[#34483C] bg-white text-[#252923] button-sm uppercase tracking-wider transition-colors flex items-center justify-center shadow-soft-sm"
            >
              <span>View Defence Syllabus &amp; Pattern</span>
            </Link>
          </div>

          {/* Academy Maxim Banner */}
          <div className="pt-4 max-w-lg mx-auto p-4 rounded-xl bg-white border border-[#D8D5C8] shadow-soft-sm">
            <p className="body-2 text-[#34483C] font-medium text-balance">
              &ldquo;The goal is not just to clear an exam — it is to become worthy of wearing the uniform.&rdquo;
            </p>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. EXAMINATIONS COVERED MATRIX (NDA / CDS / AFCAT)                       */}
      {/* ========================================================================= */}
      <section className="py-20 lg:py-24 bg-white border-b border-[#D8D5C8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <div className="caption-3 uppercase tracking-widest text-[#B18A58] font-semibold">
              Three Pathways into the Armed Forces
            </div>
            <h2 className="heading-2 text-[#252923]">
              Preparation for NDA, CDS, and AFCAT
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">

            {/* NDA Card */}
            <div className="p-7 sm:p-8 rounded-2xl bg-[#F3EFE6] border border-[#D8D5C8] shadow-soft-sm hover:border-[#34483C] transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#34483C] text-[#F3EFE6] flex items-center justify-center title-2 font-bold mb-4">
                  NDA
                </div>
                <h3 className="title-1 text-[#252923] mb-1">
                  National Defence Academy
                </h3>
                <div className="caption-3 uppercase tracking-wider text-[#B18A58] font-semibold mb-3">
                  Army • Navy • Air Force • 10+2 Cadets
                </div>
                <p className="body-3 text-[#252923]/75 leading-relaxed mb-4">
                  Complete preparation covering Mathematics (300 Marks, 30 Chapters) and the General Ability Test (GAT - 600 Marks English &amp; General Studies).
                </p>
                <div className="space-y-2 text-xs text-[#252923] border-t border-[#D8D5C8] pt-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#34483C] shrink-0" weight="bold" />
                    <span>4,000+ Solved Math Practice Questions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#34483C] shrink-0" weight="bold" />
                    <span>Daily English Precision Practice</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#34483C] shrink-0" weight="bold" />
                    <span>SSB &amp; Personality Grounding</span>
                  </div>
                </div>
              </div>
              <div className="pt-6">
                <button
                  onClick={() => openOrientation("nda")}
                  className="w-full py-3 rounded-xl bg-[#34483C] hover:bg-[#252923] text-[#F3EFE6] button-sm uppercase tracking-wider transition-colors shadow-soft-sm"
                >
                  Enquire for NDA Batch
                </button>
              </div>
            </div>

            {/* CDS Card */}
            <div className="p-7 sm:p-8 rounded-2xl bg-[#F3EFE6] border border-[#D8D5C8] shadow-soft-sm hover:border-[#34483C] transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#34483C] text-[#F3EFE6] flex items-center justify-center title-2 font-bold mb-4">
                  CDS
                </div>
                <h3 className="title-1 text-[#252923] mb-1">
                  Combined Defence Services
                </h3>
                <div className="caption-3 uppercase tracking-wider text-[#B18A58] font-semibold mb-3">
                  IMA • OTA • INA • AFA • Graduates
                </div>
                <p className="body-3 text-[#252923]/75 leading-relaxed mb-4">
                  Complete preparation for Elementary Mathematics (Complete 22-Chapter Master Volume), English (100 Marks), and General Knowledge.
                </p>
                <div className="space-y-2 text-xs text-[#252923] border-t border-[#D8D5C8] pt-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#34483C] shrink-0" weight="bold" />
                    <span>22-Chapter Elementary Mathematics Series</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#34483C] shrink-0" weight="bold" />
                    <span>Strategic General Knowledge Blueprints</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#34483C] shrink-0" weight="bold" />
                    <span>Full-Length Timed Mock Test Series</span>
                  </div>
                </div>
              </div>
              <div className="pt-6">
                <button
                  onClick={() => openOrientation("cds")}
                  className="w-full py-3 rounded-xl bg-[#34483C] hover:bg-[#252923] text-[#F3EFE6] button-sm uppercase tracking-wider transition-colors shadow-soft-sm"
                >
                  Enquire for CDS Batch
                </button>
              </div>
            </div>

            {/* AFCAT Card */}
            <div className="p-7 sm:p-8 rounded-2xl bg-[#F3EFE6] border border-[#D8D5C8] shadow-soft-sm hover:border-[#34483C] transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#34483C] text-[#F3EFE6] flex items-center justify-center title-2 font-bold mb-4">
                  AFCAT
                </div>
                <h3 className="title-1 text-[#252923] mb-1">
                  Air Force Common Admission Test
                </h3>
                <div className="caption-3 uppercase tracking-wider text-[#B18A58] font-semibold mb-3">
                  Flying • Technical • Ground Duty Branches
                </div>
                <p className="body-3 text-[#252923]/75 leading-relaxed mb-4">
                  Speed training in verbal ability, numerical ability, reasoning aptitude, and military awareness with structured AFSB interview guidance.
                </p>
                <div className="space-y-2 text-xs text-[#252923] border-t border-[#D8D5C8] pt-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#34483C] shrink-0" weight="bold" />
                    <span>Speed &amp; Reasoning Aptitude Sets</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#34483C] shrink-0" weight="bold" />
                    <span>AFSB Interview &amp; Psychological Testing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#34483C] shrink-0" weight="bold" />
                    <span>Daily Accuracy &amp; Time Drills</span>
                  </div>
                </div>
              </div>
              <div className="pt-6">
                <button
                  onClick={() => openOrientation("afcat")}
                  className="w-full py-3 rounded-xl bg-[#34483C] hover:bg-[#252923] text-[#F3EFE6] button-sm uppercase tracking-wider transition-colors shadow-soft-sm"
                >
                  Enquire for AFCAT Batch
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. 8 PILLARS OF MENTORSHIP                                               */}
      {/* ========================================================================= */}
      <section className="py-20 lg:py-24 bg-[#F3EFE6] border-b border-[#D8D5C8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <div className="caption-3 uppercase tracking-widest text-[#B18A58] font-semibold">
              The 8 Pillars of Mentorship
            </div>
            <h2 className="heading-2 text-[#252923]">
              What Every Defence Cadet Receives
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { num: "01", title: "Personal Study Roadmap", desc: "A day-by-day syllabus roadmap calibrated specifically to your target exam date." },
              { num: "02", title: "1-on-1 Mentor Guidance", desc: "Regular direct feedback to diagnose study habits and fix weak subjects." },
              { num: "03", title: "Daily Evening Check-in", desc: "Accountability review confirming completed problems, formulas, and revisions." },
              { num: "04", title: "Active Revision Loops", desc: "Scheduled intervals and recall questions so learned concepts stay fresh." },
              { num: "05", title: "Timed Mock Tests", desc: "Full-length examination simulations under strict negative marking conditions." },
              { num: "06", title: "15 Officer-Like Qualities", desc: "Cultivating character, integrity, teamwork, and composure in everyday choices." },
              { num: "07", title: "Physical Fitness Routine", desc: "Morning exercise routines, discipline, and stamina maintenance." },
              { num: "08", title: "Mental Composure", desc: "Techniques for managing exam anxiety and maintaining poise under pressure." },
            ].map((pillar, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-[#D8D5C8] space-y-2.5 shadow-soft-sm hover:border-[#34483C] transition-all"
              >
                <div className="caption-3 uppercase tracking-wider text-[#B18A58] font-semibold">
                  Pillar {pillar.num}
                </div>
                <h4 className="title-2 text-[#252923]">
                  {pillar.title}
                </h4>
                <p className="body-3 text-[#252923]/75 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. DEFENCE CALLOUT BANNER (Forest Sage Canvas)                           */}
      {/* ========================================================================= */}
      <section className="py-20 lg:py-24 text-center bg-[#34483C] text-[#F3EFE6] relative">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-5">
          <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-[#F3EFE6] mx-auto shadow-soft-sm">
            <ShieldCheck className="w-6 h-6" weight="bold" />
          </div>

          <h2 className="heading-2 text-[#F3EFE6] text-balance">
            Book a Free Defence Guidance Call
          </h2>

          <p className="body-2 text-[#F3EFE6]/80 max-w-xl mx-auto text-pretty">
            We review your current preparation level, syllabus coverage, and daily study routine before advising the right course of action.
          </p>

          <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => openOrientation("defence")}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#F3EFE6] hover:bg-white text-[#252923] button-sm uppercase tracking-wider transition-colors shadow-soft-sm"
            >
              Book a Free 20-Minute Call
            </button>
            <a
              href="https://wa.me/918969634656?text=Hello%20Officium%20Supremum,%20I%20would%20like%20guidance%20for%20Defence%20exams"
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
