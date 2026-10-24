import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Meet the founder and lead mentor behind Officium Supremum, a discipline-first academy for school students and defence aspirants built on daily accountability.",
  alternates: {
    canonical: "https://www.officiumsupremum.in/about",
  },
  openGraph: {
    title: "About Us | Officium Supremum",
    description:
      "Meet the founder and lead mentor behind Officium Supremum, a discipline-first academy for school students and defence aspirants built on daily accountability.",
    url: "https://www.officiumsupremum.in/about",
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
    title: "About Us | Officium Supremum",
    description:
      "Meet the founder and lead mentor behind Officium Supremum, a discipline-first academy for school students and defence aspirants built on daily accountability.",
    images: ["/og-image.png"],
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
