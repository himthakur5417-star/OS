"use client";

import React, { useRef, useState, useEffect } from "react";
import { useElementSize } from "@/lib/hooks/useElementSize";
import { useMediaQuery, usePrefersReducedMotion } from "@/lib/hooks/useMediaQuery";
import { interpolate, easeInOutSine, easeOutCubic } from "@/lib/motion/interpolate";
import { ProgramPathSvg } from "./ProgramPathSvg";
import { ProgramNarrativeStage } from "./ProgramNarrativeStage";
import { ProgramJourneyMobile } from "./ProgramJourneyMobile";
import { ProgramJourneyStatic } from "./ProgramJourneyStatic";

export function ProgramJourney() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const size = useElementSize(stageRef);
  const reducedMotion = usePrefersReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const [progress, setProgress] = useState(0);
  const [manualTrack, setManualTrack] = useState<"juniors" | "scholars" | "defence" | null>(null);
  const manualSelectionScrollY = useRef<number | null>(null);

  // Scroll tracking on desktop
  useEffect(() => {
    if (reducedMotion || isDesktop === false) return;

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

        // Reset manual track selection only after the user actually scrolls away.
        if (
          manualTrack &&
          manualSelectionScrollY.current !== null &&
          Math.abs(window.scrollY - manualSelectionScrollY.current) > 2
        ) {
          setManualTrack(null);
          manualSelectionScrollY.current = null;
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [reducedMotion, isDesktop, manualTrack]);

  // If user prefers reduced motion, return static accessible version
  if (reducedMotion) {
    return <ProgramJourneyStatic />;
  }

  // If mobile, return vertical natural scroll version
  if (isDesktop === false) {
    return <ProgramJourneyMobile />;
  }

  // Compute active track based on scroll progression or manual click
  let activeTrack: "juniors" | "scholars" | "defence" | null = manualTrack;
  if (!activeTrack) {
    if (progress < 0.32) {
      activeTrack = null;
    } else if (progress < 0.56) {
      activeTrack = "juniors";
    } else if (progress < 0.78) {
      activeTrack = "scholars";
    } else {
      activeTrack = "defence";
    }
  }

  // Light Reveal: Downward sweep of Warm Cream clarity (#FAF7F2 / #E8DCC6)
  // Sweeps from top to bottom as the thread enters, establishing full Warm Cream clarity by p = 0.22
  const revealPercent = interpolate(progress, [0.0, 0.20], [0, 100], easeOutCubic);
  const isLightMode = progress >= 0.10;

  const headerOpacity = interpolate(progress, [0.0, 0.10, 0.90, 1.0], [0.85, 1, 1, 0.85]);
  const stageOpacity = interpolate(progress, [0.0, 0.15], [0.75, 1], easeInOutSine);

  return (
    <section
      id="programs"
      ref={containerRef}
      className="relative w-full bg-[#211C1D] text-[#211C1D] overflow-x-clip"
      style={{ height: "250vh" }}
      aria-label="Officium Supremum Mentorship Tracks"
    >
      {/* Sticky Cinematic Stage (100vh) */}
      <div
        ref={stageRef}
        className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between"
      >
        {/* Layer 1: Dark Near Black / Burgundy Atmosphere (blends with Hero bottom) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% 20%, rgba(114, 47, 55, 0.4) 0%, #211C1D 100%)",
          }}
        />

        {/* Layer 2: The Light Reveal — Downward Sweeping Warm Cream Surface (#FAF7F2 / #E8DCC6) */}
        <div
          className="absolute inset-0 pointer-events-none transition-none"
          style={{
            backgroundColor: "#FAF7F2",
            backgroundImage:
              "radial-gradient(ellipse at 30% 50%, rgba(232, 220, 198, 0.5) 0%, #FAF7F2 70%)",
            clipPath: `inset(0 0 ${100 - revealPercent}% 0)`,
            WebkitClipPath: `inset(0 0 ${100 - revealPercent}% 0)`,
          }}
        />

        {/* Layer 3: SVG Trajectory System (Entry thread, Decision Node, Three Branches) */}
        {size && (
          <ProgramPathSvg
            progress={progress}
            width={size.width}
            height={size.height}
            activeTrack={activeTrack}
            reducedMotion={reducedMotion}
          />
        )}

        {/* Layer 4: Editorial Narrative & Program Stations */}
        <ProgramNarrativeStage
          activeTrack={activeTrack}
          onSelectTrack={(id) => {
            setManualTrack(id);
            manualSelectionScrollY.current = window.scrollY;
          }}
          headerOpacity={headerOpacity}
          stageOpacity={stageOpacity}
          isLightMode={isLightMode}
        />
      </div>
    </section>
  );
}
