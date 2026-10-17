"use client";

import React, { useState, useMemo } from "react";
import {
  BookOpen,
  Search,
  CheckCircle2,
  FileText,
  Shield,
  Calculator,
  Languages,
  Landmark,
  Scale,
  Award,
  Layers,
  ChevronRight,
  Printer,
  Copy,
  Check,
  X,
  ExternalLink,
  Download,
  Maximize2,
  Minimize2,
} from "lucide-react";
import SyllabusDossier, { SyllabusTrack } from "./SyllabusDossier";
import {
  NDA_MATHS_CHAPTERS,
  CDS_MATHS_CHAPTERS,
  ENGLISH_CHAPTERS,
  PYQ_YEARS,
  ChapterItem,
} from "@/data/vaultManifest";
import { useAuth } from "./AuthContext";

export type VaultTab = "syllabus" | "nda-maths" | "cds-maths" | "english" | "pyq";

interface Props {
  activeTab?: VaultTab;
  onTabChange?: (tab: VaultTab) => void;
  onClose?: () => void;
  selectedDocPdf?: string | null;
  selectedDocTitle?: string | null;
  onClearDoc?: () => void;
}

export default function AcademicVaultViewer({
  activeTab: controlledTab,
  onTabChange,
  onClose,
  selectedDocPdf,
  selectedDocTitle,
  onClearDoc,
}: Props) {
  const { requireAuth } = useAuth();
  const [internalTab, setInternalTab] = useState<VaultTab>("syllabus");
  const activeTab = controlledTab || internalTab;

  const handleTabChange = (tab: VaultTab) => {
    if (onTabChange) onTabChange(tab);
    setInternalTab(tab);
  };

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeModalDoc, setActiveModalDoc] = useState<{
    title: string;
    pdf: string;
    meta?: string;
  } | null>(
    selectedDocPdf ? { title: selectedDocTitle || "Document Viewer", pdf: selectedDocPdf } : null
  );
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Authenticated doc opener: prompts login if guest, then opens doc
  const openDoc = (doc: { title: string; pdf: string; meta?: string }) => {
    requireAuth(() => {
      setActiveModalDoc(doc);
    });
  };

  // Sync incoming doc if passed from parent
  React.useEffect(() => {
    if (selectedDocPdf) {
      setActiveModalDoc({
        title: selectedDocTitle || "Official Document",
        pdf: selectedDocPdf,
      });
    }
  }, [selectedDocPdf, selectedDocTitle]);

  // Filtering for chapters
  const filteredNdaMaths = useMemo(() => {
    if (!searchQuery.trim()) return NDA_MATHS_CHAPTERS;
    const q = searchQuery.toLowerCase();
    return NDA_MATHS_CHAPTERS.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.num.toLowerCase().includes(q) ||
        (c.desc && c.desc.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  const filteredCdsMaths = useMemo(() => {
    if (!searchQuery.trim()) return CDS_MATHS_CHAPTERS;
    const q = searchQuery.toLowerCase();
    return CDS_MATHS_CHAPTERS.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.num.toLowerCase().includes(q) ||
        (c.tag && c.tag.toLowerCase().includes(q)) ||
        (c.desc && c.desc.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  const filteredEnglish = useMemo(() => {
    if (!searchQuery.trim()) return ENGLISH_CHAPTERS;
    const q = searchQuery.toLowerCase();
    return ENGLISH_CHAPTERS.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.num.toLowerCase().includes(q) ||
        (c.tag && c.tag.toLowerCase().includes(q)) ||
        (c.desc && c.desc.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  const filteredPyq = useMemo(() => {
    if (!searchQuery.trim()) return PYQ_YEARS;
    const q = searchQuery.toLowerCase();
    return PYQ_YEARS.filter(
      (y) =>
        y.year.toLowerCase().includes(q) ||
        y.tag.toLowerCase().includes(q) ||
        y.papers.some((p) => p.name.toLowerCase().includes(q))
    );
  }, [searchQuery]);

const TAB_INFO: Record<VaultTab, { eyebrow: string; title: string; subtitle: string }> = {
  "syllabus": {
    eyebrow: "Official Examination Blueprint",
    title: "UPSC NDA & CDS Complete Syllabus",
    subtitle: "Complete verified syllabus topics, paper-wise distribution, marking schemes, and SSB interview pattern.",
  },
  "nda-maths": {
    eyebrow: "Official Curriculum Archive",
    title: "NDA Mathematics (30 Chapters · 4,330+ Qs)",
    subtitle: "Theory summaries, graded drill problems, and 15 years of solved UPSC NDA mathematics questions.",
  },
  "cds-maths": {
    eyebrow: "Official Curriculum Archive",
    title: "CDS Mathematics (22 Chapters · 383 Pages)",
    subtitle: "Master curriculum covering Arithmetic, Algebra, Geometry, Mensuration, Trigonometry, and Statistics.",
  },
  "english": {
    eyebrow: "Official Curriculum Archive",
    title: "NDA & CDS English (34 Chapters · 396 Pages)",
    subtitle: "Grammar rules, sentence structure, idioms, vocabulary roots, cloze test, and reading comprehension.",
  },
  "pyq": {
    eyebrow: "Official UPSC Archives",
    title: "Previous Year Question Papers (2020–2026)",
    subtitle: "Official question papers with authentic answer keys and solutions arranged chronologically.",
  },
};

  const currentInfo = TAB_INFO[activeTab] || TAB_INFO["syllabus"];

  return (
    <div id="academic-vault-viewer" className="w-full max-w-7xl mx-auto scroll-mt-24">
      {/* Folder Header */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-4 sm:p-6 mb-8">
        <div className="flex items-center justify-between gap-4 mb-4 pb-4 border-b border-slate-100 flex-wrap">
          <div>
            <div className="font-label text-xs uppercase tracking-[0.2em] text-[#C8A84E] font-bold">
              {currentInfo.eyebrow}
            </div>
            <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#0B192C]">
              {currentInfo.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 font-sans mt-0.5">
              {currentInfo.subtitle}
            </p>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-xs font-label uppercase tracking-wider font-bold text-slate-800 transition-all shadow-sm hover:shadow"
            >
              <X className="w-4 h-4 text-slate-500" />
              <span>Close Folder</span>
            </button>
          )}
        </div>

        {/* Folder Switcher Tabs */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <span className="text-xs font-label uppercase tracking-wider text-slate-400 font-semibold mr-1 hidden sm:inline">
            Folder:
          </span>
          {[
            { id: "syllabus" as VaultTab, label: "📋 Syllabus Blueprint", count: "NDA & CDS" },
            { id: "nda-maths" as VaultTab, label: "📐 NDA Mathematics", count: "30 Ch" },
            { id: "cds-maths" as VaultTab, label: "📊 CDS Mathematics", count: "22 Ch" },
            { id: "english" as VaultTab, label: "📖 NDA & CDS English", count: "34 Ch" },
            { id: "pyq" as VaultTab, label: "🏛️ UPSC PYQ Archives", count: "2020–2026" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                handleTabChange(tab.id);
                setSearchQuery("");
              }}
              className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-label uppercase tracking-wider font-semibold transition-all shadow-sm ${
                activeTab === tab.id
                  ? "bg-[#0B192C] text-white ring-2 ring-[#C8A84E]/40"
                  : "bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200"
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full font-sans font-normal ${
                  activeTab === tab.id ? "bg-white/20 text-white" : "bg-slate-200 text-slate-600"
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Global Search across chapters */}
        {activeTab !== "syllabus" && (
          <div className="mt-4 pt-4 border-t border-slate-100 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search in ${
                activeTab === "nda-maths"
                  ? "NDA Mathematics (e.g. Logarithms, Matrices, Calculus, Vectors)..."
                  : activeTab === "cds-maths"
                  ? "CDS Mathematics (e.g. Ratio, Geometry, Mensuration, Trigonometry)..."
                  : activeTab === "english"
                  ? "English (e.g. Noun, Preposition, Cloze Test, Idioms)..."
                  : "PYQs (e.g. 2024, Mathematics, General Ability)..."
              }`}
              className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-sans focus:outline-none focus:ring-2 focus:ring-[#0B192C] focus:bg-white text-slate-900 placeholder-slate-400 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 uppercase font-label"
              >
                Clear
              </button>
            )}
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: SYLLABUS DOSSIER                                                   */}
      {/* ========================================================================= */}
      {activeTab === "syllabus" && <SyllabusDossier initialTrack="nda" />}

      {/* ========================================================================= */}
      {/* TAB 2: NDA MATHEMATICS (30 CHAPTERS SERIALIZED)                           */}
      {/* ========================================================================= */}
      {activeTab === "nda-maths" && (
        <div className="space-y-6 animate-fadeIn">
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-slate-900 to-[#1B2838] text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C8A84E]/20 text-[#C8A84E] text-xs font-label uppercase tracking-widest font-bold mb-2">
                UPSC Examination · Paper 1
              </div>
              <h3 className="font-heading text-2xl sm:text-3xl font-semibold">
                NDA Mathematics Archive (30 Chapters · 4,330+ Qs)
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm font-sans mt-1 max-w-xl">
                Every chapter includes structured theory summaries, graded cadet drill problems, and 15 years of solved UPSC NDA PYQs.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  openDoc({
                    title: "NDA Mathematics 30-Chapter Drill Vault",
                    pdf: "/NDA mathematics/index.html",
                  });
                }}
                className="px-5 py-2.5 rounded-xl bg-[#C8A84E] hover:bg-[#b5953e] text-slate-950 font-label text-xs uppercase tracking-wider font-bold shadow-sm transition-all"
              >
                Open Complete Index
              </button>
            </div>
          </div>

          {/* Chapters Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredNdaMaths.map((ch, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200/90 rounded-2xl p-5 hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-label text-[11px] uppercase tracking-widest text-[#C8A84E] font-bold bg-[#FAF5E6] px-2.5 py-0.5 rounded">
                      {ch.num || `Chapter ${String(idx + 1).padStart(2, "0")}`}
                    </span>
                    <span className="text-[11px] font-sans font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      {ch.meta || "Practice Set"}
                    </span>
                  </div>
                  <h4 className="font-heading font-semibold text-[#0B192C] text-lg mb-2">{ch.title}</h4>
                  <p className="text-xs text-slate-600 font-sans leading-relaxed line-clamp-3 mb-4">
                    {ch.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-label uppercase text-slate-400 font-medium">
                    PDF Document
                  </span>
                  <button
                    onClick={() => {
                      openDoc({
                        title: `${ch.num}: ${ch.title}`,
                        pdf: ch.pdf,
                        meta: ch.meta,
                      });
                    }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-[#C8A84E] hover:text-slate-950 text-white text-xs font-label uppercase tracking-wider font-semibold transition-all shadow-sm"
                  >
                    <span>Read Chapter</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: CDS MATHEMATICS (22 CHAPTERS SERIALIZED)                           */}
      {/* ========================================================================= */}
      {activeTab === "cds-maths" && (
        <div className="space-y-6 animate-fadeIn">
          {/* Master Volume Hero */}
          <div className="bg-gradient-to-r from-slate-900 to-[#1B2838] text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 text-sky-400 text-xs font-label uppercase tracking-widest font-bold mb-2">
                Officer Trainee Cadre · IMA, INA &amp; AFA
              </div>
              <h3 className="font-heading text-2xl sm:text-3xl font-semibold">
                CDS Mathematics (22 Chapters · 383 Pages)
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm font-sans mt-1 max-w-xl">
                Comprehensive 383-page single master volume covering Arithmetic, Algebra, Geometry, Mensuration, Trigonometry, and Statistics.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  openDoc({
                    title: "CDS Mathematics Master Volume (383 Pages)",
                    pdf: "/CDS mathematics/CDS-Mathematics-Officium-Supremum.pdf",
                    meta: "383-Page Full Master Volume",
                  });
                }}
                className="px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-label text-xs uppercase tracking-wider font-bold shadow-sm transition-all"
              >
                Read 383-Pg Master Vol
              </button>
            </div>
          </div>

          {/* Chapters Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCdsMaths.map((ch, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200/90 rounded-2xl p-5 hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-label text-[11px] uppercase tracking-widest text-sky-700 font-bold bg-sky-50 px-2.5 py-0.5 rounded">
                      {ch.num || `Chapter ${String(idx + 1).padStart(2, "0")}`}
                    </span>
                    {ch.tag && (
                      <span className="text-[10px] font-label uppercase font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        {ch.tag}
                      </span>
                    )}
                  </div>
                  <h4 className="font-heading font-semibold text-[#0B192C] text-lg mb-2">{ch.title}</h4>
                  <p className="text-xs text-slate-600 font-sans leading-relaxed line-clamp-3 mb-4">
                    {ch.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-sans text-slate-500 font-medium">
                    {ch.meta || "Practice Set"}
                  </span>
                  <button
                    onClick={() => {
                      openDoc({
                        title: `${ch.num}: ${ch.title}`,
                        pdf: ch.pdf,
                        meta: ch.meta,
                      });
                    }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-sky-700 text-white text-xs font-label uppercase tracking-wider font-semibold transition-all shadow-sm"
                  >
                    <span>Read Chapter</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: ENGLISH MASTER VOLUME (34 CHAPTERS SERIALIZED)                     */}
      {/* ========================================================================= */}
      {activeTab === "english" && (
        <div className="space-y-6 animate-fadeIn">
          {/* Master Volume Hero */}
          <div className="bg-gradient-to-r from-slate-900 to-[#1B2838] text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-label uppercase tracking-widest font-bold mb-2">
                Curriculum Blueprint · NDA &amp; CDS
              </div>
              <h3 className="font-heading text-2xl sm:text-3xl font-semibold">
                NDA &amp; CDS English Master Volume (34 Chapters · 396 Pages)
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm font-sans mt-1 max-w-xl">
                Rigorous coverage of grammar core rules, sentence correction, idioms, vocabulary roots, cloze test, and reading comprehension.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  openDoc({
                    title: "NDA & CDS English Master Volume (396 Pages)",
                    pdf: "/NDA CDS English/NDA-CDS-English-Officium-Supremum.pdf",
                    meta: "396-Page Full Master Volume",
                  });
                }}
                className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-label text-xs uppercase tracking-wider font-bold shadow-sm transition-all"
              >
                Read 396-Pg Master Vol
              </button>
            </div>
          </div>

          {/* Chapters Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredEnglish.map((ch, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200/90 rounded-2xl p-5 hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-label text-[11px] uppercase tracking-widest text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded">
                      {ch.num || `Chapter ${String(idx + 1).padStart(2, "0")}`}
                    </span>
                    {ch.tag && (
                      <span className="text-[10px] font-label uppercase font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        {ch.tag}
                      </span>
                    )}
                  </div>
                  <h4 className="font-heading font-semibold text-[#0B192C] text-lg mb-2">{ch.title}</h4>
                  <p className="text-xs text-slate-600 font-sans leading-relaxed line-clamp-3 mb-4">
                    {ch.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-sans text-slate-500 font-medium">
                    {ch.meta || "Practice Set"}
                  </span>
                  <button
                    onClick={() => {
                      openDoc({
                        title: `${ch.num}: ${ch.title}`,
                        pdf: ch.pdf,
                        meta: ch.meta,
                      });
                    }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-emerald-700 text-white text-xs font-label uppercase tracking-wider font-semibold transition-all shadow-sm"
                  >
                    <span>Read Chapter</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 5: PYQ ARCHIVES (2020–2026 SERIALIZED)                                */}
      {/* ========================================================================= */}
      {activeTab === "pyq" && (
        <div className="space-y-6 animate-fadeIn">
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-slate-900 to-[#1B2838] text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-label uppercase tracking-widest font-bold mb-2">
                Official Examination Papers
              </div>
              <h3 className="font-heading text-2xl sm:text-3xl font-semibold">
                UPSC PYQ Archives (2020–2026 · NDA &amp; CDS)
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm font-sans mt-1 max-w-xl">
                Official question papers with authentic answer keys and officer solutions arranged chronologically.
              </p>
            </div>
            <div className="text-xs font-label uppercase tracking-wider text-slate-400">
              14 Year Sessions Available
            </div>
          </div>

          {/* PYQ Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredPyq.map((item, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200/90 rounded-2xl p-6 hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                    <h4 className="font-heading font-bold text-slate-900 text-xl">{item.year}</h4>
                    <span className="text-[11px] font-label uppercase tracking-wider font-semibold text-amber-700 bg-amber-50 border border-amber-200/60 px-2.5 py-0.5 rounded-full">
                      {item.tag}
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {item.papers.map((paper, pIdx) => (
                      <button
                        key={pIdx}
                        onClick={() => {
                          openDoc({
                            title: `${item.year} — ${paper.name}`,
                            pdf: paper.pdf,
                            meta: item.tag,
                          });
                        }}
                        className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 text-left transition-all group"
                      >
                        <span className="text-xs font-sans font-semibold text-slate-800 group-hover:text-amber-800 transition-colors">
                          {paper.name}
                        </span>
                        <span className="text-[10px] font-label uppercase tracking-wider font-bold text-slate-400 group-hover:text-slate-900 transition-colors">
                          Read →
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-sans text-slate-400">
                  UPSC Official Examination Archive
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* IN-WEBSITE DOCUMENT READER MODAL                                           */}
      {/* ========================================================================= */}
      {activeModalDoc && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fadeIn"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setActiveModalDoc(null);
              onClearDoc?.();
            }
          }}
        >
          <div
            className={`bg-white rounded-3xl shadow-2xl border border-slate-200/80 flex flex-col overflow-hidden transition-all duration-300 ${
              isFullscreen ? "w-full h-full rounded-none" : "w-full max-w-5xl h-[88vh]"
            }`}
          >
            {/* Modal Header */}
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between gap-4 border-b border-slate-800">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-[#C8A84E]/20 text-[#C8A84E] flex items-center justify-center shrink-0">
                  <FileText className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-heading font-semibold text-sm sm:text-base text-white truncate">
                    {activeModalDoc.title}
                  </h4>
                  {activeModalDoc.meta && (
                    <div className="text-[11px] font-sans text-slate-400 truncate">
                      {activeModalDoc.meta}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={encodeURI(activeModalDoc.pdf)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                  title="Open in New Tab"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
                <a
                  href={encodeURI(activeModalDoc.pdf)}
                  download
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                  title="Download File"
                >
                  <Download className="w-4 h-4" />
                </a>
                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors hidden sm:block"
                  title="Toggle Fullscreen"
                >
                  {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => {
                    setActiveModalDoc(null);
                    onClearDoc?.();
                  }}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-rose-900/60 text-slate-300 hover:text-rose-300 transition-colors"
                  title="Close Reader"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal Body / Embedded Iframe Viewer */}
            <div className="flex-1 bg-slate-100 relative">
              <iframe
                src={encodeURI(activeModalDoc.pdf)}
                title={activeModalDoc.title}
                className="w-full h-full border-none"
              />
            </div>

            {/* Modal Bottom Bar */}
            <div className="px-6 py-2.5 bg-slate-900 border-t border-slate-800 text-xs text-slate-400 flex flex-wrap items-center justify-between gap-3">
              <span className="font-sans">
                Official Officium Supremum Cadre Archive • Verified Curriculum Document
              </span>
              <div className="flex items-center gap-4">
                <a
                  href={encodeURI(activeModalDoc.pdf)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#C8A84E] hover:underline font-label uppercase tracking-wider flex items-center gap-1 font-semibold"
                >
                  <span>Open in Full Browser Tab</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href={encodeURI(activeModalDoc.pdf)}
                  download
                  className="text-slate-300 hover:text-white font-label uppercase tracking-wider flex items-center gap-1 font-semibold"
                >
                  <span>Download Copy</span>
                  <Download className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
