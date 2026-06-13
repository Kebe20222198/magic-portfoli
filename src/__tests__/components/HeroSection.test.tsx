import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import HeroSection from "@/components/HeroSection";

vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => {
      const { className } = props as { className?: string };
      return <div className={className}>{children}</div>;
    },
    p: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => {
      const { className } = props as { className?: string };
      return <p className={className}>{children}</p>;
    },
    h1: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => {
      const { className } = props as { className?: string };
      return <h1 className={className}>{children}</h1>;
    },
    span: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => {
      const { className } = props as { className?: string };
      return <span className={className}>{children}</span>;
    },
  },
  AnimatePresence: ({ children }: React.PropsWithChildren) => <>{children}</>,
}));

vi.mock("next/image", () => ({
  default: (props: Record<string, unknown>) => {
    const { fill, priority, ...rest } = props;
    return <img {...rest} />;
  },
}));

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: React.PropsWithChildren<{ href: string }>) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe("HeroSection", () => {
  it("renders the owner's full name", () => {
    render(<HeroSection />);
    expect(screen.getByText("Mohamed")).toBeInTheDocument();
    expect(screen.getByText("Kebe")).toBeInTheDocument();
  });

  it("renders the INSEA tag", () => {
    render(<HeroSection />);
    expect(screen.getByText(/INSEA Rabat/)).toBeInTheDocument();
  });

  it("renders the location", () => {
    render(<HeroSection />);
    expect(screen.getByText("Rabat, Maroc")).toBeInTheDocument();
  });

  it("renders social link icons", () => {
    render(<HeroSection />);
    const links = screen.getAllByRole("link");
    const socialLinks = links.filter((l) => l.getAttribute("target") === "_blank");
    expect(socialLinks.length).toBeGreaterThanOrEqual(3);
  });

  it("renders the Resume CTA link", () => {
    render(<HeroSection />);
    expect(screen.getByText(/voir le resume/i)).toBeInTheDocument();
  });

  it("renders the profile image", () => {
    render(<HeroSection />);
    const img = screen.getByAltText("Mohamed Kebe");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "/images/profil.png");
  });

  it("renders the first bio line immediately", () => {
    render(<HeroSection />);
    expect(
      screen.getByText(/Élève-Ingénieur en Data & IA Engineering/),
    ).toBeInTheDocument();
  });

  it("renders the subtitle keywords", () => {
    render(<HeroSection />);
    expect(screen.getByText("Data Engineering")).toBeInTheDocument();
    expect(screen.getByText("Architectures Distribuées")).toBeInTheDocument();
    expect(screen.getByText("Intelligence Artificielle")).toBeInTheDocument();
  });
});
