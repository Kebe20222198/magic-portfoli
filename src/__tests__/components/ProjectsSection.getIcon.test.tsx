import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";

vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children }: React.PropsWithChildren) => <div>{children}</div>,
    article: ({ children }: React.PropsWithChildren) => <article>{children}</article>,
  },
}));

vi.mock("next/image", () => ({
  default: (props: Record<string, unknown>) => <img />,
}));

/**
 * getIcon is not exported, so we test it indirectly by inspecting rendered link content.
 * We import the module to verify the mapping via rendered output.
 */
describe("getIcon (via rendered ProjectsSection links)", () => {
  it("renders GitHub icon for links labelled 'GitHub'", async () => {
    const { default: ProjectsSection } = await import("@/components/ProjectsSection");
    const { container } = render(<ProjectsSection />);
    // All project links with "GitHub" label should have an SVG icon child
    const githubLinks = Array.from(container.querySelectorAll("a")).filter((a) =>
      a.textContent?.includes("GitHub"),
    );
    expect(githubLinks.length).toBeGreaterThanOrEqual(1);
    for (const link of githubLinks) {
      expect(link.querySelector("svg")).not.toBeNull();
    }
  });
});
