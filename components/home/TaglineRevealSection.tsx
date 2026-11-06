"use client";

import React, { useRef, useState, useEffect } from "react";
import { usePrefersReducedMotion } from "@/lib/hooks/useMediaQuery";

/**
 * TaglineRevealSection
 *
 * "Guidance gives direction. Discipline creates independence."
 *
 * Implements word-by-word scroll reveal:
 * - Each word transitions from ~28% opacity to 100% full Charcoal tone.
 * - Easing uses cubic-bezier(0.22, 1, 0.36, 1).
 * - Expressive typography in Cormorant Garamond with selective italic emphasis.
 * - Under prefers-reduced-motion: text renders in full color immediately.
 */
export function TaglineRevealSection() {
  const containerRef = useRef<HTMLElement | null>(null);
  const reducedMotion = usePrefersReducedMotion();
  const [activeWordIndex, setActiveWordIndex] = useState(-1);

  const words = [
    { text: "Guidance", italic: false },
    { text: "gives", italic: false },
    { text: "direction.", italic: true },
    { text: "Discipline", italic: false },
    { text: "creates", italic: false },
    { text: "independence.", italic: true },
  ];

  const totalWords = words.length;

  useEffect(() => {
    if (reducedMotion) {
      setActiveWordIndex(totalWords);
      return;
    }

    let rafId: number | null = null;

    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        const el = containerRef.current;
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // When container enters viewport from 85% to 25%
        const enterPoint = windowHeight * 0.85;
        const exitPoint = windowHeight * 0.25;
        const totalDistance = enterPoint - exitPoint;

        const currentProgress = (enterPoint - rect.top) / totalDistance;
        const clampedProgress = Math.max(0, Math.min(1, currentProgress));

        const targetWord = Math.floor(clampedProgress * (totalWords + 1));
        setActiveWordIndex(targetWord);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [reducedMotion, totalWords]);

  return (
    <section
      ref={containerRef}
      className="py-24 sm:py-32 md:py-36 bg-[#F3EFE6] text-[#252923] relative overflow-hidden"
      aria-label="Brand Philosophy"
    >
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center space-y-8 sm:space-y-10">
        {/* Primary English Tagline Statement in Cormorant Garamond */}
        <h2 className="heading-2 sm:heading-1 text-[#252923] max-w-3xl mx-auto leading-[1.15]">
          {words.slice(0, 3).map((item, idx) => {
            const isLit = reducedMotion || idx <= activeWordIndex;
            return (
              <span
                key={`line1-${idx}`}
                className={`inline-block mx-1.5 sm:mx-2.5 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  item.italic ? "italic text-[#34483C] font-normal" : ""
                }`}
                style={{
                  color: isLit ? (item.italic ? "#34483C" : "#252923") : "rgba(37, 41, 35, 0.28)",
                  transform: isLit ? "translateY(0)" : "translateY(3px)",
                }}
              >
                {item.text}
              </span>
            );
          })}
          <br className="hidden sm:inline" />
          {words.slice(3).map((item, idx) => {
            const overallIdx = 3 + idx;
            const isLit = reducedMotion || overallIdx <= activeWordIndex;
            return (
              <span
                key={`line2-${idx}`}
                className={`inline-block mx-1.5 sm:mx-2.5 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  item.italic ? "italic text-[#B18A58] font-normal" : ""
                }`}
                style={{
                  color: isLit ? (item.italic ? "#B18A58" : "#252923") : "rgba(37, 41, 35, 0.28)",
                  transform: isLit ? "translateY(0)" : "translateY(3px)",
                }}
              >
                {item.text}
              </span>
            );
          })}
        </h2>

        {/* Supporting philosophy paragraph */}
        <p className="body-2 sm:body-1 text-[#252923]/75 max-w-xl mx-auto leading-relaxed font-sans text-pretty">
          True education does not create perpetual dependency on coaching centres. It builds individual character, steady habits, and lifelong self reliance.
        </p>
      </div>
    </section>
  );
}
