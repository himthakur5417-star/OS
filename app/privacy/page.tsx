import type { Metadata } from "next";
import Link from "next/link";
import { Shield, Mail, Phone, MapPin, Clock, Lock, FileText, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for Officium Supremum. Understand how personal information, admissions enquiries, and mentorship communications are collected, used, and protected.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-[#FAFAF9] text-[#0F172A] min-h-screen">
      {/* Hero Header */}
      <section className="relative pt-16 pb-12 lg:pt-24 lg:pb-16 bg-gradient-to-b from-white via-[#FAF7F2]/60 to-[#FAFAF9] border-b border-slate-200/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-slate-200/80 shadow-soft-sm text-xs font-label uppercase tracking-widest text-[#C8A84E]">
            <Shield className="w-3.5 h-3.5 text-[#C8A84E]" />
            <span>Privacy &amp; Data Protection</span>
          </div>

          <h1 className="font-heading text-3xl sm:text-5xl font-semibold tracking-tight text-[#0B192C] leading-tight">
            Privacy Policy
          </h1>

          <p className="text-sm sm:text-base text-slate-600 font-sans leading-relaxed max-w-2xl mx-auto">
            This Privacy Policy explains how Officium Supremum collects, uses, handles, and safeguards personal information when you visit our website, schedule a consultation, or submit an admission enquiry.
          </p>

          <div className="pt-2 flex items-center justify-center gap-3 text-xs text-slate-500 font-mono">
            <span>Last Updated: October 2026</span>
            <span>•</span>
            <span>1-Year Retention Horizon</span>
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <section className="py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

          {/* 1. Operating Entity & Contact Information */}
          <div className="p-6 sm:p-8 bg-white border border-slate-200/80 rounded-2xl shadow-soft-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200/70 flex items-center justify-center text-[#C8A84E]">
                <MapPin className="w-4 h-4" />
              </div>
              <h2 className="font-heading text-xl sm:text-2xl font-semibold text-[#0B192C]">
                1. Operator &amp; Contact Details
              </h2>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed font-sans">
              Officium Supremum is an educational and personal mentorship initiative operated by an unregistered individual / sole proprietor based in Bihar, India.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 text-xs">
              <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-100 space-y-1.5">
                <span className="font-label uppercase tracking-wider text-slate-500 font-semibold block">
                  Postal Address
                </span>
                <p className="text-slate-800 font-sans leading-relaxed">
                  Ward No.-4, Vill./P.O.- Daldal,<br />
                  P.S.- Bheja, Block- Madhepur,<br />
                  Dist.- Madhubani, State- Bihar,<br />
                  Pincode- 847408, India
                </p>
              </div>

              <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-100 space-y-2">
                <span className="font-label uppercase tracking-wider text-slate-500 font-semibold block">
                  Direct Inquiries
                </span>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-slate-700">
                    <Mail className="w-3.5 h-3.5 text-[#C8A84E]" />
                    <a href="mailto:osupremum@gmail.com" className="font-mono text-slate-900 hover:underline">
                      osupremum@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <Phone className="w-3.5 h-3.5 text-[#C8A84E]" />
                    <span className="font-mono text-slate-900">+91 8969634656</span>
                  </div>
                  <div className="text-slate-500 text-[11px]">
                    Admissions Desk &amp; WhatsApp Support
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Information Collected Through the Website */}
          <div className="p-6 sm:p-8 bg-white border border-slate-200/80 rounded-2xl shadow-soft-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-sky-50 border border-sky-200/70 flex items-center justify-center text-sky-600">
                <FileText className="w-4 h-4" />
              </div>
              <h2 className="font-heading text-xl sm:text-2xl font-semibold text-[#0B192C]">
                2. Information We Collect
              </h2>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed font-sans">
              We collect information directly from you when you submit an admission enquiry form, book an orientation call, or interact with our learning platform. We only capture fields necessary to respond to your request:
            </p>

            <ul className="space-y-2.5 text-xs text-slate-700 font-sans">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#C8A84E] shrink-0 mt-0.5" />
                <span>
                  <strong>Full Name:</strong> To address you or the student correctly in all academic communications.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#C8A84E] shrink-0 mt-0.5" />
                <span>
                  <strong>Phone / WhatsApp Number:</strong> To contact you via telephone call or WhatsApp regarding your mentorship consultation.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#C8A84E] shrink-0 mt-0.5" />
                <span>
                  <strong>Email Address (Optional):</strong> When voluntarily provided, used to share admission details or follow-up notes.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#C8A84E] shrink-0 mt-0.5" />
                <span>
                  <strong>Target Program Track:</strong> Your academic goal or examination track (e.g. Defence Leadership — NDA / CDS / AFCAT, Scholars Program for Class 11–12, Juniors Program for Class 7–10, or General Guidance).
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#C8A84E] shrink-0 mt-0.5" />
                <span>
                  <strong>Student or Parent Selection:</strong> Indicating whether the enquiry is submitted by the candidate or by a parent/guardian.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#C8A84E] shrink-0 mt-0.5" />
                <span>
                  <strong>Preferred Orientation Slot:</strong> Your requested consultation window (Morning, Afternoon, or Evening) on dedicated booking pages.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#C8A84E] shrink-0 mt-0.5" />
                <span>
                  <strong>Messages and Goals:</strong> Any background information, study challenges, or notes you choose to share in the enquiry message box.
                </span>
              </li>
            </ul>
          </div>

          {/* 3. How Enquiry Information is Used */}
          <div className="p-6 sm:p-8 bg-white border border-slate-200/80 rounded-2xl shadow-soft-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200/70 flex items-center justify-center text-emerald-600">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <h2 className="font-heading text-xl sm:text-2xl font-semibold text-[#0B192C]">
                3. How We Use Your Information
              </h2>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed font-sans">
              Information provided through our website forms is strictly utilized for educational and mentorship operations:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
              <div className="p-3.5 bg-slate-50/70 rounded-xl border border-slate-100 space-y-1">
                <span className="font-semibold text-slate-900 block">Orientation Calls</span>
                <span>Scheduling and confirming the free 20-minute diagnostic consultation with an academy mentor.</span>
              </div>
              <div className="p-3.5 bg-slate-50/70 rounded-xl border border-slate-100 space-y-1">
                <span className="font-semibold text-slate-900 block">Personalised Roadmaps</span>
                <span>Reviewing your current syllabus status to provide actionable study recommendations.</span>
              </div>
              <div className="p-3.5 bg-slate-50/70 rounded-xl border border-slate-100 space-y-1">
                <span className="font-semibold text-slate-900 block">Admissions Updates</span>
                <span>Answering questions regarding batch schedules, daily accountability systems, and study library access.</span>
              </div>
              <div className="p-3.5 bg-slate-50/70 rounded-xl border border-slate-100 space-y-1">
                <span className="font-semibold text-slate-900 block">No Commercial Sale</span>
                <span>We do not sell, rent, or trade your contact information with external marketing companies or data brokers.</span>
              </div>
            </div>
          </div>

          {/* 4. WhatsApp Redirection & Meta Integration */}
          <div className="p-6 sm:p-8 bg-white border border-slate-200/80 rounded-2xl shadow-soft-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200/70 flex items-center justify-center text-emerald-600">
                <Phone className="w-4 h-4" />
              </div>
              <h2 className="font-heading text-xl sm:text-2xl font-semibold text-[#0B192C]">
                4. WhatsApp Redirection Notice
              </h2>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed font-sans">
              To provide immediate assistance, our consultation booking forms give you the option to continue your conversation on WhatsApp with our Admissions Desk (<span className="font-mono text-slate-800">+91 8969634656</span>).
            </p>

            <div className="p-4 bg-emerald-50/60 border border-emerald-200/60 rounded-xl text-xs text-emerald-950 space-y-2">
              <span className="font-semibold block">Transmitted Information on WhatsApp Click:</span>
              <p className="leading-relaxed">
                When you click to connect via WhatsApp, the browser opens an encoded link containing only the fields you filled in (your name, student/parent category, target program, contact number, email if provided, and generated booking reference).
              </p>
              <p className="leading-relaxed text-emerald-900/80">
                Once redirected, your messaging interactions are handled by WhatsApp and are governed by WhatsApp’s / Meta Platforms’ respective Privacy Policy and Terms of Service.
              </p>
            </div>
          </div>

          {/* 5. Infrastructure, Database & Technical Activity Logs */}
          <div className="p-6 sm:p-8 bg-white border border-slate-200/80 rounded-2xl shadow-soft-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-200/70 flex items-center justify-center text-indigo-600">
                <Lock className="w-4 h-4" />
              </div>
              <h2 className="font-heading text-xl sm:text-2xl font-semibold text-[#0B192C]">
                5. Hosting, Database &amp; Technical Activity Logs
              </h2>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed font-sans">
              Our website is deployed on modern cloud infrastructure with specific technical data-handling boundaries:
            </p>

            <div className="space-y-3 text-xs text-slate-700 font-sans">
              <div className="p-3.5 bg-slate-50/70 rounded-xl border border-slate-100">
                <span className="font-semibold text-slate-900 block mb-0.5">Hosting &amp; Edge Network</span>
                <span>The website is hosted on Vercel Inc., which delivers application files, executes serverless functions, and processes network headers for server routing.</span>
              </div>

              <div className="p-3.5 bg-slate-50/70 rounded-xl border border-slate-100">
                <span className="font-semibold text-slate-900 block mb-0.5">Database Storage &amp; Authentication</span>
                <span>Enquiries and registered student profiles are stored securely in Google Cloud Firestore (Firebase project: <span className="font-mono text-slate-800">os-web-1cc80</span>) located in Google data centres.</span>
              </div>

              <div className="p-3.5 bg-slate-50/70 rounded-xl border border-slate-100">
                <span className="font-semibold text-slate-900 block mb-0.5">Internal Activity Logging (No Third-Party Analytics Trackers)</span>
                <span>
                  Our platform runs a lightweight internal route logger that records page path, referring URL, timestamp, network IP address, and browser User-Agent in Firestore to monitor system uptime and page navigation. <strong>We do not run Google Analytics, advertising tracking pixels, or third-party behavioral trackers on this website.</strong>
                </span>
              </div>

              <div className="p-3.5 bg-slate-50/70 rounded-xl border border-slate-100">
                <span className="font-semibold text-slate-900 block mb-0.5">Cookies &amp; Local Browser Storage</span>
                <span>
                  We use an HTTP-only session cookie (<span className="font-mono text-slate-800">os_admin_session</span>) exclusively for verifying administrator login access to the administration portal. For students, local browser storage (<span className="font-mono text-slate-800">localStorage</span>) is used strictly to retain login session state on your device. We do not use third-party advertising cookies.
                </span>
              </div>
            </div>
          </div>

          {/* 6. Data Retention Policy */}
          <div className="p-6 sm:p-8 bg-white border border-slate-200/80 rounded-2xl shadow-soft-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200/70 flex items-center justify-center text-[#C8A84E]">
                <Clock className="w-4 h-4" />
              </div>
              <h2 className="font-heading text-xl sm:text-2xl font-semibold text-[#0B192C]">
                6. Data Retention Period
              </h2>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed font-sans">
              Personal information gathered from admissions enquiries, guidance consultation requests, and internal activity logs is retained for a period of <strong>1 year</strong> from the date of submission, subject to any applicable legal, accounting, or administrative requirements. After this period, records may be archived, anonymized, or purged from the database.
            </p>
          </div>

          {/* 7. Security Safeguards */}
          <div className="p-6 sm:p-8 bg-white border border-slate-200/80 rounded-2xl shadow-soft-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700">
                <Lock className="w-4 h-4" />
              </div>
              <h2 className="font-heading text-xl sm:text-2xl font-semibold text-[#0B192C]">
                7. Security Practices
              </h2>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed font-sans">
              We apply reasonable organizational and technical measures to protect submitted information against unauthorized access, alteration, disclosure, or destruction. These measures include HTTPS transport encryption, restricted server-side database access rules, and cryptographically verified administrative sessions. However, no data transmission over the Internet can be guaranteed as completely secure, and we cannot warrant absolute security.
            </p>
          </div>

          {/* 8. User Rights & Data Requests */}
          <div className="p-6 sm:p-8 bg-white border border-slate-200/80 rounded-2xl shadow-soft-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200/70 flex items-center justify-center text-[#C8A84E]">
                <Mail className="w-4 h-4" />
              </div>
              <h2 className="font-heading text-xl sm:text-2xl font-semibold text-[#0B192C]">
                8. Your Rights &amp; Access Requests
              </h2>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed font-sans">
              If you have submitted personal information through our website and wish to review, update, correct, or request the deletion of your records, you may contact the operator directly at:
            </p>

            <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl text-xs space-y-2">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-900">Email for Data Inquiries:</span>
                <a href="mailto:osupremum@gmail.com" className="font-mono text-[#C8A84E] font-bold hover:underline">
                  osupremum@gmail.com
                </a>
              </div>
              <p className="text-slate-500 leading-relaxed">
                Please include your full name, the phone number or email address used during submission, and the nature of your request so we can verify your identity and process your inquiry promptly.
              </p>
            </div>
          </div>

          {/* 9. Policy Updates */}
          <div className="p-6 sm:p-8 bg-white border border-slate-200/80 rounded-2xl shadow-soft-xs space-y-4">
            <h2 className="font-heading text-xl sm:text-2xl font-semibold text-[#0B192C]">
              9. Updates to This Policy
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed font-sans">
              We may update this Privacy Policy periodically to reflect changes in our mentorship programs, operational practices, or website features. When changes are made, the revised policy will be posted on this page with the updated revision indicator at the top. We encourage visitors to review this page periodically.
            </p>
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
              <Link href="/terms" className="hover:text-[#0B192C] transition-colors">
                Terms &amp; Conditions
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
