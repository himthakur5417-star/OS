import { NextRequest } from "next/server";
import { verifyFirebaseIdToken, extractBearerToken } from "@/lib/adminAuth";

export interface VerifiedStudent {
  uid: string;
  email: string;
  provider?: string;
  name?: string;
  token: string;
}

export const ACCEPTED_TARGET_EXAMS = [
  "nda",
  "cds",
  "afcat",
  "scholars",
  "juniors",
  "general",
] as const;

export type AcceptedTargetExam = typeof ACCEPTED_TARGET_EXAMS[number];

const ALLOWED_UPDATE_FIELDS = new Set(["displayName", "phone", "targetExam"]);

/**
 * Validates and extracts the cryptographically verified student identity from the request.
 * Derives the student's UID exclusively from the verified Firebase ID token.
 */
export async function getVerifiedStudent(req: NextRequest): Promise<VerifiedStudent | null> {
  const token = extractBearerToken(req);
  if (!token) return null;

  const verified = await verifyFirebaseIdToken(token);
  if (!verified || !verified.uid || !verified.email) {
    return null;
  }

  return {
    uid: verified.uid,
    email: verified.email,
    provider: verified.provider,
    name: verified.name,
    token,
  };
}

export interface ProfileValidationResult {
  valid: boolean;
  error?: string;
  sanitized?: {
    displayName?: string;
    phone?: string | null;
    targetExam?: AcceptedTargetExam | null;
  };
}

/**
 * Strictly validates profile update payload.
 * Rejects unauthorized fields and enforces length and pattern limits.
 */
export function validateProfilePayload(body: any): ProfileValidationResult {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return { valid: false, error: "Invalid JSON request body." };
  }

  // 1. Strict Whitelist Check: Disallow any unexpected or sensitive fields
  const payloadKeys = Object.keys(body);
  for (const key of payloadKeys) {
    if (!ALLOWED_UPDATE_FIELDS.has(key)) {
      return {
        valid: false,
        error: `Field '${key}' cannot be modified. Only displayName, phone, and targetExam can be updated.`,
      };
    }
  }

  if (payloadKeys.length === 0) {
    return { valid: false, error: "At least one editable field must be provided." };
  }

  const sanitized: ProfileValidationResult["sanitized"] = {};

  // 2. Validate displayName if provided
  if ("displayName" in body) {
    const rawName = body.displayName;
    if (typeof rawName !== "string") {
      return { valid: false, error: "Display name must be a string." };
    }
    const trimmed = rawName.trim();
    if (trimmed.length < 2 || trimmed.length > 60) {
      return { valid: false, error: "Display name must be between 2 and 60 characters." };
    }
    // Reject HTML/script tags or control characters
    if (/[<>]/.test(trimmed) || /[\u0000-\u001F\u007F]/.test(trimmed)) {
      return { valid: false, error: "Display name contains invalid or unsafe characters." };
    }
    sanitized.displayName = trimmed;
  }

  // 3. Validate phone if provided
  if ("phone" in body) {
    const rawPhone = body.phone;
    if (rawPhone === null || rawPhone === "") {
      sanitized.phone = null;
    } else if (typeof rawPhone !== "string") {
      return { valid: false, error: "Phone number must be a string or null." };
    } else {
      const trimmedPhone = rawPhone.trim();
      if (trimmedPhone.length < 8 || trimmedPhone.length > 20) {
        return { valid: false, error: "Phone number must be between 8 and 20 characters." };
      }
      if (!/^[+]?[\d\s\-()]{8,20}$/.test(trimmedPhone)) {
        return { valid: false, error: "Phone number contains invalid characters. Use digits and optional +, -, () or spaces." };
      }
      const digitCount = (trimmedPhone.match(/\d/g) || []).length;
      if (digitCount < 8 || digitCount > 15) {
        return { valid: false, error: "Phone number must contain between 8 and 15 digits." };
      }
      sanitized.phone = trimmedPhone;
    }
  }

  // 4. Validate targetExam if provided
  if ("targetExam" in body) {
    const rawTarget = body.targetExam;
    if (rawTarget === null || rawTarget === "") {
      sanitized.targetExam = null;
    } else if (typeof rawTarget !== "string") {
      return { valid: false, error: "Target examination must be a string or null." };
    } else {
      const normalizedTarget = rawTarget.trim().toLowerCase();
      if (!ACCEPTED_TARGET_EXAMS.includes(normalizedTarget as AcceptedTargetExam)) {
        return {
          valid: false,
          error: `Invalid targetExam '${rawTarget}'. Accepted tracks: ${ACCEPTED_TARGET_EXAMS.join(", ")}.`,
        };
      }
      sanitized.targetExam = normalizedTarget as AcceptedTargetExam;
    }
  }

  return { valid: true, sanitized };
}
