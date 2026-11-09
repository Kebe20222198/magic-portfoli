import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import ResumePage from "@/app/resume/page";
import { personalInfo } from "@/data/portfolio";

describe("ResumePage", () => {
  it("renders the name and the positioning", () => {
    render(<ResumePage />);
    expect(screen.getByRole("heading", { level: 1, name: personalInfo.name })).toBeInTheDocument();
    expect(screen.getByText(/Data Engineer & AI Engineer \| Engineering Student at INSEA/)).toBeInTheDocument();
  });

  it("offers the PDF download", () => {
    render(<ResumePage />);
    expect(screen.getByRole("link", { name: /Télécharger le PDF/ })).toHaveAttribute("href", personalInfo.cvFile);
  });

  it.each(["Expériences", "Projets principaux", "Compétences", "Formation", "Autres réalisations", "Engagement associatif"])(
    "renders the %s section",
    (name) => {
      render(<ResumePage />);
      expect(screen.getByRole("heading", { level: 2, name })).toBeInTheDocument();
    },
  );
});
