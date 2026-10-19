import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Defence & NDA/CDS Mentorship",
  description:
    "Explore NDA, CDS, and AFCAT preparation with structured study plans, written exam practice, and SSB guidance where offered by the program.",
  alternates: {
    canonical: "/programs/defense",
  },
  openGraph: {
    title: "Defence & NDA/CDS Mentorship | Officium Supremum",
    description:
      "Explore NDA, CDS, and AFCAT preparation with structured study plans, written exam practice, and SSB guidance where offered by the program.",
    url: "/programs/defense",
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
    title: "Defence & NDA/CDS Mentorship | Officium Supremum",
    description:
      "Explore NDA, CDS, and AFCAT preparation with structured study plans, written exam practice, and SSB guidance where offered by the program.",
    images: ["/og-image.png"],
  },
};

export default function DefenseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
