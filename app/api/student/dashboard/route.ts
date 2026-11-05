import { NextRequest, NextResponse } from "next/server";
import { getVerifiedStudent, validateProfilePayload } from "@/lib/studentAuth";
import { getUserById, setFirestoreDocument, type UserAccount } from "@/lib/db";
import { getUserSubjectEntitlements } from "@/lib/purchases";

export const dynamic = "force-dynamic";

/**
 * GET /api/student/dashboard
 * Retrieves the authenticated student's profile and active payment entitlement status.
 * Strictly scopes all data to the verified Firebase ID token UID.
 */
export async function GET(req: NextRequest) {
  try {
    const verified = await getVerifiedStudent(req);
    if (!verified) {
      return NextResponse.json(
        { error: "Authentication token is missing, expired, or invalid. Please sign in." },
        { status: 401, headers: { "Cache-Control": "no-store" } }
      );
    }

    // 1. Fetch student user document from Firestore (or local fallback)
    const userDoc = await getUserById(verified.uid, verified.token);

    // 2. Fetch subject entitlements using verified UID
    const entitlements = await getUserSubjectEntitlements(verified.uid);

    // 3. Assemble predictable, safe student profile
    const student = {
      uid: verified.uid,
      email: verified.email,
      displayName: userDoc?.displayName || verified.name || verified.email.split("@")[0],
      role: userDoc?.role === "admin" ? "admin" : "user",
      rollNumber: userDoc?.rollNumber || null,
      authProvider: userDoc?.authProvider || verified.provider || null,
      phone: userDoc?.phone || null,
      targetExam: userDoc?.targetExam || null,
      createdAt: userDoc?.createdAt || null,
      lastLogin: userDoc?.lastLogin || null,
    };

    return NextResponse.json(
      {
        success: true,
        student,
        entitlements,
      },
      {
        status: 200,
        headers: { "Cache-Control": "no-store" },
      }
    );
  } catch (error: any) {
    console.error("Failed to load student dashboard:", error);
    return NextResponse.json(
      { error: "Unable to retrieve student dashboard data at this time." },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }
}

/**
 * PATCH /api/student/dashboard
 * Convenience handler allowing students to update their profile directly through the dashboard endpoint.
 */
export async function PATCH(req: NextRequest) {
  try {
    const verified = await getVerifiedStudent(req);
    if (!verified) {
      return NextResponse.json(
        { error: "Authentication token is missing, expired, or invalid. Please sign in." },
        { status: 401, headers: { "Cache-Control": "no-store" } }
      );
    }

    const body = await req.json().catch(() => null);
    const validation = validateProfilePayload(body);
    if (!validation.valid || !validation.sanitized) {
      return NextResponse.json(
        { error: validation.error || "Invalid request payload." },
        { status: 400, headers: { "Cache-Control": "no-store" } }
      );
    }

    const existing = await getUserById(verified.uid, verified.token);

    // Merge only strictly approved fields
    const updatedUser: UserAccount = {
      uid: verified.uid,
      email: verified.email,
      displayName:
        validation.sanitized.displayName !== undefined
          ? validation.sanitized.displayName
          : existing?.displayName || verified.name || verified.email.split("@")[0],
      role: existing?.role === "admin" ? "admin" : "user", // Immutable
      rollNumber: existing?.rollNumber || `OS-USR-${Math.floor(1000 + Math.random() * 9000)}`, // Immutable
      authProvider: existing?.authProvider || verified.provider || "password", // Immutable
      phone:
        validation.sanitized.phone !== undefined
          ? (validation.sanitized.phone || undefined)
          : existing?.phone,
      targetExam:
        validation.sanitized.targetExam !== undefined
          ? (validation.sanitized.targetExam || undefined)
          : existing?.targetExam,
      createdAt: existing?.createdAt || new Date().toISOString(), // Immutable
      lastLogin: existing?.lastLogin || new Date().toISOString(),
    };

    await setFirestoreDocument("users", verified.uid, updatedUser, verified.token);

    const entitlements = await getUserSubjectEntitlements(verified.uid);

    return NextResponse.json(
      {
        success: true,
        message: "Profile updated successfully.",
        student: {
          uid: updatedUser.uid,
          email: updatedUser.email,
          displayName: updatedUser.displayName,
          role: updatedUser.role,
          rollNumber: updatedUser.rollNumber,
          authProvider: updatedUser.authProvider || null,
          phone: updatedUser.phone || null,
          targetExam: updatedUser.targetExam || null,
          createdAt: updatedUser.createdAt || null,
          lastLogin: updatedUser.lastLogin || null,
        },
        entitlements,
      },
      {
        status: 200,
        headers: { "Cache-Control": "no-store" },
      }
    );
  } catch (error: any) {
    console.error("Failed to update student profile via dashboard:", error);
    return NextResponse.json(
      { error: "Unable to update student profile at this time." },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }
}
