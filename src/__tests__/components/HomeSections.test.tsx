import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { EducationSection, SkillsSection } from "@/components/HomeSections";
import { educationHistory, skills } from "@/data/portfolio";

vi.mock("next/navigation", () => ({ usePathname: () => "/" }));

describe("EducationSection", () => {
  it("lists the whole academic history", () => {
    render(<EducationSection />);
    expect(educationHistory).toHaveLength(3);
    for (const entry of educationHistory) {
      expect(screen.getByRole("heading", { level: 3, name: entry.institution })).toBeInTheDocument();
    }
  });
});

describe("SkillsSection", () => {
  it("numbers each group and keeps every skill and its purpose", () => {
    const { container } = render(<SkillsSection />);
    expect(screen.getAllByRole("heading", { level: 3 }).map((heading) => heading.textContent)).toEqual(
      skills.map((group) => group.category),
    );
    skills.forEach((group, index) => {
      expect(screen.getAllByRole("listitem")[index].querySelector("span[aria-hidden]")?.textContent).toBe(
        String(index + 1).padStart(2, "0"),
      );
      expect(group.purpose).toBeTruthy();
      for (const item of group.items) expect(container.textContent).toContain(item);
    });
  });
});
