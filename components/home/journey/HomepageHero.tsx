"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, CaretDown } from "@phosphor-icons/react";
import { GuidingThread } from "./GuidingThread";
import { useElementSize } from "@/lib/hooks/useElementSize";
import { usePrefersReducedMotion } from "@/lib/hooks/useMediaQuery";
import { interpolate, easeInOutSine, easeOutCubic } from "@/lib/motion/interpolate";
import { MagneticButton } from "@/components/MagneticButton";
import { CinematicTypewriter } from "@/components/CinematicTypewriter";

interface HomepageHeroProps {
  onBookCall: () => void;
}

/**
 * HomepageHero | Officium Supremum
 *
 * Combines:
 * 1. Elite institutional typography with English clarity and Devanagari soul.
 * 2. Cinematic real-time typewriter sequence for Placement 1 Hindi slogan.
 * 3. Preserved Guiding Thread mathematical SVG journey from uncertainty to disciplined clarity.
 * 4. Natural institutional atmosphere (Forest Sage, Antique Sand, Charcoal, Ivory Mist).
 * 5. Strict adherence to Landing Page Design standard (max-w 680px, no hyphens, no italics).
 */
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
  // State 1: p 0.0 - 0.22: Headline prominent
  // State 2: p 0.22 - 0.45: Headline gently recedes, student wanders
  // State 3: p 0.45 - 0.70: "Guidance gives direction."
  // State 4: p 0.70 - 0.95: "Discipline creates independence."
  const heroOpacity = reducedMotion
    ? 1
    : interpolate(progress, [0, 0.22, 0.42], [1, 0.9, 0], easeOutCubic);
  const heroTranslateY = reducedMotion
    ? 0
    : interpolate(progress, [0, 0.35], [0, -36]);
  const heroScale = reducedMotion
    ? 1
    : interpolate(progress, [0, 0.35], [1, 0.98]);

  const statement1Opacity = reducedMotion
    ? 1
    : interpolate(progress, [0.28, 0.40, 0.58, 0.66], [0, 1, 1, 0], easeInOutSine);
  const statement1TranslateY = reducedMotion
    ? 0
    : interpolate(progress, [0.28, 0.40, 0.58, 0.66], [24, 0, 0, -18]);

  const statement2Opacity = reducedMotion
    ? 1
    : interpolate(progress, [0.62, 0.74, 0.95, 1.0], [0, 1, 1, 0.8], easeInOutSine);
  const statement2TranslateY = reducedMotion
    ? 0
    : interpolate(progress, [0.62, 0.74, 1.0], [24, 0, -10]);

  const scrollCueOpacity = reducedMotion ? 0 : interpolate(progress, [0, 0.08], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="journey relative bg-[#252923] text-[#F3EFE6] overflow-x-clip"
      aria-label="Officium Supremum Mentorship Journey"
    >
      {/* Sticky Cinematic Stage */}
      <div
        ref={stageRef}
        className="journey-stage w-full flex flex-col justify-between"
      >
        {/* Subtle Ambient Vignette & Peaceful Forest Sage Atmospheric Glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 85% 65% at 75% 40%, rgba(52, 72, 60, 0.4) 0%, rgba(37, 41, 35, 0.88) 65%, #252923 100%)",
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
          className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-24 sm:pt-28 lg:pt-32 flex-1 flex flex-col justify-center"
          style={{
            opacity: heroOpacity,
            transform: `translateY(${heroTranslateY}px) scale(${heroScale})`,
            pointerEvents: progress > 0.35 && !reducedMotion ? "none" : "auto",
            transition: reducedMotion ? "none" : undefined,
          }}
        >
          <div className="max-w-[680px] space-y-4 sm:space-y-5">
            {/* Core Brand Headline: DISCIPLINE CREATES EXCELLENCE */}
            <h1 className="heading-1 !text-[clamp(2.75rem,7vw,5.5rem)] text-[#F3EFE6] font-semibold leading-[0.96] tracking-tight text-balance">
              DISCIPLINE
              <br />
              CREATES
              <br />
              <span className="text-[#B18A58] italic font-normal">EXCELLENCE.</span>
            </h1>

            {/* Placement 1 — Top Hero Section: The Single Hindi Slogan with Cinematic Typewriter */}
            <div className="pt-2 pb-1">
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white/[0.08] border border-white/15 backdrop-blur-sm shadow-soft-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B18A58] shrink-0" />
                <span className="font-tiro text-base sm:text-lg text-[#F3EFE6] font-normal tracking-wide">
                  <CinematicTypewriter
                    phrases={["शांत मन। स्पष्ट लक्ष्य। दृढ़ संकल्प।"]}
                    typingSpeed={90}
                    pauseDuration={2400}
                    loop={false}
                  />
                </span>
              </div>
            </div>

            {/* Subtitle in Crisp, Measured Institutional English */}
            <p className="body-2 sm:body-1 text-[#D8D5C8] max-w-[640px] leading-relaxed text-pretty font-sans">
              Helping students build discipline, develop leadership and prepare for their future with the right guidance.
            </p>

            {/* Hero CTAs */}
            <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 max-w-md sm:max-w-none">
              {/* Primary CTA — EXPLORE PROGRAMS (Solid Forest Sage Brand Treatment) */}
              <MagneticButton
                variant="sage"
                href="#programs"
                ariaLabel="Explore Programs — View Juniors, Scholars, and Defence mentorship tracks"
              >
                <span>EXPLORE PROGRAMS</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" weight="bold" />
              </MagneticButton>

              {/* Secondary CTA — Book a Free 20-Minute Call (Solid Warm Ivory Treatment) */}
              <MagneticButton
                variant="ivory"
                onClick={onBookCall}
                ariaLabel="Book a Free 20-Minute Call with an academy mentor"
              >
                <span>Book a Free 20-Minute Call</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" weight="bold" />
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
              <h2 className="heading-2 sm:heading-1 text-[#F3EFE6] leading-tight text-balance">
                Guidance gives <br />
                <span className="text-[#B18A58] italic font-normal">direction.</span>
              </h2>
              <p className="body-4 sm:body-2 text-[#D8D5C8]/90 max-w-md leading-relaxed text-pretty font-sans">
                When syllabi feel overwhelming, a personal mentor brings daily structure: what to finish today, how to practice, and where to focus.
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
              <h2 className="heading-2 sm:heading-1 text-[#F3EFE6] leading-tight text-balance">
                Discipline creates <br />
                <span className="text-[#B18A58] italic font-normal">independence.</span>
              </h2>
              <p className="body-4 sm:body-2 text-[#D8D5C8]/90 max-w-md leading-relaxed text-pretty font-sans">
                With steady daily routines and evening accountability, students stop relying on reminders and take ownership of their own preparation.
              </p>
            </div>
          </div>
        )}

        {/* Bottom Scroll Cue */}
        <div
          className="journey-cue relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-8 flex items-center justify-between text-[#D8D5C8] caption-4"
          style={{ opacity: scrollCueOpacity }}
        >
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B18A58]" />
            <span>Scroll to begin the journey</span>
          </div>

          <div className="flex items-center gap-1.5 opacity-70 animate-bounce">
            <span className="caption-5 uppercase tracking-widest hidden sm:inline">Explore</span>
            <CaretDown className="w-3.5 h-3.5" weight="bold" />
          </div>
        </div>

        {/* Transition gradient at stage bottom to blend seamlessly into Ivory Mist */}
        <div
          className="journey-fade-to-cream absolute bottom-0 left-0 right-0 h-28 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, transparent, #F3EFE6)",
          }}
        />
      </div>
    </section>
  );
}
