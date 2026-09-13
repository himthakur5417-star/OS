"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import {
  Users,
  MessageSquare,
  Shield,
  Phone,
  Mail,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Search,
  Filter,
  Download,
  Plus,
  RefreshCw,
  LogOut,
  ExternalLink,
  ChevronDown,
  Trash2,
  FileText,
  UserCheck,
  Zap,
  Tag
} from "lucide-react";

interface Enquiry {
  id: string;
  name: string;
  phone: string;
  email: string;
  program: "defense" | "scholars" | "juniors" | "general";
  source: "contact_page" | "orientation_modal" | "assessment_call" | "manual_entry";
  message: string;
  status: "new" | "contacted" | "in_progress" | "enrolled" | "archived";
  notes?: string;
  createdAt: string;
}

interface UserAccount {
  uid: string;
  email: string;
  displayName: string;
  role: "admin" | "cadet" | "scholar" | "junior" | "parent";
  rollNumber: string;
  phone?: string;
  targetExam?: string;
  createdAt: string;
  lastLogin: string;
}

interface LoginLog {
  id: string;
  email: string;
  role: string;
  status: "success" | "failed";
  userAgent?: string;
  timestamp: string;
}

interface Stats {
  totalEnquiries: number;
  newEnquiries: number;
  contactedEnquiries: number;
  enrolledEnquiries: number;
  orientationBookings: number;
  contactMessages: number;
  totalUsers: number;
  totalCadets: number;
  totalScholars: number;
  totalJuniors: number;
  recentLoginsCount: number;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [stats, setStats] = useState<Stats | null>(null);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [users, setUsers] = useState<UserAccount[]>([]);
  const [logs, setLogs] = useState<LoginLog[]>([]);

  // Active Tab
  const [activeTab, setActiveTab] = useState<"enquiries" | "users" | "logs" | "new-lead">("enquiries");

  // Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [programFilter, setProgramFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Editing Note Modal
  const [editingNoteEnquiry, setEditingNoteEnquiry] = useState<Enquiry | null>(null);
  const [currentNote, setCurrentNote] = useState("");

  // New Lead Form State
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newProgram, setNewProgram] = useState("defense");
  const [newMessage, setNewMessage] = useState("");
  const [newStatus, setNewStatus] = useState("new");
  const [leadCreatedSuccess, setLeadCreatedSuccess] = useState(false);

  const getAdminHeaders = (extra: Record<string, string> = {}) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("os_admin_token") : null;
    const headers: Record<string, string> = { ...extra };
    if (token) {
      headers["x-admin-token"] = token;
      headers["Authorization"] = `Bearer ${token}`;
    }
    return headers;
  };

  // Check auth and load data
  const loadDashboardData = async () => {
    try {
      // 1. Verify session
      const authRes = await fetch("/api/admin/auth", {
        headers: getAdminHeaders(),
      });
      if (!authRes.ok) {
        router.push("/admin/login");
        return;
      }

      // 2. Fetch Stats
      const statsRes = await fetch("/api/admin/stats", {
        headers: getAdminHeaders(),
      });
      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData.stats);
      }

      // 3. Fetch Enquiries
      const enqRes = await fetch("/api/admin/enquiries", {
        headers: getAdminHeaders(),
      });
      if (enqRes.ok) {
        const enqData = await enqRes.json();
        setEnquiries(enqData.enquiries || []);
      }

      // 4. Fetch Users
      const usersRes = await fetch("/api/admin/users", {
        headers: getAdminHeaders(),
      });
      if (usersRes.ok) {
        const usersData = await usersRes.json();
        setUsers(usersData.users || []);
      }

      // 5. Fetch Logs
      const logsRes = await fetch("/api/admin/logs?limit=50", {
        headers: getAdminHeaders(),
      });
      if (logsRes.ok) {
        const logsData = await logsRes.json();
        setLogs(logsData.logs || []);
      }

      setLoading(false);
    } catch (e) {
      router.push("/admin/login");
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadDashboardData();
    setRefreshing(false);
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth", {
        method: "DELETE",
        headers: getAdminHeaders(),
      });
    } catch (e) {
      // ignore
    }
    if (typeof window !== "undefined") {
      localStorage.removeItem("os_admin_token");
    }
    router.push("/admin/login");
  };

  const handleStatusChange = async (id: string, newStatus: Enquiry["status"]) => {
    try {
      const res = await fetch("/api/admin/enquiries", {
        method: "PATCH",
        headers: getAdminHeaders({ "Content-Type": "application/json" }),
        body: JSON.stringify({ id, status: newStatus }),
      });

      if (res.ok) {
        setEnquiries((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
        );
        // Refresh stats
        const statsRes = await fetch("/api/admin/stats", {
          headers: getAdminHeaders(),
        });
        if (statsRes.ok) {
          const statsData = await statsRes.json();
          setStats(statsData.stats);
        }
      }
    } catch (e) {
      console.error("Failed to update status", e);
    }
  };

  const handleSaveNotes = async () => {
    if (!editingNoteEnquiry) return;
    try {
      const res = await fetch("/api/admin/enquiries", {
        method: "PATCH",
        headers: getAdminHeaders({ "Content-Type": "application/json" }),
        body: JSON.stringify({
          id: editingNoteEnquiry.id,
          status: editingNoteEnquiry.status,
          notes: currentNote,
        }),
      });

      if (res.ok) {
        setEnquiries((prev) =>
          prev.map((item) =>
            item.id === editingNoteEnquiry.id ? { ...item, notes: currentNote } : item
          )
        );
        setEditingNoteEnquiry(null);
      }
    } catch (e) {
      console.error("Failed to save notes", e);
    }
  };

  const handleDeleteEnquiry = async (id: string) => {
    if (!confirm("Are you sure you want to delete this enquiry record?")) return;
    try {
      const res = await fetch(`/api/admin/enquiries?id=${id}`, {
        method: "DELETE",
        headers: getAdminHeaders(),
      });
      if (res.ok) {
        setEnquiries((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (e) {
      console.error("Failed to delete enquiry", e);
    }
  };

  const handleCreateManualLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newPhone) return;

    try {
      const res = await fetch("/api/admin/enquiries", {
        method: "POST",
        headers: getAdminHeaders({ "Content-Type": "application/json" }),
        body: JSON.stringify({
          name: newName,
          phone: newPhone,
          email: newEmail,
          program: newProgram,
          message: newMessage || "Manual lead entry via Admin Command",
          status: newStatus,
        }),
      });

      if (res.ok) {
        setLeadCreatedSuccess(true);
        setNewName("");
        setNewPhone("");
        setNewEmail("");
        setNewMessage("");
        await loadDashboardData();
        setTimeout(() => {
          setLeadCreatedSuccess(false);
          setActiveTab("enquiries");
        }, 1200);
      }
    } catch (e) {
      console.error("Failed to create manual lead", e);
    }
  };

  // Export to CSV Functionality
  const handleExportCSV = () => {
    if (!enquiries.length) return;

    const headers = ["ID", "Name", "Phone", "Email", "Program", "Source", "Status", "Message", "Notes", "Created At"];
    const rows = filteredEnquiries.map((e) => [
      `"${e.id}"`,
      `"${e.name.replace(/"/g, '""')}"`,
      `"${e.phone}"`,
      `"${e.email}"`,
      `"${e.program}"`,
      `"${e.source}"`,
      `"${e.status}"`,
      `"${e.message.replace(/"/g, '""')}"`,
      `"${(e.notes || "").replace(/"/g, '""')}"`,
      `"${new Date(e.createdAt).toLocaleString()}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `officium-enquiries-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered enquiries logic
  const filteredEnquiries = enquiries.filter((item) => {
    const matchesProgram = programFilter === "all" || item.program === programFilter;
    const matchesStatus = statusFilter === "all" || item.status === statusFilter;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !searchQuery ||
      item.name.toLowerCase().includes(q) ||
      item.phone.toLowerCase().includes(q) ||
      item.email.toLowerCase().includes(q) ||
      item.message.toLowerCase().includes(q) ||
      (item.notes && item.notes.toLowerCase().includes(q));

    return matchesProgram && matchesStatus && matchesSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-[#C8A84E] mx-auto animate-pulse p-2.5">
            <Logo size="xs" showText={false} variant="gold" />
          </div>
          <div className="font-heading font-semibold text-lg text-[#0B192C]">Loading Academy Database...</div>
          <div className="text-xs font-label uppercase tracking-widest text-slate-400">Authenticating Terminal Session</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#0F172A] flex flex-col font-sans">
      {/* ========================================================================= */}
      {/* 1. TOP COMMAND BAR                                                        */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="inline-block transition-transform hover:scale-[1.02]">
              <Logo variant="light" size="sm" />
            </Link>
            <div className="h-5 w-[1px] bg-slate-200 hidden sm:block" />
            <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-md bg-amber-50/80 border border-amber-200/60 text-[10px] font-label uppercase tracking-widest text-amber-900 font-semibold">
              <Shield className="w-3 h-3 text-[#C8A84E]" />
              <span>Director Command</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin text-[#C8A84E]" : ""}`} />
            </button>

            <Link
              href="/"
              target="_blank"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-label uppercase tracking-wider text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors border border-slate-200/60"
            >
              <span>Public Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-label uppercase tracking-wider text-rose-600 hover:bg-rose-50 rounded-xl transition-colors border border-rose-200/60"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. MAIN ADMIN CONTENT CONTAINER                                           */}
      {/* ========================================================================= */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-heading text-2xl sm:text-3xl font-semibold text-[#0B192C]">
              Central Operations &amp; Enquiries Database
            </h1>
            <p className="text-xs text-slate-500 font-label uppercase tracking-wider mt-1">
              Officium Supremum • Real-time Academy Records &amp; Cadet Directory
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("new-lead")}
              className="px-4 py-2.5 bg-[#0B192C] hover:bg-[#1E293B] text-white font-label font-bold text-xs uppercase tracking-wider rounded-xl shadow-sm transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4 text-[#C8A84E]" />
              <span>Record Manual Inquiry</span>
            </button>
            <button
              onClick={handleExportCSV}
              className="px-4 py-2.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-label font-semibold text-xs uppercase tracking-wider rounded-xl shadow-xs transition-all flex items-center gap-2"
            >
              <Download className="w-4 h-4 text-slate-500" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. KPI SUMMARY CARDS                                                      */}
        {/* ========================================================================= */}
        {stats && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Card 1: Total Enquiries */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-xs font-label uppercase tracking-wider text-slate-500">
                <span>Total Enquiries</span>
                <MessageSquare className="w-4 h-4 text-sky-600" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-heading text-3xl font-bold text-[#0B192C]">{stats.totalEnquiries}</span>
                {stats.newEnquiries > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-label font-bold bg-amber-100 text-amber-800">
                    {stats.newEnquiries} NEW
                  </span>
                )}
              </div>
              <div className="text-[11px] text-slate-500">
                {stats.enrolledEnquiries} Enrolled • {stats.contactedEnquiries} Contacted
              </div>
            </div>

            {/* Card 2: Orientation Assessment Requests */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-xs font-label uppercase tracking-wider text-slate-500">
                <span>Orientation Calls</span>
                <Calendar className="w-4 h-4 text-amber-600" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-heading text-3xl font-bold text-[#0B192C]">{stats.orientationBookings}</span>
                <span className="text-xs text-slate-400">bookings</span>
              </div>
              <div className="text-[11px] text-slate-500">
                Direct diagnostic call requests
              </div>
            </div>

            {/* Card 3: Registered Cadets & Scholars */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-xs font-label uppercase tracking-wider text-slate-500">
                <span>Active Accounts</span>
                <Users className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-heading text-3xl font-bold text-[#0B192C]">{stats.totalUsers}</span>
                <span className="text-xs text-slate-400">users</span>
              </div>
              <div className="text-[11px] text-slate-500">
                {stats.totalCadets} Cadets • {stats.totalScholars} Scholars
              </div>
            </div>

            {/* Card 4: 24h Login Security Activity */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-xs font-label uppercase tracking-wider text-slate-500">
                <span>24h Logins</span>
                <Zap className="w-4 h-4 text-[#C8A84E]" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-heading text-3xl font-bold text-[#0B192C]">{stats.recentLoginsCount}</span>
                <span className="text-xs text-slate-400">events</span>
              </div>
              <div className="text-[11px] text-slate-500">
                Real-time security log active
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 4. DASHBOARD NAVIGATION TABS                                              */}
        {/* ========================================================================= */}
        <div className="flex items-center gap-2 border-b border-slate-200">
          <button
            onClick={() => setActiveTab("enquiries")}
            className={`pb-3 px-4 text-xs font-label uppercase tracking-wider transition-all relative ${
              activeTab === "enquiries"
                ? "text-[#0B192C] font-bold border-b-2 border-[#C8A84E]"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <span>All Enquiries &amp; Leads ({enquiries.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("users")}
            className={`pb-3 px-4 text-xs font-label uppercase tracking-wider transition-all relative ${
              activeTab === "users"
                ? "text-[#0B192C] font-bold border-b-2 border-[#C8A84E]"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <span>Cadet &amp; User Directory ({users.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("logs")}
            className={`pb-3 px-4 text-xs font-label uppercase tracking-wider transition-all relative ${
              activeTab === "logs"
                ? "text-[#0B192C] font-bold border-b-2 border-[#C8A84E]"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <span>Login Audit Logs ({logs.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("new-lead")}
            className={`pb-3 px-4 text-xs font-label uppercase tracking-wider transition-all relative ${
              activeTab === "new-lead"
                ? "text-[#0B192C] font-bold border-b-2 border-[#C8A84E]"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <span>+ Add Lead Entry</span>
          </button>
        </div>

        {/* ========================================================================= */}
        {/* 5. TAB 1: ENQUIRIES DATA TABLE                                            */}
        {/* ========================================================================= */}
        {activeTab === "enquiries" && (
          <div className="space-y-4">
            {/* Search & Filter Bar */}
            <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-center gap-3">
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by student name, phone number, email, or keywords..."
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-[#C8A84E] font-sans"
                />
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto">
                <select
                  value={programFilter}
                  onChange={(e) => setProgramFilter(e.target.value)}
                  className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-label uppercase tracking-wider text-slate-700 focus:outline-none"
                >
                  <option value="all">All Programs</option>
                  <option value="defense">Defense (NDA/CDS/AFCAT)</option>
                  <option value="scholars">Scholars (Class 11-12)</option>
                  <option value="juniors">Juniors (Class 7-10)</option>
                  <option value="general">General Academy</option>
                </select>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-label uppercase tracking-wider text-slate-700 focus:outline-none"
                >
                  <option value="all">All Statuses</option>
                  <option value="new">🟢 New</option>
                  <option value="in_progress">🟡 In Progress</option>
                  <option value="contacted">📞 Contacted</option>
                  <option value="enrolled">🎓 Enrolled</option>
                  <option value="archived">⚪ Archived</option>
                </select>
              </div>
            </div>

            {/* Enquiries Table */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 font-label uppercase tracking-wider text-slate-500">
                    <tr>
                      <th className="py-3 px-4 font-semibold">Lead ID / Date</th>
                      <th className="py-3 px-4 font-semibold">Candidate Info</th>
                      <th className="py-3 px-4 font-semibold">Track / Program</th>
                      <th className="py-3 px-4 font-semibold">Source</th>
                      <th className="py-3 px-4 font-semibold">Status</th>
                      <th className="py-3 px-4 font-semibold">Inquiry Message</th>
                      <th className="py-3 px-4 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredEnquiries.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-12 text-center text-slate-400">
                          <MessageSquare className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                          <div>No enquiries found matching your criteria.</div>
                        </td>
                      </tr>
                    ) : (
                      filteredEnquiries.map((enq) => {
                        const statusColors: Record<string, string> = {
                          new: "bg-emerald-50 text-emerald-800 border-emerald-200",
                          in_progress: "bg-amber-50 text-amber-800 border-amber-200",
                          contacted: "bg-blue-50 text-blue-800 border-blue-200",
                          enrolled: "bg-indigo-50 text-indigo-800 border-indigo-200",
                          archived: "bg-slate-100 text-slate-600 border-slate-200",
                        };

                        const programLabels: Record<string, string> = {
                          defense: "Defense Wing (NDA/CDS)",
                          scholars: "Scholars (Class 11-12)",
                          juniors: "Juniors (Class 7-10)",
                          general: "General Admissions",
                        };

                        const sourceLabels: Record<string, string> = {
                          contact_page: "Contact Page",
                          orientation_modal: "Orientation Booking",
                          assessment_call: "Assessment Diagnostic",
                          manual_entry: "Admin Staff Entry",
                        };

                        return (
                          <tr key={enq.id} className="hover:bg-slate-50/60 transition-colors">
                            {/* ID & Date */}
                            <td className="py-3.5 px-4 font-mono whitespace-nowrap">
                              <div className="font-semibold text-slate-900">{enq.id}</div>
                              <div className="text-[10px] text-slate-400">
                                {new Date(enq.createdAt).toLocaleDateString()}
                              </div>
                            </td>

                            {/* Candidate Info */}
                            <td className="py-3.5 px-4">
                              <div className="font-semibold text-[#0B192C]">{enq.name}</div>
                              <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-600">
                                <a
                                  href={`tel:${enq.phone}`}
                                  className="hover:text-blue-600 flex items-center gap-1 font-mono"
                                >
                                  <Phone className="w-3 h-3 text-slate-400" />
                                  <span>{enq.phone}</span>
                                </a>
                              </div>
                              {enq.email && (
                                <div className="text-[10px] text-slate-400 truncate max-w-[160px]">
                                  {enq.email}
                                </div>
                              )}
                            </td>

                            {/* Program */}
                            <td className="py-3.5 px-4 whitespace-nowrap">
                              <span className="px-2.5 py-1 rounded-md text-[10px] font-label uppercase tracking-wider font-semibold bg-slate-100 text-slate-700">
                                {programLabels[enq.program] || enq.program}
                              </span>
                            </td>

                            {/* Source */}
                            <td className="py-3.5 px-4 whitespace-nowrap text-[11px] text-slate-600">
                              {sourceLabels[enq.source] || enq.source}
                            </td>

                            {/* Status Selector */}
                            <td className="py-3.5 px-4 whitespace-nowrap">
                              <select
                                value={enq.status}
                                onChange={(e) =>
                                  handleStatusChange(enq.id, e.target.value as Enquiry["status"])
                                }
                                className={`px-2 py-1 rounded-md text-[10px] font-label uppercase tracking-wider font-semibold border focus:outline-none cursor-pointer ${
                                  statusColors[enq.status] || "bg-slate-100"
                                }`}
                              >
                                <option value="new">New</option>
                                <option value="in_progress">In Progress</option>
                                <option value="contacted">Contacted</option>
                                <option value="enrolled">Enrolled</option>
                                <option value="archived">Archived</option>
                              </select>
                            </td>

                            {/* Message & Mentor Notes */}
                            <td className="py-3.5 px-4 max-w-xs">
                              <div className="text-slate-700 font-sans line-clamp-2">{enq.message}</div>
                              {enq.notes && (
                                <div className="mt-1 text-[11px] text-amber-800 bg-amber-50/70 p-1 rounded border border-amber-200/50 italic">
                                  Note: {enq.notes}
                                </div>
                              )}
                            </td>

                            {/* Actions */}
                            <td className="py-3.5 px-4 whitespace-nowrap">
                              <div className="flex items-center gap-1.5">
                                {/* Direct WhatsApp */}
                                <a
                                  href={`https://wa.me/${enq.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                                    `Hello ${enq.name}, this is the Admissions Director from Officium Supremum regarding your enquiry for the ${programLabels[enq.program]}.`
                                  )}`}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50"
                                  title="Chat on WhatsApp"
                                >
                                  <Phone className="w-3.5 h-3.5" />
                                </a>

                                {/* Add / Edit Notes */}
                                <button
                                  onClick={() => {
                                    setEditingNoteEnquiry(enq);
                                    setCurrentNote(enq.notes || "");
                                  }}
                                  className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100"
                                  title="Add/Edit Mentor Note"
                                >
                                  <FileText className="w-3.5 h-3.5" />
                                </button>

                                {/* Delete */}
                                <button
                                  onClick={() => handleDeleteEnquiry(enq.id)}
                                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                                  title="Delete Lead"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 6. TAB 2: USER DIRECTORY                                                  */}
        {/* ========================================================================= */}
        {activeTab === "users" && (
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-heading font-semibold text-base text-[#0B192C]">
                  Cadet, Scholar &amp; User Accounts
                </h3>
                <p className="text-xs text-slate-500 font-label uppercase tracking-wider">
                  Active portal credentials and roll numbers
                </p>
              </div>
              <span className="text-xs font-label uppercase font-bold text-[#C8A84E]">
                {users.length} Registered Accounts
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 font-label uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="py-3 px-4 font-semibold">Roll Number</th>
                    <th className="py-3 px-4 font-semibold">Full Name</th>
                    <th className="py-3 px-4 font-semibold">Email</th>
                    <th className="py-3 px-4 font-semibold">Role Track</th>
                    <th className="py-3 px-4 font-semibold">Created Date</th>
                    <th className="py-3 px-4 font-semibold">Last Active</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {users.map((u) => {
                    const roleColors: Record<string, string> = {
                      admin: "bg-amber-100 text-amber-900",
                      cadet: "bg-emerald-100 text-emerald-900",
                      scholar: "bg-blue-100 text-blue-900",
                      junior: "bg-purple-100 text-purple-900",
                      parent: "bg-slate-100 text-slate-900",
                    };

                    return (
                      <tr key={u.uid} className="hover:bg-slate-50/60">
                        <td className="py-3.5 px-4 font-mono font-semibold text-slate-900">
                          {u.rollNumber}
                        </td>
                        <td className="py-3.5 px-4 font-medium text-[#0B192C]">
                          {u.displayName}
                        </td>
                        <td className="py-3.5 px-4 text-slate-600 font-mono text-[11px]">
                          {u.email}
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-label uppercase tracking-wider font-semibold ${
                              roleColors[u.role] || "bg-slate-100"
                            }`}
                          >
                            {u.role}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">
                          {new Date(u.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">
                          {new Date(u.lastLogin).toLocaleString()}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 7. TAB 3: LOGIN SECURITY AUDIT LOGS                                       */}
        {/* ========================================================================= */}
        {activeTab === "logs" && (
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-heading font-semibold text-base text-[#0B192C]">
                  Security &amp; Login Audit Trail
                </h3>
                <p className="text-xs text-slate-500 font-label uppercase tracking-wider">
                  Authentication history and device verification
                </p>
              </div>
              <span className="text-xs font-label uppercase font-bold text-emerald-700 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Live Audit Active
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 font-label uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="py-3 px-4 font-semibold">Timestamp</th>
                    <th className="py-3 px-4 font-semibold">Account Email</th>
                    <th className="py-3 px-4 font-semibold">Role</th>
                    <th className="py-3 px-4 font-semibold">Authentication Status</th>
                    <th className="py-3 px-4 font-semibold">Client / Device Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {logs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50/60 font-mono text-[11px]">
                      <td className="py-3 px-4 text-slate-500 whitespace-nowrap">
                        {new Date(log.timestamp).toLocaleString()}
                      </td>
                      <td className="py-3 px-4 font-semibold text-slate-800">
                        {log.email}
                      </td>
                      <td className="py-3 px-4 uppercase text-[10px] text-slate-600">
                        {log.role}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        {log.status === "success" ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-semibold text-[10px]">
                            <CheckCircle2 className="w-3 h-3" />
                            SUCCESS
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 font-semibold text-[10px]">
                            <AlertCircle className="w-3 h-3" />
                            FAILED
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-slate-500 font-sans text-[11px] truncate max-w-sm">
                        {log.userAgent || "Web Client"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 8. TAB 4: MANUAL LEAD ENTRY FORM                                          */}
        {/* ========================================================================= */}
        {activeTab === "new-lead" && (
          <div className="max-w-2xl bg-white rounded-3xl border border-slate-200/80 shadow-xs p-8 space-y-6">
            <div>
              <h3 className="font-heading font-semibold text-xl text-[#0B192C]">
                Record Direct Candidate Inquiry
              </h3>
              <p className="text-xs text-slate-500 font-label uppercase tracking-wider mt-1">
                Log phone calls, WhatsApp inquiries, or walk-in candidates into central database
              </p>
            </div>

            {leadCreatedSuccess && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Candidate inquiry saved successfully! Redirecting to table...</span>
              </div>
            )}

            <form onSubmit={handleCreateManualLead} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-label uppercase tracking-wider text-slate-700 mb-1">
                    Candidate Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="e.g. Cadet Aryan Singh"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-[#C8A84E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-label uppercase tracking-wider text-slate-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    placeholder="+91 9876543210"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-[#C8A84E]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-label uppercase tracking-wider text-slate-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="candidate@gmail.com"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-[#C8A84E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-label uppercase tracking-wider text-slate-700 mb-1">
                    Target Track / Program
                  </label>
                  <select
                    value={newProgram}
                    onChange={(e) => setNewProgram(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-label uppercase tracking-wider text-slate-700 focus:outline-none"
                  >
                    <option value="defense">Defense Leadership (NDA, CDS, AFCAT)</option>
                    <option value="scholars">Scholars Program (Class 11–12)</option>
                    <option value="juniors">Juniors Program (Class 7–10)</option>
                    <option value="general">General Academy Orientation</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-label uppercase tracking-wider text-slate-700 mb-1">
                  Inquiry Background &amp; Notes
                </label>
                <textarea
                  rows={3}
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Details of student aspirations, current school/exam year, or diagnostic notes..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-[#C8A84E] font-sans"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#0B192C] hover:bg-[#1E293B] text-white font-label font-bold text-xs uppercase tracking-widest rounded-xl shadow-sm transition-all"
                >
                  Save Inquiry to Database
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("enquiries")}
                  className="px-4 py-3 text-slate-500 hover:text-slate-800 text-xs font-label uppercase"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </main>

      {/* ========================================================================= */}
      {/* 9. MENTOR NOTE MODAL DIALOG                                              */}
      {/* ========================================================================= */}
      {editingNoteEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/35 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-4 shadow-xl border border-slate-200">
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-semibold text-lg text-[#0B192C]">
                Mentor Notes for {editingNoteEnquiry.name}
              </h3>
              <button
                onClick={() => setEditingNoteEnquiry(null)}
                className="text-slate-400 hover:text-slate-700 text-sm"
              >
                ✕
              </button>
            </div>

            <textarea
              rows={4}
              value={currentNote}
              onChange={(e) => setCurrentNote(e.target.value)}
              placeholder="Record diagnostic outcome, scheduled orientation dates, or admissions remarks..."
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-[#C8A84E] font-sans"
            />

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setEditingNoteEnquiry(null)}
                className="px-4 py-2 text-xs font-label uppercase text-slate-500 hover:text-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveNotes}
                className="px-5 py-2 bg-[#0B192C] text-white font-label font-bold text-xs uppercase tracking-wider rounded-xl shadow-xs"
              >
                Save Note
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
