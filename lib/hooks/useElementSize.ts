"use client";

import { useEffect, useState, type RefObject } from "react";

export interface ElementSize {
  width: number;
  height: number;
}

/**
 * Tracks an element's content-box size with a ResizeObserver.
 * Only updates state when the rounded size actually changes, so scroll
 * animations never trigger React re-renders.
 */
export function useElementSize<T extends HTMLElement>(ref: RefObject<T>): ElementSize | null {
  const [size, setSize] = useState<ElementSize | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const measure = () => {
      const rect = el.getBoundingClientRect();
      const width = Math.round(rect.width);
      const height = Math.round(rect.height);
      if (width > 0 && height > 0) {
        setSize((prev) => (prev && prev.width === width && prev.height === height ? prev : { width, height }));
      }
    };

    measure();

    const ro = new ResizeObserver((entries) => {
      const rect = entries[0]?.contentRect;
      if (!rect) return;
      const width = Math.round(rect.width);
      const height = Math.round(rect.height);
      if (width > 0 && height > 0) {
        setSize((prev) => (prev && prev.width === width && prev.height === height ? prev : { width, height }));
      }
    });

    ro.observe(el);
    return () => ro.disconnect();
  }, [ref, size === null]);

  return size;
}
