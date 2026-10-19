import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Scholars Mentorship (Class 11–12)",
  description:
    "Prepare for board exams and entrance tests with structured study schedules, revision planning, and individual mentorship for Classes 11 and 12.",
  alternates: {
    canonical: "/programs/scholars",
  },
  openGraph: {
    title: "Scholars Mentorship (Class 11–12) | Officium Supremum",
    description:
      "Prepare for board exams and entrance tests with structured study schedules, revision planning, and individual mentorship for Classes 11 and 12.",
    url: "/programs/scholars",
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
    title: "Scholars Mentorship (Class 11–12) | Officium Supremum",
    description:
      "Prepare for board exams and entrance tests with structured study schedules, revision planning, and individual mentorship for Classes 11 and 12.",
    images: ["/og-image.png"],
  },
};

export default function ScholarsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
