"use client";

import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import { Logo } from "./Logo";
import { 
  X, 
  Mail, 
  Lock, 
  User, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Phone, 
  Shield, 
  AlertCircle,
  KeyRound,
  GraduationCap
} from "lucide-react";

export function AuthModal() {
  const { 
    isAuthModalOpen, 
    closeAuthModal, 
    authMode, 
    setAuthMode, 
    signInEmail, 
    signUpEmail, 
    signInGoogle, 
    loginDemo 
  } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<"cadet" | "scholar" | "junior" | "parent">("cadet");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (authMode === "signin") {
        await signInEmail(email, password);
      } else {
        if (!name) {
          setError("Please enter your full name.");
          setLoading(false);
          return;
        }
        await signUpEmail(email, password, name, role);
      }
    } catch (err: any) {
      setError(err?.message || "Authentication failed. Please verify credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/35 backdrop-blur-md animate-in fade-in duration-200">
      {/* Glassmorphic Container */}
      <div 
        className="relative w-full max-w-md bg-white/90 backdrop-blur-xl border border-white/80 rounded-3xl shadow-[0_25px_60px_-15px_rgba(15,23,42,0.15)] p-7 sm:p-9 text-[#0F172A] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Soft Decorative Ambient Gradients */}
        <div className="absolute -top-20 -right-20 w-48 h-48 bg-sky-100/60 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-rose-50/70 rounded-full blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100/70 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3.5 mb-6">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200/60 flex items-center justify-center text-[#C8A84E] shadow-sm p-2">
            <Logo size="xs" showText={false} variant="gold" />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-xl text-[#0B192C]">
              {authMode === "signin" ? "Academy Sign In" : "Cadet Enrollment"}
            </h3>
            <p className="text-xs text-slate-500 font-label uppercase tracking-wider">
              Officium Supremum Portal
            </p>
          </div>
        </div>

        {/* Mode Selector (Sign In vs Register) */}
        <div className="grid grid-cols-2 gap-1 p-1 bg-slate-100/80 rounded-xl mb-5 text-xs font-label uppercase tracking-wider">
          <button
            type="button"
            onClick={() => {
              setAuthMode("signin");
              setError("");
            }}
            className={`py-2 rounded-lg transition-all ${
              authMode === "signin"
                ? "bg-white text-[#0B192C] font-semibold shadow-sm"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setAuthMode("signup");
              setError("");
            }}
            className={`py-2 rounded-lg transition-all ${
              authMode === "signup"
                ? "bg-white text-[#0B192C] font-semibold shadow-sm"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            Create Account
          </button>
        </div>

        {error && (
          <div className="p-3 mb-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
            {error}
          </div>
        )}

        {/* Sign In / Sign Up Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {authMode === "signup" && (
            <>
              <div>
                <label className="block text-xs font-label uppercase tracking-wider text-slate-600 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Cadet Rohit Sharma"
                    className="w-full bg-slate-50/70 border border-slate-200 focus:border-[#C8A84E] focus:bg-white rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#0F172A] placeholder:text-slate-400 outline-none transition-all shadow-inner"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-label uppercase tracking-wider text-slate-600 mb-1">
                  Academic Track
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as any)}
                  className="w-full bg-slate-50/70 border border-slate-200 focus:border-[#C8A84E] focus:bg-white rounded-xl px-3 py-2.5 text-xs text-[#0F172A] outline-none transition-all"
                >
                  <option value="cadet">Defense Leadership (NDA / CDS / AFCAT)</option>
                  <option value="scholar">Scholars Program (Class 11–12)</option>
                  <option value="junior">Juniors Program (Class 7–10)</option>
                  <option value="parent">Parent of Enrolled Student</option>
                </select>
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-label uppercase tracking-wider text-slate-600 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="cadet@officium.academy"
                className="w-full bg-slate-50/70 border border-slate-200 focus:border-[#C8A84E] focus:bg-white rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#0F172A] placeholder:text-slate-400 outline-none transition-all shadow-inner"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-label uppercase tracking-wider text-slate-600 mb-1">
              Security Password
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-50/70 border border-slate-200 focus:border-[#C8A84E] focus:bg-white rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#0F172A] placeholder:text-slate-400 outline-none transition-all shadow-inner"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 bg-[#0B192C] hover:bg-[#1E293B] text-white font-label font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
          >
            {loading ? "Authenticating..." : authMode === "signin" ? "Sign In to Academy" : "Complete Registration"}
            <ArrowRight className="w-4 h-4 text-[#C8A84E]" />
          </button>
        </form>

        {/* Google Sign-in */}
        <div className="mt-4 pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={() => signInGoogle()}
            className="w-full py-2.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-xs font-label uppercase tracking-wider text-slate-700 transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            <span>Continue with Google</span>
          </button>
        </div>

        {/* 1-Click Instant Demo Login Bar */}
        <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
          <div className="text-[11px] font-label uppercase tracking-widest text-slate-400 text-center">
            Or Test with 1-Click Demo Profile:
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => loginDemo("cadet")}
              className="px-3 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 rounded-lg text-xs font-label uppercase tracking-wider text-slate-700 transition-colors flex items-center justify-center gap-1.5"
            >
              <Shield className="w-3.5 h-3.5 text-[#C8A84E]" />
              <span>Demo Cadet</span>
            </button>
            <button
              type="button"
              onClick={() => loginDemo("scholar")}
              className="px-3 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 rounded-lg text-xs font-label uppercase tracking-wider text-slate-700 transition-colors flex items-center justify-center gap-1.5"
            >
              <GraduationCap className="w-3.5 h-3.5 text-sky-600" />
              <span>Demo Scholar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
