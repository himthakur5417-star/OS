"use client";

import React, { useRef, useState, useEffect } from "react";
import { usePrefersReducedMotion } from "@/lib/hooks/useMediaQuery";
import { ArrowRight, Check } from "@phosphor-icons/react";
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

  const pillars = [
    { title: "Direction", desc: "Knowing exactly what to finish before noon without second-guessing." },
    { title: "Accountability", desc: "Honest daily verification every evening before 10 PM." },
    { title: "Discipline", desc: "Building consistent daily routines over fleeting motivation." },
    { title: "Confidence", desc: "Mastering active recall and exam composure so knowledge holds." },
    { title: "Independent Thinking", desc: "Developing individual character to navigate your own future." },
  ];

  return (
    <section
      ref={containerRef}
      id="mentor-guidance"
      className="relative text-[#252923] pt-24 sm:pt-32 pb-24 sm:pb-32 overflow-hidden bg-[#F3EFE6] border-y border-[#D8D5C8]"
      aria-label="Why Mentorship Matters"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* ========================================================================= */}
        {/* 1. SECTION HEADER                                                         */}
        {/* ========================================================================= */}
        <div className="max-w-3xl mx-auto text-center space-y-5">
          <h2 className="heading-2 sm:heading-1 text-[#252923] font-semibold leading-tight tracking-tight text-balance">
            Talent Gives You Potential. <br />
            <span className="text-[#34483C] italic font-normal">
              Guidance Gives It Direction.
            </span>
          </h2>

          <p className="body-2 sm:body-1 text-[#252923]/75 max-w-2xl mx-auto leading-relaxed text-pretty font-sans pt-1">
            Students often know what they want to achieve, but not always what to do every day to reach it. A mentor brings clarity, helps correct mistakes early, keeps progress consistent, and provides calm direction when preparations feel demanding.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* 2. THE VISUAL STORYTELLING COMPOSITION (Distraction -> Guidance -> Clarity) */}
        {/* ========================================================================= */}
        <div className="mt-12 sm:mt-16">
          {/* DESKTOP & TABLET VISUAL NARRATIVE */}
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
                  <linearGradient id="mentorThreadGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#D8D5C8" stopOpacity="0.4" />
                    <stop offset="30%" stopColor="#B18A58" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#34483C" stopOpacity="1" />
                  </linearGradient>

                  <radialGradient id="mentorWarmAura" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#34483C" stopOpacity="0.12" />
                    <stop offset="60%" stopColor="#34483C" stopOpacity="0.03" />
                    <stop offset="100%" stopColor="#34483C" stopOpacity="0" />
                  </radialGradient>

                  <radialGradient id="mentorNodeGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#B18A58" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#B18A58" stopOpacity="0" />
                  </radialGradient>

                  <filter id="softGlowMentor" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>

                  <filter id="chipShadowMentor" x="-10%" y="-20%" width="120%" height="150%">
                    <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#252923" floodOpacity="0.08" />
                  </filter>
                </defs>

                {/* Ground Horizon Guideline */}
                <line
                  x1="60"
                  y1="340"
                  x2="1140"
                  y2="340"
                  stroke="#252923"
                  strokeOpacity="0.09"
                  strokeWidth="1"
                  strokeDasharray="4 6"
                />

                {/* STAGE 01: DISTRACTION (Left) */}
                <g
                  id="stage-distraction"
                  className="transition-opacity duration-700"
                  style={{ opacity: stage3Active ? 0.65 : 1 }}
                >
                  <g transform="translate(85, 65)" filter="url(#chipShadowMentor)">
                    <rect x="0" y="0" width="82" height="28" rx="14" fill="#F3EFE6" stroke="#252923" strokeOpacity="0.18" strokeWidth="1" />
                    <text x="41" y="18" textAnchor="middle" fill="#252923" fillOpacity="0.75" fontSize="11" fontFamily="sans-serif" fontWeight="500">
                      Syllabus?
                    </text>
                  </g>

                  <g transform="translate(155, 95)" filter="url(#chipShadowMentor)">
                    <rect x="0" y="0" width="76" height="28" rx="14" fill="#F3EFE6" stroke="#252923" strokeOpacity="0.18" strokeWidth="1" />
                    <text x="38" y="18" textAnchor="middle" fill="#252923" fillOpacity="0.75" fontSize="11" fontFamily="sans-serif" fontWeight="500">
                      Boards?
                    </text>
                  </g>

                  <g transform="translate(230, 75)" filter="url(#chipShadowMentor)">
                    <rect x="0" y="0" width="138" height="30" rx="15" fill="#F3EFE6" stroke="#B18A58" strokeOpacity="0.4" strokeWidth="1" />
                    <text x="56" y="19" textAnchor="middle" fill="#252923" fillOpacity="0.8" fontSize="11" fontFamily="sans-serif" fontWeight="500">
                      Online Distraction
                    </text>
                    <circle cx="120" cy="15" r="9" fill="#34483C" />
                    <text x="120" y="18.5" textAnchor="middle" fill="#F3EFE6" fontSize="9" fontFamily="sans-serif" fontWeight="700">
                      12
                    </text>
                  </g>

                  <g transform="translate(75, 125)" filter="url(#chipShadowMentor)">
                    <rect x="0" y="0" width="68" height="26" rx="13" fill="#F3EFE6" stroke="#252923" strokeOpacity="0.18" strokeWidth="1" />
                    <text x="34" y="17" textAnchor="middle" fill="#252923" fillOpacity="0.75" fontSize="11" fontFamily="sans-serif" fontWeight="500">
                      NDA?
                    </text>
                  </g>

                  <g transform="translate(285, 135)" filter="url(#chipShadowMentor)">
                    <rect x="0" y="0" width="88" height="28" rx="14" fill="#F3EFE6" stroke="#252923" strokeOpacity="0.18" strokeWidth="1" />
                    <text x="44" y="18" textAnchor="middle" fill="#252923" fillOpacity="0.75" fontSize="11" fontFamily="sans-serif" fontWeight="500">
                      What next?
                    </text>
                  </g>

                  <g transform="translate(295, 185)" filter="url(#chipShadowMentor)">
                    <rect x="0" y="0" width="112" height="28" rx="14" fill="#F3EFE6" stroke="#B18A58" strokeOpacity="0.35" strokeWidth="1" />
                    <text x="56" y="18" textAnchor="middle" fill="#34483C" fillOpacity="0.9" fontSize="11" fontFamily="sans-serif" fontWeight="500">
                      Too much to do...
                    </text>
                  </g>

                  {/* Divergent Faint Dashed Lines */}
                  <path d="M 126 93 C 140 140 180 180 230 190" stroke="#D8D5C8" strokeWidth="1.25" strokeDasharray="3 4" fill="none" />
                  <path d="M 193 123 C 210 155 240 180 280 190" stroke="#D8D5C8" strokeWidth="1.25" strokeDasharray="3 4" fill="none" />
                  <path d="M 109 151 C 120 180 160 210 210 220" stroke="#D8D5C8" strokeWidth="1.25" strokeDasharray="3 4" fill="none" />
                  <path d="M 299 105 C 340 140 370 190 415 255" stroke="#D8D5C8" strokeWidth="1.25" strokeDasharray="3 4" fill="none" />
                  <path d="M 329 163 C 360 190 385 225 415 255" stroke="#B18A58" strokeWidth="1.25" strokeDasharray="3 4" fill="none" strokeOpacity="0.6" />

                  {/* Study Desk */}
                  <polygon points="90,270 330,270 320,284 80,284" fill="#D8D5C8" stroke="#252923" strokeWidth="1.5" />
                  <rect x="80" y="284" width="240" height="6" fill="#C5C1B3" stroke="#252923" strokeWidth="1" />
                  <line x1="105" y1="290" x2="100" y2="340" stroke="#252923" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="295" y1="290" x2="300" y2="340" stroke="#252923" strokeWidth="1.5" strokeLinecap="round" />

                  {/* Seated Student (Contemplative) */}
                  <g transform="translate(175, 150)">
                    <ellipse cx="30" cy="24" rx="13" ry="16" fill="#F3EFE6" stroke="#252923" strokeWidth="1.5" transform="rotate(12 30 24)" />
                    <path d="M 18 18 C 16 8 26 4 38 6 C 44 9 44 17 41 23 C 36 17 29 17 22 20 Z" fill="#252923" />
                    <path d="M 28 38 L 28 46 L 34 46 L 34 38" fill="#F3EFE6" stroke="#252923" strokeWidth="1.25" />
                    <path d="M 31 46 C 18 55 12 76 14 110 L 50 110 C 52 76 44 55 31 46 Z" fill="#D8D5C8" stroke="#252923" strokeWidth="1.5" />
                    <path d="M 22 56 L 6 70 L 20 34" stroke="#252923" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    <path d="M 42 60 L 50 95 L 75 118" stroke="#252923" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  </g>
                </g>

                {/* STAGE 02: MENTOR GUIDANCE (Center) */}
                <g
                  id="stage-mentor"
                  className="transition-all duration-700"
                  style={{
                    opacity: stage2Active ? 1 : 0.65,
                    transform: stage2Active ? "translateY(0)" : "translateY(5px)",
                  }}
                >
                  <circle cx="580" cy="220" r="120" fill="url(#mentorWarmAura)" />

                  {/* Convergence Node */}
                  <circle cx="415" cy="255" r="16" fill="url(#mentorNodeGlow)" />
                  <circle cx="415" cy="255" r="5" fill="#34483C" filter="url(#softGlowMentor)" />
                  <circle cx="415" cy="255" r="2.5" fill="#F3EFE6" />

                  {/* Guidance Table */}
                  <polygon points="460,270 690,270 680,284 450,284" fill="#D8D5C8" stroke="#252923" strokeWidth="1.5" />
                  <rect x="450" y="284" width="230" height="6" fill="#C5C1B3" stroke="#252923" strokeWidth="1" />
                  <line x1="475" y1="290" x2="470" y2="340" stroke="#252923" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="665" y1="290" x2="670" y2="340" stroke="#252923" strokeWidth="1.5" strokeLinecap="round" />

                  {/* Open Daily Plan */}
                  <g transform="translate(530, 258)">
                    <rect x="0" y="0" width="64" height="20" rx="2" fill="#F3EFE6" stroke="#252923" strokeWidth="1.25" />
                    <line x1="6" y1="6" x2="32" y2="6" stroke="#34483C" strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="6" y1="11" x2="56" y2="11" stroke="#252923" strokeWidth="0.8" strokeOpacity="0.6" />
                    <line x1="6" y1="15" x2="46" y2="15" stroke="#252923" strokeWidth="0.8" strokeOpacity="0.6" />
                    <circle cx="56" cy="6" r="2" fill="#B18A58" />
                  </g>

                  {/* Seated Student Attentive */}
                  <g transform="translate(480, 160)">
                    <ellipse cx="26" cy="24" rx="12" ry="15" fill="#F3EFE6" stroke="#252923" strokeWidth="1.5" />
                    <path d="M 15 19 C 15 9 24 6 36 8 C 40 11 39 19 37 24 C 32 19 26 19 19 21 Z" fill="#252923" />
                    <path d="M 24 38 L 24 46 L 30 46 L 30 38" fill="#F3EFE6" stroke="#252923" strokeWidth="1.25" />
                    <path d="M 27 46 C 17 55 11 74 13 105 L 48 105 C 50 74 42 55 27 46 Z" fill="#D8D5C8" stroke="#252923" strokeWidth="1.5" />
                    <path d="M 24 58 L 36 88 L 62 104" stroke="#252923" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  </g>

                  {/* Mentor Leaning In — Forest Sage Blazer (#34483C) */}
                  <g transform="translate(560, 100)">
                    <ellipse cx="36" cy="24" rx="14" ry="17" fill="#F3EFE6" stroke="#252923" strokeWidth="1.5" />
                    <path d="M 24 18 C 24 6 34 3 48 6 C 52 10 51 16 49 22 C 44 16 37 16 30 18 Z" fill="#252923" />
                    <path d="M 30 32 C 32 38 40 38 42 32" stroke="#252923" strokeWidth="1.25" fill="none" />
                    <rect x="28" y="20" width="10" height="7" rx="2" fill="none" stroke="#252923" strokeWidth="1.2" />
                    <rect x="40" y="20" width="10" height="7" rx="2" fill="none" stroke="#252923" strokeWidth="1.2" />
                    <line x1="38" y1="23" x2="40" y2="23" stroke="#252923" strokeWidth="1" />

                    <path d="M 33 40 L 33 48 L 41 48 L 41 40" fill="#F3EFE6" stroke="#252923" strokeWidth="1.25" />

                    {/* Tailored Forest Sage Blazer */}
                    <path
                      d="M 37 48 C 20 62 14 100 16 170 L 64 170 C 66 100 58 62 37 48 Z"
                      fill="#34483C"
                      stroke="#252923"
                      strokeWidth="1.5"
                    />
                    <polygon points="37,48 33,65 41,65" fill="#252923" />
                    <line x1="37" y1="65" x2="37" y2="120" stroke="#F3EFE6" strokeWidth="0.8" strokeOpacity="0.4" />

                    {/* Left Arm: Supportive Hand on Student's Shoulder */}
                    <path
                      d="M 20 65 C -2 80 -30 95 -48 106"
                      stroke="#34483C"
                      strokeWidth="9"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                    <path
                      d="M 20 65 C -2 80 -30 95 -48 106"
                      stroke="#252923"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                    <ellipse cx="-48" cy="106" rx="5" ry="4" fill="#F3EFE6" stroke="#252923" strokeWidth="1.2" />

                    {/* Right Arm: Pointing down at Study Plan */}
                    <path
                      d="M 52 65 C 58 95 45 125 0 162"
                      stroke="#34483C"
                      strokeWidth="9"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                    <path
                      d="M 52 65 C 58 95 45 125 0 162"
                      stroke="#252923"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                    <ellipse cx="-2" cy="164" rx="4" ry="3" fill="#F3EFE6" stroke="#252923" strokeWidth="1.2" />
                    <line x1="0" y1="164" x2="6" y2="167" stroke="#B18A58" strokeWidth="1.5" strokeLinecap="round" />
                  </g>
                </g>

                {/* THE GUIDING THREAD: Antique Sand & Forest Sage */}
                <g id="guiding-thread">
                  <path
                    d="M 415 255 C 470 260 510 268 560 268 C 640 268 720 270 820 270 C 920 270 980 272 1040 260 C 1080 250 1110 230 1135 210"
                    stroke="#B18A58"
                    strokeWidth="2.75"
                    strokeLinecap="round"
                    fill="none"
                  />
                  <path
                    d="M 1124 212 L 1136 210 L 1132 222"
                    stroke="#34483C"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </g>

                {/* STAGE 03: CLARITY (Right) */}
                <g
                  id="stage-clarity"
                  className="transition-all duration-700"
                  style={{
                    opacity: stage3Active ? 1 : 0.65,
                    transform: stage3Active ? "translateY(0)" : "translateY(4px)",
                  }}
                >
                  <polygon points="840,270 1080,270 1070,284 830,284" fill="#D8D5C8" stroke="#252923" strokeWidth="1.5" />
                  <rect x="830" y="284" width="240" height="6" fill="#C5C1B3" stroke="#252923" strokeWidth="1" />
                  <line x1="855" y1="290" x2="850" y2="340" stroke="#252923" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="1045" y1="290" x2="1050" y2="340" stroke="#252923" strokeWidth="1.5" strokeLinecap="round" />

                  {/* Seated Student Confident */}
                  <g transform="translate(905, 150)">
                    <ellipse cx="32" cy="22" rx="13" ry="16" fill="#F3EFE6" stroke="#252923" strokeWidth="1.5" />
                    <path d="M 20 18 C 18 6 28 3 42 6 C 47 9 46 16 43 22 C 38 17 31 17 24 19 Z" fill="#252923" />
                    <path d="M 30 38 L 30 45 L 36 45 L 36 38" fill="#F3EFE6" stroke="#252923" strokeWidth="1.25" />
                    <path d="M 33 45 C 22 54 16 74 18 105 L 54 105 C 56 74 48 54 33 45 Z" fill="#D8D5C8" stroke="#252923" strokeWidth="1.5" />
                    <path d="M 24 58 L 14 88 L 28 108" stroke="#252923" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    <path d="M 44 58 L 54 88 L 44 108" stroke="#252923" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    <line x1="44" y1="108" x2="48" y2="114" stroke="#34483C" strokeWidth="2" strokeLinecap="round" />
                  </g>

                  {/* Floating Structured Checklist Card */}
                  <g transform="translate(1025, 60)" filter="url(#chipShadowMentor)">
                    <rect x="0" y="0" width="135" height="135" rx="10" fill="#F3EFE6" stroke="#252923" strokeOpacity="0.16" strokeWidth="1" />

                    {[
                      "Daily Plan",
                      "School Studies",
                      "Competitive Prep",
                      "Active Revision",
                      "Evening Check",
                    ].map((item, idx) => (
                      <g key={item} transform={`translate(12, ${18 + idx * 24})`}>
                        <circle cx="6" cy="6" r="6" fill="#34483C" />
                        <path d="M 4 6 L 5.5 7.5 L 8.5 4.5" stroke="#F3EFE6" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                        <text x="18" y="9.5" fill="#252923" fillOpacity="0.85" fontSize="10.5" fontFamily="sans-serif" fontWeight="500">
                          {item}
                        </text>
                      </g>
                    ))}
                  </g>
                </g>
              </svg>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. FIVE PILLARS OF MENTORSHIP                                             */}
        {/* ========================================================================= */}
        <div className="mt-14 sm:mt-18 pt-10 border-t border-[#D8D5C8] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {pillars.map((pillar, idx) => (
            <div key={pillar.title} className="space-y-1.5 p-4 rounded-2xl bg-white/60 border border-[#252923]/8">
              <div className="flex items-center gap-2">
                <span className="caption-3 font-semibold text-[#B18A58]">0{idx + 1}</span>
                <span className="caption-3 uppercase font-semibold text-[#34483C]">{pillar.title}</span>
              </div>
              <p className="caption-2 text-[#252923]/75 leading-relaxed">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        {onBookCall && (
          <div className="mt-12 sm:mt-16 text-center space-y-3">
            <MagneticButton
              variant="sage"
              onClick={onBookCall}
              ariaLabel="Speak With a Mentor — Complimentary 20-minute consultation"
            >
              <span>Speak With a Mentor</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" weight="bold" />
            </MagneticButton>
            <p className="caption-4 text-[#252923]/60">
              Complimentary 20-minute conversation. No marketing pressure.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
