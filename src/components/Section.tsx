import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  id: string;
  index: string;
  title: string;
  stage?: boolean;
  children: ReactNode;
}

/** Homepage section with an editorial heading. `stage` flips it to the dark palette. */
export default function Section({ id, index, title, stage, children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={cn(stage ? "stage" : "border-t border-line")}>
      <div className="page py-20 max-sm:text-center md:py-32">
        <header data-reveal className="mb-12 flex items-start gap-4 max-sm:flex-col max-sm:items-center max-sm:gap-2 md:mb-20">
          <span className="eyebrow mt-3 max-sm:mt-0 md:mt-5" aria-hidden="true">{index}</span>
          <h2 id={`${id}-title`} className="heading-xl">{title}</h2>
        </header>
        {children}
      </div>
    </section>
  );
}
