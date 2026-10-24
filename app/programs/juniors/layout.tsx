import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Class 7–10 Study Mentorship",
  description:
    "Daily study routine, reading practice and habit tracking for Class 7–10 students, with evening progress checks and parent updates.",
  alternates: {
    canonical: "https://www.officiumsupremum.in/programs/juniors",
  },
  openGraph: {
    title: "Class 7–10 Study Mentorship | Officium Supremum",
    description:
      "Daily study routine, reading practice and habit tracking for Class 7–10 students, with evening progress checks and parent updates.",
    url: "https://www.officiumsupremum.in/programs/juniors",
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
    title: "Class 7–10 Study Mentorship | Officium Supremum",
    description:
      "Daily study routine, reading practice and habit tracking for Class 7–10 students, with evening progress checks and parent updates.",
    images: ["/og-image.png"],
  },
};

const courseSchema = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "Class 7–10 Study Mentorship",
  description:
    "Daily study routine, reading practice and habit tracking for Class 7–10 students, with evening progress checks and parent updates.",
  url: "https://www.officiumsupremum.in/programs/juniors",
  provider: {
    "@type": "Organization",
    name: "Officium Supremum",
    url: "https://www.officiumsupremum.in",
  },
};

export default function JuniorsLayout({
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
