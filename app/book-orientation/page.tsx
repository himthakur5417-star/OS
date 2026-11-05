"use client";

import React, { useState, useEffect } from "react";
import { Calendar, CheckCircle2, Shield, Phone, MessageCircle, Send, ArrowRight, Loader2, Lock } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/components/AuthContext";

export default function BookOrientationPage() {
  const { user, requireAuth } = useAuth();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState<"student" | "parent">("student");
  const [program, setProgram] = useState("defence");
  const [preferredSlot, setPreferredSlot] = useState("evening");
  const [submitted, setSubmitted] = useState(false);
  const [enquiryRef, setEnquiryRef] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [waLink, setWaLink] = useState("");

  useEffect(() => {
    if (user) {
      if (!name && user.displayName) setName(user.displayName);
      if (!email && user.email) setEmail(user.email);
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Verify user is authenticated first
    if (!requireAuth()) {
      return;
    }

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
          source: "orientation_page",
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
    <div className="bg-[#211C1D] text-[#E8DCC6] min-h-screen relative overflow-hidden selection:bg-[#722F37] selection:text-[#E8DCC6] py-16 sm:py-24">

      {/* Subtle Ambient Radial Accents */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[min(600px,100vw)] h-[min(600px,100vw)] bg-[#722F37]/15 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 left-0 w-[min(450px,100vw)] h-[min(450px,100vw)] bg-[#B7A89A]/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header Briefing */}
        <div className="text-center space-y-4 mb-10">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#E8DCC6]/10 border border-[#E8DCC6]/20 shadow-sm">
            <Calendar className="w-3.5 h-3.5 text-[#E8DCC6]" />
            <span className="font-label text-xs uppercase tracking-[0.2em] text-[#E8DCC6] font-semibold">
              Free Mentorship Consultation • 1-on-1 Guidance
            </span>
          </div>

          <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#E8DCC6] leading-[1.08]">
            Book a Free 20-Minute <br />
            <span className="text-[#E8DCC6] italic font-normal">
              Guidance Call.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-[#E8DCC6]/80 font-sans max-w-xl mx-auto leading-relaxed">
            Speak directly with an Officium Supremum mentor to discuss your goals, daily study routine, and structured academic preparation plan.
          </p>
        </div>

        {/* Form Container Card */}
        <div className="p-7 sm:p-10 rounded-3xl bg-[#282224] border border-[#E8DCC6]/15 shadow-soft-md relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#722F37] via-[#B7A89A] to-[#722F37]" />

          {submitted ? (
            <div className="text-center py-10 space-y-5">
              <div className="w-16 h-16 rounded-2xl bg-[#722F37]/25 border border-[#722F37]/50 flex items-center justify-center text-[#E8DCC6] mx-auto shadow-sm">
                <CheckCircle2 className="w-9 h-9 text-[#E8DCC6]" />
              </div>

              <h2 className="font-heading font-semibold text-2xl sm:text-3xl text-[#E8DCC6]">
                Call Request Received
              </h2>

              {enquiryRef && (
                <div className="inline-block px-4 py-1.5 rounded-lg bg-[#211C1D] border border-[#E8DCC6]/20 font-mono text-xs font-semibold text-[#E8DCC6]">
                  Booking Reference: {enquiryRef}
                </div>
              )}

              <p className="text-xs sm:text-sm text-[#E8DCC6]/80 max-w-md mx-auto leading-relaxed font-sans">
                We have received your request. An Officium Supremum mentor will review your details and confirm your call slot within 6 hours.
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
                    <span>Chat with Us on WhatsApp Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => setSubmitted(false)}
                  className="w-full sm:w-auto px-6 py-3 bg-[#211C1D] hover:bg-[#282224] border border-[#E8DCC6]/20 text-[#E8DCC6] font-label font-bold text-xs uppercase tracking-widest rounded-xl transition-all"
                >
                  Submit Another Request
                </button>
                <Link
                  href="/"
                  className="w-full sm:w-auto px-6 py-3 bg-[#722F37] hover:bg-[#853741] text-[#E8DCC6] font-label font-bold text-xs uppercase tracking-widest rounded-xl transition-all border border-[#E8DCC6]/20"
                >
                  Return to Home
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* User Type Selector */}
              <div className="grid grid-cols-2 gap-1.5 p-1.5 bg-[#211C1D] rounded-2xl border border-[#E8DCC6]/15 text-xs font-label uppercase tracking-wider">
                <button
                  type="button"
                  onClick={() => setUserType("student")}
                  className={`py-3 rounded-xl transition-all ${
                    userType === "student"
                      ? "bg-[#722F37] text-[#E8DCC6] font-bold shadow-md border border-[#E8DCC6]/20"
                      : "text-[#B7A89A] hover:text-[#E8DCC6]"
                  }`}
                >
                  I am the Student
                </button>
                <button
                  type="button"
                  onClick={() => setUserType("parent")}
                  className={`py-3 rounded-xl transition-all ${
                    userType === "parent"
                      ? "bg-[#722F37] text-[#E8DCC6] font-bold shadow-md border border-[#E8DCC6]/20"
                      : "text-[#B7A89A] hover:text-[#E8DCC6]"
                  }`}
                >
                  I am a Parent
                </button>
              </div>

              {/* Full Name & Phone Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-label uppercase tracking-widest text-[#B7A89A] mb-1.5 font-semibold">
                    Full Name <span className="text-[#722F37]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full bg-[#211C1D] border border-[#E8DCC6]/20 rounded-xl px-4 py-3 text-sm text-[#E8DCC6] placeholder:text-[#B7A89A]/40 outline-none focus:border-[#722F37] focus:ring-1 focus:ring-[#722F37] transition-all font-sans"
                  />
                </div>

                <div>
                  <label className="block text-xs font-label uppercase tracking-widest text-[#B7A89A] mb-1.5 font-semibold">
                    WhatsApp / Contact Number <span className="text-[#722F37]">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full bg-[#211C1D] border border-[#E8DCC6]/20 rounded-xl px-4 py-3 text-sm text-[#E8DCC6] placeholder:text-[#B7A89A]/40 outline-none focus:border-[#722F37] focus:ring-1 focus:ring-[#722F37] transition-all font-sans"
                  />
                </div>
              </div>

              {/* Target Program & Preferred Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-label uppercase tracking-widest text-[#B7A89A] mb-1.5 font-semibold">
                    Target Program Track
                  </label>
                  <select
                    value={program}
                    onChange={(e) => setProgram(e.target.value)}
                    className="w-full bg-[#211C1D] border border-[#E8DCC6]/20 rounded-xl px-4 py-3 text-xs text-[#E8DCC6] outline-none focus:border-[#722F37] focus:ring-1 focus:ring-[#722F37] transition-all font-sans"
                  >
                    <option value="defence" className="bg-[#211C1D] text-[#E8DCC6]">Defence Leadership (NDA / CDS / AFCAT)</option>
                    <option value="nda" className="bg-[#211C1D] text-[#E8DCC6]">NDA (National Defence Academy)</option>
                    <option value="cds" className="bg-[#211C1D] text-[#E8DCC6]">CDS (Combined Defence Services)</option>
                    <option value="afcat" className="bg-[#211C1D] text-[#E8DCC6]">AFCAT (Air Force Common Admission)</option>
                    <option value="juniors" className="bg-[#211C1D] text-[#E8DCC6]">Juniors Program (Class 7–10)</option>
                    <option value="scholars" className="bg-[#211C1D] text-[#E8DCC6]">Scholars Program (Class 11–12)</option>
                    <option value="general" className="bg-[#211C1D] text-[#E8DCC6]">General Guidance &amp; Consultation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-label uppercase tracking-widest text-[#B7A89A] mb-1.5 font-semibold">
                    Preferred Time Slot
                  </label>
                  <select
                    value={preferredSlot}
                    onChange={(e) => setPreferredSlot(e.target.value)}
                    className="w-full bg-[#211C1D] border border-[#E8DCC6]/20 rounded-xl px-4 py-3 text-xs text-[#E8DCC6] outline-none focus:border-[#722F37] focus:ring-1 focus:ring-[#722F37] transition-all font-sans"
                  >
                    <option value="morning" className="bg-[#211C1D] text-[#E8DCC6]">Morning (10:00 AM – 1:00 PM)</option>
                    <option value="afternoon" className="bg-[#211C1D] text-[#E8DCC6]">Afternoon (2:00 PM – 5:00 PM)</option>
                    <option value="evening" className="bg-[#211C1D] text-[#E8DCC6]">Evening (6:00 PM – 9:00 PM)</option>
                  </select>
                </div>
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs font-label uppercase tracking-widest text-[#B7A89A] mb-1.5 font-semibold">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@example.com"
                  className="w-full bg-[#211C1D] border border-[#E8DCC6]/20 rounded-xl px-4 py-3 text-sm text-[#E8DCC6] placeholder:text-[#B7A89A]/40 outline-none focus:border-[#722F37] focus:ring-1 focus:ring-[#722F37] transition-all font-sans"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-[#722F37] hover:bg-[#853741] disabled:opacity-60 text-[#E8DCC6] font-label font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg hover:shadow-xl active:scale-98 flex items-center justify-center gap-2 border border-[#E8DCC6]/20 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-[#E8DCC6]" />
                    <span>Sending Request...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-[#E8DCC6]" />
                    <span>Confirm &amp; Book Free Call</span>
                  </>
                )}
              </button>

              {/* Privacy Acknowledgement */}
              <p className="text-[11px] text-[#B7A89A] text-center leading-relaxed font-sans pt-1">
                By submitting this form, you acknowledge that your information will be used to respond to your enquiry and arrange mentorship-related communication. Please review our{" "}
                <Link href="/privacy" className="text-[#E8DCC6] underline hover:text-white transition-colors">
                  Privacy Policy
                </Link>
                .
              </p>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
