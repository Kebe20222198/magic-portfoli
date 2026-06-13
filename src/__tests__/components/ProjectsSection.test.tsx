import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ProjectsSection from "@/components/ProjectsSection";

vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => {
      const { className } = props as { className?: string };
      return <div className={className}>{children}</div>;
    },
    article: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => {
      const { className } = props as { className?: string };
      return <article className={className}>{children}</article>;
    },
  },
}));

vi.mock("next/image", () => ({
  default: (props: Record<string, unknown>) => {
    const { fill, priority, ...rest } = props;
    return <img {...rest} />;
  },
}));

describe("ProjectsSection", () => {
  it("renders the section heading", () => {
    render(<ProjectsSection />);
    expect(screen.getByText("Portfolio")).toBeInTheDocument();
    expect(screen.getByText("sélectionnés")).toBeInTheDocument();
  });

  it("renders at most 6 projects initially", () => {
    render(<ProjectsSection />);
    const articles = screen.getAllByRole("article");
    expect(articles.length).toBeLessThanOrEqual(6);
  });

  it("renders project titles", () => {
    render(<ProjectsSection />);
    expect(screen.getByText(/Wonkhaï/)).toBeInTheDocument();
    expect(screen.getByText(/Chatbot RAG/)).toBeInTheDocument();
  });

  it("renders project badges", () => {
    render(<ProjectsSection />);
    expect(screen.getByText("Production-ready")).toBeInTheDocument();
  });

  it('shows "Voir tous les projets" button when more than 6 projects exist', () => {
    render(<ProjectsSection />);
    const btn = screen.queryByText(/voir tous les projets/i);
    // 8 projects in data > INITIAL_VISIBLE = 6
    expect(btn).toBeInTheDocument();
  });

  it("shows all projects after clicking the expand button", () => {
    render(<ProjectsSection />);
    const btn = screen.getByText(/voir tous les projets/i);
    fireEvent.click(btn);
    const articles = screen.getAllByRole("article");
    expect(articles.length).toBe(8);
  });

  it("renders GitHub links for projects", () => {
    render(<ProjectsSection />);
    const githubLinks = screen.getAllByText("GitHub");
    expect(githubLinks.length).toBeGreaterThanOrEqual(1);
  });
});
