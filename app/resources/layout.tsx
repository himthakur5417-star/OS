import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "NDA & CDS Study Material",
    template: "%s | Officium Supremum",
  },
  description:
    "Chapter-wise NDA and CDS Maths, English notes, practice questions and solved papers in one study library.",
  alternates: {
    canonical: "https://www.officiumsupremum.in/resources",
  },
  openGraph: {
    title: "NDA & CDS Study Material | Officium Supremum",
    description:
      "Chapter-wise NDA and CDS Maths, English notes, practice questions and solved papers in one study library.",
    url: "https://www.officiumsupremum.in/resources",
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
    title: "NDA & CDS Study Material | Officium Supremum",
    description:
      "Chapter-wise NDA and CDS Maths, English notes, practice questions and solved papers in one study library.",
    images: ["/og-image.png"],
  },
};

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
