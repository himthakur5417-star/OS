"use client";

import React, { useRef } from "react";
import { usePrefersReducedMotion } from "@/lib/hooks/useMediaQuery";

interface PeacefulSloganMomentProps {
  hindiText: string;
  subText?: string;
  tagline?: string;
  variant?: "ivory" | "stone" | "sage";
}

/**
 * PeacefulSloganMoment
 *
 * Dedicated visual pauses with generous whitespace, authentic Devanagari
 * typography, and quiet institutional elegance.
 * Strictly avoids religious symbolism and focuses on discipline, character,
 * and quiet inner resolve.
 */
export function PeacefulSloganMoment({
  hindiText,
  subText,
  tagline,
  variant = "ivory",
}: PeacefulSloganMomentProps) {
  const reducedMotion = usePrefersReducedMotion();

  const isSage = variant === "sage";
  const isStone = variant === "stone";

  const bgClass = isSage
    ? "bg-[#34483C] text-[#F3EFE6]"
    : isStone
    ? "bg-[#D8D5C8]/40 text-[#252923]"
    : "bg-[#F3EFE6] text-[#252923]";

  const textColor = isSage ? "text-[#F3EFE6]" : "text-[#252923]";
  const accentColor = isSage ? "text-[#B18A58]" : "text-[#34483C]";
  const subtextColor = isSage ? "text-[#F3EFE6]/75" : "text-[#252923]/70";
  const borderColor = isSage ? "border-[#F3EFE6]/10" : "border-[#D8D5C8]";

  return (
    <div
      className={`py-16 sm:py-24 md:py-28 relative overflow-hidden transition-colors ${bgClass} border-y ${borderColor}`}
      role="region"
      aria-label="Thoughtful Reflection"
    >
      {/* Subtle atmospheric contour background for natural landscape feel */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, #34483C 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center relative z-10 space-y-4 sm:space-y-6">
        {tagline && (
          <div className="inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B18A58]" />
            <span className="caption-3 uppercase tracking-[0.25em] text-[#B18A58]">
              {tagline}
            </span>
          </div>
        )}

        {/* Large Authentic Devanagari Typography */}
        <p
          className={`font-hindi text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-normal leading-relaxed sm:leading-snug tracking-normal ${textColor} text-balance`}
        >
          {hindiText}
        </p>

        {/* Small subtle Antique Sand bar */}
        <div className="flex items-center justify-center gap-2 pt-1 pb-1">
          <span className="w-8 h-[1px] bg-[#B18A58]/40" />
          <span className="w-1 h-1 rounded-full bg-[#B18A58]" />
          <span className="w-8 h-[1px] bg-[#B18A58]/40" />
        </div>

        {subText && (
          <p className={`body-4 sm:body-2 ${subtextColor} max-w-lg mx-auto`}>
            {subText}
          </p>
        )}
      </div>
    </div>
  );
}

