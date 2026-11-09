import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import Navbar from "@/components/Navbar";

const setTheme = vi.fn();
let pathname = "/";

vi.mock("next/navigation", () => ({ usePathname: () => pathname }));
vi.mock("next-themes", () => ({ useTheme: () => ({ resolvedTheme: "light", setTheme }) }));

beforeEach(() => {
  pathname = "/";
  setTheme.mockClear();
});

describe("Navbar", () => {
  it("links to the sections and the CV", () => {
    render(<Navbar />);
    expect(screen.getByRole("link", { name: "Projets" })).toHaveAttribute("href", "/#projects");
    expect(screen.getByRole("link", { name: "CV" })).toHaveAttribute("href", "/resume");
  });

  it("marks the CV link as current on the resume page", () => {
    pathname = "/resume";
    render(<Navbar />);
    expect(screen.getByRole("link", { name: "CV" })).toHaveAttribute("aria-current", "page");
  });

  it("toggles the theme", () => {
    render(<Navbar />);
    fireEvent.click(screen.getByRole("button", { name: "Activer le thème sombre" }));
    expect(setTheme).toHaveBeenCalledWith("dark");
  });

  it("opens the mobile menu and closes it with Escape", () => {
    render(<Navbar />);
    const toggle = screen.getByRole("button", { name: "Ouvrir le menu" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(toggle);
    expect(screen.getByRole("navigation", { name: "Navigation mobile" })).toBeInTheDocument();
    fireEvent.keyDown(window, { key: "Escape" });
    expect(screen.queryByRole("navigation", { name: "Navigation mobile" })).not.toBeInTheDocument();
  });
});
