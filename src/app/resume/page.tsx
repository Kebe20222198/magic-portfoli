"use client";

import { motion } from "framer-motion";
import { personalInfo, resumeData } from "@/data/portfolio";
import type { SkillItem } from "@/data/portfolio";
import GradientDivider from "@/components/GradientDivider";
import { fadeInViewProps } from "@/lib/motion";

/* ─── Section Divider ─────────────────────────────────────────── */
const SectionDivider = ({
  title,
  colorClass,
}: {
  title: string;
  colorClass: string;
}) => (
  <div className="flex items-center gap-6 my-14">
    <GradientDivider className="flex-1" />
    <h2
      className={`text-[11px] font-extrabold tracking-[0.25em] whitespace-nowrap uppercase ${colorClass}`}
    >
      {title}
    </h2>
    <GradientDivider className="flex-1" />
  </div>
);

/* ─── Skill Icon ──────────────────────────────────────────────── */
const SkillIcon = ({ item }: { item: SkillItem }) => {
  if (item.emoji)
    return <span className="text-lg leading-none">{item.emoji}</span>;
  if (item.lucideIcon) {
    const Icon = item.lucideIcon;
    return <Icon size={18} className="text-gray-500" />;
  }
  if (item.iconPath) {
    return (
      <svg
        role="img"
        viewBox="0 0 24 24"
        fill={`#${item.hex}`}
        xmlns="http://www.w3.org/2000/svg"
        className="w-[18px] h-[18px]"
      >
        <path d={item.iconPath} />
      </svg>
    );
  }
  return null;
};

/* ─── Resume Page ─────────────────────────────────────────────── */
export default function ResumePage() {
  return (
    <div className="pt-36 md:pt-44 pb-20 w-full relative z-10">
      <div className="max-w-3xl mx-auto px-6">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="text-xs font-bold tracking-widest uppercase text-indigo-500 dark:text-indigo-400 mb-3">
            Curriculum Vitæ
          </p>
          <h1 className="text-4xl md:text-5xl tracking-tight text-text-primary dark:text-text-primary-dark mb-3">
            {personalInfo.name.split(" ")[0]}{" "}
            <span className="font-extrabold text-stone-900 dark:bg-gradient-to-r dark:from-indigo-400 dark:via-purple-400 dark:to-blue-400 dark:bg-clip-text dark:text-transparent">
              {personalInfo.name.split(" ").slice(1).join(" ")}
            </span>
          </h1>

          <p className="text-lg md:text-xl mb-6 text-text-secondary dark:text-text-secondary-dark">
            <span className="font-semibold text-stone-900 dark:text-indigo-400">
              Data & IA Engineering
            </span>
            {" · "}
            <span>INSEA, Rabat</span>
          </p>

          <div className="space-y-3 text-text-secondary dark:text-text-secondary-dark leading-relaxed text-[15px] mb-8 text-mono">
            {personalInfo.bio.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {/* Contact Grid */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-2.5 text-sm">
            {personalInfo.contactGrid.map((c, i) => {
              const Icon = c.icon;
              const inner = (
                <span className="flex items-center gap-2.5 text-text-secondary dark:text-text-secondary-dark hover:text-accent dark:hover:text-blue-400 transition-colors">
                  <Icon size={14} className="shrink-0" />
                  <span>{c.text}</span>
                </span>
              );
              return c.url ? (
                <a key={i} href={c.url} target="_blank" rel="noreferrer">
                  {inner}
                </a>
              ) : (
                <div key={i}>{inner}</div>
              );
            })}
          </div>
        </motion.div>

        {/* ═══════════════════════════════════════════════════════
             EDUCATION (ÉTUDES)
           ═══════════════════════════════════════════════════════ */}
        <SectionDivider
          title="Études"
          colorClass="text-stone-900 dark:text-indigo-400"
        />

        <div className="space-y-8">
          {resumeData.education.map((edu, idx) => (
            <motion.div
              key={idx}
              {...fadeInViewProps}
              className="flex items-center justify-between gap-4 w-full"
            >
              <div className="flex items-center gap-4">
                {edu.logoUrl && (
                  <div className="relative w-12 h-12 rounded-full overflow-hidden bg-white flex items-center justify-center border border-stone-200/60 p-1 shrink-0">
                    <img
                      src={edu.logoUrl}
                      alt={`${edu.institution} logo`}
                      className="object-contain w-full h-full"
                    />
                  </div>
                )}
                <div>
                  <h3 className="text-[14px] sm:text-[15px] font-bold text-text-primary dark:text-text-primary-dark leading-snug">
                    {edu.institution}
                  </h3>
                  <p className="text-[12px] sm:text-[13px] text-stone-800 dark:text-stone-300 font-semibold mt-1">
                    {edu.degree}
                  </p>
                  {edu.description && (
                    <p className="text-[12px] text-text-secondary dark:text-text-secondary-dark mt-1 leading-relaxed">
                      {edu.description}
                    </p>
                  )}
                </div>
              </div>
              <span className="text-xs sm:text-sm text-text-secondary dark:text-text-secondary-dark font-medium whitespace-nowrap shrink-0">
                {edu.year}
              </span>
            </motion.div>
          ))}
        </div>

        {/* ═══════════════════════════════════════════════════════
             INDUSTRY EXPERIENCE
           ═══════════════════════════════════════════════════════ */}
        <SectionDivider
          title="Expériences & Projets"
          colorClass="text-stone-900 dark:text-rose-400"
        />

        <div className="space-y-12">
          {resumeData.experience.map((exp, idx) => (
            <motion.div
              key={idx}
              {...fadeInViewProps}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 mb-2">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-400 dark:text-gray-500 font-medium tabular-nums w-14 shrink-0">
                    {exp.year}
                  </span>
                  <div className="flex items-center gap-3">
                    {exp.logoUrl && (
                      <div className="relative w-8 h-8 rounded-lg overflow-hidden bg-white flex items-center justify-center border border-stone-200/60 p-1 shrink-0">
                        <img
                          src={exp.logoUrl}
                          alt={`${exp.company} logo`}
                          className="object-contain w-full h-full"
                        />
                      </div>
                    )}
                    <h3 className="text-base sm:text-lg font-semibold text-text-primary dark:text-text-primary-dark">
                      {exp.company}
                    </h3>
                  </div>
                </div>
                <span className="text-sm text-gray-400 italic pl-[72px] sm:pl-0">
                  {exp.location}
                </span>
              </div>
              <div className="pl-[72px]">
                <p className="text-stone-900 dark:text-rose-400 font-semibold">
                  {exp.role}
                </p>
                <p className="text-sm text-text-secondary dark:text-text-secondary-dark mt-1.5 leading-relaxed">
                  {exp.description}
                </p>
                {exp.bullets && exp.bullets.length > 0 && (
                  <ul className="list-disc list-outside ml-4 mt-3 space-y-2 text-sm text-text-secondary dark:text-text-secondary-dark">
                    {exp.bullets.map((b, i) => (
                      <li key={i} className="leading-relaxed">
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* ═══════════════════════════════════════════════════════
             TEACHING
           ═══════════════════════════════════════════════════════ */}
        <SectionDivider
          title="Vie Associative"
          colorClass="text-stone-900 dark:text-emerald-400"
        />

        <div className="space-y-12">
          {resumeData.teaching.map((t, idx) => (
            <motion.div
              key={idx}
              {...fadeInViewProps}
            >
              <div className="flex items-baseline justify-between gap-4 mb-1">
                <div className="flex items-baseline gap-4">
                  <span className="text-sm text-gray-400 dark:text-gray-500 font-medium tabular-nums w-14 shrink-0">
                    {t.year}
                  </span>
                  <h3 className="text-lg font-semibold text-text-primary dark:text-text-primary-dark">
                    {t.institution}
                  </h3>
                </div>
                <span className="text-sm text-gray-400 italic hidden sm:block">
                  {t.location}
                </span>
              </div>
              <div className="pl-[72px]">
                <p className="font-medium text-text-primary dark:text-text-primary-dark">
                  {t.role}
                </p>
                {t.course && (
                  <p className="text-sm text-text-secondary dark:text-text-secondary-dark mt-0.5">
                    {t.course}
                  </p>
                )}
                {t.courses && t.courses.length > 0 && (
                  <ul className="list-disc list-outside ml-4 mt-2 space-y-1 text-sm">
                    {t.courses.map((c, i) => (
                      <li key={i}>
                        <span className="font-medium text-text-primary dark:text-text-primary-dark">
                          {c.name}
                        </span>
                        <span className="text-gray-400"> ({c.semester})</span>
                      </li>
                    ))}
                  </ul>
                )}
                {t.description && (
                  <p className="text-sm text-text-secondary dark:text-text-secondary-dark mt-2 leading-relaxed">
                    {t.description}
                  </p>
                )}
                {t.score && (
                  <p className="mt-2.5 text-sm text-text-primary dark:text-text-primary-dark flex items-start gap-2">
                    <span>🏆</span> <span>{t.score}</span>
                  </p>
                )}
                {t.award && (
                  <p className="mt-2.5 text-sm text-text-primary dark:text-text-primary-dark flex items-start gap-2">
                    <span>🏆</span> <span>{t.award}</span>
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* ═══════════════════════════════════════════════════════
             PUBLICATIONS
           ═══════════════════════════════════════════════════════ */}
        <SectionDivider
          title="Publications & Travaux"
          colorClass="text-stone-900 dark:text-purple-400"
        />

        {resumeData.publications.length === 0 && (
          <p className="text-sm text-text-secondary dark:text-text-secondary-dark italic text-center py-4">
            Publications à venir.
          </p>
        )}

        <div className="space-y-12">
          {resumeData.publications.map((pub, idx) => (
            <motion.div
              key={idx}
              {...fadeInViewProps}
            >
              <div className="flex items-baseline justify-between gap-4 mb-1">
                <div className="flex items-baseline gap-4">
                  <span className="text-sm text-gray-400 dark:text-gray-500 font-medium tabular-nums w-14 shrink-0">
                    {pub.year}
                  </span>
                  <h3 className="text-lg font-semibold text-text-primary dark:text-text-primary-dark leading-snug">
                    {pub.title}
                  </h3>
                </div>
                <span className="text-xs text-gray-400 italic hidden sm:block shrink-0 max-w-[200px] text-right">
                  {pub.conference}
                </span>
              </div>
              <div className="pl-[72px]">
                <p className="text-sm text-accent dark:text-blue-400 font-medium">
                  {pub.authors}
                </p>
                <p className="text-sm text-text-secondary dark:text-text-secondary-dark mt-1.5 leading-relaxed">
                  {pub.description}
                </p>

                {pub.links.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {pub.links.map((l, i) => (
                      <a
                        key={i}
                        href={l.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium border border-gray-300 dark:border-gray-700 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-text-secondary dark:text-text-secondary-dark transition-colors"
                      >
                        📄 {l.label}
                      </a>
                    ))}
                  </div>
                )}

                {pub.awards && pub.awards.length > 0 && (
                  <div className="mt-3 space-y-1">
                    {pub.awards.map((aw, i) => (
                      <p
                        key={i}
                        className="text-sm text-text-primary dark:text-text-primary-dark flex items-start gap-2"
                      >
                        <span>🏆</span> <span>{aw}</span>
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* ═══════════════════════════════════════════════════════
             SKILLS
           ═══════════════════════════════════════════════════════ */}
        <SectionDivider
          title="Compétences Techniques"
          colorClass="text-stone-900 dark:text-indigo-400"
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-x-6 gap-y-8">
          {resumeData.skills.map((cat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
            >
              <h3 className="font-semibold text-sm mb-4 text-text-primary dark:text-white">
                {cat.category}
              </h3>
              <ul className="space-y-3">
                {cat.items.map((item, j) => (
                  <li
                    key={j}
                    className="flex items-center gap-2.5 text-sm text-text-secondary dark:text-text-secondary-dark"
                  >
                    <div className="w-5 h-5 flex items-center justify-center shrink-0">
                      <SkillIcon item={item} />
                    </div>
                    <span>{item.name}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
