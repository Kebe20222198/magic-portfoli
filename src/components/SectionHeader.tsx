"use client";

import { motion } from "framer-motion";
import { sectionViewProps } from "@/lib/motion";

interface SectionHeaderProps {
  subtitle: string;
  title: string;
  highlightedTitle: string;
  className?: string;
}

export default function SectionHeader({
  subtitle,
  title,
  highlightedTitle,
  className,
}: SectionHeaderProps) {
  return (
    <motion.div {...sectionViewProps} className={className ?? "mb-14"}>
      <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-stone-500 dark:text-indigo-300 mb-3">
        {subtitle}
      </p>
      <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-text-primary dark:text-text-primary-dark">
        {title}{" "}
        <span className="text-indigo-700 dark:text-indigo-300">
          {highlightedTitle}
        </span>
      </h2>
    </motion.div>
  );
}
