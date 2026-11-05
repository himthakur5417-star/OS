"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PROGRAMS_DATA } from "./programData";

export function ProgramJourneyMobile() {
  return (
    <section
      id="programs"
      className="relative w-full bg-[#FAF7F2] text-[#211C1D] overflow-hidden py-16 px-6"
      aria-label="Officium Supremum Mentorship Tracks"
    >
      {/* Top Atmospheric Dissolve: Hero Near Black (#211C1D) warmly releasing into Warm Cream (#FAF7F2) */}
      <div
        className="absolute top-0 inset-x-0 h-24 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse 180% 100% at 50% 0%, rgba(52, 41, 43, 0.4) 0%, rgba(156, 133, 120, 0.15) 55%, transparent 100%), linear-gradient(to bottom, #211C1D 0%, #34292B 18%, #5C4745 42%, #9C8578 65%, #D5C4B4 85%, #FAF7F2 100%)",
        }}
        aria-hidden="true"
      />

      {/* 1. Guiding Thread Entry from Hero */}
      <div className="flex flex-col items-center mb-8 relative z-10" aria-hidden="true">
        <div className="w-[1.5px] h-12 bg-gradient-to-b from-[#722F37] to-[#722F37]/50" />
        <div className="w-3.5 h-3.5 rounded-full bg-[#722F37] border-2 border-[#FAF7F2] ring-1 ring-[#722F37]/40 shadow-sm my-1" />
        <div className="w-[1.5px] h-6 bg-[#722F37]/30" />
      </div>

      {/* 2. Editorial Origin Narrative */}
      <div className="text-center max-w-sm mx-auto mb-14 space-y-2.5">
        <div className="inline-flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#722F37]" />
          <span className="eyebrow text-[#722F37] tracking-[0.2em] text-[11px] font-semibold">
            Three Paths. One Foundation.
          </span>
        </div>
        <h2 className="type-h2 text-3xl font-serif text-[#211C1D] leading-tight font-normal">
          Different Destinations. <br />
          <span className="italic font-light">One Disciplined Origin.</span>
        </h2>
        <p className="type-lead text-xs text-[#211C1D]/75 font-sans leading-relaxed pt-1">
          Every student has a distinct ambition. But daily structure, individual guidance, and steady accountability form the common foundation.
        </p>
      </div>

      {/* 3. Pure Editorial Vertical Trajectory (No Cards) */}
      <div className="relative max-w-sm mx-auto pl-7 border-l-[1.5px] border-[#722F37] space-y-14">
        {PROGRAMS_DATA.map((prog) => (
          <div
            key={prog.id}
            id={`mobile-station-${prog.id}`}
            className="relative group pt-1"
          >
            {/* Burgundy Node & Horizontal Branch (●────) */}
            <div
              className="absolute -left-[35px] top-3 flex items-center pointer-events-none"
              aria-hidden="true"
            >
              {/* Burgundy Node (●) */}
              <div className="w-3.5 h-3.5 rounded-full bg-[#722F37] border-2 border-[#FAF7F2] ring-1 ring-[#722F37] shadow-sm flex-shrink-0" />
              {/* Short Horizontal Branch (────) */}
              <div className="w-6 h-[1.5px] bg-[#722F37]" />
            </div>

            {/* Editorial Content (NO enclosing card, NO box, NO shadow) */}
            <div className="space-y-1.5 pl-2 text-left">
              {/* Small Burgundy Uppercase Class/Exam Range */}
              <div className="flex items-center gap-2">
                <span className="eyebrow text-[11px] font-semibold text-[#722F37] tracking-[0.2em] uppercase">
                  {prog.subtitle}
                </span>
                <span className="w-1 h-1 rounded-full bg-[#B7A89A]" />
                <span className="text-[10px] uppercase font-sans text-[#B7A89A] tracking-wider">
                  {prog.badge}
                </span>
              </div>

              {/* Large Fraunces Serif Program Title */}
              <h3 className="font-serif text-3xl font-normal text-[#211C1D] tracking-tight">
                {prog.title}
              </h3>

              {/* Short Description */}
              <p className="font-sans text-xs sm:text-sm text-[#211C1D]/75 leading-relaxed pt-1 max-w-xs">
                {prog.copy}
              </p>

              {/* Thin Understated Separator */}
              <div className="w-12 h-[1px] bg-[#722F37]/25 my-3" />

              {/* Burgundy Text CTA */}
              <div className="pt-1">
                <Link
                  href={prog.href}
                  className="inline-flex items-center gap-1.5 font-sans text-xs uppercase tracking-wider font-semibold text-[#722F37] hover:text-[#211C1D] active:text-[#211C1D] group py-1"
                  aria-label={`${prog.ctaLabel} — View detailed track information`}
                >
                  <span>{prog.ctaLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 4. Guiding Thread Continuation */}
      <div className="flex flex-col items-center mt-12" aria-hidden="true">
        <div className="w-[1.5px] h-10 bg-gradient-to-b from-[#722F37] to-transparent" />
      </div>
    </section>
  );
}
