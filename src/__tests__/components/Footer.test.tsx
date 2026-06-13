import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Footer from "@/components/Footer";

vi.mock("framer-motion", () => ({
  motion: {
    footer: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
      <footer {...filterMotionProps(props)}>{children}</footer>
    ),
  },
}));

function filterMotionProps(props: Record<string, unknown>) {
  const filtered: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(props)) {
    if (!["initial", "whileInView", "viewport", "transition"].includes(key)) {
      filtered[key] = value;
    }
  }
  return filtered;
}

describe("Footer", () => {
  it("renders the owner's name", () => {
    render(<Footer />);
    expect(screen.getByText("Mohamed Kebe")).toBeInTheDocument();
  });

  it("renders the current year", () => {
    render(<Footer />);
    const year = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(`© ${year}`))).toBeInTheDocument();
  });

  it("renders social links", () => {
    render(<Footer />);
    const links = screen.getAllByRole("link");
    expect(links.length).toBeGreaterThanOrEqual(3);
  });

  it("social links open in new tab", () => {
    render(<Footer />);
    const links = screen.getAllByRole("link");
    for (const link of links) {
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noreferrer");
    }
  });

  it("renders the 'Next.js & Tailwind CSS' attribution", () => {
    render(<Footer />);
    expect(screen.getByText("Next.js & Tailwind CSS")).toBeInTheDocument();
  });
});
