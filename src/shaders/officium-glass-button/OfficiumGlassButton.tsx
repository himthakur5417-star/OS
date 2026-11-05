"use client";

import { useEffect, useRef, useState, useMemo, type CSSProperties } from "react";
import sourceDocument from "./sources/officium-glass-button.html?raw";
import { ArrowRight } from "lucide-react";

export type OfficiumGlassButtonProps = {
  label?: string;
  href?: string;
  onClick?: () => void;
  className?: string;
  style?: CSSProperties;
  disabled?: boolean;
  bg?: "nearblack" | "burgundy" | "threeui";
};

export function OfficiumGlassButton({
  label = "EXPLORE PROGRAMS",
  href = "#programs",
  onClick,
  className = "",
  style,
  disabled = false,
  bg = "nearblack",
}: OfficiumGlassButtonProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [documentVisible, setDocumentVisible] = useState(() => (
    typeof document === "undefined" || !document.hidden
  ));
  const [hostVisible, setHostVisible] = useState(false);
  const [hasEverBeenVisible, setHasEverBeenVisible] = useState(false);
  const [ready, setReady] = useState(false);
  const [webGlSupported, setWebGlSupported] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check reduced motion preference safely
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Check WebGL 2 support
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
      if (!gl) {
        setWebGlSupported(false);
      }
    } catch {
      setWebGlSupported(false);
    }
  }, []);

  // Viewport intersection observer to avoid GPU activity offscreen
  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;
    if (typeof IntersectionObserver === "undefined") {
      setHostVisible(true);
      setHasEverBeenVisible(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVis = entry?.isIntersecting ?? true;
        setHostVisible(isVis);
        if (isVis) {
          setHasEverBeenVisible(true);
        }
      },
      { rootMargin: "100px" }
    );
    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  // Tab visibility change
  useEffect(() => {
    if (typeof document === "undefined") return undefined;
    const update = () => setDocumentVisible(!document.hidden);
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  // Unified action dispatcher (immediate navigation, zero artificial delay)
  const handleAction = () => {
    if (disabled) return;
    onClick?.();
    if (href) {
      if (href.startsWith("#")) {
        const id = href.slice(1);
        const target = document.getElementById(id) || document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
          try {
            window.history.pushState(null, "", href);
          } catch {
            // ignore history state errors if any
          }
        } else {
          window.location.hash = href;
        }
      } else {
        window.location.href = href;
      }
    }
  };

  // Listen for iframe click message
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      // Sandboxed srcdoc frames have an opaque origin, so verify the sender by window identity.
      if (!frameRef.current || e.source !== frameRef.current.contentWindow) return;
      if (e.data?.type === "officium-glass-click" && !disabled) {
        handleAction();
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [onClick, href, disabled]);

  // Keep mounted once visible so scrolling away and returning doesn't cause iframe reloading/flashing
  const mounted = (hasEverBeenVisible || hostVisible) && documentVisible && webGlSupported && !prefersReducedMotion;

  // Build customized HTML document with customized label and background
  const customizedHtml = useMemo(() => {
    let html = sourceDocument;
    const safe = (label || "").toUpperCase().replace(/[^A-Z0-9 &\-]/g, "").slice(0, 24).trim();
    if (safe && safe !== "EXPLORE PROGRAMS") {
      html = html.replace("'EXPLORE PROGRAMS'", `'${safe}'`);
    }
    if (bg && bg !== "nearblack") {
      html = html.replace(
        "const bgMode = query.get('bg') || 'nearblack';",
        `const bgMode = '${bg}';`
      );
    }
    return html;
  }, [label, bg]);

  // Determine fallback background color
  const fallbackBg = bg === "burgundy" ? "#722F37" : bg === "threeui" ? "#a8b0bd" : "#211C1D";

  // Fallback CTA click handler
  const handleFallbackClick = (e: React.MouseEvent) => {
    e.preventDefault();
    handleAction();
  };

  // If WebGL is not supported or reduced motion is requested, render static accessible CTA
  if (!webGlSupported || prefersReducedMotion) {
    return (
      <a
        href={href}
        onClick={handleFallbackClick}
        className={`inline-flex items-center justify-center gap-3 sm:gap-4 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full border border-[#E8DCC6]/30 hover:bg-[#722F37]/35 text-[#E8DCC6] font-sans font-medium text-xs sm:text-sm tracking-wider uppercase transition-all shadow-xl group ${className}`}
        style={{ backgroundColor: fallbackBg, ...style }}
        role="button"
        aria-label={`${label} — View mentorship programs`}
      >
        <span className="w-2.5 h-2.5 rounded-full bg-[#722F37]" />
        <span>{label}</span>
        <ArrowRight className="w-4 h-4 text-[#E8DCC6] group-hover:translate-x-1 transition-transform" />
      </a>
    );
  }

  return (
    <div
      ref={hostRef}
      tabIndex={0}
      role="link"
      aria-label={`${label} — View mentorship programs`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleAction();
        }
      }}
      className={`relative inline-block select-none max-w-full rounded-full overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8DCC6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#211C1D] officium-glass-cta ${className}`}
      style={{
        ...style,
      }}
    >
      {/* Fallback & Initial placeholder to prevent any layout shift */}
      <a
        href={href}
        onClick={handleFallbackClick}
        tabIndex={ready ? -1 : 0}
        aria-hidden={ready}
        className="absolute inset-0 z-0 flex items-center justify-between px-6 sm:px-8 rounded-full border border-[#E8DCC6]/20 text-[#E8DCC6] font-sans text-xs sm:text-sm uppercase tracking-wider transition-opacity duration-300 shadow-lg"
        style={{
          backgroundColor: fallbackBg,
          opacity: ready ? 0 : 1,
          pointerEvents: ready ? "none" : "auto",
        }}
      >
        <span className="flex items-center gap-2.5 sm:gap-3">
          <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#722F37] shadow-[0_0_10px_#722F37]" />
          <span className="font-semibold text-xs tracking-widest">{label}</span>
        </span>
        <ArrowRight className="w-4 h-4 text-[#E8DCC6]" />
      </a>

      {/* Embedded 3D Shader Glass Capsule */}
      {mounted ? (
        <iframe
          ref={frameRef}
          title={`${label} — Officium Glass CTA`}
          srcDoc={customizedHtml}
          sandbox="allow-scripts"
          loading="eager"
          onLoad={() => setReady(true)}
          className="absolute inset-0 w-full h-full border-0 rounded-full transition-opacity duration-300"
          style={{
            background: "transparent",
            opacity: ready ? 1 : 0,
            pointerEvents: ready ? "auto" : "none",
          }}
        />
      ) : null}
    </div>
  );
}
