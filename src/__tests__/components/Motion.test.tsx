import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { CountUp, ScrollText } from "@/components/Motion";

vi.mock("next/navigation", () => ({ usePathname: () => "/" }));

Object.defineProperty(window, "matchMedia", {
  value: () => ({ matches: true }),
  configurable: true,
});

describe("CountUp", () => {
  it("shows the final value when motion is reduced", () => {
    render(<CountUp value="0,65 %" />);
    expect(screen.getByText("0,65 %")).toBeInTheDocument();
  });
});

describe("ScrollText", () => {
  it("keeps the whole sentence readable", () => {
    const { container } = render(<ScrollText text="Je conçois des architectures" />);
    expect(container.textContent).toBe("Je conçois des architectures");
  });
});
