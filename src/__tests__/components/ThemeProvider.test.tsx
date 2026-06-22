import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@/components/ThemeProvider";

vi.mock("next-themes", () => ({
  ThemeProvider: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
    <div data-testid="theme-provider" data-props={JSON.stringify(props)}>
      {children}
    </div>
  ),
}));

describe("ThemeProvider", () => {
  it("renders children", () => {
    render(
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <span>child content</span>
      </ThemeProvider>,
    );
    expect(screen.getByText("child content")).toBeInTheDocument();
  });

  it("passes props through to NextThemesProvider", () => {
    render(
      <ThemeProvider attribute="class" defaultTheme="dark">
        <span>test</span>
      </ThemeProvider>,
    );
    const provider = screen.getByTestId("theme-provider");
    const props = JSON.parse(provider.getAttribute("data-props")!);
    expect(props.attribute).toBe("class");
    expect(props.defaultTheme).toBe("dark");
  });
});
