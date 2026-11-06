"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/components/AuthContext";
import { useModals } from "@/components/ModalContext";
import GlassFolder, { ArtPreset } from "@/components/GlassFolder";
import AcademicVaultViewer, { VaultTab } from "@/components/AcademicVaultViewer";
import { BookOpen, Lock, ArrowRight, WhatsappLogo, Sparkle } from "@phosphor-icons/react";

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
    <div className="bg-[#F3EFE6] text-[#252923] min-h-screen relative overflow-x-hidden selection:bg-[#34483C] selection:text-[#F3EFE6]">

      {/* ========================================================================= */}
      {/* 1. RESOURCES HERO SECTION                                                */}
      {/* ========================================================================= */}
      <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 border-b border-[#D8D5C8]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          {/* Headline */}
          <h1 className="heading-1 text-[#252923] text-balance">
            Curated Study Notes &amp; Exam Blueprints.
          </h1>

          {/* Subtitle */}
          <p className="body-2 text-[#252923]/75 max-w-2xl mx-auto text-pretty">
            Access chapter-wise notes, solved practice questions, previous years&apos; papers, and official syllabus blueprints for NDA and CDS.
          </p>

          {/* Student Auth Action (When Not Signed In) */}
          {!user && (
            <div className="pt-2 flex items-center justify-center">
              <button
                onClick={() => openAuthModal("signin", "/resources")}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#34483C] hover:bg-[#252923] text-[#F3EFE6] button-sm uppercase tracking-wider transition-all shadow-soft-sm"
              >
                <Lock className="w-4 h-4 text-[#F3EFE6]" weight="bold" />
                <span>Student Sign In</span>
              </button>
            </div>
          )}

          {/* Category Indicators */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-[#252923]/70 font-medium">
            <span>• Free Syllabus Blueprints</span>
            <span>• Free Solved PYQ Papers</span>
            <span>• Comprehensive Subject Volumes</span>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. BOOK-WISE GLASS FOLDERS SHOWCASE                                      */}
      {/* ========================================================================= */}
      <section id="folders-showcase" className="py-20 lg:py-24 bg-white border-b border-[#D8D5C8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div className="space-y-2">
              <div className="caption-3 uppercase tracking-widest text-[#B18A58] font-semibold">
                Official Study Volumes ({AVAILABLE_BOOKS.length} Folders)
              </div>
              <h2 className="heading-2 text-[#252923]">
                Study Materials &amp; Question Banks
              </h2>
            </div>
            <p className="body-3 text-[#252923]/70 max-w-md leading-relaxed">
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
                  className="mt-4 inline-flex items-center gap-2 caption-3 uppercase tracking-wider text-[#252923] hover:text-[#34483C] font-semibold transition-colors py-2 px-4 rounded-xl border border-[#D8D5C8] bg-white hover:bg-[#F3EFE6] shadow-soft-sm"
                >
                  <span>Free Preview &amp; Chapters</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#34483C]" weight="bold" />
                </Link>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. SPECIFIC FOLDER VIEWER                                                */}
      {/* ========================================================================= */}
      {isVaultOpen ? (
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#F3EFE6] text-[#252923] border-b border-[#D8D5C8]">
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
        <section className="py-12 px-4 text-center bg-[#F3EFE6] text-[#252923] border-b border-[#D8D5C8]">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-[#D8D5C8] caption-3 uppercase tracking-widest text-[#252923]/70 shadow-soft-sm">
            <span>Click any folder above to open and read its chapters</span>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* 4. CLOSING GUIDANCE CALLOUT (Forest Sage Canvas)                         */}
      {/* ========================================================================= */}
      <section className="py-20 lg:py-24 text-center bg-[#34483C] text-[#F3EFE6] relative">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-5">
          <h2 className="heading-2 text-[#F3EFE6] text-balance">
            Need Guidance with Study Materials?
          </h2>

          <p className="body-2 text-[#F3EFE6]/80 max-w-lg mx-auto text-pretty">
            Speak with an academic mentor to review your syllabus coverage and receive a personalized preparation roadmap.
          </p>

          <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => openOrientation("general")}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#F3EFE6] hover:bg-white text-[#252923] button-sm uppercase tracking-wider transition-colors shadow-soft-sm"
            >
              Book a Free 20-Minute Call
            </button>

            <a
              href="https://wa.me/918969634656?text=Hello%20Officium%20Supremum,%20I%20have%20a%20query%20about%20study%20materials"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl border border-[#F3EFE6]/30 hover:border-[#F3EFE6] text-[#F3EFE6] button-sm uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
            >
              <WhatsappLogo className="w-4 h-4" weight="bold" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>

        </div>
      </section>

    </div>
  );
}
