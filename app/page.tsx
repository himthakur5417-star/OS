"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useModals } from "@/components/ModalContext";
import { useAuth } from "@/components/AuthContext";
import { FloatingSymbols } from "@/components/FloatingSymbols";
import { Floating3DBooks } from "@/components/Floating3DBooks";
import { 
  ArrowRight, 
  Sparkles, 
  GraduationCap, 
  Shield, 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  Target, 
  ChevronDown, 
  Award, 
  Layers, 
  Bot, 
  ArrowUpRight, 
  Flame,
  FileCheck,
  Compass,
  Quote
} from "lucide-react";
import { motion } from "framer-motion";

export default function HomePage() {
  const { openOrientation, openAi } = useModals();
  const { openAuthModal } = useAuth();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="bg-[#FAFAF9] text-[#0F172A] overflow-hidden">
      {/* ========================================================================= */}
      {/* 1. HERO SECTION (Light, Elegant, Airy, Apple/Stripe feel)                */}
      {/* ========================================================================= */}
      <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-32 overflow-hidden border-b border-slate-200/60 bg-gradient-to-b from-white via-[#FAF7F2]/60 to-[#FAFAF9]">
        
        {/* Soft Ambient Radial Meshes (Sky blue, Cream, Baby pink accents) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[650px] bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,rgba(224,242,254,0.65),rgba(253,242,244,0.35)_40%,transparent_70%)] pointer-events-none" />
        
        {/* Floating Academy Symbols with Subtle Mouse Parallax */}
        <FloatingSymbols />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            
            {/* Academic Eyebrow Badge */}
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-slate-200/80 shadow-[0_2px_10px_-3px_rgba(15,23,42,0.05)]"
            >
              <span className="w-2 h-2 rounded-full bg-[#C8A84E]" />
              <span className="font-label text-xs uppercase tracking-[0.2em] text-slate-700 font-medium">
                Discipline-First Learning Academy
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-heading text-5xl sm:text-7xl lg:text-8xl font-semibold tracking-tight text-[#0B192C] leading-[1.05]"
            >
              Discipline Creates <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0B192C] via-sky-800 to-[#C8A84E]">
                Excellence.
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-xl text-slate-600 font-sans max-w-2xl mx-auto leading-relaxed"
            >
              We help students build discipline, master learning, and achieve ambitious goals through structured mentorship.
            </motion.p>

            {/* CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <button
                onClick={() => openOrientation("general")}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#0B192C] hover:bg-[#1E293B] text-white font-label font-bold text-xs uppercase tracking-widest shadow-[0_12px_25px_-8px_rgba(11,25,44,0.35)] transition-all active:scale-95 flex items-center justify-center gap-2 group"
              >
                <span>Book Orientation</span>
                <ArrowRight className="w-4 h-4 text-[#C8A84E] group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="#programs"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/90 hover:bg-white border border-slate-200 hover:border-slate-300 text-[#0B192C] font-label font-semibold text-xs uppercase tracking-widest shadow-sm hover:shadow transition-all text-center"
              >
                Explore Programs
              </a>
            </motion.div>

            {/* AI Assistant Quick Pill */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="pt-4"
            >
              <button
                onClick={() => openAi("syllabus")}
                className="inline-flex items-center gap-2 text-xs text-slate-600 hover:text-sky-700 transition-colors py-1.5 px-3.5 rounded-full bg-white/80 border border-slate-200/80 shadow-sm"
              >
                <Bot className="w-3.5 h-3.5 text-[#C8A84E]" />
                <span>Explore exam syllabus &amp; study timetable with <strong>Officium AI &rarr;</strong></span>
              </button>
            </motion.div>
          </div>

          {/* Quick Metrics Bar with Soft Glassmorphism */}
          <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 p-6 sm:p-7 rounded-3xl bg-white/80 backdrop-blur-xl border border-slate-200/70 shadow-[0_15px_35px_-10px_rgba(15,23,42,0.05)]">
            <div className="border-r border-slate-200/60 pr-4 last:border-r-0">
              <div className="font-label text-2xl sm:text-3xl font-bold text-[#0B192C]">100%</div>
              <div className="font-heading text-xs text-slate-500 uppercase tracking-wider mt-0.5">
                Personalized Roadmaps
              </div>
            </div>
            <div className="border-r border-slate-200/60 pr-4 last:border-r-0">
              <div className="font-label text-2xl sm:text-3xl font-bold text-sky-700">Daily</div>
              <div className="font-heading text-xs text-slate-500 uppercase tracking-wider mt-0.5">
                Accountability Audits
              </div>
            </div>
            <div className="border-r border-slate-200/60 pr-4 last:border-r-0">
              <div className="font-label text-2xl sm:text-3xl font-bold text-[#C8A84E]">4,330+</div>
              <div className="font-heading text-xs text-slate-500 uppercase tracking-wider mt-0.5">
                Curated Drill Problems
              </div>
            </div>
            <div>
              <div className="font-label text-2xl sm:text-3xl font-bold text-[#0B192C]">15 OLQs</div>
              <div className="font-heading text-xs text-slate-500 uppercase tracking-wider mt-0.5">
                Leadership Framework
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. OUR PROGRAMS (3 Interactive Cards with Soft Academy Tones)             */}
      {/* ========================================================================= */}
      <section id="programs" className="py-24 bg-[#FAF7F2] border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="font-label text-xs uppercase tracking-[0.2em] text-[#C8A84E] font-semibold">
              Distinct Pathways
            </div>
            <h2 className="font-heading text-3xl sm:text-5xl font-medium tracking-tight text-[#0B192C]">
              Structured Mentorship Across Three Tracks
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-sans">
              Each student enters an environment engineered for their specific developmental and academic stage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1: Juniors Program */}
            <div className="group relative bg-white border border-slate-200/80 hover:border-sky-300 rounded-3xl p-8 sm:p-9 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-15px_rgba(14,165,233,0.12)]">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-200/70 flex items-center justify-center text-sky-600 mb-6 group-hover:scale-105 transition-transform shadow-sm">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div className="font-label text-xs uppercase tracking-widest text-sky-600 font-semibold mb-1">
                  Class 7–10
                </div>
                <h3 className="font-heading text-2xl font-semibold text-[#0B192C] group-hover:text-sky-700 transition-colors mb-3">
                  Juniors Program
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-6 font-sans">
                  The Early Advantage Track. Focuses on foundational habit architecture, reading speed, critical reasoning, and academic self-discipline before senior high school.
                </p>
                <ul className="space-y-2.5 text-xs text-slate-700 mb-8 border-t border-slate-100 pt-4">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-500 shrink-0" />
                    <span>Habit Building &amp; Daily Journaling</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-500 shrink-0" />
                    <span>Editorial Reading &amp; Speaking</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-500 shrink-0" />
                    <span>Confidence &amp; Self-Accountability</span>
                  </li>
                </ul>
              </div>

              <Link
                href="/programs/juniors"
                className="w-full py-3 px-4 rounded-xl bg-sky-50 hover:bg-sky-100 border border-sky-200/80 text-sky-800 font-label text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <span>Explore Juniors Track</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Card 2: Scholars Program */}
            <div className="group relative bg-white border border-slate-200/80 hover:border-indigo-300 rounded-3xl p-8 sm:p-9 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-15px_rgba(99,102,241,0.12)]">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200/70 flex items-center justify-center text-indigo-600 mb-6 group-hover:scale-105 transition-transform shadow-sm">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div className="font-label text-xs uppercase tracking-widest text-indigo-600 font-semibold mb-1">
                  Class 11–12
                </div>
                <h3 className="font-heading text-2xl font-semibold text-[#0B192C] group-hover:text-indigo-800 transition-colors mb-3">
                  Scholars Program
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-6 font-sans">
                  Academic Mastery &amp; High-Stakes Performance. Engineered for scholars balancing senior board exams with competitive examinations through active recall and time-blocking.
                </p>
                <ul className="space-y-2.5 text-xs text-slate-700 mb-8 border-t border-slate-100 pt-4">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0" />
                    <span>Board + Competitive Exam Synergy</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0" />
                    <span>Deep Work &amp; Recall Schedules</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0" />
                    <span>Burnout &amp; Stress Inoculation</span>
                  </li>
                </ul>
              </div>

              <Link
                href="/programs/scholars"
                className="w-full py-3 px-4 rounded-xl bg-indigo-50 hover:bg-indigo-100 border border-indigo-200/80 text-indigo-900 font-label text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <span>Explore Scholars Track</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Card 3: Defense Leadership Program */}
            <div className="group relative bg-white border border-slate-200/80 hover:border-amber-300 rounded-3xl p-8 sm:p-9 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-15px_rgba(200,168,78,0.18)]">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200/70 flex items-center justify-center text-[#C8A84E] mb-6 group-hover:scale-105 transition-transform shadow-sm">
                  <Shield className="w-6 h-6" />
                </div>
                <div className="font-label text-xs uppercase tracking-widest text-amber-700 font-semibold mb-1">
                  NDA • CDS • AFCAT
                </div>
                <h3 className="font-heading text-2xl font-semibold text-[#0B192C] group-hover:text-amber-800 transition-colors mb-3">
                  Defense Leadership
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-6 font-sans">
                  The Officer Transformation Track. Complete preparation combining rigorous written exam systems with daily academy routines and the 15 Officer-Like Qualities (OLQs).
                </p>
                <ul className="space-y-2.5 text-xs text-slate-700 mb-8 border-t border-slate-100 pt-4">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#C8A84E] shrink-0" />
                    <span>30-Chapter Math &amp; 34-Ch English Vault</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#C8A84E] shrink-0" />
                    <span>SSB Psychology, GTO &amp; Interview</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#C8A84E] shrink-0" />
                    <span>Academy Routine &amp; Daily Physicals</span>
                  </li>
                </ul>
              </div>

              <Link
                href="/programs/defense"
                className="w-full py-3 px-4 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200/80 text-amber-900 font-label text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 transition-colors"
              >
                <span>Explore Defense Track</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. MENTORSHIP FRAMEWORK (Clean, Academic & High Trust)                    */}
      {/* ========================================================================= */}
      <section className="py-24 bg-white border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 space-y-4">
              <div className="font-label text-xs uppercase tracking-[0.2em] text-sky-600 font-semibold">
                Our Methodology
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl font-medium tracking-tight text-[#0B192C] leading-tight">
                Not a Mass Coaching Factory. <br />
                A Disciplined Mentorship Engine.
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed font-sans">
                Most students don't fail because of lack of intelligence; they fail because of lack of execution consistency, unmonitored preparation, and the forgetting curve. We systematically close that gap.
              </p>
              
              <div className="pt-3">
                <button
                  onClick={() => openOrientation("general")}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0B192C] hover:bg-[#1E293B] text-white font-label text-xs uppercase tracking-widest font-semibold transition-all shadow-sm"
                >
                  <span>Request Method Orientation</span>
                  <ArrowRight className="w-4 h-4 text-[#C8A84E]" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                {
                  step: "01",
                  title: "Personalized Roadmap",
                  desc: "Zero generic schedules. Every student receives daily tasks, weekly targets, and ongoing tracking calibrated to their baseline.",
                  icon: Target,
                },
                {
                  step: "02",
                  title: "Daily Accountability Log",
                  desc: "A mandatory evening briefing auditing hours, topics mastered, and friction faced. If a day slips, it is corrected immediately.",
                  icon: Clock,
                },
                {
                  step: "03",
                  title: "Active Recall Framework",
                  desc: "Passive re-reading is banned. Cadets are trained in flash-testing, short-note syntheses, and timed problem solving.",
                  icon: Layers,
                },
                {
                  step: "04",
                  title: "Weekly Mind Sessions",
                  desc: "Training the mind that carries the plan: mental resilience, discipline psychology, stress inoculation, and executive clarity.",
                  icon: Award,
                },
              ].map((item, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-[#FAFAF9] border border-slate-200/80 space-y-3 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <span className="font-label text-xs text-[#C8A84E] font-bold tracking-widest">
                      Pillar {item.step}
                    </span>
                    <item.icon className="w-5 h-5 text-slate-400" />
                  </div>
                  <h4 className="font-heading font-semibold text-lg text-[#0B192C]">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. RESOURCE LIBRARY & 3D FLOATING BOOKS SECTION                          */}
      {/* ========================================================================= */}
      <section className="py-24 bg-gradient-to-b from-[#FAF7F2] via-white to-[#FAF7F2] border-b border-slate-200/60 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-8 space-y-3">
            <div className="font-label text-xs uppercase tracking-[0.2em] text-[#C8A84E] font-semibold">
              The Digital Arsenal
            </div>
            <h2 className="font-heading text-3xl sm:text-5xl font-medium tracking-tight text-[#0B192C]">
              Interactive 3D Study Volumes
            </h2>
            <p className="text-sm text-slate-600 font-sans max-w-xl mx-auto">
              Hover over our official master volumes to inspect chapters, problem drills, and past year examination blueprints.
            </p>
          </div>

          {/* Interactive 3D Floating Books */}
          <Floating3DBooks />

          <div className="mt-8 text-center">
            <Link
              href="/resources"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-slate-200 hover:border-slate-300 font-label text-xs uppercase tracking-wider font-semibold text-[#0B192C] shadow-sm hover:shadow transition-all"
            >
              <span>Explore All 30 Mathematics &amp; 34 English Chapters in Vault</span>
              <ArrowUpRight className="w-4 h-4 text-[#C8A84E]" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. SUCCESS STORIES & TESTIMONIALS (Apple/Notion Editorial style)          */}
      {/* ========================================================================= */}
      <section className="py-24 bg-white border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <div className="font-label text-xs uppercase tracking-[0.2em] text-[#C8A84E] font-semibold">
              Verified Results
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-medium tracking-tight text-[#0B192C]">
              Voices of Transformation
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-sans">
              Verified accounts from parents, academy scholars, and recommended defense candidates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Testimonial 1 */}
            <div className="p-8 rounded-3xl bg-[#FAFAF9] border border-slate-200/80 flex flex-col justify-between shadow-sm">
              <div className="space-y-4">
                <Quote className="w-7 h-7 text-amber-300/80" />
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans italic">
                  "The daily accountability log was the game-changer for me. Earlier, I would study 8 hours on Monday and barely 1 hour on Wednesday. Officium Supremum eliminated the peaks and valleys. I cleared CDS on my very first attempt."
                </p>
              </div>
              <div className="border-t border-slate-200/60 pt-4 flex items-center gap-3 mt-6">
                <div className="w-9 h-9 rounded-full bg-slate-900 text-[#C8A84E] font-label font-bold text-xs flex items-center justify-center">
                  RD
                </div>
                <div>
                  <div className="font-heading font-semibold text-sm text-[#0B192C]">Cadet Rohit Deshmukh</div>
                  <div className="text-[11px] font-label uppercase text-slate-500">CDS (IMA) Recommended</div>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="p-8 rounded-3xl bg-[#FAFAF9] border border-slate-200/80 flex flex-col justify-between shadow-sm">
              <div className="space-y-4">
                <Quote className="w-7 h-7 text-sky-300/80" />
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans italic">
                  "As parents, our biggest worry was our son's screen time and lack of structured study routine. The Juniors Program mentors gave him a clear daily journal. His reading speed and public speaking confidence have noticeably transformed."
                </p>
              </div>
              <div className="border-t border-slate-200/60 pt-4 flex items-center gap-3 mt-6">
                <div className="w-9 h-9 rounded-full bg-sky-100 text-sky-700 font-label font-bold text-xs flex items-center justify-center">
                  SM
                </div>
                <div>
                  <div className="font-heading font-semibold text-sm text-[#0B192C]">Mrs. Shalini Mehta</div>
                  <div className="text-[11px] font-label uppercase text-slate-500">Mother of Class 9 Scholar</div>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="p-8 rounded-3xl bg-[#FAFAF9] border border-slate-200/80 flex flex-col justify-between shadow-sm">
              <div className="space-y-4">
                <Quote className="w-7 h-7 text-rose-300/80" />
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans italic">
                  "The 30-chapter Mathematics problem vault and active recall tests made sure formulas stayed in long-term memory. During the actual NDA exam, there was no panic — everything felt like standard operating procedure."
                </p>
              </div>
              <div className="border-t border-slate-200/60 pt-4 flex items-center gap-3 mt-6">
                <div className="w-9 h-9 rounded-full bg-slate-900 text-[#C8A84E] font-label font-bold text-xs flex items-center justify-center">
                  AK
                </div>
                <div>
                  <div className="font-heading font-semibold text-sm text-[#0B192C]">Cadet Aman Khurana</div>
                  <div className="text-[11px] font-label uppercase text-slate-500">NDA Written &amp; SSB Qualified</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. FOUNDER STORY & CHARTER                                               */}
      {/* ========================================================================= */}
      <section className="py-24 bg-[#FAF7F2] border-b border-slate-200/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-sm border-l-4 border-l-[#C8A84E] space-y-6">
            <div className="font-label text-xs uppercase tracking-[0.2em] text-[#C8A84E] font-semibold">
              The Academy Charter
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-medium tracking-tight text-[#0B192C] leading-snug">
              "We rejected the coaching factory model to build an institution of genuine accountability."
            </h2>
            <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
              <p>
                In standard coaching institutes, students are lost in lecture halls of hundreds. Teachers deliver lectures, but no one checks if the student actually recalled the topic the next morning. When exams arrive, panic sets in.
              </p>
              <p>
                Officium Supremum was founded on a singular conviction: <strong>Discipline is built, not lectured.</strong> Whether a student is in Class 8 establishing daily study stamina or in college preparing to lead troops into combat, the recipe remains constant: a structured daily cadence, unforgiving accountability, and weekly mindset coaching.
              </p>
            </div>
            <div className="pt-2 font-label text-xs uppercase tracking-widest text-[#0B192C]">
              — Mentorship Board, Officium Supremum
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. FREQUENTLY ASKED QUESTIONS (Light Modern Accordion)                   */}
      {/* ========================================================================= */}
      <section className="py-24 bg-white border-b border-slate-200/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-3">
            <div className="font-label text-xs uppercase tracking-[0.2em] text-sky-600 font-semibold">
              Clarifications
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-medium tracking-tight text-[#0B192C]">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3.5">
            {[
              {
                q: "How is Officium Supremum different from regular coaching classes?",
                a: "Coaching classes focus primarily on passive syllabus completion through lectures. Officium Supremum is a mentorship ecosystem that focuses on execution: daily personalized roadmaps, evening accountability audits, active recall drills, and psychological training to ensure concepts are retained under examination pressure."
              },
              {
                q: "Is this only for defense aspirants (NDA / CDS)?",
                a: "No. While our Defense Leadership program is acclaimed for NDA, CDS, and AFCAT, our Juniors Program (Class 7-10) and Scholars Program (Class 11-12) serve students aiming for high-performance academic mastery, Olympiads, and competitive excellence across fields."
              },
              {
                q: "How does the Daily Accountability System operate?",
                a: "Every evening before 22:00 hrs, students submit their daily briefing (hours invested, topics completed, practice problems solved, and doubts faced). Mentors evaluate the submission, correct slumps immediately, and lock in tomorrow's targets."
              },
              {
                q: "Can parents monitor their child's progress?",
                a: "Yes. In the Juniors and Scholars programs, parents receive regular attendance and consistency dashboards, along with bi-monthly parent-mentor conferences."
              },
              {
                q: "How do we get started?",
                a: "Begin by booking a 20-minute diagnostic orientation call. We review the student's target examination, current baseline, and daily routine before advising on admission fit."
              }
            ].map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200/80 bg-[#FAFAF9] overflow-hidden transition-all shadow-sm hover:shadow"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 text-[#0B192C] hover:text-[#C8A84E] transition-colors"
                >
                  <span className="font-heading font-medium text-sm sm:text-base">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      openFaq === idx ? "rotate-180 text-[#C8A84E]" : ""
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed font-sans border-t border-slate-200/60">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. FINAL HIGH-IMPACT CALL TO ACTION                                      */}
      {/* ========================================================================= */}
      <section className="py-24 bg-gradient-to-b from-white to-[#F5F0E6] relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <div className="w-12 h-12 rounded-2xl border border-amber-300/80 flex items-center justify-center bg-white text-[#C8A84E] mx-auto font-label font-bold text-xl shadow-sm">
            s.
          </div>

          <h2 className="font-heading text-3xl sm:text-5xl font-medium tracking-tight text-[#0B192C] leading-tight">
            Stop Relying on Fleeting Motivation. <br />
            <span className="text-[#C8A84E]">Build an Unbreakable System.</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto font-sans">
            Schedule a diagnostic orientation session to assess current preparation and receive a structured roadmap.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => openOrientation("general")}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#0B192C] hover:bg-[#1E293B] text-white font-label font-bold text-xs uppercase tracking-widest shadow-[0_12px_25px_-8px_rgba(11,25,44,0.35)] transition-all active:scale-95"
            >
              Book Orientation Call
            </button>

            <a
              href="https://wa.me/918969634656"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-[#0B192C] font-label font-semibold text-xs uppercase tracking-widest transition-all shadow-sm"
            >
              Speak via WhatsApp (+91 8969634656)
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
