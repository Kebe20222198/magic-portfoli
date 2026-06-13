import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "@/components/Navbar";

vi.mock("framer-motion", () => ({
  motion: {
    header: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => {
      const { className } = props as { className?: string };
      return <header className={className}>{children}</header>;
    },
    div: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => {
      const safe: Record<string, unknown> = {};
      for (const [key, value] of Object.entries(props)) {
        if (typeof key === "string" && !["initial", "animate", "exit", "transition", "layoutId", "variants"].includes(key)) {
          safe[key] = value;
        }
      }
      return <div {...safe}>{children}</div>;
    },
  },
  useScroll: () => ({ scrollY: { get: () => 0, on: vi.fn() } }),
  useMotionValueEvent: vi.fn(),
  AnimatePresence: ({ children }: React.PropsWithChildren) => <>{children}</>,
}));

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: React.PropsWithChildren<{ href: string }>) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

vi.mock("next-themes", () => ({
  useTheme: () => ({ theme: "light", setTheme: vi.fn() }),
}));

describe("Navbar", () => {
  beforeEach(() => {
    Object.defineProperty(window, "scrollY", { value: 0, writable: true });
  });

  it("renders the MK. logo link", () => {
    render(<Navbar />);
    const logos = screen.getAllByText("MK.");
    expect(logos.length).toBeGreaterThanOrEqual(1);
  });

  it("renders all navigation links", () => {
    render(<Navbar />);
    expect(screen.getAllByText("À propos").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Actualités").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Projets").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Resume").length).toBeGreaterThanOrEqual(1);
  });

  it("renders a theme toggle button", () => {
    render(<Navbar />);
    const themeButtons = screen.getAllByRole("button", { name: /thème/i });
    expect(themeButtons.length).toBeGreaterThanOrEqual(1);
  });

  it("renders mobile menu toggle button", () => {
    render(<Navbar />);
    const menuButton = screen.getByRole("button", { name: /ouvrir le menu/i });
    expect(menuButton).toBeInTheDocument();
  });

  it("opens mobile menu on hamburger click", () => {
    render(<Navbar />);
    const menuButton = screen.getByRole("button", { name: /ouvrir le menu/i });
    fireEvent.click(menuButton);
    expect(screen.getByRole("button", { name: /fermer le menu/i })).toBeInTheDocument();
  });
});
