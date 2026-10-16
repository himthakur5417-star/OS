"use client";

import React, { useState, useMemo } from "react";
import {
  BookOpen,
  Search,
  CheckCircle2,
  AlertCircle,
  FileText,
  Shield,
  Compass,
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
} from "lucide-react";

export type SyllabusTrack = "nda" | "cds";

interface Props {
  initialTrack?: SyllabusTrack;
  initialSection?: string;
}

export default function SyllabusDossier({ initialTrack = "nda", initialSection = "all" }: Props) {
  const [activeTrack, setActiveTrack] = useState<SyllabusTrack>(initialTrack);
  const [activeSection, setActiveSection] = useState<string>(initialSection);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(`${window.location.origin}/resources#syllabus-dossier`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div id="syllabus-dossier" className="w-full max-w-7xl mx-auto scroll-mt-24">
      {/* Dossier Top Banner */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10 mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-[#FAF5E6] to-transparent rounded-full blur-3xl pointer-events-none -mr-20 -mt-20 opacity-70" />
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-white text-[11px] font-label uppercase tracking-widest mb-3">
              <Shield className="w-3.5 h-3.5 text-[#C8A84E]" />
              <span>Official UPSC Examination Blueprint</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-semibold tracking-tight text-[#0B192C]">
              UPSC Defence Examination Blueprint
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl font-sans leading-relaxed">
              Systematically arranged, verified syllabus frameworks for National Defence Academy (NDA &amp; NA) and Combined Defence Services (CDS) examinations.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-label uppercase tracking-wider font-semibold text-slate-700 shadow-sm transition-all"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-[#C8A84E]" />}
              <span>{copied ? "Link Copied" : "Copy Syllabus Link"}</span>
            </button>
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0B192C] hover:bg-[#1B2838] text-white text-xs font-label uppercase tracking-wider font-semibold shadow-sm transition-all"
            >
              <Printer className="w-4 h-4 text-[#C8A84E]" />
              <span>Print Curriculum</span>
            </button>
          </div>
        </div>

        {/* Master Syllabus Track Switcher */}
        <div className="mt-8 pt-6 border-t border-slate-200/80 flex flex-wrap gap-3">
          <button
            onClick={() => {
              setActiveTrack("nda");
              setActiveSection("all");
            }}
            className={`flex items-center gap-3 px-5 py-3 rounded-2xl text-xs sm:text-sm font-label uppercase tracking-wider font-semibold transition-all shadow-sm ${
              activeTrack === "nda"
                ? "bg-[#0B192C] text-white ring-2 ring-[#C8A84E]/40"
                : "bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200"
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#C8A84E]" />
            <span>Track A: NDA Syllabus &amp; Pattern (10+2 Cadet)</span>
          </button>

          <button
            onClick={() => {
              setActiveTrack("cds");
              setActiveSection("all");
            }}
            className={`flex items-center gap-3 px-5 py-3 rounded-2xl text-xs sm:text-sm font-label uppercase tracking-wider font-semibold transition-all shadow-sm ${
              activeTrack === "cds"
                ? "bg-[#0B192C] text-white ring-2 ring-sky-500/40"
                : "bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200"
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-sky-500" />
            <span>Track B: CDS Syllabus &amp; Pattern (Graduate Entry)</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="mt-6 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              activeTrack === "nda"
                ? "Search NDA topics (e.g. Calculus, Trigonometry, Optics, Renaissance, Modern History, Current Affairs)..."
                : "Search CDS topics (e.g. Number System, Mensuration, Spotting Error, PPDT, Panchayati Raj)..."
            }
            className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-sans focus:outline-none focus:ring-2 focus:ring-[#0B192C] focus:bg-white text-slate-900 placeholder-slate-400 transition-all"
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
      </div>

      {/* TRACK A: NDA SYLLABUS DOSSIER */}
      {activeTrack === "nda" && (
        <div className="space-y-8 animate-fadeIn">
          {/* Serial Module 01: Exam Architecture */}
          <section className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-slate-900 to-[#1B2838] text-white px-6 sm:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="font-label text-xs tracking-widest text-[#C8A84E] uppercase font-bold bg-[#C8A84E]/10 border border-[#C8A84E]/30 px-2.5 py-1 rounded">
                  SERIAL 01
                </span>
                <h3 className="font-heading text-lg sm:text-xl font-semibold">
                  NDA Examination Architecture &amp; Standard Highlights
                </h3>
              </div>
              <span className="text-xs font-label uppercase tracking-widest text-slate-300">
                UPSC Official Standard · Bi-Annual
              </span>
            </div>

            <div className="p-6 sm:p-8">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-amber-200/60">
                  <div className="font-label text-[11px] uppercase tracking-wider text-slate-500 font-semibold">
                    Written Exam
                  </div>
                  <div className="font-heading text-2xl font-bold text-[#0B192C] mt-1">900 Marks</div>
                  <div className="text-xs text-slate-600 mt-0.5">Maths (300) + GAT (600)</div>
                </div>
                <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-amber-200/60">
                  <div className="font-label text-[11px] uppercase tracking-wider text-slate-500 font-semibold">
                    Total Questions
                  </div>
                  <div className="font-heading text-2xl font-bold text-[#0B192C] mt-1">270 Qs</div>
                  <div className="text-xs text-slate-600 mt-0.5">120 Maths + 150 GAT</div>
                </div>
                <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-amber-200/60">
                  <div className="font-label text-[11px] uppercase tracking-wider text-slate-500 font-semibold">
                    Total Duration
                  </div>
                  <div className="font-heading text-2xl font-bold text-[#0B192C] mt-1">5 Hours</div>
                  <div className="text-xs text-slate-600 mt-0.5">2.5 Hours Each Paper</div>
                </div>
                <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-amber-200/60">
                  <div className="font-label text-[11px] uppercase tracking-wider text-slate-500 font-semibold">
                    SSB Interview
                  </div>
                  <div className="font-heading text-2xl font-bold text-[#0B192C] mt-1">900 Marks</div>
                  <div className="text-xs text-slate-600 mt-0.5">5-Day Intelligence Board</div>
                </div>
              </div>

              {/* Verified Parameters Table */}
              <div className="overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full text-left text-xs sm:text-sm font-sans">
                  <thead className="bg-slate-50 border-b border-slate-200 font-label uppercase text-slate-600 tracking-wider">
                    <tr>
                      <th className="py-3 px-4 sm:px-6 w-1/3">Statutory Parameter</th>
                      <th className="py-3 px-4 sm:px-6">Prescribed Specification</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr>
                      <td className="py-3.5 px-4 sm:px-6 font-semibold text-[#0B192C]">Name of Examination</td>
                      <td className="py-3.5 px-4 sm:px-6">National Defence Academy &amp; Naval Academy Examination (NDA &amp; NA)</td>
                    </tr>
                    <tr>
                      <td className="py-3.5 px-4 sm:px-6 font-semibold text-[#0B192C]">Conducting Authority</td>
                      <td className="py-3.5 px-4 sm:px-6">Union Public Service Commission (UPSC)</td>
                    </tr>
                    <tr>
                      <td className="py-3.5 px-4 sm:px-6 font-semibold text-[#0B192C]">Exam Frequency</td>
                      <td className="py-3.5 px-4 sm:px-6">Bi-annually: NDA-I (April) &amp; NDA-II (September)</td>
                    </tr>
                    <tr>
                      <td className="py-3.5 px-4 sm:px-6 font-semibold text-[#0B192C]">Cadet Eligibility</td>
                      <td className="py-3.5 px-4 sm:px-6">Unmarried Female and Male Candidates (Age: 16.5 to 19.5 Years)</td>
                    </tr>
                    <tr>
                      <td className="py-3.5 px-4 sm:px-6 font-semibold text-[#0B192C]">Educational Qualification</td>
                      <td className="py-3.5 px-4 sm:px-6">
                        <strong>Army Wing:</strong> 10+2 passed or appearing in any recognized stream.<br />
                        <strong>Air Force &amp; Naval Wings:</strong> 10+2 passed or appearing with Physics, Chemistry &amp; Mathematics (PCM).
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3.5 px-4 sm:px-6 font-semibold text-[#0B192C]">Negative Marking Rules</td>
                      <td className="py-3.5 px-4 sm:px-6">
                        Mathematics: <span className="text-rose-600 font-semibold">-0.83 marks</span> per incorrect answer.<br />
                        GAT: <span className="text-rose-600 font-semibold">-1.33 marks</span> per incorrect answer.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Serial Module 02: Paper 1 Mathematics */}
          <section className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-slate-900 to-[#1B2838] text-white px-6 sm:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="font-label text-xs tracking-widest text-[#C8A84E] uppercase font-bold bg-[#C8A84E]/10 border border-[#C8A84E]/30 px-2.5 py-1 rounded">
                  SERIAL 02
                </span>
                <h3 className="font-heading text-lg sm:text-xl font-semibold">
                  Paper 1: Mathematics (Code 01 · 120 Qs · 300 Marks)
                </h3>
              </div>
              <span className="text-xs font-label uppercase tracking-widest text-slate-300">
                Class 11 &amp; 12 NCERT Level · +2.5 / -0.83
              </span>
            </div>

            <div className="p-6 sm:p-8">
              {/* Question Weightage Indicators */}
              <div className="mb-8">
                <div className="font-label text-xs uppercase tracking-wider text-[#C8A84E] font-semibold mb-2">
                  Topic-Wise Question Weightage Distribution (UPSC Historical Averages)
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                  {[
                    { topic: "Matrices & Determinants", count: "30 Qs", pct: "100%" },
                    { topic: "Trigonometry & Inv", count: "30 Qs", pct: "100%" },
                    { topic: "Calculus (Diff & Int)", count: "20–25 Qs", pct: "80%" },
                    { topic: "Quadratic & Algebra", count: "15–20 Qs", pct: "65%" },
                    { topic: "Complex Numbers", count: "10–15 Qs", pct: "50%" },
                    { topic: "Probability & Stats", count: "10 Qs", pct: "35%" },
                  ].map((item, i) => (
                    <div key={i} className="bg-slate-50 border border-slate-200 p-3 rounded-xl">
                      <div className="text-[11px] font-sans font-medium text-slate-600 truncate">{item.topic}</div>
                      <div className="font-heading font-bold text-slate-900 text-sm mt-0.5">{item.count}</div>
                      <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
                        <div className="bg-[#C8A84E] h-full rounded-full" style={{ width: item.pct }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Serial Chapter Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    code: "CH 02.1",
                    title: "Algebra & Number Theory",
                    desc: "Sets, Venn diagrams, De Morgan laws, Cartesian product, relations, equivalence relations. Real and Complex numbers, Modulus, cube roots of unity. Conversion between Binary and Decimal systems. Arithmetic, Geometric, and Harmonic progressions (AP, GP, HP). Quadratic equations, Linear inequations, Permutations and Combinations, Binomial theorem, Logarithms.",
                  },
                  {
                    code: "CH 02.2",
                    title: "Matrices & Determinants",
                    desc: "Types of matrices, matrix operations (addition, multiplication, transpose). Determinants of square matrices, properties of determinants. Adjoint and inverse of matrices. Applications: Solution of systems of linear equations in 2 or 3 unknowns by Cramer’s Rule and Matrix Inverse Method.",
                  },
                  {
                    code: "CH 02.3",
                    title: "Trigonometry",
                    desc: "Angles and measurement in degrees and radians. Trigonometric ratios and standard identities. Sum and difference formulae, multiple and sub-multiple angles. Inverse trigonometric functions. Applications: Heights and distances, properties of triangles.",
                  },
                  {
                    code: "CH 02.4",
                    title: "Differential Calculus",
                    desc: "Real-valued functions, domain, range, and graphs. Composite, one-to-one, onto, and inverse functions. Limits, standard limits, continuity of functions. Derivatives at a point, geometrical and physical interpretations. Derivatives of composite, product, quotient, and implicit functions. Second-order derivatives, increasing/decreasing functions, maxima and minima.",
                  },
                  {
                    code: "CH 02.5",
                    title: "Integral Calculus & Differential Equations",
                    desc: "Integration as inverse of differentiation, integration by substitution and parts. Standard integrals (algebraic, trigonometric, exponential, hyperbolic). Evaluation of definite integrals and areas bounded by plane curves. Order and degree of differential equations, formation and solutions of first-order first-degree equations. Growth and decay problems.",
                  },
                  {
                    code: "CH 02.6",
                    title: "Vector Algebra",
                    desc: "Vectors in 2D and 3D space, magnitude and direction. Unit and null vectors, addition, scalar multiplication. Dot (scalar) product and Cross (vector) product. Applications: work done by a force, moment of a force, and geometrical problems.",
                  },
                  {
                    code: "CH 02.7",
                    title: "Analytical Geometry (2D & 3D)",
                    desc: "2D: Cartesian coordinate system, distance formula, line equations in various forms, angle between lines, distance of point from line. Circles, parabolas, ellipses, hyperbolas, eccentricity. 3D: Coordinate axes, distance between points, direction cosines/ratios, equation of planes and lines, equation of a sphere.",
                  },
                  {
                    code: "CH 02.8",
                    title: "Statistics & Probability",
                    desc: "Probability: Random experiments, sample space, mutually exclusive and exhaustive events. Classical and statistical definitions. Conditional probability, Bayes’ theorem. Random variables, Binomial distribution. Statistics: Frequency distributions, measures of central tendency (mean, median, mode), and measures of dispersion (variance, standard deviation).",
                  },
                ].map((ch, i) => (
                  <div key={i} className="border border-slate-200 rounded-2xl p-5 hover:border-slate-300 transition-all bg-white">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-label text-[10px] uppercase tracking-widest text-[#C8A84E] font-bold bg-[#FAF5E6] px-2 py-0.5 rounded">
                        {ch.code}
                      </span>
                      <span className="text-[11px] font-sans text-slate-400">Class 11/12 NCERT</span>
                    </div>
                    <h4 className="font-heading font-semibold text-[#0B192C] text-base mb-2">{ch.title}</h4>
                    <p className="text-xs text-slate-600 font-sans leading-relaxed">{ch.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Serial Module 03: Paper 2 GAT */}
          <section className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-slate-900 to-[#1B2838] text-white px-6 sm:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="font-label text-xs tracking-widest text-[#C8A84E] uppercase font-bold bg-[#C8A84E]/10 border border-[#C8A84E]/30 px-2.5 py-1 rounded">
                  SERIAL 03
                </span>
                <h3 className="font-heading text-lg sm:text-xl font-semibold">
                  Paper 2: General Ability Test (Code 02 · 150 Qs · 600 Marks)
                </h3>
              </div>
              <span className="text-xs font-label uppercase tracking-widest text-slate-300">
                Part A (English - 200 M) + Part B (GK - 400 M)
              </span>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              {/* Part A: English */}
              <div className="border border-slate-200 rounded-2xl p-6 bg-[#FAF7F2]">
                <div className="flex items-center justify-between mb-3">
                  <div className="font-label text-xs uppercase tracking-widest text-sky-800 font-bold">
                    MODULE 03.1 // PART A: ENGLISH (50 QUESTIONS · 200 MARKS)
                  </div>
                  <span className="text-xs font-label uppercase text-slate-500 font-semibold">+4 / -1.33 Marks</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 font-sans mb-4 leading-relaxed">
                  Tests candidate proficiency in English language, syntactic precision, vocabulary depth, and contextual comprehension.
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Spotting of Errors",
                    "Sentence Improvement",
                    "Grammar & Usage",
                    "Vocabulary & Idioms",
                    "Synonyms & Antonyms",
                    "Fill in the Blanks",
                    "Cloze Test",
                    "Para Jumbling",
                    "Reading Comprehension",
                    "Sentence Completion",
                  ].map((topic, idx) => (
                    <span key={idx} className="bg-white border border-slate-200 px-3 py-1 rounded-lg text-xs font-sans text-slate-800 font-medium">
                      • {topic}
                    </span>
                  ))}
                </div>
              </div>

              {/* Part B: General Knowledge & Sciences */}
              <div className="border border-slate-200 rounded-2xl p-6 bg-white">
                <div className="font-label text-xs uppercase tracking-widest text-[#0B192C] font-bold mb-4">
                  MODULE 03.2 // PART B: GENERAL KNOWLEDGE &amp; SCIENCES (100 QUESTIONS · 400 MARKS)
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <div className="font-heading font-semibold text-slate-900 text-sm mb-1">
                      Physics (~25 Qs / ~100 M)
                    </div>
                    <p className="text-xs text-slate-600 font-sans leading-relaxed">
                      States of matter, Archimedes principle, Newton’s laws of motion, gravitation, heat transference, optics (reflection, refraction, lenses), sound waves, electricity, Ohm’s law, magnetism, simple machines (pulleys, siphon, barometer, hydrometer, telescope, periscope).
                    </p>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <div className="font-heading font-semibold text-slate-900 text-sm mb-1">
                      Chemistry (~15 Qs / ~60 M)
                    </div>
                    <p className="text-xs text-slate-600 font-sans leading-relaxed">
                      Physical and chemical changes, elements, mixtures, compounds. Preparation of H2, O2, N2, CO2. Acids, bases, salts. Allotropes of Carbon, fertilizers, soap, glass, cement, ink, paper, gunpowder. Atomic structure, valency, molecular weights.
                    </p>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <div className="font-heading font-semibold text-slate-900 text-sm mb-1">
                      General Science &amp; Biology (~10 Qs / ~40 M)
                    </div>
                    <p className="text-xs text-slate-600 font-sans leading-relaxed">
                      Living vs non-living, cell biology, plant and animal growth &amp; reproduction. Human anatomy and vital organ systems. Nutrition, constituents of balanced diet. Epidemics, causes and disease prevention.
                    </p>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <div className="font-heading font-semibold text-slate-900 text-sm mb-1">
                      History &amp; Freedom Movement (~20 Qs / ~80 M)
                    </div>
                    <p className="text-xs text-slate-600 font-sans leading-relaxed">
                      Survey of Indian History, culture and civilization. Freedom Movement (1857 to 1947). Modern world forces: Renaissance, American War of Independence, French and Industrial Revolutions. Indian Constitution, Panchayati Raj, Five Year Plans, teachings of Mahatma Gandhi.
                    </p>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <div className="font-heading font-semibold text-slate-900 text-sm mb-1">
                      Geography (~20 Qs / ~80 M)
                    </div>
                    <p className="text-xs text-slate-600 font-sans leading-relaxed">
                      Earth shape, size, rotation, revolution, latitudes/longitudes, time zones. Weathering, earthquakes, volcanoes. Ocean currents and tides. Atmosphere, planetary winds, cyclones. Indian regional geography (climate, vegetation, minerals, ports, trade routes).
                    </p>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <div className="font-heading font-semibold text-slate-900 text-sm mb-1">
                      Current Affairs (~10 Qs / ~40 M)
                    </div>
                    <p className="text-xs text-slate-600 font-sans leading-relaxed">
                      Major national and international events, defense exercises, bilateral treaties, prominent personalities, sports championships, scientific milestones, and cultural awards.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Serial Module 04: SSB Interview Protocol */}
          <section className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-slate-900 to-[#1B2838] text-white px-6 sm:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="font-label text-xs tracking-widest text-[#C8A84E] uppercase font-bold bg-[#C8A84E]/10 border border-[#C8A84E]/30 px-2.5 py-1 rounded">
                  SERIAL 04
                </span>
                <h3 className="font-heading text-lg sm:text-xl font-semibold">
                  Stage II: Services Selection Board (SSB) 5-Day Protocol (900 Marks)
                </h3>
              </div>
              <span className="text-xs font-label uppercase tracking-widest text-slate-300">
                Screening + Psychological + GTO + Interview + Conference
              </span>
            </div>

            <div className="p-6 sm:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-slate-200 rounded-2xl p-5 bg-slate-50">
                  <div className="font-label text-xs uppercase tracking-wider text-slate-500 font-bold mb-2">
                    DAY 1 // STAGE 1 SCREENING TEST
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-700 font-sans">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#C8A84E] shrink-0 mt-0.5" />
                      <span><strong>Officer Intelligence Rating (OIR):</strong> Verbal &amp; non-verbal reasoning aptitude tests.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#C8A84E] shrink-0 mt-0.5" />
                      <span><strong>Picture Perception &amp; Description Test (PPDT):</strong> 30-second slide projection, individual story writing &amp; group discussion.</span>
                    </li>
                  </ul>
                </div>

                <div className="border border-slate-200 rounded-2xl p-5 bg-slate-50">
                  <div className="font-label text-xs uppercase tracking-wider text-slate-500 font-bold mb-2">
                    DAYS 2 TO 5 // STAGE 2 COMPREHENSIVE ASSESSMENT
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-700 font-sans">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Psychological Battery:</strong> Thematic Apperception Test (TAT), Word Association (WAT), Situation Reaction (SRT), Self Description (SD).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>GTO Indoor &amp; Outdoor Tasks:</strong> Group Discussion (GD), Group Planning (GPE), Progressive Group Tasks (PGT), Half Group Task (HGT), Lecturette.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Personal Interview:</strong> Conducted by Interviewing Officer (IO) evaluating Officer Like Qualities (OLQ).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Board Conference:</strong> All assessors finalize recommendation on Day 5.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* TRACK B: CDS SYLLABUS DOSSIER */}
      {activeTrack === "cds" && (
        <div className="space-y-8 animate-fadeIn">
          {/* Serial Module 01: CDS Academy Pathways */}
          <section className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-slate-900 to-[#1B2838] text-white px-6 sm:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="font-label text-xs tracking-widest text-sky-400 uppercase font-bold bg-sky-400/10 border border-sky-400/30 px-2.5 py-1 rounded">
                  SERIAL 01
                </span>
                <h3 className="font-heading text-lg sm:text-xl font-semibold">
                  CDS Examination Architecture &amp; Academy Tracks (2025)
                </h3>
              </div>
              <span className="text-xs font-label uppercase tracking-widest text-slate-300">
                UPSC Graduate Entry · IMA, INA, AFA &amp; OTA
              </span>
            </div>

            <div className="p-6 sm:p-8">
              <div className="overflow-x-auto rounded-2xl border border-slate-200 mb-6">
                <table className="w-full text-left text-xs sm:text-sm font-sans">
                  <thead className="bg-slate-50 border-b border-slate-200 font-label uppercase text-slate-600 tracking-wider">
                    <tr>
                      <th className="py-3 px-4 sm:px-6">Academy Track</th>
                      <th className="py-3 px-4 sm:px-6">Prescribed Subjects</th>
                      <th className="py-3 px-4 sm:px-6">Duration</th>
                      <th className="py-3 px-4 sm:px-6">Written Marks</th>
                      <th className="py-3 px-4 sm:px-6">SSB Marks</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr>
                      <td className="py-4 px-4 sm:px-6 font-semibold text-slate-900">
                        IMA, INA &amp; AFA<br />
                        <span className="text-xs text-slate-500 font-normal">Indian Military, Naval &amp; Air Force Academies</span>
                      </td>
                      <td className="py-4 px-4 sm:px-6">
                        1. English<br />
                        2. General Knowledge<br />
                        3. Elementary Mathematics
                      </td>
                      <td className="py-4 px-4 sm:px-6">2 Hours per subject (6 Hours Total)</td>
                      <td className="py-4 px-4 sm:px-6 font-bold text-sky-700">300 Marks (100 per paper)</td>
                      <td className="py-4 px-4 sm:px-6 font-bold text-slate-900">300 Marks (5 Days)</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-4 sm:px-6 font-semibold text-slate-900">
                        Officers Training Academy (OTA)<br />
                        <span className="text-xs text-slate-500 font-normal">Men &amp; Women Short Service Commission</span>
                      </td>
                      <td className="py-4 px-4 sm:px-6">
                        1. English<br />
                        2. General Knowledge<br />
                        <span className="text-rose-600 font-medium">(Mathematics paper excluded)</span>
                      </td>
                      <td className="py-4 px-4 sm:px-6">2 Hours per subject (4 Hours Total)</td>
                      <td className="py-4 px-4 sm:px-6 font-bold text-emerald-700">200 Marks (100 per paper)</td>
                      <td className="py-4 px-4 sm:px-6 font-bold text-slate-900">300 Marks (5 Days)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Serial Module 02: CDS Mathematics */}
          <section className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-slate-900 to-[#1B2838] text-white px-6 sm:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="font-label text-xs tracking-widest text-sky-400 uppercase font-bold bg-sky-400/10 border border-sky-400/30 px-2.5 py-1 rounded">
                  SERIAL 02
                </span>
                <h3 className="font-heading text-lg sm:text-xl font-semibold">
                  Elementary Mathematics (For IMA, INA &amp; AFA · 100 Marks)
                </h3>
              </div>
              <span className="text-xs font-label uppercase tracking-widest text-slate-300">
                100 Marks · 2 Hours Duration
              </span>
            </div>

            <div className="p-6 sm:p-8">
              {/* Question Weightage Indicators from PDF */}
              <div className="mb-8">
                <div className="font-label text-xs uppercase tracking-wider text-sky-700 font-semibold mb-2">
                  Estimated CDS 1 2025 Mathematics Question Weightage
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {[
                    { topic: "Number System", count: "20–22 Questions", pct: "100%" },
                    { topic: "Mensuration", count: "14–16 Questions", pct: "75%" },
                    { topic: "Geometry", count: "10–12 Questions", pct: "55%" },
                    { topic: "Trigonometry", count: "10–12 Questions", pct: "55%" },
                    { topic: "Algebra", count: "10–11 Questions", pct: "50%" },
                  ].map((item, i) => (
                    <div key={i} className="bg-slate-50 border border-slate-200 p-3 rounded-xl">
                      <div className="text-[11px] font-sans font-medium text-slate-600">{item.topic}</div>
                      <div className="font-heading font-bold text-slate-900 text-sm mt-0.5">{item.count}</div>
                      <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
                        <div className="bg-sky-600 h-full rounded-full" style={{ width: item.pct }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Serial Math Chapters from PDF */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    code: "CH 02.1",
                    title: "Number System & Arithmetic",
                    desc: "Natural numbers, integers, rational and real numbers. Fundamental operations (addition, subtraction, multiplication, division), square roots, decimal fractions, unitary method, time and distance, time and work, percentages, simple and compound interest applications, profit and loss, ratio and proportion, variation.",
                  },
                  {
                    code: "CH 02.2",
                    title: "Elementary Number Theory",
                    desc: "Division algorithm, prime and composite numbers, divisibility tests for 2, 3, 4, 5, 9, 11. Multiples and factors, factorization theorem, H.C.F. and L.C.M., Euclidean algorithm, logarithms to base 10, laws of logarithms, use of logarithmic tables.",
                  },
                  {
                    code: "CH 02.3",
                    title: "Algebra & Polynomials",
                    desc: "Basic operations, simple factors, remainder theorem, HCF & LCM of polynomials, theory of polynomials, solutions of quadratic equations, relations between roots and coefficients, simultaneous linear equations (analytical & graphical), simultaneous linear inequations, practical problems, set language, rational expressions, laws of indices.",
                  },
                  {
                    code: "CH 02.4",
                    title: "Trigonometry",
                    desc: "Sine x, cosine x, tan x when 0° < x < 90°. Values of sin x, cos x, tan x for 0°, 30°, 45°, 60° & 90°. Simple trigonometric identities, use of trigonometric tables, simple practical cases of heights and distances.",
                  },
                  {
                    code: "CH 02.5",
                    title: "Geometry",
                    desc: "Lines and angles, plane figures, theorems on properties of angles at a point, parallel lines. Sides and angles of triangles, congruency, similar triangles, concurrence of medians and altitudes. Properties of angles, sides and diagonals of parallelograms, rectangles, squares. Circles and properties including tangents, normals, loci.",
                  },
                  {
                    code: "CH 02.6",
                    title: "Mensuration (2D & 3D)",
                    desc: "Areas of parallelograms, squares, rectangles, triangles, circles. Areas of figures that can be split into these (Field Book). Lateral surface and volume of right circular cones and cylinders. Surface area and volume of cuboids, and surface area and volume of spheres.",
                  },
                  {
                    code: "CH 02.7",
                    title: "Statistics",
                    desc: "Collection and tabulation of statistical data, graphical representation (frequency polygons, histograms, bar charts, pie charts), measures of central tendency (mean, median, mode).",
                  },
                ].map((ch, i) => (
                  <div key={i} className="border border-slate-200 rounded-2xl p-5 hover:border-slate-300 transition-all bg-white">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-label text-[10px] uppercase tracking-widest text-sky-700 font-bold bg-sky-50 px-2 py-0.5 rounded">
                        {ch.code}
                      </span>
                      <span className="text-[11px] font-sans text-slate-400">IMA/INA/AFA Standard</span>
                    </div>
                    <h4 className="font-heading font-semibold text-[#0B192C] text-base mb-2">{ch.title}</h4>
                    <p className="text-xs text-slate-600 font-sans leading-relaxed">{ch.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Serial Module 03: CDS English */}
          <section className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-slate-900 to-[#1B2838] text-white px-6 sm:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="font-label text-xs tracking-widest text-sky-400 uppercase font-bold bg-sky-400/10 border border-sky-400/30 px-2.5 py-1 rounded">
                  SERIAL 03
                </span>
                <h3 className="font-heading text-lg sm:text-xl font-semibold">
                  English Language &amp; Professional Usage (All Academies · 100 Marks)
                </h3>
              </div>
              <span className="text-xs font-label uppercase tracking-widest text-slate-300">
                100 Marks · 2 Hours Duration
              </span>
            </div>

            <div className="p-6 sm:p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="border border-slate-200 rounded-2xl p-5 bg-slate-50">
                  <div className="font-label text-xs uppercase tracking-wider text-slate-500 font-bold mb-2">
                    SECTION A // VOCABULARY
                  </div>
                  <p className="text-xs text-slate-600 font-sans mb-3">
                    Evaluates lexical depth and precise vocabulary application.
                  </p>
                  <ul className="space-y-1.5 text-xs text-slate-700 font-sans">
                    <li>• Basic Grammar</li>
                    <li>• Idioms &amp; Phrases</li>
                    <li>• Synonyms &amp; Antonyms</li>
                    <li>• Sentence Completion</li>
                  </ul>
                </div>

                <div className="border border-slate-200 rounded-2xl p-5 bg-slate-50">
                  <div className="font-label text-xs uppercase tracking-wider text-slate-500 font-bold mb-2">
                    SECTION B // READING PASSAGE
                  </div>
                  <p className="text-xs text-slate-600 font-sans mb-3">
                    Tests analytical comprehension and passage interpretation.
                  </p>
                  <ul className="space-y-1.5 text-xs text-slate-700 font-sans">
                    <li>• Reading Comprehension Solving</li>
                    <li>• Para Jumbles</li>
                    <li>• Understanding main idea &amp; details</li>
                    <li>• Passage-based deducing questions</li>
                  </ul>
                </div>

                <div className="border border-slate-200 rounded-2xl p-5 bg-slate-50">
                  <div className="font-label text-xs uppercase tracking-wider text-slate-500 font-bold mb-2">
                    SECTION C // GRAMMAR
                  </div>
                  <p className="text-xs text-slate-600 font-sans mb-3">
                    Assesses syntactic rules and transformational command.
                  </p>
                  <ul className="space-y-1.5 text-xs text-slate-700 font-sans">
                    <li>• Error Spotting &amp; Sentence Improvement</li>
                    <li>• Cloze Test</li>
                    <li>• Active and Passive Voice</li>
                    <li>• Direct and Indirect Speech</li>
                    <li>• Transformation of Sentences</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Serial Module 04: General Knowledge */}
          <section className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-slate-900 to-[#1B2838] text-white px-6 sm:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="font-label text-xs tracking-widest text-sky-400 uppercase font-bold bg-sky-400/10 border border-sky-400/30 px-2.5 py-1 rounded">
                  SERIAL 04
                </span>
                <h3 className="font-heading text-lg sm:text-xl font-semibold">
                  General Knowledge &amp; National Security (All Academies · 100 Marks)
                </h3>
              </div>
              <span className="text-xs font-label uppercase tracking-widest text-slate-300">
                100 Marks · 2 Hours Duration
              </span>
            </div>

            <div className="p-6 sm:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    title: "Current Affairs",
                    items: "Events of national & international importance, sports, awards & honours, books & authors, major developments in politics, economics, and social issues.",
                  },
                  {
                    title: "History of India",
                    items: "Ancient, medieval, and modern Indian history, Indian national movement (1857–1947), and growth of nationalism.",
                  },
                  {
                    title: "Geography",
                    items: "Physical, social, and economic aspects of geography. Indian geography (monsoons, rivers, soils, industries) and world geography.",
                  },
                  {
                    title: "Polity & Governance",
                    items: "Constitution of India, political system, Panchayati Raj, public policy, rights issues, and judicial mechanisms.",
                  },
                  {
                    title: "Economic Development",
                    items: "Sustainable development, poverty, inclusion, demographics, social sector initiatives, fiscal and monetary policies.",
                  },
                  {
                    title: "Science & Technology",
                    items: "Developments in science and everyday technology, space technology, biotechnology, and computer technology.",
                  },
                  {
                    title: "Ecology & Biodiversity",
                    items: "Conservation, environmental pollution and degradation, environmental impact assessment, and climate change.",
                  },
                  {
                    title: "Defence & Security",
                    items: "Current events related to national security, internal & external threats, role of Armed Forces, and defence awards.",
                  },
                ].map((mod, i) => (
                  <div key={i} className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
                    <h5 className="font-heading font-semibold text-slate-900 text-sm mb-1">{mod.title}</h5>
                    <p className="text-xs text-slate-600 font-sans leading-relaxed">{mod.items}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Serial Module 05: OTA Specifics */}
          <section className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-slate-900 to-[#1B2838] text-white px-6 sm:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="font-label text-xs tracking-widest text-emerald-400 uppercase font-bold bg-emerald-400/10 border border-emerald-400/30 px-2.5 py-1 rounded">
                  SERIAL 05
                </span>
                <h3 className="font-heading text-lg sm:text-xl font-semibold">
                  Officers Training Academy (OTA) Specific Curriculum
                </h3>
              </div>
              <span className="text-xs font-label uppercase tracking-widest text-slate-300">
                200 Marks Total · English &amp; General Ability Only
              </span>
            </div>

            <div className="p-6 sm:p-8">
              <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-amber-200/70 mb-6">
                <div className="font-label text-xs uppercase tracking-wider text-slate-600 font-semibold mb-1">
                  OTA Streamlined Syllabus Architecture
                </div>
                <p className="text-xs sm:text-sm text-slate-700 font-sans leading-relaxed">
                  For cadets aspiring to enter the Officers Training Academy (OTA Chennai), the Mathematics paper is completely omitted. The written evaluation consists exclusively of two papers: <strong>English (100 Marks)</strong> and <strong>General Knowledge (100 Marks)</strong>, followed by the 300-mark 5-day SSB Interview.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-slate-200 p-5 rounded-2xl bg-white">
                  <div className="font-label text-xs uppercase tracking-wider text-slate-500 font-bold mb-2">
                    OTA ENGLISH SPECIFIC MODULES
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      "Sentence arrangement",
                      "Spotting Error",
                      "Selecting words",
                      "Synonyms and Antonyms",
                      "Comprehension",
                      "Ordering of Sentence",
                      "Ordering of words",
                      "Idioms and Phrases",
                      "Fill in the blanks",
                    ].map((item, idx) => (
                      <span key={idx} className="bg-slate-100 text-slate-800 text-xs px-2.5 py-1 rounded-md font-sans">
                        • {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="border border-slate-200 p-5 rounded-2xl bg-white">
                  <div className="font-label text-xs uppercase tracking-wider text-slate-500 font-bold mb-2">
                    OTA GENERAL AWARENESS SCOPE
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      "Current Affairs",
                      "Physics",
                      "Chemistry",
                      "Biology",
                      "Geography",
                      "History",
                      "Politics",
                      "Sociology",
                      "Economics",
                      "Defence Related Awards",
                      "Sports and Culture",
                      "Environmental Science",
                    ].map((item, idx) => (
                      <span key={idx} className="bg-slate-100 text-slate-800 text-xs px-2.5 py-1 rounded-md font-sans">
                        • {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Serial Module 06: CDS SSB Interview */}
          <section className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-slate-900 to-[#1B2838] text-white px-6 sm:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="font-label text-xs tracking-widest text-sky-400 uppercase font-bold bg-sky-400/10 border border-sky-400/30 px-2.5 py-1 rounded">
                  SERIAL 06
                </span>
                <h3 className="font-heading text-lg sm:text-xl font-semibold">
                  CDS SSB Selection Protocol (300 Marks · 5-Day Board)
                </h3>
              </div>
              <span className="text-xs font-label uppercase tracking-widest text-slate-300">
                Independent Evaluation by IO, GTO &amp; Psychologist
              </span>
            </div>

            <div className="p-6 sm:p-8">
              <div className="overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full text-left text-xs sm:text-sm font-sans">
                  <thead className="bg-slate-50 border-b border-slate-200 font-label uppercase text-slate-600 tracking-wider">
                    <tr>
                      <th className="py-3 px-4 sm:px-6 w-1/4">SSB Stage</th>
                      <th className="py-3 px-4 sm:px-6">Assigned Tests</th>
                      <th className="py-3 px-4 sm:px-6">Evaluation Objective</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr>
                      <td className="py-4 px-4 sm:px-6 font-semibold text-slate-900">Stage 1 (Screening)</td>
                      <td className="py-4 px-4 sm:px-6">
                        • Officer Intelligence Rating (OIR)<br />
                        • Picture Perception and Descriptive Test (PPDT) &amp; Group Discussion
                      </td>
                      <td className="py-4 px-4 sm:px-6">Immediate cognitive alertness, visual perception, and logical synthesis.</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-4 sm:px-6 font-semibold text-slate-900">Stage 2 (Comprehensive)</td>
                      <td className="py-4 px-4 sm:px-6">
                        • Personal Interview with Interviewing Officer (IO)<br />
                        • Group Testing Officer (GTO) Tasks (GD, GPE, PGT, HGT, FGT, Lecturette)<br />
                        • Psychology Tests (TAT, WAT, SRT, Self Description)
                      </td>
                      <td className="py-4 px-4 sm:px-6">Comprehensive identification of Officer Like Qualities (OLQ) and trainability.</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-4 sm:px-6 font-semibold text-slate-900">Stage 3 (Final Board)</td>
                      <td className="py-4 px-4 sm:px-6">
                        • Final Board Conference<br />
                        • Group Discussion &amp; Assessor Alignment
                      </td>
                      <td className="py-4 px-4 sm:px-6">Consolidated final merit recommendation across all three assessors.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
