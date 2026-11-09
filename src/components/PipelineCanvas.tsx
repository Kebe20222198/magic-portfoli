"use client";

import { useEffect, useRef } from "react";

/** One record in 154 is rejected: 0,65 %, the real rate of the Lakehouse pipeline. */
const REJECT_EVERY = 154;
const GATES = [0.15, 0.34, 0.53];
const GRAPH_START = 0.66;
const GRAPH_END = 0.99;
const SPEED = 0.115;
const MAX_PILE = 26;

const STAGE_LABELS = [
  { name: "Ingestion", left: 0 },
  { name: "Bronze", left: GATES[0] },
  { name: "Silver", left: GATES[1] },
  { name: "Gold", left: GATES[2] },
  { name: "Agents", left: GRAPH_START },
];

const NODES = [
  { x: 0, y: 0.5 },
  { x: 0.5, y: 0.24 },
  { x: 0.5, y: 0.76 },
  { x: 1, y: 0.24 },
  { x: 1, y: 0.82 },
];

/** Same shape as the CEG ticket-triage plan. The last edge is conditional. */
const EDGES: [number, number][] = [
  [0, 1],
  [0, 2],
  [1, 3],
  [2, 3],
  [2, 4],
];

interface Record {
  x: number;
  y: number;
  lane: number;
  rejected: boolean;
  falling: boolean;
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

/** Records are scattered when raw and line up as they cross each quality gate. */
function spreadAt(x: number) {
  if (x < GATES[0]) return 0.4;
  if (x < GATES[1]) return 0.3;
  if (x < GATES[2]) return 0.15;
  return 0.15 * (1 - clamp((x - GATES[2]) / (GRAPH_START - GATES[2]), 0, 1));
}

export default function PipelineCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const totalRef = useRef<HTMLSpanElement>(null);
  const rejectedRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || typeof ResizeObserver === "undefined" || typeof IntersectionObserver === "undefined") return;
    const context = canvas.getContext("2d");
    if (!context) return;
    const ctx = context;

    const styles = getComputedStyle(canvas);
    const color = (name: string, alpha = 1) => `rgb(${styles.getPropertyValue(`--${name}`).trim()} / ${alpha})`;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let records: Record[] = [];
    let pile = 0;
    let total = 0;
    let rejectedTotal = 0;
    let spawnDebt = 0;
    let gateFlash = 0;
    let clock = 0;
    let frame = 0;
    let last = 0;
    let visible = true;
    let pointer: { x: number; y: number } | null = null;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      if (reducedMotion || !frame) draw();
    };

    const spawn = () => {
      total += 1;
      records.push({
        x: 0,
        y: 0.5 + (Math.random() - 0.5) * 0.8,
        lane: (Math.random() - 0.5) * 2,
        rejected: total % REJECT_EVERY === 0,
        falling: false,
      });
    };

    const step = (dt: number) => {
      clock += dt;
      gateFlash = Math.max(0, gateFlash - dt * 1.6);
      spawnDebt += dt * (width < 640 ? 22 : 38);
      while (spawnDebt >= 1) {
        spawnDebt -= 1;
        spawn();
      }

      const kept: Record[] = [];
      for (const record of records) {
        if (record.falling) {
          record.y += dt * 0.9;
          if (record.y >= 0.93) {
            pile = Math.min(pile + 1, MAX_PILE);
            rejectedTotal += 1;
            continue;
          }
          kept.push(record);
          continue;
        }

        record.x += dt * SPEED;
        if (record.rejected && record.x >= GATES[1]) {
          record.falling = true;
          record.x = GATES[1];
          gateFlash = 1;
          kept.push(record);
          continue;
        }

        const target = 0.5 + record.lane * spreadAt(record.x);
        record.y += (target - record.y) * clamp(dt * 3.4, 0, 1);

        if (pointer) {
          const dx = record.x * width - pointer.x;
          const dy = record.y * height - pointer.y;
          const distance = Math.hypot(dx, dy);
          if (distance < 70 && distance > 0) record.y += ((dy / distance) * (70 - distance) * dt * 4) / height;
        }

        if (record.x < GRAPH_START) kept.push(record);
      }
      records = kept;
    };

    /** Position 0–1 of the current run through the five-step plan. */
    const graphState = () => {
      const period = 3;
      const cycle = Math.floor(clock / period);
      const phase = (clock % period) / period;
      return { phase, conditional: cycle % 3 === 2 };
    };

    function draw() {
      ctx.clearRect(0, 0, width, height);

      GATES.forEach((gate, index) => {
        const x = gate * width;
        ctx.beginPath();
        ctx.setLineDash([3, 5]);
        ctx.strokeStyle = index === 1 && gateFlash > 0 ? color("accent", 0.35 + gateFlash * 0.65) : color("line");
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      });
      ctx.setLineDash([]);

      for (const record of records) {
        const x = record.x * width;
        const y = record.y * height;
        if (record.falling) continue;
        const refined = record.x >= GATES[2];
        const entering = clamp(record.x / 0.03, 0, 1);
        ctx.fillStyle = color("ink", (record.x < GATES[1] ? 0.42 : refined ? 1 : 0.72) * entering);
        ctx.beginPath();
        ctx.arc(x, y, refined ? 1.7 : 1.3, 0, Math.PI * 2);
        ctx.fill();
      }

      const rejectAt = (x: number, y: number) => {
        ctx.beginPath();
        ctx.strokeStyle = color("accent");
        ctx.lineWidth = 1.4;
        ctx.arc(x, y, 3.6, 0, Math.PI * 2);
        ctx.stroke();
        ctx.lineWidth = 1;
      };
      for (const record of records) {
        if (record.falling) rejectAt(record.x * width, record.y * height);
      }
      for (let index = 0; index < pile; index += 1) {
        rejectAt(GATES[1] * width + 10 + index * 9, height * 0.93);
      }

      const graphX = GRAPH_START * width;
      const graphW = Math.min(GRAPH_END * width, width - 14) - graphX; // Keeps edge nodes on screen.
      const point = (index: number) => ({
        x: graphX + NODES[index].x * graphW,
        y: 28 + NODES[index].y * (height - 56),
      });

      ctx.strokeStyle = color("ink", 0.5);
      ctx.beginPath();
      ctx.moveTo(GRAPH_START * width - 6, height * 0.5);
      ctx.lineTo(point(0).x, point(0).y);
      ctx.stroke();

      const { phase, conditional } = graphState();
      const active = (edge: number) => {
        const conditionalHidden = edge === 4 && !conditional;
        if (conditionalHidden) return null;
        const start = edge < 2 ? 0 : 0.42;
        const progress = (phase - start) / 0.4;
        return progress >= 0 && progress <= 1 ? progress : null;
      };

      EDGES.forEach(([from, to], edge) => {
        const a = point(from);
        const b = point(to);
        ctx.beginPath();
        ctx.strokeStyle = color("line");
        ctx.setLineDash(edge === 4 ? [3, 4] : []);
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
        ctx.setLineDash([]);
        const progress = active(edge);
        if (progress !== null) {
          ctx.fillStyle = color("accent");
          ctx.beginPath();
          ctx.arc(a.x + (b.x - a.x) * progress, a.y + (b.y - a.y) * progress, 2.6, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      NODES.forEach((_, index) => {
        const { x, y } = point(index);
        const lit =
          (index === 0 && phase < 0.1) ||
          ((index === 1 || index === 2) && phase > 0.38 && phase < 0.52) ||
          (index === 3 && phase > 0.8 && phase < 0.95) ||
          (index === 4 && conditional && phase > 0.8 && phase < 0.95);
        ctx.beginPath();
        ctx.arc(x, y, 7, 0, Math.PI * 2);
        ctx.fillStyle = lit ? color("accent") : color("canvas");
        ctx.fill();
        ctx.strokeStyle = lit ? color("accent") : color("ink", 0.7);
        ctx.stroke();
      });

      if (totalRef.current) totalRef.current.textContent = total.toLocaleString("fr-FR");
      if (rejectedRef.current) rejectedRef.current.textContent = rejectedTotal.toLocaleString("fr-FR");
    }

    const loop = (time: number) => {
      frame = requestAnimationFrame(loop);
      if (!visible || document.hidden) {
        last = time;
        return;
      }
      step(Math.min((time - last) / 1000 || 0, 0.05));
      last = time;
      draw();
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer = { x: event.clientX - rect.left, y: event.clientY - rect.top };
    };
    const onPointerLeave = () => {
      pointer = null;
    };

    const resizeObserver = new ResizeObserver(resize);
    const visibility = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    // Without the animation loop, the static frame has to follow theme changes itself.
    const themeObserver = new MutationObserver(() => {
      if (reducedMotion) draw();
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    resizeObserver.observe(canvas);
    visibility.observe(canvas);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerleave", onPointerLeave);

    resize();
    // Warm up so the stream is already flowing, and the static frame is meaningful.
    for (let index = 0; index < 500; index += 1) step(0.033);
    draw();
    if (!reducedMotion) frame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frame);
      themeObserver.disconnect();
      resizeObserver.disconnect();
      visibility.disconnect();
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <figure className="no-print fade-up" style={{ ["--d" as string]: "650ms" }}>
      <div className="border-y border-line">
        <div className="page max-sm:px-0">
          <div className="relative h-52 sm:h-64">
        <canvas
          ref={canvasRef}
          role="img"
          aria-label="Animation : des enregistrements traversent les couches Bronze, Silver et Gold, quelques-uns sont déviés en quarantaine, puis les données alimentent un graphe d'agents."
          className="absolute inset-0 h-full w-full"
        />
        {STAGE_LABELS.map((label) => (
          <span
            key={label.name}
            className={`pointer-events-none absolute top-2 pl-1.5 font-mono text-[10px] uppercase tracking-[0.08em] text-muted sm:text-[11px] ${label.name === "Ingestion" ? "hidden sm:block" : ""}`}
            style={{ left: `${label.left * 100}%` }}
          >
            {label.name}
          </span>
        ))}
        <span
          className="pointer-events-none absolute bottom-2 hidden pl-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-accent sm:block"
          style={{ left: `${GATES[1] * 100}%`, transform: "translateY(-1.1rem)" }}
        >
          Quarantaine
        </span>
          </div>
        </div>
      </div>
      <figcaption className="page mt-3 flex flex-col gap-1 font-mono text-[11px] text-muted sm:flex-row sm:justify-between sm:gap-6">
        <span>Simulation visuelle, au taux de rejet réel du pipeline : 1 enregistrement sur 154, soit 0,65 %.</span>
        <span className="shrink-0 tabular-nums">
          <span ref={totalRef}>0</span> traités · <span ref={rejectedRef}>0</span> en quarantaine
        </span>
      </figcaption>
    </figure>
  );
}
