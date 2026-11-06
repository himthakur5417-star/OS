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
 * Grounded institutional conclusion in Forest Sage (#34483C),
 * Antique Sand (#B18A58), and Ivory Mist (#F3EFE6).
 */
export function ClosingCtaSection({ onBookCall }: ClosingCtaSectionProps) {
  return (
    <section
      id="closing-cta"
      aria-labelledby="closing-cta-heading"
      className="pt-24 sm:pt-28 lg:pt-32 pb-24 sm:pb-28 lg:pb-32 bg-[#34483C] text-[#F3EFE6] relative overflow-hidden border-t border-[#B18A58]/20"
    >
      {/* Subtle Institutional Tactile Texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(#F3EFE6 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center relative z-10 space-y-8 sm:space-y-10">

        {/* Institutional Mark */}
        <div className="flex justify-center opacity-90 hover:opacity-100 transition-opacity">
          <Logo variant="ivory" size="md" showText={true} />
        </div>

        {/* Editorial Headline & Supporting Copy */}
        <div className="space-y-4 sm:space-y-5 max-w-3xl mx-auto">
          <h2
            id="closing-cta-heading"
            className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#F3EFE6] leading-tight tracking-tight text-balance"
          >
            Build Consistent Daily Habits <br />
            <span className="font-serif italic font-normal text-[#B18A58]">
              Instead of Waiting for Motivation.
            </span>
          </h2>

          <p className="body-4 sm:body-2 text-[#D8D5C8]/85 max-w-xl mx-auto leading-relaxed text-pretty">
            Book a free 20-minute call to review your current study routine and get a clear, personalized preparation plan.
          </p>
        </div>

        {/* Primary and Secondary Actions */}
        <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5">
          <MagneticButton
            variant="sand"
            onClick={onBookCall}
            ariaLabel="Book a Free 20-Minute Call to review your study routine"
            className="w-full sm:w-auto min-w-[240px]"
          >
            <span>Book a Free 20 Minute Call</span>
          </MagneticButton>

          <MagneticButton
            variant="ivory"
            href="https://wa.me/918969634656"
            target="_blank"
            rel="noreferrer"
            ariaLabel="Chat on WhatsApp (+91 8969634656)"
            className="w-full sm:w-auto min-w-[240px]"
          >
            <span>Chat on WhatsApp (+91 8969634656)</span>
          </MagneticButton>
        </div>

      </div>
    </section>
  );
}
