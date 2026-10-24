import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NDA, CDS & AFCAT Online Mentorship",
  description:
    "Personal mentorship for NDA, CDS and AFCAT: Maths and English practice, mock tests, SSB prep and a daily fitness routine.",
  alternates: {
    canonical: "https://www.officiumsupremum.in/programs/defence",
  },
  openGraph: {
    title: "NDA, CDS & AFCAT Online Mentorship | Officium Supremum",
    description:
      "Personal mentorship for NDA, CDS and AFCAT: Maths and English practice, mock tests, SSB prep and a daily fitness routine.",
    url: "https://www.officiumsupremum.in/programs/defence",
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
    title: "NDA, CDS & AFCAT Online Mentorship | Officium Supremum",
    description:
      "Personal mentorship for NDA, CDS and AFCAT: Maths and English practice, mock tests, SSB prep and a daily fitness routine.",
    images: ["/og-image.png"],
  },
};

export default function DefenceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
