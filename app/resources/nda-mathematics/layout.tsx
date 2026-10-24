import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NDA Mathematics Study Material",
  description:
    "Chapter-wise NDA Mathematics syllabus topics, 30 chapter previews, practice questions, and study guidance for UPSC NDA & NA exam preparation.",
  alternates: {
    canonical: "https://www.officiumsupremum.in/resources/nda-mathematics",
  },
  openGraph: {
    title: "NDA Mathematics Study Material | Officium Supremum",
    description:
      "Chapter-wise NDA Mathematics syllabus topics, 30 chapter previews, practice questions, and study guidance for UPSC NDA & NA exam preparation.",
    url: "https://www.officiumsupremum.in/resources/nda-mathematics",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Officium Supremum — NDA Mathematics Study Material",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NDA Mathematics Study Material | Officium Supremum",
    description:
      "Chapter-wise NDA Mathematics syllabus topics, 30 chapter previews, practice questions, and study guidance for UPSC NDA & NA exam preparation.",
    images: ["/og-image.png"],
  },
};

export default function NdaMathsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
