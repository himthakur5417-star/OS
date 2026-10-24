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

export default function DefenceProgramPage() {
  const { openOrientation } = useModals();

  return (
    <div className="defence-camo-bg text-zinc-100 min-h-screen relative overflow-hidden">
      
      {/* Slow-Moving Camouflage Depth Layer */}
      <div className="camo-depth-layer" />

      {/* ========================================================================= */}
      {/* 1. DEFENCE HERO SECTION                                                  */}
      {/* ========================================================================= */}
      <section className="relative pt-24 pb-24 lg:pt-32 lg:pb-32 border-b border-white/10 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl space-y-6">
            
            {/* Regimental Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-md">
              <Shield className="w-3.5 h-3.5 text-[#C8A84E]" />
              <span className="font-label text-xs uppercase tracking-[0.2em] text-[#C8A84E] font-semibold">
                Defence Leadership Track • NDA • CDS • AFCAT
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
              Success in NDA, CDS, and AFCAT is not decided by how many books you buy, but by how well you remember formulas, solve questions under time pressure, and carry yourself with confidence. We train students with academy-level discipline.
            </p>

            {/* CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={() => openOrientation("defence")}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#C8A84E] hover:bg-[#D4B65B] text-[#0F1115] font-label font-bold text-xs uppercase tracking-widest shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <span>Book a Free Defence Guidance Call</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <Link
                href="/resources/syllabus"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-label font-semibold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2"
              >
                <span>View Defence Syllabus &amp; Pattern</span>
              </Link>
            </div>

            {/* Academy Maxim Banner with Soft Glassmorphism */}
            <div className="pt-6 border-l-2 border-[#C8A84E] pl-4 text-xs font-heading italic text-zinc-200">
              &ldquo;The goal is not just to clear an exam — it is to become worthy of wearing the uniform.&rdquo;
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
              Three Pathways into the Armed Forces
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-medium tracking-tight text-white">
              Preparation for NDA, CDS, and AFCAT
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
                  Complete preparation covering Mathematics (300 Marks, 30 Chapters) and the General Ability Test (GAT - 600 Marks English &amp; General Studies).
                </p>
                <div className="space-y-2.5 text-xs text-zinc-200 border-t border-white/15 pt-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#C8A84E]" />
                    <span>4,000+ Solved Math Practice Questions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#C8A84E]" />
                    <span>50-Question Daily English Practice</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#C8A84E]" />
                    <span>SSB Interview &amp; Personality Preparation</span>
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
                  Complete preparation for Elementary Mathematics (Complete 22-Chapter Master Volume), English (100 Marks), and General Knowledge.
                </p>
                <div className="space-y-2.5 text-xs text-zinc-200 border-t border-white/15 pt-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#C8A84E]" />
                    <span>22-Chapter Elementary Mathematics Series</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#C8A84E]" />
                    <span>Current Affairs &amp; Strategic General Knowledge Notes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#C8A84E]" />
                    <span>Full-Length Mock Test Series</span>
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
                  Speed training in verbal ability, numerical ability, reasoning aptitude, and military awareness with AFSB interview guidance.
                </p>
                <div className="space-y-2.5 text-xs text-zinc-200 border-t border-white/15 pt-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#C8A84E]" />
                    <span>Speed &amp; Reasoning Practice Sets</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#C8A84E]" />
                    <span>AFSB Interview &amp; Guidance</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#C8A84E]" />
                    <span>Daily Speed &amp; Accuracy Practice</span>
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
      {/* 3. 8 PILLARS OF MENTORSHIP                                               */}
      {/* ========================================================================= */}
      <section className="py-24 border-b border-white/10 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="font-label text-xs uppercase tracking-[0.2em] text-[#C8A84E] font-semibold">
              The 8 Pillars of Mentorship
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-medium tracking-tight text-white">
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
            Book a Free Defence Guidance Call
          </h2>

          <p className="text-sm text-zinc-300 font-sans max-w-xl mx-auto">
            We review your current preparation level, syllabus coverage, and study routine before suggesting the right plan.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => openOrientation("defence")}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#C8A84E] hover:bg-[#D4B65B] text-[#0F1115] font-label font-bold text-xs uppercase tracking-widest shadow-lg"
            >
              Book a Free 20-Minute Call
            </button>
            <a
              href="https://wa.me/918969634656?text=Hello%20Officium%20Supremum,%20I%20would%20like%20guidance%20for%20Defence%20exams"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 text-white font-label text-xs uppercase tracking-widest hover:bg-white/25 transition-colors"
            >
              Chat with an Advisor on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
