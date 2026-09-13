"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Sparkles, Shield, Bookmark } from "lucide-react";
import Link from "next/link";

interface BookData {
  id: string;
  title: string;
  subtitle: string;
  volume: string;
  badge: string;
  colorScheme: {
    bg: string;
    border: string;
    text: string;
    accent: string;
    spine: string;
  };
  link: string;
}

const BOOKS: BookData[] = [
  {
    id: "nda-maths",
    title: "NDA Mathematics",
    subtitle: "30 Chapters • 4,330+ Drill Problems",
    volume: "Master Volume I",
    badge: "Essential Core",
    colorScheme: {
      bg: "bg-gradient-to-br from-[#1E293B] via-[#0F172A] to-[#0A101D]",
      border: "border-amber-400/40",
      text: "text-white",
      accent: "text-[#C8A84E]",
      spine: "bg-[#0A101D]",
    },
    link: "/resources#nda-maths",
  },
  {
    id: "cds-maths",
    title: "CDS Mathematics",
    subtitle: "383-Page Arithmetic & Advance Master",
    volume: "Volume II",
    badge: "Officer Standard",
    colorScheme: {
      bg: "bg-gradient-to-br from-[#1E3A5F] via-[#152843] to-[#0D1929]",
      border: "border-sky-300/40",
      text: "text-white",
      accent: "text-sky-300",
      spine: "bg-[#0D1929]",
    },
    link: "/resources#cds-maths",
  },
  {
    id: "english-vocab",
    title: "A to Z Vocabulary",
    subtitle: "1,200+ Words • 26 Modules (A-Z)",
    volume: "Word Power",
    badge: "High Recall",
    colorScheme: {
      bg: "bg-gradient-to-br from-[#2D2A26] via-[#1C1A17] to-[#12110F]",
      border: "border-[#C8A84E]/50",
      text: "text-white",
      accent: "text-[#E3C978]",
      spine: "bg-[#12110F]",
    },
    link: "/resources#vocab",
  },
];

export function Floating3DBooks() {
  const [hoveredBook, setHoveredBook] = useState<string | null>(null);

  return (
    <div className="relative w-full py-10 flex items-center justify-center">
      {/* Soft Multi-Layered Shadows & Ambient Blur */}
      <div className="absolute inset-0 bg-gradient-to-r from-sky-50/40 via-amber-50/30 to-rose-50/30 rounded-3xl blur-3xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 max-w-5xl w-full px-4">
        {BOOKS.map((book, idx) => {
          const isHovered = hoveredBook === book.id;
          
          return (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              animate={{
                y: [0, idx % 2 === 0 ? -8 : -12, 0],
              }}
              // @ts-ignore
              transition2={{
                repeat: Infinity,
                duration: 5 + idx,
                ease: "easeInOut",
              }}
              onMouseEnter={() => setHoveredBook(book.id)}
              onMouseLeave={() => setHoveredBook(null)}
              className="relative group perspective-1000"
            >
              {/* 3D Book Container */}
              <div 
                className={`relative h-[340px] rounded-2xl p-6 sm:p-7 ${book.colorScheme.bg} border ${book.colorScheme.border} shadow-[0_20px_45px_-12px_rgba(15,23,42,0.22)] transition-all duration-500 transform-gpu flex flex-col justify-between overflow-hidden cursor-pointer ${
                  isHovered ? "rotate-y-0 -translate-y-3 shadow-[0_30px_60px_-15px_rgba(15,23,42,0.3)] scale-[1.03]" : "rotate-y-[-8deg] rotate-x-[4deg]"
                }`}
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Book Spine 3D Effect on Left */}
                <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-black/40 via-black/20 to-transparent border-r border-white/10" />

                {/* Foil Bookmark Ribbon */}
                <div className="absolute top-0 right-6 w-5 h-10 bg-gradient-to-b from-[#C8A84E] to-[#A38431] shadow-md rounded-b-sm flex items-end justify-center pb-1">
                  <div className="w-2 h-2 rounded-full bg-white/60" />
                </div>

                {/* Top Badge & Volume */}
                <div className="pl-2 space-y-1">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C8A84E]" />
                    <span className="font-label text-[10px] uppercase tracking-widest text-[#C8A84E] font-semibold">
                      {book.volume}
                    </span>
                  </div>
                  <div className="font-label text-[9px] uppercase tracking-wider px-2 py-0.5 rounded bg-white/10 text-slate-300 inline-block">
                    {book.badge}
                  </div>
                </div>

                {/* Center Book Emblem & Typography */}
                <div className="pl-2 space-y-3 my-auto">
                  {/* Monogram Crest */}
                  <div className="w-12 h-12 rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm flex items-center justify-center text-[#C8A84E] font-label font-bold text-xl shadow-inner">
                    s.
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-2xl text-white tracking-tight leading-tight">
                      {book.title}
                    </h4>
                    <p className="text-xs text-slate-300/80 font-sans mt-1 leading-relaxed">
                      {book.subtitle}
                    </p>
                  </div>
                </div>

                {/* Bottom Academy Footer */}
                <div className="pl-2 pt-3 border-t border-white/10 flex items-center justify-between">
                  <span className="font-label text-[9px] uppercase tracking-widest text-slate-400">
                    Officium Supremum
                  </span>
                  <Link
                    href={book.link}
                    className="inline-flex items-center gap-1 text-[11px] font-label uppercase tracking-wider text-[#C8A84E] hover:underline"
                  >
                    <span>Open Book</span>
                    <BookOpen className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Soft Ground Shadow */}
              <div className="w-4/5 mx-auto h-4 bg-slate-900/15 rounded-full blur-md mt-2" />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
