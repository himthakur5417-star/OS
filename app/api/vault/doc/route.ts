import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

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

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    let relPath = searchParams.get("file") || "";

    if (!relPath) {
      return NextResponse.json({ error: "Missing file parameter" }, { status: 400 });
    }

    // Decode URI component (e.g. %20 -> space)
    try {
      relPath = decodeURIComponent(relPath);
    } catch {}

    // Normalize and remove leading slash
    relPath = relPath.replace(/^[/\\]+/, "").trim();

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
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : finalStat.size - 1;
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

    return new NextResponse(webStream, {
      status: 200,
      headers: {
        "Content-Length": String(finalStat.size),
        "Content-Type": contentType,
        "Content-Disposition": `inline; filename="${encodeURIComponent(fileName)}"`,
        "Accept-Ranges": "bytes",
        "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
      },
    });
  } catch (err: any) {
    console.error("Vault doc stream error:", err);
    return NextResponse.json({ error: "Failed to load document" }, { status: 500 });
  }
}
