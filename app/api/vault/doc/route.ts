import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { getVerifiedPaymentUser } from "@/lib/paymentAuth";
import { isEntitlementActive, getPaymentEntitlement } from "@/lib/purchases";
import { FREE_VAULT_ROOTS, subjectForVaultRoot } from "@/lib/paymentCatalog";
import { CDS_MATHS_CHAPTERS, ENGLISH_CHAPTERS, NDA_MATHS_CHAPTERS, PYQ_YEARS } from "@/data/vaultManifest";

export const dynamic = "force-dynamic";

// Allowed top-level vault directories
const ALLOWED_VAULT_ROOTS = [
  "NDA mathematics",
  "CDS mathematics",
  "NDA CDS English",
  "A2Z Vocabulary",
  "PYQ",
  "Syllabus",
];

const MIME_TYPES: Record<string, string> = {
  ".pdf": "application/pdf",
  ".html": "text/html; charset=utf-8",
  ".htm": "text/html; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".json": "application/json",
};

function normalizeYear(year: string): string {
  return year.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function resolveDocumentKey(documentKey: string): string | null {
  const chapterMatch = documentKey.match(/^(nda-mathematics|cds-mathematics|nda-cds-english)-chapter-(\d+)$/);
  if (chapterMatch) {
    const chapterNumber = `Chapter ${chapterMatch[2]}`;
    const chapters =
      chapterMatch[1] === "nda-mathematics"
        ? NDA_MATHS_CHAPTERS
        : chapterMatch[1] === "cds-mathematics"
        ? CDS_MATHS_CHAPTERS
        : ENGLISH_CHAPTERS;
    return chapters.find((chapter) => chapter.num === chapterNumber)?.pdf || null;
  }

  const pyqMatch = documentKey.match(/^pyq-([a-z0-9-]+)-(\d+)$/);
  if (pyqMatch) {
    const year = PYQ_YEARS.find((item) => normalizeYear(item.year) === pyqMatch[1]);
    const paperIndex = Number(pyqMatch[2]) - 1;
    return year?.papers[paperIndex]?.pdf || null;
  }

  return null;
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    let relPath = searchParams.get("file") || "";
    const documentKey = searchParams.get("document") || "";

    if (documentKey) {
      const resolved = resolveDocumentKey(documentKey);
      if (!resolved) return NextResponse.json({ error: "Document not found" }, { status: 404 });
      relPath = resolved;
    }

    if (!relPath) {
      return NextResponse.json({ error: "Missing file parameter" }, { status: 400 });
    }

    // Decode URI component (e.g. %20 -> space)
    try {
      relPath = decodeURIComponent(relPath);
    } catch {}

    // Normalize and remove leading slash
    relPath = relPath.replace(/^[/\\]+/, "").trim();

    // Reject traversal segments before normalization so a path cannot switch
    // from one allowed vault root to another.
    if (relPath.split(/[\\/]/).some((segment) => segment === "..")) {
      return NextResponse.json({ error: "Invalid file path" }, { status: 403 });
    }

    // Prevent path traversal
    const normalized = path.normalize(relPath);
    if (normalized.startsWith("..") || path.isAbsolute(normalized)) {
      return NextResponse.json({ error: "Invalid file path" }, { status: 403 });
    }

    // Validate that the request targets one of our allowed vault archives
    const rootFolder = normalized.split(/[/\\]/)[0];
    const isAllowed = ALLOWED_VAULT_ROOTS.some(
      (allowed) => allowed.toLowerCase() === rootFolder.toLowerCase()
    );

    if (!isAllowed) {
      return NextResponse.json({ error: "Unauthorized directory" }, { status: 403 });
    }

    const paidSubject = subjectForVaultRoot(rootFolder);
    if (paidSubject) {
      const user = await getVerifiedPaymentUser(req);
      if (!user) {
        return NextResponse.json({ error: "Authentication is required to access this document." }, { status: 401 });
      }

      const entitlement = await getPaymentEntitlement(user.uid, paidSubject.id);
      if (!isEntitlementActive(entitlement)) {
        return NextResponse.json({ error: "An active subject purchase is required to access this document." }, { status: 403 });
      }
    } else if (!FREE_VAULT_ROOTS.has(rootFolder)) {
      return NextResponse.json({ error: "This document collection is not available." }, { status: 403 });
    }

    // Try finding the file across project root, public, and serverless bundle locations
    const candidatePaths = [
      path.join(process.cwd(), normalized),
      path.join(process.cwd(), "public", normalized),
      path.resolve(process.cwd(), "..", normalized),
      path.resolve(__dirname, "../../..", normalized),
      path.resolve(__dirname, "../../../..", normalized),
      path.resolve(__dirname, "../../../../..", normalized),
    ];
    let fullPath = candidatePaths.find((p) => {
      try {
        return fs.existsSync(p);
      } catch {
        return false;
      }
    });

    if (!fullPath) {
      // Intelligent fuzzy fallback (handles time-and-work vs time-work, casing, spacing, and chapter prefixes)
      const requestedFile = path.basename(normalized);
      const dirName = path.dirname(normalized);
      const possibleDirs = [
        path.join(process.cwd(), dirName),
        path.join(process.cwd(), "public", dirName),
        path.resolve(process.cwd(), "..", dirName),
        path.resolve(__dirname, "../../..", dirName),
        path.resolve(__dirname, "../../../..", dirName),
      ];

      const altNames = [
        requestedFile.replace(/-and-/gi, "-"),
        requestedFile.replace(/-work/gi, "-and-work"),
        requestedFile.replace(/\s+/g, "-"),
        requestedFile.replace(/-/g, " "),
      ];

      for (const d of possibleDirs) {
        try {
          if (fs.existsSync(d) && fs.statSync(d).isDirectory()) {
            const files = fs.readdirSync(d);
            // 1. Direct alternative variations
            const directAlt = files.find((f) =>
              altNames.some((alt) => alt.toLowerCase() === f.toLowerCase())
            );
            if (directAlt) {
              fullPath = path.join(d, directAlt);
              break;
            }
            // 2. Chapter prefix matching (e.g. chapter-03)
            const chMatch = requestedFile.match(/^(chapter-\d+|ch-\d+)/i);
            if (chMatch) {
              const prefix = chMatch[1].toLowerCase();
              const prefixMatch = files.find(
                (f) => f.toLowerCase().startsWith(prefix) && f.toLowerCase().endsWith(".pdf")
              );
              if (prefixMatch) {
                fullPath = path.join(d, prefixMatch);
                break;
              }
            }
          }
        } catch {}
      }
    }

    if (!fullPath) {
      return NextResponse.json({ error: "Document not found" }, { status: 404 });
    }

    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      // If it's a directory, check for index.html
      const indexPath = path.join(fullPath, "index.html");
      if (fs.existsSync(indexPath)) {
        fullPath = indexPath;
      } else {
        return NextResponse.json({ error: "Cannot stream directory" }, { status: 400 });
      }
    }

    const finalStat = fs.statSync(fullPath);
    const ext = path.extname(fullPath).toLowerCase();
    const contentType = MIME_TYPES[ext] || "application/octet-stream";
    const fileName = path.basename(fullPath);

    // Support HTTP Range requests (crucial for smooth PDF scrolling/seeking)
    const range = req.headers.get("range");

    if (range && ext === ".pdf") {
      const match = /^bytes=(\d*)-(\d*)$/.exec(range.trim());
      if (!match || (!match[1] && !match[2])) {
        return new NextResponse(null, {
          status: 416,
          headers: { "Content-Range": `bytes */${finalStat.size}` },
        });
      }

      let start = match[1] ? Number(match[1]) : Math.max(finalStat.size - Number(match[2]), 0);
      let end = match[1] && match[2] ? Number(match[2]) : finalStat.size - 1;
      if (!Number.isSafeInteger(start) || !Number.isSafeInteger(end) || start < 0 || start >= finalStat.size) {
        return new NextResponse(null, {
          status: 416,
          headers: { "Content-Range": `bytes */${finalStat.size}` },
        });
      }
      end = Math.min(end, finalStat.size - 1);
      if (end < start) {
        return new NextResponse(null, {
          status: 416,
          headers: { "Content-Range": `bytes */${finalStat.size}` },
        });
      }
      const chunkSize = end - start + 1;

      const fileStream = fs.createReadStream(fullPath, { start, end });
      const webStream = new ReadableStream({
        start(controller) {
          fileStream.on("data", (chunk) => controller.enqueue(chunk));
          fileStream.on("end", () => controller.close());
          fileStream.on("error", (err) => controller.error(err));
        },
      });

      return new NextResponse(webStream, {
        status: 206,
        headers: {
          "Content-Range": `bytes ${start}-${end}/${finalStat.size}`,
          "Accept-Ranges": "bytes",
          "Content-Length": String(chunkSize),
          "Content-Type": contentType,
          "Content-Disposition": `inline; filename="${encodeURIComponent(fileName)}"`,
          "Cache-Control": paidSubject ? "private, no-store" : "public, max-age=86400, stale-while-revalidate=604800",
        },
      });
    }

    // Full response
    const fileStream = fs.createReadStream(fullPath);
    const webStream = new ReadableStream({
      start(controller) {
        fileStream.on("data", (chunk) => controller.enqueue(chunk));
        fileStream.on("end", () => controller.close());
        fileStream.on("error", (err) => controller.error(err));
      },
    });

    const isProtectedDocument = Boolean(paidSubject);
    return new NextResponse(webStream, {
      status: 200,
      headers: {
        "Content-Length": String(finalStat.size),
        "Content-Type": contentType,
        "Content-Disposition": `inline; filename="${encodeURIComponent(fileName)}"`,
        "Accept-Ranges": "bytes",
        "Cache-Control": isProtectedDocument ? "private, no-store" : "public, max-age=86400, stale-while-revalidate=604800",
      },
    });
  } catch (err: any) {
    console.error("Vault doc stream error:", err);
    return NextResponse.json({ error: "Failed to load document" }, { status: 500 });
  }
}
