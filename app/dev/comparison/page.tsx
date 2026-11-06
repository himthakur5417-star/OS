"use client";

import { GlassAiButton } from "@/src/shaders/glass-ai-button/GlassAiButton";
import { OfficiumGlassButton } from "@/src/shaders/officium-glass-button/OfficiumGlassButton";

export default function ComparisonPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#161314",
        color: "#E8DCC6",
        padding: "40px 24px 60px",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <header style={{ maxWidth: "1320px", margin: "0 auto 32px", textAlign: "center" }}>
        <p style={{ letterSpacing: "0.2em", fontSize: "11px", textTransform: "uppercase", color: "#B7A89A", margin: 0 }}>
          Shader Verification &amp; Visual Audit
        </p>
        <h1 style={{ fontSize: "28px", fontWeight: 600, margin: "8px 0 6px", color: "#FFFFFF" }}>
          Original ThreeUI Reference vs. Officium Supremum Adaptation
        </h1>
        <p style={{ fontSize: "14px", color: "#B7A89A", margin: 0 }}>
          Identical 640×320 Showcase Scale &bull; Direct Optical Comparison
        </p>
      </header>

      <section
        style={{
          maxWidth: "1360px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(580px, 1fr))",
          gap: "28px",
          alignItems: "start",
        }}
      >
        {/* Left: Original ThreeUI Reference */}
        <div
          style={{
            backgroundColor: "#211C1D",
            borderRadius: "16px",
            border: "1px solid rgba(232, 220, 198, 0.12)",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div style={{ width: "100%", marginBottom: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontWeight: 600, fontSize: "14px", color: "#E8DCC6", letterSpacing: "0.05em" }}>
              ORIGINAL THREEUI REFERENCE
            </span>
            <span style={{ fontSize: "11px", color: "#B7A89A", background: "rgba(255,255,255,0.08)", padding: "3px 8px", borderRadius: "999px" }}>
              Silver Background &bull; Galaxy AI Orb
            </span>
          </div>

          <div
            style={{
              width: "100%",
              maxWidth: "600px",
              height: "300px",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
            }}
          >
            <GlassAiButton style={{ width: "100%", height: "100%" }} />
          </div>
        </div>

        {/* Right: Officium Supremum Adaptation */}
        <div
          style={{
            backgroundColor: "#211C1D",
            borderRadius: "16px",
            border: "1px solid rgba(114, 47, 55, 0.45)",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div style={{ width: "100%", marginBottom: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontWeight: 600, fontSize: "14px", color: "#E8DCC6", letterSpacing: "0.05em" }}>
              OFFICIUM SUPREMUM ADAPTATION
            </span>
            <span style={{ fontSize: "11px", color: "#E8DCC6", background: "rgba(114, 47, 55, 0.5)", padding: "3px 8px", borderRadius: "999px" }}>
              Near Black &bull; Optical Glass &bull; Burgundy Orb &bull; Directional Vector
            </span>
          </div>

          <div
            style={{
              width: "100%",
              maxWidth: "600px",
              height: "300px",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
            }}
          >
            <OfficiumGlassButton
              bg="nearblack"
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        </div>
      </section>

      {/* Button Container Scale Showcase (Commanding Desktop Scale 360x88) */}
      <section style={{ maxWidth: "1320px", margin: "48px auto 0", textAlign: "center" }}>
        <p style={{ letterSpacing: "0.15em", fontSize: "12px", textTransform: "uppercase", color: "#B7A89A", marginBottom: "16px" }}>
          Live Dedicated Button Container Scale (360×88px &bull; Auto-Framed 82% Capsule)
        </p>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "32px", flexWrap: "wrap" }}>
          <div style={{ padding: "24px 36px", background: "#211C1D", borderRadius: "16px", border: "1px solid rgba(232, 220, 198, 0.12)" }}>
            <p style={{ fontSize: "11px", color: "#B7A89A", marginBottom: "12px" }}>On Near Black (#211C1D)</p>
            <OfficiumGlassButton bg="nearblack" style={{ width: "360px", height: "88px" }} />
          </div>

          <div style={{ padding: "24px 36px", background: "#722F37", borderRadius: "16px", border: "1px solid rgba(232, 220, 198, 0.2)" }}>
            <p style={{ fontSize: "11px", color: "#E8DCC6", marginBottom: "12px" }}>On Burgundy (#722F37)</p>
            <OfficiumGlassButton bg="burgundy" style={{ width: "360px", height: "88px" }} />
          </div>
        </div>
      </section>
    </main>
  );
}
