import { describe, it, expect } from "vitest";
import sitemap from "@/app/sitemap";
import { projects } from "@/data/projects";

describe("sitemap()", () => {
  it("returns an array of sitemap entries", () => {
    const result = sitemap();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThanOrEqual(1);
  });

  it("includes the homepage entry with priority 1", () => {
    const result = sitemap();
    const home = result.find((entry) => entry.priority === 1);
    expect(home).toBeDefined();
    expect(home!.url).toContain("mohamed-kebe-data-ia-software-engin.vercel.app");
    expect(home!.changeFrequency).toBe("monthly");
  });

  it("includes the resume page", () => {
    const result = sitemap();
    const resume = result.find((entry) => entry.url.includes("/resume"));
    expect(resume).toBeDefined();
    expect(resume!.priority).toBe(0.8);
  });

  it("includes every project case study", () => {
    const urls = sitemap().map((entry) => entry.url);
    for (const project of projects) {
      expect(urls.some((url) => url.endsWith(`/projects/${project.slug}`))).toBe(true);
    }
  });

  it("has valid lastModified dates on every entry", () => {
    const result = sitemap();
    for (const entry of result) {
      expect(entry.lastModified).toBeInstanceOf(Date);
    }
  });
});
