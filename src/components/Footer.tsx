"use client";

import { personalInfo } from "@/data/portfolio";
import { motion } from "framer-motion";
import SocialLinks from "@/components/SocialLinks";
import GradientDivider from "@/components/GradientDivider";

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
      <GradientDivider />

      <div className="py-8 text-sm text-text-secondary dark:text-text-secondary-dark">
        <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Left: name + social */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <div className="flex items-center gap-3">
              <SocialLinks variant="footer" />
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
