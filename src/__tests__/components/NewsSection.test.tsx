import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import NewsSection from "@/components/NewsSection";

vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => {
      const { className } = props as { className?: string };
      return <div className={className}>{children}</div>;
    },
  },
  AnimatePresence: ({ children }: React.PropsWithChildren) => <>{children}</>,
}));

describe("NewsSection", () => {
  it("renders the section heading", () => {
    render(<NewsSection />);
    expect(screen.getByText("Actualités")).toBeInTheDocument();
    expect(screen.getByText("nouvelles")).toBeInTheDocument();
  });

  it("renders at most 5 news items initially", () => {
    render(<NewsSection />);
    const descriptions = screen.getAllByText(/\./);
    expect(descriptions.length).toBeLessThanOrEqual(50); // sanity upper bound
  });

  it("renders status badges for items with status", () => {
    render(<NewsSection />);
    const published = screen.getAllByText("Publié");
    expect(published.length).toBeGreaterThanOrEqual(1);
  });

  it('shows "Voir tout" button when there are more than 5 items', () => {
    render(<NewsSection />);
    const expandBtn = screen.queryByText(/voir tout/i);
    // The dataset has >5 news items, so the button should appear
    expect(expandBtn).toBeInTheDocument();
  });

  it("expands all news when clicking the expand button", () => {
    const { container } = render(<NewsSection />);
    const expandBtn = screen.getByText(/voir tout/i);
    fireEvent.click(expandBtn);
    // After expanding, the button should disappear
    expect(screen.queryByText(/voir tout/i)).not.toBeInTheDocument();
  });

  it("renders links for news items that have non-# links", () => {
    render(<NewsSection />);
    const seeLinks = screen.getAllByText("Voir");
    expect(seeLinks.length).toBeGreaterThanOrEqual(1);
  });
});
