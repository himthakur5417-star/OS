import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact & Admissions",
  description:
    "Contact Officium Supremum to ask about student mentorship, admissions, or an orientation call. Find the available contact options.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact & Admissions | Officium Supremum",
    description:
      "Contact Officium Supremum to ask about student mentorship, admissions, or an orientation call. Find the available contact options.",
    url: "/contact",
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
    title: "Contact & Admissions | Officium Supremum",
    description:
      "Contact Officium Supremum to ask about student mentorship, admissions, or an orientation call. Find the available contact options.",
    images: ["/og-image.png"],
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
