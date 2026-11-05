"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, Send, CheckCircle2, Shield, ArrowUpRight, Clock, Video, ShieldCheck, Loader2 } from "lucide-react";

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
    <div className="bg-[#211C1D] text-[#E8DCC6] min-h-screen relative overflow-x-hidden selection:bg-[#722F37] selection:text-[#FAF7F2]">
      {/* Tactile Parchment Grain Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(#E8DCC6 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
        aria-hidden="true"
      />

      {/* Subtle Ambient Burgundy Glow */}
      <div className="absolute top-0 left-0 right-0 h-[360px] overflow-hidden pointer-events-none -z-0" aria-hidden="true">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[680px] h-[340px] bg-[#722F37]/10 blur-[130px] rounded-full" />
      </div>

      {/* Hero Header Section */}
      <section className="relative pt-20 pb-10 sm:pt-24 sm:pb-12 lg:pt-28 lg:pb-14 border-b border-[#E8DCC6]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#282224]/80 backdrop-blur-md border border-[#E8DCC6]/20 shadow-sm text-xs font-['Oswald',sans-serif] uppercase tracking-[0.2em] text-[#E8DCC6]">
            <Shield className="w-3.5 h-3.5 text-[#B7A89A]" />
            <span>Admissions &amp; Mentorship Desk</span>
          </div>

          <h1 className="font-['Fraunces',serif] text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[#FAF7F2] leading-tight">
            Get in Touch with Our Mentors
          </h1>

          <p className="text-sm sm:text-base text-[#B7A89A] font-['Inter',sans-serif] font-light leading-relaxed max-w-2xl mx-auto">
            Whether you are a student preparing for competitive examinations or a parent seeking disciplined academic guidance for your child, our mentorship team is directly accessible.
          </p>

          {/* Quick Institutional Highlights */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs text-[#B7A89A] font-['Inter',sans-serif]">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#282224]/50 border border-[#E8DCC6]/10">
              <Clock className="w-3.5 h-3.5 text-[#E8DCC6]" />
              <span>Response within 6 hours</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#282224]/50 border border-[#E8DCC6]/10">
              <Video className="w-3.5 h-3.5 text-[#E8DCC6]" />
              <span>Live 1-on-1 Online Mentorship</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#282224]/50 border border-[#E8DCC6]/10">
              <ShieldCheck className="w-3.5 h-3.5 text-[#E8DCC6]" />
              <span>Verified Direct Desk Access</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="relative py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">

            {/* Left Column: Direct Communication Channels & Academy Profile */}
            <div className="lg:col-span-5 space-y-5">
              <div className="space-y-1">
                <h2 className="font-['Oswald',sans-serif] text-xs uppercase tracking-[0.2em] text-[#B7A89A]">
                  Verified Channels
                </h2>
                <p className="font-['Fraunces',serif] text-xl font-light text-[#FAF7F2]">
                  Direct Mentor Access
                </p>
              </div>

              {/* Admissions & WhatsApp Card */}
              <a
                href="https://wa.me/918969634656"
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 sm:p-6 rounded-2xl bg-[#282224] border border-[#E8DCC6]/15 hover:border-[#722F37]/70 hover:bg-[#282224]/95 transition-all duration-300 flex items-start gap-4 group shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8DCC6]"
              >
                <div className="w-12 h-12 rounded-xl bg-[#211C1D] border border-[#E8DCC6]/15 flex items-center justify-center text-[#E8DCC6] shrink-0 group-hover:text-[#FAF7F2] group-hover:border-[#722F37] transition-all">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-['Oswald',sans-serif] uppercase text-[11px] text-[#B7A89A] tracking-wider">
                    Admissions &amp; WhatsApp
                  </div>
                  <div className="font-['Fraunces',serif] font-normal text-lg sm:text-xl text-[#FAF7F2] group-hover:text-[#E8DCC6] transition-colors truncate">
                    +91 8969634656
                  </div>
                  <p className="text-xs text-[#B7A89A]/80 font-['Inter',sans-serif] font-light mt-0.5">
                    Fastest response for urgent admissions &amp; orientation queries
                  </p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#B7A89A] group-hover:text-[#FAF7F2] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 self-center" />
              </a>

              {/* Email Us Card */}
              <a
                href="mailto:osupremum@gmail.com"
                className="p-5 sm:p-6 rounded-2xl bg-[#282224] border border-[#E8DCC6]/15 hover:border-[#722F37]/70 hover:bg-[#282224]/95 transition-all duration-300 flex items-start gap-4 group shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8DCC6]"
              >
                <div className="w-12 h-12 rounded-xl bg-[#211C1D] border border-[#E8DCC6]/15 flex items-center justify-center text-[#E8DCC6] shrink-0 group-hover:text-[#FAF7F2] group-hover:border-[#722F37] transition-all">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-['Oswald',sans-serif] uppercase text-[11px] text-[#B7A89A] tracking-wider">
                    Email Us
                  </div>
                  <div className="font-['Fraunces',serif] font-normal text-base sm:text-lg text-[#FAF7F2] group-hover:text-[#E8DCC6] transition-colors break-all">
                    osupremum@gmail.com
                  </div>
                  <p className="text-xs text-[#B7A89A]/80 font-['Inter',sans-serif] font-light mt-0.5">
                    For formal academic correspondence and syllabus requests
                  </p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#B7A89A] group-hover:text-[#FAF7F2] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 self-center" />
              </a>

              {/* Mode of Learning Card */}
              <div className="p-5 sm:p-6 rounded-2xl bg-[#282224] border border-[#E8DCC6]/15 flex items-start gap-4 shadow-md">
                <div className="w-12 h-12 rounded-xl bg-[#211C1D] border border-[#E8DCC6]/15 flex items-center justify-center text-[#E8DCC6] shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-['Oswald',sans-serif] uppercase text-[11px] text-[#B7A89A] tracking-wider">
                    Mode of Learning
                  </div>
                  <div className="font-['Fraunces',serif] font-normal text-lg sm:text-xl text-[#FAF7F2]">
                    Live Online Mentorship
                  </div>
                  <p className="text-xs text-[#B7A89A]/80 font-['Inter',sans-serif] font-light mt-0.5">
                    Disciplined 1-on-1 daily guidance accessible nationwide across India
                  </p>
                </div>
              </div>

              {/* Trust Signal / Academy Guarantee */}
              <div className="p-5 rounded-2xl bg-[#282224]/60 border border-[#E8DCC6]/10 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#722F37] to-transparent" />
                <p className="font-['Fraunces',serif] italic text-sm text-[#E8DCC6] leading-relaxed">
                  &ldquo;We respond within 6 hours. Every enquiry receives personal guidance.&rdquo;
                </p>
                <span className="font-['Oswald',sans-serif] uppercase text-[10px] tracking-[0.2em] text-[#B7A89A] mt-2 block">
                  Institutional Mentorship Guarantee
                </span>
              </div>

              {/* Fast Option: Book Orientation Call Link */}
              <div className="p-5 rounded-2xl bg-[#211C1D] border border-[#722F37]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="font-['Oswald',sans-serif] uppercase text-[11px] tracking-wider text-[#FAF7F2]">
                    Prefer a Scheduled Consultation?
                  </div>
                  <p className="text-xs text-[#B7A89A] font-['Inter',sans-serif] mt-0.5">
                    Book a free 20-minute 1-on-1 strategy call with our lead mentor.
                  </p>
                </div>
                <Link
                  href="/book-orientation"
                  className="px-4 py-2.5 rounded-xl bg-[#722F37] hover:bg-[#8B3A44] text-[#FAF7F2] font-['Oswald',sans-serif] uppercase tracking-wider text-xs transition-colors shrink-0 flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8DCC6]"
                >
                  <span>Book Call</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Right Column: Admission Enquiry Form */}
            <div className="lg:col-span-7">
              <div className="p-6 sm:p-10 rounded-2xl bg-[#282224] border border-[#E8DCC6]/15 shadow-2xl relative overflow-hidden">
                {/* Decorative Top Accent Bar */}
                <div
                  className="h-1 w-full bg-gradient-to-r from-[#722F37] via-[#B7A89A] to-[#722F37] absolute top-0 left-0"
                  aria-hidden="true"
                />

                {sent ? (
                  <div className="text-center py-10 sm:py-12 space-y-5">
                    <div className="w-16 h-16 rounded-2xl bg-[#722F37]/20 border border-[#722F37]/50 flex items-center justify-center text-[#E8DCC6] mx-auto shadow-sm">
                      <CheckCircle2 className="w-9 h-9" />
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-['Fraunces',serif] font-light text-2xl sm:text-3xl text-[#FAF7F2]">
                        Enquiry Successfully Received
                      </h3>
                      <p className="text-xs sm:text-sm text-[#B7A89A] max-w-md mx-auto leading-relaxed font-['Inter',sans-serif] font-light">
                        Your details have been securely recorded. An Officium Supremum mentor will review your target program and reach out within 6 hours.
                      </p>
                    </div>

                    {enquiryRef && (
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#211C1D] border border-[#E8DCC6]/20 font-mono text-xs text-[#E8DCC6]">
                        <span className="text-[#B7A89A] font-['Oswald',sans-serif] uppercase tracking-wider text-[11px]">
                          Enquiry Reference:
                        </span>
                        <span className="font-semibold text-[#FAF7F2]">{enquiryRef}</span>
                      </div>
                    )}

                    <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
                      <a
                        href={`https://wa.me/918969634656?text=${encodeURIComponent(
                          `Hello Officium Supremum, I submitted enquiry ${enquiryRef || ""} for the ${program.toUpperCase()} program.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto px-6 py-3 bg-[#722F37] hover:bg-[#8B3A44] text-[#FAF7F2] font-['Oswald',sans-serif] uppercase tracking-wider text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8DCC6]"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>Chat Instantly on WhatsApp</span>
                      </a>
                      <button
                        type="button"
                        onClick={() => {
                          setSent(false);
                          setEnquiryRef(null);
                        }}
                        className="w-full sm:w-auto px-6 py-3 bg-[#211C1D] hover:bg-[#211C1D]/80 border border-[#E8DCC6]/20 text-[#E8DCC6] font-['Oswald',sans-serif] uppercase tracking-wider text-xs rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8DCC6]"
                      >
                        Submit Another Enquiry
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="mb-8">
                      <h3 className="font-['Fraunces',serif] font-light text-2xl sm:text-3xl text-[#FAF7F2] mb-1.5">
                        Send an Admission Enquiry
                      </h3>
                      <p className="text-xs sm:text-sm text-[#B7A89A] font-['Inter',sans-serif] font-light">
                        Fill in your details below and an Officium Supremum mentor will get in touch with you.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      {/* Full Name */}
                      <div>
                        <label className="block text-xs font-['Oswald',sans-serif] uppercase tracking-wider text-[#E8DCC6] mb-1.5">
                          Full Name <span className="text-[#C18388]">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Your Name or Student's Name"
                          className="w-full bg-[#211C1D] border border-[#E8DCC6]/20 rounded-xl px-4 py-3.5 text-sm text-[#FAF7F2] placeholder:text-[#B7A89A]/50 outline-none focus:border-[#B7A89A] focus:ring-2 focus:ring-[#722F37]/50 transition-all font-sans"
                        />
                      </div>

                      {/* Phone & Program Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-xs font-['Oswald',sans-serif] uppercase tracking-wider text-[#E8DCC6] mb-1.5">
                            Phone Number / WhatsApp <span className="text-[#C18388]">*</span>
                          </label>
                          <input
                            type="tel"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+91 98765 43210"
                            className="w-full bg-[#211C1D] border border-[#E8DCC6]/20 rounded-xl px-4 py-3.5 text-sm text-[#FAF7F2] placeholder:text-[#B7A89A]/50 outline-none focus:border-[#B7A89A] focus:ring-2 focus:ring-[#722F37]/50 transition-all font-sans"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-['Oswald',sans-serif] uppercase tracking-wider text-[#E8DCC6] mb-1.5">
                            Target Program
                          </label>
                          <select
                            value={program}
                            onChange={(e) => setProgram(e.target.value)}
                            className="w-full bg-[#211C1D] border border-[#E8DCC6]/20 rounded-xl px-4 py-3.5 text-sm text-[#FAF7F2] outline-none focus:border-[#B7A89A] focus:ring-2 focus:ring-[#722F37]/50 transition-all font-sans cursor-pointer"
                          >
                            <option value="defence" className="bg-[#211C1D] text-[#FAF7F2]">Defence Leadership (NDA / CDS / AFCAT)</option>
                            <option value="juniors" className="bg-[#211C1D] text-[#FAF7F2]">Juniors Program (Class 7–10)</option>
                            <option value="scholars" className="bg-[#211C1D] text-[#FAF7F2]">Scholars Program (Class 11–12)</option>
                            <option value="materials" className="bg-[#211C1D] text-[#FAF7F2]">Study Materials &amp; Library Access</option>
                          </select>
                        </div>
                      </div>

                      {/* Email Address */}
                      <div>
                        <label className="block text-xs font-['Oswald',sans-serif] uppercase tracking-wider text-[#E8DCC6] mb-1.5">
                          Email Address <span className="text-[#B7A89A]/60 font-normal lowercase">(optional)</span>
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="student@example.com"
                          className="w-full bg-[#211C1D] border border-[#E8DCC6]/20 rounded-xl px-4 py-3.5 text-sm text-[#FAF7F2] placeholder:text-[#B7A89A]/50 outline-none focus:border-[#B7A89A] focus:ring-2 focus:ring-[#722F37]/50 transition-all font-sans"
                        />
                      </div>

                      {/* Goal / Challenge Textarea */}
                      <div>
                        <label className="block text-xs font-['Oswald',sans-serif] uppercase tracking-wider text-[#E8DCC6] mb-1.5">
                          Your Goal or Current Challenge <span className="text-[#B7A89A]/60 font-normal lowercase">(optional)</span>
                        </label>
                        <textarea
                          rows={3}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="e.g. Currently in Class 12 preparing for NDA; need help with Mathematics time management."
                          className="w-full bg-[#211C1D] border border-[#E8DCC6]/20 rounded-xl px-4 py-3.5 text-sm text-[#FAF7F2] placeholder:text-[#B7A89A]/50 outline-none focus:border-[#B7A89A] focus:ring-2 focus:ring-[#722F37]/50 transition-all resize-none font-sans"
                        />
                      </div>

                      {/* Submit Action */}
                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full py-4 bg-[#722F37] hover:bg-[#8B3A44] disabled:bg-[#722F37]/60 disabled:cursor-not-allowed text-[#FAF7F2] font-['Oswald',sans-serif] uppercase tracking-[0.2em] text-xs rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2.5 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8DCC6]"
                      >
                        {submitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin text-[#E8DCC6]" />
                            <span>Transmitting Enquiry...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 text-[#E8DCC6]" />
                            <span>Submit Admission Enquiry</span>
                          </>
                        )}
                      </button>

                      {/* Privacy Disclaimer */}
                      <p className="text-[11px] text-[#B7A89A] text-center leading-relaxed font-sans pt-1 font-light">
                        By submitting this form, you acknowledge that your information will be used to respond to your enquiry and arrange mentorship-related communication. Please review our{" "}
                        <Link href="/privacy" className="text-[#E8DCC6] underline hover:text-[#FAF7F2] transition-colors">
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
