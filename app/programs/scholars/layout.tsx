import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Class 11–12 Board & Entrance Mentorship",
  description:
    "Balance boards with entrance exams through 90-minute focus blocks, active revision and weekly mentor sessions.",
  alternates: {
    canonical: "https://www.officiumsupremum.in/programs/scholars",
  },
  openGraph: {
    title: "Class 11–12 Board & Entrance Mentorship | Officium Supremum",
    description:
      "Balance boards with entrance exams through 90-minute focus blocks, active revision and weekly mentor sessions.",
    url: "https://www.officiumsupremum.in/programs/scholars",
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
    title: "Class 11–12 Board & Entrance Mentorship | Officium Supremum",
    description:
      "Balance boards with entrance exams through 90-minute focus blocks, active revision and weekly mentor sessions.",
    images: ["/og-image.png"],
  },
};

const courseSchema = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "Class 11–12 Board & Entrance Mentorship",
  description:
    "Balance boards with entrance exams through 90-minute focus blocks, active revision and weekly mentor sessions.",
  url: "https://www.officiumsupremum.in/programs/scholars",
  provider: {
    "@type": "Organization",
    name: "Officium Supremum",
    url: "https://www.officiumsupremum.in",
  },
};

export default function ScholarsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      {children}
    </>
  );
}
