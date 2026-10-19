"use client";

import React from "react";
import Link from "next/link";
import SyllabusDossier from "@/components/SyllabusDossier";
import { BookOpen, ArrowLeft } from "lucide-react";

export default function SyllabusPage() {
  return (
    <div className="bg-[#FAFAF9] text-[#0F172A] min-h-screen">
      {/* Page Header */}
      <section className="relative pt-24 pb-12 lg:pt-32 lg:pb-16 border-b border-slate-200/60 bg-gradient-to-b from-white to-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4">
            <Link
              href="/resources"
              className="inline-flex items-center gap-2 text-xs font-label uppercase tracking-wider text-slate-500 hover:text-[#0B192C] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Study Library</span>
            </Link>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-label uppercase tracking-widest text-slate-700 shadow-sm w-fit">
              <BookOpen className="w-3.5 h-3.5 text-[#C8A84E]" />
              <span>UPSC Defence Exam Syllabus &amp; Exam Pattern</span>
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl font-semibold tracking-tight text-[#0B192C]">
              Complete Syllabus &amp; Exam Pattern
            </h1>
            <p className="text-sm sm:text-base text-slate-600 font-sans max-w-2xl leading-relaxed">
              Detailed syllabus topics, exam patterns, marks distribution, and SSB interview details for NDA and CDS examinations.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <SyllabusDossier initialTrack="nda" />
      </section>
    </div>
  );
}
