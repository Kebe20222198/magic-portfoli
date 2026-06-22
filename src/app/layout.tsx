import type { Metadata } from "next";
import { Space_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParticleBackground from "@/components/ParticleBackground";
import BackToTop from "@/components/BackToTop";
import { ThemeProvider } from "@/components/ThemeProvider";

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
});

export const metadata: Metadata = {
  title: {
    default: "Mohamed Kebe — Data & Software Engineer",
    template: "%s | Mohamed Kebe",
  },
  description:
    "Élève-Ingénieur en Data & IA Engineering à l'INSEA. Spécialisé en Data Engineering, architectures distribuées, pipelines de données et intelligence artificielle.",
  keywords: [
    "portfolio",
    "data engineering",
    "software engineer",
    "INSEA",
    "Python",
    "Elixir",
    "Rust",
    "machine learning",
    "NLP",
    "microservices",
  ],
  authors: [{ name: "Mohamed Kebe" }],
  openGraph: {
    title: "Mohamed Kebe — Data & Software Engineer",
    description: "Portfolio de Mohamed Kebe, Élève-Ingénieur en Data & IA Engineering à l'INSEA.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${spaceMono.variable} font-mono antialiased min-h-screen`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {/* Accessibility: skip to content */}
          <a href="#main-content" className="skip-to-content">
            Aller au contenu
          </a>

          <ParticleBackground />
          <Navbar />

          <main id="main-content" className="relative z-10 flex flex-col min-h-screen">
            {children}
            <div className="mt-auto">
              <Footer />
            </div>
          </main>

          <BackToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
