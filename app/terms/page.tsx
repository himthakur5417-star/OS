import type { Metadata } from "next";
import Link from "next/link";
import { Shield, BookOpen, AlertTriangle, CheckCircle2, Clock, Mail, MapPin, FileText, Ban } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Terms & Conditions for Officium Supremum. Review guidelines regarding educational mentorship, free orientations, non-affiliation, intellectual property, and acceptable website use.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
  return (
    <div className="bg-[#FAFAF9] text-[#0F172A] min-h-screen">
      {/* Hero Header */}
      <section className="relative pt-16 pb-12 lg:pt-24 lg:pb-16 bg-gradient-to-b from-white via-[#FAF7F2]/60 to-[#FAFAF9] border-b border-slate-200/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-slate-200/80 shadow-soft-sm text-xs font-label uppercase tracking-widest text-[#C8A84E]">
            <FileText className="w-3.5 h-3.5 text-[#C8A84E]" />
            <span>Academic Guidelines &amp; Policies</span>
          </div>

          <h1 className="font-heading text-3xl sm:text-5xl font-semibold tracking-tight text-[#0B192C] leading-tight">
            Terms &amp; Conditions
          </h1>

          <p className="text-sm sm:text-base text-slate-600 font-sans leading-relaxed max-w-2xl mx-auto">
            Please read these Terms &amp; Conditions carefully before booking a consultation, accessing study library materials, or enrolling in any mentorship program with Officium Supremum.
          </p>

          <div className="pt-2 flex items-center justify-center gap-3 text-xs text-slate-500 font-mono">
            <span>Last Updated: October 2026</span>
            <span>•</span>
            <span>Personal Non-Commercial Use</span>
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <section className="py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

          {/* 1. Operating Entity */}
          <div className="p-6 sm:p-8 bg-white border border-slate-200/80 rounded-2xl shadow-soft-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200/70 flex items-center justify-center text-[#C8A84E]">
                <MapPin className="w-4 h-4" />
              </div>
              <h2 className="font-heading text-xl sm:text-2xl font-semibold text-[#0B192C]">
                1. Operator &amp; Initiative Overview
              </h2>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed font-sans">
              Officium Supremum is an independent educational and personal mentorship initiative operated by an unregistered individual / sole proprietor based in Bihar, India.
            </p>

            <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-100 text-xs space-y-2">
              <span className="font-label uppercase tracking-wider text-slate-500 font-semibold block">
                Postal Contact Address
              </span>
              <p className="text-slate-800 font-sans leading-relaxed">
                Ward No.-4, Vill./P.O.- Daldal, P.S.- Bheja, Block- Madhepur, Dist.- Madhubani, State- Bihar, Pincode- 847408, India
              </p>
              <div className="pt-1 flex items-center gap-2 text-slate-600">
                <span>Official Contact:</span>
                <a href="mailto:osupremum@gmail.com" className="font-mono text-slate-900 font-bold hover:underline">
                  osupremum@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* 2. Non-Affiliation Disclaimer */}
          <div className="p-6 sm:p-8 bg-white border border-rose-200/80 rounded-2xl shadow-soft-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-rose-50 border border-rose-200/70 flex items-center justify-center text-rose-600">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <h2 className="font-heading text-xl sm:text-2xl font-semibold text-[#0B192C]">
                2. Official Non-Affiliation Disclaimer
              </h2>
            </div>

            <div className="p-4 bg-rose-50/50 border border-rose-200/60 rounded-xl text-xs text-rose-950 space-y-2.5">
              <p className="font-semibold leading-relaxed">
                Officium Supremum is a private educational mentorship initiative and is NOT an official agency, training centre, or affiliate of the Government of India.
              </p>
              <p className="leading-relaxed text-slate-700">
                Specifically, Officium Supremum is <strong>not affiliated with, endorsed by, sponsored by, approved by, or in any way officially connected with:</strong>
              </p>
              <ul className="space-y-1.5 list-disc pl-5 text-slate-700">
                <li>The Union Public Service Commission (UPSC)</li>
                <li>The Ministry of Defence or any other Ministry of the Government of India</li>
                <li>The Indian Armed Forces (Indian Army, Indian Navy, Indian Air Force)</li>
                <li>The Services Selection Board (SSB) or Service Selection Centres</li>
              </ul>
              <p className="leading-relaxed text-slate-600 text-[11px] pt-1">
                Any references on this website to examination titles (e.g. NDA, CDS, AFCAT), official syllabi, or recruitment schemes are used strictly for informational, educational, and curriculum categorization purposes.
              </p>
            </div>
          </div>

          {/* 3. Educational Guidance & No Outcome Guarantee */}
          <div className="p-6 sm:p-8 bg-white border border-slate-200/80 rounded-2xl shadow-soft-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200/70 flex items-center justify-center text-[#C8A84E]">
                <Shield className="w-4 h-4" />
              </div>
              <h2 className="font-heading text-xl sm:text-2xl font-semibold text-[#0B192C]">
                3. Nature of Mentorship &amp; No Guarantee of Selection
              </h2>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed font-sans">
              Officium Supremum provides personalized guidance, structured study schedules, concept reinforcement, and daily accountability checks designed to help students build consistent study habits.
            </p>

            <div className="p-4 bg-[#FAF7F2] border border-amber-200/60 rounded-xl text-xs text-slate-800 space-y-2">
              <span className="font-semibold text-slate-900 block">No Guarantee of Outcome:</span>
              <p className="leading-relaxed text-slate-700">
                Participation in any mentorship track, orientation call, or study program <strong>does not guarantee</strong> selection, appointment, qualification, rank, score, or employment in any competitive examination, board examination, or military recruitment process.
              </p>
              <p className="leading-relaxed text-slate-600">
                Exam results and personal growth depend entirely on the individual candidate&apos;s personal dedication, effort, background, independent study, exam-day performance, and official selection board criteria.
              </p>
            </div>
          </div>

          {/* 4. Orientation Consultations & Programs */}
          <div className="p-6 sm:p-8 bg-white border border-slate-200/80 rounded-2xl shadow-soft-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-sky-50 border border-sky-200/70 flex items-center justify-center text-sky-600">
                <Clock className="w-4 h-4" />
              </div>
              <h2 className="font-heading text-xl sm:text-2xl font-semibold text-[#0B192C]">
                4. Consultations &amp; Mentorship Programs
              </h2>
            </div>

            <div className="space-y-3 text-xs text-slate-700 font-sans">
              <div className="p-3.5 bg-slate-50/70 rounded-xl border border-slate-100 space-y-1">
                <span className="font-semibold text-slate-900 block">Free 20-Minute Orientation Call</span>
                <span>The introductory diagnostic orientation consultation booked through our website is provided free of cost. There is no financial obligation incurred by requesting or attending this call.</span>
              </div>

              <div className="p-3.5 bg-slate-50/70 rounded-xl border border-slate-100 space-y-1">
                <span className="font-semibold text-slate-900 block">Program Tracks Offered</span>
                <span>
                  Our ongoing mentorship encompasses Juniors (Classes 7–10 foundation and habits), Scholars (Classes 11–12 boards and revision routines), and Defence Leadership (NDA / CDS / AFCAT preparation routines and SSB personality development).
                </span>
              </div>
            </div>
          </div>

          {/* 5. Intellectual Property & Personal Educational Use */}
          <div className="p-6 sm:p-8 bg-white border border-slate-200/80 rounded-2xl shadow-soft-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-200/70 flex items-center justify-center text-indigo-600">
                <BookOpen className="w-4 h-4" />
              </div>
              <h2 className="font-heading text-xl sm:text-2xl font-semibold text-[#0B192C]">
                5. Intellectual Property &amp; Personal Non-Commercial Use
              </h2>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed font-sans">
              All original learning frameworks, revision dossiers, formula summaries, study planners, and chapter materials published in the Study Library or shared during mentorship sessions are the intellectual property of Officium Supremum.
            </p>

            <ul className="space-y-2 text-xs text-slate-700 font-sans">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C8A84E] shrink-0 mt-0.5" />
                <span>
                  <strong>Authorized Use:</strong> Study materials are provided strictly for your personal, individual, non-commercial academic study.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Ban className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Prohibited Use:</strong> Systematic downloading, mass scraping, commercial resale, public re-distribution, or uploading materials to third-party commercial study portals is strictly prohibited.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C8A84E] shrink-0 mt-0.5" />
                <span>
                  <strong>Third-Party Content:</strong> Official UPSC examination syllabi and publicly available previous years&apos; question papers remain the copyright and property of their respective official issuing authorities.
                </span>
              </li>
            </ul>
          </div>

          {/* 6. Acceptable Website Use */}
          <div className="p-6 sm:p-8 bg-white border border-slate-200/80 rounded-2xl shadow-soft-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700">
                <Shield className="w-4 h-4" />
              </div>
              <h2 className="font-heading text-xl sm:text-2xl font-semibold text-[#0B192C]">
                6. Acceptable Website Use &amp; Responsibilities
              </h2>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed font-sans">
              When using our website and submitting consultation forms, you agree to:
            </p>

            <ul className="space-y-2 text-xs text-slate-700 font-sans">
              <li>• Provide accurate and authentic contact information (name, phone number, and student/parent status).</li>
              <li>• Not use automated scrapers, bots, or automated submission scripts on our forms.</li>
              <li>• Not attempt unauthorized access to the administration portal, backend API endpoints, or database infrastructure.</li>
              <li>• Not interfere with the normal operation, security, or availability of the website for other visitors.</li>
            </ul>
          </div>

          {/* 7. Accuracy & Availability */}
          <div className="p-6 sm:p-8 bg-white border border-slate-200/80 rounded-2xl shadow-soft-xs space-y-4">
            <h2 className="font-heading text-xl sm:text-2xl font-semibold text-[#0B192C]">
              7. Website Accuracy &amp; Availability
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed font-sans">
              Information on this website is provided in good faith for general educational awareness. While we make every effort to keep chapter notes, formulas, and syllabus overviews accurate and up-to-date, the website and educational content are provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis without warranties of any kind. We reserve the right to modify, update, or temporarily suspend access to study library resources for maintenance without prior notice.
            </p>
          </div>

          {/* 8. Updates to Terms */}
          <div className="p-6 sm:p-8 bg-white border border-slate-200/80 rounded-2xl shadow-soft-xs space-y-4">
            <h2 className="font-heading text-xl sm:text-2xl font-semibold text-[#0B192C]">
              8. Policy Updates
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed font-sans">
              We reserve the right to revise these Terms &amp; Conditions as our educational programs evolve. Updated terms will take effect immediately upon publication on this page. Your continued use of the website or attendance in mentorship sessions after changes are posted constitutes acceptance of the revised terms.
            </p>
          </div>

          {/* 9. Contact Information */}
          <div className="p-6 sm:p-8 bg-white border border-slate-200/80 rounded-2xl shadow-soft-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200/70 flex items-center justify-center text-[#C8A84E]">
                <Mail className="w-4 h-4" />
              </div>
              <h2 className="font-heading text-xl sm:text-2xl font-semibold text-[#0B192C]">
                9. Inquiries Regarding Terms
              </h2>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed font-sans">
              If you have any questions or require clarification regarding these Terms &amp; Conditions, please contact us directly:
            </p>

            <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl text-xs space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-900">Email:</span>
                <a href="mailto:osupremum@gmail.com" className="font-mono text-[#C8A84E] font-bold hover:underline">
                  osupremum@gmail.com
                </a>
              </div>
              <div className="text-slate-500 text-[11px]">
                Officium Supremum Academy Mentorship Desk
              </div>
            </div>
          </div>

          {/* Back Navigation Bar */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <Link
              href="/"
              className="text-slate-600 hover:text-[#0B192C] font-label uppercase tracking-wider transition-colors flex items-center gap-1.5"
            >
              ← Return to Home
            </Link>
            <div className="flex items-center gap-4 font-label uppercase tracking-wider text-slate-500">
              <Link href="/privacy" className="hover:text-[#0B192C] transition-colors">
                Privacy Policy
              </Link>
              <span>•</span>
              <Link href="/contact" className="hover:text-[#0B192C] transition-colors">
                Contact Admissions
              </Link>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
