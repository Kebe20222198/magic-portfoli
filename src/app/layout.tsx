import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParticleBackground from "@/components/ParticleBackground";
import BackToTop from "@/components/BackToTop";
import { ThemeProvider } from "@/components/ThemeProvider";
import { siteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  metadataBase: siteUrl,
  icons: {
    icon: "/images/profil.png",
    shortcut: "/images/profil.png",
    apple: "/images/profil.png",
  },
  title: {
    default: "Mohamed Kebe | Portfolio Data & Software Engineer",
    template: "%s | Mohamed Kebe",
  },
  description:
    "Portfolio personnel de Mohamed Kebe, ingénieur Data & IA à l'INSEA. Découvrez ses projets, son parcours et ses compétences en Data Engineering et systèmes distribués.",
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
  creator: "Mohamed Kebe",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Mohamed Kebe | Portfolio Data & Software Engineer",
    description: "Projets, parcours et compétences de Mohamed Kebe en Data Engineering et intelligence artificielle.",
    type: "website",
    url: "/",
    siteName: "Portfolio de Mohamed Kebe",
    locale: "fr_FR",
    images: [{ url: "/images/profil.png", width: 800, height: 800, alt: "Portrait de Mohamed Kebe" }],
  },
  twitter: {
    card: "summary",
    title: "Mohamed Kebe | Portfolio Data & Software Engineer",
    description: "Portfolio personnel de Mohamed Kebe : projets, parcours et compétences.",
    images: ["/images/profil.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className="font-sans antialiased min-h-screen">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Person",
                name: "Mohamed Kebe",
                url: siteUrl.toString(),
                jobTitle: "Data & Software Engineer",
                alumniOf: { "@type": "CollegeOrUniversity", name: "INSEA" },
                sameAs: [
                  "https://github.com/Kebe20222198",
                  "https://www.linkedin.com/in/mohamed-kebe-1b79b1280/",
                ],
              }),
            }}
          />
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
