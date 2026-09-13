"use client";

import React, { useState } from "react";
import { Calendar, CheckCircle2, Shield, Phone, Sparkles, GraduationCap, Send, Clock, UserCheck } from "lucide-react";

export default function BookOrientationPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState<"student" | "parent">("student");
  const [program, setProgram] = useState("defense");
  const [preferredSlot, setPreferredSlot] = useState("evening");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    const message = encodeURIComponent(
      `Hello Officium Supremum Admissions,\n\nI want to book an Orientation Assessment.\n\n• Name: ${name}\n• Category: ${userType === "parent" ? "Parent" : "Student / Aspirant"}\n• Program: ${program.toUpperCase()}\n• Preferred Time: ${preferredSlot.toUpperCase()}\n• Contact: ${phone}\n• Email: ${email || "Not specified"}\n\nPlease confirm my slot.`
    );

    window.open(`https://wa.me/918969634656?text=${message}`, "_blank");
    setSubmitted(true);
  };

  return (
    <div className="bg-[#0F1115] text-white min-h-screen py-20 lg:py-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1A1D24] border border-[#2A2F3A] text-xs font-label uppercase tracking-widest text-[#C8A84E]">
            <Calendar className="w-3.5 h-3.5 text-[#C8A84E]" />
            <span>Admissions Diagnostic Session</span>
          </div>

          <h1 className="font-heading text-4xl sm:text-5xl font-semibold tracking-tight text-white">
            Book Your 20-Minute Orientation Call
          </h1>

          <p className="text-sm sm:text-base text-zinc-400 font-sans max-w-xl mx-auto leading-relaxed">
            Every student undergoes a readiness and discipline assessment before admission to ensure alignment with academy standards.
          </p>
        </div>

        <div className="p-8 sm:p-10 rounded-2xl bg-[#14161C] border border-[#2A2F3A] shadow-2xl">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto" />
              <h3 className="font-heading font-semibold text-2xl text-white">Slot Requested Successfully</h3>
              <p className="text-xs text-zinc-400 max-w-md mx-auto leading-relaxed">
                Your orientation request has been routed to our admissions desk (+91 8969634656). A senior mentor will review your profile and connect with you to confirm the time slot.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-6 py-3 bg-[#C8A84E] text-[#0F1115] font-label font-bold text-xs uppercase tracking-widest rounded-xl shadow-gold-glow"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* User Type Selector */}
              <div className="grid grid-cols-2 gap-2 p-1.5 bg-[#1A1D24] border border-[#2A2F3A] rounded-xl text-xs font-label uppercase tracking-wider">
                <button
                  type="button"
                  onClick={() => setUserType("student")}
                  className={`py-2.5 rounded-lg transition-all ${
                    userType === "student"
                      ? "bg-[#C8A84E] text-[#0F1115] font-bold shadow"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  I am the Student / Aspirant
                </button>
                <button
                  type="button"
                  onClick={() => setUserType("parent")}
                  className={`py-2.5 rounded-lg transition-all ${
                    userType === "parent"
                      ? "bg-[#C8A84E] text-[#0F1115] font-bold shadow"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  I am a Parent
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-label uppercase tracking-wider text-zinc-300 mb-1.5">
                    Full Name:
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Cadet Rohan / Major Sharma"
                    className="w-full bg-[#1A1D24] border border-[#2A2F3A] rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-500 outline-none focus:border-[#C8A84E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-label uppercase tracking-wider text-zinc-300 mb-1.5">
                    WhatsApp / Contact Number:
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 8969634656"
                    className="w-full bg-[#1A1D24] border border-[#2A2F3A] rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-500 outline-none focus:border-[#C8A84E]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-label uppercase tracking-wider text-zinc-300 mb-1.5">
                    Target Program Track:
                  </label>
                  <select
                    value={program}
                    onChange={(e) => setProgram(e.target.value)}
                    className="w-full bg-[#1A1D24] border border-[#2A2F3A] rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#C8A84E]"
                  >
                    <option value="defense">Defense Leadership (NDA / CDS / AFCAT)</option>
                    <option value="juniors">Juniors Program (Class 7–10)</option>
                    <option value="scholars">Scholars Program (Class 11–12)</option>
                    <option value="general">General Academy Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-label uppercase tracking-wider text-zinc-300 mb-1.5">
                    Preferred Time Slot:
                  </label>
                  <select
                    value={preferredSlot}
                    onChange={(e) => setPreferredSlot(e.target.value)}
                    className="w-full bg-[#1A1D24] border border-[#2A2F3A] rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#C8A84E]"
                  >
                    <option value="morning">Morning (10:00 AM – 1:00 PM)</option>
                    <option value="afternoon">Afternoon (2:00 PM – 5:00 PM)</option>
                    <option value="evening">Evening (6:00 PM – 9:00 PM)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-label uppercase tracking-wider text-zinc-300 mb-1.5">
                  Email Address (Optional):
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-[#1A1D24] border border-[#2A2F3A] rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-500 outline-none focus:border-[#C8A84E]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#C8A84E] hover:bg-[#D4B65B] text-[#0F1115] font-label font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-gold-glow flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Confirm &amp; Transmit to Admissions Desk</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
