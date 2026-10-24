import React from "react";
import Link from "next/link";
import { ENGLISH_CHAPTERS } from "@/data/vaultManifest";
import ResourceLoginCta from "@/components/ResourceLoginCta";
import { BookOpen, CheckCircle2, HelpCircle } from "lucide-react";

export default function NdaCdsEnglishPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.officiumsupremum.in",
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Resources",
        "item": "https://www.officiumsupremum.in/resources",
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "NDA & CDS English",
        "item": "https://www.officiumsupremum.in/resources/nda-cds-english",
      },
    ],
  };

  const grammarChapters = ENGLISH_CHAPTERS.filter(
    (c) => c.tag?.toLowerCase() === "grammar"
  );
  const vocabChapters = ENGLISH_CHAPTERS.filter(
    (c) => c.tag?.toLowerCase() === "vocabulary"
  );
  const readingChapters = ENGLISH_CHAPTERS.filter(
    (c) => c.tag?.toLowerCase() === "reading"
  );

  return (
    <div className="bg-[#FAFAF9] text-[#0F172A] min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Hero & Breadcrumb */}
      <section className="relative pt-24 pb-14 lg:pt-32 lg:pb-18 border-b border-slate-200/60 bg-gradient-to-b from-white to-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb">
              <ol className="flex items-center gap-2 text-xs font-label uppercase tracking-wider text-slate-500">
                <li>
                  <Link href="/" className="hover:text-[#0B192C] transition-colors">
                    Home
                  </Link>
                </li>
                <li className="text-slate-400">/</li>
                <li>
                  <Link href="/resources" className="hover:text-[#0B192C] transition-colors">
                    Resources
                  </Link>
                </li>
                <li className="text-slate-400">/</li>
                <li className="text-[#0B192C] font-semibold" aria-current="page">
                  NDA &amp; CDS English
                </li>
              </ol>
            </nav>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-label uppercase tracking-widest text-slate-700 shadow-sm">
              <BookOpen className="w-3.5 h-3.5 text-[#C8A84E]" />
              <span>UPSC Defence Examinations · English Language Paper</span>
            </div>

            <h1 className="font-heading text-3xl sm:text-5xl font-semibold tracking-tight text-[#0B192C]">
              NDA &amp; CDS English Study Material
            </h1>

            {/* Practical Student Introduction */}
            <div className="space-y-3 text-sm sm:text-base text-slate-600 font-sans leading-relaxed pt-1">
              <p>
                In both NDA and CDS examinations, English is one of the highest-scoring papers. In the NDA exam, English comprises 50 questions worth 200 marks in Paper 2 (General Ability Test). In the CDS exam, English is an independent 2-hour paper with 120 questions worth 100 marks for all entries, including the Officers Training Academy (OTA).
              </p>
              <p>
                Practise grammar and vocabulary questions regularly and use a timer to improve your speed and accuracy.
              </p>
              <p>
                This study volume organizes the complete 34-chapter curriculum into three core sections: Functional Grammar, Vocabulary Archives, and Reading Comprehension with Sentence Arrangement. In our mentorship program, cadets practice daily error-spotting drills and weekly reading exercises to eliminate confusion around prepositions, tenses, and idioms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Chapter List Overview */}
      <section className="py-14 sm:py-18 bg-white border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Grammar Section */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <div className="font-label text-xs uppercase tracking-[0.2em] text-[#C8A84E] font-semibold mb-1">
                  Section 1 · Rules &amp; Application
                </div>
                <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-[#0B192C]">
                  Functional Grammar ({grammarChapters.length} Chapters)
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md font-sans">
                Error spotting, parts of speech identification, sentence improvement, active-passive voice, and direct-indirect speech.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {grammarChapters.map((ch) => (
                <div
                  key={ch.num}
                  className="rounded-2xl border border-slate-200/80 bg-[#FAFAF9] p-5 hover:border-slate-300 hover:shadow-sm transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs font-label uppercase tracking-wider text-slate-500 mb-2">
                      <span className="font-semibold text-slate-700">{ch.num}</span>
                      {ch.meta && (
                        <span className="bg-emerald-100/70 text-emerald-900 px-2 py-0.5 rounded-full text-[11px] font-medium">
                          {ch.meta}
                        </span>
                      )}
                    </div>
                    <h3 className="font-heading text-lg font-semibold text-[#0B192C] mb-2">
                      {ch.title}
                    </h3>
                    <p className="text-xs text-slate-600 font-sans leading-relaxed">
                      {ch.desc || "Topic notes, grammar rules, and past examination problems."}
                    </p>
                  </div>
                  <div className="pt-4 mt-3 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-500">
                    <span className="inline-flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Grammar Core</span>
                    </span>
                    <span className="text-slate-400 font-mono text-[11px]">NDA / CDS</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Vocabulary Section */}
          <div className="pt-6 border-t border-slate-200/60">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <div className="font-label text-xs uppercase tracking-[0.2em] text-[#C8A84E] font-semibold mb-1">
                  Section 2 · Words in Context
                </div>
                <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-[#0B192C]">
                  Vocabulary Archives ({vocabChapters.length} Chapters)
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md font-sans">
                Root words, synonyms, antonyms, paired words, foreign phrases, and multiple sentence word usage.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {vocabChapters.map((ch) => (
                <div
                  key={ch.num}
                  className="rounded-2xl border border-slate-200/80 bg-[#FAFAF9] p-5 hover:border-slate-300 hover:shadow-sm transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs font-label uppercase tracking-wider text-slate-500 mb-2">
                      <span className="font-semibold text-slate-700">{ch.num}</span>
                      {ch.meta && (
                        <span className="bg-amber-100/70 text-amber-900 px-2 py-0.5 rounded-full text-[11px] font-medium">
                          {ch.meta}
                        </span>
                      )}
                    </div>
                    <h3 className="font-heading text-lg font-semibold text-[#0B192C] mb-2">
                      {ch.title}
                    </h3>
                    <p className="text-xs text-slate-600 font-sans leading-relaxed">
                      {ch.desc || "Topic notes, vocabulary drills, and past examination problems."}
                    </p>
                  </div>
                  <div className="pt-4 mt-3 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-500">
                    <span className="inline-flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Vocabulary</span>
                    </span>
                    <span className="text-slate-400 font-mono text-[11px]">NDA / CDS</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reading & Arrangement Section */}
          <div className="pt-6 border-t border-slate-200/60">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <div className="font-label text-xs uppercase tracking-[0.2em] text-[#C8A84E] font-semibold mb-1">
                  Section 3 · Comprehension &amp; Logic
                </div>
                <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-[#0B192C]">
                  Comprehension &amp; Sentence Arrangement ({readingChapters.length} Chapters)
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md font-sans">
                Reading passages, cloze tests, idioms, and jumbled sentences (PQRS and S1–S6 rearrangement).
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {readingChapters.map((ch) => (
                <div
                  key={ch.num}
                  className="rounded-2xl border border-slate-200/80 bg-[#FAFAF9] p-5 hover:border-slate-300 hover:shadow-sm transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs font-label uppercase tracking-wider text-slate-500 mb-2">
                      <span className="font-semibold text-slate-700">{ch.num}</span>
                      {ch.meta && (
                        <span className="bg-sky-100/70 text-sky-900 px-2 py-0.5 rounded-full text-[11px] font-medium">
                          {ch.meta}
                        </span>
                      )}
                    </div>
                    <h3 className="font-heading text-lg font-semibold text-[#0B192C] mb-2">
                      {ch.title}
                    </h3>
                    <p className="text-xs text-slate-600 font-sans leading-relaxed">
                      {ch.desc || "Topic notes, passage drills, and past examination problems."}
                    </p>
                  </div>
                  <div className="pt-4 mt-3 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-500">
                    <span className="inline-flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Reading &amp; Logic</span>
                    </span>
                    <span className="text-slate-400 font-mono text-[11px]">NDA / CDS</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Free Sample Questions */}
      <section className="py-14 sm:py-18 bg-[#FAF7F2] border-b border-slate-200/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-label uppercase tracking-wider text-slate-700 shadow-sm mb-3">
              <HelpCircle className="w-3.5 h-3.5 text-[#C8A84E]" />
              <span>Original Practice Drill</span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-[#0B192C]">
              Sample Practice Questions with Step-by-Step Explanations
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 font-sans">
              Here are three representative original practice questions showing key grammar rules and connector logic tested by UPSC.
            </p>
          </div>

          <div className="space-y-6">
            {/* Question 1 */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-label uppercase tracking-wider text-[#C8A84E] font-semibold mb-2">
                <span>Sample 1 · Spotting Errors (Subject-Verb Agreement)</span>
              </div>
              <p className="text-sm sm:text-base font-medium text-[#0B192C] leading-relaxed">
                Identify which part of the sentence contains a grammatical error:
                <br />
                <span className="block mt-2 font-serif italic text-slate-800 bg-slate-50 p-3 rounded-lg border border-slate-100">
                  &ldquo;Neither the mentor nor the students (A) / was present in the study hall (B) / when the morning inspection began. (C) / No error (D)&rdquo;
                </span>
              </p>
              <div className="mt-4 pt-4 border-t border-slate-100 space-y-2 text-xs sm:text-sm text-slate-700 font-sans leading-relaxed">
                <div className="font-semibold text-slate-900 text-xs font-label uppercase tracking-wider">
                  Grammar Rule &amp; Explanation:
                </div>
                <p>
                  <strong className="text-rose-700">Error in Part (B).</strong> When two subjects are connected using correlative conjunctions such as <span className="font-mono">neither... nor</span> or <span className="font-mono">either... or</span>, the verb agrees with the closer subject (the rule of proximity).
                </p>
                <p>
                  Here, the closer subject is <span className="font-mono">the students</span> (plural). Therefore, the singular verb <span className="font-mono">was</span> is incorrect and must be replaced by <span className="font-mono font-semibold text-emerald-800">were</span>.
                </p>
                <p className="font-medium text-[#0B192C]">
                  Correct Sentence: &ldquo;Neither the mentor nor the students were present in the study hall when the morning inspection began.&rdquo;
                </p>
              </div>
            </div>

            {/* Question 2 */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-label uppercase tracking-wider text-[#C8A84E] font-semibold mb-2">
                <span>Sample 2 · Prepositions &amp; Fixed Collocations</span>
              </div>
              <p className="text-sm sm:text-base font-medium text-[#0B192C] leading-relaxed">
                Choose the correct preposition to complete the sentence:
                <br />
                <span className="block mt-2 font-serif italic text-slate-800 bg-slate-50 p-3 rounded-lg border border-slate-100">
                  &ldquo;The commanding officer congratulated the young cadet _______ winning the prestigious academy gold medal.&rdquo;
                </span>
                <span className="block mt-2 font-sans text-xs text-slate-600">
                  Options: (A) for &nbsp; (B) on &nbsp; (C) at &nbsp; (D) about
                </span>
              </p>
              <div className="mt-4 pt-4 border-t border-slate-100 space-y-2 text-xs sm:text-sm text-slate-700 font-sans leading-relaxed">
                <div className="font-semibold text-slate-900 text-xs font-label uppercase tracking-wider">
                  Grammar Rule &amp; Explanation:
                </div>
                <p>
                  <strong className="text-emerald-700">Correct Answer: (B) on.</strong>
                </p>
                <p>
                  In standard English, the transitive verb <span className="font-mono">congratulate</span> is followed by the preposition <span className="font-mono font-semibold text-emerald-800">on</span> (to congratulate someone <em>on</em> something or <em>on doing</em> something).
                </p>
                <p>
                  Using &ldquo;for&rdquo; is a very frequent spoken Indian English error that UPSC routinely tests in error spotting and fill-in-the-blank questions.
                </p>
              </div>
            </div>

            {/* Question 3 */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-label uppercase tracking-wider text-[#C8A84E] font-semibold mb-2">
                <span>Sample 3 · Sentence Rearrangement (PQRS)</span>
              </div>
              <p className="text-sm sm:text-base font-medium text-[#0B192C] leading-relaxed">
                Rearrange the jumbled parts to form a coherent, grammatically sound sentence:
              </p>
              <div className="mt-2 space-y-1 bg-slate-50 p-3 rounded-lg border border-slate-100 text-xs sm:text-sm font-sans text-slate-800">
                <p><span className="font-mono font-semibold text-[#0B192C]">P:</span> to build disciplined daily study habits</p>
                <p><span className="font-mono font-semibold text-[#0B192C]">Q:</span> every morning without fail</p>
                <p><span className="font-mono font-semibold text-[#0B192C]">R:</span> the young cadets assembled</p>
                <p><span className="font-mono font-semibold text-[#0B192C]">S:</span> in the central reading hall</p>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-100 space-y-2 text-xs sm:text-sm text-slate-700 font-sans leading-relaxed">
                <div className="font-semibold text-slate-900 text-xs font-label uppercase tracking-wider">
                  Connector Logic &amp; Explanation:
                </div>
                <p>
                  <strong className="text-emerald-700">Correct Sequence: R – S – Q – P</strong>
                </p>
                <p>
                  1. <span className="font-mono font-semibold">R</span> introduces the main grammatical subject and predicate (&ldquo;the young cadets assembled&rdquo;).
                </p>
                <p>
                  2. <span className="font-mono font-semibold">S</span> indicates the prepositional location (&ldquo;in the central reading hall&rdquo;).
                </p>
                <p>
                  3. <span className="font-mono font-semibold">Q</span> indicates the time adverbial (&ldquo;every morning without fail&rdquo;).
                </p>
                <p>
                  4. <span className="font-mono font-semibold">P</span> states the infinitive clause of purpose (&ldquo;to build disciplined daily study habits&rdquo;).
                </p>
                <p className="font-medium text-[#0B192C]">
                  Full Sentence: &ldquo;The young cadets assembled in the central reading hall every morning without fail to build disciplined daily study habits.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Login CTA */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <ResourceLoginCta
          returnUrl="/resources/nda-cds-english"
          resourceTitle="NDA &amp; CDS English"
        />
      </section>
    </div>
  );
}
