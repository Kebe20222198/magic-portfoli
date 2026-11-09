import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { FlowDiagram, GraphDiagram } from "@/components/Diagrams";
import { getProject } from "@/data/projects";

const lakehouse = getProject("nyc-taxi-lakehouse")!;

describe("FlowDiagram", () => {
  it("renders every stage in order as a list", () => {
    render(<FlowDiagram diagram={lakehouse.diagram} />);
    expect(screen.getAllByRole("listitem")).toHaveLength(lakehouse.diagram.stages.length);
    expect(screen.getByText("Quarantaine (DLQ)")).toBeInTheDocument();
  });

  it("captions the diagram", () => {
    render(<FlowDiagram diagram={lakehouse.diagram} />);
    expect(screen.getByText(lakehouse.diagram.description)).toBeInTheDocument();
  });
});

describe("GraphDiagram", () => {
  it("exposes a text alternative and keyboard scrolling", () => {
    const graph = lakehouse.graphs![0];
    render(<GraphDiagram diagram={graph} />);
    expect(screen.getByRole("img", { name: graph.description })).toBeInTheDocument();
    expect(screen.getByRole("group")).toHaveAttribute("tabindex", "0");
  });
});
