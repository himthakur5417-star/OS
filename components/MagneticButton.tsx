"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { usePrefersReducedMotion } from "@/lib/hooks/useMediaQuery";

export interface MagneticButtonProps {
  children: React.ReactNode;
  variant?: "burgundy" | "cream";
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  ariaLabel?: string;
  target?: string;
  rel?: string;
}

/**
 * Unified Magnetic Raised Button for Officium Supremum.
 *
 * Variants:
 * - "burgundy" (Primary): Solid Burgundy gradient (#7A3038 -> #5C2329), upper edge highlight,
 *   soft burgundy elevation shadow, raised 3D feel.
 * - "cream" (Secondary): Warm cream surface (#FAF7F2 -> #EFE8DD), burgundy text,
 *   subtle burgundy/taupe edge, soft ambient shadow, raised 3D feel.
 *
 * Interaction:
 * - Magnetic / glue-like cursor attraction on desktop hover (+/- 5-6px pull, 1-2px lift).
 * - Label / icon subtle parallax (+/- 2px).
 * - Smooth cubic-bezier return on mouse leave.
 * - Disabled on touch / (hover: none) and prefers-reduced-motion.
 * - Clear keyboard focus-visible ring.
 */
export function MagneticButton({
  children,
  variant = "burgundy",
  href,
  onClick,
  className = "",
  type = "button",
  ariaLabel,
  target,
  rel,
}: MagneticButtonProps) {
  const elementRef = useRef<HTMLElement | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (reducedMotion) return;
    if (
      typeof window !== "undefined" &&
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches
    ) {
      return;
    }
    const el = elementRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;

    // Restrained, subtle pull: capped at +/- 6px horizontal, +/- 5px vertical
    const pullX = Math.max(-6, Math.min(6, deltaX * 0.16));
    const pullY = Math.max(-5, Math.min(5, deltaY * 0.16));
    setOffset({ x: pullX, y: pullY });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setOffset({ x: 0, y: 0 });
  };

  const isBurgundy = variant === "burgundy";

  // Base styling per variant
  const variantStyles = isBurgundy
    ? "text-[#FAF7F2] border border-white/20 bg-gradient-to-b from-[#7A3038] to-[#5C2329] shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.28),0_10px_24px_-4px_rgba(114,47,55,0.45),0_3px_8px_-2px_rgba(114,47,55,0.3)] hover:shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.38),0_16px_32px_-4px_rgba(114,47,55,0.55),0_5px_12px_-2px_rgba(114,47,55,0.38)] active:shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.25),0_4px_12px_-2px_rgba(114,47,55,0.35)] focus-visible:ring-offset-[#211C1D]"
    : "text-[#722F37] border border-[#722F37]/20 bg-gradient-to-b from-[#FAF7F2] to-[#EFE8DD] shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.75),0_10px_22px_-4px_rgba(0,0,0,0.25),0_3px_8px_-2px_rgba(0,0,0,0.16)] hover:shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.9),0_14px_28px_-4px_rgba(0,0,0,0.32),0_4px_10px_-2px_rgba(0,0,0,0.22)] active:shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.1),0_4px_12px_-2px_rgba(0,0,0,0.18)] focus-visible:ring-offset-[#FAF7F2]";

  const sharedClasses = `relative inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 sm:py-4 rounded-full font-sans text-xs font-semibold uppercase tracking-[0.16em] select-none cursor-pointer transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#722F37] focus-visible:ring-offset-2 active:scale-[0.98] ${variantStyles} ${className}`;

  const transformStyle = {
    transform:
      isHovered && !reducedMotion
        ? `translate3d(${offset.x}px, ${offset.y - 1.5}px, 0)`
        : "translate3d(0, 0, 0)",
    transition: isHovered
      ? "transform 0.08s ease-out, box-shadow 0.25s ease"
      : "transform 0.35s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.3s ease",
  };

  const innerParallaxStyle = {
    transform:
      isHovered && !reducedMotion
        ? `translate3d(${offset.x * 0.35}px, ${offset.y * 0.35}px, 0)`
        : "translate3d(0, 0, 0)",
    transition: isHovered
      ? "transform 0.08s ease-out"
      : "transform 0.35s cubic-bezier(0.25, 1, 0.5, 1)",
  };

  const content = (
    <span
      style={innerParallaxStyle}
      className="inline-flex items-center gap-2.5"
    >
      {children}
    </span>
  );

  if (href) {
    // If internal hash or path
    if (href.startsWith("#") || href.startsWith("/")) {
      return (
        <Link
          ref={elementRef as React.RefObject<HTMLAnchorElement>}
          href={href}
          onClick={onClick}
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          aria-label={ariaLabel}
          style={transformStyle}
          className={sharedClasses}
          target={target}
          rel={rel}
        >
          {content}
        </Link>
      );
    }

    return (
      <a
        ref={elementRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        aria-label={ariaLabel}
        style={transformStyle}
        className={sharedClasses}
        target={target}
        rel={rel}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={elementRef as React.RefObject<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-label={ariaLabel}
      style={transformStyle}
      className={sharedClasses}
    >
      {content}
    </button>
  );
}
