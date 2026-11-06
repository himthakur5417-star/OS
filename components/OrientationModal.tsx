"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useModals } from "./ModalContext";
import { useAuth } from "./AuthContext";
import {
  X,
  Calendar,
  CheckCircle,
  PaperPlaneRight,
  WhatsappLogo,
  ArrowRight,
  SpinnerGap
} from "@phosphor-icons/react";

export function OrientationModal() {
  const { isOrientationOpen, closeOrientation, orientationDefaultProgram } = useModals();
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState<"student" | "parent">("student");
  const [program, setProgram] = useState("defence");
  const [submitted, setSubmitted] = useState(false);
  const [enquiryRef, setEnquiryRef] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [waLink, setWaLink] = useState("");

  useEffect(() => {
    if (orientationDefaultProgram && orientationDefaultProgram !== "general") {
      setProgram(orientationDefaultProgram === "defense" ? "defence" : orientationDefaultProgram);
    }
  }, [orientationDefaultProgram]);

  useEffect(() => {
    if (user) {
      if (user.displayName && !name) {
        setName(user.displayName);
      }
      if (user.email && !email) {
        setEmail(user.email);
      }
    }
  }, [user]);

  if (!isOrientationOpen) return null;

  const handleClose = () => {
    setSubmitted(false);
    setIsSubmitting(false);
    closeOrientation();
  };

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
          message: `Category: ${userType === "parent" ? "Parent" : "Student"}. Requested diagnostic orientation call for ${program.toUpperCase()}.`,
        }),
      });

      const data = await res.json();
      if (data.enquiryId) {
        assignedId = data.enquiryId;
        setEnquiryRef(data.enquiryId);
      }
    } catch (err) {
      console.error("Orientation booking save error:", err);
    } finally {
      setIsSubmitting(false);
    }

    const message = encodeURIComponent(
      `Hello Officium Supremum Admissions,\n\nI want to book an Orientation Assessment.\n\n• Name: ${name.trim()}\n• Category: ${userType === "parent" ? "Parent" : "Student / Aspirant"}\n• Program: ${program.toUpperCase()}\n• Contact: ${phone.trim()}\n• Email: ${email.trim() || "Not specified"}${assignedId ? `\n• Booking Ref: ${assignedId}` : ""}\n\nPlease let me know the available time slots.`
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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#252923]/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-lg bg-[#F3EFE6] border border-[#D8D5C8] rounded-2xl shadow-soft-xl p-6 sm:p-8 text-[#252923] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 text-[#252923]/60 hover:text-[#252923] p-1.5 rounded-lg hover:bg-[#D8D5C8]/40 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" weight="bold" />
        </button>

        {submitted ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-[#34483C]/10 border border-[#34483C]/30 flex items-center justify-center text-[#34483C] mx-auto shadow-soft-sm">
              <CheckCircle className="w-8 h-8" weight="fill" />
            </div>
            <div>
              <h3 className="heading-3 text-[#252923]">Call Request Received</h3>
              <p className="caption-3 text-[#B18A58] uppercase tracking-wider mt-0.5 font-semibold">
                Officium Supremum Mentorship Desk
              </p>
            </div>

            {enquiryRef && (
              <div className="inline-block px-3.5 py-1.5 rounded-lg bg-white border border-[#D8D5C8] font-mono text-xs font-semibold text-[#34483C]">
                Booking Reference: {enquiryRef}
              </div>
            )}

            <p className="body-3 text-[#252923]/75 max-w-sm mx-auto leading-relaxed">
              We have received your request. We opened WhatsApp to connect you directly with an Officium Supremum mentor (+91 8969634656).
            </p>

            {waLink && (
              <div className="pt-2">
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-3 bg-[#34483C] hover:bg-[#252923] text-[#F3EFE6] button-sm uppercase tracking-wider rounded-xl shadow-soft-sm transition-all"
                >
                  <WhatsappLogo className="w-4 h-4" weight="bold" />
                  <span>Open WhatsApp Now</span>
                  <ArrowRight className="w-3.5 h-3.5" weight="bold" />
                </a>
              </div>
            )}

            <button
              onClick={handleClose}
              className="mt-2 px-6 py-2.5 bg-white hover:bg-[#D8D5C8]/30 border border-[#D8D5C8] text-[#252923] button-sm uppercase tracking-wider rounded-xl transition-all"
            >
              Return to Website
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3.5 mb-5">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#D8D5C8] flex items-center justify-center text-[#34483C] shadow-soft-sm">
                <Calendar className="w-5 h-5" weight="bold" />
              </div>
              <div>
                <h3 className="heading-3 text-[#252923]">Book a Free 20-Minute Call</h3>
                <p className="caption-3 text-[#B18A58] uppercase tracking-wider font-semibold">
                  1-on-1 Consultation with Lead Mentor
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              {/* User Type Toggle */}
              <div className="grid grid-cols-2 gap-1 p-1 bg-white rounded-xl border border-[#D8D5C8] caption-3 uppercase tracking-wider">
                <button
                  type="button"
                  onClick={() => setUserType("student")}
                  className={`py-2 rounded-lg transition-all font-semibold ${
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
                  className={`py-2 rounded-lg transition-all font-semibold ${
                    userType === "parent"
                      ? "bg-[#34483C] text-[#F3EFE6] shadow-soft-sm"
                      : "text-[#252923]/70 hover:text-[#252923]"
                  }`}
                >
                  I am a Parent
                </button>
              </div>

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
                  className="w-full bg-white border border-[#D8D5C8] rounded-xl px-3.5 py-2.5 text-sm text-[#252923] placeholder:text-[#252923]/40 outline-none focus:border-[#34483C] focus:ring-1 focus:ring-[#34483C] transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block caption-3 uppercase tracking-wider text-[#252923] font-semibold mb-1">
                    WhatsApp Number <span className="text-[#B18A58]">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full bg-white border border-[#D8D5C8] rounded-xl px-3.5 py-2.5 text-sm text-[#252923] placeholder:text-[#252923]/40 outline-none focus:border-[#34483C] focus:ring-1 focus:ring-[#34483C] transition-all"
                  />
                </div>
                <div>
                  <label className="block caption-3 uppercase tracking-wider text-[#252923] font-semibold mb-1">
                    Target Track
                  </label>
                  <select
                    value={program}
                    onChange={(e) => setProgram(e.target.value)}
                    className="w-full bg-white border border-[#D8D5C8] rounded-xl px-3 py-2.5 text-xs text-[#252923] outline-none focus:border-[#34483C] focus:ring-1 focus:ring-[#34483C] transition-all cursor-pointer"
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
              </div>

              <div>
                <label className="block caption-3 uppercase tracking-wider text-[#252923] font-semibold mb-1">
                  Email Address <span className="text-[#252923]/50 font-normal lowercase">(optional)</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@example.com"
                  className="w-full bg-white border border-[#D8D5C8] rounded-xl px-3.5 py-2.5 text-sm text-[#252923] placeholder:text-[#252923]/40 outline-none focus:border-[#34483C] focus:ring-1 focus:ring-[#34483C] transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 py-3 bg-[#34483C] hover:bg-[#252923] disabled:opacity-70 text-[#F3EFE6] button-sm uppercase tracking-wider rounded-xl transition-all shadow-soft-sm flex items-center justify-center gap-2 cursor-pointer"
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

              <p className="caption-3 text-[#252923]/60 text-center leading-relaxed pt-1">
                By submitting this form, you acknowledge that your information will be used to respond to your enquiry. Review our{" "}
                <Link
                  href="/privacy"
                  onClick={handleClose}
                  className="text-[#34483C] underline hover:text-[#252923] transition-colors"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
