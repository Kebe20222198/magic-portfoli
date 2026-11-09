"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

/** Reveals every [data-reveal] element as it enters the viewport. */
export function RevealController() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    document.querySelectorAll("[data-reveal]:not(.is-visible)").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}

/** Thin bar showing how far through the page the reader is. */
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (barRef.current) barRef.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      ref={barRef}
      aria-hidden="true"
      className="absolute inset-x-0 bottom-[-1px] h-px origin-left bg-accent"
      style={{ transform: "scaleX(0)" }}
    />
  );
}

const NUMBER = /^([~−-]?)(\d+(?:,\d+)?)(.*)$/;

/** Counts up to `value` on first view. Renders the final value without JS. */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const match = value.match(NUMBER);
    const element = ref.current;
    if (
      !match ||
      !element ||
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const [, prefix, number, suffix] = match;
    const decimals = number.split(",")[1]?.length ?? 0;
    const target = Number(number.replace(",", "."));
    const format = (current: number) => `${prefix}${current.toFixed(decimals).replace(".", ",")}${suffix}`;

    let frame = 0;
    setDisplay(format(0));
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / 1400, 1);
          const eased = 1 - (1 - progress) ** 4;
          setDisplay(progress === 1 ? value : format(target * eased));
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    observer.observe(element);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}

/** Text whose words darken one by one as the reader scrolls through it. */
export function ScrollText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = text.split(" ");

  useEffect(() => {
    const element = ref.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const spans = Array.from(element.querySelectorAll<HTMLElement>("[data-word]"));
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = element.getBoundingClientRect();
      const viewport = window.innerHeight;
      const progress = (viewport * 0.82 - rect.top) / (rect.height + viewport * 0.3);
      spans.forEach((span, index) => {
        const local = progress * spans.length - index;
        span.style.opacity = String(Math.min(1, Math.max(0.18, local + 0.18)));
      });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <p ref={ref} className={className}>
      {words.map((word, index) => (
        <span key={`${word}-${index}`} data-word className="transition-opacity duration-300">
          {word}
          {index < words.length - 1 ? " " : ""}
        </span>
      ))}
    </p>
  );
}

/** Highlights the section currently being read in a table of contents. */
export function TableOfContents({ items }: { items: { id: string; title: string }[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );
    for (const { id } of items) {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    }
    return () => observer.disconnect();
  }, [items]);

  return (
    <ol className="sticky top-24 space-y-2.5 text-sm">
      {items.map((item) => (
        <li key={item.id}>
          <a
            href={`#${item.id}`}
            aria-current={active === item.id ? "location" : undefined}
            className={`flex items-center gap-2 transition-colors hover:text-ink ${active === item.id ? "text-ink" : "text-muted"}`}
          >
            <span
              aria-hidden="true"
              className={`h-px bg-accent transition-all duration-300 ${active === item.id ? "w-5" : "w-0"}`}
            />
            {item.title}
          </a>
        </li>
      ))}
    </ol>
  );
}

/** Email address that copies itself on click, with a mail link beside it. */
export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <button type="button" onClick={copy} className="btn-secondary" aria-live="polite">
      {copied ? "Adresse copiée" : "Copier l'adresse"}
    </button>
  );
}
