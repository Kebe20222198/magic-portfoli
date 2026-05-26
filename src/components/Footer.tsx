"use client";

import { personalInfo } from "@/data/portfolio";
import { motion } from "framer-motion";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      className="mt-20 relative z-10 no-print"
    >
      {/* Gradient top border */}
      <div className="h-px bg-gradient-to-r from-transparent via-stone-200 dark:via-indigo-700/40 to-transparent" />

      <div className="py-8 text-sm text-text-secondary dark:text-text-secondary-dark">
        <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Left: name + social */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <div className="flex items-center gap-3">
              {personalInfo.socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 flex items-center justify-center rounded-lg bg-stone-100 dark:bg-indigo-900/30 text-stone-600 dark:text-indigo-400 hover:bg-stone-900 hover:text-white dark:hover:bg-indigo-600 dark:hover:text-white transition-all duration-200"
                    aria-label={link.name}
                  >
                    <Icon size={14} />
                  </a>
                );
              })}
            </div>
            <p className="text-xs">
              © {year}{" "}
              <span className="font-semibold text-text-primary dark:text-text-primary-dark">
                {personalInfo.name}
              </span>{" "}
              — Tous droits réservés
            </p>
          </div>

          {/* Right */}
          <div className="text-center md:text-right text-xs">
            <p className="text-gray-400 dark:text-gray-600">
              Conçu & développé avec{" "}
              <span className="text-rose-500">♥</span>{" "}
              avec{" "}
              <span className="font-medium text-text-secondary dark:text-text-secondary-dark">
                Next.js & Tailwind CSS
              </span>
            </p>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
