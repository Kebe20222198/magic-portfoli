import type { ReactNode } from "react";
import Link from "next/link";
import { Download } from "lucide-react";
import {
  additionalSkills,
  educationHistory,
  experiences,
  involvement,
  otherWork,
  personalInfo,
  skills,
} from "@/data/portfolio";
import { projects } from "@/data/projects";

function ResumeSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-t border-line py-7 print:py-3">
      <h2 className="eyebrow mb-4 print:mb-2">{title}</h2>
      {children}
    </section>
  );
}

function Entry({ title, meta, children }: { title: string; meta?: string; children?: ReactNode }) {
  return (
    <div className="print-avoid-break">
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between sm:gap-6 print:flex-row print:items-baseline print:justify-between">
        <h3 className="font-medium">{title}</h3>
        {meta && <p className="shrink-0 text-sm text-muted">{meta}</p>}
      </div>
      {children}
    </div>
  );
}

export default function ResumePage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-12 sm:px-8 md:py-16 print:max-w-none print:p-0">
      <header className="pb-8 print:pb-3">
        <h1 className="font-display text-6xl font-normal leading-none print:text-3xl">{personalInfo.name}</h1>
        <p className="mt-2 font-medium">
          {personalInfo.headline} | {personalInfo.affiliation}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted">{personalInfo.pitch}</p>
        <p className="mt-3 text-sm text-muted">
          {personalInfo.location} ·{" "}
          <a href={`mailto:${personalInfo.email}`} className="link">{personalInfo.email}</a> ·{" "}
          <a href={personalInfo.linkedin} className="link">{personalInfo.linkedinLabel}</a> ·{" "}
          <a href={personalInfo.github} className="link">{personalInfo.githubLabel}</a>
        </p>
        <a href={personalInfo.cvFile} download className="btn-primary no-print mt-6">
          <Download size={15} aria-hidden="true" />
          Télécharger le PDF
        </a>
      </header>

      <ResumeSection title="Expériences">
        <div className="space-y-5 print:space-y-2">
          {experiences.map((entry) => (
            <Entry key={entry.company} title={`${entry.company} — ${entry.role}`} meta={entry.period}>
              <p className="text-sm text-muted">{entry.location}</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed print:mt-1 print:space-y-0">
                {entry.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </Entry>
          ))}
        </div>
      </ResumeSection>

      <ResumeSection title="Projets principaux">
        <div className="space-y-5 print:space-y-2">
          {projects.map((project) => (
            <Entry key={project.slug} title={project.title} meta={project.period}>
              <p className="mt-1 text-sm leading-relaxed print:mt-0">{project.summary}</p>
              <p className="mt-1 font-mono text-xs text-muted print:mt-0">{project.stack.join(" · ")}</p>
              <Link href={`/projects/${project.slug}`} className="link no-print mt-1 inline-block text-sm">
                Étude de cas
              </Link>
            </Entry>
          ))}
        </div>
      </ResumeSection>

      <ResumeSection title="Compétences">
        <dl className="space-y-2 text-sm print:space-y-0.5">
          {[...skills, ...additionalSkills].map((group) => (
            <div key={group.category} className="grid gap-x-6 sm:grid-cols-4 print:grid-cols-4">
              <dt className="font-medium">{group.category}</dt>
              <dd className="text-muted sm:col-span-3 print:col-span-3">{group.items.join(", ")}</dd>
            </div>
          ))}
        </dl>
      </ResumeSection>

      <ResumeSection title="Formation">
        <div className="space-y-3 print:space-y-1">
          {educationHistory.map((entry) => (
            <Entry key={entry.institution} title={entry.institution} meta={entry.period}>
              <p className="text-sm text-muted">
                {entry.degree} · {entry.location}
                {entry.note ? ` · ${entry.note}` : ""}
              </p>
            </Entry>
          ))}
        </div>
      </ResumeSection>

      <ResumeSection title="Autres réalisations">
        <ul className="space-y-2 text-sm leading-relaxed print:space-y-0.5">
          {otherWork.map((work) => (
            <li key={work.title} className="print-avoid-break">
              <span className="font-medium">{work.title}</span>
              <span className="text-muted"> — {work.description}</span>
            </li>
          ))}
        </ul>
      </ResumeSection>

      <ResumeSection title="Engagement associatif">
        <ul className="space-y-2 text-sm leading-relaxed print:space-y-0.5">
          {involvement.map((item) => (
            <li key={item.organization} className="print-avoid-break">
              <span className="font-medium">{item.role}, {item.organization}</span>
              <span className="text-muted"> ({item.period}) — {item.description}</span>
            </li>
          ))}
        </ul>
      </ResumeSection>
    </div>
  );
}
