"use client";

import React, { useEffect, useRef, useMemo } from "react";
import { buildProgramsGeometry, BuiltProgramsGeometry } from "./programsGeometry";
import { interpolate, easeInOutSine, easeOutCubic } from "@/lib/motion/interpolate";

interface ProgramPathSvgProps {
  progress: number;
  width: number;
  height: number;
  activeTrack: "juniors" | "scholars" | "defence" | null;
  reducedMotion?: boolean;
}

export function ProgramPathSvg({
  progress,
  width,
  height,
  activeTrack,
  reducedMotion = false,
}: ProgramPathSvgProps) {
  const containerRef = useRef<SVGSVGElement | null>(null);

  // SVG Element refs
  const entryPathRef = useRef<SVGPathElement | null>(null);
  const decisionNodeRef = useRef<SVGCircleElement | null>(null);
  const decisionHaloRef = useRef<SVGCircleElement | null>(null);

  const juniorsPathRef = useRef<SVGPathElement | null>(null);
  const scholarsPathRef = useRef<SVGPathElement | null>(null);
  const defencePathRef = useRef<SVGPathElement | null>(null);

  const juniorsDotRef = useRef<SVGCircleElement | null>(null);
  const scholarsDotRef = useRef<SVGCircleElement | null>(null);
  const defenceDotRef = useRef<SVGCircleElement | null>(null);

  const juniorsHaloRef = useRef<SVGCircleElement | null>(null);
  const scholarsHaloRef = useRef<SVGCircleElement | null>(null);
  const defenceHaloRef = useRef<SVGCircleElement | null>(null);

  // Path lengths cache
  const lengthsRef = useRef({
    entry: 0,
    juniors: 0,
    scholars: 0,
    defence: 0,
  });

  const geo = useMemo<BuiltProgramsGeometry | null>(() => {
    if (width <= 0 || height <= 0) return null;
    return buildProgramsGeometry(width, height);
  }, [width, height]);

  // Compute total lengths of paths once geometry is built
  useEffect(() => {
    if (!geo) return;
    try {
      if (entryPathRef.current) lengthsRef.current.entry = entryPathRef.current.getTotalLength() || 400;
      if (juniorsPathRef.current) lengthsRef.current.juniors = juniorsPathRef.current.getTotalLength() || 600;
      if (scholarsPathRef.current) lengthsRef.current.scholars = scholarsPathRef.current.getTotalLength() || 600;
      if (defencePathRef.current) lengthsRef.current.defence = defencePathRef.current.getTotalLength() || 600;
    } catch {
      lengthsRef.current = { entry: 400, juniors: 600, scholars: 600, defence: 600 };
    }
  }, [geo]);

  // Direct DOM updates on RAF scroll ticks for 60fps
  useEffect(() => {
    if (!geo || reducedMotion) return;
    const p = Math.max(0, Math.min(1, progress));

    // 1. Entry Thread Drawing (0.0 -> 0.20)
    const entryLen = lengthsRef.current.entry || 400;
    if (entryPathRef.current) {
      const drawProgress = interpolate(p, [0.0, 0.20], [0, 1], easeInOutSine);
      entryPathRef.current.style.strokeDasharray = `${entryLen}`;
      entryPathRef.current.style.strokeDashoffset = `${entryLen * (1 - drawProgress)}`;
    }

    // 2. Decision Node Pulse & Halo (0.15 -> 0.35)
    if (decisionHaloRef.current && decisionNodeRef.current) {
      const haloOpacity = interpolate(p, [0.14, 0.22, 0.35, 0.8], [0, 0.7, 0.35, 0.2]);
      const haloScale = interpolate(p, [0.14, 0.22, 0.35], [0.6, 1.4, 1.0], easeOutCubic);
      decisionHaloRef.current.style.opacity = `${haloOpacity}`;
      decisionHaloRef.current.setAttribute("r", `${14 * haloScale}`);
      decisionNodeRef.current.style.opacity = `${interpolate(p, [0.10, 0.18], [0, 1])}`;
    }

    // 3. Three Branching Paths Drawing (0.18 -> 0.40)
    const branchesDraw = interpolate(p, [0.18, 0.40], [0, 1], easeInOutSine);

    const jLen = lengthsRef.current.juniors || 600;
    if (juniorsPathRef.current) {
      juniorsPathRef.current.style.strokeDasharray = `${jLen}`;
      juniorsPathRef.current.style.strokeDashoffset = `${jLen * (1 - branchesDraw)}`;
    }

    const sLen = lengthsRef.current.scholars || 600;
    if (scholarsPathRef.current) {
      scholarsPathRef.current.style.strokeDasharray = `${sLen}`;
      scholarsPathRef.current.style.strokeDashoffset = `${sLen * (1 - branchesDraw)}`;
    }

    const dLen = lengthsRef.current.defence || 600;
    if (defencePathRef.current) {
      defencePathRef.current.style.strokeDasharray = `${dLen}`;
      defencePathRef.current.style.strokeDashoffset = `${dLen * (1 - branchesDraw)}`;
    }

    // 4. Branch Highlighting based on activeTrack
    const isJuniors = activeTrack === "juniors";
    const isScholars = activeTrack === "scholars";
    const isDefence = activeTrack === "defence";

    // Juniors styling
    if (juniorsPathRef.current) {
      juniorsPathRef.current.style.stroke = isJuniors ? "#34483C" : "#D8D5C8";
      juniorsPathRef.current.style.strokeWidth = isJuniors ? "2.4" : "1.2";
      juniorsPathRef.current.style.opacity = isJuniors ? "1.0" : "0.5";
    }
    if (juniorsDotRef.current && juniorsHaloRef.current) {
      const dotOpacity = p > 0.28 ? (isJuniors ? 1 : 0.6) : 0;
      juniorsDotRef.current.style.opacity = `${dotOpacity}`;
      juniorsDotRef.current.setAttribute("fill", isJuniors ? "#34483C" : "#D8D5C8");
      juniorsHaloRef.current.style.opacity = isJuniors && p > 0.28 ? "0.6" : "0";
    }

    // Scholars styling
    if (scholarsPathRef.current) {
      scholarsPathRef.current.style.stroke = isScholars ? "#34483C" : "#D8D5C8";
      scholarsPathRef.current.style.strokeWidth = isScholars ? "2.4" : "1.2";
      scholarsPathRef.current.style.opacity = isScholars ? "1.0" : "0.5";
    }
    if (scholarsDotRef.current && scholarsHaloRef.current) {
      const dotOpacity = p > 0.32 ? (isScholars ? 1 : 0.6) : 0;
      scholarsDotRef.current.style.opacity = `${dotOpacity}`;
      scholarsDotRef.current.setAttribute("fill", isScholars ? "#34483C" : "#D8D5C8");
      scholarsHaloRef.current.style.opacity = isScholars && p > 0.32 ? "0.6" : "0";
    }

    // Defence styling
    if (defencePathRef.current) {
      defencePathRef.current.style.stroke = isDefence ? "#34483C" : "#D8D5C8";
      defencePathRef.current.style.strokeWidth = isDefence ? "2.4" : "1.2";
      defencePathRef.current.style.opacity = isDefence ? "1.0" : "0.5";
    }
    if (defenceDotRef.current && defenceHaloRef.current) {
      const dotOpacity = p > 0.36 ? (isDefence ? 1 : 0.6) : 0;
      defenceDotRef.current.style.opacity = `${dotOpacity}`;
      defenceDotRef.current.setAttribute("fill", isDefence ? "#34483C" : "#D8D5C8");
      defenceHaloRef.current.style.opacity = isDefence && p > 0.36 ? "0.6" : "0";
    }
  }, [progress, geo, activeTrack, reducedMotion]);

  if (!geo) return null;

  // In reduced-motion mode, display complete static layout
  if (reducedMotion) {
    return (
      <svg
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-visible"
        width={width}
        height={height}
      >
        <path d={geo.entryD} fill="none" stroke="#34483C" strokeWidth="1.6" opacity="0.8" />
        <circle cx={geo.decisionNode.x} cy={geo.decisionNode.y} r="6" fill="#B18A58" />
        <circle cx={geo.decisionNode.x} cy={geo.decisionNode.y} r="14" fill="#B18A58" opacity="0.2" />
        <path d={geo.juniorsD} fill="none" stroke="#34483C" strokeWidth="1.6" opacity="0.8" />
        <path d={geo.scholarsD} fill="none" stroke="#34483C" strokeWidth="1.6" opacity="0.8" />
        <path d={geo.defenceD} fill="none" stroke="#34483C" strokeWidth="1.6" opacity="0.8" />
        <circle cx={geo.juniorsWaypoint.x} cy={geo.juniorsWaypoint.y} r="5" fill="#34483C" />
        <circle cx={geo.scholarsWaypoint.x} cy={geo.scholarsWaypoint.y} r="5" fill="#34483C" />
        <circle cx={geo.defenceWaypoint.x} cy={geo.defenceWaypoint.y} r="5" fill="#34483C" />
      </svg>
    );
  }

  return (
    <svg
      ref={containerRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-visible z-10"
      width={width}
      height={height}
    >
      <defs>
        <linearGradient id="progEntryGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F3EFE6" stopOpacity="0.95" />
          <stop offset="60%" stopColor="#B18A58" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#34483C" stopOpacity="1" />
        </linearGradient>

        <radialGradient id="nodePulseGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#B18A58" stopOpacity="0.8" />
          <stop offset="60%" stopColor="#B18A58" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#B18A58" stopOpacity="0" />
        </radialGradient>

        <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Ambient Depth Lines */}
      {geo.ambientD.map((d, i) => (
        <path
          key={`amb-${i}`}
          d={d}
          fill="none"
          stroke="#D8D5C8"
          strokeWidth="0.8"
          strokeDasharray="4 6"
          opacity="0.3"
        />
      ))}

      {/* 1. Guiding Thread Entry from Hero */}
      <path
        ref={entryPathRef}
        d={geo.entryD}
        fill="none"
        stroke="url(#progEntryGrad)"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      {/* 2. Central Decision Node */}
      <circle
        ref={decisionHaloRef}
        cx={geo.decisionNode.x}
        cy={geo.decisionNode.y}
        r="14"
        fill="url(#nodePulseGrad)"
        opacity="0"
      />
      <circle
        ref={decisionNodeRef}
        cx={geo.decisionNode.x}
        cy={geo.decisionNode.y}
        r="6"
        fill="#34483C"
        opacity="0"
        filter="url(#softGlow)"
      />
      <circle
        cx={geo.decisionNode.x}
        cy={geo.decisionNode.y}
        r="2"
        fill="#F3EFE6"
        opacity="0.9"
      />

      {/* 3. Three Branching Paths */}
      {/* Juniors Path */}
      <path
        ref={juniorsPathRef}
        d={geo.juniorsD}
        fill="none"
        stroke="#D8D5C8"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ transition: "stroke 0.3s ease, stroke-width 0.3s ease, opacity 0.3s ease" }}
      />
      <circle
        ref={juniorsHaloRef}
        cx={geo.juniorsWaypoint.x}
        cy={geo.juniorsWaypoint.y}
        r="12"
        fill="#B18A58"
        opacity="0"
        style={{ transition: "opacity 0.3s ease" }}
      />
      <circle
        ref={juniorsDotRef}
        cx={geo.juniorsWaypoint.x}
        cy={geo.juniorsWaypoint.y}
        r="4.5"
        fill="#34483C"
        opacity="0"
        style={{ transition: "fill 0.3s ease, opacity 0.3s ease" }}
      />

      {/* Scholars Path */}
      <path
        ref={scholarsPathRef}
        d={geo.scholarsD}
        fill="none"
        stroke="#D8D5C8"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ transition: "stroke 0.3s ease, stroke-width 0.3s ease, opacity 0.3s ease" }}
      />
      <circle
        ref={scholarsHaloRef}
        cx={geo.scholarsWaypoint.x}
        cy={geo.scholarsWaypoint.y}
        r="12"
        fill="#B18A58"
        opacity="0"
        style={{ transition: "opacity 0.3s ease" }}
      />
      <circle
        ref={scholarsDotRef}
        cx={geo.scholarsWaypoint.x}
        cy={geo.scholarsWaypoint.y}
        r="4.5"
        fill="#34483C"
        opacity="0"
        style={{ transition: "fill 0.3s ease, opacity 0.3s ease" }}
      />

      {/* Defence Path */}
      <path
        ref={defencePathRef}
        d={geo.defenceD}
        fill="none"
        stroke="#D8D5C8"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ transition: "stroke 0.3s ease, stroke-width 0.3s ease, opacity 0.3s ease" }}
      />
      <circle
        ref={defenceHaloRef}
        cx={geo.defenceWaypoint.x}
        cy={geo.defenceWaypoint.y}
        r="12"
        fill="#B18A58"
        opacity="0"
        style={{ transition: "opacity 0.3s ease" }}
      />
      <circle
        ref={defenceDotRef}
        cx={geo.defenceWaypoint.x}
        cy={geo.defenceWaypoint.y}
        r="4.5"
        fill="#34483C"
        opacity="0"
        style={{ transition: "fill 0.3s ease, opacity 0.3s ease" }}
      />
    </svg>
  );
}
