"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/siteConfig";
import { useModals } from "@/components/ModalContext";
import { Shield, Target, Compass, Award, CheckCircle2, ArrowRight } from "lucide-react";

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

export default function AboutPage() {
  const { openOrientation } = useModals();

  return (
    <div className="bg-[#FAFAF9] text-[#0F172A] min-h-screen">
      {/* Hero */}
      <section className="relative pt-20 pb-20 lg:pt-28 lg:pb-24 border-b border-slate-200/60 bg-gradient-to-b from-white via-[#FAF7F2]/60 to-[#FAFAF9]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-slate-200/80 shadow-soft-sm text-xs font-label uppercase tracking-widest text-[#C8A84E]">
            <Compass className="w-3.5 h-3.5 text-[#C8A84E]" />
            <span>About Officium Supremum</span>
          </div>

          <h1 className="font-heading text-4xl sm:text-6xl font-semibold tracking-tight text-[#0B192C] leading-tight">
            We Build Strong Habits, Clear Thinking, <br />
            <span className="text-[#C8A84E]">and Confident Leaders.</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 font-sans leading-relaxed max-w-2xl mx-auto">
            Officium Supremum is not a crowded coaching institute. We are a personal mentorship academy that helps students build strong discipline, master their syllabus, and prepare with confidence for school, college, and defence exams.
          </p>
        </div>
      </section>

      {/* Founder Section */}
      <section id="founder" className="py-20 lg:py-28 border-b border-slate-200/60 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Desktop Left / Mobile Top: Founder Portrait */}
            <div className="lg:col-span-5 lg:sticky lg:top-28">
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200/80 shadow-soft-md bg-[#FAF7F2] p-2.5">
                <div className="relative aspect-[4/5] w-full rounded-xl sm:rounded-2xl overflow-hidden bg-slate-100">
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
            </div>

            {/* Desktop Right / Mobile Bottom: Founder Story & 7-Item Text Timeline */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50/80 border border-amber-200/60 text-xs font-label uppercase tracking-widest text-[#C8A84E] font-semibold">
                  Founder &amp; Lead Mentor
                </div>
                <h2 className="font-heading text-3xl sm:text-5xl font-semibold tracking-tight text-[#0B192C] leading-tight">
                  Meet Himanshu Thakur
                </h2>
                <p className="font-label text-xs sm:text-sm uppercase tracking-wider text-slate-500 font-medium">
                  B.S. Computer Science &amp; Data Analytics, IIT Patna · NCC &apos;C&apos; Certified 
                </p>
              </div>

              <div className="p-6 sm:p-7 rounded-2xl bg-[#FAF7F2] border-l-4 border-l-[#C8A84E] border border-slate-200/60 shadow-soft-sm">
                <p className="text-base sm:text-lg text-[#0B192C] font-heading italic leading-relaxed">
                  &ldquo;I started Officium Supremum because I have stood on both sides of the table: as a student who needed a clear daily plan, and as a mentor helping others build one.&rdquo;
                </p>
              </div>

              {/* 7-Item Founder Timeline */}
              <div className="space-y-6 pt-2">
                <div className="font-label text-xs uppercase tracking-[0.2em] text-slate-500 font-semibold">
                  Founder Journey &amp; Timeline
                </div>
                <div className="relative pl-6 sm:pl-8 border-l-2 border-slate-200 space-y-8">
                  {founderTimeline.map((item, idx) => (
                    <div key={idx} className="relative group">
                      <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full bg-white border-2 border-[#C8A84E] group-hover:bg-[#C8A84E] transition-colors" />
                      <h3 className="text-base sm:text-lg font-semibold text-[#0B192C] font-heading">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed font-sans">
                        {item.description}
                      </p>
                      {item.title === "2021 · Where mentoring began" && siteConfig.founderPhotos.eachOneTeachOne.consent && (
                        <div className="mt-4 rounded-xl sm:rounded-2xl overflow-hidden border border-slate-200/80 shadow-soft-sm bg-[#FAF7F2] p-2 max-w-sm sm:max-w-md">
                          <Image
                            src="/journey-each-one-teach-one.jpeg"
                            alt="NCC cadet Himanshu Thakur teaching children under the Each One Teach One initiative."
                            width={1280}
                            height={960}
                            className="w-full h-auto rounded-lg sm:rounded-xl object-contain"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* B. Credentials Chips */}
              <div className="space-y-3 pt-4 border-t border-slate-200/60">
                <div className="font-label text-xs uppercase tracking-[0.2em] text-slate-500 font-semibold">
                  Credentials &amp; Certifications
                </div>
                <div className="flex flex-wrap gap-2">
                  {founderCredentials.map((cred, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center px-3 py-1.5 rounded-lg bg-[#FAF7F2] border border-slate-200/80 text-xs text-slate-700 font-medium"
                    >
                      {cred}
                    </span>
                  ))}
                </div>
              </div>

              {/* A. What this means for your child */}
              <div className="space-y-4 pt-4 border-t border-slate-200/60">
                <h3 className="font-heading text-2xl font-semibold text-[#0B192C]">
                  What this means for your child
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {childCards.map((card, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-[#FAF7F2] border border-slate-200/80 space-y-2 shadow-soft-sm"
                    >
                      <h4 className="font-heading font-semibold text-base text-[#0B192C]">
                        {card.title}
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed font-sans">
                        {card.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* C. Personal website link & D. Founder CTA */}
              <div className="pt-4 border-t border-slate-200/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <button
                  onClick={() => openOrientation("general")}
                  className="px-8 py-4 rounded-xl bg-[#0B192C] hover:bg-[#1E293B] text-white font-label font-bold text-xs uppercase tracking-widest shadow-md hover:shadow-lg transition-all active:scale-95"
                >
                  Book a free call with Himanshu
                </button>
                <a
                  href="https://himanshuthakur.online"
                  target="_blank"
                  rel="noopener"
                  className="text-xs text-slate-500 hover:text-[#C8A84E] transition-colors font-sans"
                >
                  I also build AI and software products → himanshuthakur.online
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Principles */}
      <section className="py-24 border-b border-slate-200/60 bg-[#FAFAF9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-soft-sm space-y-4 hover:shadow-soft-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200/60 flex items-center justify-center text-[#C8A84E]">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-semibold text-xl text-[#0B192C]">Daily Action Over Endless Advice</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                Advice without daily action does not help. We focus our energy on practical daily habits, regular progress checks, and clearing doubts immediately.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-soft-sm space-y-4 hover:shadow-soft-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200/60 flex items-center justify-center text-sky-600">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-semibold text-xl text-[#0B192C]">High Standards &amp; Good Habits</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                Inspired by the daily discipline of India&apos;s defence academies: a regular morning routine, physical fitness, and staying calm under pressure.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-soft-sm space-y-4 hover:shadow-soft-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200/60 flex items-center justify-center text-emerald-600">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-semibold text-xl text-[#0B192C]">Remembering What You Study</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                We use quick self-quizzes and planned revisions so you remember formulas, vocabulary, and concepts long before examination day arrives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final Callout */}
      <section className="py-24 text-center bg-gradient-to-b from-[#FAFAF9] to-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-6">
          <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-[#0B192C]">
            Talk to an Academic Mentor
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-sans max-w-lg mx-auto">
            Schedule a free 20-minute call with our mentors to discuss your goals and receive a personalized study plan.
          </p>
          <div className="pt-2">
            <button
              onClick={() => openOrientation("general")}
              className="px-8 py-4 rounded-xl bg-[#0B192C] hover:bg-[#1E293B] text-white font-label font-bold text-xs uppercase tracking-widest shadow-md hover:shadow-lg transition-all active:scale-95"
            >
              Book a Free 20-Minute Call
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
