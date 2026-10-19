import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Juniors Mentorship (Class 7–10)",
  description:
    "Build consistent study habits and focused routines with personalized academic guidance and accountability for students in Classes 7 to 10.",
  alternates: {
    canonical: "/programs/juniors",
  },
  openGraph: {
    title: "Juniors Mentorship (Class 7–10) | Officium Supremum",
    description:
      "Build consistent study habits and focused routines with personalized academic guidance and accountability for students in Classes 7 to 10.",
    url: "/programs/juniors",
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
    title: "Juniors Mentorship (Class 7–10) | Officium Supremum",
    description:
      "Build consistent study habits and focused routines with personalized academic guidance and accountability for students in Classes 7 to 10.",
    images: ["/og-image.png"],
  },
};

export default function JuniorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
