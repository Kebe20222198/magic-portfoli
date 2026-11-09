import { describe, expect, it } from "vitest";
import { education, experiences, fieldNotes, journey, personalInfo, skills } from "@/data/portfolio";
import { getProject, projects } from "@/data/projects";

describe("profile data", () => {
  it("states the positioning and the internship search", () => {
    expect(personalInfo.headline).toBe("Data Engineer & AI Engineer");
    expect(personalInfo.seeking).toContain("PFE");
    expect(personalInfo.location).toBe("Rabat, Maroc");
  });

  it("lists exactly the two professional experiences", () => {
    expect(experiences.map((entry) => entry.period)).toEqual(["Juillet – Septembre 2026", "Juillet – Août 2025"]);
  });

  it("groups skills in the expected categories", () => {
    expect(skills.map((group) => group.category)).toEqual([
      "Data Engineering",
      "AI & Machine Learning",
      "Generative AI",
      "Databases & Storage",
      "Software Engineering",
      "Cloud & Déploiement",
      "Collaboration & Méthodes",
    ]);
  });

  it("does not invent a graduation date", () => {
    expect(education.period).toBeUndefined();
  });
});

describe("project case studies", () => {
  it("keeps the strategic order", () => {
    expect(projects.map((project) => project.slug)).toEqual([
      "nyc-taxi-lakehouse",
      "cognitive-execution-graph",
      "agentic-rag-mcp",
      "ml-financial-backtesting",
    ]);
  });

  it.each(projects.map((project) => [project.slug, project] as const))("%s is complete", (_slug, project) => {
    expect(project.problem.length).toBeGreaterThan(0);
    expect(project.objectives.length).toBeGreaterThan(0);
    expect(project.architecture.length).toBeGreaterThan(0);
    expect(project.diagram.stages.length).toBeGreaterThan(1);
    expect(project.stack.length).toBeGreaterThan(0);
    expect(project.features.length).toBeGreaterThan(0);
    expect(project.decisions.length).toBeGreaterThan(0);
    expect(project.results.note).toBeTruthy();
    expect(project.repository.url || project.repository.note).toBeTruthy();
  });

  it("only draws graph edges between existing nodes", () => {
    for (const graph of projects.flatMap((project) => project.graphs ?? [])) {
      const ids = new Set(graph.nodes.map((node) => node.id));
      for (const edge of graph.edges) {
        expect(ids.has(edge.from) && ids.has(edge.to)).toBe(true);
      }
    }
  });

  it("publishes no metrics for projects without a measured source", () => {
    expect(getProject("agentic-rag-mcp")?.results.rows).toEqual([]);
    expect(getProject("ml-financial-backtesting")?.results.rows).toEqual([]);
  });

  it("does not claim benchmarks that were not run", () => {
    const ceg = JSON.stringify(getProject("cognitive-execution-graph"));
    expect(ceg).not.toMatch(/GPT-4o|Claude/);
  });

  it("labels every simulated CEG result", () => {
    const rows = getProject("cognitive-execution-graph")?.results.rows ?? [];
    const optimizer = rows.filter((row) => row.metric.startsWith("Optimiseur"));
    expect(optimizer.length).toBeGreaterThan(0);
    for (const row of optimizer) expect(row.context).toContain("simulé");
  });

  it("returns undefined for an unknown slug", () => {
    expect(getProject("unknown")).toBeUndefined();
  });
});

describe("authenticity content", () => {
  it("uses the real rejection rate for the hero animation", () => {
    expect(1 / 154).toBeCloseTo(0.0065, 4);
    expect(getProject("nyc-taxi-lakehouse")?.highlights.join(" ")).toContain("0,65 %");
  });

  it("links every field note and skill to an existing project", () => {
    for (const note of fieldNotes) expect(getProject(note.projectSlug)).toBeDefined();
    for (const slug of skills.flatMap((group) => group.usedIn ?? [])) expect(getProject(slug)).toBeDefined();
  });

  it("ends the journey on the internship search", () => {
    expect(journey[journey.length - 1].detail).toContain("PFE");
  });
});
