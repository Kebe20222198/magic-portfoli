import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import {
  about,
  educationHistory,
  experiences,
  fieldNotes,
  journey,
  manifesto,
  otherWork,
  personalInfo,
  skills,
} from "@/data/portfolio";
import { projects } from "@/data/projects";
import { CopyEmail, ScrollText } from "@/components/Motion";
import Section from "@/components/Section";

const stagger = (index: number) => ({ "--d": `${index * 90}ms` }) as CSSProperties;

function Journey() {
  return (
    <div data-reveal className="mt-20 md:mt-28">
      <p className="eyebrow mb-8">Le chemin jusqu&apos;ici</p>
      <div className="relative hidden lg:block" aria-hidden="true">
        <div className="draw-line h-px bg-ink" />
      </div>
      <ol className="grid border-l border-ink pl-6 lg:grid-cols-5 lg:border-l-0 lg:pl-0">
        {journey.map((step, index) => {
          const last = index === journey.length - 1;
          return (
            <li key={step.place} className="relative pb-9 lg:pb-0 lg:pr-6 lg:pt-6">
              <span
                aria-hidden="true"
                className={`absolute -left-[1.84rem] top-1 h-2.5 w-2.5 rounded-full lg:-top-[5px] lg:left-0 ${last ? "bg-accent" : "bg-ink"}`}
              />
              <p className="eyebrow">{step.period}</p>
              <p className={`mt-2 font-display text-2xl leading-tight ${last ? "text-accent" : ""}`}>{step.place}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{step.detail}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export function AboutSection() {
  return (
    <Section id="about" index="01" title="À propos">
      <ScrollText
        text={manifesto}
        className="max-w-5xl font-display text-[2rem] leading-[1.15] sm:text-5xl lg:text-[3.6rem]"
      />
      <div data-reveal className="mt-14 grid gap-x-10 gap-y-5 leading-relaxed text-muted md:grid-cols-2 lg:ml-[25%] md:mt-20">
        {about.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <Journey />
    </Section>
  );
}

export function ExperienceSection() {
  return (
    <Section id="experience" index="03" title="Expériences">
      <ol>
        {experiences.map((entry) => (
          <li key={entry.company} data-reveal className="grid gap-6 border-t border-line py-10 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-5">
              <h3 className="font-display text-4xl leading-tight">{entry.company}</h3>
              <p className="mt-3 font-medium">{entry.role}</p>
              <p className="eyebrow mt-3">{entry.period}</p>
              <p className="mt-1 text-sm text-muted">{entry.location}</p>
            </div>
            <div className="lg:col-span-7">
              <p className="text-lg">{entry.summary}</p>
              <ul className="mt-4 space-y-2 text-muted">
                {entry.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3">
                    <span aria-hidden="true" className="mt-[0.75em] h-px w-4 shrink-0 bg-accent" />
                    {bullet}
                  </li>
                ))}
              </ul>
              {entry.projectSlug && (
                <Link href={`/projects/${entry.projectSlug}`} className="link mt-5 inline-block text-sm">
                  Voir l&apos;étude de cas
                </Link>
              )}
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}

export function FieldNotesSection() {
  return (
    <Section id="notes" index="04" title="Ce qui a cassé" stage>
      <p data-reveal className="-mt-6 mb-12 max-w-prose text-lg leading-relaxed text-muted md:-mt-12 md:mb-16">
        Un projet se juge aussi à ses échecs. Trois moments où mes systèmes ne se sont pas comportés comme prévu.
      </p>
      <ol className="grid gap-px bg-line lg:grid-cols-3">
        {fieldNotes.map((note, index) => (
          <li key={note.title} data-reveal style={stagger(index)} className="flex flex-col bg-canvas p-6 sm:p-8 lg:first:pl-0 lg:last:pr-0">
            <Link href={`/projects/${note.projectSlug}`} className="eyebrow transition-colors hover:text-accent">
              {note.project}
            </Link>
            <h3 className="mt-4 font-display text-3xl leading-tight">{note.title}</h3>
            <dl className="mt-6 space-y-4 text-sm leading-relaxed">
              {[
                ["Symptôme", note.symptom],
                ["Cause", note.cause],
                ["Correctif", note.fix],
              ].map(([term, description]) => (
                <div key={term}>
                  <dt className="font-mono text-xs uppercase tracking-[0.08em] text-accent">{term}</dt>
                  <dd className="mt-1 text-muted">{description}</dd>
                </div>
              ))}
            </dl>
          </li>
        ))}
      </ol>
    </Section>
  );
}

export function SkillsSection() {
  return (
    <Section id="skills" index="05" title="Compétences">
      <ol className="border-b border-line">
        {skills.map((group, index) => (
          <li key={group.category} data-reveal className="group flex items-start gap-5 border-t border-line py-8 sm:gap-10 md:gap-14 md:py-12">
            <span
              aria-hidden="true"
              className="w-[1.05em] shrink-0 font-display leading-[0.85] transition-colors duration-300 group-hover:text-accent"
              style={{ fontSize: "clamp(3.25rem, 10vw, 8.5rem)" }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="min-w-0 transition-transform duration-300 group-hover:translate-x-2 md:pt-1">
              <h3 className="text-base font-medium uppercase tracking-tight sm:text-xl md:text-2xl">{group.category}</h3>
              <p className="mt-3 max-w-2xl leading-relaxed text-muted md:text-lg">
                {group.items.join(", ")} — {group.purpose}
              </p>
              {group.usedIn && (
                <p className="mt-4 flex items-baseline gap-2 font-mono text-xs text-muted">
                  <span>Vu dans</span>
                  {group.usedIn.map((slug) => {
                    const projectIndex = projects.findIndex((project) => project.slug === slug);
                    return (
                      <Link
                        key={slug}
                        href={`/projects/${slug}`}
                        aria-label={`Projet ${projects[projectIndex].title}`}
                        className="text-ink underline underline-offset-4 transition-colors hover:text-accent"
                      >
                        {String(projectIndex + 1).padStart(2, "0")}
                      </Link>
                    );
                  })}
                </p>
              )}
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}

export function EducationSection() {
  return (
    <Section id="education" index="06" title="Formation">
      <ol>
        {educationHistory.map((entry) => (
          <li key={entry.institution} data-reveal className="grid gap-3 border-t border-line py-8 lg:grid-cols-12 lg:gap-10">
            <p className="eyebrow lg:col-span-2 lg:pt-3">{entry.period}</p>
            <h3 className="font-display text-3xl leading-tight sm:text-4xl lg:col-span-6">{entry.institution}</h3>
            <div className="lg:col-span-4 lg:pt-2">
              <p>{entry.degree}</p>
              <p className="mt-1 text-sm text-muted">{entry.location}</p>
              {entry.note && <p className="mt-1 text-sm text-muted">{entry.note}</p>}
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}

export function OtherWorkSection() {
  return (
    <Section id="other-work" index="07" title="Autres réalisations">
      <ul>
        {otherWork.map((work) => (
          <li key={work.title} data-reveal className="grid gap-1 border-t border-line py-5 sm:grid-cols-3 sm:gap-6">
            <div>
              <h3 className="font-medium">{work.title}</h3>
              <p className="mt-0.5 text-xs text-muted">{work.context}</p>
            </div>
            <p className="text-sm leading-relaxed text-muted sm:col-span-2">
              {work.description}{" "}
              {work.link && (
                <a href={work.link.url} target="_blank" rel="noopener noreferrer" className="link inline-flex items-center gap-0.5 text-ink">
                  {work.link.label}
                  <ArrowUpRight size={13} aria-hidden="true" />
                </a>
              )}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export function ContactSection() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="stage blueprint">
      <div className="page py-24 md:py-40">
        <p data-reveal className="eyebrow">Stage PFE · Data Engineering ou AI Engineering</p>
        <h2 id="contact-title" data-reveal className="heading-xl mt-6 max-w-5xl">
          Vous cherchez un stagiaire PFE qui construit de bout en bout&nbsp;? Parlons-en.
        </h2>
        <div data-reveal className="mt-10 flex flex-wrap items-center gap-3">
          <a href={`mailto:${personalInfo.email}`} className="btn-primary">
            Écrire un email
            <ArrowRight size={15} aria-hidden="true" />
          </a>
          <CopyEmail email={personalInfo.email} />
        </div>
        <dl data-reveal className="mt-16 grid gap-6 border-t border-line pt-6 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <dt className="eyebrow">Email</dt>
            <dd className="mt-1.5 break-words text-sm">
              <a href={`mailto:${personalInfo.email}`} className="link">{personalInfo.email}</a>
            </dd>
          </div>
          <div>
            <dt className="eyebrow">LinkedIn</dt>
            <dd className="mt-1.5 break-words text-sm">
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="link">{personalInfo.linkedinLabel}</a>
            </dd>
          </div>
          <div>
            <dt className="eyebrow">GitHub</dt>
            <dd className="mt-1.5 break-words text-sm">
              <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="link">{personalInfo.githubLabel}</a>
            </dd>
          </div>
          <div>
            <dt className="eyebrow">Localisation</dt>
            <dd className="mt-1.5 text-sm">{personalInfo.location}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
