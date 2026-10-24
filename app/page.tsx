import type { Metadata } from "next";
import HomeClient from "@/components/HomeClient";
import { homeFaqs } from "@/lib/faqData";

export const metadata: Metadata = {
  title: "Officium Supremum | Discipline-First Mentorship",
  description:
    "Discipline today. Leadership tomorrow. Personalized study mentorship for Juniors, Scholars, and Defence aspirants with structured plans and steady guidance.",
  alternates: {
    canonical: "https://www.officiumsupremum.in",
  },
  openGraph: {
    title: "Officium Supremum | Discipline-First Mentorship",
    description:
      "Discipline today. Leadership tomorrow. Personalized study mentorship for Juniors, Scholars, and Defence aspirants with structured plans and steady guidance.",
    url: "https://www.officiumsupremum.in",
    siteName: "Officium Supremum",
    locale: "en_IN",
    type: "website",
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
    title: "Officium Supremum | Discipline-First Mentorship",
    description:
      "Discipline today. Leadership tomorrow. Personalized study mentorship for Juniors, Scholars, and Defence aspirants with structured plans and steady guidance.",
    images: ["/og-image.png"],
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Officium Supremum",
  url: "https://www.officiumsupremum.in",
  logo: "https://www.officiumsupremum.in/og-image.png",
  email: "osupremum@gmail.com",
  sameAs: [
    "https://www.instagram.com/officiumsupremum/?hl=en",
    "https://www.linkedin.com/company/officium-supremum/?viewAsMember=true",
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: homeFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a,
    },
  })),
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <HomeClient />
    </>
  );
}
