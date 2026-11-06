"use client";

import { OfficiumGlassButton } from "@/src/shaders/officium-glass-button/OfficiumGlassButton";
import Link from "next/link";
import { useState } from "react";

export default function OfficiumGlassButtonDevPage() {
  const [clickCount, setClickCount] = useState(0);

  return (
    <main className="min-h-screen bg-[#211C1D] text-[#E8DCC6] flex flex-col items-center justify-center p-6 gap-8 font-sans">
      <div className="text-center max-w-lg space-y-3">
        <span className="text-xs uppercase tracking-widest text-[#B7A89A] font-mono">
          Stage E & F — Officium Supremum Adaptation
        </span>
        <h1 className="text-3xl font-display font-medium tracking-tight text-[#E8DCC6]">
          OfficiumGlassButton
        </h1>
        <p className="text-sm text-[#B7A89A] leading-relaxed">
          Deep Burgundy optical glass orb containing an illuminated Warm Cream guiding thread trajectory,
          precision arrow icon, and tactile Warm Cream / Burgundy particle burst.
        </p>
      </div>

      {/* Primary Signature Glass Button */}
      <div className="p-8 rounded-3xl bg-[#1A1617] border border-[#B7A89A]/15 shadow-2xl flex flex-col items-center gap-6">
        <OfficiumGlassButton
          label="EXPLORE PROGRAMS"
          href="#programs"
          onClick={() => setClickCount((c) => c + 1)}
          style={{ width: "260px", height: "72px" }}
        />

        <div className="text-xs font-mono text-[#B7A89A]">
          Activation Count: <span className="text-[#E8DCC6] font-bold">{clickCount}</span>
        </div>
      </div>

      <div className="flex gap-6 text-xs text-[#B7A89A]">
        <Link href="/dev/glass-ai-button" className="hover:text-[#E8DCC6] underline">
          &larr; View Reference (GlassAiButton)
        </Link>
        <Link href="/" className="hover:text-[#E8DCC6] underline">
          Return to Homepage &rarr;
        </Link>
      </div>

      {/* Target for smooth scroll verification */}
      <section id="programs" className="mt-16 pt-8 border-t border-[#B7A89A]/20 text-center">
        <h2 className="text-lg font-serif text-[#E8DCC6]">Target Anchor (#programs)</h2>
        <p className="text-xs text-[#B7A89A]">Successfully navigated here on button click.</p>
      </section>
    </main>
  );
}
