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
  User,
  LogOut,
  BookOpen,
  ArrowRight,
  LayoutDashboard,
} from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const { openOrientation } = useModals();
  const { user: authUser, openAuthModal, logout } = useAuth();
  const [devStudentUser, setDevStudentUser] = useState<typeof authUser | null>(null);

  useEffect(() => {
    if (process.env.NODE_ENV !== "production" && typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      if (searchParams.get("preview") === "student") {
        setDevStudentUser({
          uid: "test_cadet_uid_8412",
          email: "cadet.vikram@officiumsupremum.in",
          displayName: "Cadet Vikram",
          role: "user",
          rollNumber: "OS-USR-8412",
        });
      }
    }
  }, []);

  const user = authUser || devStudentUser;
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

  const isHeroTop = pathname === "/" && !scrolled;

  // Admin portal pages render their own dedicated command header
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const programs = [
    {
      href: "/programs/juniors",
      icon: <Sparkles className="w-5 h-5" />,
      iconBg: isHeroTop ? "bg-[#722F37]/30 text-[#E8DCC6]" : "bg-[#722F37]/10 text-[#722F37]",
      name: "Juniors Program",
      desc: "Class 7–10 • Build daily study habits & confidence early",
      hoverBg: isHeroTop ? "hover:bg-[#E8DCC6]/5" : "hover:bg-[#FAF7F2]",
    },
    {
      href: "/programs/scholars",
      icon: <GraduationCap className="w-5 h-5" />,
      iconBg: isHeroTop ? "bg-[#B7A89A]/30 text-[#E8DCC6]" : "bg-[#B7A89A]/20 text-[#722F37]",
      name: "Scholars Program",
      desc: "Class 11–12 • Balance board exams & competitive tests",
      hoverBg: isHeroTop ? "hover:bg-[#E8DCC6]/5" : "hover:bg-[#FAF7F2]",
    },
    {
      href: "/programs/defence",
      icon: <Shield className="w-5 h-5" />,
      iconBg: isHeroTop ? "bg-[#722F37]/30 text-[#E8DCC6]" : "bg-[#722F37]/15 text-[#722F37]",
      name: "Defence Leadership",
      desc: "NDA • CDS • AFCAT • Written Exam & SSB Guidance",
      hoverBg: isHeroTop ? "hover:bg-[#E8DCC6]/5" : "hover:bg-[#FAF7F2]",
    },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isHeroTop
          ? "bg-[#211C1D]/65 backdrop-blur-md border-b border-[#E8DCC6]/10 text-[#E8DCC6] py-3.5"
          : "bg-[#FAF7F2]/95 backdrop-blur-xl border-b border-[#211C1D]/10 text-[#211C1D] shadow-sm py-2.5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo Lockup */}
        <Link href="/" className="flex items-center">
          <Logo variant={isHeroTop ? "cream" : "burgundy"} size="md" />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7">
          <Link
            href="/"
            className={`font-label text-xs tracking-widest uppercase transition-colors ${
              isHeroTop
                ? pathname === "/"
                  ? "text-[#E8DCC6] font-semibold border-b-2 border-[#722F37] pb-0.5"
                  : "text-[#E8DCC6]/75 hover:text-[#E8DCC6]"
                : pathname === "/"
                ? "text-[#211C1D] font-semibold border-b-2 border-[#722F37] pb-0.5"
                : "text-[#211C1D]/75 hover:text-[#722F37]"
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
              className={`font-label text-xs tracking-widest uppercase flex items-center gap-1.5 transition-colors py-2 ${
                isHeroTop
                  ? "text-[#E8DCC6]/75 hover:text-[#E8DCC6]"
                  : pathname.startsWith("/programs")
                  ? "text-[#211C1D] font-semibold border-b-2 border-[#722F37] pb-0.5"
                  : "text-[#211C1D]/75 hover:text-[#722F37]"
              }`}
            >
              <span>Programs</span>
              <ChevronDown className={`w-3.5 h-3.5 opacity-60 transition-transform duration-200 ${programsDropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {programsDropdownOpen && (
              <div
                className={`absolute top-full left-1/2 -translate-x-1/2 w-[420px] rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.25)] p-2 z-50 mt-1 border ${
                  isHeroTop
                    ? "bg-[#211C1D] border-[#E8DCC6]/20 text-[#E8DCC6]"
                    : "bg-[#FAF7F2] border-[#211C1D]/10 text-[#211C1D]"
                }`}
              >
                {/* Mega Menu Header */}
                <div
                  className={`px-4 pt-3 pb-2 border-b mb-1 ${
                    isHeroTop ? "border-[#E8DCC6]/10 text-[#B7A89A]" : "border-[#211C1D]/10 text-[#211C1D]/60"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-3.5 h-3.5 text-[#722F37]" />
                    <span className="font-label text-[10px] uppercase tracking-[0.2em] font-semibold">
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
                        <div
                          className={`font-heading font-semibold text-sm transition-colors ${
                            isHeroTop
                              ? "text-[#E8DCC6] group-hover/item:text-[#B7A89A]"
                              : "text-[#211C1D] group-hover/item:text-[#722F37]"
                          }`}
                        >
                          {prog.name}
                        </div>
                        <div
                          className={`text-xs mt-0.5 leading-relaxed ${
                            isHeroTop ? "text-[#B7A89A]" : "text-[#211C1D]/70"
                          }`}
                        >
                          {prog.desc}
                        </div>
                      </div>
                      <ArrowRight
                        className={`w-4 h-4 group-hover/item:translate-x-0.5 transition-all shrink-0 ${
                          isHeroTop ? "text-[#B7A89A] group-hover/item:text-[#E8DCC6]" : "text-[#211C1D]/40 group-hover/item:text-[#722F37]"
                        }`}
                      />
                    </Link>
                  ))}
                </div>

                {/* Mega Menu Footer */}
                <div
                  className={`px-4 pt-2 pb-3 mt-1 border-t ${
                    isHeroTop ? "border-[#E8DCC6]/10" : "border-[#211C1D]/10"
                  }`}
                >
                  <button
                    onClick={() => {
                      setProgramsDropdownOpen(false);
                      openOrientation("general");
                    }}
                    className={`w-full text-center py-2 rounded-lg text-xs font-label uppercase tracking-wider transition-colors ${
                      isHeroTop
                        ? "bg-[#E8DCC6]/5 hover:bg-[#E8DCC6]/10 text-[#E8DCC6]/80 hover:text-[#E8DCC6]"
                        : "bg-white hover:bg-[#E8DCC6]/40 text-[#211C1D]/80 hover:text-[#722F37]"
                    }`}
                  >
                    Not sure which program to pick? Book a Free Call →
                  </button>
                </div>
              </div>
            )}
          </div>

          <Link
            href="/resources"
            className={`font-label text-xs tracking-widest uppercase transition-colors ${
              isHeroTop
                ? "text-[#E8DCC6]/75 hover:text-[#E8DCC6]"
                : pathname === "/resources"
                ? "text-[#211C1D] font-semibold border-b-2 border-[#722F37] pb-0.5"
                : "text-[#211C1D]/75 hover:text-[#722F37]"
            }`}
          >
            Study Materials
          </Link>

          <Link
            href="/about"
            className={`font-label text-xs tracking-widest uppercase transition-colors ${
              isHeroTop
                ? "text-[#E8DCC6]/75 hover:text-[#E8DCC6]"
                : pathname === "/about"
                ? "text-[#211C1D] font-semibold border-b-2 border-[#722F37] pb-0.5"
                : "text-[#211C1D]/75 hover:text-[#722F37]"
            }`}
          >
            About Us
          </Link>

          <Link
            href="/contact"
            className={`font-label text-xs tracking-widest uppercase transition-colors ${
              isHeroTop
                ? "text-[#E8DCC6]/75 hover:text-[#E8DCC6]"
                : pathname === "/contact"
                ? "text-[#211C1D] font-semibold border-b-2 border-[#722F37] pb-0.5"
                : "text-[#211C1D]/75 hover:text-[#722F37]"
            }`}
          >
            Contact Us
          </Link>
        </nav>

        {/* Action Controls */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Authentication State */}
          {user ? (
            <div className="relative" ref={userDropdownRef}>
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl transition-colors shadow-sm border ${
                  isHeroTop
                    ? "bg-[#E8DCC6]/10 border-[#E8DCC6]/20 text-[#E8DCC6]"
                    : "bg-white border-[#211C1D]/15 text-[#211C1D]"
                }`}
              >
                <div className="w-6 h-6 rounded-full bg-[#722F37] text-[#E8DCC6] font-bold text-xs flex items-center justify-center">
                  {user.displayName?.[0] || "C"}
                </div>
                <span className="text-xs font-heading font-medium">
                  {user.displayName || "Cadet"}
                </span>
                <ChevronDown className="w-3 h-3 opacity-60" />
              </button>

              {userDropdownOpen && (
                <div
                  className={`absolute right-0 top-full mt-2 w-56 rounded-2xl shadow-xl p-2 z-50 text-xs space-y-1 border ${
                    isHeroTop
                      ? "bg-[#211C1D] border-[#E8DCC6]/20 text-[#E8DCC6]"
                      : "bg-[#FAF7F2] border-[#211C1D]/15 text-[#211C1D]"
                  }`}
                >
                  <div className={`px-3 py-2 border-b ${isHeroTop ? "border-[#E8DCC6]/10" : "border-[#211C1D]/10"}`}>
                    <div className="font-heading font-semibold">{user.displayName || "Account"}</div>
                    <div className="text-[10px] opacity-70 font-label uppercase">
                      {user.role === "admin" ? "Academy Administrator" : (user.email || "Member")}
                    </div>
                  </div>
                  {user.role === "admin" && (
                    <Link
                      href="/admin"
                      onClick={() => setUserDropdownOpen(false)}
                      className="w-full flex items-center gap-2 px-3 py-2 font-semibold hover:bg-[#722F37]/15 rounded-lg transition-colors font-label uppercase tracking-wider text-[#722F37]"
                    >
                      <Shield className="w-3.5 h-3.5" />
                      <span>Admin Dashboard</span>
                    </Link>
                  )}
                  {user.role !== "admin" && (
                    <Link
                      href="/dashboard"
                      onClick={() => setUserDropdownOpen(false)}
                      className="w-full flex items-center gap-2 px-3 py-2 font-semibold hover:bg-[#722F37]/15 rounded-lg transition-colors font-label uppercase tracking-wider text-[#722F37]"
                    >
                      <LayoutDashboard className="w-3.5 h-3.5" />
                      <span>Student Dashboard</span>
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      logout();
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-rose-600 hover:bg-rose-500/10 rounded-lg transition-colors font-label uppercase tracking-wider"
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
              className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-label uppercase tracking-wider rounded-xl transition-all shadow-sm border ${
                isHeroTop
                  ? "text-[#E8DCC6] border-[#E8DCC6]/25 hover:bg-[#E8DCC6]/10"
                  : "text-[#211C1D] border-[#211C1D]/20 hover:bg-[#211C1D]/5"
              }`}
            >
              <LogIn className="w-3.5 h-3.5 text-[#722F37]" />
              <span>Student Login</span>
            </button>
          )}

          {/* Book Free Call Primary CTA */}
          <button
            onClick={() => openOrientation("general")}
            className="inline-flex items-center justify-center px-4 py-2 text-xs font-label uppercase tracking-widest font-bold text-[#E8DCC6] bg-[#722F37] hover:bg-[#8B3A44] rounded-xl shadow-sm hover:shadow-md transition-all active:scale-95"
          >
            Book a Free Call
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 rounded-xl border ${
              isHeroTop
                ? "bg-[#211C1D] text-[#E8DCC6] border-[#E8DCC6]/20"
                : "bg-white text-[#211C1D] border-[#211C1D]/15"
            }`}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div
          className={`lg:hidden border-b px-5 pt-4 pb-7 space-y-4 ${
            isHeroTop
              ? "bg-[#211C1D] text-[#E8DCC6] border-[#E8DCC6]/20"
              : "bg-[#FAF7F2] text-[#211C1D] border-[#211C1D]/15"
          }`}
        >
          <div className="flex flex-col space-y-3 font-label text-xs uppercase tracking-wider">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#722F37] py-1 border-b border-black/5"
            >
              Home
            </Link>

            <div className="py-1 border-b border-black/5 space-y-3">
              <span className="opacity-60 text-[10px]">Programs</span>
              <div className="space-y-2">
                {programs.map((prog) => (
                  <Link
                    key={prog.href}
                    href={prog.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
                      isHeroTop ? "bg-[#E8DCC6]/5 hover:bg-[#E8DCC6]/10" : "bg-white/80 hover:bg-white"
                    }`}
                  >
                    <div className={`w-9 h-9 rounded-lg ${prog.iconBg} flex items-center justify-center shrink-0`}>
                      {React.cloneElement(prog.icon, { className: "w-4 h-4" })}
                    </div>
                    <div>
                      <div className="font-heading font-semibold text-xs">{prog.name}</div>
                      <div className="text-[10px] opacity-70 normal-case tracking-normal">{prog.desc}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/resources"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#722F37] py-1 border-b border-black/5"
            >
              Study Materials
            </Link>

            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#722F37] py-1 border-b border-black/5"
            >
              About Us
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#722F37] py-1 border-b border-black/5"
            >
              Contact Us
            </Link>
          </div>

          <div className="pt-2 flex flex-col gap-2.5">
            {user ? (
              <div
                className={`p-3 rounded-xl border space-y-2 ${
                  isHeroTop ? "bg-[#E8DCC6]/5 border-[#E8DCC6]/15" : "bg-white border-[#211C1D]/10"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-heading">Logged in as {user.displayName}</span>
                  <button onClick={logout} className="text-xs text-rose-500 font-label uppercase">Sign Out</button>
                </div>
                {user.role === "admin" && (
                  <Link
                    href="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-center py-2 bg-[#722F37]/20 text-[#722F37] font-semibold text-xs rounded-lg font-label uppercase tracking-wider"
                  >
                    Go to Admin Dashboard
                  </Link>
                )}
                {user.role !== "admin" && (
                  <Link
                    href="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-center py-2 bg-[#722F37]/20 text-[#722F37] font-semibold text-xs rounded-lg font-label uppercase tracking-wider"
                  >
                    Go to Student Dashboard
                  </Link>
                )}
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openAuthModal("signin");
                }}
                className={`w-full py-2.5 text-center text-xs font-label uppercase tracking-wider rounded-xl border ${
                  isHeroTop
                    ? "border-[#E8DCC6]/30 text-[#E8DCC6] hover:bg-[#E8DCC6]/10"
                    : "border-[#211C1D]/20 text-[#211C1D] hover:bg-[#211C1D]/5"
                }`}
              >
                Student Login
              </button>
            )}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openOrientation("general");
              }}
              className="w-full py-3 text-center text-xs font-label uppercase tracking-widest font-bold text-[#E8DCC6] bg-[#722F37] hover:bg-[#8B3A44] rounded-xl shadow-md"
            >
              Book a Free Call
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
