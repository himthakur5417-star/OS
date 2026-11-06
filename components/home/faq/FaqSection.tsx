"use client";

import React, { useState } from "react";
import { CaretDown } from "@phosphor-icons/react";
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
      className="scroll-mt-24 sm:scroll-mt-32 pt-24 sm:pt-32 pb-24 sm:pb-32 bg-[#F3EFE6] text-[#252923] relative overflow-hidden border-t border-[#D8D5C8]"
      aria-labelledby="faq-heading"
    >
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* ========================================================================= */}
        {/* SECTION HEADER                                                            */}
        {/* ========================================================================= */}
        <div className="text-center mb-14 sm:mb-16 space-y-3.5">
          <h2 id="faq-heading" className="heading-2 sm:heading-1 text-[#252923] text-balance">
            Frequently Asked Questions
          </h2>

          <p className="body-4 sm:body-2 text-[#252923]/75 max-w-xl mx-auto leading-relaxed text-pretty">
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
                    ? "bg-white border-[#34483C]/30 shadow-sm"
                    : "bg-white/70 hover:bg-white border-[#D8D5C8] shadow-[0_2px_6px_rgba(37,41,35,0.02)]"
                }`}
              >
                <button
                  type="button"
                  id={triggerId}
                  onClick={() => toggleFaq(idx)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 text-[#252923] hover:text-[#34483C] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#34483C] focus-visible:ring-offset-2 rounded-2xl group"
                >
                  <div className="flex items-start sm:items-center gap-3.5 sm:gap-4 pr-2">
                    <span className="caption-3 text-[#B18A58] tracking-wider pt-0.5 sm:pt-0 shrink-0 font-semibold">
                      0{idx + 1}
                    </span>
                    <span className="title-2 sm:title-1 font-medium text-[#252923] leading-snug group-hover:text-[#34483C] transition-colors">
                      {faq.q}
                    </span>
                  </div>

                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 ${
                      isOpen
                        ? "bg-[#34483C] text-[#F3EFE6]"
                        : "bg-[#D8D5C8]/40 text-[#252923]/60 group-hover:text-[#34483C] group-hover:bg-[#34483C]/10"
                    }`}
                  >
                    <CaretDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                      weight="bold"
                      aria-hidden="true"
                    />
                  </div>
                </button>

                {isOpen && (
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={triggerId}
                    className="px-5 sm:px-6 pb-6 pt-1 body-4 sm:body-3 text-[#252923]/80 leading-relaxed border-t border-[#D8D5C8]/50 pl-12 sm:pl-14 text-pretty"
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
        <div className="mt-12 sm:mt-14 pt-8 border-t border-[#D8D5C8] text-center space-y-2">
          <p className="caption-1 text-[#252923]/70">
            Have a specific question about your preparation routine? We are glad to guide you.
          </p>
          <p className="caption-3 uppercase tracking-wider text-[#34483C] font-semibold">
            — Mentorship Team, Officium Supremum
          </p>
        </div>

      </div>
    </section>
  );
}
