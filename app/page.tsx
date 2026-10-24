import type { Metadata } from "next";
import HomeClient from "@/components/HomeClient";

export const metadata: Metadata = {
  title: "Officium Supremum | Discipline-First Mentorship",
  description:
    "Discipline today. Leadership tomorrow. Personalized study mentorship for Juniors, Scholars, and Defence aspirants with structured plans and steady guidance.",
  alternates: {
    canonical: "https://www.officiumsupremum.in",
  },
  openGraph: {
    title: "Officium Supremum | Discipline-First Mentorship",
    description:
      "Discipline today. Leadership tomorrow. Personalized study mentorship for Juniors, Scholars, and Defence aspirants with structured plans and steady guidance.",
    url: "https://www.officiumsupremum.in",
    siteName: "Officium Supremum",
    locale: "en_IN",
    type: "website",
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
    title: "Officium Supremum | Discipline-First Mentorship",
    description:
      "Discipline today. Leadership tomorrow. Personalized study mentorship for Juniors, Scholars, and Defence aspirants with structured plans and steady guidance.",
    images: ["/og-image.png"],
  },
};

export default function HomePage() {
  return <HomeClient />;
}
