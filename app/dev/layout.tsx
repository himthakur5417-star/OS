import { notFound } from "next/navigation";
import type { ReactNode } from "react";

// Development-only shader verification routes. Never served in production.
export const metadata = { robots: { index: false, follow: false } };

export default function DevLayout({ children }: { children: ReactNode }) {
  if (process.env.NODE_ENV === "production") notFound();
  return (
    <div className="fixed inset-0 z-[99999] overflow-auto">
      {children}
    </div>
  );
}
