import type { CSSProperties, ReactNode } from "react";

const delay = (ms: number, duration?: number) =>
  ({ "--d": `${ms}ms`, ...(duration ? { "--t": `${duration}s` } : {}) }) as CSSProperties;

const strokes = { fill: "none", stroke: "rgb(var(--line))", strokeWidth: 1 };
const label = { fontFamily: "var(--font-mono)", fontSize: 10, fill: "rgb(var(--muted))", letterSpacing: "0.08em" };

function Trace({ d, ms = 0, duration }: { d: string; ms?: number; duration?: number }) {
  return <path d={d} pathLength={100} className="trace" style={delay(ms, duration)} />;
}

function Lakehouse() {
  const layers: [number, string][] = [
    [136, "BRONZE"],
    [80, "SILVER"],
    [24, "GOLD"],
  ];
  return (
    <>
      {layers.map(([y, name]) => (
        <g key={name}>
          <polygon
            points={`160,${y} 276,${y + 38} 160,${y + 76} 44,${y + 38}`}
            fill="rgb(var(--surface))"
            stroke={name === "GOLD" ? "rgb(var(--ink))" : "rgb(var(--muted))"}
          />
          <text x={160} y={y + 42} textAnchor="middle" {...label}>{name}</text>
        </g>
      ))}
      <Trace d="M100 200 L100 62" ms={0} duration={2.6} />
      <Trace d="M160 212 L160 96" ms={800} duration={2.6} />
      <Trace d="M220 200 L220 62" ms={1500} duration={2.6} />
      <path d="M262 112 C292 126 300 156 300 202" {...strokes} strokeDasharray="3 4" stroke="rgb(var(--accent))" />
      <Trace d="M262 112 C292 126 300 156 300 202" ms={400} duration={4.8} />
      <text x={314} y={222} textAnchor="end" {...label}>DLQ</text>
    </>
  );
}

function CognitiveGraph() {
  const nodes: [number, number][] = [
    [160, 34],
    [76, 120],
    [244, 120],
    [76, 206],
    [244, 206],
  ];
  const edges: [string, number, boolean?][] = [
    ["M160 34 L76 120", 0],
    ["M160 34 L244 120", 0],
    ["M76 120 L76 206", 1400],
    ["M244 120 L76 206", 1400],
    ["M244 120 L244 206", 1400, true],
  ];
  return (
    <>
      {edges.map(([d, ms, dashed]) => (
        <g key={d}>
          <path d={d} {...strokes} strokeDasharray={dashed ? "3 4" : undefined} stroke="rgb(var(--muted))" />
          <Trace d={d} ms={ms} duration={2.8} />
        </g>
      ))}
      {nodes.map(([cx, cy], index) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={11} fill="rgb(var(--surface))" stroke="rgb(var(--ink))" className="twinkle" style={delay(index * 450)} />
      ))}
    </>
  );
}

function Retrieval() {
  const docs = [40, 96, 152];
  const points: [number, number][] = [[128, 74], [146, 104], [122, 128], [150, 148], [172, 86], [176, 128], [132, 170], [168, 172], [196, 108], [196, 150], [110, 100], [112, 150]];
  return (
    <>
      {docs.map((y, index) => (
        <g key={y}>
          <rect x={14} y={y} width={36} height={46} rx={2} fill="rgb(var(--surface))" stroke="rgb(var(--muted))" />
          <path d={`M22 ${y + 14} H42 M22 ${y + 23} H42 M22 ${y + 32} H34`} {...strokes} stroke="rgb(var(--muted))" />
          <Trace d={`M50 ${y + 23} L112 122`} ms={index * 600} duration={2.4} />
        </g>
      ))}
      {points.map(([cx, cy], index) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={2.4} fill="rgb(var(--ink))" className="twinkle" style={delay(index * 230)} />
      ))}
      <path d="M204 122 L238 122" {...strokes} stroke="rgb(var(--muted))" />
      <Trace d="M204 122 L238 122" ms={500} duration={2} />
      <circle cx={270} cy={122} r={32} {...strokes} stroke="rgb(var(--ink))" />
      <path d="M270 90 A32 32 0 1 1 269.9 90" pathLength={100} className="trace" style={delay(0, 2.4)} />
      <text x={270} y={126} textAnchor="middle" {...label}>AGENT</text>
    </>
  );
}

function WalkForward() {
  const rows = [0, 1, 2, 3, 4];
  const cell = 20;
  return (
    <>
      {rows.map((row) => {
        const train = 4 + row * 2;
        return (
          <g key={row} transform={`translate(20 ${44 + row * 30})`}>
            {Array.from({ length: train }, (_, index) => (
              <rect key={index} x={index * cell} width={cell - 3} height={16} fill="rgb(var(--muted))" opacity={0.4} />
            ))}
            {[0, 1].map((index) => (
              <rect key={index} x={(train + index) * cell} width={cell - 3} height={16} fill="rgb(var(--accent))" className="window-test" style={delay(row * 1000)} />
            ))}
          </g>
        );
      })}
      <text x={20} y={26} {...label}>TRAIN</text>
      <text x={68} y={26} {...label} fill="rgb(var(--accent))">TEST</text>
      <path d="M20 212 H296" {...strokes} stroke="rgb(var(--muted))" />
      <Trace d="M20 212 H296" duration={5} />
      <text x={300} y={228} textAnchor="end" {...label}>TEMPS</text>
    </>
  );
}

const glyphs: Record<string, ReactNode> = {
  "nyc-taxi-lakehouse": <Lakehouse />,
  "cognitive-execution-graph": <CognitiveGraph />,
  "agentic-rag-mcp": <Retrieval />,
  "ml-financial-backtesting": <WalkForward />,
};

/** Small animated schematic of what a project does. Illustrative, it carries no data. */
export default function ProjectGlyph({ slug, className }: { slug: string; className?: string }) {
  return (
    <svg viewBox="0 0 320 240" aria-hidden="true" className={className}>
      {glyphs[slug]}
    </svg>
  );
}
