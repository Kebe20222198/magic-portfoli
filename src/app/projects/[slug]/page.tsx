import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { FlowDiagram, GraphDiagram } from "@/components/Diagrams";
import { CountUp, TableOfContents } from "@/components/Motion";
import ProjectGlyph from "@/components/ProjectGlyph";
import { getProject, projects, type Project } from "@/data/projects";

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const project = getProject(params.slug);
  if (!project) return {};
  const path = `/projects/${project.slug}`;
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: path },
    openGraph: {
      title: project.title,
      description: project.summary,
      type: "article",
      url: path,
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Mohamed Kebe, Data Engineer & AI Engineer" }],
    },
  };
}

interface CaseSection {
  id: string;
  title: string;
  content: ReactNode;
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="max-w-prose list-disc space-y-2 pl-5 leading-relaxed marker:text-muted">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function Paragraphs({ items }: { items: string[] }) {
  return (
    <div className="max-w-prose space-y-4 leading-relaxed">
      {items.map((item) => (
        <p key={item}>{item}</p>
      ))}
    </div>
  );
}

function Results({ results }: { results: Project["results"] }) {
  return (
    <div>
      {results.rows.length > 0 && (
        <div className="overflow-x-auto">
          <table className="mb-4 w-full min-w-[32rem] border-y border-line text-sm">
            <thead className="sr-only">
              <tr>
                <th>Indicateur</th>
                <th>Valeur</th>
                <th>Conditions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {results.rows.map((row) => (
                <tr key={row.metric}>
                  <th scope="row" className="w-2/5 py-3 pr-4 text-left align-top font-normal">{row.metric}</th>
                  <td className="w-28 whitespace-nowrap py-3 pr-4 align-top font-display text-3xl leading-none">
                    <CountUp value={row.value} className="tabular-nums" />
                  </td>
                  <td className="py-3 align-top text-muted">{row.context}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <p className="max-w-prose text-sm leading-relaxed text-muted">{results.note}</p>
    </div>
  );
}

function buildSections(project: Project): CaseSection[] {
  const sections: CaseSection[] = [
    { id: "problem", title: "Présentation et problématique", content: <Paragraphs items={project.problem} /> },
    { id: "objectives", title: "Objectifs", content: <BulletList items={project.objectives} /> },
    { id: "architecture", title: "Architecture technique", content: <Paragraphs items={project.architecture} /> },
    {
      id: "diagram",
      title: "Diagramme d'architecture",
      content: (
        <div className="space-y-10">
          <FlowDiagram diagram={project.diagram} />
          {project.graphs?.map((graph) => <GraphDiagram key={graph.title} diagram={graph} />)}
        </div>
      ),
    },
    {
      id: "stack",
      title: "Stack technologique",
      content: <p className="font-mono text-sm leading-relaxed max-sm:text-center">{project.stack.join(" · ")}</p>,
    },
    { id: "features", title: "Fonctionnalités principales", content: <BulletList items={project.features} /> },
    {
      id: "decisions",
      title: "Décisions d'ingénierie et défis",
      content: (
        <dl className="max-w-prose space-y-6">
          {project.decisions.map((decision) => (
            <div key={decision.title}>
              <dt className="font-medium">{decision.title}</dt>
              <dd className="mt-1 leading-relaxed text-muted">{decision.body}</dd>
            </div>
          ))}
        </dl>
      ),
    },
    { id: "results", title: "Résultats mesurables", content: <Results results={project.results} /> },
  ];

  if (project.demo) {
    sections.push({
      id: "demo",
      title: "Démonstration",
      content: (
        <figure>
          <video
            controls
            preload="none"
            playsInline
            poster={project.demo.poster}
            className="aspect-video w-full rounded-[3px] border border-line bg-surface"
            aria-label={project.demo.caption}
          >
            <source src={project.demo.video} type="video/mp4" />
            <a href={project.demo.video}>Télécharger la vidéo</a>
          </video>
          <figcaption className="mt-3 max-w-prose text-sm text-muted">{project.demo.caption}</figcaption>
        </figure>
      ),
    });
  }

  sections.push({
    id: "repository",
    title: "Dépôt GitHub",
    content: (
      <div className="max-w-prose max-sm:text-center">
        {project.repository.url && (
          <a href={project.repository.url} target="_blank" rel="noopener noreferrer" className="btn-secondary">
            Voir le dépôt sur GitHub
            <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        )}
        {project.repository.note && (
          <p className={`text-sm leading-relaxed text-muted ${project.repository.url ? "mt-4" : ""}`}>{project.repository.note}</p>
        )}
      </div>
    ),
  });

  return sections;
}

export default function ProjectPage({ params }: PageProps) {
  const project = getProject(params.slug);
  if (!project) notFound();

  const sections = buildSections(project);
  const index = projects.findIndex((candidate) => candidate.slug === project.slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <article>
      <header className="blueprint">
        <div className="page grid gap-8 pb-16 pt-10 md:pb-24 md:pt-14 lg:grid-cols-12 lg:items-end lg:gap-10">
          <div className="max-sm:text-center lg:col-span-8">
            <Link href="/#projects" className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-ink">
              <ArrowLeft size={15} aria-hidden="true" />
              Tous les projets
            </Link>
            <p className="eyebrow fade-up mt-12">
              {project.domain} · {project.period}
            </p>
            <h1 className="heading-xl fade-up mt-4" style={{ ["--d" as string]: "120ms" }}>{project.title}</h1>
            <p className="fade-up mt-6 max-w-prose text-lg leading-relaxed text-muted" style={{ ["--d" as string]: "260ms" }}>{project.summary}</p>
          </div>
          <div className="fade-up hidden justify-end lg:col-span-4 lg:flex" style={{ ["--d" as string]: "380ms" }}>
            <ProjectGlyph slug={project.slug} className="w-full max-w-xs" />
          </div>
        </div>
      </header>

      <div className="page grid gap-10 border-t border-line py-12 lg:grid-cols-12">
        <nav aria-label="Sommaire du projet" className="hidden lg:col-span-3 lg:block">
          <TableOfContents items={sections.map(({ id, title }) => ({ id, title }))} />
        </nav>

        <div className="min-w-0 space-y-14 lg:col-span-9">
          {sections.map((section, sectionIndex) => (
            <section key={section.id} id={section.id} data-reveal aria-labelledby={`${section.id}-title`}>
              <h2 id={`${section.id}-title`} className="mb-6 flex items-baseline gap-3 font-display text-4xl font-normal leading-tight max-sm:flex-col max-sm:items-center max-sm:gap-1 max-sm:text-center">
                <span className="font-mono text-xs font-normal text-muted" aria-hidden="true">
                  {String(sectionIndex + 1).padStart(2, "0")}
                </span>
                {section.title}
              </h2>
              {section.content}
            </section>
          ))}
        </div>
      </div>

      <nav aria-label="Projet suivant" className="border-t border-line">
        <div className="page py-10 max-sm:text-center">
          <p className="eyebrow">Projet suivant</p>
          <Link href={`/projects/${next.slug}`} className="group mt-3 inline-flex items-center gap-3 font-display text-4xl leading-tight transition-colors hover:text-accent sm:text-5xl">
            {next.title}
            <ArrowRight size={20} aria-hidden="true" className="shrink-0 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </nav>
    </article>
  );
}
