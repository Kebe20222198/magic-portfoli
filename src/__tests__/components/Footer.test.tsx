import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Footer from "@/components/Footer";

describe("Footer", () => {
  it("shows the current year and the name", () => {
    render(<Footer />);
    expect(screen.getByText(new RegExp(`${new Date().getFullYear()} Mohamed Kebe`))).toBeInTheDocument();
  });

  it("renders the contact links", () => {
    render(<Footer />);
    for (const name of ["GitHub", "LinkedIn", "Email"]) {
      expect(screen.getByRole("link", { name })).toBeInTheDocument();
    }
  });
});
