"use client";

import React from "react";
import { Logo } from "@/components/Logo";
import { MagneticButton } from "@/components/MagneticButton";

interface ClosingCtaSectionProps {
  onBookCall?: () => void;
}

/**
 * Closing Call-To-Action Section | Officium Supremum
 *
 * Grounded academic-editorial conclusion positioned between the FAQ accordion
 * and the dark footer (#211C1D).
 *
 * Features:
 * - Seamless gradient progression (#D0BEA9 -> #211C1D) connecting FAQ into Footer.
 * - Subtle paper grain texture overlay for tactile depth.
 * - Restrained Fraunces serif headline with balanced intentional line breaks.
 * - Unified raised CTA buttons with magnetic cursor physics and accessible states.
 * - Full responsive balance for 1440x900 desktop and 390x844 mobile viewports.
 */
export function ClosingCtaSection({ onBookCall }: ClosingCtaSectionProps) {
  return (
    <section
      id="closing-cta"
      aria-labelledby="closing-cta-heading"
      className="pt-20 sm:pt-24 lg:pt-28 pb-20 sm:pb-24 lg:pb-28 text-[#E8DCC6] relative overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 140% 50% at 50% 75%, rgba(114, 47, 55, 0.15) 0%, transparent 60%), linear-gradient(to bottom, #D0BEA9 0%, #A8937E 12%, #775F51 26%, #493638 42%, #292022 60%, #211C1D 72%, #211C1D 100%)",
      }}
    >
      {/* Subtle Warm Parchment Grain Texture for Tactile Editorial Depth */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(#E8DCC6 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center relative z-10">

        {/* Institutional Mark */}
        <div className="flex justify-center pb-6 sm:pb-8 opacity-85 hover:opacity-100 transition-opacity">
          <Logo variant="cream" size="sm" showText={true} />
        </div>

        {/* Editorial Headline & Supporting Copy */}
        <div className="space-y-4 sm:space-y-5 max-w-3xl mx-auto">
          <h2
            id="closing-cta-heading"
            className="font-serif font-normal text-2xl sm:text-3xl md:text-4xl lg:text-[42px] text-[#FAF7F2] leading-[1.22] sm:leading-[1.18] tracking-tight"
          >
            <span>Build Consistent Daily Habits</span>{" "}
            <span className="block mt-1 sm:mt-1.5 italic font-light text-[#E8DCC6]/90">
              Instead of Waiting for Motivation.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-[#B7A89A] max-w-xl mx-auto font-sans leading-relaxed">
            Book a free 20-minute call to review your current study routine and get a clear, personalized preparation plan.
          </p>
        </div>

        {/* Primary and Secondary Actions */}
        <div className="pt-8 sm:pt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5">
          <MagneticButton
            variant="burgundy"
            onClick={onBookCall}
            ariaLabel="Book a Free 20-Minute Call to review your study routine"
            className="w-full sm:w-auto min-w-[240px]"
          >
            <span>Book a Free 20-Minute Call</span>
          </MagneticButton>

          <MagneticButton
            variant="cream"
            href="https://wa.me/918969634656"
            target="_blank"
            rel="noreferrer"
            ariaLabel="Chat on WhatsApp (+91 8969634656)"
            className="w-full sm:w-auto min-w-[240px] !text-[#E8DCC6] !border-[#E8DCC6]/30 !bg-none !bg-white/[0.06] hover:!bg-white/[0.12] hover:!border-[#E8DCC6]/50 hover:!text-[#FAF7F2] !shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.12),0_6px_16px_-4px_rgba(0,0,0,0.4)] focus-visible:!ring-offset-[#211C1D]"
          >
            <span>Chat on WhatsApp (+91 8969634656)</span>
          </MagneticButton>
        </div>

      </div>
    </section>
  );
}
