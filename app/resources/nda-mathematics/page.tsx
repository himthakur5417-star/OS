import React from "react";
import Link from "next/link";
import { NDA_MATHS_CHAPTERS } from "@/data/vaultManifest";
import ResourceLoginCta from "@/components/ResourceLoginCta";
import { BookOpen, Calculator, CheckCircle2, FileText, HelpCircle, ArrowRight } from "lucide-react";

export default function NdaMathematicsPage() {
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
        "name": "NDA Mathematics",
        "item": "https://www.officiumsupremum.in/resources/nda-mathematics",
      },
    ],
  };

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
                  NDA Mathematics
                </li>
              </ol>
            </nav>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-label uppercase tracking-widest text-slate-700 shadow-sm">
              <Calculator className="w-3.5 h-3.5 text-[#C8A84E]" />
              <span>UPSC NDA &amp; NA Examination · Paper 1</span>
            </div>

            <h1 className="font-heading text-3xl sm:text-5xl font-semibold tracking-tight text-[#0B192C]">
              NDA Mathematics Study Material
            </h1>

            {/* Practical Student Introduction */}
            <div className="space-y-3 text-sm sm:text-base text-slate-600 font-sans leading-relaxed pt-1">
              <p>
                In the UPSC NDA &amp; NA examination, Paper 1 consists solely of Mathematics. It carries 300 marks across 120 multiple-choice questions with a total time of 2.5 hours. Every correct answer earns 2.5 marks, while 0.83 marks are deducted for every wrong answer. Because of this negative marking, guesswork quickly ruins an otherwise solid attempt.
              </p>
              <p>
                This study volume covers all 30 chapters prescribed in the official UPSC syllabus, spanning Algebra, Matrices, Trigonometry, Analytical Geometry, Differential &amp; Integral Calculus, Vectors, Statistics, and Probability. It is designed for Class 11 and 12 school students as well as repeaters who want a clear, formula-driven approach to every chapter.
              </p>
              <p>
                To score consistently, prioritize question selection and concept clarity rather than attempting every problem hurriedly. Aiming for high accuracy on familiar topics prevents negative marks from pulling down your net score. In our mentorship program, we break down these 30 chapters into daily study targets and weekly revision tests so students build steady speed and avoid exam anxiety.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Chapter List Overview */}
      <section className="py-14 sm:py-18 bg-white border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <div className="font-label text-xs uppercase tracking-[0.2em] text-[#C8A84E] font-semibold mb-1">
                Curriculum Structure
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-[#0B192C]">
                Complete 30-Chapter Syllabus
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md font-sans">
              Review every topic included in the NDA Mathematics syllabus below. Full question sets and solved papers are accessible through the student library.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {NDA_MATHS_CHAPTERS.map((ch) => (
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
                    <span>Syllabus Verified</span>
                  </span>
                  <span className="text-slate-400 font-mono text-[11px]">Paper 1</span>
                </div>
              </div>
            ))}
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
              Here are three representative original practice questions showing the method and clarity taught at Officium Supremum.
            </p>
          </div>

          <div className="space-y-6">
            {/* Question 1 */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-label uppercase tracking-wider text-[#C8A84E] font-semibold mb-2">
                <span>Sample 1 · Logarithms</span>
              </div>
              <p className="text-sm sm:text-base font-medium text-[#0B192C] leading-relaxed">
                If <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded">log₁₀ 2 = a</span> and{" "}
                <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded">log₁₀ 3 = b</span>, find the value of{" "}
                <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded">log₁₀ 15</span> in terms of <span className="font-mono">a</span> and <span className="font-mono">b</span>.
              </p>
              <div className="mt-4 pt-4 border-t border-slate-100 space-y-2 text-xs sm:text-sm text-slate-700 font-sans leading-relaxed">
                <div className="font-semibold text-slate-900 text-xs font-label uppercase tracking-wider">
                  Step-by-Step Solution:
                </div>
                <p>
                  1. Express 15 as factors of given bases: <span className="font-mono">15 = 3 × 5</span>. Using logarithm product rule:
                  <br />
                  <span className="font-mono pl-4 block my-1">log₁₀ 15 = log₁₀ 3 + log₁₀ 5</span>
                </p>
                <p>
                  2. Express 5 using 10 and 2: <span className="font-mono">5 = 10 / 2</span>.
                  <br />
                  <span className="font-mono pl-4 block my-1">log₁₀ 5 = log₁₀(10 / 2) = log₁₀ 10 - log₁₀ 2 = 1 - a</span>
                </p>
                <p>
                  3. Substitute back into the expression:
                  <br />
                  <span className="font-mono pl-4 block my-1 font-semibold text-[#0B192C]">log₁₀ 15 = b + (1 - a) = 1 - a + b</span>
                </p>
              </div>
            </div>

            {/* Question 2 */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-label uppercase tracking-wider text-[#C8A84E] font-semibold mb-2">
                <span>Sample 2 · Matrices &amp; Determinants</span>
              </div>
              <p className="text-sm sm:text-base font-medium text-[#0B192C] leading-relaxed">
                Let <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded">A = [[2, -1], [1, 3]]</span>. Determine the value of the matrix expression{" "}
                <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded">A² - 5A + 7I</span>, where <span className="font-mono">I</span> is the 2×2 identity matrix.
              </p>
              <div className="mt-4 pt-4 border-t border-slate-100 space-y-2 text-xs sm:text-sm text-slate-700 font-sans leading-relaxed">
                <div className="font-semibold text-slate-900 text-xs font-label uppercase tracking-wider">
                  Step-by-Step Solution:
                </div>
                <p>
                  1. Find the characteristic equation of 2×2 matrix <span className="font-mono">A</span>:
                  <br />
                  <span className="font-mono pl-4 block my-1">det(A - λI) = λ² - trace(A)λ + det(A) = 0</span>
                </p>
                <p>
                  2. Calculate trace and determinant:
                  <br />
                  <span className="font-mono pl-4 block my-0.5">trace(A) = 2 + 3 = 5</span>
                  <span className="font-mono pl-4 block my-0.5">det(A) = (2)(3) - (-1)(1) = 6 + 1 = 7</span>
                </p>
                <p>
                  3. By the Cayley-Hamilton Theorem, every square matrix satisfies its own characteristic polynomial:
                  <br />
                  <span className="font-mono pl-4 block my-1 font-semibold text-[#0B192C]">A² - 5A + 7I = O (Null Matrix [[0, 0], [0, 0]])</span>
                </p>
              </div>
            </div>

            {/* Question 3 */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-label uppercase tracking-wider text-[#C8A84E] font-semibold mb-2">
                <span>Sample 3 · Sequences &amp; Series</span>
              </div>
              <p className="text-sm sm:text-base font-medium text-[#0B192C] leading-relaxed">
                The sum of the first <span className="font-mono">n</span> terms of an arithmetic progression is given by{" "}
                <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded">Sₙ = 3n² + 5n</span>. Find the common difference <span className="font-mono">d</span> and the 10th term <span className="font-mono">T₁₀</span>.
              </p>
              <div className="mt-4 pt-4 border-t border-slate-100 space-y-2 text-xs sm:text-sm text-slate-700 font-sans leading-relaxed">
                <div className="font-semibold text-slate-900 text-xs font-label uppercase tracking-wider">
                  Step-by-Step Solution:
                </div>
                <p>
                  1. The general <span className="font-mono">n</span>-th term is <span className="font-mono">Tₙ = Sₙ - Sₙ₋₁</span>:
                  <br />
                  <span className="font-mono pl-4 block my-1">Tₙ = (3n² + 5n) - [3(n - 1)² + 5(n - 1)]</span>
                  <span className="font-mono pl-4 block my-1">Tₙ = 3[n² - (n² - 2n + 1)] + 5[n - (n - 1)] = 3(2n - 1) + 5 = 6n + 2</span>
                </p>
                <p>
                  2. Common difference <span className="font-mono">d</span>:
                  <br />
                  <span className="font-mono pl-4 block my-0.5">d = Tₙ - Tₙ₋₁ = (6n + 2) - [6(n - 1) + 2] = 6</span>
                </p>
                <p>
                  3. The 10th term:
                  <br />
                  <span className="font-mono pl-4 block my-1 font-semibold text-[#0B192C]">T₁₀ = 6(10) + 2 = 62</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Login CTA */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <ResourceLoginCta
          returnUrl="/resources/nda-mathematics"
          resourceTitle="NDA Mathematics"
        />
      </section>
    </div>
  );
}
