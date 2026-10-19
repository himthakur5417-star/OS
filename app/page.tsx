"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useModals } from "@/components/ModalContext";
import { useAuth } from "@/components/AuthContext";
import { FloatingSymbols } from "@/components/FloatingSymbols";
import { Logo } from "@/components/Logo";
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
  Flame, 
  FileCheck, 
  Compass
} from "lucide-react";
import { motion } from "framer-motion";

export default function HomePage() {
  const { openOrientation } = useModals();
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
                A Mentorship Academy Built on Discipline
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-heading text-5xl sm:text-7xl lg:text-8xl font-semibold tracking-tight text-[#0B192C] leading-[1.05]"
            >
              Discipline Builds <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0B192C] via-sky-800 to-[#C8A84E]">
                Real Success.
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-xl text-slate-600 font-sans max-w-2xl mx-auto leading-relaxed"
            >
              We help school and college students build strong study habits, learn deeply, and clear competitive exams with personal guidance.
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
                <span>Book a Free 20-Minute Call</span>
                <ArrowRight className="w-4 h-4 text-[#C8A84E] group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="#programs"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/90 hover:bg-white border border-slate-200 hover:border-slate-300 text-[#0B192C] font-label font-semibold text-xs uppercase tracking-widest shadow-sm hover:shadow transition-all text-center"
              >
                View All Programs
              </a>
            </motion.div>
          </div>

          {/* Quick Metrics Bar with Soft Glassmorphism */}
          <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 p-6 sm:p-7 rounded-3xl bg-white/80 backdrop-blur-xl border border-slate-200/70 shadow-[0_15px_35px_-10px_rgba(15,23,42,0.05)]">
            <div className="border-r border-slate-200/60 pr-4 last:border-r-0">
              <div className="font-label text-2xl sm:text-3xl font-bold text-[#0B192C]">100%</div>
              <div className="font-heading text-xs text-slate-500 uppercase tracking-wider mt-0.5">
                A Personal Study Plan for Every Student
              </div>
            </div>
            <div className="border-r border-slate-200/60 pr-4 last:border-r-0">
              <div className="font-label text-2xl sm:text-3xl font-bold text-sky-700">Daily</div>
              <div className="font-heading text-xs text-slate-500 uppercase tracking-wider mt-0.5">
                Daily Study Check Every Evening
              </div>
            </div>
            <div className="border-r border-slate-200/60 pr-4 last:border-r-0">
              <div className="font-label text-2xl sm:text-3xl font-bold text-[#C8A84E]">4,000+</div>
              <div className="font-heading text-xs text-slate-500 uppercase tracking-wider mt-0.5">
                Practice Questions with Solutions
              </div>
            </div>
            <div>
              <div className="font-label text-2xl sm:text-3xl font-bold text-[#0B192C]">15 OLQs</div>
              <div className="font-heading text-xs text-slate-500 uppercase tracking-wider mt-0.5">
                Training for All 15 Officer-Like Qualities (SSB)
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
              Choose Your Stage
            </div>
            <h2 className="font-heading text-3xl sm:text-5xl font-medium tracking-tight text-[#0B192C]">
              Mentorship Programs Designed for Your Class
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-sans">
              Every student gets guidance matched to their class, school workload, and future goals.
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
                  Start building strong habits early. We help middle school students develop daily focus, fast reading skills, and self-discipline before high school pressure begins.
                </p>
                <ul className="space-y-2.5 text-xs text-slate-700 mb-8 border-t border-slate-100 pt-4">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-500 shrink-0" />
                    <span>Daily Study Routine &amp; Habit Tracking</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-500 shrink-0" />
                    <span>Daily English Reading &amp; Confident Speaking</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-500 shrink-0" />
                    <span>Building Confidence to Study Without Nagging</span>
                  </li>
                </ul>
              </div>

              <Link
                href="/programs/juniors"
                className="w-full py-3 px-4 rounded-xl bg-sky-50 hover:bg-sky-100 border border-sky-200/80 text-sky-800 font-label text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <span>Learn About Juniors Program</span>
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
                  For students preparing for Class 11 and 12 boards and competitive entrance exams at the same time. Learn how to manage time, revise faster, and score high without burnout.
                </p>
                <ul className="space-y-2.5 text-xs text-slate-700 mb-8 border-t border-slate-100 pt-4">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0" />
                    <span>Balance Board Exams with Entrance Tests</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0" />
                    <span>90-Minute Focus Blocks &amp; Active Revision</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0" />
                    <span>Managing Stress and Exam Pressure</span>
                  </li>
                </ul>
              </div>

              <Link
                href="/programs/scholars"
                className="w-full py-3 px-4 rounded-xl bg-indigo-50 hover:bg-indigo-100 border border-indigo-200/80 text-indigo-900 font-label text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <span>Learn About Scholars Program</span>
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
                  Defence Leadership
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-6 font-sans">
                  Complete training for Armed Forces examinations. Covers written exam preparation, daily morning routines, and personality development for the SSB interview.
                </p>
                <ul className="space-y-2.5 text-xs text-slate-700 mb-8 border-t border-slate-100 pt-4">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#C8A84E] shrink-0" />
                    <span>Complete Maths &amp; English Practice Material</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#C8A84E] shrink-0" />
                    <span>Preparation for SSB Psychology, GTO Tasks &amp; Interview</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#C8A84E] shrink-0" />
                    <span>Daily Morning Fitness &amp; Discipline Routine</span>
                  </li>
                </ul>
              </div>

              <Link
                href="/programs/defense"
                className="w-full py-3 px-4 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200/80 text-amber-900 font-label text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 transition-colors"
              >
                <span>Learn About Defence Program</span>
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
                How We Guide You
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl font-medium tracking-tight text-[#0B192C] leading-tight">
                Not a Crowded Coaching Class. <br />
                A Personal Mentorship System.
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed font-sans">
                Most students struggle not because they lack talent, but because they study without a daily plan, lack consistency, and forget topics after a few weeks. We guide you step by step every day so you stay on track.
              </p>
              
              <div className="pt-3">
                <button
                  onClick={() => openOrientation("general")}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0B192C] hover:bg-[#1E293B] text-white font-label text-xs uppercase tracking-widest font-semibold transition-all shadow-sm"
                >
                  <span>Book a Free 20-Minute Call</span>
                  <ArrowRight className="w-4 h-4 text-[#C8A84E]" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                {
                  step: "01",
                  title: "A Study Plan Made for You",
                  desc: "No one-size-fits-all timetable. You get a daily schedule and weekly targets tailored to your current strengths and weaknesses.",
                  icon: Target,
                },
                {
                  step: "02",
                  title: "Daily Study Check Every Evening",
                  desc: "Every evening, you share what you studied, questions you solved, and where you got stuck. If you fall behind, your mentor helps you fix it the very next day.",
                  icon: Clock,
                },
                {
                  step: "03",
                  title: "Practice to Remember Longer",
                  desc: "Just reading notes again and again does not work. We train you to test yourself with quick practice drills, short summary notes, and timed quizzes so you never forget in the exam hall.",
                  icon: Layers,
                },
                {
                  step: "04",
                  title: "Weekly Guidance & Mindset Sessions",
                  desc: "Learn how to stay calm under pressure, avoid distractions, overcome study tiredness, and stay motivated through the entire year.",
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
      {/* 6. FOUNDER STORY & CHARTER                                               */}
      {/* ========================================================================= */}
      <section className="py-24 bg-[#FAF7F2] border-b border-slate-200/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-sm border-l-4 border-l-[#C8A84E] space-y-6">
            <div className="font-label text-xs uppercase tracking-[0.2em] text-[#C8A84E] font-semibold">
              Our Core Belief
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-medium tracking-tight text-[#0B192C] leading-snug">
              &quot;We built Officium Supremum to give students personal attention, real discipline, and daily support.&quot;
            </h2>
            <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
              <p>
                In big coaching centres, students often get lost in crowded classrooms of hundreds. Teachers give lectures, but no one checks whether each student understood the concept or revised it the next day. By the time exams come near, students feel stressed and unprepared.
              </p>
              <p>
                Officium Supremum was started with one clear belief: <strong>Discipline cannot be taught through lectures alone — it must be practiced every day.</strong> Whether you are in school building good study habits or preparing for the armed forces, success comes from simple things: a clear daily plan, honest daily progress checks, and regular mentor support.
              </p>
            </div>
            <div className="pt-2 font-label text-xs uppercase tracking-widest text-[#0B192C]">
              — Mentorship Team, Officium Supremum
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6.5. FOUNDER TEASER                                                       */}
      {/* ========================================================================= */}
      <section className="py-16 bg-white border-b border-slate-200/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#FAF7F2] rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200/80 shadow-soft-sm flex flex-col sm:flex-row items-center gap-6 sm:gap-8 lg:gap-10">
            <div className="relative w-28 h-36 sm:w-36 sm:h-44 flex-shrink-0 rounded-2xl overflow-hidden border border-slate-200/80 shadow-soft-sm bg-slate-100">
              <Image
                src="/founder-portrait.jpeg"
                alt="Himanshu Thakur — Founder of Officium Supremum"
                fill
                className="object-cover object-top"
                sizes="(max-width: 640px) 112px, 144px"
              />
            </div>
            <div className="space-y-3 text-center sm:text-left flex-1">
              <h2 className="font-heading text-2xl sm:text-3xl font-semibold tracking-tight text-[#0B192C]">
                Meet the Founder
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans max-w-xl">
                I started Officium Supremum to help students build a clear study plan, stay consistent and get steady guidance.
              </p>
              <div className="pt-1">
                <Link
                  href="/about#founder"
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#0B192C] hover:text-[#C8A84E] transition-colors group font-sans"
                >
                  <span>Read the founder&apos;s story</span>
                  <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
                </Link>
              </div>
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
              Common Questions
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-medium tracking-tight text-[#0B192C]">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3.5">
            {[
              {
                q: "How is Officium Supremum different from regular coaching classes?",
                a: "Regular coaching classes mainly finish chapters through classroom lectures. Officium Supremum focuses on personal mentorship and daily action: we give you a personalized study schedule, check your progress every evening, help you practice active revision, and teach you how to stay calm during exams so you remember everything you learn."
              },
              {
                q: "Is this mentorship only for defence exams (NDA / CDS / AFCAT)?",
                a: "No. While our Defence Program is popular for NDA, CDS, and AFCAT, we also offer the Juniors Program (Class 7 to 10) and Scholars Program (Class 11 and 12). These programs help students score high in school exams, Olympiads, and future entrance tests by building solid study habits early."
              },
              {
                q: "How does the Daily Study Check work?",
                a: "Every evening before 10:00 PM, students share a quick update with their mentor: hours studied, topics finished, practice questions solved, and any doubts they had. Your mentor reviews your progress, helps you overcome difficulties, and sets clear targets for the next day."
              },
              {
                q: "Can parents track their child's progress?",
                a: "Yes. For students in the Juniors and Scholars programs, parents receive regular study reports and updates, along with regular meetings with the mentor to discuss the student's progress."
              },
              {
                q: "How do we get started?",
                a: "Start by booking a free 20-minute introductory call. We will discuss the student's goals, current study routine, and challenges to see which program is the right fit."
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
          <div className="w-14 h-14 rounded-2xl border border-amber-200/90 bg-white flex items-center justify-center mx-auto shadow-sm">
            <Logo showText={false} size="sm" variant="gold" />
          </div>

          <h2 className="font-heading text-3xl sm:text-5xl font-medium tracking-tight text-[#0B192C] leading-tight">
            Build Consistent Daily Habits <br />
            <span className="text-[#C8A84E]">Instead of Waiting for Motivation.</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto font-sans">
            Book a free 20-minute call to review your current preparation and get a personalized study plan.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => openOrientation("general")}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#0B192C] hover:bg-[#1E293B] text-white font-label font-bold text-xs uppercase tracking-widest shadow-[0_12px_25px_-8px_rgba(11,25,44,0.35)] transition-all active:scale-95"
            >
              Book a Free 20-Minute Call
            </button>

            <a
              href="https://wa.me/918969634656"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-[#0B192C] font-label font-semibold text-xs uppercase tracking-widest transition-all shadow-sm"
            >
              Chat with Us on WhatsApp (+91 8969634656)
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
