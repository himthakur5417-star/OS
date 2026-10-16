"use client";

import React, { useState, useEffect } from "react";
import { useModals } from "./ModalContext";
import { X, Calendar, CheckCircle2, Send, MessageCircle, ArrowRight, Loader2 } from "lucide-react";

export function OrientationModal() {
  const { isOrientationOpen, closeOrientation, orientationDefaultProgram } = useModals();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState<"student" | "parent">("student");
  const [program, setProgram] = useState("defense");
  const [submitted, setSubmitted] = useState(false);
  const [enquiryRef, setEnquiryRef] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [waLink, setWaLink] = useState("");

  useEffect(() => {
    if (orientationDefaultProgram && orientationDefaultProgram !== "general") {
      setProgram(orientationDefaultProgram);
    }
  }, [orientationDefaultProgram]);

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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-200"
      onClick={handleClose}
    >
      <div 
        className="relative w-full max-w-lg bg-white/95 backdrop-blur-xl border border-slate-200/80 rounded-3xl shadow-[0_25px_60px_-15px_rgba(15,23,42,0.18)] p-7 sm:p-9 text-[#0F172A] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#C8A84E] via-amber-300 to-[#C8A84E]" />

        <button
          onClick={handleClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mx-auto shadow-sm">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <h3 className="font-heading font-semibold text-2xl text-[#0B192C]">Orientation Requested</h3>
              <p className="text-xs text-slate-500 font-label uppercase tracking-widest mt-0.5">
                Officium Supremum Admissions
              </p>
            </div>

            {enquiryRef && (
              <div className="inline-block px-3.5 py-1.5 rounded-lg bg-amber-50 border border-amber-200/70 font-mono text-xs font-semibold text-amber-900">
                Diagnostic Booking Ref: {enquiryRef}
              </div>
            )}

            <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed font-sans">
              Your orientation request has been registered. We opened WhatsApp to connect you directly with the Admissions Desk (+91 8969634656).
            </p>

            {waLink && (
              <div className="pt-2">
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-3 bg-[#25D366] hover:bg-[#20ba5a] text-white font-label font-bold text-xs uppercase tracking-widest rounded-xl shadow-md transition-all active:scale-98"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Open WhatsApp Directly</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            )}

            <button
              onClick={handleClose}
              className="mt-2 px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-[#0B192C] font-label font-bold text-xs uppercase tracking-widest rounded-xl transition-all"
            >
              Return to Website
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3.5 mb-6">
              <div className="w-11 h-11 rounded-2xl bg-amber-50 border border-amber-200/70 flex items-center justify-center text-[#C8A84E] shadow-sm">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-xl text-[#0B192C]">Book Orientation &amp; Assessment</h3>
                <p className="text-xs text-slate-500 font-label uppercase tracking-widest">
                  Discipline &amp; Readiness Diagnostic Call
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* User Type Toggle */}
              <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100 rounded-xl text-xs font-label uppercase tracking-wider">
                <button
                  type="button"
                  onClick={() => setUserType("student")}
                  className={`py-2 rounded-lg transition-all ${
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
                  className={`py-2 rounded-lg transition-all ${
                    userType === "parent"
                      ? "bg-white text-[#0B192C] font-bold shadow-sm"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  I am a Parent
                </button>
              </div>

              <div>
                <label className="block text-xs font-label uppercase tracking-wider text-slate-600 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Cadet Rohit Sharma / Dr. Sharma"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-[#0F172A] placeholder:text-slate-400 outline-none focus:border-[#C8A84E] focus:bg-white transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-label uppercase tracking-wider text-slate-600 mb-1">
                    WhatsApp Number
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
                <div>
                  <label className="block text-xs font-label uppercase tracking-wider text-slate-600 mb-1">
                    Target Track
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
                className="w-full mt-2 py-3 bg-[#0B192C] hover:bg-[#1E293B] disabled:opacity-70 text-white font-label font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-[#C8A84E]" />
                    <span>Transmitting Request...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-[#C8A84E]" />
                    <span>Transmit to Admissions Desk</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
