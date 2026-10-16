"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "./AuthContext";

export function TrafficTracker() {
  const pathname = usePathname();
  const { user } = useAuth();
  const lastLogged = useRef<string>("");

  useEffect(() => {
    // Prevent duplicate logs for same path within 1.5 seconds
    const currentKey = `${pathname}:${user?.email || "anon"}`;
    if (lastLogged.current === currentKey) return;
    lastLogged.current = currentKey;

    try {
      fetch("/api/traffic/log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          path: pathname,
          userEmail: user?.email || undefined,
          role: user?.role || "guest",
          referrer: typeof document !== "undefined" ? document.referrer || "" : "",
        }),
      }).catch(() => {});
    } catch (e) {}
  }, [pathname, user]);

  return null;
}
