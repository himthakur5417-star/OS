import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Free Orientation",
  description:
    "Schedule a 20-minute 1-on-1 orientation call with our lead mentors. Discuss your goals, daily routine, and structured academic preparation plan.",
  alternates: {
    canonical: "https://www.officiumsupremum.in/book-orientation",
  },
  openGraph: {
    title: "Book a Free Orientation | Officium Supremum",
    description:
      "Schedule a 20-minute 1-on-1 orientation call with our lead mentors. Discuss your goals, daily routine, and structured academic preparation plan.",
    url: "https://www.officiumsupremum.in/book-orientation",
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
    title: "Book a Free Orientation | Officium Supremum",
    description:
      "Schedule a 20-minute 1-on-1 orientation call with our lead mentors. Discuss your goals, daily routine, and structured academic preparation plan.",
    images: ["/og-image.png"],
  },
};

export default function BookOrientationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
