import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import HeroSection from "@/components/HeroSection";
import { personalInfo } from "@/data/portfolio";

describe("HeroSection", () => {
  it("renders the name as the page heading", () => {
    render(<HeroSection />);
    expect(screen.getByRole("heading", { level: 1, name: "Mohamed Kebe" })).toBeInTheDocument();
  });

  it("shows school, internship search and location", () => {
    render(<HeroSection />);
    expect(screen.getByText(personalInfo.school)).toBeInTheDocument();
    expect(screen.getByText(/Recherche de stage PFE/)).toBeInTheDocument();
    expect(screen.getByText("Rabat, Maroc")).toBeInTheDocument();
  });

  it("links to the CV page and its PDF", () => {
    render(<HeroSection />);
    expect(screen.getByRole("link", { name: "Consulter le CV" })).toHaveAttribute("href", "/resume");
    const download = screen.getByRole("link", { name: /Télécharger le PDF/ });
    expect(download).toHaveAttribute("href", personalInfo.cvFile);
    expect(download).toHaveAttribute("download");
  });

  it("links to GitHub, LinkedIn and email", () => {
    render(<HeroSection />);
    expect(screen.getByRole("link", { name: "GitHub" })).toHaveAttribute("href", personalInfo.github);
    expect(screen.getByRole("link", { name: "LinkedIn" })).toHaveAttribute("href", personalInfo.linkedin);
    expect(screen.getByRole("link", { name: "Email" })).toHaveAttribute("href", `mailto:${personalInfo.email}`);
  });

  it("gives the portrait a text alternative", () => {
    render(<HeroSection />);
    expect(screen.getByAltText("Portrait de Mohamed Kebe")).toBeInTheDocument();
  });
});
