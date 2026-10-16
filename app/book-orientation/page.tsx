"use client";

import React, { useState } from "react";
import { Calendar, CheckCircle2, Shield, Phone, MessageCircle, Send, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";

export default function BookOrientationPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState<"student" | "parent">("student");
  const [program, setProgram] = useState("defense");
  const [preferredSlot, setPreferredSlot] = useState("evening");
  const [submitted, setSubmitted] = useState(false);
  const [enquiryRef, setEnquiryRef] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [waLink, setWaLink] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    setIsSubmitting(true);

    let assignedId = "";
    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim(),
          program,
          source: "orientation_modal",
          message: `Category: ${userType === "parent" ? "Parent" : "Student"}. Preferred Slot: ${preferredSlot.toUpperCase()}. Target: ${program.toUpperCase()}.`,
        }),
      });

      const data = await res.json();
      if (data.enquiryId) {
        assignedId = data.enquiryId;
        setEnquiryRef(data.enquiryId);
      }
    } catch (err) {
      console.error("Failed to register orientation enquiry:", err);
    } finally {
      setIsSubmitting(false);
    }

    const message = encodeURIComponent(
      `Hello Officium Supremum Admissions,\n\nI want to book an Orientation Assessment.\n\n• Name: ${name.trim()}\n• Category: ${userType === "parent" ? "Parent" : "Student / Aspirant"}\n• Program: ${program.toUpperCase()}\n• Preferred Time: ${preferredSlot.toUpperCase()}\n• Contact: ${phone.trim()}\n• Email: ${email.trim() || "Not specified"}${assignedId ? `\n• Booking Ref: ${assignedId}` : ""}\n\nPlease confirm my slot.`
    );

    const waUrl = `https://wa.me/918969634656?text=${message}`;
    setWaLink(waUrl);

    try {
      window.open(waUrl, "_blank");
    } catch (err) {
      console.error("Popup blocked:", err);
    }

    setSubmitted(true);
  };

  return (
    <div className="bg-[#FAFAF9] text-[#0F172A] min-h-screen py-16 sm:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-slate-200/80 shadow-soft-sm text-xs font-label uppercase tracking-widest text-[#C8A84E]">
            <Calendar className="w-3.5 h-3.5 text-[#C8A84E]" />
            <span>Admissions Diagnostic Session</span>
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#0B192C]">
            Book Your 20-Minute Orientation Call
          </h1>

          <p className="text-sm sm:text-base text-slate-600 font-sans max-w-xl mx-auto leading-relaxed">
            Every student undergoes a readiness and discipline diagnostic assessment before admission to ensure alignment with academy standards.
          </p>
        </div>

        <div className="p-7 sm:p-10 rounded-3xl bg-white/95 backdrop-blur-xl border border-slate-200/80 shadow-[0_25px_60px_-15px_rgba(15,23,42,0.08)] relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#C8A84E] via-amber-300 to-[#C8A84E]" />

          {submitted ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mx-auto shadow-sm">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h3 className="font-heading font-semibold text-2xl text-[#0B192C]">Slot Requested Successfully</h3>
              
              {enquiryRef && (
                <div className="inline-block px-4 py-1.5 rounded-lg bg-amber-50 border border-amber-200/70 font-mono text-xs font-semibold text-amber-900">
                  Diagnostic Booking Ref: {enquiryRef}
                </div>
              )}

              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Your orientation request has been routed to our admissions desk (+91 8969634656). A senior mentor will review your profile and connect with you to confirm the time slot.
              </p>

              {waLink && (
                <div className="pt-2 max-w-sm mx-auto">
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full py-3.5 bg-[#25D366] hover:bg-[#20ba5a] text-white font-label font-bold text-xs uppercase tracking-widest rounded-xl shadow-md transition-all active:scale-98"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Open in WhatsApp Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}

              <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-[#0B192C] font-label font-bold text-xs uppercase tracking-widest rounded-xl transition-all"
                >
                  Submit Another Request
                </button>
                <Link
                  href="/"
                  className="px-6 py-2.5 bg-[#0B192C] text-white hover:bg-[#1E293B] font-label font-bold text-xs uppercase tracking-widest rounded-xl transition-all"
                >
                  Return to Home
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* User Type Selector */}
              <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100 rounded-xl text-xs font-label uppercase tracking-wider">
                <button
                  type="button"
                  onClick={() => setUserType("student")}
                  className={`py-2.5 rounded-lg transition-all ${
                    userType === "student"
                      ? "bg-white text-[#0B192C] font-bold shadow-sm"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  I am the Student
                </button>
                <button
                  type="button"
                  onClick={() => setUserType("parent")}
                  className={`py-2.5 rounded-lg transition-all ${
                    userType === "parent"
                      ? "bg-white text-[#0B192C] font-bold shadow-sm"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  I am a Parent
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-label uppercase tracking-wider text-slate-600 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Cadet Rohan / Major Sharma"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-[#0F172A] placeholder:text-slate-400 outline-none focus:border-[#C8A84E] focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-label uppercase tracking-wider text-slate-600 mb-1">
                    WhatsApp / Contact Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 8969634656"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-[#0F172A] placeholder:text-slate-400 outline-none focus:border-[#C8A84E] focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-label uppercase tracking-wider text-slate-600 mb-1">
                    Target Program Track
                  </label>
                  <select
                    value={program}
                    onChange={(e) => setProgram(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-[#0F172A] outline-none focus:border-[#C8A84E] focus:bg-white transition-all"
                  >
                    <option value="defense">Defense Leadership (NDA / CDS / AFCAT)</option>
                    <option value="nda">NDA (National Defence Academy)</option>
                    <option value="cds">CDS (Combined Defence Services)</option>
                    <option value="afcat">AFCAT (Air Force Common Admission)</option>
                    <option value="juniors">Juniors Program (Class 7–10)</option>
                    <option value="scholars">Scholars Program (Class 11–12)</option>
                    <option value="general">General Academy Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-label uppercase tracking-wider text-slate-600 mb-1">
                    Preferred Time Slot
                  </label>
                  <select
                    value={preferredSlot}
                    onChange={(e) => setPreferredSlot(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-[#0F172A] outline-none focus:border-[#C8A84E] focus:bg-white transition-all"
                  >
                    <option value="morning">Morning (10:00 AM – 1:00 PM)</option>
                    <option value="afternoon">Afternoon (2:00 PM – 5:00 PM)</option>
                    <option value="evening">Evening (6:00 PM – 9:00 PM)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-label uppercase tracking-wider text-slate-600 mb-1">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-[#0F172A] placeholder:text-slate-400 outline-none focus:border-[#C8A84E] focus:bg-white transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-[#0B192C] hover:bg-[#1E293B] disabled:opacity-70 text-white font-label font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-[#C8A84E]" />
                    <span>Transmitting Request...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-[#C8A84E]" />
                    <span>Confirm &amp; Transmit to Admissions Desk</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
