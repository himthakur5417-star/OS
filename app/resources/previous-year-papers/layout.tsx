import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NDA & CDS Previous Year Papers",
  description:
    "NDA and CDS previous year question papers archive. Exam paper analysis, question trends, solved paper archive overview, and exam preparation advice.",
  alternates: {
    canonical: "https://www.officiumsupremum.in/resources/previous-year-papers",
  },
  openGraph: {
    title: "NDA & CDS Previous Year Papers | Officium Supremum",
    description:
      "NDA and CDS previous year question papers archive. Exam paper analysis, question trends, solved paper archive overview, and exam preparation advice.",
    url: "https://www.officiumsupremum.in/resources/previous-year-papers",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Officium Supremum — NDA & CDS Previous Year Papers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NDA & CDS Previous Year Papers | Officium Supremum",
    description:
      "NDA and CDS previous year question papers archive. Exam paper analysis, question trends, solved paper archive overview, and exam preparation advice.",
    images: ["/og-image.png"],
  },
};

export default function PreviousYearPapersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
