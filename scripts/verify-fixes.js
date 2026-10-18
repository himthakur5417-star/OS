const BASE_URL = "http://localhost:3000";

async function runTests() {
  console.log("=== STARTING AUTH & ADMIN DASHBOARD VERIFICATION TESTS ===");
  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log("✅ PASS:", message);
      passed++;
    } else {
      console.error("❌ FAIL:", message);
      failed++;
    }
  }

  try {
    // 1. Unauthenticated access to admin endpoints must be rejected (401)
    const unauthStats = await fetch(`${BASE_URL}/api/admin/stats`);
    assert(unauthStats.status === 401, "Unauthenticated GET /api/admin/stats returns 401");

    const unauthUsers = await fetch(`${BASE_URL}/api/admin/users`);
    assert(unauthUsers.status === 401, "Unauthenticated GET /api/admin/users returns 401");

    const unauthEnq = await fetch(`${BASE_URL}/api/admin/enquiries`);
    assert(unauthEnq.status === 401, "Unauthenticated GET /api/admin/enquiries returns 401");

    // 2. Forged unsigned base64 token must be rejected (401)
    const fakePayload = { email: "himthakur5417@gmail.com", role: "admin", exp: Date.now() + 100000 };
    const fakeToken = Buffer.from(JSON.stringify(fakePayload)).toString("base64");
    const fakeReq = await fetch(`${BASE_URL}/api/admin/stats`, {
      headers: { "x-admin-token": fakeToken }
    });
    assert(fakeReq.status === 401, "Forged unsigned base64 token is rejected with 401");

    // 3. Admin login with invalid password must be rejected (401)
    const badLogin = await fetch(`${BASE_URL}/api/admin/auth`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "himthakur5417@gmail.com", password: "wrongpassword" })
    });
    assert(badLogin.status === 401, "Admin login with wrong password returns 401");

    // 4. Admin login with correct credentials must succeed and return signed token
    const goodLogin = await fetch(`${BASE_URL}/api/admin/auth`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "himthakur5417@gmail.com", password: "officium@2025" })
    });
    assert(goodLogin.status === 200, "Admin login with valid passkey returns 200");
    const loginData = await goodLogin.json();
    assert(Boolean(loginData.token && loginData.token.includes(".")), "Admin session token is cryptographically signed (contains '.')");
    const adminToken = loginData.token;

    // 5. Authenticated admin request using signed token must succeed (200)
    const authStatsRes = await fetch(`${BASE_URL}/api/admin/stats`, {
      headers: { "x-admin-token": adminToken }
    });
    assert(authStatsRes.status === 200, "Authorized GET /api/admin/stats returns 200");
    const statsData = await authStatsRes.json();
    const initialEnqCount = statsData.stats.totalEnquiries;
    const initialUserCount = statsData.stats.totalAccounts || statsData.stats.totalUsers;
    console.log("   Current metrics from real DB:", {
      totalEnquiries: initialEnqCount,
      totalAccounts: initialUserCount,
      googleUsers: statsData.stats.googleUsersCount,
      passwordUsers: statsData.stats.emailPasswordUsersCount
    });

    // 6. Submit a new real enquiry via public endpoint POST /api/enquiries
    const testEnquiryName = `Test Cadet ${Date.now().toString(36)}`;
    const newEnqRes = await fetch(`${BASE_URL}/api/enquiries`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: testEnquiryName,
        phone: "9876543210",
        email: "cadet.test@gmail.com",
        program: "defense",
        source: "contact_page",
        message: "Diagnostic inquiry for NDA 2026 batch."
      })
    });
    assert(newEnqRes.status === 200, "Public POST /api/enquiries succeeds");
    const enqResult = await newEnqRes.json();
    assert(Boolean(enqResult.enquiryId), `Generated enquiry ID: ${enqResult.enquiryId}`);

    // 7. Verify the enquiry immediately reflects in admin enquiries and stats incremented
    const updatedStatsRes = await fetch(`${BASE_URL}/api/admin/stats`, {
      headers: { "x-admin-token": adminToken }
    });
    const updatedStats = await updatedStatsRes.json();
    assert(updatedStats.stats.totalEnquiries === initialEnqCount + 1, "Real-time update: totalEnquiries incremented by 1");

    const adminEnqList = await fetch(`${BASE_URL}/api/admin/enquiries`, {
      headers: { "x-admin-token": adminToken }
    });
    const enqListData = await adminEnqList.json();
    const foundEnquiry = enqListData.enquiries.find(e => e.name === testEnquiryName);
    assert(Boolean(foundEnquiry), `Newly submitted enquiry '${testEnquiryName}' appears in admin directory`);

    // 8. Register a new real user via POST /api/auth/unified
    const testUserEmail = `cadet_${Date.now().toString(36)}@example.com`;
    const userRegRes = await fetch(`${BASE_URL}/api/auth/unified`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: testUserEmail,
        password: "securepassword123",
        name: "Aman Verma",
        isSignUp: true
      })
    });
    assert(userRegRes.status === 200, "User registration POST /api/auth/unified returns 200");
    const userRegData = await userRegRes.json();
    assert(userRegData.role === "user", "Registered account role is 'user'");
    assert(userRegData.user.email === testUserEmail, "Registered email matches input");

    // 9. Verify standard user CANNOT access admin dashboard
    const userAttempt = await fetch(`${BASE_URL}/api/admin/users`, {
      headers: { "x-admin-token": Buffer.from(JSON.stringify({ email: testUserEmail, role: "user", exp: Date.now() + 10000 })).toString("base64") }
    });
    assert(userAttempt.status === 401, "Normal user cannot access /api/admin/users (returns 401)");

    // 10. Verify the registered user appears in the admin User Directory with real timestamp and 'password' authProvider
    const adminUsersRes = await fetch(`${BASE_URL}/api/admin/users`, {
      headers: { "x-admin-token": adminToken }
    });
    const adminUsersData = await adminUsersRes.json();
    const foundUser = adminUsersData.users.find(u => u.email === testUserEmail);
    assert(Boolean(foundUser), `Newly registered user '${testUserEmail}' appears in admin user directory`);
    assert(foundUser && foundUser.authProvider === "password", "User authProvider is recorded as 'password'");
    assert(foundUser && Boolean(foundUser.createdAt), `User registration timestamp recorded: ${foundUser?.createdAt}`);

    // 11. Test Google User Sync simulation via POST /api/auth/google-sync
    const googleUserEmail = `google_cadet_${Date.now().toString(36)}@gmail.com`;
    const googleSyncRes = await fetch(`${BASE_URL}/api/auth/google-sync`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: googleUserEmail,
        displayName: "Google Cadet Rohit",
        uid: "goog-uid-12345"
      })
    });
    assert(googleSyncRes.status === 200, "POST /api/auth/google-sync succeeds for standard user");
    const googleSyncData = await googleSyncRes.json();
    assert(googleSyncData.role === "user", "Google sync role is 'user'");

    // 12. Verify Google user appears in admin user directory with 'google.com' authProvider
    const refreshedUsersRes = await fetch(`${BASE_URL}/api/admin/users`, {
      headers: { "x-admin-token": adminToken }
    });
    const refreshedUsers = await refreshedUsersRes.json();
    const foundGoogleUser = refreshedUsers.users.find(u => u.email === googleUserEmail);
    assert(Boolean(foundGoogleUser), `Google user '${googleUserEmail}' appears in admin user directory`);
    assert(foundGoogleUser && foundGoogleUser.authProvider === "google.com", "Google user authProvider is 'google.com'");

    // 13. Verify stats reflect both Google and Password users
    const finalStatsRes = await fetch(`${BASE_URL}/api/admin/stats`, {
      headers: { "x-admin-token": adminToken }
    });
    const finalStats = await finalStatsRes.json();
    assert(finalStats.stats.googleUsersCount >= 1, `Stats accurately report googleUsersCount: ${finalStats.stats.googleUsersCount}`);
    assert(finalStats.stats.emailPasswordUsersCount >= 1, `Stats accurately report emailPasswordUsersCount: ${finalStats.stats.emailPasswordUsersCount}`);

    console.log("\n========================================================");
    console.log(`TOTAL TESTS: ${passed + failed} | PASSED: ${passed} | FAILED: ${failed}`);
    console.log("========================================================");

    if (failed > 0) {
      process.exit(1);
    }
  } catch (err) {
    console.error("Test execution threw error:", err);
    process.exit(1);
  }
}

runTests();
