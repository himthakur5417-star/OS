"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/components/AuthContext";
import { useModals } from "@/components/ModalContext";
import GlassFolder, { ArtPreset } from "@/components/GlassFolder";
import AcademicVaultViewer, { VaultTab } from "@/components/AcademicVaultViewer";
import { BookOpen, Lock, ArrowRight, MessageCircle } from "lucide-react";

interface BookFolderData {
  id: string;
  tab: VaultTab;
  label: string;
  meta: string;
  tone: "light" | "dark";
  art: ArtPreset;
  seed: number;
  previewHref: string;
  files: {
    name: string;
    meta?: string;
    art?: ArtPreset;
    pdf?: string;
    documentKey?: string;
  }[];
}

const AVAILABLE_BOOKS: BookFolderData[] = [
  {
    id: "nda-maths-book",
    tab: "nda-maths",
    label: "NDA Mathematics",
    meta: "30 Chapters · 4,000+ Questions",
    tone: "light",
    art: "ember",
    seed: 14,
    previewHref: "/resources/nda-mathematics",
    files: [
      {
        name: "Ch 01: Logarithms",
        meta: "67 Problems",
        art: "ember",
        documentKey: "nda-mathematics-chapter-01",
      },
      {
        name: "Ch 11: Trigonometry",
        meta: "67 Practice Qs",
        art: "aurora",
        documentKey: "nda-mathematics-chapter-11",
      },
      {
        name: "Ch 09: Matrices & Det",
        meta: "54 Practice Qs",
        documentKey: "nda-mathematics-chapter-09",
      },
      {
        name: "Ch 25: Differentiation",
        meta: "89 Practice Qs",
        documentKey: "nda-mathematics-chapter-25",
      },
    ],
  },
  {
    id: "cds-maths-book",
    tab: "cds-maths",
    label: "CDS Mathematics",
    meta: "Complete 22-Chapter Master Volume",
    tone: "light",
    art: "glacier",
    seed: 28,
    previewHref: "/resources/cds-mathematics",
    files: [
      {
        name: "Ch 01: Ratio & Proportion",
        meta: "Practice Problem Set",
        art: "glacier",
        documentKey: "cds-mathematics-chapter-01",
      },
      {
        name: "Ch 03: Time & Work",
        meta: "87+ Problems",
        art: "ember",
        documentKey: "cds-mathematics-chapter-03",
      },
      {
        name: "Ch 08: Number System",
        meta: "42 Pages",
        art: "aurora",
        documentKey: "cds-mathematics-chapter-08",
      },
      {
        name: "Ch 16: Geometry",
        meta: "56 Pages",
        documentKey: "cds-mathematics-chapter-16",
      },
    ],
  },
  {
    id: "english-book",
    tab: "english",
    label: "NDA & CDS English",
    meta: "Complete 34-Chapter English Curriculum",
    tone: "light",
    art: "dusk",
    seed: 42,
    previewHref: "/resources/nda-cds-english",
    files: [
      {
        name: "Ch 01: Spotting Errors",
        meta: "Grammar Core",
        art: "dusk",
        documentKey: "nda-cds-english-chapter-01",
      },
      {
        name: "Ch 10: Prepositions",
        meta: "Rules & Notes",
        art: "ember",
        documentKey: "nda-cds-english-chapter-10",
      },
      {
        name: "Ch 18: Synonyms & Ant",
        meta: "Vocabulary Practice",
        art: "aurora",
        documentKey: "nda-cds-english-chapter-18",
      },
      {
        name: "Ch 31: Comprehension",
        meta: "Passage Practice",
        documentKey: "nda-cds-english-chapter-31",
      },
    ],
  },
  {
    id: "pyq-vault-book",
    tab: "pyq",
    label: "Previous Years' Papers",
    meta: "NDA & CDS Solved Papers",
    tone: "light",
    art: "aurora",
    seed: 71,
    previewHref: "/resources/previous-year-papers",
    files: [
      {
        name: "NDA Previous Years' Papers",
        meta: "Maths & GAT Solved",
        art: "ember",
        pdf: "/PYQ/NDA-PYQ/2024/NDA-1- 2024 - Mathematics - OS.pdf",
      },
      {
        name: "CDS Previous Years' Papers",
        meta: "English, Maths & GK Solved",
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
    label: "Syllabus & Exam Pattern",
    meta: "UPSC NDA & CDS Pattern",
    tone: "light",
    art: "verdant",
    seed: 88,
    previewHref: "/resources/syllabus",
    files: [
      {
        name: "NDA Syllabus & Pattern",
        meta: "10+2 Cadet Entry",
        art: "verdant",
        pdf: "/Syllabus/NDA-Syllabus/index.html",
      },
      {
        name: "CDS Syllabus & Pattern",
        meta: "IMA, INA, AFA & OTA",
        art: "glacier",
        pdf: "/Syllabus/CDS-Syllabus/index.html",
      },
      {
        name: "CDS Mathematics Topics",
        meta: "Topics & Weightage",
        art: "ember",
        pdf: "/Syllabus/CDS-Syllabus/index.html#maths",
      },
      {
        name: "SSB 5-Day Interview Pattern",
        meta: "Stage 1 & Stage 2 · 300 Marks",
        art: "dusk",
        pdf: "/Syllabus/CDS-Syllabus/index.html#ssb",
      },
    ],
  },
];

export default function ResourcesPage() {
  const { user, openAuthModal } = useAuth();
  const { openOrientation } = useModals();
  const [openFolderId, setOpenFolderId] = useState<string | null>(null);
  const [isVaultOpen, setIsVaultOpen] = useState<boolean>(false);
  const [activeVaultTab, setActiveVaultTab] = useState<VaultTab>("nda-maths");
  const [selectedDocPdf, setSelectedDocPdf] = useState<string | null>(null);
  const [selectedDocTitle, setSelectedDocTitle] = useState<string | null>(null);

  const handleOpenFolder = (book: BookFolderData, docPdf?: string, docTitle?: string) => {
    const open = () => {
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
    };

    // Paid chapter selections open the separate restricted preview first.
    // Full-document access is checked by the viewer and server document route.
    open();
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
    setActiveVaultTab(newTab);
    const match = AVAILABLE_BOOKS.find((b) => b.tab === newTab);
    if (match) {
      setOpenFolderId(match.id);
    }
  };

  return (
    <div className="bg-[#211C1D] text-[#E8DCC6] min-h-screen relative overflow-hidden selection:bg-[#722F37] selection:text-[#E8DCC6]">

      {/* Subtle Ambient Radial Accents */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[min(600px,100vw)] h-[min(600px,100vw)] bg-[#722F37]/15 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 left-0 w-[min(450px,100vw)] h-[min(450px,100vw)] bg-[#B7A89A]/10 rounded-full blur-[120px]" />
      </div>

      {/* ========================================================================= */}
      {/* 1. RESOURCES HERO SECTION                                                */}
      {/* ========================================================================= */}
      <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-28 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl space-y-6">

            {/* Library Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#E8DCC6]/10 border border-[#E8DCC6]/20 shadow-sm">
              <BookOpen className="w-3.5 h-3.5 text-[#E8DCC6]" />
              <span className="font-label text-xs uppercase tracking-[0.2em] text-[#E8DCC6] font-semibold">
                Officium Supremum • Study Library &amp; Vault
              </span>
            </div>

            {/* Editorial Display Headline */}
            <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-[#E8DCC6] leading-[1.08]">
              Curated Study Notes &amp; <br />
              <span className="text-[#E8DCC6] italic font-normal">
                Exam Blueprints.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#E8DCC6]/80 font-sans leading-relaxed">
              Access chapter-wise notes, solved practice questions, previous years&apos; papers, and detailed exam patterns for NDA and CDS.
            </p>

            {/* Student Auth Action (When Not Signed In) */}
            {!user && (
              <div className="pt-2 flex items-center">
                <button
                  onClick={() => openAuthModal("signin", "/resources")}
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#722F37] hover:bg-[#853741] text-[#E8DCC6] text-xs font-label uppercase tracking-widest font-bold transition-all shadow-md hover:shadow-lg border border-[#E8DCC6]/20 active:scale-95"
                >
                  <Lock className="w-3.5 h-3.5 text-[#E8DCC6]" />
                  <span>Student Sign In</span>
                </button>
              </div>
            )}

            {/* Category Indicators */}
            <div className="pt-4 flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-[#B7A89A] font-label uppercase tracking-widest">
              <span>• Free Syllabus Blueprints</span>
              <span>• Free Solved PYQ Papers</span>
              <span>• Comprehensive Subject Volumes</span>
            </div>

          </div>
        </div>
      </section>

      {/* Smooth dissolution: Near Black (#211C1D) into Supporting Cream (#FAF7F2) */}
      <div
        className="w-full h-16 sm:h-24 pointer-events-none relative z-10"
        style={{ background: "linear-gradient(to bottom, #211C1D 0%, #34292B 20%, #685354 45%, #B7A89A 70%, #E8DCC6 88%, #FAF7F2 100%)" }}
        aria-hidden="true"
      />

      {/* ========================================================================= */}
      {/* 2. BOOK-WISE GLASS FOLDERS SHOWCASE (Supporting Cream Ground)            */}
      {/* ========================================================================= */}
      <section id="folders-showcase" className="py-20 lg:py-24 bg-[#FAF7F2] text-[#211C1D] relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="space-y-2">
              <div className="font-label text-xs uppercase tracking-[0.2em] text-[#722F37] font-semibold">
                Official Study Volumes ({AVAILABLE_BOOKS.length} Folders)
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#211C1D]">
                Study Materials &amp; Question Banks
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#5C524F] font-sans max-w-md leading-relaxed">
              Click any folder below to open chapter notes, practice sheets, and previous year question papers.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-8 lg:gap-10">
            {AVAILABLE_BOOKS.map((book, idx) => (
              <div key={book.id} className="flex flex-col items-center">
                <GlassFolder
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
                    const documentRef = file.documentKey ? `vault:${file.documentKey}` : file.pdf;
                    if (documentRef) handleOpenFolder(book, documentRef, file.name);
                  }}
                  menu={[
                    {
                      label: `Open ${book.label}`,
                      onSelect: () => handleOpenFolder(book),
                    },
                  ]}
                />
                <Link
                  href={book.previewHref}
                  className="mt-4 inline-flex items-center gap-2 text-xs font-label uppercase tracking-wider text-[#211C1D] hover:text-[#722F37] font-semibold transition-colors py-2 px-4 rounded-xl border border-[#E8DCC6] bg-white hover:bg-[#FAF7F2] shadow-soft-sm hover:shadow-soft-md"
                >
                  <span>Free Preview &amp; Chapters</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#722F37]" />
                </Link>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. SPECIFIC FOLDER VIEWER (Opens only on click of specific folder)         */}
      {/* ========================================================================= */}
      {isVaultOpen ? (
        <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-[#FAF7F2] text-[#211C1D] animate-fadeIn relative z-10">
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
        <section className="py-16 px-4 text-center bg-[#FAF7F2] text-[#211C1D] relative z-10">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-[#E8DCC6] text-xs font-label uppercase tracking-widest text-[#B7A89A] shadow-soft-sm">
            <span>Click any folder above to open and read its chapters</span>
          </div>
        </section>
      )}

      {/* Smooth dissolution: Supporting Cream (#FAF7F2) into Burgundy (#722F37) */}
      <div
        className="w-full h-16 sm:h-24 pointer-events-none relative z-10"
        style={{ background: "linear-gradient(to bottom, #FAF7F2 0%, #F5EDE6 15%, #EAD4D6 35%, #C7828A 60%, #994751 82%, #722F37 100%)" }}
        aria-hidden="true"
      />

      {/* ========================================================================= */}
      {/* 4. CLOSING GUIDANCE CALLOUT BANNER (#722F37 Burgundy Canvas)              */}
      {/* ========================================================================= */}
      <section className="py-24 text-center bg-[#722F37] relative z-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-6">

          <h2 className="font-heading text-3xl sm:text-5xl font-semibold text-[#E8DCC6]">
            Need Guidance with Study Materials?
          </h2>

          <p className="text-sm sm:text-base text-[#E8DCC6]/85 font-sans max-w-lg mx-auto leading-relaxed">
            Speak with an academic mentor to review your syllabus coverage and receive a personalized preparation roadmap.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => openOrientation("general")}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#211C1D] hover:bg-[#282224] text-[#E8DCC6] font-label font-bold text-xs uppercase tracking-widest shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95 border border-[#E8DCC6]/20"
            >
              Book a Free 20-Minute Call
            </button>

            <a
              href="https://wa.me/918969634656?text=Hello%20Officium%20Supremum,%20I%20have%20a%20query%20about%20study%20materials"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-full border border-[#E8DCC6]/30 hover:border-[#E8DCC6] text-[#E8DCC6] font-label text-xs uppercase tracking-widest hover:bg-[#E8DCC6]/10 transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat with an Advisor on WhatsApp</span>
            </a>
          </div>

        </div>
      </section>

      {/* Smooth dissolution: Burgundy (#722F37) into Footer Near Black (#211C1D) */}
      <div
        className="w-full h-16 sm:h-24 pointer-events-none relative z-10"
        style={{ background: "linear-gradient(to bottom, #722F37 0%, #5E262D 25%, #461E23 50%, #331C1F 75%, #211C1D 100%)" }}
        aria-hidden="true"
      />

    </div>
  );
}
