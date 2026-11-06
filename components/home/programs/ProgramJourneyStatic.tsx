"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";
import { PROGRAMS_DATA } from "./programData";

export function ProgramJourneyStatic() {
  return (
    <section
      id="programs"
      className="relative w-full bg-[#F3EFE6] text-[#252923] py-20 px-6 sm:px-8 lg:px-12"
      aria-label="Officium Supremum Mentorship Tracks"
    >
      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#252923] leading-tight font-semibold text-balance">
            Different Destinations. <br />
            <span className="font-serif italic font-normal text-[#34483C]">One Disciplined Origin.</span>
          </h2>
          <p className="body-4 sm:body-2 text-[#252923]/75 max-w-xl mx-auto leading-relaxed text-pretty">
            Different students have different goals, but daily structure, individual guidance, and steady accountability form the common foundation.
          </p>
        </div>

        {/* Static 3-Track Editorial Trajectory */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 pt-4">
          {PROGRAMS_DATA.map((prog) => (
            <div
              key={prog.id}
              className="p-6 rounded-2xl bg-white border border-[#252923]/8 space-y-4 flex flex-col justify-between text-left shadow-[0_4px_16px_rgba(37,41,35,0.03)]"
            >
              <div className="flex items-center gap-2" aria-hidden="true">
                <div className="w-2.5 h-2.5 rounded-full bg-[#34483C]" />
                <div className="w-10 h-[1.5px] bg-[#34483C]" />
                <span className="caption-3 font-semibold text-[#34483C] tracking-[0.2em] uppercase">
                  {prog.subtitle}
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="heading-4 font-semibold text-[#252923] tracking-tight">
                  {prog.title}
                </h3>
                <p className="body-4 text-[#252923]/75 leading-relaxed text-pretty">
                  {prog.copy}
                </p>
              </div>

              <div className="pt-3 border-t border-[#D8D5C8]/60">
                <Link
                  href={prog.href}
                  className="inline-flex items-center gap-2 button-sm uppercase tracking-wider font-semibold text-[#34483C] hover:text-[#252923] transition-colors group"
                  aria-label={`${prog.ctaLabel} — View detailed track information`}
                >
                  <span>{prog.ctaLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" weight="bold" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
