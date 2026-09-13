import type { Metadata } from "next";
import { Fraunces, Oswald, Inter } from "next/font/google";
import "@/styles/globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ModalProvider } from "@/components/ModalContext";
import { AuthProvider } from "@/components/AuthContext";
import { AuthModal } from "@/components/AuthModal";
import { LoginModal } from "@/components/LoginModal";
import { AIAssistantModal } from "@/components/AIAssistantModal";
import { OrientationModal } from "@/components/OrientationModal";


const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Officium Supremum — Modern Discipline-First Learning Academy",
  description:
    "Discipline today. Leadership tomorrow. Structured mentorship for Juniors (Class 7-10), Scholars (Class 11-12), and Defense Aspirants (NDA, CDS, AFCAT).",
  keywords: [
    "Officium Supremum",
    "NDA Mentorship",
    "CDS Preparation",
    "Class 7-10 Juniors Program",
    "Class 11-12 Scholars Program",
    "Academic Discipline",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${oswald.variable} ${inter.variable}`}>
      <body className="bg-[#FAFAF9] text-[#0F172A] font-sans antialiased min-h-screen flex flex-col selection:bg-[#C8A84E] selection:text-white">
        <AuthProvider>
          <ModalProvider>
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
            <AuthModal />
            <LoginModal />
            <AIAssistantModal />
            <OrientationModal />

          </ModalProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
