import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import ProjectsSection from "@/components/ProjectsSection";
import { projects } from "@/data/projects";

describe("ProjectsSection", () => {
  it("links every project title to its case study", () => {
    render(<ProjectsSection />);
    for (const project of projects) {
      expect(screen.getByRole("link", { name: project.title })).toHaveAttribute("href", `/projects/${project.slug}`);
    }
  });

  it("renders the projects in order", () => {
    render(<ProjectsSection />);
    expect(screen.getAllByRole("heading", { level: 3 }).map((heading) => heading.textContent)).toEqual(
      projects.map((project) => project.title),
    );
  });
});
