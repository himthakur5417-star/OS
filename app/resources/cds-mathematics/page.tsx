import React from "react";
import Link from "next/link";
import { CDS_MATHS_CHAPTERS } from "@/data/vaultManifest";
import ResourceLoginCta from "@/components/ResourceLoginCta";
import { Calculator, CheckCircle2, HelpCircle } from "lucide-react";

export default function CdsMathematicsPage() {
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
        "name": "CDS Mathematics",
        "item": "https://www.officiumsupremum.in/resources/cds-mathematics",
      },
    ],
  };

  const arithmeticChapters = CDS_MATHS_CHAPTERS.filter(
    (c) => c.tag?.toLowerCase() === "arithmetic"
  );
  const advanceChapters = CDS_MATHS_CHAPTERS.filter(
    (c) => c.tag?.toLowerCase() !== "arithmetic"
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
                  CDS Mathematics
                </li>
              </ol>
            </nav>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-label uppercase tracking-widest text-slate-700 shadow-sm">
              <Calculator className="w-3.5 h-3.5 text-[#C8A84E]" />
              <span>UPSC Combined Defence Services · Elementary Mathematics</span>
            </div>

            <h1 className="font-heading text-3xl sm:text-5xl font-semibold tracking-tight text-[#0B192C]">
              CDS Mathematics Study Material
            </h1>

            {/* Practical Student Introduction */}
            <div className="space-y-3 text-sm sm:text-base text-slate-600 font-sans leading-relaxed pt-1">
              <p>
                In the UPSC CDS examination, the Elementary Mathematics paper is taken by candidates applying for the Indian Military Academy (IMA), Indian Naval Academy (INA), and Air Force Academy (AFA). Candidates applying exclusively for Officers Training Academy (OTA) do not write this paper.
              </p>
              <p>
                The paper contains 100 questions carrying 100 marks with a duration of 2 hours. Negative marking of 0.33 marks applies to each incorrect answer. Advance Mathematics includes topics such as Geometry, Mensuration, Trigonometry and Number Systems. Practise these along with the core Arithmetic topics.
              </p>
              <p>
                This curriculum compiles all 22 chapters into structured Arithmetic and Advance modules. To clear the paper comfortably, students should focus on identifying solvable questions quickly and skipping lengthy arithmetic time traps. In our mentorship program, cadets practice daily timed problem sets to develop accurate calculation habits and mental arithmetic.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Chapter List Overview */}
      <section className="py-14 sm:py-18 bg-white border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Arithmetic Section */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <div className="font-label text-xs uppercase tracking-[0.2em] text-[#C8A84E] font-semibold mb-1">
                  Section 1 · Foundation
                </div>
                <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-[#0B192C]">
                  Arithmetic Chapters ({arithmeticChapters.length} Topics)
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md font-sans">
                Core arithmetic topics testing numerical fluency, ratios, speed-time calculations, and percentage applications.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {arithmeticChapters.map((ch) => (
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
                      {ch.desc || "Topic notes, formula sheets, and past examination problems."}
                    </p>
                  </div>
                  <div className="pt-4 mt-3 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-500">
                    <span className="inline-flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Arithmetic</span>
                    </span>
                    <span className="text-slate-400 font-mono text-[11px]">CDS Elementary</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Advance Mathematics Section */}
          <div className="pt-6 border-t border-slate-200/60">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <div className="font-label text-xs uppercase tracking-[0.2em] text-[#C8A84E] font-semibold mb-1">
                  Section 2 · Advance Mathematics
                </div>
                <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-[#0B192C]">
                  Advance Mathematics ({advanceChapters.length} Topics)
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md font-sans">
                Geometry, Mensuration, Trigonometry, and Statistics modules that form the backbone of the CDS cutoff score.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {advanceChapters.map((ch) => (
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
                      {ch.desc || "Topic notes, formula sheets, and past examination problems."}
                    </p>
                  </div>
                  <div className="pt-4 mt-3 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-500">
                    <span className="inline-flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Advance Maths</span>
                    </span>
                    <span className="text-slate-400 font-mono text-[11px]">CDS Elementary</span>
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
              Sample Practice Questions with Step-by-Step Solutions
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 font-sans">
              Here are three representative original practice questions showing key CDS exam shortcuts and analytical approaches.
            </p>
          </div>

          <div className="space-y-6">
            {/* Question 1 */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-label uppercase tracking-wider text-[#C8A84E] font-semibold mb-2">
                <span>Sample 1 · Time and Work</span>
              </div>
              <p className="text-sm sm:text-base font-medium text-[#0B192C] leading-relaxed">
                Person A can complete a piece of work in 12 days, while Person B can complete the same work in 18 days. If they work together for 4 days, what fraction of the total work remains unfinished?
              </p>
              <div className="mt-4 pt-4 border-t border-slate-100 space-y-2 text-xs sm:text-sm text-slate-700 font-sans leading-relaxed">
                <div className="font-semibold text-slate-900 text-xs font-label uppercase tracking-wider">
                  Step-by-Step Solution:
                </div>
                <p>
                  1. Determine the work rate of each person per day:
                  <br />
                  <span className="font-mono pl-4 block my-0.5">Rate of A = 1/12 work/day</span>
                  <span className="font-mono pl-4 block my-0.5">Rate of B = 1/18 work/day</span>
                </p>
                <p>
                  2. Combined daily rate:
                  <br />
                  <span className="font-mono pl-4 block my-1">Combined rate = 1/12 + 1/18 = (3 + 2) / 36 = 5/36 work/day</span>
                </p>
                <p>
                  3. Work completed in 4 days:
                  <br />
                  <span className="font-mono pl-4 block my-1">Work done = 4 × (5/36) = 20/36 = 5/9</span>
                </p>
                <p>
                  4. Unfinished fraction remaining:
                  <br />
                  <span className="font-mono pl-4 block my-1 font-semibold text-[#0B192C]">Remaining work = 1 - 5/9 = 4/9</span>
                </p>
              </div>
            </div>

            {/* Question 2 */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-label uppercase tracking-wider text-[#C8A84E] font-semibold mb-2">
                <span>Sample 2 · Number System &amp; Remainders</span>
              </div>
              <p className="text-sm sm:text-base font-medium text-[#0B192C] leading-relaxed">
                Find the unit digit of the expression <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded">7⁹⁵ - 3⁵⁸</span>.
              </p>
              <div className="mt-4 pt-4 border-t border-slate-100 space-y-2 text-xs sm:text-sm text-slate-700 font-sans leading-relaxed">
                <div className="font-semibold text-slate-900 text-xs font-label uppercase tracking-wider">
                  Step-by-Step Solution:
                </div>
                <p>
                  1. Powers of 7 have a unit digit cyclicity of 4:
                  <br />
                  <span className="font-mono pl-4 block my-0.5">7¹ = 7, 7² = 9, 7³ = 3, 7⁴ = 1</span>
                  Dividing 95 by 4 gives remainder 3: <span className="font-mono">95 = 4 × 23 + 3</span>.
                  <br />
                  Unit digit of <span className="font-mono">7⁹⁵</span> is the unit digit of <span className="font-mono">7³ = 3</span>.
                </p>
                <p>
                  2. Powers of 3 also have a unit digit cyclicity of 4:
                  <br />
                  <span className="font-mono pl-4 block my-0.5">3¹ = 3, 3² = 9, 3³ = 7, 3⁴ = 1</span>
                  Dividing 58 by 4 gives remainder 2: <span className="font-mono">58 = 4 × 14 + 2</span>.
                  <br />
                  Unit digit of <span className="font-mono">3⁵⁸</span> is the unit digit of <span className="font-mono">3² = 9</span>.
                </p>
                <p>
                  3. Subtract unit digits:
                  <br />
                  Since <span className="font-mono">3 &lt; 9</span>, borrow 10 from the tens place:
                  <br />
                  <span className="font-mono pl-4 block my-1 font-semibold text-[#0B192C]">Unit digit = 13 - 9 = 4</span>
                </p>
              </div>
            </div>

            {/* Question 3 */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-label uppercase tracking-wider text-[#C8A84E] font-semibold mb-2">
                <span>Sample 3 · Geometry &amp; Mensuration</span>
              </div>
              <p className="text-sm sm:text-base font-medium text-[#0B192C] leading-relaxed">
                The perimeter of a right-angled triangle is 60 cm and its hypotenuse is 25 cm. Find the area of the triangle.
              </p>
              <div className="mt-4 pt-4 border-t border-slate-100 space-y-2 text-xs sm:text-sm text-slate-700 font-sans leading-relaxed">
                <div className="font-semibold text-slate-900 text-xs font-label uppercase tracking-wider">
                  Step-by-Step Solution:
                </div>
                <p>
                  1. Let the perpendicular sides be <span className="font-mono">a</span> and <span className="font-mono">b</span>, with hypotenuse <span className="font-mono">c = 25 cm</span>:
                  <br />
                  <span className="font-mono pl-4 block my-1">a + b + 25 = 60 ⟹ a + b = 35 cm</span>
                </p>
                <p>
                  2. By Pythagoras theorem:
                  <br />
                  <span className="font-mono pl-4 block my-1">a² + b² = c² = 25² = 625</span>
                </p>
                <p>
                  3. Use the algebraic expansion <span className="font-mono">(a + b)² = a² + b² + 2ab</span>:
                  <br />
                  <span className="font-mono pl-4 block my-0.5">35² = 625 + 2ab</span>
                  <span className="font-mono pl-4 block my-0.5">1225 = 625 + 2ab ⟹ 2ab = 600 ⟹ ab = 300</span>
                </p>
                <p>
                  4. The area of the right-angled triangle is:
                  <br />
                  <span className="font-mono pl-4 block my-1 font-semibold text-[#0B192C]">Area = (1/2) × a × b = (1/2) × 300 = 150 cm²</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Login CTA */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <ResourceLoginCta
          returnUrl="/resources/cds-mathematics"
          resourceTitle="CDS Mathematics"
        />
      </section>
    </div>
  );
}
