"use client";

import React, { useEffect, useRef } from "react";
import { buildJourney, pickGeometry } from "./journeyGeometry";
import { interpolate, easeInOutSine, easeOutCubic } from "@/lib/motion/interpolate";

interface GuidingThreadProps {
  progress: number;
  width: number;
  height: number;
  reducedMotion?: boolean;
}

export function GuidingThread({
  progress,
  width,
  height,
  reducedMotion = false,
}: GuidingThreadProps) {
  const containerRef = useRef<SVGSVGElement | null>(null);
  const threadPathRef = useRef<SVGPathElement | null>(null);
  const studentNodeRef = useRef<SVGCircleElement | null>(null);
  const studentHaloRef = useRef<SVGCircleElement | null>(null);
  const uncertainGroupRef = useRef<SVGGElement | null>(null);
  const wanderPathRef = useRef<SVGPathElement | null>(null);
  const ambientGroupRef = useRef<SVGGElement | null>(null);

  // Cache path lengths for direct DOM manipulation
  const pathLengthsRef = useRef<{ thread: number; wander: number }>({
    thread: 0,
    wander: 0,
  });

  const journey = React.useMemo(() => {
    if (width <= 0 || height <= 0) return null;
    return buildJourney(width, height);
  }, [width, height]);

  // Compute total lengths of paths once geometry is built
  useEffect(() => {
    if (!journey) return;
    if (threadPathRef.current) {
      try {
        pathLengthsRef.current.thread = threadPathRef.current.getTotalLength();
      } catch {
        pathLengthsRef.current.thread = 1000;
      }
    }
    if (wanderPathRef.current) {
      try {
        pathLengthsRef.current.wander = wanderPathRef.current.getTotalLength();
      } catch {
        pathLengthsRef.current.wander = 300;
      }
    }
  }, [journey]);

  // Drive animation directly on SVG DOM nodes to ensure 60fps without React re-renders
  useEffect(() => {
    if (!journey || reducedMotion) return;

    const p = Math.max(0, Math.min(1, progress));
    const threadPath = threadPathRef.current;
    const wanderPath = wanderPathRef.current;
    const studentNode = studentNodeRef.current;
    const studentHalo = studentHaloRef.current;
    const uncertainGroup = uncertainGroupRef.current;
    const ambientGroup = ambientGroupRef.current;

    // 1. Thread drawing progression
    if (threadPath && pathLengthsRef.current.thread > 0) {
      const len = pathLengthsRef.current.thread;
      // Thread begins entering around p=0.25 and fully draws by p=0.92
      const drawProgress = interpolate(
        p,
        [0, 0.25, 0.88, 1.0],
        [0, 0, 1, 1],
        easeInOutSine
      );
      threadPath.style.strokeDasharray = `${len}`;
      threadPath.style.strokeDashoffset = `${len * (1 - drawProgress)}`;
      // Fade thread in smoothly
      const threadOpacity = interpolate(p, [0.2, 0.35, 1], [0.15, 0.95, 0.85]);
      threadPath.style.opacity = `${threadOpacity}`;
    }

    // 2. Uncertain chaotic trajectories fade as guidance appears
    if (uncertainGroup) {
      // From p=0 to 0.3 trajectories are visible; from 0.35 to 0.7 they fade away
      const uncOpacity = interpolate(p, [0, 0.25, 0.55, 0.8], [0.85, 0.8, 0.15, 0.04]);
      uncertainGroup.style.opacity = `${uncOpacity}`;
      const uncDrift = interpolate(p, [0, 0.5], [0, 8]);
      uncertainGroup.style.transform = `translateY(${uncDrift}px)`;
    }

    // 3. Ambient depth paths subtle parallax
    if (ambientGroup) {
      const ambY = interpolate(p, [0, 1], [0, -35]);
      ambientGroup.style.transform = `translateY(${ambY}px)`;
    }

    // 4. Student node position along the journey
    // Stage 1 (0 -> 0.15): At rest at initial point
    // Stage 2 (0.15 -> 0.45): Wandering along wander path (uncertainty)
    // Stage 3 (0.45 -> 0.55): Convergence point where guidance meets student
    // Stage 4 (0.55 -> 1.0): Follows the tail of the guiding thread towards clarity and direction
    let currentX = journey.student.x;
    let currentY = journey.student.y;

    if (p <= 0.15) {
      currentX = journey.student.x;
      currentY = journey.student.y;
    } else if (p < 0.5) {
      if (wanderPath && pathLengthsRef.current.wander > 0) {
        const wanderT = (p - 0.15) / (0.5 - 0.15);
        const dist = pathLengthsRef.current.wander * Math.min(1, Math.max(0, wanderT));
        try {
          const pt = wanderPath.getPointAtLength(dist);
          currentX = pt.x;
          currentY = pt.y;
        } catch {
          currentX = journey.student.x;
          currentY = journey.student.y;
        }
      }
    } else {
      if (threadPath && pathLengthsRef.current.thread > 0) {
        // Find convergence distance on thread path
        // Guidance entry is roughly the first 35-40% of thread length, tail is remaining 60%
        const threadT = (p - 0.5) / 0.5;
        // From convergence point to end of thread
        const startFraction = 0.36;
        const targetDist =
          pathLengthsRef.current.thread *
          (startFraction + (1 - startFraction) * Math.min(1, Math.max(0, threadT)));
        try {
          const pt = threadPath.getPointAtLength(targetDist);
          currentX = pt.x;
          currentY = pt.y;
        } catch {
          // fallback
          currentX = journey.student.x;
          currentY = journey.student.y;
        }
      }
    }

    if (studentNode) {
      studentNode.setAttribute("cx", currentX.toFixed(1));
      studentNode.setAttribute("cy", currentY.toFixed(1));
    }
    if (studentHalo) {
      studentHalo.setAttribute("cx", currentX.toFixed(1));
      studentHalo.setAttribute("cy", currentY.toFixed(1));
      // Pulse halo slightly when guidance connects (p around 0.45 - 0.6)
      const haloScale = interpolate(
        p,
        [0, 0.45, 0.55, 0.7, 1],
        [1, 1.1, 1.8, 1.2, 1]
      );
      const haloOpacity = interpolate(
        p,
        [0, 0.45, 0.55, 0.7, 1],
        [0.2, 0.3, 0.7, 0.35, 0.2]
      );
      studentHalo.setAttribute("r", (journey.nodeRadius * 2.8 * haloScale).toFixed(1));
      studentHalo.style.opacity = `${haloOpacity}`;
    }
  }, [progress, journey, reducedMotion]);

  if (!journey) return null;

  // In reduced-motion mode, show static state where guidance has already given direction
  if (reducedMotion) {
    return (
      <svg
        ref={containerRef}
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-visible"
        width={width}
        height={height}
      >
        {/* Subtle background ambient paths */}
        <g opacity="0.18">
          {journey.ambient.map((d, i) => (
            <path
              key={`static-amb-${i}`}
              d={d}
              fill="none"
              stroke="#B7A89A"
              strokeWidth="0.8"
              strokeDasharray="4 6"
            />
          ))}
        </g>

        {/* Static Guiding Thread */}
        <path
          d={journey.thread}
          fill="none"
          stroke="#E8DCC6"
          strokeWidth="1.25"
          opacity="0.85"
        />

        {/* Student node settled on the disciplined path */}
        <circle
          cx={journey.student.x}
          cy={journey.student.y}
          r={journey.nodeRadius * 2.2}
          fill="#E8DCC6"
          opacity="0.18"
        />
        <circle
          cx={journey.student.x}
          cy={journey.student.y}
          r={journey.nodeRadius}
          fill="#E8DCC6"
        />
      </svg>
    );
  }

  return (
    <svg
      ref={containerRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-visible"
      width={width}
      height={height}
    >
      <defs>
        {/* Soft linear gradient for the Guiding Thread */}
        <linearGradient id="guidingThreadGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#B7A89A" stopOpacity="0.3" />
          <stop offset="35%" stopColor="#E8DCC6" stopOpacity="0.9" />
          <stop offset="85%" stopColor="#E8DCC6" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#B7A89A" stopOpacity="0.6" />
        </linearGradient>

        {/* Soft glow filter for the student node */}
        <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Far Ambient Trajectories (Depth Layer) */}
      <g ref={ambientGroupRef} className="transition-transform duration-700 ease-out">
        {journey.ambient.map((d, i) => (
          <path
            key={`amb-${i}`}
            d={d}
            fill="none"
            stroke="#B7A89A"
            strokeWidth="0.75"
            strokeDasharray="3 5"
            opacity="0.22"
          />
        ))}
      </g>

      {/* Uncertain Trajectories (State 1 & 2: Multiple paths, no direction) */}
      <g ref={uncertainGroupRef} className="transition-opacity duration-300">
        {journey.uncertain.map((u, i) => (
          <path
            key={`unc-${i}`}
            d={u.d}
            fill="none"
            stroke="#B7A89A"
            strokeWidth="0.9"
            strokeDasharray={i % 2 === 0 ? "2 4" : "4 6"}
            opacity={u.opacity}
          />
        ))}

        {/* Subtle potential waypoint dots indicating unguided destinations */}
        {journey.waypoints.map((wp, i) => (
          <circle
            key={`wp-${i}`}
            cx={wp.x}
            cy={wp.y}
            r="1.8"
            fill="#B7A89A"
            opacity="0.35"
          />
        ))}
      </g>

      {/* Invisible wander path used purely for coordinate calculation */}
      <path
        ref={wanderPathRef}
        d={journey.wander}
        fill="none"
        stroke="none"
        opacity="0"
      />

      {/* The Guiding Thread: Enters subtly and becomes the directional spine */}
      <path
        ref={threadPathRef}
        d={journey.thread}
        fill="none"
        stroke="url(#guidingThreadGrad)"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          transition: "opacity 0.2s ease-out",
        }}
      />

      {/* Student Node: The focal point of the visual journey */}
      {/* Outer halo */}
      <circle
        ref={studentHaloRef}
        cx={journey.student.x}
        cy={journey.student.y}
        r={journey.nodeRadius * 2.8}
        fill="#E8DCC6"
        opacity="0.22"
      />
      {/* Core student point */}
      <circle
        ref={studentNodeRef}
        cx={journey.student.x}
        cy={journey.student.y}
        r={journey.nodeRadius}
        fill="#E8DCC6"
        filter="url(#nodeGlow)"
      />
    </svg>
  );
}
