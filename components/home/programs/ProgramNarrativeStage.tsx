"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";
import { PROGRAMS_DATA } from "./programData";

interface ProgramNarrativeStageProps {
  activeTrack: "juniors" | "scholars" | "defence" | null;
  onSelectTrack: (id: "juniors" | "scholars" | "defence") => void;
  headerOpacity: number;
  stageOpacity: number;
  isLightMode?: boolean;
}

export function ProgramNarrativeStage({
  activeTrack,
  onSelectTrack,
  headerOpacity,
  stageOpacity,
  isLightMode = true,
}: ProgramNarrativeStageProps) {
  return (
    <div className="relative z-20 w-full h-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center pt-24 pb-12 pointer-events-none select-none">
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">

        {/* Left Column: Arrival & Core Narrative (Col 1-4) */}
        <div
          className="lg:col-span-4 max-w-sm space-y-4 text-left transition-all duration-500 pointer-events-auto"
          style={{ opacity: headerOpacity }}
        >
          <h2
            className={`font-serif text-3xl sm:text-4xl md:text-5xl font-semibold transition-colors duration-500 leading-tight text-balance ${
              isLightMode ? "text-[#252923]" : "text-[#F3EFE6]"
            }`}
          >
            Different Destinations. <br />
            <span className={`font-serif italic font-normal ${isLightMode ? "text-[#34483C]" : "text-[#B18A58]"}`}>
              One Disciplined Origin.
            </span>
          </h2>

          <p
            className={`body-4 sm:body-2 transition-colors duration-500 leading-relaxed text-pretty ${
              isLightMode ? "text-[#252923]/75" : "text-[#D8D5C8]/85"
            }`}
          >
            Every student has a distinct ambition. But daily structure, individual guidance, and steady accountability form the common foundation.
          </p>
        </div>

        {/* Right Column: Three Spatial Program Stations (Col 6-12) */}
        <div
          className="lg:col-span-7 lg:col-start-6 flex flex-col justify-between space-y-6 lg:space-y-8 transition-opacity duration-500 pointer-events-auto"
          style={{ opacity: stageOpacity }}
        >
          {PROGRAMS_DATA.map((prog) => {
            const isActive = activeTrack === prog.id;

            return (
              <div
                key={prog.id}
                onClick={() => onSelectTrack(prog.id)}
                className={`relative flex flex-col justify-between p-4 sm:p-5 rounded-2xl transition-all duration-500 cursor-pointer text-left border ${
                  isActive
                    ? "bg-white/85 border-[#34483C]/25 shadow-[0_8px_24px_rgba(37,41,35,0.06)] scale-[1.02] opacity-100"
                    : "bg-white/35 hover:bg-white/60 border-[#D8D5C8]/60 scale-100 opacity-65 hover:opacity-90"
                }`}
              >
                {/* Subtitle / Class Range & Track Badge */}
                <div className="flex items-center gap-3 mb-1.5">
                  <span
                    className={`caption-3 font-semibold tracking-[0.2em] uppercase transition-colors duration-300 ${
                      isActive ? "text-[#34483C]" : "text-[#34483C]/75"
                    }`}
                  >
                    {prog.subtitle}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-[#B18A58]" />
                  <span className="caption-4 uppercase tracking-wider text-[#252923]/60">
                    {prog.badge}
                  </span>
                </div>

                {/* Program Title & CTA */}
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 mb-2">
                  <h3
                    className={`heading-4 sm:heading-3 tracking-tight transition-colors duration-300 ${
                      isActive ? "text-[#252923] font-semibold" : "text-[#252923]/70 font-medium"
                    }`}
                  >
                    {prog.title}
                  </h3>

                  <Link
                    href={prog.href}
                    className={`inline-flex items-center gap-1.5 button-sm uppercase tracking-wider transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#34483C] rounded-full px-3 py-1 ${
                      isActive
                        ? "text-[#34483C] bg-[#34483C]/8 hover:bg-[#34483C] hover:text-[#F3EFE6]"
                        : "text-[#34483C]/80 hover:text-[#34483C]"
                    }`}
                    aria-label={`${prog.ctaLabel} — View detailed track information`}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <span>{prog.ctaLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" weight="bold" />
                  </Link>
                </div>

                {/* Short Copy */}
                <p
                  className={`body-4 sm:body-2 leading-relaxed transition-colors duration-300 text-pretty ${
                    isActive ? "text-[#252923]/85 max-w-xl" : "text-[#252923]/60 max-w-md"
                  }`}
                >
                  {prog.copy}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
