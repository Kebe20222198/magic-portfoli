import { ArrowDown, ArrowRight } from "lucide-react";
import type { FlowDiagramData, FlowNode, GraphDiagramData, GraphNode, Tone } from "@/data/projects";
import { cn } from "@/lib/utils";

const toneClass: Record<Tone, string> = {
  default: "border-line",
  accent: "border-accent",
  warn: "border-dashed border-warn",
};

function Node({ node }: { node: FlowNode }) {
  return (
    <div className={cn("rounded-[3px] border bg-surface px-3 py-2.5", toneClass[node.tone ?? "default"])}>
      <p className="text-[13px] font-medium leading-snug">{node.title}</p>
      {node.detail && <p className="mt-1 text-xs leading-snug text-muted">{node.detail}</p>}
    </div>
  );
}

function Band({ band }: { band: { label: string; title: string; detail: string } }) {
  return (
    <div className="rounded-[3px] border border-dashed border-line px-4 py-3">
      <p className="eyebrow">{band.label}</p>
      <p className="mt-1 text-[13px] font-medium">{band.title}</p>
      <p className="mt-0.5 break-words font-mono text-xs leading-relaxed text-muted">{band.detail}</p>
    </div>
  );
}

/**
 * Pipeline diagram built with semantic HTML: it reflows from columns to a
 * vertical flow, so labels stay readable on phones and follow the theme.
 */
export function FlowDiagram({ diagram }: { diagram: FlowDiagramData }) {
  const columns = diagram.stages.length;
  return (
    <figure className="print-avoid-break">
      <div className="space-y-4 rounded-[3px] border border-line p-4 sm:p-5">
        {diagram.control && <Band band={diagram.control} />}
        <div aria-hidden="true" className="rail hidden lg:block" />
        <ol className="grid gap-7 lg:grid-flow-col lg:auto-cols-fr lg:gap-6">
          {diagram.stages.map((stage, index) => (
            <li key={stage.label} data-reveal style={{ ["--d" as string]: `${index * 110}ms` }} className="relative min-w-0">
              <p className="eyebrow mb-2">{stage.label}</p>
              <div className="space-y-2">
                {stage.nodes.map((node) => (
                  <Node key={node.title} node={node} />
                ))}
              </div>
              {stage.branch && (
                <div className="mt-3 border-l border-dashed border-warn pl-3 pt-1">
                  <p className="mb-1.5 font-mono text-[11px] text-warn">{stage.branch.label}</p>
                  <Node node={stage.branch} />
                </div>
              )}
              {index < columns - 1 && (
                <>
                  <ArrowDown size={14} aria-hidden="true" className="absolute -bottom-[1.3rem] left-1/2 -translate-x-1/2 text-muted lg:hidden" />
                  <ArrowRight size={14} aria-hidden="true" className="absolute -right-[1.2rem] top-11 hidden text-muted lg:block" />
                </>
              )}
            </li>
          ))}
        </ol>
        {diagram.footer && <Band band={diagram.footer} />}
      </div>
      <figcaption className="mt-3 max-w-prose text-sm text-muted">
        <span className="font-medium text-ink">{diagram.title}.</span> {diagram.description}
      </figcaption>
    </figure>
  );
}

const svgStroke: Record<Tone, string> = {
  default: "rgb(var(--line))",
  accent: "rgb(var(--accent))",
  warn: "rgb(var(--warn))",
};

/** Point where the segment from a box's centre to `target` exits the box. */
function exitPoint(box: GraphNode, target: { x: number; y: number }) {
  const cx = box.x + box.w / 2;
  const cy = box.y + box.h / 2;
  const dx = target.x - cx;
  const dy = target.y - cy;
  const scale = Math.min(
    dx === 0 ? Infinity : box.w / 2 / Math.abs(dx),
    dy === 0 ? Infinity : box.h / 2 / Math.abs(dy),
  );
  return { x: cx + dx * scale, y: cy + dy * scale };
}

const centre = (node: GraphNode) => ({ x: node.x + node.w / 2, y: node.y + node.h / 2 });

/** Fixed-layout SVG for true graphs. Scrolls horizontally on narrow screens. */
export function GraphDiagram({ diagram }: { diagram: GraphDiagramData }) {
  const nodes = new Map(diagram.nodes.map((node) => [node.id, node]));
  const markerId = `arrow-${diagram.title.replace(/[^a-z]/gi, "")}`;

  return (
    <figure className="print-avoid-break">
      <div
        className="overflow-x-auto rounded-[3px] border border-line p-4 sm:p-5"
        tabIndex={0}
        role="group"
        aria-label={`${diagram.title}, zone défilante`}
      >
        <svg
          viewBox={`0 0 ${diagram.width} ${diagram.height}`}
          role="img"
          aria-label={diagram.description}
          className="mx-auto block h-auto w-full min-w-[560px] max-w-[46rem]"
        >
          <defs>
            <marker id={markerId} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0 0 L8 4 L0 8 z" fill="rgb(var(--muted))" />
            </marker>
          </defs>
          {diagram.edges.map((edge) => {
            const from = nodes.get(edge.from);
            const to = nodes.get(edge.to);
            if (!from || !to) return null;
            const start = exitPoint(from, centre(to));
            const end = exitPoint(to, centre(from));
            const isVertical = Math.abs(end.y - start.y) > Math.abs(end.x - start.x);
            return (
              <g key={`${edge.from}-${edge.to}`}>
                <line
                  x1={start.x}
                  y1={start.y}
                  x2={end.x}
                  y2={end.y}
                  stroke="rgb(var(--muted))"
                  strokeWidth="1"
                  strokeDasharray={edge.dashed ? "4 3" : undefined}
                  markerEnd={`url(#${markerId})`}
                />
                <line x1={start.x} y1={start.y} x2={end.x} y2={end.y} pathLength={100} className="trace" />
                {edge.label && (
                  <text
                    x={(start.x + end.x) / 2 + (isVertical ? 8 : 0)}
                    y={(start.y + end.y) / 2 + (isVertical ? 4 : -8)}
                    textAnchor={isVertical ? "start" : "middle"}
                    fontSize="11"
                    fontFamily="var(--font-mono)"
                    fill="rgb(var(--muted))"
                  >
                    {edge.label}
                  </text>
                )}
              </g>
            );
          })}
          {diagram.nodes.map((node) => (
            <g key={node.id}>
              <rect
                x={node.x}
                y={node.y}
                width={node.w}
                height={node.h}
                rx="3"
                fill="rgb(var(--surface))"
                stroke={svgStroke[node.tone ?? "default"]}
                strokeDasharray={node.tone === "warn" ? "4 3" : undefined}
              />
              <text x={node.x + 12} y={node.y + 24} fontSize="13" fontWeight="500" fontFamily="var(--font-mono)" fill="rgb(var(--ink))">
                {node.title}
              </text>
              {node.lines?.map((line, index) => (
                <text key={line} x={node.x + 12} y={node.y + 44 + index * 18} fontSize="12" fill="rgb(var(--muted))">
                  {line}
                </text>
              ))}
            </g>
          ))}
        </svg>
      </div>
      <p className="no-print mt-2 font-mono text-xs text-muted sm:hidden">Faire défiler le schéma horizontalement</p>
      <figcaption className="mt-3 max-w-prose text-sm text-muted">
        <span className="font-medium text-ink">{diagram.title}.</span> {diagram.description}
      </figcaption>
    </figure>
  );
}
