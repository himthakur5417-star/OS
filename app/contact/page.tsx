"use client";

import React, { useState } from "react";
import { Phone, Mail, MapPin, Send, MessageSquare, CheckCircle2, Shield } from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [program, setProgram] = useState("defense");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [enquiryRef, setEnquiryRef] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    setSubmitting(true);

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          email,
          program,
          source: "contact_page",
          message,
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
    <div className="bg-[#FAFAF9] text-[#0F172A] min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-16 pb-6 lg:pt-24 lg:pb-8 bg-gradient-to-b from-white via-[#FAF7F2]/60 to-[#FAFAF9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-slate-200/80 shadow-soft-sm text-xs font-label uppercase tracking-widest text-[#C8A84E]">
            <Shield className="w-3.5 h-3.5 text-[#C8A84E]" />
            <span>Admissions &amp; Orientation</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-semibold tracking-tight text-[#0B192C] leading-tight">
            Connect with the Mentorship Desk
          </h1>
          <p className="text-sm sm:text-base text-slate-600 font-sans leading-relaxed max-w-xl mx-auto">
            Whether you are an aspirant ready to commit to academy discipline or a parent exploring the right track for your child, our admissions desk is available daily.
          </p>
        </div>
      </section>

      {/* Content Grid */}
      <section className="relative py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            
            {/* Left Info Cards */}
            <div className="lg:col-span-5 space-y-5">
              <a
                href="https://wa.me/918969634656"
                target="_blank"
                rel="noreferrer"
                className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-soft-sm hover:shadow-soft-md hover:border-emerald-300/60 transition-all flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200/60 flex items-center justify-center text-emerald-600 shrink-0 group-hover:scale-105 transition-transform">
                  <Phone className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <div className="font-label uppercase text-[11px] text-slate-500 tracking-wider">Admissions &amp; WhatsApp</div>
                  <div className="font-heading font-medium text-[#0B192C] text-base">+91 8969634656</div>
                </div>
              </a>

              <a
                href="mailto:osupremum@gmail.com"
                className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-soft-sm hover:shadow-soft-md hover:border-[#C8A84E]/40 transition-all flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200/60 flex items-center justify-center text-[#C8A84E] shrink-0 group-hover:scale-105 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-label uppercase text-[11px] text-slate-500 tracking-wider">Direct Enquiries</div>
                  <div className="font-heading font-medium text-[#0B192C] text-base">osupremum@gmail.com</div>
                </div>
              </a>

              <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-soft-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-200/60 flex items-center justify-center text-sky-600 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-label uppercase text-[11px] text-slate-500 tracking-wider">Mode of Instruction</div>
                  <div className="font-heading font-medium text-[#0B192C] text-base">Online Live Mentorship &amp; Diagnostic Centers</div>
                </div>
              </div>

              {/* Trust Signal */}
              <div className="p-4 rounded-xl bg-[#FAF7F2] border border-amber-200/40 text-center">
                <p className="font-heading italic text-sm text-slate-700">
                  &quot;We respond within 4 business hours. Every inquiry receives a personalized assessment.&quot;
                </p>
              </div>
            </div>

            {/* Right Form */}
            <div className="lg:col-span-7">
              <div className="p-8 sm:p-10 rounded-2xl bg-white border border-slate-200/80 shadow-soft-md">
                {sent ? (
                  <div className="text-center py-12 space-y-4">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mx-auto shadow-sm">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="font-heading font-semibold text-2xl text-[#0B192C]">Inquiry Successfully Recorded</h3>
                    {enquiryRef && (
                      <div className="inline-block px-3 py-1 rounded-md bg-amber-50 border border-amber-200/60 font-mono text-xs font-semibold text-amber-900">
                        Lead Reference: {enquiryRef}
                      </div>
                    )}
                    <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                      Your inquiry has been stored in our admissions database. An academy mentor will review your target track and contact you within 4 business hours.
                    </p>
                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                      <a
                        href={`https://wa.me/918969634656?text=${encodeURIComponent(
                          `Hello Officium Supremum, I submitted inquiry ${enquiryRef || ""} for the ${program.toUpperCase()} track.`
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-label font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-sm flex items-center gap-2"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>Chat Instantly on WhatsApp</span>
                      </a>
                      <button
                        onClick={() => setSent(false)}
                        className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-label font-bold text-xs uppercase tracking-wider rounded-xl transition-colors"
                      >
                        Submit Another Inquiry
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h3 className="font-heading font-semibold text-2xl text-[#0B192C] mb-2">
                      Send an Admission Inquiry
                    </h3>
                    <p className="text-xs text-slate-500 font-sans mb-8">
                      Fill in your details below and we will prepare your personalized assessment slot.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div>
                        <label className="block text-xs font-label uppercase tracking-wider text-slate-600 mb-1.5">
                          Full Name:
                        </label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Your Name / Cadet Name"
                          className="w-full bg-[#FAFAF9] border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-[#0B192C] placeholder:text-slate-400 outline-none focus:border-[#C8A84E] focus:ring-2 focus:ring-[#C8A84E]/10 transition-all"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-xs font-label uppercase tracking-wider text-slate-600 mb-1.5">
                            Phone Number / WhatsApp:
                          </label>
                          <input
                            type="tel"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+91 8969634656"
                            className="w-full bg-[#FAFAF9] border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-[#0B192C] placeholder:text-slate-400 outline-none focus:border-[#C8A84E] focus:ring-2 focus:ring-[#C8A84E]/10 transition-all"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-label uppercase tracking-wider text-slate-600 mb-1.5">
                            Target Track:
                          </label>
                          <select
                            value={program}
                            onChange={(e) => setProgram(e.target.value)}
                            className="w-full bg-[#FAFAF9] border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-[#0B192C] outline-none focus:border-[#C8A84E] focus:ring-2 focus:ring-[#C8A84E]/10 transition-all"
                          >
                            <option value="defense">Defense Leadership (NDA/CDS/AFCAT)</option>
                            <option value="juniors">Juniors Program (Class 7-10)</option>
                            <option value="scholars">Scholars Program (Class 11-12)</option>
                            <option value="materials">Study Materials &amp; Vault Access</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-label uppercase tracking-wider text-slate-600 mb-1.5">
                          Email Address:
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="cadet@example.com"
                          className="w-full bg-[#FAFAF9] border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-[#0B192C] placeholder:text-slate-400 outline-none focus:border-[#C8A84E] focus:ring-2 focus:ring-[#C8A84E]/10 transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-label uppercase tracking-wider text-slate-600 mb-1.5">
                          Brief Background &amp; Current Stage:
                        </label>
                        <textarea
                          rows={3}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="e.g. Currently in Class 12 preparing for NDA 2025; struggling with Mathematics time management."
                          className="w-full bg-[#FAFAF9] border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-[#0B192C] placeholder:text-slate-400 outline-none focus:border-[#C8A84E] focus:ring-2 focus:ring-[#C8A84E]/10 transition-all resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-4 bg-[#0B192C] hover:bg-[#1E293B] text-white font-label font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 active:scale-[0.98]"
                      >
                        <Send className="w-4 h-4" />
                        <span>Submit Inquiry to Admissions</span>
                      </button>
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
