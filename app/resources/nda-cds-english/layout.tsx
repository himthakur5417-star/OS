import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NDA & CDS English Study Material",
  description:
    "Chapter-wise English study material for NDA and CDS exams. Grammar rules, vocabulary archives, reading comprehension topics, and study guidance.",
  alternates: {
    canonical: "https://www.officiumsupremum.in/resources/nda-cds-english",
  },
  openGraph: {
    title: "NDA & CDS English Study Material | Officium Supremum",
    description:
      "Chapter-wise English study material for NDA and CDS exams. Grammar rules, vocabulary archives, reading comprehension topics, and study guidance.",
    url: "https://www.officiumsupremum.in/resources/nda-cds-english",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Officium Supremum — NDA & CDS English Study Material",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NDA & CDS English Study Material | Officium Supremum",
    description:
      "Chapter-wise English study material for NDA and CDS exams. Grammar rules, vocabulary archives, reading comprehension topics, and study guidance.",
    images: ["/og-image.png"],
  },
};

export default function NdaCdsEnglishLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
