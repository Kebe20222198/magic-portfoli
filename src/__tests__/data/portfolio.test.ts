import { describe, it, expect } from "vitest";
import {
  personalInfo,
  news,
  projects,
  resumeData,
} from "@/data/portfolio";

describe("portfolio data — personalInfo", () => {
  it("has a non-empty name and role", () => {
    expect(personalInfo.name.length).toBeGreaterThan(0);
    expect(personalInfo.role.length).toBeGreaterThan(0);
  });

  it("has at least one bio line", () => {
    expect(personalInfo.bio.length).toBeGreaterThanOrEqual(1);
    for (const line of personalInfo.bio) {
      expect(typeof line).toBe("string");
      expect(line.length).toBeGreaterThan(0);
    }
  });

  it("has exactly two photo URLs", () => {
    expect(personalInfo.photoUrls).toHaveLength(2);
  });

  it("has social links with name, url, and icon", () => {
    expect(personalInfo.socialLinks.length).toBeGreaterThanOrEqual(1);
    for (const link of personalInfo.socialLinks) {
      expect(link.name).toBeTruthy();
      expect(link.url).toBeTruthy();
      expect(link.icon).toBeDefined();
    }
  });

  it("has a contactGrid with at least one entry", () => {
    expect(personalInfo.contactGrid.length).toBeGreaterThanOrEqual(1);
    for (const c of personalInfo.contactGrid) {
      expect(c.icon).toBeDefined();
      expect(c.text).toBeTruthy();
    }
  });
});

describe("portfolio data — news", () => {
  it("is a non-empty array", () => {
    expect(news.length).toBeGreaterThan(0);
  });

  it("every news item has id, date, and description", () => {
    for (const item of news) {
      expect(item.id).toBeTruthy();
      expect(item.date).toBeTruthy();
      expect(item.description).toBeTruthy();
    }
  });

  it("uses only valid status values when present", () => {
    const validStatuses = ["upcoming", "published", "award"];
    for (const item of news) {
      if (item.status) {
        expect(validStatuses).toContain(item.status);
      }
    }
  });

  it("has unique ids", () => {
    const ids = news.map((n) => n.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe("portfolio data — projects", () => {
  it("is a non-empty array", () => {
    expect(projects.length).toBeGreaterThan(0);
  });

  it("every project has id, title, description, badges, and links", () => {
    for (const proj of projects) {
      expect(proj.id).toBeTruthy();
      expect(proj.title).toBeTruthy();
      expect(proj.description).toBeTruthy();
      expect(Array.isArray(proj.badges)).toBe(true);
      expect(Array.isArray(proj.links)).toBe(true);
      expect(proj.links.length).toBeGreaterThanOrEqual(1);
    }
  });

  it("has unique ids", () => {
    const ids = projects.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("every project link has label and url", () => {
    for (const proj of projects) {
      for (const link of proj.links) {
        expect(link.label).toBeTruthy();
        expect(link.url).toBeTruthy();
      }
    }
  });
});

describe("portfolio data — resumeData", () => {
  it("has education entries", () => {
    expect(resumeData.education.length).toBeGreaterThan(0);
    for (const edu of resumeData.education) {
      expect(edu.degree).toBeTruthy();
      expect(edu.institution).toBeTruthy();
      expect(edu.year).toBeTruthy();
    }
  });

  it("has experience entries", () => {
    expect(resumeData.experience.length).toBeGreaterThan(0);
    for (const exp of resumeData.experience) {
      expect(exp.role).toBeTruthy();
      expect(exp.company).toBeTruthy();
      expect(exp.year).toBeTruthy();
    }
  });

  it("has skills categories with items", () => {
    expect(resumeData.skills.length).toBeGreaterThan(0);
    for (const cat of resumeData.skills) {
      expect(cat.category).toBeTruthy();
      expect(cat.items.length).toBeGreaterThan(0);
      for (const item of cat.items) {
        expect(item.name).toBeTruthy();
      }
    }
  });

  it("has publications array", () => {
    expect(Array.isArray(resumeData.publications)).toBe(true);
  });

  it("has teaching array", () => {
    expect(Array.isArray(resumeData.teaching)).toBe(true);
  });
});
