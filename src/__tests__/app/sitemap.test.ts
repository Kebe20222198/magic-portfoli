import { describe, it, expect } from "vitest";
import sitemap from "@/app/sitemap";

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
    expect(home!.url).toContain("example.com");
    expect(home!.changeFrequency).toBe("monthly");
  });

  it("includes the resume page", () => {
    const result = sitemap();
    const resume = result.find((entry) => entry.url.includes("/resume"));
    expect(resume).toBeDefined();
    expect(resume!.priority).toBe(0.8);
  });

  it("has valid lastModified dates on every entry", () => {
    const result = sitemap();
    for (const entry of result) {
      expect(entry.lastModified).toBeInstanceOf(Date);
    }
  });
});
