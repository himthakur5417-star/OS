"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";

export function CoreBeliefSection() {
  return (
    <section
      id="core-belief"
      className="scroll-mt-28 sm:scroll-mt-36 pt-24 sm:pt-32 md:pt-36 pb-28 sm:pb-36 bg-[#34483C] text-[#F3EFE6] relative overflow-hidden"
      aria-label="Our Core Belief — Officium Supremum Manifesto"
    >
      {/* Subtle Institutional Grain Texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(#F3EFE6 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 space-y-14 sm:space-y-18">

        {/* ========================================================================= */}
        {/* 1. EDITORIAL MANIFESTO                                                    */}
        {/* ========================================================================= */}
        <div className="space-y-6 sm:space-y-8">
          <h2 className="heading-3 sm:heading-2 md:heading-1 font-semibold text-[#F3EFE6] leading-[1.12] tracking-tight max-w-4xl text-balance">
            &ldquo;Discipline cannot be taught through lectures alone &mdash;{" "}
            <span className="text-[#B18A58] italic font-normal">
              it must be practiced every day.
            </span>&rdquo;
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 body-3 sm:body-2 text-[#D8D5C8] leading-relaxed text-pretty font-sans">
            <p>
              In large coaching centres, students often get lost in crowded classrooms of hundreds. Teachers give lectures, but no one checks whether each student understood the concept or revised it the next day. By the time exams come near, students feel stressed and unprepared.
            </p>
            <p>
              Officium Supremum was started with one clear commitment: whether you are in school building study habits or preparing for the armed forces, real progress comes from simple, steady practices &mdash; a clear daily plan, honest evening progress checks, and regular mentor support.
            </p>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. DISCIPLINE FRAMEWORK                                                   */}
        {/* ========================================================================= */}
        <div className="pt-8 border-t border-[#F3EFE6]/15">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* Marker 01: Daily Plan */}
            <div className="space-y-2 p-5 rounded-2xl bg-white/[0.04] border border-white/10">
              <div className="flex items-baseline gap-2">
                <span className="caption-3 text-[#B18A58] tracking-wider font-semibold">01</span>
                <span className="text-[#D8D5C8]/40">·</span>
                <h3 className="caption-1 font-semibold tracking-wider text-[#F3EFE6] uppercase">
                  Daily Plan
                </h3>
              </div>
              <p className="caption-2 text-[#D8D5C8]/80 leading-relaxed">
                A clear, structured study roadmap established each morning to eliminate hesitation and aimless effort.
              </p>
            </div>

            {/* Marker 02: Evening Accountability */}
            <div className="space-y-2 p-5 rounded-2xl bg-white/[0.04] border border-white/10">
              <div className="flex items-baseline gap-2">
                <span className="caption-3 text-[#B18A58] tracking-wider font-semibold">02</span>
                <span className="text-[#D8D5C8]/40">·</span>
                <h3 className="caption-1 font-semibold tracking-wider text-[#F3EFE6] uppercase">
                  Evening Accountability
                </h3>
              </div>
              <p className="caption-2 text-[#D8D5C8]/80 leading-relaxed">
                Honest daily verification of concepts mastered, revision logged, and doubts addressed before the day closes.
              </p>
            </div>

            {/* Marker 03: Personal Review */}
            <div className="space-y-2 p-5 rounded-2xl bg-white/[0.04] border border-white/10">
              <div className="flex items-baseline gap-2">
                <span className="caption-3 text-[#B18A58] tracking-wider font-semibold">03</span>
                <span className="text-[#D8D5C8]/40">·</span>
                <h3 className="caption-1 font-semibold tracking-wider text-[#F3EFE6] uppercase">
                  Personal Review
                </h3>
              </div>
              <p className="caption-2 text-[#D8D5C8]/80 leading-relaxed">
                Regular one-on-one mentor dialogue to diagnose obstacles, calibrate pacing, and maintain steady progress.
              </p>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. FOUNDER PRESENTATION: HIMANSHU THAKUR                                  */}
        {/* ========================================================================= */}
        <div className="pt-8 sm:pt-10 border-t border-[#F3EFE6]/15 flex flex-col md:flex-row items-start gap-6 sm:gap-8 md:gap-10 lg:gap-12">
          {/* Verified Editorial Portrait Frame (3:4 ratio) */}
          <div className="relative w-32 h-44 sm:w-36 sm:h-48 md:w-40 md:h-52 shrink-0 rounded-2xl overflow-hidden border border-[#B18A58]/30 bg-[#252923] shadow-lg">
            <Image
              src="/founder-portrait.jpeg"
              alt="Himanshu Thakur — Founder of Officium Supremum"
              fill
              className="object-cover object-top"
              sizes="(max-width: 640px) 128px, (max-width: 768px) 144px, 160px"
            />
            <div
              className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-[#F3EFE6]/15 rounded-2xl"
              aria-hidden="true"
            />
          </div>

          {/* Founder Quote & Verified Background */}
          <div className="space-y-4 text-left max-w-xl">
            <blockquote className="body-1 sm:title-1 font-normal text-[#F3EFE6] leading-relaxed text-pretty">
              &ldquo;I started Officium Supremum to ensure no sincere student feels left behind in a crowded room. We walk with you through every week of your preparation.&rdquo;
            </blockquote>

            <div className="space-y-2 pt-1">
              <div className="space-y-0.5">
                <div className="title-2 font-semibold text-[#F3EFE6] tracking-tight">
                  Himanshu Thakur
                </div>
                <div className="caption-3 uppercase tracking-[0.16em] text-[#B18A58]">
                  Founder &amp; Lead Mentor
                </div>
              </div>

              <div className="pt-1">
                <Link
                  href="/about#founder"
                  className="inline-flex items-center gap-1.5 caption-1 font-medium text-[#D8D5C8] hover:text-[#F3EFE6] transition-colors group underline underline-offset-4 decoration-[#B18A58]/50 hover:decoration-[#F3EFE6]"
                >
                  <span>Read the complete founder story</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1 shrink-0" weight="bold" />
                </Link>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
