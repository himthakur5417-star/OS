import fs from "fs";
import path from "path";

export interface Enquiry {
  id: string;
  name: string;
  phone: string;
  email: string;
  program: "defense" | "scholars" | "juniors" | "general" | "nda" | "cds" | "afcat" | string;
  source: "contact_page" | "orientation_modal" | "assessment_call" | "manual_entry" | string;
  message: string;
  status: "new" | "contacted" | "in_progress" | "enrolled" | "archived";
  notes?: string;
  createdAt: string;
}

export interface UserAccount {
  uid: string;
  email: string;
  displayName: string;
  role: "admin" | "user" | string;
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

export interface TrafficLog {
  id: string;
  path: string;
  userEmail?: string;
  role?: string;
  ip?: string;
  userAgent?: string;
  referrer?: string;
  timestamp: string;
}

export interface DatabaseSchema {
  enquiries: Enquiry[];
  users: UserAccount[];
  login_logs: LoginLog[];
  traffic_logs?: TrafficLog[];
}

const DB_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DB_DIR, "database.json");
const SQL_FILE = path.join(DB_DIR, "traffic_and_logins.sql");
const CSV_FILE = path.join(DB_DIR, "traffic_and_logins.csv");

// Initial schema structure (clean with zero dummy data)
const initialData: DatabaseSchema = {
  enquiries: [],
  users: [],
  login_logs: [],
  traffic_logs: []
};



// Ensure data directory and file exist
function initDB(): DatabaseSchema {
  try {
    if (!fs.existsSync(DB_DIR)) {
      try { fs.mkdirSync(DB_DIR, { recursive: true }); } catch {}
    }

    if (!fs.existsSync(DB_FILE)) {
      try {
        fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), "utf-8");
      } catch {}
      return initialData;
    }

    const raw = fs.readFileSync(DB_FILE, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    return initialData;
  }
}

function escapeSql(val: any): string {
  if (val === null || val === undefined) return "NULL";
  return `'${String(val).replace(/'/g, "''")}'`;
}

function escapeCsv(val: any): string {
  if (val === null || val === undefined) return '""';
  const str = String(val).replace(/"/g, '""');
  return `"${str}"`;
}

function syncSqlAndCsvFiles(data: DatabaseSchema): void {
  try {
    // 1. Generate SQL File
    let sql = `-- =========================================================================\n` +
      `-- OFFICIUM SUPREMUM: CENTRAL AUDIT & TRAFFIC DATABASE AUTO-EXPORT\n` +
      `-- File: data/traffic_and_logins.sql\n` +
      `-- Generated at: ${new Date().toISOString()}\n` +
      `-- =========================================================================\n\n` +
      `CREATE TABLE IF NOT EXISTS users (\n` +
      `  uid VARCHAR(255) PRIMARY KEY,\n` +
      `  email VARCHAR(255),\n` +
      `  display_name VARCHAR(255),\n` +
      `  role VARCHAR(50),\n` +
      `  roll_number VARCHAR(100),\n` +
      `  created_at TIMESTAMP,\n` +
      `  last_login TIMESTAMP\n` +
      `);\n\n` +
      `CREATE TABLE IF NOT EXISTS login_logs (\n` +
      `  id VARCHAR(255) PRIMARY KEY,\n` +
      `  email VARCHAR(255),\n` +
      `  role VARCHAR(50),\n` +
      `  status VARCHAR(50),\n` +
      `  ip VARCHAR(100),\n` +
      `  user_agent TEXT,\n` +
      `  timestamp TIMESTAMP\n` +
      `);\n\n` +
      `CREATE TABLE IF NOT EXISTS traffic_logs (\n` +
      `  id VARCHAR(255) PRIMARY KEY,\n` +
      `  path VARCHAR(255),\n` +
      `  user_email VARCHAR(255),\n` +
      `  role VARCHAR(50),\n` +
      `  ip VARCHAR(100),\n` +
      `  user_agent TEXT,\n` +
      `  referrer VARCHAR(255),\n` +
      `  timestamp TIMESTAMP\n` +
      `);\n\n` +
      `-- USER DIRECTORY\n`;

    for (const u of data.users || []) {
      sql += `INSERT INTO users (uid, email, display_name, role, roll_number, created_at, last_login) ` +
        `VALUES (${escapeSql(u.uid)}, ${escapeSql(u.email)}, ${escapeSql(u.displayName)}, ${escapeSql(u.role)}, ${escapeSql(u.rollNumber)}, ${escapeSql(u.createdAt)}, ${escapeSql(u.lastLogin)}) ` +
        `ON CONFLICT (uid) DO UPDATE SET last_login = EXCLUDED.last_login;\n`;
    }

    sql += `\n-- LOGIN & SECURITY AUDIT LOGS\n`;
    for (const l of data.login_logs || []) {
      sql += `INSERT INTO login_logs (id, email, role, status, ip, user_agent, timestamp) ` +
        `VALUES (${escapeSql(l.id)}, ${escapeSql(l.email)}, ${escapeSql(l.role)}, ${escapeSql(l.status)}, ${escapeSql(l.ip)}, ${escapeSql(l.userAgent)}, ${escapeSql(l.timestamp)});\n`;
    }

    sql += `\n-- WEBSITE TRAFFIC & VISITOR ACTIVITY\n`;
    for (const t of data.traffic_logs || []) {
      sql += `INSERT INTO traffic_logs (id, path, user_email, role, ip, user_agent, referrer, timestamp) ` +
        `VALUES (${escapeSql(t.id)}, ${escapeSql(t.path)}, ${escapeSql(t.userEmail)}, ${escapeSql(t.role)}, ${escapeSql(t.ip)}, ${escapeSql(t.userAgent)}, ${escapeSql(t.referrer)}, ${escapeSql(t.timestamp)});\n`;
    }

    fs.writeFileSync(SQL_FILE, sql, "utf-8");

    // 2. Generate CSV File
    let csv = `Record_Type,ID,Timestamp,Account_Email,Role_or_Page,Status_or_Referrer,IP_Address,Client_Device\n`;

    for (const l of data.login_logs || []) {
      csv += `${escapeCsv("LOGIN")},${escapeCsv(l.id)},${escapeCsv(l.timestamp)},${escapeCsv(l.email)},${escapeCsv(l.role)},${escapeCsv(l.status)},${escapeCsv(l.ip)},${escapeCsv(l.userAgent)}\n`;
    }

    for (const t of data.traffic_logs || []) {
      csv += `${escapeCsv("TRAFFIC")},${escapeCsv(t.id)},${escapeCsv(t.timestamp)},${escapeCsv(t.userEmail || "Anonymous Visitor")},${escapeCsv(t.path)},${escapeCsv(t.referrer || "Direct Visit")},${escapeCsv(t.ip)},${escapeCsv(t.userAgent)}\n`;
    }

    fs.writeFileSync(CSV_FILE, csv, "utf-8");
  } catch (err) {
    console.error("SQL/CSV export sync error:", err);
  }
}

// Thread-safe write helper
function writeDB(data: DatabaseSchema): void {
  try {
    if (!fs.existsSync(DB_DIR)) {
      try { fs.mkdirSync(DB_DIR, { recursive: true }); } catch {}
    }
    const tempFile = `${DB_FILE}.tmp.${Date.now()}`;
    fs.writeFileSync(tempFile, JSON.stringify(data, null, 2), "utf-8");
    fs.renameSync(tempFile, DB_FILE);

    // Automatically sync to local SQL and CSV files
    syncSqlAndCsvFiles(data);
  } catch (fsErr) {
    // In serverless/Vercel production environments the filesystem is read-only.
    // We catch this gracefully so logins and other operations never throw 500 errors.
    console.warn("Read-only filesystem: persistence to local JSON skipped on serverless.", fsErr);
  }
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
  role?: string;
  rollNumber: string;
  phone?: string;
  targetExam?: string;
}): UserAccount {
  const db = initDB();
  const existingIdx = db.users.findIndex((u) => u.email === user.email || u.uid === user.uid);
  const normalizedRole: "admin" | "user" = user.role === "admin" ? "admin" : "user";

  const updatedUserData = {
    ...user,
    role: normalizedRole,
  };

  if (existingIdx >= 0) {
    db.users[existingIdx] = {
      ...db.users[existingIdx],
      ...updatedUserData,
      lastLogin: new Date().toISOString(),
    };
    writeDB(db);
    return db.users[existingIdx];
  }

  const newUser: UserAccount = {
    ...updatedUserData,
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString(),
  };

  db.users.unshift(newUser);
  writeDB(db);
  return newUser;
}

// --- Login Logs Repository Methods ---

export function getLoginLogs(limit = 100): LoginLog[] {
  const db = initDB();
  return (db.login_logs || [])
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, limit);
}

export function clearLoginLogs(): void {
  const db = initDB();
  db.login_logs = [];
  writeDB(db);
}

export function clearTrafficLogs(): void {
  const db = initDB();
  db.traffic_logs = [];
  writeDB(db);
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
    role: entry.role === "admin" ? "admin" : "user",
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

// --- Website Traffic Repository Methods ---

export function logTraffic(entry: {
  path: string;
  ip?: string;
  userAgent?: string;
  referrer?: string;
  userEmail?: string;
  role?: string;
}): TrafficLog {
  const db = initDB();
  const newLog: TrafficLog = {
    id: `trf-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
    ...entry,
    timestamp: new Date().toISOString(),
  };

  if (!db.traffic_logs) db.traffic_logs = [];
  db.traffic_logs.unshift(newLog);

  // Keep latest 1000 traffic records max
  if (db.traffic_logs.length > 1000) {
    db.traffic_logs = db.traffic_logs.slice(0, 1000);
  }

  writeDB(db);
  return newLog;
}

export function getTrafficLogs(limit = 100): TrafficLog[] {
  const db = initDB();
  return (db.traffic_logs || [])
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, limit);
}

// --- Dashboard KPI Stats ---

export function getAcademyStats() {
  const db = initDB();
  const enquiries = db.enquiries || [];
  const users = db.users || [];
  const logs = db.login_logs || [];
  const traffic = db.traffic_logs || [];

  const newEnquiries = enquiries.filter((e) => e.status === "new").length;
  const contactedEnquiries = enquiries.filter((e) => e.status === "contacted" || e.status === "in_progress").length;
  const enrolledEnquiries = enquiries.filter((e) => e.status === "enrolled").length;

  const orientationBookings = enquiries.filter((e) => e.source === "orientation_modal").length;
  const contactMessages = enquiries.filter((e) => e.source === "contact_page").length;

  const totalAdmins = users.filter((u) => u.role === "admin").length;
  const totalStandardUsers = users.filter((u) => u.role !== "admin").length;

  const totalLogins = logs.length;
  const successfulLogins = logs.filter((l) => l.status === "success").length;
  const failedLogins = logs.filter((l) => l.status === "failed").length;

  const recentLoginsCount = logs.filter(
    (l) => new Date(l.timestamp).getTime() > Date.now() - 24 * 3600 * 1000
  ).length;

  const totalPageViews = traffic.length;
  const recentPageViews = traffic.filter(
    (t) => new Date(t.timestamp).getTime() > Date.now() - 24 * 3600 * 1000
  ).length;

  return {
    totalEnquiries: enquiries.length,
    newEnquiries,
    contactedEnquiries,
    enrolledEnquiries,
    orientationBookings,
    contactMessages,
    totalAccounts: users.length,
    totalUsers: users.length,
    totalAdmins,
    totalStandardUsers,
    totalLogins,
    successfulLogins,
    failedLogins,
    recentLoginsCount,
    totalPageViews,
    recentPageViews,
  };
}

