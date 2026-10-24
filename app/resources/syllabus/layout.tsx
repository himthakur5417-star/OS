import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NDA, CDS & SSB Syllabus and Pattern",
  description:
    "Subject-wise syllabus, marking scheme and SSB 5-day interview pattern for NDA and CDS.",
  alternates: {
    canonical: "https://www.officiumsupremum.in/resources/syllabus",
  },
  openGraph: {
    title: "NDA, CDS & SSB Syllabus and Pattern | Officium Supremum",
    description:
      "Subject-wise syllabus, marking scheme and SSB 5-day interview pattern for NDA and CDS.",
    url: "https://www.officiumsupremum.in/resources/syllabus",
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
    title: "NDA, CDS & SSB Syllabus and Pattern | Officium Supremum",
    description:
      "Subject-wise syllabus, marking scheme and SSB 5-day interview pattern for NDA and CDS.",
    images: ["/og-image.png"],
  },
};

export default function SyllabusLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
