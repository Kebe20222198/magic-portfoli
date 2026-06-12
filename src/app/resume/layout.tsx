import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Mohamed Kebe's full academic and professional resume — Education, Industry Experience, Teaching, Publications, and Skills.",
};

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
