"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { usePrefersReducedMotion } from "@/lib/hooks/useMediaQuery";

export interface MagneticButtonProps {
  children: React.ReactNode;
  variant?: "burgundy" | "cream" | "sage" | "sand" | "ivory";
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

  const isSage = variant === "sage" || variant === "burgundy";
  const isSand = variant === "sand";

  // Flat high-contrast editorial styling adhering to B4 (no background gradients)
  let variantStyles = "";
  if (isSage) {
    variantStyles =
      "text-[#F3EFE6] bg-[#34483C] hover:bg-[#252923] border border-[#F3EFE6]/20 shadow-[0_4px_14px_-2px_rgba(52,72,60,0.35)] hover:shadow-[0_8px_20px_-2px_rgba(52,72,60,0.45)] focus-visible:ring-[#B18A58] focus-visible:ring-offset-[#F3EFE6]";
  } else if (isSand) {
    variantStyles =
      "text-[#252923] bg-[#B18A58] hover:bg-[#9d7747] border border-[#252923]/15 shadow-[0_4px_14px_-2px_rgba(177,138,88,0.35)] hover:shadow-[0_8px_20px_-2px_rgba(177,138,88,0.45)] focus-visible:ring-[#34483C] focus-visible:ring-offset-[#F3EFE6]";
  } else {
    // Ivory / Cream
    variantStyles =
      "text-[#34483C] bg-[#F3EFE6] hover:bg-[#EAE4D7] border border-[#D8D5C8] hover:border-[#34483C]/40 shadow-[0_2px_8px_-2px_rgba(37,41,35,0.08)] hover:shadow-[0_6px_16px_-2px_rgba(37,41,35,0.12)] focus-visible:ring-[#34483C] focus-visible:ring-offset-[#F3EFE6]";
  }

  const sharedClasses = `relative inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3 rounded-full font-sans text-xs font-semibold uppercase tracking-[0.16em] select-none cursor-pointer transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.98] ${variantStyles} ${className}`;

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
