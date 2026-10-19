import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us & Founder Story",
  description:
    "Learn about the founder's journey and the discipline-first mentorship approach behind Officium Supremum.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Us & Founder Story | Officium Supremum",
    description:
      "Learn about the founder's journey and the discipline-first mentorship approach behind Officium Supremum.",
    url: "/about",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Officium Supremum — Modern Discipline-First Learning Academy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us & Founder Story | Officium Supremum",
    description:
      "Learn about the founder's journey and the discipline-first mentorship approach behind Officium Supremum.",
    images: ["/og-image.png"],
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
