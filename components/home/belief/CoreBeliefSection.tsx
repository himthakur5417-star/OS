"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CoreBeliefSection() {
  return (
    <section
      id="core-belief"
      className="scroll-mt-28 sm:scroll-mt-36 pt-24 sm:pt-32 md:pt-36 pb-28 sm:pb-36 text-[#E8DCC6] relative overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 140% 60% at 50% 65%, rgba(255, 255, 255, 0.04) 0%, transparent 60%), linear-gradient(to bottom, #ECD9D3 0%, #DFC4BE 12%, #C79294 25%, #A75862 38%, #843740 50%, #722F37 60%, #722F37 76%, #853A43 85%, #A35C64 93%, #C18388 100%)",
      }}
      aria-label="Our Core Belief — Officium Supremum Manifesto"
    >
      {/* Subtle Warm Background Grain Texture for Editorial Depth */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(#E8DCC6 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 space-y-12 sm:space-y-16">

        {/* ========================================================================= */}
        {/* 1. EDITORIAL MANIFESTO: PHILOSOPHICAL HERO & INSTITUTIONAL CONTEXT        */}
        {/* ========================================================================= */}
        <div className="space-y-6 sm:space-y-8">
          {/* Eyebrow marker */}
          <div className="flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E8DCC6]" />
            <span className="eyebrow text-[#B7A89A] tracking-[0.25em] text-[11px] sm:text-xs">
              Our Core Belief
            </span>
          </div>

          {/* Manifesto Statement (Dominant Visual Hero — Preserved) */}
          <h2 className="font-heading font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-normal text-[#FAF7F2] leading-[1.14] tracking-tight max-w-4xl text-balance">
            &ldquo;Discipline cannot be taught through lectures alone &mdash;{" "}
            <span className="italic font-light text-[#E8DCC6]">
              it must be practiced every day.
            </span>&rdquo;
          </h2>

          {/* Preserved Explanatory Narrative: 2-Column Editorial Spread on Desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10 text-sm sm:text-base text-[#E8DCC6]/85 font-sans leading-relaxed">
            <p>
              In large coaching centres, students often get lost in crowded classrooms of hundreds. Teachers give lectures, but no one checks whether each student understood the concept or revised it the next day. By the time exams come near, students feel stressed and unprepared.
            </p>
            <p>
              Officium Supremum was started with one clear commitment: whether you are in school building study habits or preparing for the armed forces, real progress comes from simple, steady practices &mdash; a clear daily plan, honest evening progress checks, and regular mentor support.
            </p>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. DISCIPLINE FRAMEWORK: REFINED RHYTHM & COMPACT MOBILE FLOW             */}
        {/* ========================================================================= */}
        <div>
          <div className="pt-6 sm:pt-8 border-t border-[#E8DCC6]/15">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {/* Marker 01: Daily Plan */}
              <div className="space-y-1 sm:space-y-1.5">
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-[11px] sm:text-xs text-[#B7A89A] tracking-wider">01</span>
                  <span className="text-[#E8DCC6]/30 text-xs">·</span>
                  <h3 className="font-sans text-xs sm:text-sm font-semibold tracking-wider text-[#FAF7F2] uppercase">
                    Daily Plan
                  </h3>
                </div>
                <p className="text-xs sm:text-[13px] text-[#E8DCC6]/75 font-sans leading-normal sm:leading-relaxed">
                  A clear, structured study roadmap established each morning to eliminate hesitation and aimless effort.
                </p>
              </div>

              {/* Marker 02: Evening Accountability */}
              <div className="space-y-1 sm:space-y-1.5">
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-[11px] sm:text-xs text-[#B7A89A] tracking-wider">02</span>
                  <span className="text-[#E8DCC6]/30 text-xs">·</span>
                  <h3 className="font-sans text-xs sm:text-sm font-semibold tracking-wider text-[#FAF7F2] uppercase">
                    Evening Accountability
                  </h3>
                </div>
                <p className="text-xs sm:text-[13px] text-[#E8DCC6]/75 font-sans leading-normal sm:leading-relaxed">
                  Honest daily verification of concepts mastered, revision logged, and doubts addressed before the day closes.
                </p>
              </div>

              {/* Marker 03: Personal Review */}
              <div className="space-y-1 sm:space-y-1.5">
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-[11px] sm:text-xs text-[#B7A89A] tracking-wider">03</span>
                  <span className="text-[#E8DCC6]/30 text-xs">·</span>
                  <h3 className="font-sans text-xs sm:text-sm font-semibold tracking-wider text-[#FAF7F2] uppercase">
                    Personal Review
                  </h3>
                </div>
                <p className="text-xs sm:text-[13px] text-[#E8DCC6]/75 font-sans leading-normal sm:leading-relaxed">
                  Regular one-on-one mentor dialogue to diagnose obstacles, calibrate pacing, and maintain steady progress.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. FOUNDER PRESENTATION: COHESIVE EDITORIAL SIGNATURE                     */}
        {/* ========================================================================= */}
        <div>
          <div className="pt-8 sm:pt-10 border-t border-[#E8DCC6]/15 flex flex-col md:flex-row items-start gap-6 sm:gap-8 md:gap-10 lg:gap-12">

            {/* Dignified Editorial Portrait Frame (3:4 ratio, calm still frame) */}
            <div className="relative w-32 h-44 sm:w-36 sm:h-48 md:w-40 md:h-52 shrink-0 rounded-xl sm:rounded-2xl overflow-hidden border border-[#E8DCC6]/25 bg-[#211C1D] shadow-[0_8px_24px_-6px_rgba(33,28,29,0.5)]">
              <Image
                src="/founder-portrait.jpeg"
                alt="Himanshu Thakur — Founder of Officium Supremum"
                fill
                className="object-cover object-top"
                sizes="(max-width: 640px) 112px, (max-width: 768px) 144px, 160px"
              />
              <div
                className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-[#E8DCC6]/20 rounded-xl sm:rounded-2xl"
                aria-hidden="true"
              />
            </div>

            {/* Founder Quote, Attribution & Story Link in Cohesive Reading Flow */}
            <div className="space-y-4 text-left max-w-xl">
              <blockquote className="font-heading font-serif italic text-base sm:text-lg md:text-xl text-[#FAF7F2] leading-relaxed">
                &ldquo;I started Officium Supremum to ensure no sincere student feels left behind in a crowded room. We walk with you through every week of your preparation.&rdquo;
              </blockquote>

              <div className="space-y-2.5 pt-0.5">
                <div className="space-y-0.5">
                  <div className="font-serif text-base sm:text-lg font-medium text-[#FAF7F2] tracking-tight">
                    Himanshu Thakur
                  </div>
                  <div className="eyebrow text-[#B7A89A] text-[10px] sm:text-[11px] tracking-[0.16em]">
                    Founder &amp; Lead Mentor
                  </div>
                </div>

                <div className="pt-0.5">
                  <Link
                    href="/about#founder"
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-sans font-medium text-[#FAF7F2] hover:text-[#E8DCC6] transition-colors group underline underline-offset-4 decoration-[#E8DCC6]/40 hover:decoration-[#FAF7F2]"
                  >
                    <span>Read the complete founder story</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1 shrink-0" />
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
