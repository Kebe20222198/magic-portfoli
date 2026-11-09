import { afterEach, describe, expect, it, vi } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";
import BackToTop from "@/components/BackToTop";

const setScroll = (value: number) => {
  Object.defineProperty(window, "scrollY", { value, configurable: true });
  act(() => {
    window.dispatchEvent(new Event("scroll"));
  });
};

afterEach(() => setScroll(0));

describe("BackToTop", () => {
  it("is removed from the tab order until the page is scrolled", () => {
    render(<BackToTop />);
    const button = screen.getByRole("button", { hidden: true });
    expect(button).toHaveAttribute("tabindex", "-1");
    setScroll(800);
    expect(button).toHaveAttribute("tabindex", "0");
  });

  it("scrolls back to the top", () => {
    window.scrollTo = vi.fn();
    render(<BackToTop />);
    setScroll(800);
    fireEvent.click(screen.getByRole("button", { name: "Revenir en haut de la page" }));
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
  });
});
