import fs from "fs";
import path from "path";

export interface Enquiry {
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

export interface UserAccount {
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

export interface LoginLog {
  id: string;
  email: string;
  role: string;
  status: "success" | "failed";
  ip?: string;
  userAgent?: string;
  timestamp: string;
}

export interface DatabaseSchema {
  enquiries: Enquiry[];
  users: UserAccount[];
  login_logs: LoginLog[];
}

const DB_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DB_DIR, "database.json");

// Initial seed data so the administrator has immediate demonstration data
const initialData: DatabaseSchema = {
  enquiries: [
    {
      id: "ENQ-2025-001",
      name: "Abhinav Pratap Singh",
      phone: "+91 9876543210",
      email: "abhinav.pratap@gmail.com",
      program: "defense",
      source: "orientation_modal",
      message: "Aspirant for NDA-1 2026. Looking for daily structured mathematics and active recall mentorship.",
      status: "new",
      notes: "High potential. Class 12 PCM student. Needs NDA mathematics diagnostics.",
      createdAt: new Date(Date.now() - 3600 * 1000 * 3).toISOString(),
    },
    {
      id: "ENQ-2025-002",
      name: "Rhea Deshmukh",
      phone: "+91 9823456781",
      email: "rhea.deshmukh@yahoo.com",
      program: "scholars",
      source: "contact_page",
      message: "Class 11 CBSE student. Seeking study rhythm architecture and active recall routine to balance school exams with competitive track.",
      status: "contacted",
      notes: "Spoke with father. Orientation diagnostic scheduled for Tuesday 5 PM.",
      createdAt: new Date(Date.now() - 3600 * 1000 * 14).toISOString(),
    },
    {
      id: "ENQ-2025-003",
      name: "Vikramaditya Chouhan",
      phone: "+91 9711223344",
      email: "vikram.chouhan@gmail.com",
      program: "defense",
      source: "assessment_call",
      message: "CDS 2025 aspirant. Need specialized focus on General Knowledge and English syllabus mastery.",
      status: "enrolled",
      notes: "Enrolled in CDS Wing. Roll number OS-CDS-0482 assigned.",
      createdAt: new Date(Date.now() - 3600 * 1000 * 28).toISOString(),
    },
    {
      id: "ENQ-2025-004",
      name: "Col. Suresh Verma (Parent)",
      phone: "+91 9415012345",
      email: "suresh.verma@army.mil.in",
      program: "juniors",
      source: "contact_page",
      message: "Inquiring for son in Class 8. Want to instill daily reading habit, discipline routines, and early foundation for RIMC / NDA.",
      status: "in_progress",
      notes: "Shared Juniors charter brochure. Follow up on Thursday.",
      createdAt: new Date(Date.now() - 3600 * 1000 * 48).toISOString(),
    }
  ],
  users: [
    {
      uid: "user-admin-001",
      email: "admin@officium.academy",
      displayName: "Academy Director",
      role: "admin",
      rollNumber: "OS-DIR-001",
      createdAt: new Date(Date.now() - 3600 * 1000 * 240).toISOString(),
      lastLogin: new Date().toISOString(),
    },
    {
      uid: "user-cadet-001",
      email: "cadet.rohit@officium.academy",
      displayName: "Cadet Rohit Deshmukh",
      role: "cadet",
      rollNumber: "OS-NDA-2025",
      targetExam: "NDA-1 2025",
      phone: "+91 8969634656",
      createdAt: new Date(Date.now() - 3600 * 1000 * 72).toISOString(),
      lastLogin: new Date(Date.now() - 3600 * 1000 * 2).toISOString(),
    },
    {
      uid: "user-scholar-001",
      email: "aarav.sharma@officium.academy",
      displayName: "Aarav Sharma",
      role: "scholar",
      rollNumber: "OS-SCH-4019",
      targetExam: "Class 12 Boards & CUET",
      createdAt: new Date(Date.now() - 3600 * 1000 * 120).toISOString(),
      lastLogin: new Date(Date.now() - 3600 * 1000 * 5).toISOString(),
    }
  ],
  login_logs: [
    {
      id: "log-1",
      email: "admin@officium.academy",
      role: "admin",
      status: "success",
      userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
      timestamp: new Date().toISOString(),
    },
    {
      id: "log-2",
      email: "cadet.rohit@officium.academy",
      role: "cadet",
      status: "success",
      userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_4)",
      timestamp: new Date(Date.now() - 3600 * 1000 * 2).toISOString(),
    },
    {
      id: "log-3",
      email: "aarav.sharma@officium.academy",
      role: "scholar",
      status: "success",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      timestamp: new Date(Date.now() - 3600 * 1000 * 5).toISOString(),
    },
    {
      id: "log-4",
      email: "unknown@gmail.com",
      role: "cadet",
      status: "failed",
      userAgent: "Mozilla/5.0 (Android 14; Mobile)",
      timestamp: new Date(Date.now() - 3600 * 1000 * 8).toISOString(),
    }
  ]
};

// Ensure data directory and file exist
function initDB(): DatabaseSchema {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }

  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), "utf-8");
    return initialData;
  }

  try {
    const raw = fs.readFileSync(DB_FILE, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), "utf-8");
    return initialData;
  }
}

// Thread-safe write helper
function writeDB(data: DatabaseSchema): void {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }
  const tempFile = `${DB_FILE}.tmp.${Date.now()}`;
  fs.writeFileSync(tempFile, JSON.stringify(data, null, 2), "utf-8");
  fs.renameSync(tempFile, DB_FILE);
}

// --- Enquiry Repository Methods ---

export function getAllEnquiries(filter?: { program?: string; status?: string; search?: string }): Enquiry[] {
  const db = initDB();
  let list = db.enquiries || [];

  if (filter?.program && filter.program !== "all") {
    list = list.filter((e) => e.program === filter.program);
  }

  if (filter?.status && filter.status !== "all") {
    list = list.filter((e) => e.status === filter.status);
  }

  if (filter?.search) {
    const q = filter.search.toLowerCase();
    list = list.filter(
      (e) =>
        e.name.toLowerCase().includes(q) ||
        e.phone.toLowerCase().includes(q) ||
        e.email.toLowerCase().includes(q) ||
        e.message.toLowerCase().includes(q) ||
        (e.notes && e.notes.toLowerCase().includes(q))
    );
  }

  // Sort descending by date
  return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function createEnquiry(
  payload: Omit<Enquiry, "id" | "createdAt" | "status"> & { status?: Enquiry["status"] }
): Enquiry {
  const db = initDB();
  const year = new Date().getFullYear();
  const count = (db.enquiries.length + 1).toString().padStart(3, "0");
  const newEnquiry: Enquiry = {
    ...payload,
    id: `ENQ-${year}-${count}`,
    status: payload.status || "new",
    createdAt: new Date().toISOString(),
  };

  db.enquiries.unshift(newEnquiry);
  writeDB(db);
  return newEnquiry;
}

export function updateEnquiryStatus(
  id: string,
  status: Enquiry["status"],
  notes?: string
): Enquiry | null {
  const db = initDB();
  const index = db.enquiries.findIndex((e) => e.id === id);
  if (index === -1) return null;

  db.enquiries[index].status = status;
  if (notes !== undefined) {
    db.enquiries[index].notes = notes;
  }

  writeDB(db);
  return db.enquiries[index];
}

export function deleteEnquiry(id: string): boolean {
  const db = initDB();
  const initialLen = db.enquiries.length;
  db.enquiries = db.enquiries.filter((e) => e.id !== id);
  if (db.enquiries.length !== initialLen) {
    writeDB(db);
    return true;
  }
  return false;
}

// --- User Accounts Repository Methods ---

export function getAllUsers(): UserAccount[] {
  const db = initDB();
  return (db.users || []).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function recordUser(user: {
  uid: string;
  email: string;
  displayName: string;
  role: UserAccount["role"];
  rollNumber: string;
  phone?: string;
  targetExam?: string;
}): UserAccount {
  const db = initDB();
  const existingIdx = db.users.findIndex((u) => u.email === user.email || u.uid === user.uid);

  if (existingIdx >= 0) {
    db.users[existingIdx] = {
      ...db.users[existingIdx],
      ...user,
      lastLogin: new Date().toISOString(),
    };
    writeDB(db);
    return db.users[existingIdx];
  }

  const newUser: UserAccount = {
    ...user,
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString(),
  };

  db.users.unshift(newUser);
  writeDB(db);
  return newUser;
}

// --- Login Logs Repository Methods ---

export function getLoginLogs(limit = 50): LoginLog[] {
  const db = initDB();
  return (db.login_logs || [])
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, limit);
}

export function logLoginActivity(entry: {
  email: string;
  role: string;
  status: "success" | "failed";
  userAgent?: string;
  ip?: string;
}): LoginLog {
  const db = initDB();
  const newLog: LoginLog = {
    id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
    ...entry,
    timestamp: new Date().toISOString(),
  };

  if (!db.login_logs) db.login_logs = [];
  db.login_logs.unshift(newLog);

  // Keep latest 500 logs max
  if (db.login_logs.length > 500) {
    db.login_logs = db.login_logs.slice(0, 500);
  }

  writeDB(db);
  return newLog;
}

// --- Dashboard KPI Stats ---

export function getAcademyStats() {
  const db = initDB();
  const enquiries = db.enquiries || [];
  const users = db.users || [];
  const logs = db.login_logs || [];

  const newEnquiries = enquiries.filter((e) => e.status === "new").length;
  const contactedEnquiries = enquiries.filter((e) => e.status === "contacted" || e.status === "in_progress").length;
  const enrolledEnquiries = enquiries.filter((e) => e.status === "enrolled").length;

  const orientationBookings = enquiries.filter((e) => e.source === "orientation_modal").length;
  const contactMessages = enquiries.filter((e) => e.source === "contact_page").length;

  const totalCadets = users.filter((u) => u.role === "cadet").length;
  const totalScholars = users.filter((u) => u.role === "scholar").length;
  const totalJuniors = users.filter((u) => u.role === "junior").length;

  const recentLoginsCount = logs.filter(
    (l) => new Date(l.timestamp).getTime() > Date.now() - 24 * 3600 * 1000
  ).length;

  return {
    totalEnquiries: enquiries.length,
    newEnquiries,
    contactedEnquiries,
    enrolledEnquiries,
    orientationBookings,
    contactMessages,
    totalUsers: users.length,
    totalCadets,
    totalScholars,
    totalJuniors,
    recentLoginsCount,
  };
}
