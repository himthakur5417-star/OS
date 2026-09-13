"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useModals } from "./ModalContext";
import { useAuth } from "./AuthContext";
import { Logo } from "./Logo";
import {
  Shield,
  Sparkles,
  GraduationCap,
  Menu,
  X,
  ChevronDown,
  LogIn,
  Bot,
  User,
  LayoutDashboard,
  LogOut,
  BookOpen,
  ArrowRight,
} from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const { openOrientation, openAi } = useModals();
  const { user, openAuthModal, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [programsDropdownOpen, setProgramsDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProgramsDropdownOpen(false);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(e.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const programs = [
    {
      href: "/programs/juniors",
      icon: <Sparkles className="w-5 h-5" />,
      iconBg: "bg-sky-100/80 text-sky-600",
      name: "Juniors Program",
      desc: "Class 7–10 • Early Advantage & Habit Building",
      hoverBg: "hover:bg-sky-50/80",
    },
    {
      href: "/programs/scholars",
      icon: <GraduationCap className="w-5 h-5" />,
      iconBg: "bg-amber-100/80 text-amber-700",
      name: "Scholars Program",
      desc: "Class 11–12 • Board Mastery & Competitive Edge",
      hoverBg: "hover:bg-amber-50/60",
    },
    {
      href: "/programs/defense",
      icon: <Shield className="w-5 h-5" />,
      iconBg: "bg-emerald-100/80 text-emerald-700",
      name: "Defense Leadership",
      desc: "NDA • CDS • AFCAT • SSB & 15 OLQs Mentorship",
      hoverBg: "hover:bg-emerald-50/60",
    },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl border-b border-slate-200/70 shadow-sm py-2.5"
          : "bg-white/70 backdrop-blur-sm border-b border-slate-200/40 py-3.5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo Lockup */}
        <Link href="/" className="flex items-center">
          <Logo variant="light" size="md" />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7">
          <Link
            href="/"
            className={`font-label text-xs tracking-widest uppercase transition-colors hover:text-[#C8A84E] ${
              pathname === "/" ? "text-[#0B192C] font-semibold border-b-2 border-[#C8A84E] pb-0.5" : "text-slate-600"
            }`}
          >
            Home
          </Link>

          {/* Programs Mega Menu Dropdown */}
          <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={() => setProgramsDropdownOpen(true)}
            onMouseLeave={() => setProgramsDropdownOpen(false)}
          >
            <button
              className={`font-label text-xs tracking-widest uppercase flex items-center gap-1.5 transition-colors hover:text-[#C8A84E] py-2 ${
                pathname.startsWith("/programs") ? "text-[#0B192C] font-semibold border-b-2 border-[#C8A84E] pb-0.5" : "text-slate-600"
              }`}
            >
              <span>Programs</span>
              <ChevronDown className={`w-3.5 h-3.5 opacity-60 transition-transform duration-200 ${programsDropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {programsDropdownOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-[420px] bg-white/98 backdrop-blur-2xl border border-slate-200/80 rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.12)] p-2 z-50 mt-1">
                {/* Mega Menu Header */}
                <div className="px-4 pt-3 pb-2 border-b border-slate-100/80 mb-1">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-3.5 h-3.5 text-[#C8A84E]" />
                    <span className="font-label text-[10px] uppercase tracking-[0.2em] text-slate-500 font-semibold">
                      Our Programs
                    </span>
                  </div>
                </div>

                {/* Program Cards */}
                <div className="flex flex-col gap-1">
                  {programs.map((prog) => (
                    <Link
                      key={prog.href}
                      href={prog.href}
                      onClick={() => setProgramsDropdownOpen(false)}
                      className={`flex items-center gap-4 p-4 rounded-xl ${prog.hoverBg} transition-all group/item`}
                    >
                      <div className={`w-11 h-11 rounded-xl ${prog.iconBg} flex items-center justify-center shrink-0 group-hover/item:scale-110 transition-transform shadow-sm`}>
                        {prog.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-heading font-semibold text-sm text-[#0B192C] group-hover/item:text-[#C8A84E] transition-colors">
                          {prog.name}
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                          {prog.desc}
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-300 group-hover/item:text-[#C8A84E] group-hover/item:translate-x-0.5 transition-all shrink-0" />
                    </Link>
                  ))}
                </div>

                {/* Mega Menu Footer */}
                <div className="px-4 pt-2 pb-3 mt-1 border-t border-slate-100/80">
                  <button
                    onClick={() => {
                      setProgramsDropdownOpen(false);
                      openOrientation("general");
                    }}
                    className="w-full text-center py-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-xs font-label uppercase tracking-wider text-slate-600 hover:text-[#0B192C] transition-colors"
                  >
                    Not sure? Book a Free Orientation →
                  </button>
                </div>
              </div>
            )}
          </div>

          <Link
            href="/resources"
            className={`font-label text-xs tracking-widest uppercase transition-colors hover:text-[#C8A84E] ${
              pathname === "/resources" ? "text-[#0B192C] font-semibold border-b-2 border-[#C8A84E] pb-0.5" : "text-slate-600"
            }`}
          >
            Resources
          </Link>

          {/* Student Dashboard link if logged in */}
          {user && (
            <Link
              href="/dashboard"
              className={`font-label text-xs tracking-widest uppercase transition-colors hover:text-[#C8A84E] flex items-center gap-1 ${
                pathname === "/dashboard" ? "text-[#0B192C] font-semibold border-b-2 border-[#C8A84E] pb-0.5" : "text-slate-600"
              }`}
            >
              <span>Dashboard</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </Link>
          )}

          <Link
            href="/about"
            className={`font-label text-xs tracking-widest uppercase transition-colors hover:text-[#C8A84E] ${
              pathname === "/about" ? "text-[#0B192C] font-semibold border-b-2 border-[#C8A84E] pb-0.5" : "text-slate-600"
            }`}
          >
            About
          </Link>

          <Link
            href="/contact"
            className={`font-label text-xs tracking-widest uppercase transition-colors hover:text-[#C8A84E] ${
              pathname === "/contact" ? "text-[#0B192C] font-semibold border-b-2 border-[#C8A84E] pb-0.5" : "text-slate-600"
            }`}
          >
            Contact
          </Link>
        </nav>

        {/* Action Controls */}
        <div className="hidden lg:flex items-center gap-3">
          {/* AI Copilot Quick Trigger — in navbar only, no floating */}
          <button
            onClick={() => openAi()}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 text-slate-700 text-xs font-label uppercase tracking-wider transition-all shadow-sm group"
            title="Officium AI: Syllabus Explorer & Daily Planner"
          >
            <Bot className="w-4 h-4 text-[#C8A84E] group-hover:scale-110 transition-transform" />
            <span>AI Copilot</span>
          </button>

          {/* Authentication State */}
          {user ? (
            <div className="relative" ref={userDropdownRef}>
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 bg-slate-50 border border-slate-200 hover:border-slate-300 px-3 py-1.5 rounded-xl transition-colors shadow-sm"
              >
                <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-amber-200 to-orange-100 border border-amber-300 text-[#0B192C] font-bold text-xs flex items-center justify-center">
                  {user.displayName?.[0] || "C"}
                </div>
                <span className="text-xs font-heading font-medium text-slate-800">
                  {user.displayName || "Cadet"}
                </span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-slate-200 rounded-2xl shadow-xl p-2 z-50 text-xs space-y-1">
                  <div className="px-3 py-2 border-b border-slate-100">
                    <div className="font-heading font-semibold text-slate-900">{user.displayName}</div>
                    <div className="text-[10px] text-slate-500 font-label uppercase">{user.rollNumber}</div>
                  </div>
                  <Link
                    href="/dashboard"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-slate-700 hover:bg-slate-50 rounded-lg transition-colors font-label uppercase tracking-wider"
                  >
                    <LayoutDashboard className="w-3.5 h-3.5 text-[#C8A84E]" />
                    <span>Cadet Dashboard</span>
                  </Link>
                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      logout();
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors font-label uppercase tracking-wider"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => openAuthModal("signin")}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-label uppercase tracking-wider text-slate-700 hover:text-[#0B192C] border border-slate-200/80 hover:bg-slate-50 rounded-xl transition-all shadow-sm"
            >
              <LogIn className="w-3.5 h-3.5 text-[#C8A84E]" />
              <span>Cadet Portal</span>
            </button>
          )}

          {/* Book Orientation Primary CTA */}
          <button
            onClick={() => openOrientation("general")}
            className="inline-flex items-center justify-center px-4 py-2 text-xs font-label uppercase tracking-widest font-bold text-white bg-[#0B192C] hover:bg-[#1E293B] rounded-xl shadow-sm hover:shadow-md transition-all active:scale-95"
          >
            Book Orientation
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-slate-100 text-slate-700 border border-slate-200"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/98 backdrop-blur-xl border-b border-slate-200 px-5 pt-4 pb-7 space-y-4">
          <div className="flex flex-col space-y-3 font-label text-xs uppercase tracking-wider text-slate-700">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#C8A84E] py-1 border-b border-slate-100"
            >
              Home
            </Link>

            <div className="py-1 border-b border-slate-100 space-y-3">
              <span className="text-slate-400 text-[10px]">Programs</span>
              <div className="space-y-2">
                {programs.map((prog) => (
                  <Link
                    key={prog.href}
                    href={prog.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 p-3 rounded-xl bg-slate-50/80 hover:bg-slate-100 transition-colors"
                  >
                    <div className={`w-9 h-9 rounded-lg ${prog.iconBg} flex items-center justify-center shrink-0`}>
                      {React.cloneElement(prog.icon, { className: "w-4 h-4" })}
                    </div>
                    <div>
                      <div className="font-heading font-semibold text-xs text-[#0B192C]">{prog.name}</div>
                      <div className="text-[10px] text-slate-500 normal-case tracking-normal">{prog.desc}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/resources"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#C8A84E] py-1 border-b border-slate-100"
            >
              Resource Library
            </Link>

            {user && (
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[#C8A84E] py-1 border-b border-slate-100 font-semibold text-emerald-700"
              >
                Cadet Dashboard
              </Link>
            )}

            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#C8A84E] py-1 border-b border-slate-100"
            >
              About the Academy
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#C8A84E] py-1 border-b border-slate-100"
            >
              Contact
            </Link>
          </div>

          <div className="pt-2 flex flex-col gap-2.5">
            {/* Mobile AI Copilot */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openAi();
              }}
              className="w-full py-2.5 text-center text-xs font-label uppercase tracking-wider text-[#C8A84E] border border-[#C8A84E]/30 rounded-xl hover:bg-amber-50/50 flex items-center justify-center gap-2"
            >
              <Bot className="w-4 h-4" />
              AI Copilot
            </button>

            {user ? (
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <span className="text-xs text-slate-700 font-heading">Logged in as {user.displayName}</span>
                <button onClick={logout} className="text-xs text-rose-600 font-label uppercase">Sign Out</button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openAuthModal("signin");
                }}
                className="w-full py-2.5 text-center text-xs font-label uppercase tracking-wider text-slate-700 border border-slate-200 rounded-xl hover:bg-slate-50"
              >
                Cadet Portal Sign In
              </button>
            )}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openOrientation("general");
              }}
              className="w-full py-3 text-center text-xs font-label uppercase tracking-widest font-bold text-white bg-[#0B192C] rounded-xl shadow-md"
            >
              Book Orientation
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
