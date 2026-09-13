"use client";

import React, { useEffect } from "react";
import { useAuth } from "@/components/AuthContext";
import { useModals } from "@/components/ModalContext";
import Link from "next/link";
import { 
  Shield, 
  BookOpen, 
  Flame, 
  CheckCircle2, 
  Calendar, 
  Clock, 
  Award, 
  ArrowUpRight, 
  Bot, 
  FileText, 
  BarChart2,
  Lock
} from "lucide-react";

export default function StudentDashboardPage() {
  const { user, openAuthModal, loading } = useAuth();
  const { openAi } = useModals();

  useEffect(() => {
    if (!loading && !user) {
      openAuthModal("signin", "/dashboard");
    }
  }, [user, loading, openAuthModal]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFAF9] flex items-center justify-center">
        <div className="flex items-center gap-3 text-slate-500 font-label uppercase text-xs tracking-widest">
          <div className="w-5 h-5 border-2 border-[#C8A84E] border-t-transparent rounded-full animate-spin" />
          <span>Authenticating Cadet Credentials...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#FAFAF9] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white border border-slate-200/80 rounded-3xl p-8 text-center space-y-4 shadow-xl">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200/60 flex items-center justify-center text-[#C8A84E] mx-auto">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="font-heading font-semibold text-2xl text-[#0B192C]">
            Protected Cadet Terminal
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed font-sans">
            This dashboard contains active recall records, confidential syllabus pacing, and personal accountability logs. Please sign in to verify admission status.
          </p>
          <button
            onClick={() => openAuthModal("signin", "/dashboard")}
            className="w-full py-3 bg-[#0B192C] hover:bg-[#1E293B] text-white font-label font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-md"
          >
            Open Sign-In Modal
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAFAF9] text-[#0F172A] min-h-screen py-10 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Header Card with Glassmorphism */}
        <div className="relative bg-white/80 backdrop-blur-xl border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-[0_20px_45px_-12px_rgba(15,23,42,0.06)] overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-amber-50/50 via-sky-50/30 to-transparent rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-900 to-[#1E293B] text-[#C8A84E] border border-amber-300/40 flex items-center justify-center font-label font-bold text-2xl shadow-md">
                s.
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-heading font-semibold text-2xl sm:text-3xl text-[#0B192C]">
                    Welcome, {user.displayName || "Cadet"}
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-label tracking-widest uppercase bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold">
                    Active Cadet
                  </span>
                </div>
                <div className="text-xs text-slate-500 font-label uppercase tracking-wider mt-1 flex items-center gap-3">
                  <span>Roll No: <strong className="text-slate-800">{user.rollNumber}</strong></span>
                  <span>•</span>
                  <span>Track: <strong className="text-slate-800 uppercase">{user.role || "Defense"}</strong></span>
                </div>
              </div>
            </div>

            {/* Quick AI Action */}
            <button
              onClick={() => openAi("planner")}
              className="px-5 py-3 rounded-xl bg-[#0B192C] hover:bg-[#1E293B] text-white text-xs font-label uppercase tracking-wider font-semibold flex items-center gap-2 transition-all shadow-md active:scale-95"
            >
              <Bot className="w-4 h-4 text-[#C8A84E]" />
              <span>Generate Today's Study Plan</span>
            </button>
          </div>
        </div>

        {/* Accountability & Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-1">
            <div className="flex items-center justify-between text-slate-400">
              <span className="font-label text-[11px] uppercase tracking-wider">Active Streak</span>
              <Flame className="w-4 h-4 text-orange-500" />
            </div>
            <div className="font-heading text-3xl font-semibold text-[#0B192C]">18 Days</div>
            <div className="text-xs text-emerald-600 font-medium">96% Night Briefing Compliance</div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-1">
            <div className="flex items-center justify-between text-slate-400">
              <span className="font-label text-[11px] uppercase tracking-wider">Daily Hours Target</span>
              <Clock className="w-4 h-4 text-sky-600" />
            </div>
            <div className="font-heading text-3xl font-semibold text-[#0B192C]">5.5 Hours</div>
            <div className="text-xs text-slate-500">2 Blocks Completed Today</div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-1">
            <div className="flex items-center justify-between text-slate-400">
              <span className="font-label text-[11px] uppercase tracking-wider">Solved Drill Problems</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="font-heading text-3xl font-semibold text-[#0B192C]">1,480 / 4,330</div>
            <div className="text-xs text-slate-500">Trigonometry &amp; Calculus Verified</div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-1">
            <div className="flex items-center justify-between text-slate-400">
              <span className="font-label text-[11px] uppercase tracking-wider">OLQ Evaluation</span>
              <Award className="w-4 h-4 text-[#C8A84E]" />
            </div>
            <div className="font-heading text-3xl font-semibold text-[#0B192C]">Officer Ready</div>
            <div className="text-xs text-amber-700">Next Mind Session: Sunday 10:00</div>
          </div>
        </div>

        {/* Premium Books & Study Archives */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-heading font-semibold text-xl text-[#0B192C]">
                Enrolled Study Materials &amp; Volumes
              </h2>
              <p className="text-xs text-slate-500 font-sans">
                Full unlocked access to all chapters and solved master volumes.
              </p>
            </div>
            <Link
              href="/resources"
              className="text-xs font-label uppercase tracking-wider text-sky-600 hover:underline flex items-center gap-1"
            >
              <span>Explore All Vault Files</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                title: "NDA Mathematics 30-Chapters",
                detail: "4,330+ solved drill problems (2011–2025)",
                link: "/NDA%20mathematics/index.html",
                tag: "Mathematics Vault",
              },
              {
                title: "CDS Mathematics Master Volume",
                detail: "383-page Arithmetic & Advance master book",
                link: "/CDS%20mathematics/index.html",
                tag: "383-Page PDF",
              },
              {
                title: "NDA & CDS English Archive",
                detail: "34 chapters Grammar, Vocab, & Comprehension",
                link: "/NDA%20CDS%20English/index.html",
                tag: "396-Page Volume",
              },
              {
                title: "A2Z Vocabulary & Word Power",
                detail: "1,200+ exam words across 26 letter modules",
                link: "/A2Z%20Vocabulary/index.html",
                tag: "26 Modules",
              },
            ].map((book, i) => (
              <a
                key={i}
                href={book.link}
                target="_blank"
                rel="noreferrer"
                className="p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-[#C8A84E] transition-all shadow-sm hover:shadow-md flex flex-col justify-between group"
              >
                <div>
                  <span className="font-label text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-semibold mb-3 inline-block">
                    {book.tag}
                  </span>
                  <h4 className="font-heading font-semibold text-base text-[#0B192C] group-hover:text-sky-700 transition-colors">
                    {book.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 font-sans">
                    {book.detail}
                  </p>
                </div>
                <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between text-xs font-label uppercase tracking-wider text-[#C8A84E]">
                  <span>Open PDF Reader</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Tonight's Action Reminder */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-50/80 via-white to-sky-50/80 border border-amber-200/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="font-heading font-semibold text-base text-[#0B192C]">
              Mandatory Night Accountability Briefing
            </h4>
            <p className="text-xs text-slate-600 font-sans">
              Remember to submit tonight's study log before 22:00 hrs to maintain your 18-day streak.
            </p>
          </div>
          <button
            onClick={() => openAi("accountability")}
            className="px-5 py-2.5 rounded-xl bg-[#0B192C] text-white text-xs font-label uppercase tracking-wider font-semibold hover:bg-[#1E293B] transition-colors"
          >
            Submit Night Briefing
          </button>
        </div>

      </div>
    </div>
  );
}
