"use client";

import React, { useState } from "react";
import { useModals } from "./ModalContext";
import { 
  Bot, 
  X, 
  Sparkles, 
  BookOpen, 
  Calendar, 
  Clock, 
  CheckSquare, 
  Send, 
  ArrowRight,
  Target
} from "lucide-react";
import Link from "next/link";

interface PlanItem {
  time: string;
  activity: string;
  detail: string;
  tag: string;
}

export function AIAssistantModal() {
  const { isAiOpen, closeAi, aiInitialTab } = useModals();
  const [activeTab, setActiveTab] = useState<"syllabus" | "planner" | "accountability">(aiInitialTab || "syllabus");

  // Syllabus Generator State
  const [selectedExam, setSelectedExam] = useState("nda-maths");
  const [syllabusOutput, setSyllabusOutput] = useState<any>(null);

  // Daily Planner State
  const [plannerExam, setPlannerExam] = useState("NDA 2025");
  const [availableHours, setAvailableHours] = useState("5");
  const [generatedSchedule, setGeneratedSchedule] = useState<PlanItem[] | null>(null);

  // Accountability Check-in State
  const [hoursStudied, setHoursStudied] = useState("");
  const [topicsCompleted, setTopicsCompleted] = useState("");
  const [challengesFaced, setChallengesFaced] = useState("");
  const [accountabilityFeedback, setAccountabilityFeedback] = useState<string | null>(null);

  if (!isAiOpen) return null;

  const handleGenerateSyllabus = (examKey: string) => {
    setSelectedExam(examKey);
    if (examKey === "nda-maths") {
      setSyllabusOutput({
        title: "NDA Mathematics — 30 Chapter Blueprint (300 Marks)",
        description: "Curated from the Officium Supremum 4,330+ solved problem archive.",
        sections: [
          {
            name: "High-Yield Tier 1 (40% Weightage)",
            topics: [
              "Trigonometry & Inverse Trig (Chapters 11, 13) — ~15-20 Questions",
              "Matrices & Determinants (Chapters 09, 10) — ~10-12 Questions",
              "Vectors & 3D Geometry (Chapters 18, 19) — ~10-12 Questions",
              "Probability & Statistics (Chapters 20, 21) — ~15-18 Questions",
            ],
          },
          {
            name: "Tier 2 Calculus & Algebra Core (35% Weightage)",
            topics: [
              "Limits, Continuity & Differentiation (Chapters 23, 24, 25)",
              "Definite & Indefinite Integration (Chapters 26, 27)",
              "Complex Numbers & Quadratic Equations (Chapters 02, 05)",
              "Sequences & Series (A.P., G.P.) (Chapter 08)",
            ],
          },
          {
            name: "Tier 3 Geometry & Coordinate Systems (25% Weightage)",
            topics: [
              "Point, Straight Line & Circle (Chapters 15, 16)",
              "Conic Sections (Parabola, Ellipse, Hyperbola) (Chapter 17)",
              "Permutations & Combinations (Chapter 06)",
            ],
          },
        ],
        actionLink: "/resources#nda-maths",
        actionText: "Open 30 NDA Math Chapters Archive",
      });
    } else if (examKey === "cds-maths") {
      setSyllabusOutput({
        title: "CDS Elementary Mathematics — 22 Chapter Blueprint (100 Marks)",
        description: "Based on the 383-page Officium Supremum Master Volume.",
        sections: [
          {
            name: "Arithmetic & Commercial Math (30-35% Questions)",
            topics: [
              "Number System & Divisibility Rules (Chapter 08)",
              "Time & Work, Pipes & Cisterns (Chapter 03)",
              "Time, Speed & Distance (Chapter 04)",
              "Percentage, Profit & Loss, Simple & Compound Interest (Chapters 05, 06, 07)",
            ],
          },
          {
            name: "Advance Geometry & Mensuration (40% Questions)",
            topics: [
              "Geometry (Triangles, Circles, Polygons) (Chapter 16)",
              "Mensuration 2D & 3D (Chapters 17, 18)",
              "Trigonometry & Heights & Distances (Chapters 19, 20)",
            ],
          },
          {
            name: "Algebra & Statistics (25-30% Questions)",
            topics: [
              "Basic Operations, Factorisation, HCF & LCM of Polynomials (Chapters 12, 13)",
              "Linear & Quadratic Equations (Chapter 11)",
              "Data Representation & Central Tendency (Chapter 21)",
            ],
          },
        ],
        actionLink: "/resources#cds-maths",
        actionText: "Access CDS 383-Page Master PDF",
      });
    } else if (examKey === "english") {
      setSyllabusOutput({
        title: "NDA & CDS English — 34 Chapter Blueprint (200 / 100 Marks)",
        description: "Divided into Grammar, High-Frequency Vocabulary, and Comprehension.",
        sections: [
          {
            name: "Part I: Grammar & Error Detection (17 Chapters)",
            topics: [
              "Parts of Speech identification & Spotting Errors",
              "Prepositions & Phrasal Verbs (Chapter 10)",
              "Subject-Verb Agreement, Tenses & Conditionals (Chapter 05)",
              "Sentence Improvement & Sentence Completion",
            ],
          },
          {
            name: "Part II: Vocabulary & Word Power (11 Chapters)",
            topics: [
              "Synonyms & Antonyms (50 questions in NDA GAT)",
              "Idioms & Phrases, One-Word Substitution",
              "A to Z 1,200+ Core Exam Vocabulary Modules",
            ],
          },
          {
            name: "Part III: Reading & Ordering (6 Chapters)",
            topics: [
              "Ordering of Words in a Sentence (PQRS)",
              "Ordering of Sentences in a Paragraph (S1-S6)",
              "Unseen Passages & Cloze Tests",
            ],
          },
        ],
        actionLink: "/resources#english",
        actionText: "Open 396-Page English Archive",
      });
    } else {
      setSyllabusOutput({
        title: "Juniors Foundation (Class 7–10) Academic & Aptitude Framework",
        description: "Building early analytical excellence, communication, and cognitive speed.",
        sections: [
          {
            name: "Mathematical Reasoning & Olympiad Prep",
            topics: [
              "Number Sense, Prime Factorisation, Fractions & Decimals",
              "Algebraic Expressions & Linear Equations",
              "Geometry, Mensuration, and Data Interpretation",
            ],
          },
          {
            name: "English Mastery & Editorial Reading",
            topics: [
              "Daily Editorial Analysis (The Hindu / Indian Express student excerpts)",
              "Etymology & Root Words (Latin & Greek prefixes/suffixes)",
              "Extempore & Structured Public Speaking drills",
            ],
          },
          {
            name: "Habit & Executive Function Architecture",
            topics: [
              "The 90-Minute Focus Sprint framework",
              "Personal Daily Accountability Log",
              "Digital Distraction Firewall Protocol",
            ],
          },
        ],
        actionLink: "/programs/juniors",
        actionText: "Explore Juniors Program",
      });
    }
  };

  const handleGeneratePlanner = () => {
    const hours = parseInt(availableHours, 10) || 5;
    let items: PlanItem[] = [];

    if (hours <= 4) {
      items = [
        { time: "06:00 - 06:45", activity: "Academy Physical Routine & Hydration", detail: "Running, calisthenics, cold shower, mind-clearing meditation.", tag: "Physical" },
        { time: "07:30 - 09:30", activity: "Deep Work Sprint: High-Weightage Concepts", detail: "Active recall study on targeted chapter with zero mobile distraction.", tag: "Focus Study" },
        { time: "18:00 - 19:30", activity: "High-Intensity Drill & PYQs", detail: "Solve 35-40 timed problems without looking at solutions.", tag: "Problem Drill" },
        { time: "21:30 - 22:00", activity: "Cadet Night Briefing & Error Log", detail: "Review mistakes, update daily accountability log, set tomorrow's targets.", tag: "Accountability" },
      ];
    } else if (hours <= 6) {
      items = [
        { time: "05:30 - 06:30", activity: "Cadet PT & Morning Routine", detail: "Physical readiness conditioning and morning mindset activation.", tag: "Discipline" },
        { time: "07:00 - 09:00", activity: "Block 1: Core Mathematics / Theory", detail: "Theory breakdown, formula derivation, 20 foundational drills.", tag: "Academic" },
        { time: "11:00 - 12:30", activity: "Block 2: English & Vocabulary Recall", detail: "Study 25 A2Z vocabulary words + 2 comprehension passages.", tag: "Language" },
        { time: "16:00 - 18:00", activity: "Block 3: Timed PYQ Pressure Test", detail: "Real exam condition problem solving under timer constraint.", tag: "Recall Drill" },
        { time: "21:15 - 22:00", activity: "Night Accountability Briefing", detail: "Daily audit with Officium Supremum mentors / journal log.", tag: "Accountability" },
      ];
    } else {
      items = [
        { time: "05:00 - 06:15", activity: "Military Academy PT & Mental Focus", detail: "Long run, pushups, pull-ups, breathing drills, fresh mind reset.", tag: "Discipline" },
        { time: "07:00 - 09:30", activity: "Block 1: Heavyweight Subject Sprint", detail: "Deep focus on complex mathematics / science modules.", tag: "Deep Work" },
        { time: "10:30 - 12:30", activity: "Block 2: General Ability / GS Analysis", detail: "Current affairs, modern history, geography spatial mapping.", tag: "General Studies" },
        { time: "15:00 - 17:30", activity: "Block 3: High-Intensity Problem Solving", detail: "Solve 60+ questions from chapter drill sheets; tag tricky doubts.", tag: "Execution" },
        { time: "18:30 - 19:30", activity: "Block 4: Vocabulary & OLQ Communication", detail: "Extempore speaking, newspaper editorial synthesis, Word Power.", tag: "Personality" },
        { time: "21:00 - 22:00", activity: "Daily Review & Night Briefing", detail: "Forgetting curve revision + send daily study report.", tag: "Accountability" },
      ];
    }
    setGeneratedSchedule(items);
  };

  const handleSubmitAccountability = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hoursStudied || !topicsCompleted) return;
    const hours = parseFloat(hoursStudied);
    let score = "8.5/10";
    let comment = "Strong commitment shown today. Your execution is aligning with the standard of an officer.";
    if (hours < 3) {
      score = "5.5/10";
      comment = "Below the academy standard. Eliminate digital friction tomorrow and protect your first 2 hours.";
    } else if (hours >= 6) {
      score = "9.8/10";
      comment = "Exceptional volume and focus. Ensure you review today's error log before sleeping.";
    }

    setAccountabilityFeedback(`
🎖️ DISCIPLINE EVALUATION: ${score}

• Consistency Rating: Verified
• Cadet Status: On Target
• Mentor Assessment: ${comment}

💡 Action for Tomorrow:
1. Run a 15-minute active recall test on "${topicsCompleted.slice(0, 30)}..." before touching new material.
2. Complete your morning physical routine by 06:30 hrs.
    `);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/35 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-white/95 backdrop-blur-xl border border-slate-200/80 rounded-3xl shadow-[0_25px_60px_-15px_rgba(15,23,42,0.18)] overflow-hidden flex flex-col max-h-[90vh] text-[#0F172A]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Gold Accent Border */}
        <div className="h-1 bg-gradient-to-r from-[#C8A84E] via-amber-300 to-[#C8A84E]" />

        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-white/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-[#C8A84E] shadow-sm">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading font-semibold text-base sm:text-lg text-[#0B192C]">
                  Officium AI Copilot
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-label tracking-widest uppercase bg-amber-100 text-amber-800 font-semibold">
                  Academy AI
                </span>
              </div>
              <p className="text-xs text-slate-500 font-sans">
                Syllabus Explorer, Timetable Planner &amp; Accountability Coach
              </p>
            </div>
          </div>
          <button
            onClick={closeAi}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-100 bg-slate-50/60 text-xs font-label uppercase tracking-wider">
          <button
            onClick={() => {
              setActiveTab("syllabus");
              if (!syllabusOutput) handleGenerateSyllabus("nda-maths");
            }}
            className={`flex-1 py-3 px-3 flex items-center justify-center gap-1.5 transition-colors border-b-2 ${
              activeTab === "syllabus"
                ? "border-[#0B192C] text-[#0B192C] font-semibold bg-white"
                : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>1. Syllabus Explorer</span>
          </button>

          <button
            onClick={() => {
              setActiveTab("planner");
              if (!generatedSchedule) handleGeneratePlanner();
            }}
            className={`flex-1 py-3 px-3 flex items-center justify-center gap-1.5 transition-colors border-b-2 ${
              activeTab === "planner"
                ? "border-[#0B192C] text-[#0B192C] font-semibold bg-white"
                : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>2. Study Planner</span>
          </button>

          <button
            onClick={() => setActiveTab("accountability")}
            className={`flex-1 py-3 px-3 flex items-center justify-center gap-1.5 transition-colors border-b-2 ${
              activeTab === "accountability"
                ? "border-[#0B192C] text-[#0B192C] font-semibold bg-white"
                : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            <CheckSquare className="w-4 h-4" />
            <span>3. Night Briefing</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-sm">
          
          {/* TAB 1: SYLLABUS EXPLORER */}
          {activeTab === "syllabus" && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-label uppercase tracking-wider text-slate-600 mb-2">
                  Select Examination / Academic Track:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: "nda-maths", label: "NDA Mathematics" },
                    { id: "cds-maths", label: "CDS Mathematics" },
                    { id: "english", label: "NDA / CDS English" },
                    { id: "juniors", label: "Juniors Foundation" },
                  ].map((track) => (
                    <button
                      key={track.id}
                      onClick={() => handleGenerateSyllabus(track.id)}
                      className={`p-2.5 rounded-xl text-xs font-label uppercase tracking-wider border transition-all text-center ${
                        selectedExam === track.id
                          ? "bg-[#0B192C] text-white font-bold border-[#0B192C] shadow-sm"
                          : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      {track.label}
                    </button>
                  ))}
                </div>
              </div>

              {syllabusOutput && (
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-4">
                  <div className="border-b border-slate-200 pb-3">
                    <h4 className="font-heading font-semibold text-[#0B192C] text-base">
                      {syllabusOutput.title}
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">{syllabusOutput.description}</p>
                  </div>

                  <div className="space-y-3">
                    {syllabusOutput.sections.map((sec: any, idx: number) => (
                      <div key={idx} className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm">
                        <div className="font-label text-xs uppercase tracking-wider text-[#C8A84E] font-bold mb-2">
                          {sec.name}
                        </div>
                        <ul className="space-y-1.5 text-xs text-slate-700 pl-2">
                          {sec.topics.map((t: string, i: number) => (
                            <li key={i} className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#C8A84E]" />
                              <span>{t}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 flex justify-end">
                    <Link
                      href={syllabusOutput.actionLink}
                      onClick={closeAi}
                      className="inline-flex items-center gap-1.5 text-xs font-label uppercase tracking-wider text-sky-700 hover:underline"
                    >
                      <span>{syllabusOutput.actionText}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: DAILY STUDY PLANNER */}
          {activeTab === "planner" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-label uppercase tracking-wider text-slate-600 mb-1.5">
                    Target Goal:
                  </label>
                  <select
                    value={plannerExam}
                    onChange={(e) => setPlannerExam(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-[#0F172A] outline-none focus:border-[#C8A84E]"
                  >
                    <option value="NDA 2025">NDA Examination</option>
                    <option value="CDS 2025">CDS / AFCAT Examination</option>
                    <option value="Class 11-12 Boards">Class 11-12 Board + Entrance</option>
                    <option value="Juniors Class 8-10">Juniors Foundation (Class 7-10)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-label uppercase tracking-wider text-slate-600 mb-1.5">
                    Available Study Hours Today:
                  </label>
                  <div className="flex gap-2">
                    {["3", "5", "8"].map((hr) => (
                      <button
                        key={hr}
                        type="button"
                        onClick={() => setAvailableHours(hr)}
                        className={`flex-1 py-2 text-xs font-label uppercase tracking-wider rounded-xl border transition-colors ${
                          availableHours === hr
                            ? "bg-[#0B192C] text-white font-bold border-[#0B192C] shadow-sm"
                            : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                        }`}
                      >
                        {hr} Hours
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleGeneratePlanner}
                className="w-full py-2.5 bg-sky-50 hover:bg-sky-100 border border-sky-200 text-sky-800 font-label text-xs uppercase tracking-widest font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <Sparkles className="w-4 h-4 text-sky-600" />
                <span>Generate Structured Timetable ({availableHours} Hours)</span>
              </button>

              {generatedSchedule && (
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
                    <span className="font-heading font-semibold text-sm text-[#0B192C]">
                      Academy Routine: {plannerExam} ({availableHours}h Target)
                    </span>
                    <span className="text-[11px] font-label uppercase text-[#C8A84E] font-semibold">
                      Active Recall Protocol
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {generatedSchedule.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-3 rounded-xl bg-white border border-slate-200 shadow-sm"
                      >
                        <div className="w-24 shrink-0 text-[11px] font-mono font-semibold text-[#C8A84E] pt-0.5">
                          {item.time}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-heading font-semibold text-xs text-[#0B192C]">
                              {item.activity}
                            </span>
                            <span className="text-[9px] font-label uppercase tracking-widest px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded font-semibold">
                              {item.tag}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 mt-0.5 font-sans">{item.detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: NIGHT BRIEFING */}
          {activeTab === "accountability" && (
            <div className="space-y-4">
              <form onSubmit={handleSubmitAccountability} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-label uppercase tracking-wider text-slate-600 mb-1">
                    Hours Invested Today:
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={hoursStudied}
                    onChange={(e) => setHoursStudied(e.target.value)}
                    placeholder="e.g. 5.5"
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-[#0F172A] outline-none focus:border-[#C8A84E] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-label uppercase tracking-wider text-slate-600 mb-1">
                    Topics &amp; Practice Questions Completed:
                  </label>
                  <input
                    type="text"
                    value={topicsCompleted}
                    onChange={(e) => setTopicsCompleted(e.target.value)}
                    placeholder="e.g. Matrices Chapter 09, 30 PYQs, 25 Vocabulary Words"
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-[#0F172A] outline-none focus:border-[#C8A84E] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-label uppercase tracking-wider text-slate-600 mb-1">
                    Friction or Doubts Encountered:
                  </label>
                  <textarea
                    rows={2}
                    value={challengesFaced}
                    onChange={(e) => setChallengesFaced(e.target.value)}
                    placeholder="e.g. Struggled with inverse matrix determinant proofs."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-[#0F172A] outline-none focus:border-[#C8A84E] focus:bg-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#0B192C] hover:bg-[#1E293B] text-white font-label font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 text-[#C8A84E]" />
                  <span>Submit Daily Briefing for Evaluation</span>
                </button>
              </form>

              {accountabilityFeedback && (
                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-slate-800 whitespace-pre-line leading-relaxed font-sans shadow-sm">
                  {accountabilityFeedback}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <span className="font-label uppercase tracking-widest text-[10px]">
            Officium Supremum Mentorship Engine
          </span>
          <button
            onClick={closeAi}
            className="text-slate-500 hover:text-slate-800 font-label uppercase tracking-wider"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
