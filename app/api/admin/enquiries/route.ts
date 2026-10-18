import { NextRequest, NextResponse } from "next/server";
import {
  getAllEnquiries,
  createEnquiry,
  updateEnquiryStatus,
  deleteEnquiry,
} from "@/lib/db";
import { verifyAdminSession } from "@/lib/adminAuth";

export async function GET(req: NextRequest) {
  if (!verifyAdminSession(req)) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const program = searchParams.get("program") || undefined;
    const status = searchParams.get("status") || undefined;
    const search = searchParams.get("search") || undefined;

    const enquiries = await getAllEnquiries({ program, status, search });
    return NextResponse.json({ enquiries });
  } catch (error: any) {
    console.error("Failed to fetch enquiries:", error);
    const status = error?.code === "FIRESTORE_DISABLED" ? 503 : 500;
    return NextResponse.json(
      { 
        error: error?.message || "Failed to fetch enquiries from persistent database.",
        code: error?.code || "DB_ERROR",
        activationUrl: error?.activationUrl,
      },
      { status }
    );
  }
}

export async function POST(req: NextRequest) {
  if (!verifyAdminSession(req)) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { name, phone, email, program, message, notes, status } = body;

    if (!name || !phone) {
      return NextResponse.json({ error: "Name and phone are required" }, { status: 400 });
    }

    const created = await createEnquiry({
      name,
      phone,
      email: email || "",
      program: program || "general",
      source: "manual_entry",
      message: message || "Lead entered via Admin Terminal",
      status: status || "new",
    });

    if (notes) {
      await updateEnquiryStatus(created.id, created.status, notes);
    }

    return NextResponse.json({ success: true, enquiry: created });
  } catch (error: any) {
    console.error("Failed to create enquiry:", error);
    const status = error?.code === "FIRESTORE_DISABLED" ? 503 : 500;
    return NextResponse.json(
      { 
        error: error?.message || "Failed to create enquiry in database.",
        code: error?.code || "DB_ERROR",
        activationUrl: error?.activationUrl,
      },
      { status }
    );
  }
}

export async function PATCH(req: NextRequest) {
  if (!verifyAdminSession(req)) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, status, notes } = body;

    if (!id || !status) {
      return NextResponse.json({ error: "Enquiry id and status are required" }, { status: 400 });
    }

    const updated = await updateEnquiryStatus(id, status, notes);
    if (!updated) {
      return NextResponse.json({ error: "Enquiry not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, enquiry: updated });
  } catch (error: any) {
    console.error("Failed to update enquiry:", error);
    const status = error?.code === "FIRESTORE_DISABLED" ? 503 : 500;
    return NextResponse.json(
      { 
        error: error?.message || "Failed to update enquiry in database.",
        code: error?.code || "DB_ERROR",
        activationUrl: error?.activationUrl,
      },
      { status }
    );
  }
}

export async function DELETE(req: NextRequest) {
  if (!verifyAdminSession(req)) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Enquiry id required" }, { status: 400 });
    }

    const deleted = await deleteEnquiry(id);
    if (!deleted) {
      return NextResponse.json({ error: "Enquiry not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Enquiry removed" });
  } catch (error: any) {
    console.error("Failed to delete enquiry:", error);
    const status = error?.code === "FIRESTORE_DISABLED" ? 503 : 500;
    return NextResponse.json(
      { 
        error: error?.message || "Failed to delete enquiry from database.",
        code: error?.code || "DB_ERROR",
        activationUrl: error?.activationUrl,
      },
      { status }
    );
  }
}
