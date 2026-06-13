import { describe, it, expect } from "vitest";
import robots from "@/app/robots";

describe("robots()", () => {
  it("returns a valid robots config", () => {
    const result = robots();
    expect(result).toHaveProperty("rules");
    expect(result).toHaveProperty("sitemap");
  });

  it("allows all user-agents to crawl /", () => {
    const result = robots();
    expect(result.rules).toEqual(
      expect.objectContaining({ userAgent: "*", allow: "/" }),
    );
  });

  it("provides a sitemap URL", () => {
    const result = robots();
    expect(typeof result.sitemap).toBe("string");
    expect(result.sitemap).toMatch(/^https:\/\//);
  });
});
