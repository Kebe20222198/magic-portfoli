"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { projects } from "@/data/portfolio";
import { Github, Globe, Play, ExternalLink } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import { useState } from "react";

const getIcon = (label: string) => {
  const l = label.toLowerCase();
  if (l.includes("github")) return <Github size={13} />;
  if (l.includes("demo")) return <Play size={13} />;
  if (l.includes("website") || l.includes("site")) return <Globe size={13} />;
  return <ExternalLink size={13} />;
};

// Gradient per project index for visual variety
const cardAccents = [
  "from-indigo-500/20 to-purple-500/10",
  "from-blue-500/20 to-cyan-500/10",
  "from-emerald-500/20 to-teal-500/10",
  "from-orange-500/20 to-amber-500/10",
  "from-rose-500/20 to-pink-500/10",
  "from-purple-500/20 to-violet-500/10",
  "from-sky-500/20 to-blue-500/10",
  "from-lime-500/20 to-green-500/10",
];

const INITIAL_VISIBLE = 6;

export default function ProjectsSection() {
  const [showAll, setShowAll] = useState(false);
  const visibleProjects = showAll ? projects : projects.slice(0, INITIAL_VISIBLE);

  return (
    <section id="projects" className="py-24 relative z-10">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeader
          subtitle="Portfolio"
          title="Projets"
          highlightedTitle="sélectionnés"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleProjects.map((project, idx) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: (idx % 3) * 0.1 }}
              className="group flex flex-col bg-white dark:bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-stone-200/80 dark:border-white/10 shadow-[0_2px_12px_rgba(0,0,0,0.04)] dark:shadow-none hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:hover:shadow-xl dark:hover:shadow-indigo-900/20 transition-all duration-300 hover:-translate-y-1.5"
            >
              {/* Cover Image */}
              <div className="relative w-full aspect-[16/9] overflow-hidden">
                <Image
                  src={project.coverImage}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Overlay gradient */}
                <div className={`hidden dark:block absolute inset-0 bg-gradient-to-br opacity-80 ${cardAccents[idx % cardAccents.length]}`} />
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-base font-bold mb-2.5 text-text-primary dark:text-text-primary-dark leading-snug group-hover:text-stone-900 dark:group-hover:text-indigo-400 transition-colors">
                  {project.title}
                </h3>

                {/* Badges */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {project.badges.map((badge) => (
                    <span
                      key={badge}
                  className="px-2 py-0.5 rounded-full bg-stone-100 dark:bg-indigo-900/30 border border-stone-200 dark:border-indigo-800/50 text-[10px] font-semibold text-stone-600 dark:text-indigo-300 uppercase tracking-wide"
                    >
                      {badge}
                    </span>
                  ))}
                </div>

                <p className="text-text-secondary dark:text-text-secondary-dark text-xs leading-relaxed mb-5 line-clamp-3 flex-1">
                  {project.description}
                </p>

                {/* Links */}
                <div className="flex flex-wrap gap-2 pt-3 border-t border-stone-100 dark:border-white/5 mt-auto">
                  {project.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 text-[11px] font-semibold text-stone-700 dark:text-indigo-400 bg-stone-100 dark:bg-indigo-900/30 hover:bg-stone-900 hover:text-white dark:hover:bg-indigo-600 dark:hover:text-white px-3 py-1.5 rounded-lg transition-all duration-200"
                    >
                      {getIcon(link.label)}
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {projects.length > INITIAL_VISIBLE && !showAll && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-10 flex justify-center"
          >
            <button
              onClick={() => setShowAll(true)}
              className="px-6 py-3 rounded-xl border border-stone-300 dark:border-indigo-700/50 text-stone-900 dark:text-indigo-400 font-semibold text-sm hover:bg-stone-900 hover:text-white dark:hover:bg-indigo-600 dark:hover:text-white transition-all duration-200 hover:shadow-lg hover:shadow-stone-900/10"
            >
              Voir tous les projets ({projects.length})
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
