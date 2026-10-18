"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle, Sparkles, KeyRound } from "lucide-react";

import { useAuth } from "@/components/AuthContext";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { signInGoogle } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Authentication failed");
      }

      if (data.token) {
        localStorage.setItem("os_admin_token", data.token);
      }

      // Successful login -> go to admin dashboard
      router.push("/admin");
    } catch (err: any) {
      setError(err.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError(null);
    setGoogleLoading(true);
    try {
      await signInGoogle();
    } catch (err: any) {
      setError(err?.message || "Google sign-in could not be completed.");
    } finally {
      setGoogleLoading(false);
    }
  };



  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#0F172A] flex flex-col justify-between selection:bg-[#C8A84E]/20">
      {/* Top Bar with Brand Lockup */}
      <div className="max-w-7xl mx-auto w-full px-6 py-6 flex items-center justify-between">
        <Link href="/" className="inline-block transition-transform hover:scale-[1.02]">
          <Logo variant="light" size="md" />
        </Link>
        <Link
          href="/"
          className="text-xs font-label uppercase tracking-widest text-slate-500 hover:text-[#0B192C] transition-colors"
        >
          ← Return to Public Site
        </Link>
      </div>

      {/* Center Auth Card */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white/95 backdrop-blur-xl border border-slate-200/80 rounded-3xl shadow-[0_20px_50px_-15px_rgba(15,23,42,0.08)] p-8 sm:p-10 space-y-7 relative overflow-hidden">
          {/* Subtle Top Gold Accent Bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#C8A84E] via-amber-300 to-[#C8A84E]" />

          {/* Header */}
          <div className="text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200/70 flex items-center justify-center text-[#C8A84E] mx-auto shadow-sm p-3">
              <Logo size="sm" showText={false} variant="gold" />
            </div>
            <div>
              <h1 className="font-heading text-2xl sm:text-3xl font-semibold text-[#0B192C]">
                Academy Director Terminal
              </h1>
              <p className="text-xs font-label uppercase tracking-widest text-slate-500 mt-1">
                Authorized Personnel Only • Officium Supremum
              </p>
            </div>
          </div>

          {error && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-label uppercase tracking-wider text-slate-700 mb-1.5 font-medium">
                Administrator Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@officium.academy"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C8A84E]/40 focus:border-[#C8A84E] transition-all font-sans"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-label uppercase tracking-wider text-slate-700 mb-1.5 font-medium">
                Security Passkey
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C8A84E]/40 focus:border-[#C8A84E] transition-all font-sans"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || googleLoading}
              className="w-full py-3.5 bg-[#0B192C] hover:bg-[#1E293B] text-white font-label font-bold text-xs uppercase tracking-widest rounded-xl shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
            >
              <span>{loading ? "Authenticating Terminal..." : "Access Admin Command"}</span>
              <ArrowRight className="w-4 h-4 text-[#C8A84E]" />
            </button>
          </form>

          {/* Divider */}
          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-slate-200" />
            <span className="flex-shrink mx-3 text-slate-400 text-[11px] font-label uppercase tracking-widest">or</span>
            <div className="flex-grow border-t border-slate-200" />
          </div>

          {/* Sign in with Google as Admin */}
          <button
            type="button"
            disabled={loading || googleLoading}
            onClick={handleGoogleLogin}
            className="w-full py-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-xs font-label uppercase tracking-wider text-slate-700 transition-colors flex items-center justify-center gap-2.5 shadow-sm disabled:opacity-50"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            <span>{googleLoading ? "Connecting Google..." : "Sign in as Admin with Google"}</span>
          </button>


        </div>
      </div>

      {/* Footer */}
      <div className="py-6 text-center text-xs text-slate-400 font-label uppercase tracking-widest">
        Officium Supremum Academy • Central Management System
      </div>
    </div>
  );
}
