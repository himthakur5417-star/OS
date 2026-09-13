"use client";

import React from "react";
import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
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
              Officium Supremum is a discipline-first learning academy committed to developing high-performance students, future leaders, and defense officers through active recall, academy routines, and structured accountability.
            </p>
            <div className="pt-2 flex items-center gap-3 text-xs font-label uppercase tracking-widest text-[#C8A84E]">
              <span>System &gt; Motivation</span>
              <span>•</span>
              <span>Accountability Daily</span>
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
                <Link href="/programs/defense" className="hover:text-emerald-800 transition-colors">
                  Defense Leadership (NDA/CDS)
                </Link>
              </li>
              <li>
                <Link href="/programs/defense#ssb" className="hover:text-emerald-800 transition-colors">
                  SSB &amp; 15 OLQs Mentorship
                </Link>
              </li>
              <li>
                <Link href="/programs/juniors#habits" className="hover:text-sky-700 transition-colors">
                  Habit &amp; Focus Architecture
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Resource Library */}
          <div className="space-y-3">
            <h4 className="font-label uppercase tracking-wider text-xs font-semibold text-[#0B192C]">
              Resource Vault
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/resources#nda-maths" className="hover:text-[#C8A84E] transition-colors">
                  NDA Mathematics (30 Chapters)
                </Link>
              </li>
              <li>
                <Link href="/resources#cds-maths" className="hover:text-[#C8A84E] transition-colors">
                  CDS Mathematics (Master Vol)
                </Link>
              </li>
              <li>
                <Link href="/resources#english" className="hover:text-[#C8A84E] transition-colors">
                  NDA &amp; CDS English (34 Chapters)
                </Link>
              </li>
              <li>
                <Link href="/resources#vocab" className="hover:text-[#C8A84E] transition-colors">
                  A to Z Vocabulary &amp; Word Power
                </Link>
              </li>
              <li>
                <Link href="/resources#pyq" className="hover:text-[#C8A84E] transition-colors">
                  2020–2026 PYQ Archive
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Admissions & Contact */}
          <div className="space-y-3">
            <h4 className="font-label uppercase tracking-wider text-xs font-semibold text-[#0B192C]">
              Admissions Desk
            </h4>
            <div className="space-y-2.5 text-xs">
              <a
                href="https://wa.me/918969634656"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-slate-700 hover:text-emerald-600 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#C8A84E]" />
                <span>+91 8969634656 (WhatsApp)</span>
              </a>
              <a
                href="mailto:osupremum@gmail.com"
                className="flex items-center gap-2 text-slate-700 hover:text-[#0B192C] transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#C8A84E]" />
                <span>osupremum@gmail.com</span>
              </a>
              <div className="flex items-start gap-2 text-slate-500">
                <MapPin className="w-3.5 h-3.5 text-[#C8A84E] shrink-0 mt-0.5" />
                <span>Mentorship Headquarters &amp; Live Digital Assessment</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} Officium Supremum. All rights reserved. A discipline-first academy.
          </div>
          <div className="flex items-center gap-6 font-label uppercase text-[11px] tracking-widest text-slate-600">
            <Link href="/about" className="hover:text-slate-900">Charter</Link>
            <Link href="/contact" className="hover:text-slate-900">Admissions</Link>
            <Link href="/resources" className="hover:text-slate-900">Study Vault</Link>
            <Link href="/dashboard" className="hover:text-slate-900">Cadet Portal</Link>
            <Link href="/admin/login" className="text-slate-400 hover:text-[#C8A84E] transition-colors">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
