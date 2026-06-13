import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import BackToTop from "@/components/BackToTop";

vi.mock("framer-motion", () => ({
  AnimatePresence: ({ children }: React.PropsWithChildren) => <>{children}</>,
  motion: {
    button: ({
      children,
      ...props
    }: React.PropsWithChildren<React.ButtonHTMLAttributes<HTMLButtonElement>>) => {
      const safe: Record<string, unknown> = {};
      for (const [key, value] of Object.entries(props)) {
        if (
          !["initial", "animate", "exit", "transition", "whileInView", "viewport"].includes(key)
        ) {
          safe[key] = value;
        }
      }
      return <button {...safe}>{children}</button>;
    },
  },
}));

describe("BackToTop", () => {
  beforeEach(() => {
    Object.defineProperty(window, "scrollY", { value: 0, writable: true });
  });

  it("is hidden when scrollY is below threshold", () => {
    render(<BackToTop />);
    expect(screen.queryByRole("button", { name: /back to top/i })).not.toBeInTheDocument();
  });

  it("becomes visible when scrollY exceeds 400", () => {
    render(<BackToTop />);
    Object.defineProperty(window, "scrollY", { value: 500, writable: true });
    fireEvent.scroll(window);
    expect(screen.getByRole("button", { name: /back to top/i })).toBeInTheDocument();
  });

  it("calls window.scrollTo when clicked", () => {
    const scrollToMock = vi.fn();
    window.scrollTo = scrollToMock;

    render(<BackToTop />);
    Object.defineProperty(window, "scrollY", { value: 500, writable: true });
    fireEvent.scroll(window);

    const button = screen.getByRole("button", { name: /back to top/i });
    fireEvent.click(button);
    expect(scrollToMock).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
  });

  it("hides again when scrolling back up", () => {
    render(<BackToTop />);
    Object.defineProperty(window, "scrollY", { value: 500, writable: true });
    fireEvent.scroll(window);
    expect(screen.getByRole("button", { name: /back to top/i })).toBeInTheDocument();

    Object.defineProperty(window, "scrollY", { value: 100, writable: true });
    fireEvent.scroll(window);
    expect(screen.queryByRole("button", { name: /back to top/i })).not.toBeInTheDocument();
  });
});
