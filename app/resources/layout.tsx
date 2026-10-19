import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Study Library & Resources",
    template: "%s | Officium Supremum",
  },
  description:
    "Explore the Officium Supremum study library, including academic materials, exam preparation resources, and available practice content.",
  alternates: {
    canonical: "/resources",
  },
  openGraph: {
    title: "Study Library & Resources | Officium Supremum",
    description:
      "Explore the Officium Supremum study library, including academic materials, exam preparation resources, and available practice content.",
    url: "/resources",
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
    title: "Study Library & Resources | Officium Supremum",
    description:
      "Explore the Officium Supremum study library, including academic materials, exam preparation resources, and available practice content.",
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
