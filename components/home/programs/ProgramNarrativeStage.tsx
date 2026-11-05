"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
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
    <div className="relative z-20 w-full h-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center pt-20 pb-8 pointer-events-none select-none">
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

        {/* Left Column: Arrival & Core Narrative (Col 1-4) */}
        <div
          className="lg:col-span-4 max-w-sm space-y-4 text-left transition-all duration-500 pointer-events-auto"
          style={{ opacity: headerOpacity }}
        >
          <div className="inline-flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full transition-colors ${
                isLightMode ? "bg-[#722F37]" : "bg-[#E8DCC6]"
              }`}
            />
            <span
              className={`eyebrow tracking-[0.22em] text-[11px] sm:text-xs font-semibold transition-colors ${
                isLightMode ? "text-[#722F37]" : "text-[#B7A89A]"
              }`}
            >
              Three Paths. One Foundation.
            </span>
          </div>

          <h2
            className={`type-h2 leading-[1.08] font-serif text-3xl sm:text-4xl transition-colors duration-500 ${
              isLightMode ? "text-[#211C1D]" : "text-[#E8DCC6]"
            }`}
          >
            Different Destinations. <br />
            <span className="italic font-light">One Disciplined Origin.</span>
          </h2>

          <p
            className={`type-lead font-sans text-xs sm:text-sm transition-colors duration-500 leading-relaxed ${
              isLightMode ? "text-[#211C1D]/75" : "text-[#B7A89A]"
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
                className={`relative flex flex-col justify-between py-2 px-1 transition-all duration-500 cursor-pointer text-left ${
                  isActive
                    ? "scale-[1.02] opacity-100"
                    : "scale-100 opacity-55 hover:opacity-85"
                }`}
              >
                {/* Subtle localized illumination behind active station */}
                {isActive && (
                  <div
                    aria-hidden="true"
                    className="absolute -inset-x-4 -inset-y-3 -z-10 rounded-2xl bg-gradient-to-r from-white/70 via-white/35 to-transparent pointer-events-none transition-opacity duration-500"
                  />
                )}

                {/* Subtitle / Class Range & Track Badge */}
                <div className="flex items-center gap-3 mb-1.5">
                  <span
                    className={`eyebrow text-xs font-semibold tracking-[0.2em] uppercase transition-colors duration-300 ${
                      isActive ? "text-[#722F37]" : "text-[#722F37]/75"
                    }`}
                  >
                    {prog.subtitle}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-[#B7A89A]/60" />
                  <span
                    className={`text-[10px] uppercase font-sans tracking-wider transition-colors duration-300 ${
                      isActive ? "text-[#B7A89A]" : "text-[#B7A89A]/80"
                    }`}
                  >
                    {prog.badge}
                  </span>
                </div>

                {/* Program Title & CTA */}
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 mb-2">
                  <h3
                    className={`font-serif tracking-tight text-3xl sm:text-4xl transition-colors duration-300 ${
                      isActive
                        ? "text-[#211C1D] font-normal"
                        : "text-[#211C1D]/60 font-light"
                    }`}
                  >
                    {prog.title}
                  </h3>

                  <Link
                    href={prog.href}
                    className={`inline-flex items-center gap-1.5 font-sans text-xs uppercase tracking-wider font-semibold transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#722F37] rounded-sm py-1 ${
                      isActive
                        ? "text-[#722F37] hover:text-[#211C1D]"
                        : "text-[#722F37]/70 hover:text-[#722F37]"
                    }`}
                    aria-label={`${prog.ctaLabel} — View detailed track information`}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <span>{prog.ctaLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>

                {/* Short Copy */}
                <p
                  className={`font-sans text-xs sm:text-sm leading-relaxed transition-colors duration-300 ${
                    isActive
                      ? "text-[#211C1D]/80 max-w-xl"
                      : "text-[#211C1D]/55 max-w-md"
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
