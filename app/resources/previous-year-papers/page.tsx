import React from "react";
import Link from "next/link";
import { PYQ_YEARS } from "@/data/vaultManifest";
import ResourceLoginCta from "@/components/ResourceLoginCta";
import { FileText, CheckCircle2, ShieldCheck, Compass, AlertCircle } from "lucide-react";

export default function PreviousYearPapersPage() {
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
        "name": "Previous Year Papers",
        "item": "https://www.officiumsupremum.in/resources/previous-year-papers",
      },
    ],
  };

  const ndaYears = PYQ_YEARS.filter((y) => y.year.toLowerCase().startsWith("nda"));
  const cdsYears = PYQ_YEARS.filter((y) => y.year.toLowerCase().startsWith("cds"));

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
                  Previous Year Papers
                </li>
              </ol>
            </nav>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-label uppercase tracking-widest text-slate-700 shadow-sm">
              <FileText className="w-3.5 h-3.5 text-[#C8A84E]" />
              <span>UPSC NDA &amp; CDS Examination Archive</span>
            </div>

            <h1 className="font-heading text-3xl sm:text-5xl font-semibold tracking-tight text-[#0B192C]">
              NDA &amp; CDS Previous Year Papers
            </h1>

            {/* Practical Student Introduction */}
            <div className="space-y-3 text-sm sm:text-base text-slate-600 font-sans leading-relaxed pt-1">
              <p>
                Solving previous years&apos; examination papers is the single most effective way to understand the actual standard and recurring traps of the UPSC examinations. Mock questions created by third-party test series often miss the authentic language and conceptual nuance that UPSC uses.
              </p>
              <p>
                This archive tracks past papers across 14+ years (2011 to 2026) for both the National Defence Academy (NDA &amp; NA) and Combined Defence Services (CDS) examinations. It covers Mathematics, General Ability Test (GAT), English, and General Knowledge.
              </p>
              <p>
                To get real value from past papers, do not treat them as casual reading material. Solve each paper in a single timed sitting of 2 or 2.5 hours without looking at solutions. Deduct negative marks strictly, calculate your net score, and maintain a written Error Journal for every question you got wrong or guessed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Practical Preparation Guidance */}
      <section className="py-12 sm:py-16 bg-white border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-8">
            <div className="font-label text-xs uppercase tracking-[0.2em] text-[#C8A84E] font-semibold mb-1">
              Examination Strategy
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-[#0B192C]">
              How to Analyze Past Papers Effectively
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-slate-200 bg-[#FAFAF9] p-6 space-y-3">
              <div className="w-9 h-9 rounded-xl bg-amber-100 text-[#0B192C] flex items-center justify-center font-bold text-sm">
                1
              </div>
              <h3 className="font-heading text-lg font-semibold text-[#0B192C]">
                Timed Diagnostic Practice
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
                Sit with an OMR sheet and a timer. Practicing without strict time constraints gives a false sense of security that breaks under actual exam pressure.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-[#FAFAF9] p-6 space-y-3">
              <div className="w-9 h-9 rounded-xl bg-sky-100 text-[#0B192C] flex items-center justify-center font-bold text-sm">
                2
              </div>
              <h3 className="font-heading text-lg font-semibold text-[#0B192C]">
                Strict Negative Marking Audit
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
                Count every incorrect attempt with its full negative deduction (-0.83 for NDA Maths, -0.33 for CDS). Identify whether lost marks came from calculation errors or blind guessing.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-[#FAFAF9] p-6 space-y-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 text-[#0B192C] flex items-center justify-center font-bold text-sm">
                3
              </div>
              <h3 className="font-heading text-lg font-semibold text-[#0B192C]">
                Maintain an Error Journal
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
                Write down every question you missed along with its underlying rule or formula. Reviewing your Error Journal weekly prevents repeating the same mistakes on exam day.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Paper Archives Overview */}
      <section className="py-14 sm:py-18 bg-[#FAF7F2] border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Official Source Note */}
          <div className="rounded-2xl border border-amber-200/80 bg-amber-50/80 p-5 sm:p-6 flex items-start gap-4 max-w-4xl">
            <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs sm:text-sm text-amber-950 font-sans leading-relaxed">
              <p className="font-semibold text-amber-900">
                Official Sources &amp; Solved Cadet Archives:
              </p>
              <p>
                Official UPSC question papers are published publicly by the Union Public Service Commission on their official portal (upsc.gov.in). Officium Supremum cadets receive complete step-by-step solved papers, detailed answer keys, and question-by-question topic breakdowns in the student library.
              </p>
            </div>
          </div>

          {/* NDA Papers Grid */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
              <div>
                <div className="font-label text-xs uppercase tracking-[0.2em] text-[#C8A84E] font-semibold mb-1">
                  Examination Archive 1
                </div>
                <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-[#0B192C]">
                  NDA Past Examination Papers ({ndaYears.length} Exam Years)
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md font-sans">
                Mathematics and General Ability Test (GAT) papers for NDA 1 and NDA 2 sessions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {ndaYears.map((item) => (
                <div
                  key={item.year}
                  className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm space-y-3"
                >
                  <div className="flex items-center justify-between text-xs font-label uppercase tracking-wider text-slate-500">
                    <span className="font-semibold text-slate-900">{item.year}</span>
                    <span className="bg-amber-100/70 text-amber-900 px-2 py-0.5 rounded-full text-[11px] font-medium">
                      {item.tag}
                    </span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-700 font-sans">
                    {item.papers.map((p, pIdx) => (
                      <li key={pIdx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="truncate">{p.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* CDS Papers Grid */}
          <div className="pt-6 border-t border-slate-200/60">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
              <div>
                <div className="font-label text-xs uppercase tracking-[0.2em] text-[#C8A84E] font-semibold mb-1">
                  Examination Archive 2
                </div>
                <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-[#0B192C]">
                  CDS Past Examination Papers ({cdsYears.length} Exam Years)
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md font-sans">
                English, General Knowledge, and Elementary Mathematics papers for CDS 1 and CDS 2 sessions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {cdsYears.map((item) => (
                <div
                  key={item.year}
                  className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm space-y-3"
                >
                  <div className="flex items-center justify-between text-xs font-label uppercase tracking-wider text-slate-500">
                    <span className="font-semibold text-slate-900">{item.year}</span>
                    <span className="bg-sky-100/70 text-sky-900 px-2 py-0.5 rounded-full text-[11px] font-medium">
                      {item.tag}
                    </span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-700 font-sans">
                    {item.papers.map((p, pIdx) => (
                      <li key={pIdx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="truncate">{p.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Login CTA */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <ResourceLoginCta
          returnUrl="/resources/previous-year-papers"
          resourceTitle="Previous Year Solved Papers"
        />
      </section>
    </div>
  );
}
