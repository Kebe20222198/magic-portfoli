"use client";

import { useEffect, useState, type SyntheticEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { personalInfo } from "@/data/portfolio";
import { ArrowRight, MapPin } from "lucide-react";

function handleImageError(e: SyntheticEvent<HTMLImageElement>) {
  const target = e.currentTarget;
  target.style.display = "none";
  console.warn(`[HeroSection] Failed to load profile image: ${target.src}`);
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const nameVariants = {
  hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const statusVariants = {
  hidden: { opacity: 0, x: -15 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const subtitleContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.5,
    },
  },
};

const subtitleItemVariants = {
  hidden: { opacity: 0, y: 12, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function HeroSection() {
  const [visibleCount, setVisibleCount] = useState(1);

  useEffect(() => {
    if (visibleCount < personalInfo.bio.length) {
      const timer = setTimeout(() => {
        setVisibleCount((prev) => prev + 1);
      }, 1600);
      return () => clearTimeout(timer);
    }
  }, [visibleCount]);

  return (
    <section
      id="about"
      className="pt-36 pb-24 md:pt-44 md:pb-32 flex items-center relative overflow-hidden"
    >
      {/* Decorative blobs */}
      <div className="hidden dark:block absolute -top-32 -right-32 w-96 h-96 rounded-full bg-indigo-600/10 blur-3xl pointer-events-none" />
      <div className="hidden dark:block absolute -bottom-16 -left-16 w-72 h-72 rounded-full bg-purple-600/10 blur-3xl pointer-events-none" />
      <div className="hidden dark:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-indigo-900/10 blur-[80px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-12"
        >
          {/* Top Row: Info (Left) + Photo (Right) */}
          <div className="flex flex-col-reverse md:flex-row gap-10 md:gap-14 items-start md:items-center justify-between w-full">
            {/* Info Column */}
            <div className="space-y-5 flex-1">
              <div className="space-y-3">
                <motion.p
                  variants={statusVariants}
                  className="text-xs font-bold tracking-[0.2em] uppercase text-stone-500 dark:text-indigo-400 mb-2 flex items-center gap-2.5"
                >
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  Élève-Ingénieur · INSEA Rabat
                </motion.p>
                <motion.h1
                  variants={nameVariants}
                  className="text-4xl md:text-5xl lg:text-6xl tracking-tight text-text-primary dark:text-text-primary-dark leading-tight"
                >
                  Mohamed{" "}
                  <span className="font-extrabold text-stone-900 dark:bg-gradient-to-r dark:from-indigo-400 dark:via-purple-400 dark:to-blue-400 dark:bg-clip-text dark:text-transparent">
                    Kebe
                  </span>
                </motion.h1>
              </div>

              <motion.p
                variants={subtitleContainerVariants}
                className="text-lg md:text-xl text-text-secondary dark:text-text-secondary-dark leading-relaxed flex flex-wrap items-center gap-x-2"
              >
                <motion.span variants={subtitleItemVariants}>
                  Data Engineering
                </motion.span>
                <motion.span
                  variants={subtitleItemVariants}
                  className="text-stone-400 dark:text-stone-600 font-normal"
                >
                  ·
                </motion.span>
                <motion.span variants={subtitleItemVariants}>
                  Architectures Distribuées
                </motion.span>
                <motion.span
                  variants={subtitleItemVariants}
                  className="text-stone-400 dark:text-stone-600 font-normal"
                >
                  ·
                </motion.span>
                <motion.span variants={subtitleItemVariants}>
                  Intelligence Artificielle
                </motion.span>
              </motion.p>

              {/* Location */}
              <motion.div
                variants={itemVariants}
                className="flex items-center gap-1.5 text-sm text-text-secondary dark:text-text-secondary-dark"
              >
                <MapPin
                  size={14}
                  className="text-emerald-500 dark:text-indigo-400"
                />
                <span>Rabat, Maroc</span>
              </motion.div>

              {/* Social Icons & Resume CTA */}
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap items-center gap-3 pt-1"
              >
                {personalInfo.socialLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      title={link.name}
                      className="flex items-center justify-center w-10 h-10 rounded-xl bg-stone-100 dark:bg-indigo-500/20 text-stone-700 dark:text-indigo-300 hover:bg-stone-900 hover:text-white dark:hover:bg-indigo-500 dark:hover:text-white transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
                      aria-label={link.name}
                    >
                      <Icon size={17} />
                    </a>
                  );
                })}

                <Link
                  href="/resume"
                  className="ml-1 flex items-center gap-2 px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white dark:bg-gradient-to-r dark:from-indigo-600 dark:to-purple-600 dark:hover:from-indigo-500 dark:hover:to-purple-500 dark:text-white font-semibold rounded-xl shadow-md hover:shadow-stone-900/10 dark:hover:shadow-indigo-500/30 transition-all duration-200 text-sm hover:-translate-y-0.5"
                >
                  Voir le Resume
                  <ArrowRight size={14} />
                </Link>
              </motion.div>
            </div>

            {/* Photo Column */}
            <motion.div
              variants={itemVariants}
              className="shrink-0 relative mx-auto md:mx-0"
            >
              <div className="relative w-40 h-40 md:w-52 md:h-52 rounded-full dark:rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.12)] dark:shadow-xl border-2 border-stone-200/60 dark:border-white/10">
                <Image
                  src={personalInfo.photoUrls[0]}
                  alt={personalInfo.name}
                  fill
                  className="object-cover"
                  priority
                  onError={handleImageError}
                />
              </div>
              {/* Floating status dot in light mode / badge in dark mode */}
              <div className="absolute bottom-1 right-1 md:bottom-2 md:right-2 w-5 h-5 rounded-full bg-emerald-500 border-4 border-white dark:border-[#0b1120] shadow-md dark:hidden" />
              <div className="hidden dark:block absolute -bottom-3 -right-3 bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg">
                Open to opportunities
              </div>
            </motion.div>
          </div>

          {/* Divider */}
          <motion.div
            variants={itemVariants}
            className="h-px bg-gradient-to-r from-transparent via-stone-200 dark:via-indigo-700/40 to-transparent"
          />

          {/* Progressive Monospace Bio Reveal */}
          <div className="text-text-secondary dark:text-text-secondary-dark text-[1.05rem] max-w-3xl border-l-2 border-stone-300 dark:border-stone-700 pl-4 py-1 space-y-3">
            <AnimatePresence>
              {personalInfo.bio.slice(0, visibleCount).map((line, idx) => (
                <motion.p
                  key={idx}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="leading-7 font-medium text-mono"
                >
                  {line}
                </motion.p>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
