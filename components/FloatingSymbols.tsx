"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Compass, Shield, Award, Sparkles, Feather, BookMarked } from "lucide-react";
import { Logo } from "./Logo";

export function FloatingSymbols() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 100 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const x1 = useTransform(smoothX, [-500, 500], [-15, 15]);
  const y1 = useTransform(smoothY, [-500, 500], [-15, 15]);

  const x2 = useTransform(smoothX, [-500, 500], [20, -20]);
  const y2 = useTransform(smoothY, [-500, 500], [20, -20]);

  const x3 = useTransform(smoothX, [-500, 500], [-25, 25]);
  const y3 = useTransform(smoothY, [-500, 500], [18, -18]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX.set(e.clientX - innerWidth / 2);
      mouseY.set(e.clientY - innerHeight / 2);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Symbol 1: Academic Compass (Top Left) */}
      <motion.div
        style={{ x: x1, y: y1 }}
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        className="absolute top-16 left-8 sm:left-24 hidden lg:flex items-center gap-2 p-3.5 rounded-2xl bg-white/70 backdrop-blur-md border border-slate-200/80 shadow-[0_15px_30px_-10px_rgba(15,23,42,0.06)]"
      >
        <div className="w-8 h-8 rounded-xl bg-sky-50 border border-sky-200/60 flex items-center justify-center text-sky-600">
          <Compass className="w-4 h-4" />
        </div>
        <div>
          <div className="font-label text-[10px] uppercase tracking-wider text-slate-500">Mentorship</div>
          <div className="font-heading text-xs font-semibold text-[#0B192C]">Direction &amp; Clarity</div>
        </div>
      </motion.div>

      {/* Symbol 2: Monogram Badge (Top Right) */}
      <motion.div
        style={{ x: x2, y: y2 }}
        animate={{ y: [0, 12, 0] }}
        transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 1 }}
        className="absolute top-20 right-8 sm:right-28 hidden lg:flex items-center gap-3 p-3.5 rounded-2xl bg-white/70 backdrop-blur-md border border-amber-200/60 shadow-[0_15px_30px_-10px_rgba(15,23,42,0.06)]"
      >
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-300/60 flex items-center justify-center p-1.5 shadow-sm">
          <Logo size="xs" showText={false} variant="gold" />
        </div>
        <div>
          <div className="font-label text-[10px] uppercase tracking-wider text-amber-700">Standards</div>
          <div className="font-heading text-xs font-semibold text-[#0B192C]">Discipline First</div>
        </div>
      </motion.div>

      {/* Symbol 3: Merit Laurel (Bottom Left) */}
      <motion.div
        style={{ x: x3, y: y3 }}
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-16 left-12 hidden lg:flex items-center gap-2.5 p-3 rounded-2xl bg-white/70 backdrop-blur-md border border-slate-200/80 shadow-[0_15px_30px_-10px_rgba(15,23,42,0.06)]"
      >
        <div className="w-8 h-8 rounded-xl bg-rose-50/70 border border-rose-200/50 flex items-center justify-center text-rose-500">
          <Award className="w-4 h-4" />
        </div>
        <div>
          <div className="font-label text-[10px] uppercase tracking-wider text-slate-500">Excellence</div>
          <div className="font-heading text-xs font-semibold text-[#0B192C]">15 Officer Qualities</div>
        </div>
      </motion.div>

      {/* Symbol 4: Feather Quill / Active Recall (Bottom Right) */}
      <motion.div
        style={{ x: x1, y: y2 }}
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 6.5, ease: "easeInOut", delay: 1.5 }}
        className="absolute bottom-20 right-14 hidden lg:flex items-center gap-2.5 p-3 rounded-2xl bg-white/70 backdrop-blur-md border border-slate-200/80 shadow-[0_15px_30px_-10px_rgba(15,23,42,0.06)]"
      >
        <div className="w-8 h-8 rounded-xl bg-sky-50/80 border border-sky-200/60 flex items-center justify-center text-sky-600">
          <BookMarked className="w-4 h-4" />
        </div>
        <div>
          <div className="font-label text-[10px] uppercase tracking-wider text-slate-500">Retention</div>
          <div className="font-heading text-xs font-semibold text-[#0B192C]">Active Recall Systems</div>
        </div>
      </motion.div>
    </div>
  );
}
