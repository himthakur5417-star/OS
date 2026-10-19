import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NDA & CDS Syllabus and Exam Pattern",
  description:
    "Review NDA and CDS syllabus details, exam structure, marks distribution, and SSB stages covered by the syllabus resource.",
  alternates: {
    canonical: "/resources/syllabus",
  },
  openGraph: {
    title: "NDA & CDS Syllabus and Exam Pattern | Officium Supremum",
    description:
      "Review NDA and CDS syllabus details, exam structure, marks distribution, and SSB stages covered by the syllabus resource.",
    url: "/resources/syllabus",
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
    title: "NDA & CDS Syllabus and Exam Pattern | Officium Supremum",
    description:
      "Review NDA and CDS syllabus details, exam structure, marks distribution, and SSB stages covered by the syllabus resource.",
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
