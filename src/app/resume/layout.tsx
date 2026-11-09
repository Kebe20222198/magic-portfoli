import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CV",
  description: "CV de Mohamed Kebe : expériences, projets, formation et compétences en Data Engineering et AI Engineering.",
  alternates: { canonical: "/resume" },
};

export default function ResumeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
