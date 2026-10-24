"use client";

import React from "react";
import Link from "next/link";
import { Phone, Mail, Instagram, Linkedin } from "lucide-react";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200/80 text-slate-600 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-slate-100">
          
          {/* Col 1: Brand & Manifesto */}
          <div className="lg:col-span-2 space-y-4">
            <Logo variant="light" size="md" />
            <p className="font-heading italic text-slate-800 text-sm max-w-sm">
              &quot;Discipline today. Leadership tomorrow.&quot;
            </p>
            <p className="text-xs text-slate-500 leading-relaxed max-w-sm font-sans">
              Officium Supremum is a discipline-first learning academy committed to guiding students and defence aspirants through personalized study plans, daily accountability, and proven revision methods.
            </p>
            <div className="pt-2 flex items-center gap-3 text-xs font-label uppercase tracking-widest text-[#C8A84E]">
              <span>Habits &gt; Motivation</span>
              <span>•</span>
              <span>Daily Progress</span>
            </div>
          </div>

          {/* Col 2: Academics & Programs */}
          <div className="space-y-3">
            <h4 className="font-label uppercase tracking-wider text-xs font-semibold text-[#0B192C]">
              Programs
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/programs/juniors" className="hover:text-sky-700 transition-colors">
                  Juniors Program (Class 7–10)
                </Link>
              </li>
              <li>
                <Link href="/programs/scholars" className="hover:text-amber-700 transition-colors">
                  Scholars Program (Class 11–12)
                </Link>
              </li>
              <li>
                <Link href="/programs/defence" className="hover:text-emerald-800 transition-colors">
                  Defence Leadership (NDA / CDS / AFCAT)
                </Link>
              </li>
              <li>
                <Link href="/programs/defence" className="hover:text-emerald-800 transition-colors">
                  SSB &amp; 15 OLQs Mentorship
                </Link>
              </li>
              <li>
                <Link href="/programs/juniors#habits" className="hover:text-sky-700 transition-colors">
                  Daily Habits &amp; Focus Building
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Resource Library */}
          <div className="space-y-3">
            <h4 className="font-label uppercase tracking-wider text-xs font-semibold text-[#0B192C]">
              Study Library
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/resources" className="hover:text-[#C8A84E] transition-colors">
                  NDA Mathematics (30 Chapters)
                </Link>
              </li>
              <li>
                <Link href="/resources" className="hover:text-[#C8A84E] transition-colors">
                  CDS Mathematics (22 Chapters)
                </Link>
              </li>
              <li>
                <Link href="/resources" className="hover:text-[#C8A84E] transition-colors">
                  NDA &amp; CDS English (34 Chapters)
                </Link>
              </li>
              <li>
                <Link href="/resources/syllabus" className="hover:text-[#C8A84E] transition-colors">
                  UPSC Defence Exam Syllabus
                </Link>
              </li>
              <li>
                <Link href="/resources" className="hover:text-[#C8A84E] transition-colors">
                  Previous Years&apos; Solved Papers
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Admissions, Contact & Follow Us */}
          <div className="space-y-4">
            <div className="space-y-3">
              <h4 className="font-label uppercase tracking-wider text-xs font-semibold text-[#0B192C]">
                Mentorship Desk
              </h4>
              <div className="space-y-2.5 text-xs">
                <a
                  href="https://wa.me/918969634656"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-slate-700 hover:text-emerald-600 transition-colors"
                  aria-label="Contact Officium Supremum on WhatsApp (+91 8969634656)"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C8A84E]" />
                  <span>+91 8969634656 (WhatsApp)</span>
                </a>
                <a
                  href="mailto:osupremum@gmail.com"
                  className="flex items-center gap-2 text-slate-700 hover:text-[#0B192C] transition-colors"
                  aria-label="Email Officium Supremum at osupremum@gmail.com"
                >
                  <Mail className="w-3.5 h-3.5 text-[#C8A84E]" />
                  <span>osupremum@gmail.com</span>
                </a>
              </div>
            </div>

            {/* Follow Us */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <h4 className="font-label uppercase tracking-wider text-xs font-semibold text-[#0B192C]">
                Follow Us
              </h4>
              <div className="flex items-center gap-3">
                <a
                  href="https://www.instagram.com/officiumsupremum/?hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-pink-600 transition-colors"
                  aria-label="Officium Supremum on Instagram"
                >
                  <Instagram className="w-4 h-4 text-slate-500 hover:text-pink-600 transition-colors" />
                  <span>Instagram</span>
                </a>
                <span className="text-slate-300">•</span>
                <a
                  href="https://www.linkedin.com/company/officium-supremum/?viewAsMember=true"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-blue-700 transition-colors"
                  aria-label="Officium Supremum on LinkedIn"
                >
                  <Linkedin className="w-4 h-4 text-slate-500 hover:text-blue-700 transition-colors" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} Officium Supremum. All rights reserved. Discipline today. Leadership tomorrow.
          </div>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-6 gap-y-2 font-label uppercase text-[11px] tracking-widest text-slate-600">
            <Link href="/about" className="hover:text-slate-900">About Us</Link>
            <Link href="/contact" className="hover:text-slate-900">Contact Us</Link>
            <Link href="/resources" className="hover:text-slate-900">Study Library</Link>
            <Link href="/privacy" className="hover:text-slate-900">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-slate-900">Terms &amp; Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
