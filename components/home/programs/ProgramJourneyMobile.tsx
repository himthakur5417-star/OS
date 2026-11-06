"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";
import { PROGRAMS_DATA } from "./programData";

export function ProgramJourneyMobile() {
  return (
    <section
      id="programs"
      className="relative w-full bg-[#F3EFE6] text-[#252923] overflow-hidden py-16 px-6"
      aria-label="Officium Supremum Mentorship Tracks"
    >
      {/* Top Atmospheric Dissolve: Hero Charcoal (#252923) into Ivory Mist (#F3EFE6) */}
      <div
        className="absolute top-0 inset-x-0 h-24 pointer-events-none z-0"
        style={{
          background:
            "linear-gradient(to bottom, #252923 0%, rgba(37, 41, 35, 0.7) 35%, rgba(216, 213, 200, 0.4) 70%, #F3EFE6 100%)",
        }}
        aria-hidden="true"
      />

      {/* 1. Guiding Thread Entry from Hero */}
      <div className="flex flex-col items-center mb-8 relative z-10" aria-hidden="true">
        <div className="w-[1.5px] h-12 bg-gradient-to-b from-[#B18A58] to-[#34483C]" />
        <div className="w-3.5 h-3.5 rounded-full bg-[#34483C] border-2 border-[#F3EFE6] ring-1 ring-[#B18A58] shadow-sm my-1" />
        <div className="w-[1.5px] h-6 bg-[#34483C]/40" />
      </div>

      {/* 2. Editorial Origin Narrative */}
      <div className="text-center max-w-sm mx-auto mb-12 space-y-3 relative z-10">
        <h2 className="font-serif text-3xl sm:text-4xl text-[#252923] leading-tight font-semibold text-balance">
          Different Destinations. <br />
          <span className="font-serif italic font-normal text-[#34483C]">One Disciplined Origin.</span>
        </h2>
        <p className="body-4 text-[#252923]/75 leading-relaxed pt-1 text-pretty">
          Every student has a distinct ambition. But daily structure, individual guidance, and steady accountability form the common foundation.
        </p>
      </div>

      {/* 3. Pure Editorial Vertical Trajectory */}
      <div className="relative max-w-sm mx-auto pl-7 border-l-[1.5px] border-[#34483C] space-y-12 relative z-10">
        {PROGRAMS_DATA.map((prog) => (
          <div
            key={prog.id}
            id={`mobile-station-${prog.id}`}
            className="relative group pt-1"
          >
            {/* Sage Node & Horizontal Branch (●────) */}
            <div
              className="absolute -left-[35px] top-3 flex items-center pointer-events-none"
              aria-hidden="true"
            >
              {/* Sage Node (●) */}
              <div className="w-3.5 h-3.5 rounded-full bg-[#34483C] border-2 border-[#F3EFE6] ring-1 ring-[#B18A58] shadow-sm shrink-0" />
              {/* Short Horizontal Branch (────) */}
              <div className="w-6 h-[1.5px] bg-[#34483C]" />
            </div>

            {/* Editorial Content Card */}
            <div className="p-4 rounded-2xl bg-white/70 border border-[#252923]/8 space-y-2 text-left">
              {/* Class/Exam Range */}
              <div className="flex items-center gap-2">
                <span className="caption-3 font-semibold text-[#34483C] tracking-[0.2em] uppercase">
                  {prog.subtitle}
                </span>
                <span className="w-1 h-1 rounded-full bg-[#B18A58]" />
                <span className="caption-4 uppercase text-[#252923]/60">
                  {prog.badge}
                </span>
              </div>

              {/* Program Title */}
              <h3 className="heading-4 text-[#252923] font-semibold tracking-tight">
                {prog.title}
              </h3>

              {/* Description */}
              <p className="body-4 text-[#252923]/75 leading-relaxed text-pretty">
                {prog.copy}
              </p>

              {/* CTA Link */}
              <div className="pt-2">
                <Link
                  href={prog.href}
                  className="inline-flex items-center gap-1.5 button-sm text-[#34483C] hover:text-[#252923] uppercase tracking-wider font-semibold py-1"
                  aria-label={`${prog.ctaLabel} — View detailed track information`}
                >
                  <span>{prog.ctaLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" weight="bold" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
