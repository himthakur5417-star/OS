import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans, Tiro_Devanagari_Hindi } from "next/font/google";
import "@/styles/globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ModalProvider } from "@/components/ModalContext";
import { AuthProvider } from "@/components/AuthContext";
import { AuthModal } from "@/components/AuthModal";
import { OrientationModal } from "@/components/OrientationModal";
import { TrafficTracker } from "@/components/TrafficTracker";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const tiroHindi = Tiro_Devanagari_Hindi({
  subsets: ["devanagari"],
  variable: "--font-tiro-devanagari",
  display: "swap",
  weight: "400",
  style: "normal",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.officiumsupremum.in"),
  title: {
    default: "Officium Supremum | Discipline-First Mentorship",
    template: "%s | Officium Supremum",
  },
  description:
    "Discipline today. Leadership tomorrow. Personalized study mentorship for Juniors, Scholars, and Defence aspirants with structured plans and steady guidance.",
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
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jakarta.variable} ${tiroHindi.variable}`}>
      <body className="bg-[#F3EFE6] text-[#252923] font-sans antialiased min-h-screen flex flex-col selection:bg-[#34483C] selection:text-[#F3EFE6]">
        <AuthProvider>
          <ModalProvider>
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
            <AuthModal />
            <OrientationModal />
            <TrafficTracker />
          </ModalProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
