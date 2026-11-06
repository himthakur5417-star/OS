"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/siteConfig";
import { useModals } from "@/components/ModalContext";
import {
  Compass,
  ShieldCheck,
  Target,
  Trophy,
  ArrowRight,
  Sparkle,
  ArrowSquareOut,
  GraduationCap,
  Clock,
  Heartbeat
} from "@phosphor-icons/react";

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
      "NCC training taught me the value of early mornings, drills and responsibility. That is the culture we build with our students every day."
  },
  {
    title: "I know the student's side",
    description:
      "I have felt preparation pressure and self-doubt, so I understand what students go through when motivation drops and workloads increase."
  },
  {
    title: "Steady follow-up",
    description:
      "Guiding students since 2021: daily check-ins, honest feedback and calm communication with parents so there are no surprises."
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
    icon: ShieldCheck
  },
  {
    title: "Remembering What You Study",
    description:
      "We use quick self-quizzes and planned revisions so you remember formulas, vocabulary, and concepts long before examination day arrives.",
    icon: Trophy
  }
];

export default function AboutPage() {
  const { openOrientation } = useModals();

  return (
    <div className="bg-[#F3EFE6] text-[#252923] min-h-screen relative overflow-x-hidden selection:bg-[#34483C] selection:text-[#F3EFE6]">

      {/* ========================================================================= */}
      {/* 1. HERO / PURPOSE SECTION                                                 */}
      {/* ========================================================================= */}
      <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 border-b border-[#D8D5C8]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          {/* Editorial Display Headline */}
          <h1 className="heading-1 text-[#252923] text-balance">
            We Build Strong Habits, Clear Thinking, <br className="hidden sm:inline" />
            and Confident Leaders.
          </h1>

          {/* Subtitle / Mission */}
          <p className="body-2 text-[#252923]/75 max-w-2xl mx-auto text-pretty">
            Officium Supremum is not a crowded coaching factory. We are a personal mentorship academy that helps students build strong discipline, master their syllabus, and prepare with quiet confidence for school, college, and defence exams.
          </p>

          {/* Dual CTAs */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => openOrientation("general")}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#34483C] hover:bg-[#252923] text-[#F3EFE6] button-sm tracking-wider uppercase transition-colors shadow-soft-sm flex items-center justify-center gap-2"
            >
              <span>Book a Free 20-Minute Call</span>
              <ArrowRight className="w-4 h-4" weight="bold" />
            </button>
            <a
              href="#founder"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl border border-[#D8D5C8] hover:border-[#34483C] bg-white text-[#252923] button-sm tracking-wider uppercase transition-colors flex items-center justify-center shadow-soft-sm"
            >
              Meet the Founder &amp; Story
            </a>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. EDITORIAL CREED MOMENT                                                 */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-20 bg-white border-b border-[#D8D5C8]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-3">
          <p className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#34483C] font-normal leading-relaxed text-balance">
            &ldquo;Knowledge provides direction, but daily discipline transforms it into lasting character.&rdquo;
          </p>
          <p className="body-3 text-[#252923]/60 max-w-md mx-auto">
            A foundation of steady personal habits outlasts short-term exam pressure.
          </p>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. WHY GUIDANCE MATTERS                                                  */}
      {/* ========================================================================= */}
      <section className="py-20 lg:py-24 bg-[#F3EFE6] border-b border-[#D8D5C8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <div className="caption-3 uppercase tracking-widest text-[#B18A58] font-semibold">
              The Value of Personal Mentorship
            </div>
            <h2 className="heading-2 text-[#252923]">
              Why Guidance and Discipline Matter
            </h2>
            <p className="body-2 text-[#252923]/70 pt-1 text-pretty">
              Students rarely struggle for lack of talent. They struggle with consistency, self-doubt, and the absence of someone checking in every day. Personal mentorship replaces guesswork with steady structure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <div className="p-7 sm:p-8 rounded-2xl bg-white border border-[#D8D5C8] shadow-soft-sm hover:border-[#34483C] transition-all flex flex-col justify-between">
              <div className="space-y-3.5">
                <div className="w-11 h-11 rounded-xl bg-[#34483C]/10 border border-[#34483C]/20 flex items-center justify-center text-[#34483C]">
                  <Compass className="w-5 h-5" weight="bold" />
                </div>
                <h3 className="title-2 text-[#252923]">
                  Direction Over Drifting
                </h3>
                <p className="body-3 text-[#252923]/75 leading-relaxed">
                  Without a clear roadmap, students lose hours each evening wondering what to study. A daily schedule provides immediate focus and purpose.
                </p>
              </div>
            </div>

            <div className="p-7 sm:p-8 rounded-2xl bg-white border border-[#D8D5C8] shadow-soft-sm hover:border-[#34483C] transition-all flex flex-col justify-between">
              <div className="space-y-3.5">
                <div className="w-11 h-11 rounded-xl bg-[#34483C]/10 border border-[#34483C]/20 flex items-center justify-center text-[#34483C]">
                  <Target className="w-5 h-5" weight="bold" />
                </div>
                <h3 className="title-2 text-[#252923]">
                  Accountability Over Intentions
                </h3>
                <p className="body-3 text-[#252923]/75 leading-relaxed">
                  Good intentions fade without regular review. Daily evening check-ins transform ambitious plans into unbroken academic habits.
                </p>
              </div>
            </div>

            <div className="p-7 sm:p-8 rounded-2xl bg-white border border-[#D8D5C8] shadow-soft-sm hover:border-[#34483C] transition-all flex flex-col justify-between">
              <div className="space-y-3.5">
                <div className="w-11 h-11 rounded-xl bg-[#34483C]/10 border border-[#34483C]/20 flex items-center justify-center text-[#34483C]">
                  <ShieldCheck className="w-5 h-5" weight="bold" />
                </div>
                <h3 className="title-2 text-[#252923]">
                  Discipline Over Motivation
                </h3>
                <p className="body-3 text-[#252923]/75 leading-relaxed">
                  Motivation comes and goes. Structured routines, physical health, and disciplined sleep build genuine, quiet self-confidence that endures.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. FOUNDER PRESENTATION & JOURNEY TIMELINE (#founder)                     */}
      {/* ========================================================================= */}
      <section id="founder" className="py-20 lg:py-28 bg-white border-b border-[#D8D5C8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

            {/* Desktop Left / Mobile Top: Founder Portrait & Credentials Card */}
            <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">

              {/* Dignified Editorial Portrait Frame */}
              <div className="relative rounded-2xl overflow-hidden border border-[#D8D5C8] shadow-soft-md bg-[#F3EFE6] p-2">
                <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden bg-[#D8D5C8]/30">
                  <Image
                    src="/founder-portrait.jpeg"
                    alt="Himanshu Thakur — Founder & Lead Mentor, Officium Supremum"
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    priority
                  />
                </div>
              </div>

              {/* Credentials & Certifications Panel */}
              <div className="p-6 rounded-2xl bg-[#F3EFE6] border border-[#D8D5C8] space-y-3 shadow-soft-sm">
                <div className="caption-3 uppercase tracking-wider text-[#34483C] font-semibold">
                  Verified Credentials &amp; Certifications
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  {founderCredentials.map((cred, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center px-3 py-1.5 rounded-lg bg-white border border-[#D8D5C8] text-xs text-[#252923] font-medium"
                    >
                      {cred}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Desktop Right / Mobile Bottom: Founder Story & 7-Item Timeline */}
            <div className="lg:col-span-7 space-y-8">

              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#34483C]/10 border border-[#34483C]/20 text-xs font-semibold uppercase tracking-wider text-[#34483C]">
                  Founder &amp; Lead Mentor
                </div>
                <h2 className="heading-2 text-[#252923]">
                  Meet Himanshu Thakur
                </h2>
                <p className="caption-2 uppercase tracking-wider text-[#B18A58] font-semibold">
                  B.S. Computer Science &amp; Data Analytics, IIT Patna · NCC &apos;C&apos; Certified
                </p>
              </div>

              {/* Founder Personal Quote */}
              <div className="p-6 rounded-2xl bg-[#F3EFE6] border-l-4 border-l-[#34483C] border border-[#D8D5C8] shadow-soft-sm">
                <p className="body-1 text-[#252923] leading-relaxed">
                  &ldquo;I started Officium Supremum because I have stood on both sides of the table: as a student who needed a clear daily plan, and as a mentor helping others build one.&rdquo;
                </p>
              </div>

              {/* 7-Item Founder Timeline */}
              <div className="space-y-6 pt-2">
                <div className="caption-3 uppercase tracking-wider text-[#B18A58] font-semibold">
                  Founder Journey &amp; Timeline
                </div>
                <div className="relative pl-6 sm:pl-8 border-l-2 border-[#D8D5C8] space-y-8">
                  {founderTimeline.map((item, idx) => (
                    <div key={idx} className="relative group">
                      <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full bg-white border-2 border-[#34483C] group-hover:bg-[#34483C] transition-colors" />
                      <h3 className="title-2 text-[#252923]">
                        {item.title}
                      </h3>
                      <p className="body-3 text-[#252923]/75 mt-1 leading-relaxed">
                        {item.description}
                      </p>
                      {item.title === "2021 · Where mentoring began" && siteConfig.founderPhotos.eachOneTeachOne.consent && (
                        <div className="mt-4 rounded-xl overflow-hidden border border-[#D8D5C8] shadow-soft-sm bg-[#F3EFE6] p-2 w-full max-w-[280px] sm:max-w-sm">
                          <Image
                            src="/journey-each-one-teach-one.jpeg"
                            alt="NCC cadet Himanshu Thakur teaching children under the Each One Teach One initiative."
                            width={1280}
                            height={960}
                            className="w-full max-w-full h-auto rounded-lg object-contain"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Founder CTAs & External Link */}
              <div className="pt-6 border-t border-[#D8D5C8] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <button
                  onClick={() => openOrientation("general")}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#34483C] hover:bg-[#252923] text-[#F3EFE6] button-sm uppercase tracking-wider transition-colors shadow-soft-sm"
                >
                  Book a free call with Himanshu
                </button>
                <a
                  href="https://himanshuthakur.online"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#252923]/70 hover:text-[#34483C] transition-colors inline-flex items-center gap-1.5 font-medium"
                >
                  <span>Software &amp; engineering work → himanshuthakur.online</span>
                  <ArrowSquareOut className="w-3.5 h-3.5" weight="bold" />
                </a>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. WHAT THIS MEANS FOR YOUR CHILD                                        */}
      {/* ========================================================================= */}
      <section className="py-20 lg:py-24 bg-[#F3EFE6] border-b border-[#D8D5C8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <div className="caption-3 uppercase tracking-widest text-[#B18A58] font-semibold">
              Our Approach in Practice
            </div>
            <h2 className="heading-2 text-[#252923]">
              What This Means for Your Child
            </h2>
            <p className="body-2 text-[#252923]/70 pt-1 text-pretty">
              Mentorship is not abstract lectures. It translates directly into structured study habits, emotional composure, and tangible academic follow-up every evening.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {childCards.map((card, idx) => (
              <div
                key={idx}
                className="p-7 rounded-2xl bg-white border border-[#D8D5C8] space-y-2.5 shadow-soft-sm hover:border-[#34483C] transition-all"
              >
                <h3 className="title-2 text-[#252923]">
                  {card.title}
                </h3>
                <p className="body-3 text-[#252923]/75 leading-relaxed">
                  {card.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. CORE INSTITUTIONAL PRINCIPLES                                         */}
      {/* ========================================================================= */}
      <section className="py-20 lg:py-24 bg-white border-b border-[#D8D5C8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <div className="caption-3 uppercase tracking-widest text-[#B18A58] font-semibold">
              Institutional Values
            </div>
            <h2 className="heading-2 text-[#252923]">
              The Principles We Teach By
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {corePrinciples.map((principle, idx) => {
              const IconComponent = principle.icon;
              return (
                <div
                  key={idx}
                  className="p-7 sm:p-8 rounded-2xl bg-[#F3EFE6] border border-[#D8D5C8] shadow-soft-sm space-y-3.5 hover:border-[#34483C] transition-all"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#34483C]/10 border border-[#34483C]/20 flex items-center justify-center text-[#34483C]">
                    <IconComponent className="w-5 h-5" weight="bold" />
                  </div>
                  <h3 className="title-2 text-[#252923]">
                    {principle.title}
                  </h3>
                  <p className="body-3 text-[#252923]/75 leading-relaxed">
                    {principle.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. CLOSING EDITORIAL BANNER (Forest Sage Canvas)                          */}
      {/* ========================================================================= */}
      <section className="py-20 lg:py-24 text-center bg-[#34483C] text-[#F3EFE6] relative">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-5">
          <h2 className="heading-2 text-[#F3EFE6] text-balance">
            Talk to an Academic Mentor
          </h2>
          <p className="body-2 text-[#F3EFE6]/80 max-w-lg mx-auto text-pretty">
            Schedule a free 20-minute call with our mentors to discuss your child&apos;s goals and receive a structured personal study roadmap.
          </p>
          <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => openOrientation("general")}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#F3EFE6] hover:bg-white text-[#252923] button-sm uppercase tracking-wider transition-colors shadow-soft-sm"
            >
              Book a Free 20-Minute Call
            </button>
            <Link
              href="/contact"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl border border-[#F3EFE6]/30 hover:border-[#F3EFE6] text-[#F3EFE6] button-sm uppercase tracking-wider transition-colors"
            >
              Direct Admissions Desk
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
