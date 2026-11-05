"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, Mail, Instagram, Linkedin } from "lucide-react";
import { Logo } from "./Logo";

/**
 * Institutional Footer | Officium Supremum
 *
 * Calm, academic-editorial conclusion adhering strictly to the academy's
 * palette (solid dark #211C1D background, warm cream #FAF7F2 / #E8DCC6 typography,
 * and dusty-rose #C18388 accents).
 *
 * Features:
 * - Clear 5-column desktop architecture with natural tablet/mobile grouping.
 * - Restrained typography and WCAG 2.1 AA contrast for icons and link states.
 * - Comfortable mobile touch targets and zero horizontal overflow.
 * - Tactile paper grain overlay matching the preceding page sections.
 * - Complete preservation of all 15 navigation, library, social, and legal destinations.
 */
export function Footer() {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <footer
      className="bg-[#211C1D] text-[#E8DCC6] border-t border-[#E8DCC6]/10 pt-16 pb-12 sm:pb-16 relative overflow-hidden"
      role="contentinfo"
      aria-label="Footer"
    >
      {/* Subtle Warm Parchment Grain Texture for Tactile Depth */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: `radial-gradient(#E8DCC6 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ========================================================================= */}
        {/* PRIMARY FOOTER COLUMNS                                                    */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-8 pb-12 border-b border-[#E8DCC6]/10">

          {/* Col 1: Brand & Manifesto */}
          <div className="md:col-span-2 lg:col-span-2 space-y-4">
            <Logo variant="cream" size="md" />
            <p className="font-serif italic text-[#FAF7F2] text-sm sm:text-[15px] font-normal leading-snug max-w-sm">
              &quot;Discipline today. Leadership tomorrow.&quot;
            </p>
            <p className="text-xs sm:text-[13px] text-[#B7A89A] leading-relaxed max-w-sm font-sans">
              Officium Supremum is a discipline-first learning academy committed to guiding students and defence aspirants through personalized study plans, daily accountability, and proven revision methods.
            </p>
            <div className="pt-1 flex items-center gap-2.5 text-[11px] font-sans font-semibold uppercase tracking-[0.16em] text-[#B7A89A]">
              <span>Habits &gt; Motivation</span>
              <span className="w-1 h-1 rounded-full bg-[#C18388]" aria-hidden="true" />
              <span>Daily Progress</span>
            </div>
          </div>

          {/* Col 2: Academics & Programs */}
          <div className="space-y-3.5">
            <h4 className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-[#FAF7F2]">
              Programs
            </h4>
            <ul className="space-y-2 sm:space-y-2.5 text-xs sm:text-[13px]">
              <li>
                <Link
                  href="/programs/juniors"
                  className="text-[#B7A89A] hover:text-[#FAF7F2] transition-colors inline-block py-0.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E8DCC6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#211C1D] rounded-sm"
                >
                  Juniors Program (Class 7–10)
                </Link>
              </li>
              <li>
                <Link
                  href="/programs/scholars"
                  className="text-[#B7A89A] hover:text-[#FAF7F2] transition-colors inline-block py-0.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E8DCC6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#211C1D] rounded-sm"
                >
                  Scholars Program (Class 11–12)
                </Link>
              </li>
              <li>
                <Link
                  href="/programs/defence"
                  className="text-[#B7A89A] hover:text-[#FAF7F2] transition-colors inline-block py-0.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E8DCC6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#211C1D] rounded-sm"
                >
                  Defence Leadership (NDA / CDS / AFCAT)
                </Link>
              </li>
              <li>
                <Link
                  href="/programs/defence"
                  className="text-[#B7A89A] hover:text-[#FAF7F2] transition-colors inline-block py-0.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E8DCC6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#211C1D] rounded-sm"
                >
                  SSB &amp; 15 OLQs Mentorship
                </Link>
              </li>
              <li>
                <Link
                  href="/programs/juniors#habits"
                  className="text-[#B7A89A] hover:text-[#FAF7F2] transition-colors inline-block py-0.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E8DCC6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#211C1D] rounded-sm"
                >
                  Daily Habits &amp; Focus Building
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Resource Library */}
          <div className="space-y-3.5">
            <h4 className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-[#FAF7F2]">
              Study Library
            </h4>
            <ul className="space-y-2 sm:space-y-2.5 text-xs sm:text-[13px]">
              <li>
                <Link
                  href="/resources/nda-mathematics"
                  className="text-[#B7A89A] hover:text-[#FAF7F2] transition-colors inline-block py-0.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E8DCC6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#211C1D] rounded-sm"
                >
                  NDA Mathematics (30 Chapters)
                </Link>
              </li>
              <li>
                <Link
                  href="/resources/cds-mathematics"
                  className="text-[#B7A89A] hover:text-[#FAF7F2] transition-colors inline-block py-0.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E8DCC6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#211C1D] rounded-sm"
                >
                  CDS Mathematics (22 Chapters)
                </Link>
              </li>
              <li>
                <Link
                  href="/resources/nda-cds-english"
                  className="text-[#B7A89A] hover:text-[#FAF7F2] transition-colors inline-block py-0.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E8DCC6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#211C1D] rounded-sm"
                >
                  NDA &amp; CDS English (34 Chapters)
                </Link>
              </li>
              <li>
                <Link
                  href="/resources/syllabus"
                  className="text-[#B7A89A] hover:text-[#FAF7F2] transition-colors inline-block py-0.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E8DCC6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#211C1D] rounded-sm"
                >
                  UPSC Defence Exam Syllabus
                </Link>
              </li>
              <li>
                <Link
                  href="/resources/previous-year-papers"
                  className="text-[#B7A89A] hover:text-[#FAF7F2] transition-colors inline-block py-0.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E8DCC6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#211C1D] rounded-sm"
                >
                  Previous Years&apos; Solved Papers
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Mentorship Desk & Follow Us */}
          <div className="space-y-5">
            {/* Mentorship Desk Contacts */}
            <div className="space-y-3">
              <h4 className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-[#FAF7F2]">
                Mentorship Desk
              </h4>
              <div className="space-y-2.5 text-xs sm:text-[13px]">
                <a
                  href="https://wa.me/918969634656"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-[#B7A89A] hover:text-[#FAF7F2] transition-colors py-0.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E8DCC6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#211C1D] rounded-sm group"
                  aria-label="Contact Officium Supremum on WhatsApp (+91 8969634656)"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C18388] shrink-0 group-hover:text-[#FAF7F2] transition-colors" />
                  <span>+91 8969634656 (WhatsApp)</span>
                </a>
                <a
                  href="mailto:osupremum@gmail.com"
                  className="flex items-center gap-2.5 text-[#B7A89A] hover:text-[#FAF7F2] transition-colors py-0.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E8DCC6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#211C1D] rounded-sm group"
                  aria-label="Email Officium Supremum at osupremum@gmail.com"
                >
                  <Mail className="w-3.5 h-3.5 text-[#C18388] shrink-0 group-hover:text-[#FAF7F2] transition-colors" />
                  <span>osupremum@gmail.com</span>
                </a>
              </div>
            </div>

            {/* Follow Us Social Links */}
            <div className="space-y-2.5 pt-3 border-t border-[#E8DCC6]/10">
              <h4 className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-[#FAF7F2]">
                Follow Us
              </h4>
              <div className="flex items-center gap-3 text-xs sm:text-[13px]">
                <a
                  href="https://www.instagram.com/officiumsupremum/?hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-[#B7A89A] hover:text-[#FAF7F2] transition-colors py-0.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E8DCC6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#211C1D] rounded-sm group"
                  aria-label="Officium Supremum on Instagram"
                >
                  <Instagram className="w-4 h-4 text-[#C18388] group-hover:text-[#FAF7F2] transition-colors shrink-0" />
                  <span>Instagram</span>
                </a>
                <span className="w-1 h-1 rounded-full bg-[#C18388]" aria-hidden="true" />
                <a
                  href="https://www.linkedin.com/company/officium-supremum/?viewAsMember=true"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-[#B7A89A] hover:text-[#FAF7F2] transition-colors py-0.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E8DCC6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#211C1D] rounded-sm group"
                  aria-label="Officium Supremum on LinkedIn"
                >
                  <Linkedin className="w-4 h-4 text-[#C18388] group-hover:text-[#FAF7F2] transition-colors shrink-0" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* BOTTOM COPYRIGHT & LEGAL NAVIGATION BAR                                   */}
        {/* ========================================================================= */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 text-xs text-[#B7A89A]">
          <div className="text-center sm:text-left leading-relaxed">
            &copy; {new Date().getFullYear()} Officium Supremum. All rights reserved.{" "}
            <span className="block sm:inline sm:ml-1 text-[#B7A89A]/80">
              Discipline today. Leadership tomorrow.
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-5 sm:gap-x-6 gap-y-2 font-sans uppercase text-[11px] font-medium tracking-[0.14em] text-[#B7A89A]">
            <Link
              href="/about"
              className="hover:text-[#FAF7F2] transition-colors py-0.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E8DCC6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#211C1D] rounded-sm"
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className="hover:text-[#FAF7F2] transition-colors py-0.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E8DCC6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#211C1D] rounded-sm"
            >
              Contact Us
            </Link>
            <Link
              href="/resources"
              className="hover:text-[#FAF7F2] transition-colors py-0.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E8DCC6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#211C1D] rounded-sm"
            >
              Study Library
            </Link>
            <Link
              href="/privacy"
              className="hover:text-[#FAF7F2] transition-colors py-0.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E8DCC6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#211C1D] rounded-sm"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-[#FAF7F2] transition-colors py-0.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E8DCC6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#211C1D] rounded-sm"
            >
              Terms &amp; Conditions
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
