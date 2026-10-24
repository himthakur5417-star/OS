import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact & Free Call",
  description:
    "Book a free 20-minute counselling call or send an enquiry. Our mentors reply within 6 hours on WhatsApp, phone or email.",
  alternates: {
    canonical: "https://www.officiumsupremum.in/contact",
  },
  openGraph: {
    title: "Contact & Free Call | Officium Supremum",
    description:
      "Book a free 20-minute counselling call or send an enquiry. Our mentors reply within 6 hours on WhatsApp, phone or email.",
    url: "https://www.officiumsupremum.in/contact",
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
    title: "Contact & Free Call | Officium Supremum",
    description:
      "Book a free 20-minute counselling call or send an enquiry. Our mentors reply within 6 hours on WhatsApp, phone or email.",
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
