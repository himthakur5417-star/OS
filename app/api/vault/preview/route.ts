import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

const PREVIEW_KEY_PATTERN = /^(nda-mathematics|cds-mathematics|nda-cds-english)-chapter-\d+$/;

export async function GET(req: NextRequest) {
  try {
    const documentKey = new URL(req.url).searchParams.get("document") || "";
    if (!PREVIEW_KEY_PATTERN.test(documentKey)) {
      return NextResponse.json({ error: "Preview not found" }, { status: 404 });
    }

    const previewRoot = path.resolve(process.cwd(), "public", "vault-previews");
    const previewPath = path.resolve(previewRoot, `${documentKey}.pdf`);
    const relativePath = path.relative(previewRoot, previewPath);
    if (relativePath.startsWith("..") || path.isAbsolute(relativePath)) {
      return NextResponse.json({ error: "Preview not found" }, { status: 404 });
    }

    const stat = await fs.promises.stat(previewPath).catch(() => null);
    if (!stat || !stat.isFile()) {
      return NextResponse.json({ error: "Preview not found" }, { status: 404 });
    }

    const fileStream = fs.createReadStream(previewPath);
    const webStream = new ReadableStream({
      start(controller) {
        fileStream.on("data", (chunk) => controller.enqueue(chunk));
        fileStream.on("end", () => controller.close());
        fileStream.on("error", (error) => controller.error(error));
      },
      cancel() {
        fileStream.destroy();
      },
    });

    return new NextResponse(webStream, {
      status: 200,
      headers: {
        "Content-Length": String(stat.size),
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${documentKey}-preview.pdf"`,
        "Cache-Control": "public, max-age=86400, immutable",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return NextResponse.json({ error: "Preview could not be loaded" }, { status: 500 });
  }
}
