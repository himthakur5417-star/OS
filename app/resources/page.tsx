"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useModals } from "@/components/ModalContext";
import { useAuth } from "@/components/AuthContext";
import { 
  Search, 
  BookOpen, 
  FileText, 
  Lock, 
  ArrowRight, 
  ArrowUpRight, 
  Bot, 
  CheckCircle2,
  Sparkles
} from "lucide-react";

interface ResourceItem {
  id: string;
  category: "nda-maths" | "cds-maths" | "english" | "vocab" | "pyq";
  title: string;
  volume: string;
  description: string;
  linkText: string;
  href: string;
  tag: string;
  isProtected?: boolean;
}

const RESOURCES_DATA: ResourceItem[] = [
  // NDA Mathematics
  {
    id: "nda-math-01",
    category: "nda-maths",
    title: "Trigonometry & Inverse Trig (Chapters 11, 12, 13)",
    volume: "Volume II",
    description: "Angles, identities, height & distance, inverse functions, and 180+ solved NDA drill questions.",
    linkText: "Open Chapter PDF",
    href: "/NDA%20mathematics/index.html",
    tag: "High Yield (15-20 Qs)",
    isProtected: true,
  },
  {
    id: "nda-math-02",
    category: "nda-maths",
    title: "Matrices & Determinants (Chapters 09, 10)",
    volume: "Volume I",
    description: "Properties of matrices, adjoint, inverse, Cramer's rule, and past 10 years NDA solutions.",
    linkText: "Open Chapter PDF",
    href: "/NDA%20mathematics/index.html",
    tag: "Essential Core",
    isProtected: true,
  },
  {
    id: "nda-math-03",
    category: "nda-maths",
    title: "Complete 30-Chapter NDA Maths Drill Archive",
    volume: "Master Archive",
    description: "Complete repository of all 30 chapters with 4,330+ solved drill problems (2011–2025).",
    linkText: "Unlock 30-Chapter Vault",
    href: "/NDA%20mathematics/index.html",
    tag: "Complete 4,330+ Archive",
    isProtected: true,
  },

  // CDS Mathematics
  {
    id: "cds-math-01",
    category: "cds-maths",
    title: "CDS Mathematics 383-Page Master Study Volume",
    volume: "Complete Master Vol",
    description: "Curated 383-page master volume covering Arithmetic, Algebra, Geometry, Mensuration 2D & 3D, and Statistics.",
    linkText: "Access 383-Page Master PDF",
    href: "/CDS%20mathematics/index.html",
    tag: "Master Volume",
    isProtected: true,
  },
  {
    id: "cds-math-02",
    category: "cds-maths",
    title: "Geometry & 2D/3D Mensuration (Chapters 16, 17, 18)",
    volume: "Volume III",
    description: "Triangles, circles, polygons, cylinders, spheres, cones, and surface area & volume proofs.",
    linkText: "Open CDS Archive",
    href: "/CDS%20mathematics/index.html",
    tag: "Advance Math",
    isProtected: true,
  },

  // NDA & CDS English
  {
    id: "english-01",
    category: "english",
    title: "NDA & CDS English 396-Page Master Volume",
    volume: "Master Volume",
    description: "34 chapters spanning comprehensive Grammar, Vocabulary drills, Idioms, and Reading Comprehension.",
    linkText: "Open 396-Page English Archive",
    href: "/NDA%20CDS%20English/index.html",
    tag: "Complete English Archive",
    isProtected: true,
  },
  {
    id: "english-02",
    category: "english",
    title: "Grammar & Error Detection (Chapters 01 to 17)",
    volume: "Part I",
    description: "Parts of speech, subject-verb agreement, prepositions, tenses, conditionals, and sentence correction.",
    linkText: "Open Grammar Portal",
    href: "/NDA%20CDS%20English/index.html",
    tag: "Grammar Core",
    isProtected: true,
  },

  // A2Z Vocabulary
  {
    id: "vocab-01",
    category: "vocab",
    title: "A to Z Vocabulary & Word Power (126-Page Volume)",
    volume: "26 Modules (A-Z)",
    description: "1,200+ high-frequency exam words with contextual Hindi meanings, antonyms, and academy editorial briefings.",
    linkText: "Open A to Z Vocab Portal",
    href: "/A2Z%20Vocabulary/index.html",
    tag: "1,200+ Core Words",
    isProtected: true,
  },

  // PYQ
  {
    id: "pyq-01",
    category: "pyq",
    title: "Official NDA Question Papers (2020–2026)",
    volume: "UPSC Official",
    description: "Mathematics and General Ability Test (GAT) question papers organized year-by-year.",
    linkText: "Open NDA PYQ Papers",
    href: "/PYQ/index.html",
    tag: "NDA 2020–2026",
    isProtected: true,
  },
  {
    id: "pyq-02",
    category: "pyq",
    title: "Official CDS Question Papers (2020–2026)",
    volume: "UPSC Official",
    description: "English, Elementary Mathematics, and General Knowledge official exam papers.",
    linkText: "Open CDS PYQ Papers",
    href: "/PYQ/index.html",
    tag: "CDS 2020–2026",
    isProtected: true,
  }
];

export default function ResourcesPage() {
  const { openAi } = useModals();
  const { user, openAuthModal } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  const handleAccessResource = (res: ResourceItem) => {
    if (!user && res.isProtected) {
      openAuthModal("signin", "/resources");
    } else {
      window.open(res.href, "_blank");
    }
  };

  const filteredResources = RESOURCES_DATA.filter((res) => {
    const matchesSearch =
      res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.tag.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter = selectedFilter === "all" || res.category === selectedFilter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="bg-[#FAFAF9] text-[#0F172A] min-h-screen">
      {/* Header */}
      <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-20 border-b border-slate-200/60 bg-gradient-to-b from-white to-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-label uppercase tracking-widest text-slate-700 shadow-sm">
              <BookOpen className="w-3.5 h-3.5 text-[#C8A84E]" />
              <span>Officium Supremum Academic Vault</span>
            </div>

            <h1 className="font-heading text-4xl sm:text-6xl font-semibold tracking-tight text-[#0B192C]">
              Curated Study Archives &amp; Examination Blueprint
            </h1>

            <p className="text-sm sm:text-base text-slate-600 font-sans leading-relaxed">
              Direct access to our 30-chapter Mathematics archives, 396-page English master volume, 26-module A2Z vocabulary sets, and official 2020–2026 UPSC papers.
            </p>

            {/* AI Assistant Banner */}
            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={() => openAi("syllabus")}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs font-label uppercase tracking-wider text-slate-800 transition-colors shadow-sm"
              >
                <Bot className="w-4 h-4 text-[#C8A84E]" />
                <span>Need chapter breakdown? Ask Officium AI &rarr;</span>
              </button>

              {!user && (
                <button
                  onClick={() => openAuthModal("signin", "/resources")}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-label uppercase tracking-wider text-sky-700 hover:underline"
                >
                  <Lock className="w-3.5 h-3.5 text-[#C8A84E]" />
                  <span>Cadet Sign In</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section className="py-6 bg-white/90 border-b border-slate-200/60 sticky top-[69px] z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 text-xs font-label uppercase tracking-wider">
            {[
              { id: "all", label: "All Vault Materials" },
              { id: "nda-maths", label: "NDA Maths (30 Ch)" },
              { id: "cds-maths", label: "CDS Maths (22 Ch)" },
              { id: "english", label: "English (34 Ch)" },
              { id: "vocab", label: "A2Z Vocab (26 Mod)" },
              { id: "pyq", label: "PYQ Papers" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id)}
                className={`px-3.5 py-2 rounded-xl whitespace-nowrap transition-colors border ${
                  selectedFilter === tab.id
                    ? "bg-[#0B192C] text-white font-bold border-[#0B192C] shadow-sm"
                    : "bg-slate-50 text-slate-600 hover:text-slate-900 border-slate-200/80"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search chapters, topics, PYQs..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-800 placeholder:text-slate-400 outline-none focus:border-[#C8A84E] focus:bg-white transition-colors"
            />
          </div>

        </div>
      </section>

      {/* Grid of Resources */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filteredResources.map((res) => (
              <div
                key={res.id}
                className="p-8 rounded-3xl bg-white border border-slate-200/80 hover:border-[#C8A84E]/70 transition-all flex flex-col justify-between group shadow-sm hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-[10px] font-label uppercase tracking-widest px-2.5 py-1 rounded-md bg-amber-50 text-amber-800 border border-amber-200/70 font-semibold">
                      {res.tag}
                    </span>
                    <span className="text-xs text-slate-400 font-label uppercase">
                      {res.volume}
                    </span>
                  </div>

                  <h3 className="font-heading font-semibold text-xl text-[#0B192C] group-hover:text-sky-700 transition-colors mb-2">
                    {res.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed font-sans mb-6">
                    {res.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <button
                    onClick={() => handleAccessResource(res)}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-label uppercase tracking-wider text-slate-800 flex items-center justify-center gap-2 transition-all group-hover:border-[#C8A84E]/60 shadow-sm"
                  >
                    {!user && res.isProtected ? (
                      <>
                        <Lock className="w-3.5 h-3.5 text-[#C8A84E]" />
                        <span>Sign In to Unlock PDF</span>
                      </>
                    ) : (
                      <>
                        <span>{res.linkText}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#C8A84E]" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredResources.length === 0 && (
            <div className="text-center py-20 space-y-3">
              <BookOpen className="w-10 h-10 text-slate-400 mx-auto" />
              <div className="font-heading text-lg text-slate-800">No materials matched your search</div>
              <p className="text-xs text-slate-500">Try searching for "Trigonometry", "Grammar", or "2024".</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
