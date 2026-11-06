"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Phone,
  EnvelopeSimple,
  MapPin,
  PaperPlaneRight,
  CheckCircle,
  ShieldCheck,
  ArrowUpRight,
  Clock,
  VideoCamera,
  SpinnerGap,
  Sparkle
} from "@phosphor-icons/react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [program, setProgram] = useState("defence");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [enquiryRef, setEnquiryRef] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    if (!name || !phone) return;

    setSubmitting(true);

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim(),
          program,
          source: "contact_page",
          message: message.trim(),
        }),
      });

      const data = await res.json();
      if (data.enquiryId) {
        setEnquiryRef(data.enquiryId);
      }
    } catch (err) {
      console.error("Database save error:", err);
    } finally {
      setSubmitting(false);
      setSent(true);
    }
  };

  return (
    <div className="bg-[#F3EFE6] text-[#252923] min-h-screen relative overflow-x-hidden selection:bg-[#34483C] selection:text-[#F3EFE6]">

      {/* Hero Header Section */}
      <section className="relative pt-24 pb-12 sm:pt-28 sm:pb-16 border-b border-[#D8D5C8]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h1 className="heading-1 text-[#252923] text-balance">
            Get in Touch with Our Mentors
          </h1>

          <p className="body-2 text-[#252923]/75 max-w-2xl mx-auto text-pretty">
            Whether you are a student preparing for competitive examinations or a parent seeking disciplined academic guidance for your child, our lead mentorship team is directly accessible.
          </p>

          {/* Quick Institutional Highlights */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs text-[#252923]/70 font-medium">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#D8D5C8]">
              <Clock className="w-3.5 h-3.5 text-[#34483C]" weight="bold" />
              <span>Response within 6 hours</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#D8D5C8]">
              <VideoCamera className="w-3.5 h-3.5 text-[#34483C]" weight="bold" />
              <span>Live 1-on-1 Online Mentorship</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#D8D5C8]">
              <Sparkle className="w-3.5 h-3.5 text-[#B18A58]" weight="fill" />
              <span>Direct Verified Desk</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-14 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

            {/* Left Column: Direct Communication Channels & Profile */}
            <div className="lg:col-span-5 space-y-4">
              <div className="space-y-1">
                <div className="caption-3 uppercase tracking-widest text-[#B18A58] font-semibold">
                  Verified Channels
                </div>
                <h2 className="heading-3 text-[#252923]">
                  Direct Mentor Access
                </h2>
              </div>

              {/* Admissions & WhatsApp Card */}
              <a
                href="https://wa.me/918969634656"
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 sm:p-6 rounded-2xl bg-white border border-[#D8D5C8] hover:border-[#34483C] transition-all duration-300 flex items-start gap-4 group shadow-soft-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#34483C]"
              >
                <div className="w-11 h-11 rounded-xl bg-[#34483C]/10 border border-[#34483C]/20 flex items-center justify-center text-[#34483C] shrink-0 group-hover:bg-[#34483C] group-hover:text-[#F3EFE6] transition-all">
                  <Phone className="w-5 h-5" weight="bold" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="caption-3 uppercase tracking-wider text-[#B18A58] font-semibold">
                    Admissions &amp; WhatsApp
                  </div>
                  <div className="title-2 text-[#252923] group-hover:text-[#34483C] transition-colors truncate">
                    +91 8969634656
                  </div>
                  <p className="body-3 text-[#252923]/65 mt-0.5">
                    Fastest response for urgent admissions &amp; orientation queries
                  </p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#252923]/40 group-hover:text-[#34483C] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 self-center" weight="bold" />
              </a>

              {/* Email Us Card */}
              <a
                href="mailto:osupremum@gmail.com"
                className="p-5 sm:p-6 rounded-2xl bg-white border border-[#D8D5C8] hover:border-[#34483C] transition-all duration-300 flex items-start gap-4 group shadow-soft-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#34483C]"
              >
                <div className="w-11 h-11 rounded-xl bg-[#34483C]/10 border border-[#34483C]/20 flex items-center justify-center text-[#34483C] shrink-0 group-hover:bg-[#34483C] group-hover:text-[#F3EFE6] transition-all">
                  <EnvelopeSimple className="w-5 h-5" weight="bold" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="caption-3 uppercase tracking-wider text-[#B18A58] font-semibold">
                    Email Admissions Desk
                  </div>
                  <div className="title-2 text-[#252923] group-hover:text-[#34483C] transition-colors break-all">
                    osupremum@gmail.com
                  </div>
                  <p className="body-3 text-[#252923]/65 mt-0.5">
                    For formal academic correspondence and syllabus requests
                  </p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#252923]/40 group-hover:text-[#34483C] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 self-center" weight="bold" />
              </a>

              {/* Mode of Learning Card */}
              <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#D8D5C8] flex items-start gap-4 shadow-soft-sm">
                <div className="w-11 h-11 rounded-xl bg-[#34483C]/10 border border-[#34483C]/20 flex items-center justify-center text-[#34483C] shrink-0">
                  <MapPin className="w-5 h-5" weight="bold" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="caption-3 uppercase tracking-wider text-[#B18A58] font-semibold">
                    Mode of Learning
                  </div>
                  <div className="title-2 text-[#252923]">
                    Live Online Mentorship
                  </div>
                  <p className="body-3 text-[#252923]/65 mt-0.5">
                    Disciplined 1-on-1 daily guidance accessible nationwide across India
                  </p>
                </div>
              </div>

              {/* Trust Signal / Guarantee */}
              <div className="p-5 rounded-2xl bg-[#D8D5C8]/30 border border-[#D8D5C8] text-center space-y-1">
                <p className="body-2 text-[#252923] font-medium leading-relaxed">
                  &ldquo;We respond within 6 hours. Every student receives personal mentor attention.&rdquo;
                </p>
              </div>

              {/* Scheduled Consultation Option */}
              <div className="p-5 rounded-2xl bg-white border border-[#34483C]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-soft-sm">
                <div>
                  <div className="caption-2 uppercase tracking-wider text-[#34483C] font-semibold">
                    Prefer a Scheduled Consultation?
                  </div>
                  <p className="body-3 text-[#252923]/70 mt-0.5">
                    Book a free 20-minute strategy call with our lead mentor.
                  </p>
                </div>
                <Link
                  href="/book-orientation"
                  className="px-4 py-2.5 rounded-xl bg-[#34483C] hover:bg-[#252923] text-[#F3EFE6] caption-3 uppercase tracking-wider font-semibold transition-colors shrink-0 flex items-center gap-1.5"
                >
                  <span>Book Call</span>
                  <ArrowUpRight className="w-3.5 h-3.5" weight="bold" />
                </Link>
              </div>
            </div>

            {/* Right Column: Admission Enquiry Form */}
            <div className="lg:col-span-7">
              <div className="p-6 sm:p-10 rounded-2xl bg-white border border-[#D8D5C8] shadow-soft-md relative">
                {sent ? (
                  <div className="text-center py-10 sm:py-12 space-y-5">
                    <div className="w-14 h-14 rounded-2xl bg-[#34483C]/10 border border-[#34483C]/30 flex items-center justify-center text-[#34483C] mx-auto">
                      <CheckCircle className="w-8 h-8" weight="fill" />
                    </div>

                    <div className="space-y-2">
                      <h3 className="heading-3 text-[#252923]">
                        Enquiry Successfully Received
                      </h3>
                      <p className="body-3 text-[#252923]/70 max-w-md mx-auto leading-relaxed">
                        Your details have been securely recorded. An Officium Supremum mentor will review your target track and reach out within 6 hours.
                      </p>
                    </div>

                    {enquiryRef && (
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#F3EFE6] border border-[#D8D5C8] font-mono text-xs text-[#252923]">
                        <span className="caption-3 uppercase tracking-wider text-[#B18A58] font-semibold">
                          Enquiry Reference:
                        </span>
                        <span className="font-semibold text-[#34483C]">{enquiryRef}</span>
                      </div>
                    )}

                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                      <a
                        href={`https://wa.me/918969634656?text=${encodeURIComponent(
                          `Hello Officium Supremum, I submitted enquiry ${enquiryRef || ""} for the ${program.toUpperCase()} program.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto px-6 py-3 bg-[#34483C] hover:bg-[#252923] text-[#F3EFE6] button-sm uppercase tracking-wider rounded-xl transition-all shadow-soft-sm flex items-center justify-center gap-2"
                      >
                        <Phone className="w-3.5 h-3.5" weight="bold" />
                        <span>Chat on WhatsApp</span>
                      </a>
                      <button
                        type="button"
                        onClick={() => {
                          setSent(false);
                          setEnquiryRef(null);
                        }}
                        className="w-full sm:w-auto px-6 py-3 bg-[#F3EFE6] hover:bg-[#D8D5C8]/40 border border-[#D8D5C8] text-[#252923] button-sm uppercase tracking-wider rounded-xl transition-colors"
                      >
                        Submit Another Enquiry
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="mb-6 space-y-1">
                      <h3 className="heading-3 text-[#252923]">
                        Send an Admission Enquiry
                      </h3>
                      <p className="body-3 text-[#252923]/70">
                        Fill in your details below and an Officium Supremum mentor will get in touch with you.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      {/* Full Name */}
                      <div>
                        <label className="block caption-3 uppercase tracking-wider text-[#252923] font-semibold mb-1">
                          Full Name <span className="text-[#B18A58]">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Your Name or Student's Name"
                          className="w-full bg-[#F3EFE6] border border-[#D8D5C8] rounded-xl px-4 py-3 text-sm text-[#252923] placeholder:text-[#252923]/40 outline-none focus:border-[#34483C] focus:ring-1 focus:ring-[#34483C] transition-all font-sans"
                        />
                      </div>

                      {/* Phone & Program Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block caption-3 uppercase tracking-wider text-[#252923] font-semibold mb-1">
                            Phone / WhatsApp <span className="text-[#B18A58]">*</span>
                          </label>
                          <input
                            type="tel"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+91 98765 43210"
                            className="w-full bg-[#F3EFE6] border border-[#D8D5C8] rounded-xl px-4 py-3 text-sm text-[#252923] placeholder:text-[#252923]/40 outline-none focus:border-[#34483C] focus:ring-1 focus:ring-[#34483C] transition-all font-sans"
                          />
                        </div>

                        <div>
                          <label className="block caption-3 uppercase tracking-wider text-[#252923] font-semibold mb-1">
                            Target Program
                          </label>
                          <select
                            value={program}
                            onChange={(e) => setProgram(e.target.value)}
                            className="w-full bg-[#F3EFE6] border border-[#D8D5C8] rounded-xl px-4 py-3 text-sm text-[#252923] outline-none focus:border-[#34483C] focus:ring-1 focus:ring-[#34483C] transition-all font-sans cursor-pointer"
                          >
                            <option value="defence">Defence Track (NDA / CDS / AFCAT)</option>
                            <option value="juniors">Juniors Track (Class 7–10)</option>
                            <option value="scholars">Scholars Track (Class 11–12)</option>
                            <option value="materials">Study Materials &amp; Library Access</option>
                          </select>
                        </div>
                      </div>

                      {/* Email Address */}
                      <div>
                        <label className="block caption-3 uppercase tracking-wider text-[#252923] font-semibold mb-1">
                          Email Address <span className="text-[#252923]/50 font-normal lowercase">(optional)</span>
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="student@example.com"
                          className="w-full bg-[#F3EFE6] border border-[#D8D5C8] rounded-xl px-4 py-3 text-sm text-[#252923] placeholder:text-[#252923]/40 outline-none focus:border-[#34483C] focus:ring-1 focus:ring-[#34483C] transition-all font-sans"
                        />
                      </div>

                      {/* Goal / Challenge Textarea */}
                      <div>
                        <label className="block caption-3 uppercase tracking-wider text-[#252923] font-semibold mb-1">
                          Your Goal or Current Challenge <span className="text-[#252923]/50 font-normal lowercase">(optional)</span>
                        </label>
                        <textarea
                          rows={3}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="e.g. Currently in Class 12 preparing for NDA; need help with Mathematics time management."
                          className="w-full bg-[#F3EFE6] border border-[#D8D5C8] rounded-xl px-4 py-3 text-sm text-[#252923] placeholder:text-[#252923]/40 outline-none focus:border-[#34483C] focus:ring-1 focus:ring-[#34483C] transition-all resize-none font-sans"
                        />
                      </div>

                      {/* Submit Action */}
                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full py-3.5 bg-[#34483C] hover:bg-[#252923] disabled:opacity-60 disabled:cursor-not-allowed text-[#F3EFE6] button-sm uppercase tracking-wider rounded-xl transition-all shadow-soft-sm flex items-center justify-center gap-2"
                      >
                        {submitting ? (
                          <>
                            <SpinnerGap className="w-4 h-4 animate-spin text-[#F3EFE6]" weight="bold" />
                            <span>Transmitting Enquiry...</span>
                          </>
                        ) : (
                          <>
                            <PaperPlaneRight className="w-4 h-4 text-[#F3EFE6]" weight="bold" />
                            <span>Submit Admission Enquiry</span>
                          </>
                        )}
                      </button>

                      {/* Privacy Disclaimer */}
                      <p className="caption-3 text-[#252923]/60 text-center leading-relaxed font-sans pt-1">
                        By submitting this form, you acknowledge that your information will be used to respond to your enquiry. Review our{" "}
                        <Link href="/privacy" className="text-[#34483C] underline hover:text-[#252923] transition-colors">
                          Privacy Policy
                        </Link>
                        .
                      </p>
                    </form>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
