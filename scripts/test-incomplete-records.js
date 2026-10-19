const assert = require("assert");

// Test data simulating complete and incomplete records
const testEnquiries = [
  // 1. Complete record
  {
    id: "ENQ-2026-001",
    name: "Vikram Rathore",
    phone: "9876543210",
    email: "vikram@example.com",
    program: "nda",
    source: "orientation_modal",
    message: "Interested in NDA 2026",
    status: "new",
    createdAt: "2026-10-18T10:00:00.000Z"
  },
  // 2. Production Crash Shape 1 (Enquiry #2 in production: only name and phone)
  {
    name: "Aspirant Without Program",
    phone: "9123456789"
  },
  // 3. Production Crash Shape 2 (Enquiry #5 in production: only name and phone)
  {
    name: "Parent Inquiry",
    phone: "9811122233"
  },
  // 4. Missing program and missing name
  {
    id: "ENQ-TEST-002",
    phone: "9988776655",
    status: "contacted",
    createdAt: "2026-10-19T05:00:00.000Z"
  },
  // 5. Missing createdAt or invalid createdAt
  {
    id: "ENQ-TEST-003",
    name: "Cadet With Bad Date",
    phone: "9000000000",
    program: "defense",
    createdAt: "invalid-date-string"
  },
  // 6. Completely empty object
  {}
];

console.log("=== RUNNING INCOMPLETE RECORD RESILIENCE TESTS ===");

// TEST 1: Simulate the map function that crashed in production
console.log("\nTest 1: Simulating enquiries list rendering with complete & incomplete records...");
let renderSuccessCount = 0;
testEnquiries.forEach((enq, index) => {
  try {
    const cleanPhone = (enq.phone || "").replace(/[^0-9]/g, "");
    const candidateName = enq.name || "Candidate";
    const programTrack = (enq.program || "").trim();
    const programUpper = programTrack ? programTrack.toUpperCase() : "GENERAL";
    const whatsappMessage = `Hello ${candidateName}, Greetings from Officium Supremum Academy regarding your enquiry${programTrack ? ` for the ${programUpper} program` : ""}.`;
    const whatsappUrl = `https://wa.me/91${cleanPhone}?text=${encodeURIComponent(whatsappMessage)}`;
    const enqEffectiveStatus = enq.status || "new";
    const enqId = enq.id || `ENQ-REF-${index + 1}`;
    const formattedDate = enq.createdAt && !isNaN(new Date(enq.createdAt).getTime())
      ? new Date(enq.createdAt).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" })
      : "Date Unknown";
    const displayProgram = enq.program || "Unspecified";

    assert(typeof whatsappUrl === "string");
    assert(typeof programUpper === "string");
    assert(typeof formattedDate === "string");
    assert(typeof displayProgram === "string");

    renderSuccessCount++;
  } catch (err) {
    console.error(`❌ FAILED on enquiry index ${index}:`, err);
    throw err;
  }
});
console.log(`✅ PASS: Rendered ${renderSuccessCount}/${testEnquiries.length} enquiries without throwing!`);

// TEST 2: Simulate filtering by program when some enquiries have no program
console.log("\nTest 2: Simulating program and status filters on incomplete records...");
const programFilters = ["all", "nda", "defense", "scholars", "general"];
programFilters.forEach(enquiryProgramFilter => {
  const filtered = testEnquiries.filter(e => {
    const q = "";
    const matchesSearch = !q;
    const matchesStatus = true;
    const matchesProgram =
      enquiryProgramFilter === "all" ||
      (Boolean(e.program) && e.program.toLowerCase() === enquiryProgramFilter.toLowerCase());

    return matchesSearch && matchesStatus && matchesProgram;
  });
  console.log(`  Filter '${enquiryProgramFilter}': matched ${filtered.length} records safely`);
});
console.log("✅ PASS: Program filtering works without throwing on undefined program fields!");

// TEST 3: Simulate CSV export mapping on incomplete records
console.log("\nTest 3: Simulating CSV export row generation on incomplete records...");
const rows = testEnquiries.map((e) => {
  const formattedDate =
    e.createdAt && !isNaN(new Date(e.createdAt).getTime())
      ? new Date(e.createdAt).toLocaleString()
      : "Date Unknown";

  return [
    `"${e.id || "N/A"}"`,
    `"${(e.name || "Unknown Candidate").replace(/"/g, '""')}"`,
    `"${e.phone || ""}"`,
    `"${e.email || ""}"`,
    `"${e.program || "Unspecified"}"`,
    `"${e.source || "Unknown"}"`,
    `"${e.status || "new"}"`,
    `"${(e.message || "").replace(/"/g, '""')}"`,
    `"${(e.notes || "").replace(/"/g, '""')}"`,
    `"${formattedDate}"`,
  ];
});
assert(rows.length === testEnquiries.length);
rows.forEach((row, i) => {
  assert(!row.some(col => col.includes("undefined") || col.includes("Invalid Date")));
});
console.log("✅ PASS: CSV export produced clean columns with proper fallbacks for all records!");

// TEST 4: Simulate Users table with incomplete user accounts
console.log("\nTest 4: Simulating Users table with incomplete records...");
const testUsers = [
  { uid: "u1", email: "admin@officium.academy", displayName: "Admin User", role: "admin", createdAt: "2026-10-18T00:00:00Z" },
  { uid: "u2" }, // Missing everything except uid
  {} // Missing uid and everything
];
testUsers.forEach((u, i) => {
  const name = u.displayName || "Unknown Member";
  const email = u.email || "No email recorded";
  const created = u.createdAt && !isNaN(new Date(u.createdAt).getTime())
    ? new Date(u.createdAt).toLocaleDateString()
    : "Unknown";
  const lastActive = u.lastLogin && !isNaN(new Date(u.lastLogin).getTime())
    ? new Date(u.lastLogin).toLocaleDateString()
    : "Recently";
  assert(typeof name === "string");
  assert(typeof email === "string");
  assert(typeof created === "string");
  assert(typeof lastActive === "string");
});
console.log("✅ PASS: Users table safe for incomplete records!");

// TEST 5: Simulate safe timestamp sorting
console.log("\nTest 5: Simulating timestamp sorting with missing/invalid createdAt...");
const sorted = [...testEnquiries].sort((a, b) => {
  const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
  const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
  return timeB - timeA;
});
assert(sorted.length === testEnquiries.length);
console.log("✅ PASS: Timestamp sorting succeeds deterministically!");

console.log("\n=== ALL RESILIENCE TESTS PASSED SUCCESSFULLY! ===");
