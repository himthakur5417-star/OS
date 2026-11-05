"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PROGRAMS_DATA } from "./programData";

export function ProgramJourneyStatic() {
  return (
    <section
      id="programs"
      className="relative w-full bg-[#FAF7F2] text-[#211C1D] py-20 px-6 sm:px-8 lg:px-12"
      aria-label="Officium Supremum Mentorship Tracks"
    >
      {/* Top Atmospheric Dissolve: Hero Near Black (#211C1D) softly releasing into Warm Cream (#FAF7F2) */}
      <div
        className="absolute top-0 inset-x-0 h-32 pointer-events-none z-0"
        style={{
          background:
            "linear-gradient(to bottom, #211C1D 0%, #382E30 35%, rgba(183, 168, 154, 0.35) 70%, transparent 100%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute top-0 inset-x-0 h-36 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse 135% 75% at 50% 0%, rgba(33, 28, 29, 0.8) 0%, transparent 85%)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#722F37]" />
            <span className="eyebrow text-[#722F37] tracking-[0.2em] text-xs font-semibold">
              Three Paths. One Foundation.
            </span>
          </div>
          <h2 className="type-h2 text-[#211C1D] leading-tight font-serif text-3xl sm:text-4xl font-normal">
            Different Destinations. <br />
            <span className="italic font-light">One Disciplined Origin.</span>
          </h2>
          <p className="type-lead text-sm sm:text-base text-[#211C1D]/75 font-sans max-w-xl mx-auto leading-relaxed">
            Different students have different goals, but daily structure, individual guidance, and steady accountability form the common foundation.
          </p>
        </div>

        {/* Static 3-Track Editorial Trajectory (No Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12 pt-4">
          {PROGRAMS_DATA.map((prog) => (
            <div
              key={prog.id}
              className="relative space-y-4 flex flex-col justify-between text-left"
            >
              {/* Burgundy Trajectory Lead-in */}
              <div className="flex items-center gap-2" aria-hidden="true">
                <div className="w-2.5 h-2.5 rounded-full bg-[#722F37]" />
                <div className="w-10 h-[1.5px] bg-[#722F37]" />
                <span className="eyebrow text-[11px] font-semibold text-[#722F37] tracking-[0.2em] uppercase">
                  {prog.subtitle}
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="font-serif text-3xl font-normal text-[#211C1D] tracking-tight">
                  {prog.title}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#211C1D]/75 leading-relaxed">
                  {prog.copy}
                </p>
              </div>

              <div className="pt-3 border-t border-[#722F37]/20">
                <Link
                  href={prog.href}
                  className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-wider font-semibold text-[#722F37] hover:text-[#211C1D] transition-colors group"
                  aria-label={`${prog.ctaLabel} — View detailed track information`}
                >
                  <span>{prog.ctaLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
