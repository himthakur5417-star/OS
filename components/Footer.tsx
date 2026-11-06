"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Phone,
  EnvelopeSimple,
  InstagramLogo,
  LinkedinLogo,
} from "@phosphor-icons/react";
import { Logo } from "./Logo";

/**
 * Institutional Footer | Officium Supremum
 *
 * Grounded in Charcoal (#252923), Ivory Mist (#F3EFE6), and Antique Sand (#B18A58).
 * Preserves all 15 navigation, library, social, and legal destinations.
 */
export function Footer() {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <footer
      className="bg-[#252923] text-[#F3EFE6] border-t border-[#D8D5C8]/15 pt-16 pb-12 sm:pb-16 relative overflow-hidden"
      role="contentinfo"
      aria-label="Footer"
    >
      {/* Subtle Tactile Grain */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(#F3EFE6 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* PRIMARY FOOTER COLUMNS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-8 pb-12 border-b border-[#D8D5C8]/15">

          {/* Col 1: Brand & Manifesto */}
          <div className="md:col-span-2 lg:col-span-2 space-y-4">
            <Logo variant="ivory" size="md" />
            {/* Placement 2 — Footer: The only other Hindi text on the entire website */}
            <p className="font-tiro text-lg text-[#B18A58] leading-relaxed font-normal">
              &ldquo;सही दिशा, बेहतर भविष्य।&rdquo;
            </p>
            <p className="caption-1 sm:body-4 text-[#D8D5C8] leading-relaxed max-w-sm text-pretty">
              Officium Supremum is a discipline-first learning academy committed to guiding students and defence aspirants through personalized study plans, daily accountability, and proven revision methods.
            </p>
            <div className="pt-1 flex items-center gap-2.5 caption-3 uppercase tracking-[0.16em] text-[#D8D5C8]/75">
              <span>Habits &gt; Motivation</span>
              <span className="w-1 h-1 rounded-full bg-[#B18A58]" aria-hidden="true" />
              <span>Daily Progress</span>
            </div>
          </div>

          {/* Col 2: Academics & Programs */}
          <div className="space-y-3.5">
            <h4 className="caption-3 uppercase tracking-[0.18em] font-semibold text-[#F3EFE6]">
              Programs
            </h4>
            <ul className="space-y-2 sm:space-y-2.5 caption-2">
              <li>
                <Link
                  href="/programs/juniors"
                  className="text-[#D8D5C8] hover:text-[#F3EFE6] transition-colors inline-block py-0.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B18A58] rounded-sm"
                >
                  Juniors Program (Class 7–10)
                </Link>
              </li>
              <li>
                <Link
                  href="/programs/scholars"
                  className="text-[#D8D5C8] hover:text-[#F3EFE6] transition-colors inline-block py-0.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B18A58] rounded-sm"
                >
                  Scholars Program (Class 11–12)
                </Link>
              </li>
              <li>
                <Link
                  href="/programs/defence"
                  className="text-[#D8D5C8] hover:text-[#F3EFE6] transition-colors inline-block py-0.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B18A58] rounded-sm"
                >
                  Defence Leadership (NDA / CDS / AFCAT)
                </Link>
              </li>
              <li>
                <Link
                  href="/programs/defence"
                  className="text-[#D8D5C8] hover:text-[#F3EFE6] transition-colors inline-block py-0.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B18A58] rounded-sm"
                >
                  SSB &amp; 15 OLQs Mentorship
                </Link>
              </li>
              <li>
                <Link
                  href="/programs/juniors#habits"
                  className="text-[#D8D5C8] hover:text-[#F3EFE6] transition-colors inline-block py-0.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B18A58] rounded-sm"
                >
                  Daily Habits &amp; Focus Building
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Resource Library */}
          <div className="space-y-3.5">
            <h4 className="caption-3 uppercase tracking-[0.18em] font-semibold text-[#F3EFE6]">
              Study Library
            </h4>
            <ul className="space-y-2 sm:space-y-2.5 caption-2">
              <li>
                <Link
                  href="/resources/nda-mathematics"
                  className="text-[#D8D5C8] hover:text-[#F3EFE6] transition-colors inline-block py-0.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B18A58] rounded-sm"
                >
                  NDA Mathematics (30 Chapters)
                </Link>
              </li>
              <li>
                <Link
                  href="/resources/cds-mathematics"
                  className="text-[#D8D5C8] hover:text-[#F3EFE6] transition-colors inline-block py-0.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B18A58] rounded-sm"
                >
                  CDS Mathematics (22 Chapters)
                </Link>
              </li>
              <li>
                <Link
                  href="/resources/nda-cds-english"
                  className="text-[#D8D5C8] hover:text-[#F3EFE6] transition-colors inline-block py-0.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B18A58] rounded-sm"
                >
                  NDA &amp; CDS English (34 Chapters)
                </Link>
              </li>
              <li>
                <Link
                  href="/resources/syllabus"
                  className="text-[#D8D5C8] hover:text-[#F3EFE6] transition-colors inline-block py-0.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B18A58] rounded-sm"
                >
                  UPSC Defence Exam Syllabus (Free)
                </Link>
              </li>
              <li>
                <Link
                  href="/resources/previous-year-papers"
                  className="text-[#D8D5C8] hover:text-[#F3EFE6] transition-colors inline-block py-0.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B18A58] rounded-sm"
                >
                  Previous Years&apos; Solved Papers (Free)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Mentorship Desk & Follow Us */}
          <div className="space-y-5">
            <div className="space-y-3">
              <h4 className="caption-3 uppercase tracking-[0.18em] font-semibold text-[#F3EFE6]">
                Mentorship Desk
              </h4>
              <div className="space-y-2.5 caption-2">
                <a
                  href="https://wa.me/918969634656"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-[#D8D5C8] hover:text-[#F3EFE6] transition-colors py-0.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B18A58] rounded-sm group"
                  aria-label="Contact Officium Supremum on WhatsApp (+91 8969634656)"
                >
                  <Phone className="w-4 h-4 text-[#B18A58] shrink-0 group-hover:text-[#F3EFE6] transition-colors" weight="bold" />
                  <span>+91 8969634656 (WhatsApp)</span>
                </a>
                <a
                  href="mailto:osupremum@gmail.com"
                  className="flex items-center gap-2.5 text-[#D8D5C8] hover:text-[#F3EFE6] transition-colors py-0.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B18A58] rounded-sm group"
                  aria-label="Email Officium Supremum at osupremum@gmail.com"
                >
                  <EnvelopeSimple className="w-4 h-4 text-[#B18A58] shrink-0 group-hover:text-[#F3EFE6] transition-colors" weight="bold" />
                  <span>osupremum@gmail.com</span>
                </a>
              </div>
            </div>

            {/* Follow Us */}
            <div className="space-y-2.5 pt-3 border-t border-[#D8D5C8]/15">
              <h4 className="caption-3 uppercase tracking-[0.18em] font-semibold text-[#F3EFE6]">
                Follow Us
              </h4>
              <div className="flex items-center gap-3 caption-2">
                <a
                  href="https://www.instagram.com/officiumsupremum/?hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-[#D8D5C8] hover:text-[#F3EFE6] transition-colors py-0.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B18A58] rounded-sm group"
                  aria-label="Officium Supremum on Instagram"
                >
                  <InstagramLogo className="w-4 h-4 text-[#B18A58] group-hover:text-[#F3EFE6] transition-colors shrink-0" weight="bold" />
                  <span>Instagram</span>
                </a>
                <span className="w-1 h-1 rounded-full bg-[#B18A58]" aria-hidden="true" />
                <a
                  href="https://www.linkedin.com/company/officium-supremum/?viewAsMember=true"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-[#D8D5C8] hover:text-[#F3EFE6] transition-colors py-0.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B18A58] rounded-sm group"
                  aria-label="Officium Supremum on LinkedIn"
                >
                  <LinkedinLogo className="w-4 h-4 text-[#B18A58] group-hover:text-[#F3EFE6] transition-colors shrink-0" weight="bold" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM COPYRIGHT & LEGAL NAVIGATION BAR */}
        <div className="pt-8 flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-6 text-xs text-[#D8D5C8]/80">
          <div className="text-center lg:text-left leading-relaxed">
            &copy; {new Date().getFullYear()} Officium Supremum. All rights reserved.{" "}
            <span className="block sm:inline sm:ml-1 text-[#D8D5C8]/60">
              Discipline today. Leadership tomorrow.
            </span>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center justify-center lg:justify-end gap-x-4 sm:gap-x-5 gap-y-1.5 text-[11px] uppercase tracking-[0.12em] font-medium text-[#D8D5C8]/80 whitespace-nowrap">
            <Link
              href="/about"
              className="hover:text-[#F3EFE6] transition-colors py-0.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B18A58] rounded-sm"
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className="hover:text-[#F3EFE6] transition-colors py-0.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B18A58] rounded-sm"
            >
              Contact Us
            </Link>
            <Link
              href="/privacy"
              className="hover:text-[#F3EFE6] transition-colors py-0.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B18A58] rounded-sm"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-[#F3EFE6] transition-colors py-0.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B18A58] rounded-sm"
            >
              Terms &amp; Conditions
            </Link>
            <Link
              href="/refund-policy"
              className="hover:text-[#F3EFE6] transition-colors py-0.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B18A58] rounded-sm"
            >
              Refund Policy
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
