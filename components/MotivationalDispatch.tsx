"use client";

import React, { useState } from "react";
import { Flame, Award, Compass, RefreshCw, Quote, ShieldAlert } from "lucide-react";

const MOTIVATIONAL_DISPATCHES = [
  {
    quote: "Discipline is choosing between what you want now and what you want most.",
    author: "Officium Supremum Academy Maxim",
    lesson: "Motivation is an emotional surge that evaporates under fatigue. Discipline is the protocol that carries you through the 05:30 drill when everything in your body pleads for comfort.",
    focusDirective: "Protect your first 90-minute block tomorrow from all screens. Treat it as sacred duty.",
  },
  {
    quote: "The more you sweat in peace, the less you bleed in war.",
    author: "General George S. Patton / Academy Precept",
    lesson: "Examination pressure does not build character — it reveals preparation. Train so rigorously under simulated exam conditions that the actual examination feels like a routine morning drill.",
    focusDirective: "Do not leave tricky mathematics doubts unsolved today. Attack them first.",
  },
  {
    quote: "Either I will come back after hoisting the Tricolour, or I will come back wrapped in it, but I will be back for sure.",
    author: "Captain Vikram Batra, Param Vir Chakra (Posthumous)",
    lesson: "True leadership is absolute ownership of the mission. When an officer accepts a task, excuses cease to exist. Adopt that standard in your daily syllabus completion.",
    focusDirective: "Submit your night accountability report before 22:00 hrs without exception.",
  }
];

export function MotivationalDispatch() {
  const [index, setIndex] = useState(0);

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % MOTIVATIONAL_DISPATCHES.length);
  };

  const dispatch = MOTIVATIONAL_DISPATCHES[index];

  return (
    <div className="relative bg-[#141720] border border-[#2A2F3A] rounded-2xl p-6 sm:p-8 overflow-hidden group">
      {/* Subtle Gold Ambient Glow */}
      <div className="absolute -top-24 -right-24 w-60 h-60 bg-[#C8A84E]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-[#242936] pb-5 mb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#1E2330] border border-[#C8A84E]/40 flex items-center justify-center text-[#C8A84E]">
            <Flame className="w-5 h-5 text-[#C8A84E]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-heading font-semibold text-lg text-white">
                Commandant's Daily Dispatch
              </h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-label tracking-widest uppercase bg-[#C8A84E]/15 text-[#C8A84E]">
                Mindset Architecture
              </span>
            </div>
            <p className="text-xs text-zinc-400 font-label uppercase tracking-wider">
              Discipline Today • Leadership Tomorrow
            </p>
          </div>
        </div>

        <button
          onClick={handleNext}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1A1E29] hover:bg-[#252C3D] border border-[#2A2F3A] text-xs font-label uppercase tracking-wider text-zinc-300 hover:text-white transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5 text-[#C8A84E]" />
          <span>Next Dispatch</span>
        </button>
      </div>

      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <Quote className="w-8 h-8 text-[#C8A84E]/40 shrink-0 mt-1" />
          <div>
            <p className="font-heading italic text-lg sm:text-xl text-zinc-100 leading-snug">
              "{dispatch.quote}"
            </p>
            <div className="font-label text-xs uppercase tracking-widest text-[#C8A84E] mt-2 font-semibold">
              — {dispatch.author}
            </div>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed pl-11">
          {dispatch.lesson}
        </p>

        <div className="mt-4 p-3.5 rounded-xl bg-[#0F1115] border border-[#2A2F3A] flex items-center gap-3">
          <ShieldAlert className="w-4 h-4 text-[#C8A84E] shrink-0" />
          <div className="text-xs text-zinc-300">
            <strong className="text-white font-label uppercase tracking-wider mr-1">Daily Directive:</strong>
            {dispatch.focusDirective}
          </div>
        </div>
      </div>
    </div>
  );
}
