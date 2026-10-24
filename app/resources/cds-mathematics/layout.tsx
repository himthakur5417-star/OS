import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CDS Mathematics Study Material",
  description:
    "Chapter-wise CDS Mathematics study material, 22 chapter topics, practice questions, and study guidance for UPSC CDS Elementary Mathematics preparation.",
  alternates: {
    canonical: "https://www.officiumsupremum.in/resources/cds-mathematics",
  },
  openGraph: {
    title: "CDS Mathematics Study Material | Officium Supremum",
    description:
      "Chapter-wise CDS Mathematics study material, 22 chapter topics, practice questions, and study guidance for UPSC CDS Elementary Mathematics preparation.",
    url: "https://www.officiumsupremum.in/resources/cds-mathematics",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Officium Supremum — CDS Mathematics Study Material",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CDS Mathematics Study Material | Officium Supremum",
    description:
      "Chapter-wise CDS Mathematics study material, 22 chapter topics, practice questions, and study guidance for UPSC CDS Elementary Mathematics preparation.",
    images: ["/og-image.png"],
  },
};

export default function CdsMathsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
