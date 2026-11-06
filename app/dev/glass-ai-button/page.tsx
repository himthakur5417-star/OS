"use client";

import { GlassAiButton } from "@/src/shaders/glass-ai-button/GlassAiButton";
import "@/src/shaders/threeui.css";
import Link from "next/link";

export default function GlassAiButtonDevPage() {
  return (
    <main className="min-h-screen bg-[#111317] text-white flex flex-col items-center justify-center p-6 gap-6">
      <div className="text-center max-w-2xl space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">
          ThreeUI GlassAiButton — Exact Original Reference
        </h1>
        <p className="text-sm text-neutral-400">
          Unmodified ThreeUI source at full inspection scale (960×480). Embedded Three.js r170, custom GLSL,
          convex capsule geometry, transmission glass, galaxy orb, 4K label canvas.
        </p>
      </div>

      {/* Large inspection container matching ThreeUI showcase framing */}
      <div className="w-[960px] max-w-full h-[480px] relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
        <GlassAiButton style={{ width: "100%", height: "100%" }} />
      </div>

      <div className="flex gap-4 text-xs text-neutral-400">
        <Link href="/dev/comparison" className="hover:text-white underline">
          Go to Comparison Preview &rarr;
        </Link>
      </div>
    </main>
  );
}
