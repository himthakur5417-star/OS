"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { homeFaqs } from "@/lib/faqData";

interface FaqSectionProps {
  onBookCall?: () => void;
}

export function FaqSection({ onBookCall }: FaqSectionProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="scroll-mt-24 sm:scroll-mt-32 pt-28 sm:pt-36 pb-28 sm:pb-36 relative overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 140% 50% at 50% 55%, rgba(183, 168, 154, 0.08) 0%, transparent 55%), linear-gradient(to bottom, #C18388 0%, #D6A7A8 12%, #E6C8C3 24%, #F2E2DD 36%, #FAF7F2 48%, #FAF7F2 72%, #F3EAE0 82%, #E5D5C3 91%, #D0BEA9 100%)",
      }}
      aria-labelledby="faq-heading"
    >
      {/* Subtle Warm Background Grain Texture for Tactile Editorial Depth */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(#211C1D 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">

        {/* ========================================================================= */}
        {/* SECTION HEADER                                                            */}
        {/* ========================================================================= */}
        <div className="text-center mb-14 sm:mb-16 space-y-3.5">
          <div className="inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#722F37]" />
            <span className="eyebrow text-[#722F37] tracking-[0.2em] text-[11px] sm:text-xs">
              Common Questions
            </span>
          </div>

          <h2 id="faq-heading" className="type-h2 text-[#211C1D]">
            Frequently Asked Questions
          </h2>

          <p className="text-sm sm:text-base text-[#211C1D]/75 max-w-xl mx-auto font-sans leading-relaxed">
            Clear guidance on our daily study discipline, evening progress checks, and personalized mentorship tracks for students and parents.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* ACCORDION ITEMS                                                           */}
        {/* ========================================================================= */}
        <div className="space-y-3.5 sm:space-y-4">
          {homeFaqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            const triggerId = `faq-trigger-${idx}`;
            const panelId = `faq-panel-${idx}`;

            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? "bg-white/95 border-[#722F37]/25 shadow-sm"
                    : "bg-white/65 hover:bg-white/85 border-[#211C1D]/10 hover:border-[#211C1D]/20 shadow-[0_2px_8px_rgba(33,28,29,0.02)]"
                }`}
              >
                <button
                  type="button"
                  id={triggerId}
                  onClick={() => toggleFaq(idx)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 text-[#211C1D] hover:text-[#722F37] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#722F37]/30 focus-visible:ring-offset-2 rounded-2xl group"
                >
                  <div className="flex items-start sm:items-center gap-3.5 sm:gap-4 pr-2">
                    <span className="font-serif text-xs text-[#722F37]/60 tracking-wider pt-0.5 sm:pt-0 shrink-0">
                      0{idx + 1}
                    </span>
                    <span className="font-serif font-medium text-base sm:text-lg text-[#211C1D] leading-snug group-hover:text-[#722F37] transition-colors">
                      {faq.q}
                    </span>
                  </div>

                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 ${
                      isOpen
                        ? "bg-[#722F37]/10 text-[#722F37]"
                        : "bg-[#211C1D]/5 text-[#B7A89A] group-hover:text-[#722F37] group-hover:bg-[#722F37]/5"
                    }`}
                  >
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                      aria-hidden="true"
                    />
                  </div>
                </button>

                {isOpen && (
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={triggerId}
                    className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-[15px] text-[#211C1D]/80 leading-relaxed font-sans border-t border-[#211C1D]/8 pl-12 sm:pl-14"
                  >
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* TEAM ATTRIBUTION & CLOSING TOUCHPOINT                                     */}
        {/* ========================================================================= */}
        <div className="mt-12 sm:mt-14 pt-8 border-t border-[#211C1D]/10 text-center space-y-2">
          <p className="text-xs sm:text-sm text-[#211C1D]/70 font-sans">
            Have a specific question about your preparation routine? We are glad to guide you.
          </p>
          <p className="font-serif italic text-xs sm:text-sm text-[#722F37]">
            — Mentorship Team, Officium Supremum
          </p>
        </div>

      </div>
    </section>
  );
}
