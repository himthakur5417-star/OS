"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Calendar,
  CheckCircle,
  PaperPlaneRight,
  ArrowRight,
  WhatsappLogo,
  SpinnerGap,
  Sparkle
} from "@phosphor-icons/react";

export default function BookOrientationPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [program, setProgram] = useState("defence");
  const [preferredSlot, setPreferredSlot] = useState("morning");
  const [userType, setUserType] = useState<"student" | "parent">("student");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [enquiryRef, setEnquiryRef] = useState<string | null>(null);
  const [waLink, setWaLink] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    if (!name || !phone) return;

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim(),
          program,
          source: "orientation_booking_page",
          preferredSlot,
          userType,
        }),
      });

      const data = await res.json();
      if (data.enquiryId) {
        setEnquiryRef(data.enquiryId);
      }
    } catch (err) {
      console.error("Database save error:", err);
    } finally {
      setIsSubmitting(false);
    }

    const waMsg = `Hello Officium Supremum, I would like to book a free 20-minute guidance call.
• Name: ${name.trim()}
• I am: ${userType === "student" ? "Student" : "Parent"}
• Target: ${program.toUpperCase()}
• Preferred Time: ${preferredSlot.toUpperCase()}${
      enquiryRef ? `\n• Reference: ${enquiryRef}` : ""
    }`;

    const waUrl = `https://wa.me/918969634656?text=${encodeURIComponent(waMsg)}`;
    setWaLink(waUrl);

    try {
      window.open(waUrl, "_blank");
    } catch (err) {
      console.error("Popup blocked:", err);
    }

    setSubmitted(true);
  };

  return (
    <div className="bg-[#F3EFE6] text-[#252923] min-h-screen relative overflow-x-hidden selection:bg-[#34483C] selection:text-[#F3EFE6] py-16 sm:py-24">

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* Header Briefing */}
        <div className="text-center space-y-4 mb-10">
          <h1 className="heading-1 text-[#252923] text-balance">
            Book a Free 20-Minute Guidance Call.
          </h1>

          <p className="body-2 text-[#252923]/75 max-w-xl mx-auto text-pretty">
            Speak directly with an Officium Supremum mentor to discuss your goals, daily study routine, and structured academic preparation plan.
          </p>
        </div>

        {/* Form Container Card */}
        <div className="p-7 sm:p-10 rounded-2xl bg-white border border-[#D8D5C8] shadow-soft-md relative">

          {submitted ? (
            <div className="text-center py-10 space-y-5">
              <div className="w-14 h-14 rounded-2xl bg-[#34483C]/10 border border-[#34483C]/30 flex items-center justify-center text-[#34483C] mx-auto shadow-soft-sm">
                <CheckCircle className="w-8 h-8" weight="fill" />
              </div>

              <h2 className="heading-2 text-[#252923]">
                Call Request Received
              </h2>

              {enquiryRef && (
                <div className="inline-block px-4 py-1.5 rounded-xl bg-[#F3EFE6] border border-[#D8D5C8] font-mono text-xs font-semibold text-[#34483C]">
                  Booking Reference: {enquiryRef}
                </div>
              )}

              <p className="body-3 text-[#252923]/75 max-w-md mx-auto leading-relaxed">
                We have received your request. An Officium Supremum mentor will review your details and confirm your call slot within 6 hours.
              </p>

              {waLink && (
                <div className="pt-2 max-w-sm mx-auto">
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full py-3.5 bg-[#34483C] hover:bg-[#252923] text-[#F3EFE6] button-sm uppercase tracking-wider rounded-xl shadow-soft-sm transition-all"
                  >
                    <WhatsappLogo className="w-4 h-4" weight="bold" />
                    <span>Chat with Us on WhatsApp Now</span>
                    <ArrowRight className="w-3.5 h-3.5" weight="bold" />
                  </a>
                </div>
              )}

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => setSubmitted(false)}
                  className="w-full sm:w-auto px-6 py-3 bg-[#F3EFE6] hover:bg-[#D8D5C8]/40 border border-[#D8D5C8] text-[#252923] button-sm uppercase tracking-wider rounded-xl transition-all"
                >
                  Submit Another Request
                </button>
                <Link
                  href="/"
                  className="w-full sm:w-auto px-6 py-3 bg-[#34483C] hover:bg-[#252923] text-[#F3EFE6] button-sm uppercase tracking-wider rounded-xl transition-all"
                >
                  Return to Home
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* User Type Selector */}
              <div className="grid grid-cols-2 gap-1.5 p-1.5 bg-[#F3EFE6] rounded-xl border border-[#D8D5C8] caption-3 uppercase tracking-wider">
                <button
                  type="button"
                  onClick={() => setUserType("student")}
                  className={`py-2.5 rounded-lg transition-all font-semibold ${
                    userType === "student"
                      ? "bg-[#34483C] text-[#F3EFE6] shadow-soft-sm"
                      : "text-[#252923]/70 hover:text-[#252923]"
                  }`}
                >
                  I am the Student
                </button>
                <button
                  type="button"
                  onClick={() => setUserType("parent")}
                  className={`py-2.5 rounded-lg transition-all font-semibold ${
                    userType === "parent"
                      ? "bg-[#34483C] text-[#F3EFE6] shadow-soft-sm"
                      : "text-[#252923]/70 hover:text-[#252923]"
                  }`}
                >
                  I am a Parent
                </button>
              </div>

              {/* Full Name & Phone Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block caption-3 uppercase tracking-wider text-[#252923] font-semibold mb-1">
                    Full Name <span className="text-[#B18A58]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full bg-[#F3EFE6] border border-[#D8D5C8] rounded-xl px-4 py-3 text-sm text-[#252923] placeholder:text-[#252923]/40 outline-none focus:border-[#34483C] focus:ring-1 focus:ring-[#34483C] transition-all font-sans"
                  />
                </div>

                <div>
                  <label className="block caption-3 uppercase tracking-wider text-[#252923] font-semibold mb-1">
                    WhatsApp / Contact Number <span className="text-[#B18A58]">*</span>
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
              </div>

              {/* Target Program & Preferred Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block caption-3 uppercase tracking-wider text-[#252923] font-semibold mb-1">
                    Target Program Track
                  </label>
                  <select
                    value={program}
                    onChange={(e) => setProgram(e.target.value)}
                    className="w-full bg-[#F3EFE6] border border-[#D8D5C8] rounded-xl px-4 py-3 text-sm text-[#252923] outline-none focus:border-[#34483C] focus:ring-1 focus:ring-[#34483C] transition-all font-sans cursor-pointer"
                  >
                    <option value="defence">Defence Track (NDA / CDS / AFCAT)</option>
                    <option value="nda">NDA (National Defence Academy)</option>
                    <option value="cds">CDS (Combined Defence Services)</option>
                    <option value="afcat">AFCAT (Air Force Common Admission)</option>
                    <option value="juniors">Juniors Track (Class 7–10)</option>
                    <option value="scholars">Scholars Track (Class 11–12)</option>
                    <option value="general">General Consultation</option>
                  </select>
                </div>

                <div>
                  <label className="block caption-3 uppercase tracking-wider text-[#252923] font-semibold mb-1">
                    Preferred Time Slot
                  </label>
                  <select
                    value={preferredSlot}
                    onChange={(e) => setPreferredSlot(e.target.value)}
                    className="w-full bg-[#F3EFE6] border border-[#D8D5C8] rounded-xl px-4 py-3 text-sm text-[#252923] outline-none focus:border-[#34483C] focus:ring-1 focus:ring-[#34483C] transition-all font-sans cursor-pointer"
                  >
                    <option value="morning">Morning (10:00 AM – 1:00 PM)</option>
                    <option value="afternoon">Afternoon (2:00 PM – 5:00 PM)</option>
                    <option value="evening">Evening (6:00 PM – 9:00 PM)</option>
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

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-[#34483C] hover:bg-[#252923] disabled:opacity-60 text-[#F3EFE6] button-sm uppercase tracking-wider rounded-xl transition-all shadow-soft-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <SpinnerGap className="w-4 h-4 animate-spin text-[#F3EFE6]" weight="bold" />
                    <span>Sending Request...</span>
                  </>
                ) : (
                  <>
                    <PaperPlaneRight className="w-4 h-4 text-[#F3EFE6]" weight="bold" />
                    <span>Confirm &amp; Book Free Call</span>
                  </>
                )}
              </button>

              {/* Privacy Acknowledgement */}
              <p className="caption-3 text-[#252923]/60 text-center leading-relaxed font-sans pt-1">
                By submitting this form, you acknowledge that your information will be used to respond to your enquiry. Please review our{" "}
                <Link href="/privacy" className="text-[#34483C] underline hover:text-[#252923] transition-colors">
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
