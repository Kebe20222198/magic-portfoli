import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { projects } from "@/data/projects";
import ProjectGlyph from "@/components/ProjectGlyph";
import Section from "@/components/Section";
import { cn } from "@/lib/utils";

export default function ProjectsSection() {
  return (
    <Section id="projects" index="02" title="Projets principaux" stage>
      <ol>
        {projects.map((project, index) => (
          <li
            key={project.slug}
            data-reveal
            style={{ "--d": "60ms" } as CSSProperties}
            className="group relative grid gap-8 border-t border-line py-12 md:py-20 lg:grid-cols-12 lg:gap-10"
          >
            <div className={cn("lg:col-span-7", index % 2 === 1 && "lg:order-2 lg:col-start-6")}>
              <p className="eyebrow">
                {String(index + 1).padStart(2, "0")} · {project.domain}
              </p>
              <h3 className="mt-4 font-display text-4xl leading-[1.05] sm:text-5xl lg:text-[3.5rem]">
                <Link
                  href={`/projects/${project.slug}`}
                  className="transition-colors duration-300 after:absolute after:inset-0 group-hover:text-accent"
                >
                  {project.title}
                </Link>
              </h3>
              <p className="mt-5 max-w-prose text-lg leading-relaxed text-muted">{project.summary}</p>
              <ul className="mt-6 max-w-prose space-y-2 text-sm">
                {project.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3 max-sm:justify-center">
                    <span aria-hidden="true" className="mt-[0.6em] h-px w-4 shrink-0 bg-accent max-sm:hidden" />
                    {highlight}
                  </li>
                ))}
              </ul>
              <p className="mt-7 font-mono text-xs leading-relaxed text-muted">{project.stack.join(" · ")}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium" aria-hidden="true">
                Lire l&apos;étude de cas
                <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1.5" />
              </span>
            </div>
            <div className={cn("flex items-center justify-center lg:col-span-5", index % 2 === 1 && "lg:order-1 lg:col-start-1")}>
              <ProjectGlyph
                slug={project.slug}
                className="w-full max-w-sm transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
