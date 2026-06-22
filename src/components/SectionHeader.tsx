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
      <p className="text-xs font-bold tracking-widest uppercase text-stone-500 dark:text-indigo-400 mb-2">
        {subtitle}
      </p>
      <h2 className="text-3xl font-bold text-text-primary dark:text-text-primary-dark">
        {title}{" "}
        <span className="text-stone-900 dark:bg-gradient-to-r dark:from-indigo-400 dark:to-purple-400 dark:bg-clip-text dark:text-transparent">
          {highlightedTitle}
        </span>
      </h2>
    </motion.div>
  );
}
