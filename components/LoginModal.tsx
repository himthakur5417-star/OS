"use client";

import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import { useModals } from "./ModalContext";
import { Logo } from "./Logo";
import { X, Shield, Lock, User, KeyRound, CheckCircle2, ArrowRight } from "lucide-react";

export function LoginModal() {
  const { isLoginOpen, closeLogin, loginUser } = useModals();
  const [role, setRole] = useState<"cadet" | "scholar" | "junior" | "parent">("cadet");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isLoginOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier) {
      setError("Please enter your Cadet/Roll ID or Email.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      loginUser({
        name: identifier.includes("@") ? identifier.split("@")[0] : identifier,
        role: role,
        rollNumber: identifier.toUpperCase().startsWith("OS-") ? identifier.toUpperCase() : `OS-${Math.floor(1000 + Math.random() * 9000)}`,
      });
    }, 600);
  };

  const handleDemoLogin = (demoRole: "cadet" | "scholar" | "parent") => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      loginUser({
        name: demoRole === "cadet" ? "Cadet Vikram Singh" : demoRole === "scholar" ? "Aarav Sharma" : "Dr. Rajesh Sharma (Parent)",
        role: demoRole === "parent" ? "parent" : demoRole === "scholar" ? "scholar" : "cadet",
        rollNumber: demoRole === "cadet" ? "OS-NDA-2025" : "OS-SCH-4019",
      });
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md bg-[#12141A] border border-[#2A2F3A] rounded-2xl shadow-2xl p-6 sm:p-8 text-white overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Gold Accent Border */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#C8A84E] via-[#E3C978] to-[#C8A84E]" />

        {/* Close Button */}
        <button
          onClick={closeLogin}
          className="absolute top-5 right-5 text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-zinc-800 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#1A1D24] border border-[#C8A84E]/40 flex items-center justify-center text-[#C8A84E] p-2">
            <Logo size="xs" showText={false} variant="gold" />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-lg text-white">Cadet &amp; Scholar Portal</h3>
            <p className="text-xs text-zinc-400 font-label uppercase tracking-widest">Officium Supremum Terminal</p>
          </div>
        </div>

        {/* Role Selector Tabs */}
        <div className="grid grid-cols-3 gap-1 p-1 bg-[#1A1D24] border border-[#2A2F3A] rounded-lg mb-6 text-xs font-label uppercase tracking-wider">
          <button
            type="button"
            onClick={() => setRole("cadet")}
            className={`py-2 rounded-md transition-all ${
              role === "cadet"
                ? "bg-[#C8A84E] text-[#0F1115] font-semibold shadow-sm"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Defense
          </button>
          <button
            type="button"
            onClick={() => setRole("scholar")}
            className={`py-2 rounded-md transition-all ${
              role === "scholar"
                ? "bg-[#C8A84E] text-[#0F1115] font-semibold shadow-sm"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Scholar
          </button>
          <button
            type="button"
            onClick={() => setRole("parent")}
            className={`py-2 rounded-md transition-all ${
              role === "parent"
                ? "bg-[#C8A84E] text-[#0F1115] font-semibold shadow-sm"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Parent
          </button>
        </div>

        {error && (
          <div className="p-3 mb-4 rounded-lg bg-rose-950/40 border border-rose-800/60 text-rose-300 text-xs">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-label uppercase tracking-wider text-zinc-300 mb-1.5">
              {role === "parent" ? "Registered Mobile or Email" : "Cadet ID / Roll Number / Email"}
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={identifier}
                onChange={(e) => {
                  setIdentifier(e.target.value);
                  setError("");
                }}
                placeholder={role === "parent" ? "+91 9876543210" : "OS-NDA-2025 or email"}
                className="w-full bg-[#1A1D24] border border-[#2A2F3A] focus:border-[#C8A84E] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-zinc-500 outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-label uppercase tracking-wider text-zinc-300">
                Security Password / OTP
              </label>
              <a href="https://wa.me/918969634656" target="_blank" rel="noreferrer" className="text-[11px] text-[#C8A84E] hover:underline">
                Forgot ID?
              </a>
            </div>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#1A1D24] border border-[#2A2F3A] focus:border-[#C8A84E] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-zinc-500 outline-none transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 bg-[#C8A84E] hover:bg-[#D4B65B] text-[#0F1115] font-label font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-md active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? "Authenticating..." : "Access Cadet Portal"}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Quick Demo Access Bar */}
        <div className="mt-6 pt-5 border-t border-[#1A1D24] space-y-2">
          <div className="text-[11px] font-label uppercase tracking-widest text-zinc-400 text-center mb-2">
            Instant Demo Access (Preview):
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleDemoLogin("cadet")}
              className="px-3 py-2 bg-[#1A1D24] hover:bg-[#252A35] border border-[#2A2F3A] hover:border-[#C8A84E]/40 rounded-lg text-xs text-zinc-300 hover:text-white transition-colors flex items-center justify-center gap-1.5"
            >
              <Shield className="w-3.5 h-3.5 text-[#C8A84E]" />
              <span>Demo Cadet</span>
            </button>
            <button
              type="button"
              onClick={() => handleDemoLogin("parent")}
              className="px-3 py-2 bg-[#1A1D24] hover:bg-[#252A35] border border-[#2A2F3A] hover:border-[#C8A84E]/40 rounded-lg text-xs text-zinc-300 hover:text-white transition-colors flex items-center justify-center gap-1.5"
            >
              <User className="w-3.5 h-3.5 text-blue-400" />
              <span>Demo Parent</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
