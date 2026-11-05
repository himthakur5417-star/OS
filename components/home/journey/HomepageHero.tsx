"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { GuidingThread } from "./GuidingThread";
import { useElementSize } from "@/lib/hooks/useElementSize";
import { usePrefersReducedMotion } from "@/lib/hooks/useMediaQuery";
import { interpolate, easeInOutSine, easeOutCubic } from "@/lib/motion/interpolate";
import { MagneticButton } from "@/components/MagneticButton";

interface HomepageHeroProps {
  onBookCall: () => void;
}

export function HomepageHero({ onBookCall }: HomepageHeroProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const size = useElementSize(stageRef);
  const reducedMotion = usePrefersReducedMotion();

  const [progress, setProgress] = useState(0);

  // Track scroll position within the pinned journey container
  useEffect(() => {
    if (reducedMotion) return;

    let rafId: number | null = null;

    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        const container = containerRef.current;
        if (!container) return;

        const rect = container.getBoundingClientRect();
        const scrollDistance = rect.height - window.innerHeight;
        if (scrollDistance <= 0) {
          setProgress(0);
          return;
        }

        const currentScroll = -rect.top;
        const p = Math.max(0, Math.min(1, currentScroll / scrollDistance));
        setProgress(p);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [reducedMotion]);

  // Interpolated animation values based on scroll progress
  // State 1: p 0.0 - 0.2: Headline prominent
  // State 2: p 0.2 - 0.45: Headline gently recedes, student wanders
  // State 3: p 0.45 - 0.70: "Guidance gives direction."
  // State 4: p 0.70 - 0.95: "Discipline creates independence."
  const heroOpacity = reducedMotion ? 1 : interpolate(progress, [0, 0.22, 0.42], [1, 0.9, 0], easeOutCubic);
  const heroTranslateY = reducedMotion ? 0 : interpolate(progress, [0, 0.35], [0, -40]);
  const heroScale = reducedMotion ? 1 : interpolate(progress, [0, 0.35], [1, 0.97]);

  const statement1Opacity = reducedMotion
    ? 1
    : interpolate(progress, [0.28, 0.40, 0.58, 0.66], [0, 1, 1, 0], easeInOutSine);
  const statement1TranslateY = reducedMotion
    ? 0
    : interpolate(progress, [0.28, 0.40, 0.58, 0.66], [25, 0, 0, -20]);

  const statement2Opacity = reducedMotion
    ? 1
    : interpolate(progress, [0.62, 0.74, 0.95, 1.0], [0, 1, 1, 0.75], easeInOutSine);
  const statement2TranslateY = reducedMotion
    ? 0
    : interpolate(progress, [0.62, 0.74, 1.0], [25, 0, -10]);

  const scrollCueOpacity = reducedMotion ? 0 : interpolate(progress, [0, 0.08], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="journey relative bg-[#211C1D] text-[#E8DCC6] overflow-x-clip"
      aria-label="Officium Supremum Mentorship Journey"
    >
      {/* Sticky Cinematic Stage */}
      <div
        ref={stageRef}
        className="journey-stage w-full flex flex-col justify-between"
      >
        {/* Subtle Ambient Vignette & Warm Burgundy Glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 75% 45%, rgba(114, 47, 55, 0.28) 0%, rgba(33, 28, 29, 0.85) 65%, #211C1D 100%)",
          }}
        />

        {/* The Guiding Thread SVG Rendering Layer */}
        {size && (
          <GuidingThread
            progress={progress}
            width={size.width}
            height={size.height}
            reducedMotion={reducedMotion}
          />
        )}

        {/* Primary Hero Scene (State 1: Headline & Core Identity) */}
        <div
          className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-4 sm:pt-6 lg:pt-6 flex-1 flex flex-col justify-center"
          style={{
            opacity: heroOpacity,
            transform: `translateY(${heroTranslateY}px) scale(${heroScale})`,
            pointerEvents: progress > 0.35 && !reducedMotion ? "none" : "auto",
            transition: reducedMotion ? "none" : undefined,
          }}
        >
          <div className="max-w-3xl space-y-3 sm:space-y-3.5 lg:space-y-4">
            {/* Small Uppercase Brand Eyebrow */}
            <div className="inline-flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#722F37]" />
              <span className="eyebrow text-[#B7A89A] tracking-[0.25em] text-[11px] sm:text-xs font-semibold uppercase">
                OFFICIUM SUPREMUM
              </span>
            </div>

            {/* Core Brand Headline: DISCIPLINE CREATES EXCELLENCE. */}
            <h1 className="type-display !text-[clamp(2.75rem,7.2vw,5.5rem)] text-[#E8DCC6] font-normal leading-[0.92] tracking-tight">
              DISCIPLINE
              <br />
              CREATES
              <br />
              <span className="text-[#E8DCC6] italic font-light">EXCELLENCE.</span>
            </h1>

            {/* Subtitle in Plain, Confident Indian English */}
            <p className="type-lead text-[#B7A89A] max-w-xl leading-relaxed font-sans text-sm sm:text-base">
              We guide school students and defence aspirants with a daily study plan,
              evening progress checks, and personalized mentorship — turning talent into consistency.
            </p>

            {/* Hero CTAs */}
            <div className="pt-1 sm:pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 max-w-md sm:max-w-none">
              {/* Primary Signature CTA — Unified Burgundy Raised Object */}
              <MagneticButton
                variant="burgundy"
                href="#programs"
                ariaLabel="Explore Programs — View Juniors, Scholars, and Defence mentorship tracks"
              >
                <span>EXPLORE PROGRAMS</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </MagneticButton>

              {/* Secondary Action — Unified Warm Cream Raised Button */}
              <MagneticButton
                variant="cream"
                onClick={onBookCall}
                ariaLabel="Book a Free 20-Minute Call with an advisor"
              >
                <span>Book a Free 20-Minute Call</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </MagneticButton>
            </div>
          </div>
        </div>

        {/* Mid-Scroll Narrative Statements (States 3 & 4) */}
        {!reducedMotion && (
          <div
            className="journey-statements absolute inset-0 pointer-events-none flex items-center justify-start z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12"
            aria-hidden="true"
          >
            {/* Statement 1: State 3 - Guidance Appears */}
            <div
              className="journey-statement absolute max-w-xl space-y-3"
              style={{
                opacity: statement1Opacity,
                transform: `translateY(${statement1TranslateY}px)`,
                pointerEvents: statement1Opacity > 0.5 ? "auto" : "none",
              }}
            >
              <div className="eyebrow text-[#B7A89A] tracking-[0.2em] text-[11px]">
                The First Realization
              </div>
              <h2 className="type-h1 text-[#E8DCC6] leading-tight">
                Guidance gives <br />
                <span className="italic font-light text-[#E8DCC6]">direction.</span>
              </h2>
              <p className="type-lead text-[#B7A89A] max-w-md font-sans text-sm sm:text-base">
                When options feel overwhelming, a personal mentor brings structure: what to study today, how to practice, and where to focus.
              </p>
            </div>

            {/* Statement 2: State 4 - Direction & Discipline */}
            <div
              className="journey-statement absolute max-w-xl space-y-3"
              style={{
                opacity: statement2Opacity,
                transform: `translateY(${statement2TranslateY}px)`,
                pointerEvents: statement2Opacity > 0.5 ? "auto" : "none",
              }}
            >
              <div className="eyebrow text-[#B7A89A] tracking-[0.2em] text-[11px]">
                The Transformation
              </div>
              <h2 className="type-h1 text-[#E8DCC6] leading-tight">
                Discipline creates <br />
                <span className="italic font-light text-[#E8DCC6]">independence.</span>
              </h2>
              <p className="type-lead text-[#B7A89A] max-w-md font-sans text-sm sm:text-base">
                With steady daily routines and evening accountability, the student gradually stops depending on reminders and moves forward on their own.
              </p>
            </div>
          </div>
        )}

        {/* Bottom Scroll Cue */}
        <div
          className="journey-cue relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-8 flex items-center justify-between text-[#B7A89A] text-xs font-sans"
          style={{ opacity: scrollCueOpacity }}
        >
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#722F37]" />
            <span className="eyebrow text-[10px] sm:text-[11px] text-[#B7A89A]">
              Scroll to begin the journey
            </span>
          </div>

          <div className="flex items-center gap-1.5 opacity-70 animate-bounce">
            <span className="text-[10px] uppercase tracking-widest hidden sm:inline">Explore</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Transition gradient at stage bottom to blend smoothly into the next reading section */}
        <div
          className="journey-fade-to-cream absolute bottom-0 left-0 right-0 h-28 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, transparent, rgba(33, 28, 29, 0.95))",
          }}
        />
      </div>
    </section>
  );
}
