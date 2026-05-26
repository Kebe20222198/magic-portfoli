"use client";

import { motion } from "framer-motion";
import { news } from "@/data/portfolio";
import { useState } from "react";
import { ChevronDown, ExternalLink } from "lucide-react";

const statusConfig = {
  upcoming: {
    label: "En cours",
    className: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300 border border-amber-200 dark:border-amber-700/50",
    dot: "bg-amber-500",
  },
  published: {
    label: "Publié",
    className: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700/50",
    dot: "bg-emerald-500",
  },
  award: {
    label: "Prix",
    className: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300 border border-purple-200 dark:border-purple-700/50",
    dot: "bg-purple-500",
  },
};

export default function NewsSection() {
  const [expanded, setExpanded] = useState(false);
  const visibleNews = expanded ? news : news.slice(0, 5);

  return (
    <section id="news" className="py-24 relative z-10">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-14"
        >
          <p className="text-xs font-bold tracking-widest uppercase text-stone-500 dark:text-indigo-400 mb-2">
            Actualités
          </p>
          <h2 className="text-3xl font-bold text-text-primary dark:text-text-primary-dark">
            Dernières{" "}
            <span className="text-stone-900 dark:bg-gradient-to-r dark:from-indigo-400 dark:to-purple-400 dark:bg-clip-text dark:text-transparent">
              nouvelles
            </span>
          </h2>
        </motion.div>

        <div className="relative space-y-0">
          {/* Vertical Timeline Line */}
          <div className="absolute left-[68px] md:left-[80px] top-4 bottom-4 w-px bg-gradient-to-b from-stone-200 via-stone-200/50 dark:from-indigo-700/80 dark:via-purple-800/50 to-transparent" />

          {visibleNews.map((item, idx) => {
            const parts = item.date.split(" ");
            const month = parts.length > 1 ? parts[0] : "";
            const year = parts.length > 1 ? parts[1] : parts[0];
            const cfg = item.status ? statusConfig[item.status] : null;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: idx * 0.06 }}
                className="relative flex items-start gap-4 md:gap-6 py-5 group"
              >
                {/* Date Column */}
                <div className="w-[58px] md:w-[70px] shrink-0 text-right pt-0.5">
                  <div className="text-sm font-bold text-text-primary dark:text-text-primary-dark tabular-nums leading-none">
                    {year}
                  </div>
                  {month && (
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-stone-500 dark:text-indigo-400 mt-1">
                      {month}
                    </div>
                  )}
                </div>

                {/* Bullet */}
                <div className="relative z-10 mt-1.5 shrink-0">
                  <div
                    className={`w-3 h-3 rounded-full ring-4 ring-slate-50 dark:ring-[#0b1120] transition-transform duration-200 group-hover:scale-125 ${
                      cfg ? cfg.dot : "bg-gray-400 dark:bg-gray-600"
                    }`}
                  />
                </div>

                {/* Text Column */}
                <div className="flex-1 pt-0.5 min-w-0">
                  <div className="flex flex-wrap items-start gap-2 mb-1.5">
                    {cfg && (
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${cfg.className}`}>
                        {cfg.label}
                      </span>
                    )}
                  </div>
                  <p className="text-text-secondary dark:text-text-secondary-dark leading-relaxed text-sm">
                    {item.description}
                    {item.link && item.link !== "#" && (
                      <a
                        href={item.link}
                        className="inline-flex items-center gap-1 ml-2 text-stone-900 dark:text-indigo-400 hover:underline underline-offset-4 font-medium"
                      >
                        Voir <ExternalLink size={11} />
                      </a>
                    )}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {news.length > 5 && !expanded && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-4 flex pl-[86px] md:pl-[100px]"
          >
            <button
              onClick={() => setExpanded(true)}
              className="flex items-center gap-1.5 text-sm font-medium text-stone-900 dark:text-indigo-400 hover:text-stone-700 dark:hover:text-indigo-300 transition-colors"
              aria-label="Voir toutes les actualités"
            >
              Voir tout <ChevronDown size={15} />
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
