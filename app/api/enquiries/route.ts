import { NextRequest, NextResponse } from "next/server";
import { createEnquiry } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, program, source, message } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { error: "Name and phone number are required." },
        { status: 400 }
      );
    }

    const newEnquiry = createEnquiry({
      name: String(name).trim(),
      phone: String(phone).trim(),
      email: email ? String(email).trim() : "",
      program: (program as any) || "general",
      source: (source as any) || "contact_page",
      message: message ? String(message).trim() : "General admission enquiry",
    });

    return NextResponse.json({
      success: true,
      message: "Enquiry recorded successfully into academy database.",
      enquiryId: newEnquiry.id,
      data: newEnquiry,
    });
  } catch (error: any) {
    console.error("Failed to save enquiry:", error);
    return NextResponse.json(
      { error: "Failed to record enquiry in database." },
      { status: 500 }
    );
  }
}
