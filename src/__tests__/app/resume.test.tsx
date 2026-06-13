import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import ResumePage from "@/app/resume/page";

vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => {
      const { className } = props as { className?: string };
      return <div className={className}>{children}</div>;
    },
    p: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => {
      const { className } = props as { className?: string };
      return <p className={className}>{children}</p>;
    },
  },
}));

describe("ResumePage", () => {
  it("renders the Curriculum Vitæ label", () => {
    render(<ResumePage />);
    expect(screen.getByText("Curriculum Vitæ")).toBeInTheDocument();
  });

  it("renders the owner's name split into first + last", () => {
    render(<ResumePage />);
    expect(screen.getByText("Mohamed")).toBeInTheDocument();
    expect(screen.getByText("Kebe")).toBeInTheDocument();
  });

  it("renders education section", () => {
    render(<ResumePage />);
    expect(screen.getByText("Études")).toBeInTheDocument();
  });

  it("renders experience section", () => {
    render(<ResumePage />);
    expect(screen.getByText(/expériences/i)).toBeInTheDocument();
  });

  it("renders skills section", () => {
    render(<ResumePage />);
    expect(screen.getByText(/compétences/i)).toBeInTheDocument();
  });

  it("renders contact grid entries", () => {
    render(<ResumePage />);
    expect(screen.getByText("mkebe2022@gmail.com")).toBeInTheDocument();
    expect(screen.getAllByText("Rabat, Maroc").length).toBeGreaterThanOrEqual(1);
  });

  it("renders bio paragraphs", () => {
    render(<ResumePage />);
    expect(
      screen.getByText(/Élève-Ingénieur en Data & IA Engineering/),
    ).toBeInTheDocument();
  });
});
