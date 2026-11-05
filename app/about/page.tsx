"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/siteConfig";
import { useModals } from "@/components/ModalContext";
import {
  Compass,
  Shield,
  Target,
  Award,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ExternalLink
} from "lucide-react";

const founderTimeline = [
  {
    title: "2021 · Where mentoring began",
    description:
      "As a Junior Division NCC cadet, I started teaching children for free under the 'Each One Teach One' initiative, and began guiding my juniors at school."
  },
  {
    title: "Feeling the struggle myself",
    description:
      "Students rarely struggle for lack of talent. They struggle with consistency, confidence and not having someone check in every day. I felt those challenges myself, and my mentees described them to me again and again."
  },
  {
    title: "Preparing for the NDA in Meerut",
    description:
      "I put serious effort into NDA preparation in Meerut, which showed me how demanding a defence aspirant's daily routine really is."
  },
  {
    title: "A different path",
    description:
      "I cleared the IMU CET and received a sponsorship from MSC for the Diploma in Nautical Science (D.N.S.) course. I then moved on to IIT Patna."
  },
  {
    title: "Discipline in uniform and in the mountains",
    description:
      "NCC 'A', 'B' and 'C' certificates, service as a Bihar Yuva Apda Mitra (disaster-response volunteer), a Leadership & Team Building camp, and the Mountaineering Special Course at NIM Uttarkashi."
  },
  {
    title: "On the field",
    description:
      "Participant at the Bihar Senior State Volleyball Championship, bronze medallist in long jump, and still playing in college."
  },
  {
    title: "Nov 2025 · Officium Supremum",
    description:
      "After about five years of guiding students informally, I founded Officium Supremum to give that mentoring a proper system: a personal study plan, a daily evening check, and steady support for students and parents."
  }
];

const founderCredentials = [
  "IIT Patna — B.S. CS & Data Analytics (2025–2029)",
  "NCC 'A', 'B' & 'C' Certificates",
  "Mountaineering Special Course, NIM Uttarkashi",
  "Disaster Management Responder",
  "Leadership & Team Building",
  "Bihar State Volleyball Championship participant",
  "Bronze medallist, long jump"
];

const childCards = [
  {
    title: "Discipline learned, not lectured",
    description:
      "NCC training taught me the value of early mornings, drills and responsibility. That is the culture we build."
  },
  {
    title: "I know the student's side",
    description:
      "I have felt preparation pressure and self-doubt, so I understand what students go through when motivation drops."
  },
  {
    title: "Steady follow-up",
    description:
      "Guiding students since 2021: daily check-ins, honest feedback and calm communication with parents."
  }
];

const corePrinciples = [
  {
    title: "Daily Action Over Endless Advice",
    description:
      "Advice without daily action does not help. We focus our energy on practical daily habits, regular progress checks, and clearing doubts immediately.",
    icon: Target
  },
  {
    title: "High Standards & Good Habits",
    description:
      "Inspired by the daily discipline of India's defence academies: a regular morning routine, physical fitness, and staying calm under pressure.",
    icon: Shield
  },
  {
    title: "Remembering What You Study",
    description:
      "We use quick self-quizzes and planned revisions so you remember formulas, vocabulary, and concepts long before examination day arrives.",
    icon: Award
  }
];

export default function AboutPage() {
  const { openOrientation } = useModals();

  return (
    <div className="bg-[#211C1D] text-[#E8DCC6] min-h-screen relative overflow-hidden selection:bg-[#722F37] selection:text-[#E8DCC6]">

      {/* Subtle Ambient Radial Accents */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[min(600px,100vw)] h-[min(600px,100vw)] bg-[#722F37]/15 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 left-0 w-[min(450px,100vw)] h-[min(450px,100vw)] bg-[#B7A89A]/10 rounded-full blur-[120px]" />
      </div>

      {/* ========================================================================= */}
      {/* 1. HERO / PURPOSE SECTION                                                 */}
      {/* ========================================================================= */}
      <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-28 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative">

          {/* Institutional Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#E8DCC6]/10 border border-[#E8DCC6]/20 shadow-sm">
            <Compass className="w-3.5 h-3.5 text-[#E8DCC6]" />
            <span className="font-label text-xs uppercase tracking-[0.2em] text-[#E8DCC6] font-semibold">
              About Officium Supremum • Vision &amp; Leadership
            </span>
          </div>

          {/* Editorial Display Headline */}
          <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-[#E8DCC6] leading-[1.08]">
            We Build Strong Habits, Clear Thinking, <br />
            <span className="text-[#E8DCC6] italic font-normal">
              and Confident Leaders.
            </span>
          </h1>

          {/* Subtitle / Mission */}
          <p className="text-base sm:text-lg text-[#E8DCC6]/80 font-sans leading-relaxed max-w-2xl mx-auto">
            Officium Supremum is not a crowded coaching institute. We are a personal mentorship academy that helps students build strong discipline, master their syllabus, and prepare with confidence for school, college, and defence exams.
          </p>

          {/* Dual Quick CTAs */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => openOrientation("general")}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#722F37] hover:bg-[#853741] text-[#E8DCC6] font-label font-bold text-xs uppercase tracking-widest shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 border border-[#E8DCC6]/20"
            >
              <span>Book a Free 20-Minute Call</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="#founder"
              className="w-full sm:w-auto px-8 py-4 rounded-full border border-[#E8DCC6]/30 hover:border-[#E8DCC6] text-[#E8DCC6] font-label text-xs uppercase tracking-widest transition-colors flex items-center justify-center"
            >
              Meet the Founder &amp; Story
            </a>
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
      {/* 2. WHY GUIDANCE MATTERS (Light Cream Transition Ground)                  */}
      {/* ========================================================================= */}
      <section className="py-20 lg:py-28 bg-[#FAF7F2] text-[#211C1D] relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="font-label text-xs uppercase tracking-[0.2em] text-[#722F37] font-semibold">
              The Value of Personal Mentorship
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#211C1D]">
              Why Guidance and Discipline Matter
            </h2>
            <p className="text-sm sm:text-base text-[#5C524F] font-sans leading-relaxed max-w-2xl mx-auto pt-2">
              Students rarely struggle for lack of talent. They struggle with consistency, self-doubt, and the absence of someone checking in every day. Personal mentorship replaces guesswork with structure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 sm:p-9 rounded-3xl bg-white border border-[#E8DCC6] shadow-soft-sm hover:shadow-soft-md transition-shadow flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#722F37]/10 border border-[#722F37]/20 flex items-center justify-center text-[#722F37]">
                  <Compass className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-semibold text-2xl text-[#211C1D]">
                  Direction Over Drifting
                </h3>
                <p className="text-xs sm:text-sm text-[#5C524F] leading-relaxed font-sans">
                  Without a clear roadmap, students lose hours each evening wondering what to study. A daily schedule provides immediate focus and purpose.
                </p>
              </div>
            </div>

            <div className="p-8 sm:p-9 rounded-3xl bg-white border border-[#E8DCC6] shadow-soft-sm hover:shadow-soft-md transition-shadow flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#722F37]/10 border border-[#722F37]/20 flex items-center justify-center text-[#722F37]">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-semibold text-2xl text-[#211C1D]">
                  Accountability Over Good Intentions
                </h3>
                <p className="text-xs sm:text-sm text-[#5C524F] leading-relaxed font-sans">
                  Good intentions fade without regular review. Daily evening check-ins transform plans into unbroken academic habits.
                </p>
              </div>
            </div>

            <div className="p-8 sm:p-9 rounded-3xl bg-white border border-[#E8DCC6] shadow-soft-sm hover:shadow-soft-md transition-shadow flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#722F37]/10 border border-[#722F37]/20 flex items-center justify-center text-[#722F37]">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-semibold text-2xl text-[#211C1D]">
                  Discipline Over Fleeting Motivation
                </h3>
                <p className="text-xs sm:text-sm text-[#5C524F] leading-relaxed font-sans">
                  Motivation comes and goes. Structured routines, physical health, and disciplined sleep build genuine, quiet self-confidence.
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
      {/* 3. FOUNDER PRESENTATION & JOURNEY TIMELINE (#founder)                     */}
      {/* ========================================================================= */}
      <section id="founder" className="py-20 lg:py-28 relative z-10 bg-[#211C1D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

            {/* Desktop Left / Mobile Top: Founder Portrait & Credentials Card */}
            <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">

              {/* Dignified Editorial Portrait Frame */}
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-[#E8DCC6]/25 shadow-soft-md bg-[#282224] p-2.5">
                <div className="relative aspect-[4/5] w-full rounded-xl sm:rounded-2xl overflow-hidden bg-[#211C1D]">
                  <Image
                    src="/founder-portrait.jpeg"
                    alt="Himanshu Thakur — Founder & Lead Mentor, Officium Supremum"
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    priority
                  />
                  <div
                    className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-[#E8DCC6]/20 rounded-xl sm:rounded-2xl"
                    aria-hidden="true"
                  />
                </div>
              </div>

              {/* Credentials & Certifications Panel */}
              <div className="p-6 rounded-2xl bg-[#282224] border border-[#E8DCC6]/15 space-y-3 shadow-soft-sm">
                <div className="font-label text-xs uppercase tracking-[0.2em] text-[#B7A89A] font-semibold">
                  Credentials &amp; Certifications
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  {founderCredentials.map((cred, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center px-3 py-1.5 rounded-lg bg-[#211C1D] border border-[#E8DCC6]/15 text-xs text-[#E8DCC6]/90 font-medium"
                    >
                      {cred}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Desktop Right / Mobile Bottom: Founder Story & 7-Item Timeline */}
            <div className="lg:col-span-7 space-y-8">

              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#722F37]/20 border border-[#722F37]/40 text-xs font-label uppercase tracking-widest text-[#E8DCC6] font-semibold">
                  Founder &amp; Lead Mentor
                </div>
                <h2 className="font-heading text-3xl sm:text-5xl font-semibold tracking-tight text-[#E8DCC6] leading-tight">
                  Meet Himanshu Thakur
                </h2>
                <p className="font-label text-xs sm:text-sm uppercase tracking-wider text-[#B7A89A] font-medium">
                  B.S. Computer Science &amp; Data Analytics, IIT Patna · NCC &apos;C&apos; Certified
                </p>
              </div>

              {/* Founder Personal Quote */}
              <div className="p-6 sm:p-7 rounded-2xl bg-[#282224] border-l-4 border-l-[#722F37] border border-[#E8DCC6]/15 shadow-soft-sm">
                <p className="text-base sm:text-lg text-[#E8DCC6] font-heading italic leading-relaxed">
                  &ldquo;I started Officium Supremum because I have stood on both sides of the table: as a student who needed a clear daily plan, and as a mentor helping others build one.&rdquo;
                </p>
              </div>

              {/* 7-Item Founder Timeline */}
              <div className="space-y-6 pt-2">
                <div className="font-label text-xs uppercase tracking-[0.2em] text-[#B7A89A] font-semibold">
                  Founder Journey &amp; Timeline
                </div>
                <div className="relative pl-6 sm:pl-8 border-l-2 border-[#E8DCC6]/20 space-y-8">
                  {founderTimeline.map((item, idx) => (
                    <div key={idx} className="relative group">
                      <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#211C1D] border-2 border-[#722F37] group-hover:bg-[#722F37] transition-colors" />
                      <h3 className="text-base sm:text-lg font-semibold text-[#E8DCC6] font-heading">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#E8DCC6]/75 mt-1.5 leading-relaxed font-sans">
                        {item.description}
                      </p>
                      {item.title === "2021 · Where mentoring began" && siteConfig.founderPhotos.eachOneTeachOne.consent && (
                        <div className="mt-4 rounded-xl sm:rounded-2xl overflow-hidden border border-[#E8DCC6]/20 shadow-soft-sm bg-[#282224] p-2 w-full max-w-[280px] sm:max-w-sm md:max-w-md">
                          <Image
                            src="/journey-each-one-teach-one.jpeg"
                            alt="NCC cadet Himanshu Thakur teaching children under the Each One Teach One initiative."
                            width={1280}
                            height={960}
                            className="w-full max-w-full h-auto rounded-lg sm:rounded-xl object-contain"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Founder CTAs & External Link */}
              <div className="pt-6 border-t border-[#E8DCC6]/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <button
                  onClick={() => openOrientation("general")}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#722F37] hover:bg-[#853741] text-[#E8DCC6] font-label font-bold text-xs uppercase tracking-widest shadow-md hover:shadow-lg transition-all active:scale-95 border border-[#E8DCC6]/20"
                >
                  Book a free call with Himanshu
                </button>
                <a
                  href="https://himanshuthakur.online"
                  target="_blank"
                  rel="noopener"
                  className="text-xs text-[#B7A89A] hover:text-[#E8DCC6] transition-colors font-sans inline-flex items-center gap-1.5"
                >
                  <span>I also build AI and software products → himanshuthakur.online</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
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
      {/* 4. WHAT THIS MEANS FOR YOUR CHILD (Light Cream Section)                  */}
      {/* ========================================================================= */}
      <section className="py-20 lg:py-28 bg-[#FAF7F2] text-[#211C1D] relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="font-label text-xs uppercase tracking-[0.2em] text-[#722F37] font-semibold">
              Our Approach in Practice
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#211C1D]">
              What This Means for Your Child
            </h2>
            <p className="text-sm sm:text-base text-[#5C524F] font-sans leading-relaxed max-w-2xl mx-auto pt-2">
              Mentorship is not abstract advice. It translates directly into daily routines, emotional composure, and tangible academic follow-up.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {childCards.map((card, idx) => (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-white border border-[#E8DCC6] space-y-3 shadow-soft-sm hover:shadow-soft-md transition-shadow"
              >
                <h3 className="font-heading font-semibold text-xl text-[#211C1D]">
                  {card.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#5C524F] leading-relaxed font-sans">
                  {card.description}
                </p>
              </div>
            ))}
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
      {/* 5. CORE INSTITUTIONAL PRINCIPLES (#211C1D Canvas)                         */}
      {/* ========================================================================= */}
      <section className="py-24 bg-[#211C1D] relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="font-label text-xs uppercase tracking-[0.2em] text-[#B7A89A] font-semibold">
              Institutional Values
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#E8DCC6]">
              The Principles We Teach By
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {corePrinciples.map((principle, idx) => {
              const IconComponent = principle.icon;
              return (
                <div
                  key={idx}
                  className="p-8 sm:p-9 rounded-3xl bg-[#282224] border border-[#E8DCC6]/15 shadow-soft-md space-y-4 hover:border-[#722F37] transition-all"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#722F37]/25 border border-[#722F37]/50 flex items-center justify-center text-[#E8DCC6]">
                    <IconComponent className="w-6 h-6 text-[#E8DCC6]" />
                  </div>
                  <h3 className="font-heading font-semibold text-2xl text-[#E8DCC6]">
                    {principle.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#E8DCC6]/75 leading-relaxed font-sans">
                    {principle.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Smooth dissolution: Near Black (#211C1D) into Burgundy (#722F37) */}
      <div
        className="w-full h-16 sm:h-24 pointer-events-none relative z-10"
        style={{ background: "linear-gradient(to bottom, #211C1D 0%, #331C1F 25%, #461E23 50%, #5E262D 75%, #722F37 100%)" }}
        aria-hidden="true"
      />

      {/* ========================================================================= */}
      {/* 6. CLOSING CEREMONIAL CALLOUT BANNER (#722F37 Burgundy Canvas)            */}
      {/* ========================================================================= */}
      <section className="py-24 text-center bg-[#722F37] relative z-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-6">
          <h2 className="font-heading text-3xl sm:text-5xl font-semibold text-[#E8DCC6]">
            Talk to an Academic Mentor
          </h2>
          <p className="text-sm sm:text-base text-[#E8DCC6]/85 font-sans max-w-lg mx-auto leading-relaxed">
            Schedule a free 20-minute call with our mentors to discuss your goals and receive a personalized study plan.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => openOrientation("general")}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#211C1D] hover:bg-[#282224] text-[#E8DCC6] font-label font-bold text-xs uppercase tracking-widest shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95 border border-[#E8DCC6]/20"
            >
              Book a Free 20-Minute Call
            </button>
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
