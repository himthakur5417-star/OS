"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/components/AuthContext";
import GlassFolder, { ArtPreset } from "@/components/GlassFolder";
import AcademicVaultViewer, { VaultTab } from "@/components/AcademicVaultViewer";
import { BookOpen, Lock } from "lucide-react";

interface BookFolderData {
  id: string;
  tab: VaultTab;
  label: string;
  meta: string;
  tone: "light" | "dark";
  art: ArtPreset;
  seed: number;
  files: {
    name: string;
    meta?: string;
    art?: ArtPreset;
    pdf?: string;
  }[];
}

const AVAILABLE_BOOKS: BookFolderData[] = [
  {
    id: "nda-maths-book",
    tab: "nda-maths",
    label: "NDA Mathematics",
    meta: "30 Chapters · 4,330+ Qs",
    tone: "light",
    art: "ember",
    seed: 14,
    files: [
      {
        name: "Ch 01: Logarithms",
        meta: "67 Problems",
        art: "ember",
        pdf: "/NDA mathematics/chapter-01-logarithms.pdf",
      },
      {
        name: "Ch 11: Trigonometry",
        meta: "67 Drill Qs",
        art: "aurora",
        pdf: "/NDA mathematics/chapter-11-trigonometry.pdf",
      },
      {
        name: "Ch 09: Matrices & Det",
        meta: "54 Practice Qs",
        pdf: "/NDA mathematics/chapter-09-matrices.pdf",
      },
      {
        name: "Ch 25: Differentiation",
        meta: "89 Drill Qs",
        pdf: "/NDA mathematics/chapter-25-differentiation.pdf",
      },
    ],
  },
  {
    id: "cds-maths-book",
    tab: "cds-maths",
    label: "CDS Mathematics",
    meta: "22 Chapters · 383 Pages",
    tone: "light",
    art: "glacier",
    seed: 28,
    files: [
      {
        name: "Ch 01: Ratio & Proportion",
        meta: "Cadet Drill Set",
        art: "glacier",
        pdf: "/CDS mathematics/chapter-01-ratio-proportion.pdf",
      },
      {
        name: "Ch 03: Time & Work",
        meta: "87+ Problems",
        art: "ember",
        pdf: "/CDS mathematics/chapter-03-time-work.pdf",
      },
      {
        name: "Ch 08: Number System",
        meta: "42 Pages",
        art: "aurora",
        pdf: "/CDS mathematics/chapter-08-number-system.pdf",
      },
      {
        name: "Ch 16: Geometry",
        meta: "56 Pages",
        pdf: "/CDS mathematics/chapter-16-geometry.pdf",
      },
    ],
  },
  {
    id: "english-book",
    tab: "english",
    label: "NDA & CDS English",
    meta: "34 Chapters · 396 Pages",
    tone: "light",
    art: "dusk",
    seed: 42,
    files: [
      {
        name: "Ch 01: Spotting Errors",
        meta: "Grammar Core",
        art: "dusk",
        pdf: "/NDA CDS English/chapter-01-spotting-errors.pdf",
      },
      {
        name: "Ch 10: Prepositions",
        meta: "Rule Sheets",
        art: "ember",
        pdf: "/NDA CDS English/chapter-10-preposition.pdf",
      },
      {
        name: "Ch 18: Synonyms & Ant",
        meta: "Vocabulary Drill",
        art: "aurora",
        pdf: "/NDA CDS English/chapter-18-synonyms.pdf",
      },
      {
        name: "Ch 31: Comprehension",
        meta: "Passage Drills",
        pdf: "/NDA CDS English/chapter-31-comprehension.pdf",
      },
    ],
  },
  {
    id: "pyq-vault-book",
    tab: "pyq",
    label: "PYQ Archives",
    meta: "NDA & CDS · 2020–2026",
    tone: "light",
    art: "aurora",
    seed: 71,
    files: [
      {
        name: "NDA PYQ (2020–2026)",
        meta: "Maths & GAT · 7 Yrs",
        art: "ember",
        pdf: "/PYQ/NDA-PYQ/2024/NDA-1- 2024 - Mathematics - OS.pdf",
      },
      {
        name: "CDS PYQ (2020–2026)",
        meta: "Eng, Math & GK · 7 Yrs",
        art: "glacier",
        pdf: "/PYQ/CDS-PYQ/2024/CDS-1- 2024 - Mathematics - OS.pdf",
      },
      {
        name: "NDA 2024 Solved Papers",
        meta: "Maths + GAT Solved",
        pdf: "/PYQ/NDA-PYQ/2024/NDA-1- 2024 - Mathematics - OS.pdf",
      },
      {
        name: "CDS 2024 Solved Papers",
        meta: "Maths + GK Solved",
        pdf: "/PYQ/CDS-PYQ/2024/CDS-1- 2024 - Mathematics - OS.pdf",
      },
    ],
  },
  {
    id: "syllabus-vault-book",
    tab: "syllabus",
    label: "Syllabus Blueprint",
    meta: "NDA & CDS · UPSC Pattern",
    tone: "light",
    art: "verdant",
    seed: 88,
    files: [
      {
        name: "NDA Syllabus Blueprint",
        meta: "10+2 Cadet Entry",
        art: "verdant",
      },
      {
        name: "CDS Syllabus (2025)",
        meta: "IMA, INA, AFA & OTA",
        art: "glacier",
      },
      {
        name: "CDS Mathematics Topics",
        meta: "Topics & Weightage",
        art: "ember",
      },
      {
        name: "CDS SSB Interview Pattern",
        meta: "5-Day OLQ · 300 Marks",
        art: "dusk",
      },
    ],
  },
];

export default function ResourcesPage() {
  const { user, openAuthModal, requireAuth } = useAuth();
  const [openFolderId, setOpenFolderId] = useState<string | null>(null);
  const [isVaultOpen, setIsVaultOpen] = useState<boolean>(false);
  const [activeVaultTab, setActiveVaultTab] = useState<VaultTab>("nda-maths");
  const [selectedDocPdf, setSelectedDocPdf] = useState<string | null>(null);
  const [selectedDocTitle, setSelectedDocTitle] = useState<string | null>(null);

  const handleOpenFolder = (book: BookFolderData, docPdf?: string, docTitle?: string) => {
    requireAuth(() => {
      setOpenFolderId(book.id);
      setActiveVaultTab(book.tab);
      setIsVaultOpen(true);

      if (docPdf) {
        setSelectedDocPdf(docPdf);
        setSelectedDocTitle(docTitle || book.label);
      } else {
        setSelectedDocPdf(null);
        setSelectedDocTitle(null);
      }

      setTimeout(() => {
        const el = document.getElementById("academic-vault-viewer");
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 80);
    });
  };

  const handleCloseFolder = () => {
    setIsVaultOpen(false);
    setOpenFolderId(null);
    setSelectedDocPdf(null);
    setSelectedDocTitle(null);
    const showcase = document.getElementById("folders-showcase");
    if (showcase) {
      showcase.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleTabChange = (newTab: VaultTab) => {
    requireAuth(() => {
      setActiveVaultTab(newTab);
      const match = AVAILABLE_BOOKS.find((b) => b.tab === newTab);
      if (match) {
        setOpenFolderId(match.id);
      }
    });
  };

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
              Curated study material, complete curriculum archives, and examination blueprints.
            </p>

            {!user && (
              <div className="pt-2 flex items-center">
                <button
                  onClick={() => openAuthModal("signin", "/resources")}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0B192C] hover:bg-slate-800 text-white text-xs font-label uppercase tracking-wider font-semibold transition-all shadow-sm"
                >
                  <Lock className="w-3.5 h-3.5 text-[#C8A84E]" />
                  <span>Sign In</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* BOOK-WISE GLASS FOLDERS SHOWCASE                                          */}
      {/* ========================================================================= */}
      <section id="folders-showcase" className="pt-16 pb-16 bg-gradient-to-b from-[#FAF7F2] via-white to-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
            <div>
              <div className="font-label text-xs uppercase tracking-[0.2em] text-[#C8A84E] font-semibold mb-1">
                Official Book Volumes ({AVAILABLE_BOOKS.length} Dedicated Folders)
              </div>
              <h2 className="font-heading text-2xl sm:text-4xl font-semibold tracking-tight text-[#0B192C]">
                Interactive Book Archives
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 font-sans max-w-md">
              Click any folder to inspect its complete curriculum and study material.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-8 lg:gap-10">
            {AVAILABLE_BOOKS.map((book, idx) => (
              <GlassFolder
                key={book.id}
                label={book.label}
                meta={book.meta}
                tone={book.tone}
                art={book.art}
                seed={book.seed}
                files={book.files}
                action="more"
                width={280}
                open={openFolderId === book.id}
                closeOnClickOutside={false}
                appearDelay={idx * 100}
                onOpenChange={(isOpen) => {
                  if (isOpen) {
                    handleOpenFolder(book);
                  } else {
                    if (openFolderId === book.id) {
                      handleCloseFolder();
                    }
                  }
                }}
                onFileSelect={(file) => {
                  handleOpenFolder(book, file.pdf, file.name);
                }}
                menu={[
                  {
                    label: `Open ${book.label}`,
                    onSelect: () => handleOpenFolder(book),
                  },
                ]}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SPECIFIC FOLDER VIEWER (Opens only on click of specific folder)           */}
      {/* ========================================================================= */}
      {isVaultOpen ? (
        <section className="pb-32 sm:pb-40 px-4 sm:px-6 lg:px-8 bg-[#FAF7F2] animate-fadeIn">
          <AcademicVaultViewer
            activeTab={activeVaultTab}
            onTabChange={handleTabChange}
            onClose={handleCloseFolder}
            selectedDocPdf={selectedDocPdf}
            selectedDocTitle={selectedDocTitle}
            onClearDoc={() => {
              setSelectedDocPdf(null);
              setSelectedDocTitle(null);
            }}
          />
        </section>
      ) : (
        <section className="pb-24 px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 text-xs font-label uppercase tracking-widest text-slate-400 shadow-sm">
            <span>Select any folder above to open and inspect its volume</span>
          </div>
        </section>
      )}
    </div>
  );
}
