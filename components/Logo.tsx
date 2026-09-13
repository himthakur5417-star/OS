"use client";

import React, { useId } from "react";

export interface LogoProps {
  variant?: "light" | "dark" | "tactical" | "gold" | "monochrome";
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "hero";
  showText?: boolean;
  goldAccent?: boolean;
  className?: string;
}

export function Logo({
  variant = "light",
  size = "md",
  showText = true,
  goldAccent = false,
  className = "",
}: LogoProps) {
  const rawId = useId();
  // Safe sanitized ID for SVG mask element across SSR and Client hydration
  const maskId = `os-cutout-${rawId.replace(/[^a-zA-Z0-9_-]/g, "")}`;

  // Pixel heights to ensure SVG never overflows even before CSS loads
  const pixelHeights = {
    xs: 24,
    sm: 32,
    md: 42,
    lg: 50,
    xl: 64,
    hero: 84,
  };

  const currentHeight = pixelHeights[size] || 42;
  // Aspect ratio is 260:100 (2.6) for full lockup to give ample room for "OFFICIUM SUPREMUM", 1:1 for monogram
  const currentWidth = showText ? Math.round(currentHeight * 2.6) : currentHeight;

  // Color mapping based on variant
  const colorMap = {
    light: {
      primary: "#0F1115", // Deep academy obsidian ink
      accent: goldAccent ? "#C8A84E" : "#0F1115",
      hoverAccent: "#C8A84E",
    },
    dark: {
      primary: "#FFFFFF",
      accent: "#C8A84E",
      hoverAccent: "#E5C875",
    },
    tactical: {
      primary: "#F7F5F0",
      accent: "#C8A84E",
      hoverAccent: "#E5C875",
    },
    gold: {
      primary: "#C8A84E",
      accent: "#C8A84E",
      hoverAccent: "#E5C875",
    },
    monochrome: {
      primary: "currentColor",
      accent: "currentColor",
      hoverAccent: "currentColor",
    },
  };

  const colors = colorMap[variant] || colorMap.light;

  if (!showText) {
    // Monogram-only mark: circular crescent disk + center pupil dot
    return (
      <svg
        className={`shrink-0 transition-transform duration-200 ${className}`}
        viewBox="5 5 90 90"
        preserveAspectRatio="xMidYMid meet"
        width={currentWidth}
        height={currentHeight}
        style={{
          width: `${currentWidth}px`,
          height: `${currentHeight}px`,
          display: "inline-block",
          verticalAlign: "middle",
        }}
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Officium Supremum Monogram"
      >
        <defs>
          <mask id={maskId}>
            <rect x="0" y="0" width="100%" height="100%" fill="#ffffff" />
            <circle cx="80" cy="50" r="26" fill="#000000" />
          </mask>
        </defs>
        {/* Outer circular emblem with crescent cutout */}
        <circle cx="50" cy="50" r="45" fill={colors.primary} mask={`url(#${maskId})`} />
        {/* Inner pupil dot */}
        <circle cx="80" cy="50" r="10" fill={colors.primary} />
      </svg>
    );
  }

  // Full official brand lockup (emblem + "s." + "OFFICIUM SUPREMUM")
  // viewBox expanded to 260 width to ensure "OFFICIUM SUPREMUM" never clips the final "M"
  return (
    <svg
      className={`shrink-0 transition-all duration-200 ${className}`}
      viewBox="0 0 260 100"
      preserveAspectRatio="xMinYMid meet"
      width={currentWidth}
      height={currentHeight}
      style={{
        height: `${currentHeight}px`,
        width: "auto",
        maxWidth: "100%",
        display: "inline-block",
        verticalAlign: "middle",
        overflow: "visible",
      }}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Officium Supremum"
    >
      <defs>
        <mask id={maskId}>
          <rect x="0" y="0" width="100%" height="100%" fill="#ffffff" />
          <circle cx="80" cy="50" r="26" fill="#000000" />
        </mask>
      </defs>

      {/* Outer circular emblem with crescent cutout */}
      <circle
        cx="50"
        cy="50"
        r="45"
        fill={colors.primary}
        mask={`url(#${maskId})`}
        className="transition-colors duration-200"
      />

      {/* Inner pupil dot */}
      <circle
        cx="80"
        cy="50"
        r="10"
        fill={colors.primary}
        className="transition-colors duration-200"
      />

      {/* Typographic "s." mark */}
      <text
        x="108"
        y="66"
        fontFamily="var(--font-oswald), 'Oswald', sans-serif"
        fontWeight="700"
        fontSize="46"
        fill={colors.primary}
        className="transition-colors duration-200 select-none"
      >
        s.
      </text>

      {/* Brand title "OFFICIUM SUPREMUM" with full width allowance */}
      <text
        x="88"
        y="86"
        fontFamily="var(--font-oswald), 'Oswald', sans-serif"
        fontWeight="600"
        fontSize="14.5"
        letterSpacing="0.05em"
        fill={colors.accent}
        className="transition-colors duration-200 select-none"
      >
        OFFICIUM SUPREMUM
      </text>
    </svg>
  );
}
