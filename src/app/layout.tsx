import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { RevealController } from "@/components/Motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import { ThemeProvider } from "@/components/ThemeProvider";
import { personalInfo } from "@/data/portfolio";
import { siteUrl } from "@/lib/site-url";

const sans = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-sans", display: "swap" });
const display = Instrument_Serif({ subsets: ["latin"], weight: "400", variable: "--font-display", display: "swap" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono", display: "swap" });

const title = "Mohamed Kebe | Data Engineer & AI Engineer";
const description =
  "Étudiant ingénieur à l'INSEA, à la recherche d'un stage PFE. Architectures Lakehouse, pipelines distribués, LLM, RAG et systèmes agentiques, conçus de bout en bout.";

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: { default: title, template: "%s | Mohamed Kebe" },
  description,
  keywords: [
    "Data Engineer",
    "AI Engineer",
    "stage PFE",
    "INSEA",
    "Lakehouse",
    "PySpark",
    "Delta Lake",
    "Airflow",
    "dbt",
    "LLM",
    "RAG",
    "LangGraph",
  ],
  authors: [{ name: personalInfo.name }],
  creator: personalInfo.name,
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description,
    type: "website",
    url: "/",
    siteName: "Mohamed Kebe",
    locale: "fr_FR",
  },
  twitter: { card: "summary_large_image", title, description },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: personalInfo.name,
  url: siteUrl.toString(),
  jobTitle: personalInfo.headline,
  alumniOf: { "@type": "CollegeOrUniversity", name: "INSEA" },
  address: { "@type": "PostalAddress", addressLocality: "Rabat", addressCountry: "MA" },
  sameAs: [personalInfo.github, personalInfo.linkedin],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" suppressHydrationWarning className={`${sans.variable} ${display.variable} ${mono.variable}`}>
      <body className="min-h-screen font-sans antialiased">
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
          />
          <a href="#main-content" className="skip-link no-print">
            Aller au contenu
          </a>
          <Navbar />
          <RevealController />
          <main id="main-content" tabIndex={-1} className="animate-fade-in outline-none">
            {children}
          </main>
          <Footer />
          <BackToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
