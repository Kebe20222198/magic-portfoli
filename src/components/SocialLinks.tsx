"use client";

import { personalInfo } from "@/data/portfolio";
import { cn } from "@/lib/utils";

type SocialLinksVariant = "hero" | "footer";

interface SocialLinksProps {
  variant?: SocialLinksVariant;
}

const variantStyles: Record<SocialLinksVariant, { wrapper: string; icon: string; size: number }> = {
  hero: {
    wrapper:
      "flex items-center justify-center w-10 h-10 rounded-xl bg-stone-100 dark:bg-indigo-500/20 text-stone-700 dark:text-indigo-300 hover:bg-stone-900 hover:text-white dark:hover:bg-indigo-500 dark:hover:text-white transition-all duration-200 hover:shadow-md hover:-translate-y-0.5",
    icon: "",
    size: 17,
  },
  footer: {
    wrapper:
      "w-8 h-8 flex items-center justify-center rounded-lg bg-stone-100 dark:bg-indigo-900/30 text-stone-600 dark:text-indigo-400 hover:bg-stone-900 hover:text-white dark:hover:bg-indigo-600 dark:hover:text-white transition-all duration-200",
    icon: "",
    size: 14,
  },
};

export default function SocialLinks({ variant = "hero" }: SocialLinksProps) {
  const styles = variantStyles[variant];

  return (
    <>
      {personalInfo.socialLinks.map((link) => {
        const Icon = link.icon;
        return (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noreferrer"
            title={variant === "hero" ? link.name : undefined}
            className={cn(styles.wrapper)}
            aria-label={link.name}
          >
            <Icon size={styles.size} />
          </a>
        );
      })}
    </>
  );
}
