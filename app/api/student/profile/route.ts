import { NextRequest, NextResponse } from "next/server";
import { getVerifiedStudent, validateProfilePayload } from "@/lib/studentAuth";
import { getUserById, setFirestoreDocument, type UserAccount } from "@/lib/db";

export const dynamic = "force-dynamic";

/**
 * GET /api/student/profile
 * Retrieves the profile of the currently authenticated student.
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

    const userDoc = await getUserById(verified.uid, verified.token);

    const profile = {
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
        profile,
      },
      {
        status: 200,
        headers: { "Cache-Control": "no-store" },
      }
    );
  } catch (error: any) {
    console.error("Failed to retrieve student profile:", error);
    return NextResponse.json(
      { error: "Unable to retrieve student profile at this time." },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }
}

/**
 * PATCH /api/student/profile
 * Allows authenticated students to update only approved fields: displayName, phone, targetExam.
 * Rejects unauthorized fields and enforces strict validation and length limits.
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

    return NextResponse.json(
      {
        success: true,
        message: "Profile updated successfully.",
        profile: {
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
      },
      {
        status: 200,
        headers: { "Cache-Control": "no-store" },
      }
    );
  } catch (error: any) {
    console.error("Failed to update student profile:", error);
    return NextResponse.json(
      { error: "Unable to update student profile at this time." },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }
}
