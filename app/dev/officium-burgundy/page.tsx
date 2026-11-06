"use client";

import { OfficiumGlassButton } from "@/src/shaders/officium-glass-button/OfficiumGlassButton";

export default function OfficiumBurgundyPage() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#722F37",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: 0,
        padding: "20px",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      <OfficiumGlassButton
        bg="burgundy"
        style={{
          width: "360px",
          height: "88px",
          maxWidth: "100%",
        }}
      />
    </div>
  );
}
