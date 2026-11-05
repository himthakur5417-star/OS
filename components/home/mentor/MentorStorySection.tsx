"use client";

import React, { useRef, useState, useEffect } from "react";
import { usePrefersReducedMotion } from "@/lib/hooks/useMediaQuery";
import { ArrowRight, Check } from "lucide-react";
import { MagneticButton } from "@/components/MagneticButton";

interface MentorStorySectionProps {
  onBookCall?: () => void;
}

export function MentorStorySection({ onBookCall }: MentorStorySectionProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  // Scroll progress for interactive reveal [0, 1]
  const [scrollProgress, setScrollProgress] = useState(0.5);

  useEffect(() => {
    if (reducedMotion) {
      setScrollProgress(1);
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

        const totalDistance = rect.height + windowHeight * 0.3;
        const current = windowHeight - rect.top;
        const p = Math.max(0, Math.min(1, current / totalDistance));
        setScrollProgress(p);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [reducedMotion]);

  const effectiveProgress = reducedMotion ? 1 : scrollProgress;
  const stage2Active = effectiveProgress > 0.18;
  const stage3Active = effectiveProgress > 0.42;

  return (
    <section
      ref={containerRef}
      id="mentor-guidance"
      className="relative text-[#211C1D] pt-20 sm:pt-28 pb-20 sm:pb-28 overflow-hidden"
      style={{
        background:
          "linear-gradient(to bottom, #FAF7F2 0%, #FAF7F2 65%, #F8F3ED 80%, #F3E8E2 92%, #ECD9D3 100%)",
      }}
      aria-label="Why We Need a Mentor"
    >
      {/* Subtle Warm Background Grain Texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(#211C1D 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* ========================================================================= */}
        {/* 1. SECTION HEADER (Officium Supremum Identity & Copy)                     */}
        {/* ========================================================================= */}
        <div className="max-w-3xl mx-auto text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#722F37]/5 border border-[#722F37]/15">
            <span className="w-1.5 h-1.5 rounded-full bg-[#722F37]" />
            <span className="eyebrow text-[#722F37] tracking-[0.25em] text-[11px] sm:text-xs font-semibold uppercase">
              WHY WE NEED A MENTOR
            </span>
          </div>

          <h2 className="font-heading font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-normal text-[#211C1D] leading-[1.15] tracking-tight">
            Talent Gives You Potential. <br />
            <span className="italic font-light text-[#722F37]">
              Guidance Gives It Direction.
            </span>
          </h2>

          <p className="type-body text-[#211C1D]/80 font-sans text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            Students often know what they want to achieve, but not always what to
            do every day to reach it. A mentor brings clarity, helps correct
            mistakes early, keeps progress consistent, and gives direction when
            things feel uncertain.
          </p>

          {/* Core Institutional Philosophy Quote (clean, non-boxed editorial) */}
          <div className="pt-2 pb-1">
            <p className="font-heading font-serif italic text-base sm:text-lg md:text-xl text-[#211C1D] tracking-wide leading-snug">
              “A mentor does not walk the path for you. <br className="hidden sm:inline" />
              <span className="text-[#722F37] font-normal not-italic">
                A mentor helps you walk the right path.”
              </span>
            </p>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. THE VISUAL STORYTELLING COMPOSITION                                   */}
        {/*    Continuous 3-Stage Story: Distraction -> Mentor Guidance -> Clarity   */}
        {/* ========================================================================= */}
        <div className="mt-12 sm:mt-16">
          {/* DESKTOP & TABLET VISUAL NARRATIVE (Editorial Scene) */}
          <div className="hidden lg:block relative w-full">
            <div className="relative w-full aspect-[1200/430] max-h-[460px]">
              <svg
                className="w-full h-full pointer-events-none select-none"
                viewBox="0 0 1200 430"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  {/* Gradients */}
                  <linearGradient id="threadGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#B7A89A" stopOpacity="0.4" />
                    <stop offset="30%" stopColor="#722F37" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#722F37" stopOpacity="1" />
                  </linearGradient>

                  <radialGradient id="mentorWarmAura" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#722F37" stopOpacity="0.14" />
                    <stop offset="60%" stopColor="#722F37" stopOpacity="0.03" />
                    <stop offset="100%" stopColor="#722F37" stopOpacity="0" />
                  </radialGradient>

                  <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#722F37" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#722F37" stopOpacity="0" />
                  </radialGradient>

                  <filter id="softGlow" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="3.5" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>

                  {/* Drop shadow for floating chips */}
                  <filter id="chipShadow" x="-10%" y="-20%" width="120%" height="150%">
                    <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#211C1D" floodOpacity="0.08" />
                  </filter>
                </defs>

                {/* Ground Horizon Guideline */}
                <line
                  x1="60"
                  y1="340"
                  x2="1140"
                  y2="340"
                  stroke="#211C1D"
                  strokeOpacity="0.09"
                  strokeWidth="1"
                  strokeDasharray="4 6"
                />

                {/* ------------------------------------------------------------- */}
                {/* STAGE 01: DISTRACTION (Left: x ~ 80 - 370)                    */}
                {/* ------------------------------------------------------------- */}
                <g
                  id="stage-distraction"
                  className="transition-opacity duration-700"
                  style={{ opacity: stage3Active ? 0.7 : 1 }}
                >
                  {/* Floating Thought Chips (Ambition with competing distractions) */}
                  {/* Chip 1: Syllabus? */}
                  <g transform="translate(85, 65)" filter="url(#chipShadow)">
                    <rect x="0" y="0" width="82" height="28" rx="14" fill="#FAF7F2" stroke="#211C1D" strokeOpacity="0.18" strokeWidth="1" />
                    <text x="41" y="18" textAnchor="middle" fill="#211C1D" fillOpacity="0.75" fontSize="11" fontFamily="sans-serif" fontWeight="500">
                      Syllabus?
                    </text>
                  </g>

                  {/* Chip 2: Boards? */}
                  <g transform="translate(155, 95)" filter="url(#chipShadow)">
                    <rect x="0" y="0" width="76" height="28" rx="14" fill="#FAF7F2" stroke="#211C1D" strokeOpacity="0.18" strokeWidth="1" />
                    <text x="38" y="18" textAnchor="middle" fill="#211C1D" fillOpacity="0.75" fontSize="11" fontFamily="sans-serif" fontWeight="500">
                      Boards?
                    </text>
                  </g>

                  {/* Chip 3: Online Distraction (with notification badge 12) */}
                  <g transform="translate(230, 75)" filter="url(#chipShadow)">
                    <rect x="0" y="0" width="138" height="30" rx="15" fill="#FAF7F2" stroke="#722F37" strokeOpacity="0.3" strokeWidth="1" />
                    <text x="56" y="19" textAnchor="middle" fill="#211C1D" fillOpacity="0.8" fontSize="11" fontFamily="sans-serif" fontWeight="500">
                      Online Distraction
                    </text>
                    <circle cx="120" cy="15" r="9" fill="#722F37" />
                    <text x="120" y="18.5" textAnchor="middle" fill="#FAF7F2" fontSize="9" fontFamily="sans-serif" fontWeight="700">
                      12
                    </text>
                  </g>

                  {/* Chip 4: NDA? */}
                  <g transform="translate(75, 125)" filter="url(#chipShadow)">
                    <rect x="0" y="0" width="68" height="26" rx="13" fill="#FAF7F2" stroke="#211C1D" strokeOpacity="0.18" strokeWidth="1" />
                    <text x="34" y="17" textAnchor="middle" fill="#211C1D" fillOpacity="0.75" fontSize="11" fontFamily="sans-serif" fontWeight="500">
                      NDA?
                    </text>
                  </g>

                  {/* Chip 5: What next? */}
                  <g transform="translate(285, 135)" filter="url(#chipShadow)">
                    <rect x="0" y="0" width="88" height="28" rx="14" fill="#FAF7F2" stroke="#211C1D" strokeOpacity="0.18" strokeWidth="1" />
                    <text x="44" y="18" textAnchor="middle" fill="#211C1D" fillOpacity="0.75" fontSize="11" fontFamily="sans-serif" fontWeight="500">
                      What next?
                    </text>
                  </g>

                  {/* Chip 6: Too much to do... */}
                  <g transform="translate(295, 185)" filter="url(#chipShadow)">
                    <rect x="0" y="0" width="112" height="28" rx="14" fill="#FAF7F2" stroke="#722F37" strokeOpacity="0.25" strokeWidth="1" />
                    <text x="56" y="18" textAnchor="middle" fill="#722F37" fillOpacity="0.9" fontSize="11" fontFamily="sans-serif" fontWeight="500">
                      Too much to do...
                    </text>
                  </g>

                  {/* Divergent Faint Dashed Lines wandering into center */}
                  <path d="M 126 93 C 140 140 180 180 230 190" stroke="#B7A89A" strokeWidth="1.25" strokeDasharray="3 4" fill="none" />
                  <path d="M 193 123 C 210 155 240 180 280 190" stroke="#B7A89A" strokeWidth="1.25" strokeDasharray="3 4" fill="none" />
                  <path d="M 109 151 C 120 180 160 210 210 220" stroke="#B7A89A" strokeWidth="1.25" strokeDasharray="3 4" fill="none" />
                  <path d="M 299 105 C 340 140 370 190 415 255" stroke="#B7A89A" strokeWidth="1.25" strokeDasharray="3 4" fill="none" />
                  <path d="M 329 163 C 360 190 385 225 415 255" stroke="#722F37" strokeWidth="1.25" strokeDasharray="3 4" fill="none" strokeOpacity="0.6" />
                  <path d="M 351 213 C 375 230 395 245 415 255" stroke="#722F37" strokeWidth="1.5" strokeDasharray="3 3" fill="none" strokeOpacity="0.75" />

                  {/* Study Desk & Perspective */}
                  <polygon points="90,270 330,270 320,284 80,284" fill="#EDE7DC" stroke="#211C1D" strokeWidth="1.5" />
                  <rect x="80" y="284" width="240" height="6" fill="#D8CEBC" stroke="#211C1D" strokeWidth="1" />
                  <line x1="105" y1="290" x2="100" y2="340" stroke="#211C1D" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="295" y1="290" x2="300" y2="340" stroke="#211C1D" strokeWidth="1.5" strokeLinecap="round" />

                  {/* Chair Outline */}
                  <path d="M 180 250 L 180 340 M 230 250 L 230 340 M 170 280 L 240 280" stroke="#211C1D" strokeWidth="1.5" strokeLinecap="round" />

                  {/* Desk Lamp */}
                  <path d="M 95 270 L 95 220 L 115 215" stroke="#211C1D" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                  <polygon points="112,210 128,217 118,225" fill="#211C1D" />
                  {/* Lamp Light Cone */}
                  <polygon points="122,218 190,270 120,270" fill="#E8DCC6" fillOpacity="0.25" />

                  {/* Open Books & Clutter on Desk */}
                  <rect x="135" y="255" width="45" height="7" rx="1" fill="#FAF7F2" stroke="#211C1D" strokeWidth="1" />
                  <rect x="133" y="262" width="48" height="7" rx="1" fill="#B7A89A" fillOpacity="0.4" stroke="#211C1D" strokeWidth="1" />
                  <polygon points="230,265 275,263 280,274 235,276" fill="#FAF7F2" stroke="#211C1D" strokeWidth="1" />
                  <line x1="236" y1="268" x2="255" y2="267" stroke="#211C1D" strokeWidth="0.8" strokeDasharray="2 2" />

                  {/* Laptop */}
                  <line x1="190" y1="270" x2="225" y2="270" stroke="#211C1D" strokeWidth="2" strokeLinecap="round" />
                  <line x1="200" y1="270" x2="195" y2="245" stroke="#211C1D" strokeWidth="1.5" strokeLinecap="round" />

                  {/* Seated Student (Head in hand, contemplative/overwhelmed) */}
                  <g transform="translate(175, 150)">
                    {/* Head tilted down towards desk */}
                    <ellipse cx="30" cy="24" rx="13" ry="16" fill="#E8DCC6" stroke="#211C1D" strokeWidth="1.5" transform="rotate(12 30 24)" />
                    {/* Hair */}
                    <path d="M 18 18 C 16 8 26 4 38 6 C 44 9 44 17 41 23 C 36 17 29 17 22 20 Z" fill="#211C1D" />
                    {/* Neck */}
                    <path d="M 28 38 L 28 46 L 34 46 L 34 38" fill="#E8DCC6" stroke="#211C1D" strokeWidth="1.25" />
                    {/* Torso in grey sweatshirt */}
                    <path d="M 31 46 C 18 55 12 76 14 110 L 50 110 C 52 76 44 55 31 46 Z" fill="#D5CDC3" stroke="#211C1D" strokeWidth="1.5" />
                    {/* Left arm resting on temple (weighing decisions / confusion) */}
                    <path d="M 22 56 L 6 70 L 20 34" stroke="#211C1D" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    {/* Right arm resting on open book */}
                    <path d="M 42 60 L 50 95 L 75 118" stroke="#211C1D" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  </g>
                </g>

                {/* ------------------------------------------------------------- */}
                {/* STAGE 02: MENTOR GUIDANCE (Center: x ~ 410 - 740)             */}
                {/* Mentor personally guiding, arm on shoulder, pointing at plan  */}
                {/* ------------------------------------------------------------- */}
                <g
                  id="stage-mentor"
                  className="transition-all duration-700"
                  style={{
                    opacity: stage2Active ? 1 : 0.6,
                    transform: stage2Active ? "translateY(0)" : "translateY(5px)",
                  }}
                >
                  {/* Ambient guidance aura */}
                  <circle cx="580" cy="220" r="120" fill="url(#mentorWarmAura)" />

                  {/* THE CONVERGENCE NODE: Where wandering paths unite */}
                  <circle cx="415" cy="255" r="16" fill="url(#nodeGlow)" />
                  <circle cx="415" cy="255" r="5" fill="#722F37" filter="url(#softGlow)" />
                  <circle cx="415" cy="255" r="2.5" fill="#FAF7F2" />

                  {/* Guidance Table */}
                  <polygon points="460,270 690,270 680,284 450,284" fill="#EDE7DC" stroke="#211C1D" strokeWidth="1.5" />
                  <rect x="450" y="284" width="230" height="6" fill="#D8CEBC" stroke="#211C1D" strokeWidth="1" />
                  <line x1="475" y1="290" x2="470" y2="340" stroke="#211C1D" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="665" y1="290" x2="670" y2="340" stroke="#211C1D" strokeWidth="1.5" strokeLinecap="round" />

                  {/* Open Daily Plan on Desk */}
                  <g transform="translate(530, 258)">
                    <rect x="0" y="0" width="64" height="20" rx="2" fill="#FAF7F2" stroke="#211C1D" strokeWidth="1.25" />
                    <line x1="6" y1="6" x2="32" y2="6" stroke="#722F37" strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="6" y1="11" x2="56" y2="11" stroke="#211C1D" strokeWidth="0.8" strokeOpacity="0.6" />
                    <line x1="6" y1="15" x2="46" y2="15" stroke="#211C1D" strokeWidth="0.8" strokeOpacity="0.6" />
                    <circle cx="56" cy="6" r="2" fill="#722F37" />
                  </g>

                  {/* Seated Student (Engaged, looking up attentively at Mentor & Plan) */}
                  <g transform="translate(480, 160)">
                    <ellipse cx="26" cy="24" rx="12" ry="15" fill="#E8DCC6" stroke="#211C1D" strokeWidth="1.5" />
                    <path d="M 15 19 C 15 9 24 6 36 8 C 40 11 39 19 37 24 C 32 19 26 19 19 21 Z" fill="#211C1D" />
                    <path d="M 24 38 L 24 46 L 30 46 L 30 38" fill="#E8DCC6" stroke="#211C1D" strokeWidth="1.25" />
                    {/* Torso */}
                    <path d="M 27 46 C 17 55 11 74 13 105 L 48 105 C 50 74 42 55 27 46 Z" fill="#D5CDC3" stroke="#211C1D" strokeWidth="1.5" />
                    {/* Hands on table attentively following the mentor's direction */}
                    <path d="M 24 58 L 36 88 L 62 104" stroke="#211C1D" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  </g>

                  {/* Mentor Leaning In — Actively Guiding, Supportive & Human */}
                  <g transform="translate(560, 100)">
                    {/* Mentor Head (Warm, focused, looking at study plan) */}
                    <ellipse cx="36" cy="24" rx="14" ry="17" fill="#E8DCC6" stroke="#211C1D" strokeWidth="1.5" />
                    {/* Hair & Trimmed Beard */}
                    <path d="M 24 18 C 24 6 34 3 48 6 C 52 10 51 16 49 22 C 44 16 37 16 30 18 Z" fill="#2E2325" />
                    <path d="M 30 32 C 32 38 40 38 42 32" stroke="#2E2325" strokeWidth="1.25" fill="none" />
                    {/* Spectacles / Glasses */}
                    <rect x="28" y="20" width="10" height="7" rx="2" fill="none" stroke="#211C1D" strokeWidth="1.2" />
                    <rect x="40" y="20" width="10" height="7" rx="2" fill="none" stroke="#211C1D" strokeWidth="1.2" />
                    <line x1="38" y1="23" x2="40" y2="23" stroke="#211C1D" strokeWidth="1" />

                    {/* Neck */}
                    <path d="M 33 40 L 33 48 L 41 48 L 41 40" fill="#E8DCC6" stroke="#211C1D" strokeWidth="1.25" />

                    {/* Tailored Burgundy Blazer (Leaning slightly forward towards student) */}
                    <path
                      d="M 37 48 C 20 62 14 100 16 170 L 64 170 C 66 100 58 62 37 48 Z"
                      fill="#722F37"
                      stroke="#211C1D"
                      strokeWidth="1.5"
                    />
                    {/* Inner Dark Shirt Collar */}
                    <polygon points="37,48 33,65 41,65" fill="#211C1D" />
                    <line x1="37" y1="65" x2="37" y2="120" stroke="#FAF7F2" strokeWidth="0.8" strokeOpacity="0.4" />

                    {/* Left Arm: Reaching over to place hand SUPPORTIVELY on student's shoulder */}
                    <path
                      d="M 20 65 C -2 80 -30 95 -48 106"
                      stroke="#722F37"
                      strokeWidth="9"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                    <path
                      d="M 20 65 C -2 80 -30 95 -48 106"
                      stroke="#211C1D"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                    {/* Mentor Hand resting gently on student's shoulder */}
                    <ellipse cx="-48" cy="106" rx="5" ry="4" fill="#E8DCC6" stroke="#211C1D" strokeWidth="1.2" />

                    {/* Right Arm: Pointing directly down to the student's study plan */}
                    <path
                      d="M 52 65 C 58 95 45 125 0 162"
                      stroke="#722F37"
                      strokeWidth="9"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                    <path
                      d="M 52 65 C 58 95 45 125 0 162"
                      stroke="#211C1D"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                    {/* Pointing finger directly over the study plan */}
                    <ellipse cx="-2" cy="164" rx="4" ry="3" fill="#E8DCC6" stroke="#211C1D" strokeWidth="1.2" />
                    <line x1="0" y1="164" x2="6" y2="167" stroke="#722F37" strokeWidth="1.5" strokeLinecap="round" />
                  </g>
                </g>

                {/* ------------------------------------------------------------- */}
                {/* THE BURGUNDY GUIDING LINE / THREAD (#722F37)                  */}
                {/* Connects: Confusion -> Node -> Mentor Table -> Clarity        */}
                {/* Elegant, subtle, continuous trajectory across the scene       */}
                {/* ------------------------------------------------------------- */}
                <g id="guiding-thread">
                  {/* Faint converging lines into node */}
                  <path
                    d="M 330 190 Q 380 230 415 255"
                    stroke="#B7A89A"
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                    fill="none"
                    opacity={stage2Active ? 0.7 : 0.4}
                  />

                  {/* Soft ambient thread halo */}
                  <path
                    d="M 415 255 C 470 260 510 268 560 268 C 640 268 720 270 820 270 C 920 270 980 272 1040 260 C 1080 250 1110 230 1135 210"
                    stroke="#722F37"
                    strokeWidth="6"
                    strokeOpacity="0.14"
                    strokeLinecap="round"
                    fill="none"
                  />

                  {/* Main Guiding Burgundy Thread: Solid, elegant, unbroken */}
                  <path
                    d="M 415 255 C 470 260 510 268 560 268 C 640 268 720 270 820 270 C 920 270 980 272 1040 260 C 1080 250 1110 230 1135 210"
                    stroke="#722F37"
                    strokeWidth="2.75"
                    strokeLinecap="round"
                    fill="none"
                  />

                  {/* Terminal Forward Arrow in Clarity */}
                  <path
                    d="M 1124 212 L 1136 210 L 1132 222"
                    stroke="#722F37"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </g>

                {/* ------------------------------------------------------------- */}
                {/* STAGE 03: CLARITY (Right: x ~ 820 - 1140)                     */}
                {/* Student upright, calm, smiling, writing neatly with checklist */}
                {/* ------------------------------------------------------------- */}
                <g
                  id="stage-clarity"
                  className="transition-all duration-700"
                  style={{
                    opacity: stage3Active ? 1 : 0.6,
                    transform: stage3Active ? "translateY(0)" : "translateY(4px)",
                  }}
                >
                  {/* Clean Study Desk */}
                  <polygon points="840,270 1080,270 1070,284 830,284" fill="#EDE7DC" stroke="#211C1D" strokeWidth="1.5" />
                  <rect x="830" y="284" width="240" height="6" fill="#D8CEBC" stroke="#211C1D" strokeWidth="1" />
                  <line x1="855" y1="290" x2="850" y2="340" stroke="#211C1D" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="1045" y1="290" x2="1050" y2="340" stroke="#211C1D" strokeWidth="1.5" strokeLinecap="round" />

                  {/* Clean Laptop on Left of Desk */}
                  <line x1="860" y1="270" x2="895" y2="270" stroke="#211C1D" strokeWidth="2" strokeLinecap="round" />
                  <line x1="870" y1="270" x2="865" y2="245" stroke="#211C1D" strokeWidth="1.5" strokeLinecap="round" />

                  {/* Small Potted Plant (Growth & Calm) */}
                  <rect x="1042" y="258" width="12" height="12" rx="1" fill="#B7A89A" stroke="#211C1D" strokeWidth="1" />
                  <circle cx="1048" cy="254" r="6" fill="#4A6B56" />
                  <circle cx="1052" cy="250" r="4" fill="#5B7E67" />

                  {/* Neatly Stacked Books on Desk */}
                  <rect x="1005" y="248" width="44" height="7" rx="1" fill="#FAF7F2" stroke="#211C1D" strokeWidth="1" />
                  <rect x="1004" y="255" width="46" height="7" rx="1" fill="#FAF7F2" stroke="#211C1D" strokeWidth="1" />
                  <rect x="1002" y="262" width="50" height="8" rx="1" fill="#722F37" stroke="#211C1D" strokeWidth="1" />

                  {/* Open Workbook Student is Actively Writing In */}
                  <polygon points="915,266 965,263 968,274 918,277" fill="#FAF7F2" stroke="#211C1D" strokeWidth="1" />
                  <line x1="922" y1="270" x2="940" y2="269" stroke="#722F37" strokeWidth="1" />
                  <line x1="943" y1="269" x2="958" y2="268" stroke="#211C1D" strokeWidth="0.8" />

                  {/* Chair */}
                  <path d="M 915 250 L 915 340 M 965 250 L 965 340 M 905 280 L 975 280" stroke="#211C1D" strokeWidth="1.5" strokeLinecap="round" />

                  {/* Seated Student (Upright, focused, calm confidence) */}
                  <g transform="translate(905, 150)">
                    {/* Head poised with quiet confidence */}
                    <ellipse cx="32" cy="22" rx="13" ry="16" fill="#E8DCC6" stroke="#211C1D" strokeWidth="1.5" />
                    {/* Clean hair */}
                    <path d="M 20 18 C 18 6 28 3 42 6 C 47 9 46 16 43 22 C 38 17 31 17 24 19 Z" fill="#211C1D" />
                    {/* Neck */}
                    <path d="M 30 38 L 30 45 L 36 45 L 36 38" fill="#E8DCC6" stroke="#211C1D" strokeWidth="1.25" />
                    {/* Torso upright */}
                    <path d="M 33 45 C 22 54 16 74 18 105 L 54 105 C 56 74 48 54 33 45 Z" fill="#D5CDC3" stroke="#211C1D" strokeWidth="1.5" />
                    {/* Left hand steadying the clean planner */}
                    <path d="M 24 58 L 14 88 L 28 108" stroke="#211C1D" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    {/* Right hand actively writing with smooth purpose */}
                    <path d="M 44 58 L 54 88 L 44 108" stroke="#211C1D" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    <line x1="44" y1="108" x2="48" y2="114" stroke="#722F37" strokeWidth="2" strokeLinecap="round" />
                  </g>

                  {/* Floating Structured Checklist Card */}
                  <g transform="translate(1025, 60)" filter="url(#chipShadow)">
                    <rect x="0" y="0" width="135" height="135" rx="10" fill="#FAF7F2" stroke="#211C1D" strokeOpacity="0.16" strokeWidth="1" />

                    {/* Checklist item 1 */}
                    <g transform="translate(12, 18)">
                      <circle cx="6" cy="6" r="6" fill="#722F37" />
                      <path d="M 4 6 L 5.5 7.5 L 8.5 4.5" stroke="#FAF7F2" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                      <text x="18" y="9.5" fill="#211C1D" fillOpacity="0.85" fontSize="10.5" fontFamily="sans-serif" fontWeight="500">
                        Daily Plan
                      </text>
                    </g>

                    {/* Checklist item 2 */}
                    <g transform="translate(12, 42)">
                      <circle cx="6" cy="6" r="6" fill="#722F37" />
                      <path d="M 4 6 L 5.5 7.5 L 8.5 4.5" stroke="#FAF7F2" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                      <text x="18" y="9.5" fill="#211C1D" fillOpacity="0.85" fontSize="10.5" fontFamily="sans-serif" fontWeight="500">
                        School Studies
                      </text>
                    </g>

                    {/* Checklist item 3 */}
                    <g transform="translate(12, 66)">
                      <circle cx="6" cy="6" r="6" fill="#722F37" />
                      <path d="M 4 6 L 5.5 7.5 L 8.5 4.5" stroke="#FAF7F2" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                      <text x="18" y="9.5" fill="#211C1D" fillOpacity="0.85" fontSize="10.5" fontFamily="sans-serif" fontWeight="500">
                        Competitive Prep
                      </text>
                    </g>

                    {/* Checklist item 4 */}
                    <g transform="translate(12, 90)">
                      <circle cx="6" cy="6" r="6" fill="#722F37" />
                      <path d="M 4 6 L 5.5 7.5 L 8.5 4.5" stroke="#FAF7F2" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                      <text x="18" y="9.5" fill="#211C1D" fillOpacity="0.85" fontSize="10.5" fontFamily="sans-serif" fontWeight="500">
                        Practice &amp; Revision
                      </text>
                    </g>

                    {/* Checklist item 5 */}
                    <g transform="translate(12, 114)">
                      <circle cx="6" cy="6" r="6" fill="#722F37" />
                      <path d="M 4 6 L 5.5 7.5 L 8.5 4.5" stroke="#FAF7F2" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                      <text x="18" y="9.5" fill="#211C1D" fillOpacity="0.85" fontSize="10.5" fontFamily="sans-serif" fontWeight="500">
                        Regular Mentorship
                      </text>
                    </g>
                  </g>
                </g>
              </svg>
            </div>

            {/* Desktop Three-Station Captions (Clean baseline directly below the scene) */}
            <div className="mt-6 pt-4 border-t border-[#211C1D]/10 grid grid-cols-3 gap-8">
              {/* Station 1: Distraction */}
              <div
                className={`space-y-1.5 transition-opacity duration-500 ${
                  stage3Active ? "opacity-60" : "opacity-95"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B7A89A]" />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#B7A89A]">
                    • 01 • Distraction
                  </span>
                </div>
                <h3 className="font-heading font-serif text-xl text-[#211C1D] font-normal">
                  Ambition Without Daily Structure
                </h3>
                <p className="text-xs text-[#211C1D]/70 font-sans leading-relaxed">
                  Open books, competing priorities, notifications, and uncertainty about where to begin.
                </p>
              </div>

              {/* Station 2: Guidance */}
              <div
                className={`space-y-1.5 transition-opacity duration-500 ${
                  stage2Active ? "opacity-100" : "opacity-50"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#722F37]" />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#722F37]">
                    • 02 • Mentor Guidance
                  </span>
                </div>
                <h3 className="font-heading font-serif text-xl text-[#211C1D] font-normal">
                  Personal Mentor Guidance
                </h3>
                <p className="text-xs text-[#211C1D]/70 font-sans leading-relaxed">
                  A dedicated mentor understands your goals, organizes your priorities, and helps you build a realistic daily plan.
                </p>
              </div>

              {/* Station 3: Clarity */}
              <div
                className={`space-y-1.5 transition-opacity duration-500 ${
                  stage3Active ? "opacity-100" : "opacity-50"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#722F37]" />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#722F37]">
                    • 03 • Clarity
                  </span>
                </div>
                <h3 className="font-heading font-serif text-xl text-[#211C1D] font-normal">
                  Clear Direction, Steady Progress
                </h3>
                <p className="text-xs text-[#211C1D]/70 font-sans leading-relaxed">
                  A structured routine, verified priorities, and the confidence to move forward consistently.
                </p>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* MOBILE VISUAL NARRATIVE (Vertical Editorial Flow with Downward Thread)     */}
          {/* ========================================================================= */}
          <div className="lg:hidden relative">
            <div className="relative p-2 sm:p-4 space-y-10">
              {/* Vertical Burgundy Guiding Spine */}
              <div
                className="absolute left-[23px] sm:left-[31px] top-6 bottom-6 w-[2px] bg-gradient-to-b from-[#B7A89A]/40 via-[#722F37] to-[#722F37] pointer-events-none"
                aria-hidden="true"
              />

              {/* Stage 1: Distraction */}
              <div className="relative flex items-start gap-5">
                <div className="relative z-10 w-7 h-7 rounded-full bg-[#FAF7F2] border-2 border-[#B7A89A] flex items-center justify-center shrink-0 shadow-sm mt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B7A89A]" />
                </div>
                <div className="space-y-3 flex-1">
                  <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-[#B7A89A]">
                    • 01 • Distraction
                  </span>
                  <h3 className="font-heading font-serif text-xl sm:text-2xl text-[#211C1D] font-normal leading-tight">
                    Ambition Without Daily Structure
                  </h3>
                  <p className="text-xs sm:text-sm text-[#211C1D]/75 font-sans leading-relaxed">
                    Students often possess high drive, but face competing syllabus priorities, unfinished task lists, phone interruptions, and uncertainty about where to begin.
                  </p>

                  {/* Thought chips preview */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-sans bg-[#211C1D]/5 text-[#211C1D]/75 border border-[#211C1D]/10">
                      Syllabus?
                    </span>
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-sans bg-[#211C1D]/5 text-[#211C1D]/75 border border-[#211C1D]/10">
                      Boards?
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-sans bg-[#722F37]/10 text-[#722F37] font-medium border border-[#722F37]/20">
                      Online Distraction <span className="w-1.5 h-1.5 rounded-full bg-[#722F37]" />
                    </span>
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-sans bg-[#211C1D]/5 text-[#211C1D]/75 border border-[#211C1D]/10">
                      Too much to do...
                    </span>
                  </div>
                </div>
              </div>

              {/* Stage 2: Mentor Guidance */}
              <div className="relative flex items-start gap-5">
                <div className="relative z-10 w-7 h-7 rounded-full bg-[#FAF7F2] border-2 border-[#722F37] flex items-center justify-center shrink-0 shadow-sm mt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#722F37]" />
                </div>
                <div className="space-y-3 flex-1">
                  <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-[#722F37]">
                    • 02 • Mentor Guidance
                  </span>
                  <h3 className="font-heading font-serif text-xl sm:text-2xl text-[#211C1D] font-normal leading-tight">
                    Personal Mentor Guidance
                  </h3>
                  <p className="text-xs sm:text-sm text-[#211C1D]/75 font-sans leading-relaxed">
                    A dedicated mentor personally reviews your daily study routine, identifies priorities, and helps build a realistic preparation plan.
                  </p>

                  <div className="p-3.5 rounded-xl bg-[#722F37]/[0.04] border border-[#722F37]/15 space-y-2">
                    <div className="flex items-center justify-between text-xs text-[#211C1D]/80 font-sans">
                      <span className="font-medium text-[#722F37]">• Daily 1-on-1 Evening Review</span>
                      <span className="text-[#722F37] font-semibold">Priority Set</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-[#211C1D]/70 font-sans">
                      <span>• Trajectories converge into one plan</span>
                      <span className="text-[#722F37] italic">Clear Focus</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stage 3: Clarity */}
              <div className="relative flex items-start gap-5">
                <div className="relative z-10 w-7 h-7 rounded-full bg-[#722F37] border-2 border-[#722F37] flex items-center justify-center shrink-0 shadow-sm mt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E8DCC6]" />
                </div>
                <div className="space-y-3 flex-1">
                  <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-[#722F37]">
                    • 03 • Clarity
                  </span>
                  <h3 className="font-heading font-serif text-xl sm:text-2xl text-[#211C1D] font-normal leading-tight">
                    Clear Direction, Steady Progress
                  </h3>
                  <p className="text-xs sm:text-sm text-[#211C1D]/75 font-sans leading-relaxed">
                    A clean desk, verified priorities, and the quiet certainty of knowing exactly what to do next.
                  </p>

                  <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#211C1D]/10 space-y-2">
                    <div className="flex items-center gap-2 text-xs text-[#211C1D]/90 font-sans">
                      <Check className="w-3.5 h-3.5 text-[#722F37] shrink-0" />
                      <span>Daily plan &amp; routine verified</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#211C1D]/90 font-sans">
                      <Check className="w-3.5 h-3.5 text-[#722F37] shrink-0" />
                      <span>School studies &amp; competitive prep balanced</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#211C1D]/90 font-sans">
                      <Check className="w-3.5 h-3.5 text-[#722F37] shrink-0" />
                      <span>Consistent evening accountability</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. PRIMARY BURGUNDY CTA (Restrained 3D elevation + magnetic interaction)  */}
        {/* ========================================================================= */}
        {onBookCall && (
          <div className="mt-12 sm:mt-16 text-center">
            <MagneticButton
              variant="burgundy"
              onClick={onBookCall}
              ariaLabel="Speak With a Mentor — Complimentary 20-minute consultation"
            >
              <span>Speak With a Mentor</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </MagneticButton>
            <p className="mt-3 text-xs text-[#B7A89A] font-sans">
              Complimentary 20-minute conversation. No marketing pressure.
            </p>
          </div>
        )}
      </div>

    </section>
  );
}
