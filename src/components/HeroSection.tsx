import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { Download } from "lucide-react";
import { personalInfo } from "@/data/portfolio";
import PipelineCanvas from "@/components/PipelineCanvas";
import SocialLinks from "@/components/SocialLinks";

const fade = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

export default function HeroSection() {
  const letters = Array.from(personalInfo.name);

  return (
    <section aria-labelledby="hero-title" className="blueprint max-sm:text-center">
      <div className="page pt-8 md:pt-12">
        <ul className="fade-up flex flex-wrap gap-x-8 gap-y-1 font-mono text-xs text-muted max-sm:justify-center" style={fade(100)}>
          <li className="flex items-center gap-2 text-ink">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
            {personalInfo.seeking}
          </li>
          <li>{personalInfo.school}</li>
          <li>{personalInfo.location}</li>
        </ul>

        <h1
          id="hero-title"
          aria-label={personalInfo.name}
          className="mt-6 overflow-hidden whitespace-nowrap pb-[0.08em] font-display font-normal leading-[0.95] tracking-[-0.02em] md:mt-8"
          style={{ fontSize: "min(17.2vw, 13.4rem)" }}
        >
          {letters.map((letter, index) => (
            <span key={index} aria-hidden="true" className="rise" style={{ "--i": index } as CSSProperties}>
              {letter === " " ? " " : letter}
            </span>
          ))}
        </h1>

        <p className="fade-up mt-3 text-lg font-medium tracking-tight sm:text-2xl" style={fade(550)}>
          {personalInfo.headline} <span className="font-normal text-muted">|</span>{" "}
          <span className="sm:whitespace-nowrap">{personalInfo.affiliation}</span>
        </p>
      </div>

      <div className="mt-8 md:mt-10">
        <PipelineCanvas />
      </div>

      <div className="page grid gap-8 pb-14 pt-10 md:pb-20 lg:grid-cols-12 lg:items-end lg:gap-10">
        <p className="fade-up max-w-prose text-base leading-relaxed text-muted sm:text-lg lg:col-span-6" style={fade(850)}>
          {personalInfo.pitch}
        </p>
        <div className="fade-up lg:col-span-4" style={fade(1000)}>
          <div className="flex flex-wrap gap-3 max-sm:justify-center">
            <Link href={personalInfo.cvPage} className="btn-primary">Consulter le CV</Link>
            <a href={personalInfo.cvFile} download className="btn-secondary">
              <Download size={15} aria-hidden="true" />
              Télécharger le PDF
            </a>
          </div>
          <SocialLinks className="mt-5 max-sm:justify-center" />
        </div>
        <div className="fade-up -order-1 lg:order-none lg:col-span-2 lg:flex lg:justify-end" style={fade(1100)}>
          <Image
            src={personalInfo.portrait}
            alt={`Portrait de ${personalInfo.name}`}
            width={430}
            height={430}
            priority
            sizes="128px"
            className="portrait h-24 w-24 rounded-[3px] object-cover max-sm:mx-auto lg:h-32 lg:w-32"
          />
        </div>
      </div>
    </section>
  );
}
