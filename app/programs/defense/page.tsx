"use client";

import React from "react";
import Link from "next/link";
import { useModals } from "@/components/ModalContext";
import { 
  Shield, 
  Award, 
  Target, 
  Clock, 
  BookOpen, 
  CheckCircle2, 
  ArrowRight, 
  ChevronRight, 
  FileText, 
  Flame, 
  Layers
} from "lucide-react";
import { motion } from "framer-motion";

export default function DefenseProgramPage() {
  const { openOrientation, openAi } = useModals();

  return (
    <div className="defense-camo-bg text-zinc-100 min-h-screen relative overflow-hidden">
      
      {/* Slow-Moving Camouflage Depth Layer */}
      <div className="camo-depth-layer" />

      {/* ========================================================================= */}
      {/* 1. DEFENSE HERO SECTION                                                  */}
      {/* ========================================================================= */}
      <section className="relative pt-24 pb-24 lg:pt-32 lg:pb-32 border-b border-white/10 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl space-y-6">
            
            {/* Regimental Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-md">
              <Shield className="w-3.5 h-3.5 text-[#C8A84E]" />
              <span className="font-label text-xs uppercase tracking-[0.2em] text-[#C8A84E] font-semibold">
                Defense Leadership Track • NDA • CDS • AFCAT
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-heading text-4xl sm:text-6xl font-semibold tracking-tight text-white leading-[1.08]">
              The Making of <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-100 to-[#C8A84E]">
                an Armed Forces Officer.
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-zinc-300 font-sans leading-relaxed">
              Success in NDA, CDS, and AFCAT is not decided by how much an aspirant studies — but by how effectively they recall, apply, and execute under pressure. We train future officers under academy discipline.
            </p>

            {/* CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={() => openOrientation("defense")}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#C8A84E] hover:bg-[#D4B65B] text-[#0F1115] font-label font-bold text-xs uppercase tracking-widest shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <span>Begin Cadet Assessment</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => openAi("syllabus")}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-label font-semibold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2"
              >
                <span>Inspect Defense Syllabus</span>
              </button>
            </div>

            {/* Academy Maxim Banner with Soft Glassmorphism */}
            <div className="pt-6 border-l-2 border-[#C8A84E] pl-4 text-xs font-heading italic text-zinc-200">
              "The objective is not merely to clear an examination — it is to become worthy of wearing the uniform."
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. EXAMINATIONS COVERED MATRIX (NDA / CDS / AFCAT)                       */}
      {/* ========================================================================= */}
      <section className="py-24 border-b border-white/10 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="font-label text-xs uppercase tracking-[0.2em] text-[#C8A84E] font-semibold">
              Three Routes into Service
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-medium tracking-tight text-white">
              Targeted Examination Architecture
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* NDA Card */}
            <div className="p-8 sm:p-9 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/15 hover:border-[#C8A84E]/70 transition-all flex flex-col justify-between shadow-2xl">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center text-[#C8A84E] font-label font-bold text-lg mb-6">
                  NDA
                </div>
                <h3 className="font-heading text-2xl font-semibold text-white mb-2">
                  National Defence Academy
                </h3>
                <div className="text-xs font-label uppercase tracking-wider text-[#C8A84E] mb-4">
                  Army • Navy • Air Force • 10+2 Cadets
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed font-sans mb-6">
                  Rigorous preparation covering Mathematics (300 Marks, 30 Chapters) and the General Ability Test (GAT - 600 Marks English &amp; GS).
                </p>
                <div className="space-y-2.5 text-xs text-zinc-200 border-t border-white/15 pt-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#C8A84E]" />
                    <span>4,330+ Solved Math Drill Archive</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#C8A84E]" />
                    <span>50-Question English Vocab Mastery</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#C8A84E]" />
                    <span>5-Day SSB Psychological Conditioning</span>
                  </div>
                </div>
              </div>
              <div className="pt-6">
                <button
                  onClick={() => openOrientation("nda")}
                  className="w-full py-3 rounded-xl bg-[#C8A84E] hover:bg-[#D4B65B] text-[#0F1115] font-label text-xs uppercase tracking-widest font-bold transition-all shadow-md"
                >
                  Enquire for NDA Batch
                </button>
              </div>
            </div>

            {/* CDS Card */}
            <div className="p-8 sm:p-9 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/15 hover:border-[#C8A84E]/70 transition-all flex flex-col justify-between shadow-2xl">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center text-[#C8A84E] font-label font-bold text-lg mb-6">
                  CDS
                </div>
                <h3 className="font-heading text-2xl font-semibold text-white mb-2">
                  Combined Defence Services
                </h3>
                <div className="text-xs font-label uppercase tracking-wider text-[#C8A84E] mb-4">
                  IMA • OTA • INA • AFA • Graduates
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed font-sans mb-6">
                  Comprehensive strategy for Elementary Mathematics (383-page Master Vol), English (100 Marks), and General Knowledge.
                </p>
                <div className="space-y-2.5 text-xs text-zinc-200 border-t border-white/15 pt-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#C8A84E]" />
                    <span>22-Chapter Elementary Math Vault</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#C8A84E]" />
                    <span>Current Affairs &amp; Strategic GS Notes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#C8A84E]" />
                    <span>Rigorous Mock Exam Simulations</span>
                  </div>
                </div>
              </div>
              <div className="pt-6">
                <button
                  onClick={() => openOrientation("cds")}
                  className="w-full py-3 rounded-xl bg-[#C8A84E] hover:bg-[#D4B65B] text-[#0F1115] font-label text-xs uppercase tracking-widest font-bold transition-all shadow-md"
                >
                  Enquire for CDS Batch
                </button>
              </div>
            </div>

            {/* AFCAT Card */}
            <div className="p-8 sm:p-9 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/15 hover:border-[#C8A84E]/70 transition-all flex flex-col justify-between shadow-2xl">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center text-[#C8A84E] font-label font-bold text-lg mb-6">
                  AFCAT
                </div>
                <h3 className="font-heading text-2xl font-semibold text-white mb-2">
                  Air Force Common Admission Test
                </h3>
                <div className="text-xs font-label uppercase tracking-wider text-[#C8A84E] mb-4">
                  Flying • Technical • Ground Duty Branches
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed font-sans mb-6">
                  High-speed verbal ability, numerical ability, reasoning aptitude, and military awareness tests with AFSB interview preparation.
                </p>
                <div className="space-y-2.5 text-xs text-zinc-200 border-t border-white/15 pt-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#C8A84E]" />
                    <span>High-Speed Reasoning Modules</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#C8A84E]" />
                    <span>AFSB Interview &amp; CPSS Guidance</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#C8A84E]" />
                    <span>Daily Speed &amp; Accuracy Drills</span>
                  </div>
                </div>
              </div>
              <div className="pt-6">
                <button
                  onClick={() => openOrientation("afcat")}
                  className="w-full py-3 rounded-xl bg-[#C8A84E] hover:bg-[#D4B65B] text-[#0F1115] font-label text-xs uppercase tracking-widest font-bold transition-all shadow-md"
                >
                  Enquire for AFCAT Batch
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. PYQ LIBRARY & 8-PILLARS                                               */}
      {/* ========================================================================= */}
      <section className="py-24 border-b border-white/10 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="font-label text-xs uppercase tracking-[0.2em] text-[#C8A84E] font-semibold">
              The 8 Systems of Execution
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-medium tracking-tight text-white">
              What Every Officer Cadet Receives
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { num: "01", title: "Mentorship Roadmap", desc: "A personalized battle plan tailored to your exam stage — no generic schedules." },
              { num: "02", title: "Personal Guidance", desc: "1-on-1 performance monitoring and time-management correction." },
              { num: "03", title: "Daily Accountability", desc: "Nightly logs tracking hours invested, topics completed, and revision verified." },
              { num: "04", title: "Revision & Recall", desc: "Active recall drills and memory reinforcement before forgetting sets in." },
              { num: "05", title: "Mock Test Ecosystem", desc: "Scheduled full-length simulations strictly under exam-pressure conditions." },
              { num: "06", title: "15 Officer-Like Qualities", desc: "Building the 15 OLQs through daily tasks rather than memorizing for an interview." },
              { num: "07", title: "Academy Routine", desc: "Mandatory morning physical exercise, discipline-building, and time-blocking." },
              { num: "08", title: "Weekly Mind Sessions", desc: "Mental resilience, focus psychology, and overcoming exam fatigue." },
            ].map((pillar, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/15 space-y-3 shadow-lg">
                <div className="font-label text-xs uppercase tracking-widest text-[#C8A84E] font-bold">
                  Pillar {pillar.num}
                </div>
                <h4 className="font-heading font-semibold text-lg text-white">
                  {pillar.title}
                </h4>
                <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. ASSESSMENT CTA                                                        */}
      {/* ========================================================================= */}
      <section className="py-24 text-center relative z-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-6">
          <div className="w-12 h-12 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center text-[#C8A84E] mx-auto shadow-md">
            <Shield className="w-6 h-6" />
          </div>

          <h2 className="font-heading text-3xl sm:text-5xl font-semibold tracking-tight text-white">
            Begin the Cadet Assessment
          </h2>

          <p className="text-sm text-zinc-300 font-sans max-w-xl mx-auto">
            We evaluate your physical readiness, written examination baseline, and current study discipline before confirming batch allotment.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => openOrientation("defense")}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#C8A84E] hover:bg-[#D4B65B] text-[#0F1115] font-label font-bold text-xs uppercase tracking-widest shadow-lg"
            >
              Book Assessment Conversation
            </button>
            <a
              href="https://wa.me/918969634656?text=I%20want%20to%20apply%20for%20the%20Officium%20Supremum%20Defense%20Leadership%20Track"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 text-white font-label text-xs uppercase tracking-widest hover:bg-white/25 transition-colors"
            >
              Direct WhatsApp Admissions
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
