import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import ProjectPage, { generateMetadata, generateStaticParams } from "@/app/projects/[slug]/page";
import { projects } from "@/data/projects";

vi.mock("next/navigation", () => ({
  notFound: () => {
    throw new Error("NEXT_NOT_FOUND");
  },
}));

describe("project pages", () => {
  it("generates one static page per project", () => {
    expect(generateStaticParams()).toHaveLength(projects.length);
  });

  it.each(projects.map((project) => [project.slug, project] as const))("%s renders its case study", (slug, project) => {
    render(<ProjectPage params={{ slug }} />);
    expect(screen.getByRole("heading", { level: 1, name: project.title })).toBeInTheDocument();
    for (const name of ["Présentation et problématique", "Objectifs", "Architecture technique", "Diagramme d'architecture", "Stack technologique", "Fonctionnalités principales", "Décisions d'ingénierie et défis", "Résultats mesurables", "Dépôt GitHub"]) {
      expect(screen.getByRole("heading", { level: 2, name: new RegExp(name) })).toBeInTheDocument();
    }
  });

  it("shows the demo only when one exists", () => {
    const { unmount } = render(<ProjectPage params={{ slug: "cognitive-execution-graph" }} />);
    expect(screen.getByRole("heading", { level: 2, name: /Démonstration/ })).toBeInTheDocument();
    unmount();
    render(<ProjectPage params={{ slug: "nyc-taxi-lakehouse" }} />);
    expect(screen.queryByRole("heading", { level: 2, name: /Démonstration/ })).not.toBeInTheDocument();
  });

  it("states when the code is not published", () => {
    render(<ProjectPage params={{ slug: "ml-financial-backtesting" }} />);
    expect(screen.queryByRole("link", { name: /Voir le dépôt/ })).not.toBeInTheDocument();
    expect(screen.getByText("Le code de ce projet n'est pas publié.")).toBeInTheDocument();
  });

  it("rejects unknown slugs", () => {
    expect(() => ProjectPage({ params: { slug: "unknown" } })).toThrow("NEXT_NOT_FOUND");
  });

  it("sets per-project metadata with a canonical URL", () => {
    const metadata = generateMetadata({ params: { slug: projects[0].slug } });
    expect(metadata.title).toBe(projects[0].title);
    expect(metadata.alternates?.canonical).toBe(`/projects/${projects[0].slug}`);
  });
});
