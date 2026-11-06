"use client";

import { OfficiumGlassButton } from "@/src/shaders/officium-glass-button/OfficiumGlassButton";

export default function OfficiumNearBlackPage() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#211C1D",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: 0,
        padding: "20px",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      <div className="w-[280px] h-[74px] sm:w-[320px] sm:h-[82px] md:w-[360px] md:h-[88px] flex items-center justify-center">
        <OfficiumGlassButton
          bg="nearblack"
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    </div>
  );
}
