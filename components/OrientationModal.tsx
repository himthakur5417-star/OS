"use client";

import React, { useState, useEffect } from "react";
import { useModals } from "./ModalContext";
import { X, Calendar, CheckCircle2, Phone, User, Send, Sparkles } from "lucide-react";

export function OrientationModal() {
  const { isOrientationOpen, closeOrientation, orientationDefaultProgram } = useModals();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState<"student" | "parent">("student");
  const [program, setProgram] = useState("defense");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (orientationDefaultProgram && orientationDefaultProgram !== "general") {
      setProgram(orientationDefaultProgram);
    }
  }, [orientationDefaultProgram]);

  if (!isOrientationOpen) return null;

  const [enquiryRef, setEnquiryRef] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          email,
          program,
          source: "orientation_modal",
          message: `Category: ${userType === "parent" ? "Parent" : "Student"}. Requested diagnostic orientation call for ${program.toUpperCase()}.`,
        }),
      });

      const data = await res.json();
      if (data.enquiryId) {
        setEnquiryRef(data.enquiryId);
      }
    } catch (err) {
      console.error("Orientation booking save error:", err);
    }

    const message = encodeURIComponent(
      `Hello Officium Supremum Admissions,\n\nI want to book an Orientation Assessment.\n\n• Name: ${name}\n• Category: ${userType === "parent" ? "Parent" : "Student / Aspirant"}\n• Program: ${program.toUpperCase()}\n• Contact: ${phone}\n• Email: ${email || "Not specified"}\n\nPlease let me know the available time slots.`
    );

    window.open(`https://wa.me/918969634656?text=${message}`, "_blank");
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/35 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-white/95 backdrop-blur-xl border border-slate-200/80 rounded-3xl shadow-[0_25px_60px_-15px_rgba(15,23,42,0.18)] p-7 sm:p-9 text-[#0F172A] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#C8A84E] via-amber-300 to-[#C8A84E]" />

        <button
          onClick={closeOrientation}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-heading font-semibold text-2xl text-[#0B192C]">Orientation Requested</h3>
            {enquiryRef && (
              <div className="inline-block px-3 py-1 rounded-md bg-amber-50 border border-amber-200/60 font-mono text-xs font-semibold text-amber-900">
                Diagnostic Booking Ref: {enquiryRef}
              </div>
            )}
            <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed font-sans">
              We have opened WhatsApp to transmit your request to the Officium Supremum Admissions Desk (+91 8969634656). A mentor will review your profile and confirm the slot within 4 business hours.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                closeOrientation();
              }}
              className="mt-4 px-6 py-2.5 bg-[#0B192C] text-white font-label font-bold text-xs uppercase tracking-widest rounded-xl shadow"
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
                className="w-full mt-2 py-3 bg-[#0B192C] hover:bg-[#1E293B] text-white font-label font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4 text-[#C8A84E]" />
                <span>Transmit to Admissions Desk</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
