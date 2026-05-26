"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Moon, Sun, Menu, X } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navLinks = [
  { name: "À propos", href: "/#about" },
  { name: "Actualités", href: "/#news" },
  { name: "Projets", href: "/#projects" },
  { name: "Resume", href: "/resume" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection("");
      return;
    }
    const handleScroll = () => {
      const sections = ["about", "news", "projects"];
      let current = "";
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) current = section;
        }
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const ThemeToggle = () => {
    if (!mounted) return <div className="w-16 h-8" />;
    return (
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="flex items-center gap-1 p-1 rounded-full bg-gray-100/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-300 transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
        aria-label="Changer le thème"
      >
        <div className={cn("p-1.5 rounded-full transition-all duration-200", theme === "light" ? "bg-white shadow-sm" : "opacity-50")}>
          <Sun size={12} className={theme === "light" ? "text-amber-500" : "text-gray-400"} />
        </div>
        <div className={cn("p-1.5 rounded-full transition-all duration-200", theme === "dark" ? "bg-gray-700 shadow-sm" : "opacity-50")}>
          <Moon size={12} className={theme === "dark" ? "text-indigo-400" : "text-gray-400"} />
        </div>
      </button>
    );
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 no-print",
          isScrolled
            ? "bg-[#ffffff]/90 dark:bg-[#060b16]/85 backdrop-blur-xl border-b border-stone-200/60 dark:border-white/5 shadow-[0_1px_12px_rgba(0,0,0,0.06)] dark:shadow-none"
            : "bg-transparent py-2"
        )}
      >
        <div className="max-w-5xl mx-auto px-6 h-14 relative flex items-center justify-center">

          {/* Logo/Name left */}
          <div className="absolute left-6 hidden md:block">
            <Link
              href="/"
              className="text-sm font-bold tracking-tight text-stone-900 dark:text-indigo-400 hover:opacity-80 transition-opacity"
            >
              MK<span className="text-gray-300 dark:text-gray-600">.</span>
            </Link>
          </div>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isResume = link.href === "/resume";
              const isActive = isResume
                ? pathname === "/resume"
                : activeSection === link.href.split("#")[1];
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                    isActive
                      ? "text-stone-900 dark:text-indigo-400 bg-stone-100 dark:bg-indigo-900/30"
                      : "text-text-secondary dark:text-text-secondary-dark hover:text-text-primary dark:hover:text-white hover:bg-gray-50/80 dark:hover:bg-white/5"
                  )}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="active-nav"
                      className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-stone-900 dark:bg-indigo-400"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Theme Toggle (Desktop) */}
          <div className="absolute right-6 hidden md:block">
            <ThemeToggle />
          </div>

          {/* Mobile: Logo + Theme + Hamburger */}
          <div className="flex md:hidden w-full items-center justify-between">
            <Link href="/" className="text-sm font-bold text-stone-900 dark:text-indigo-400">
              MK.
            </Link>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2 rounded-xl text-text-primary dark:text-white hover:bg-gray-100/80 dark:hover:bg-white/10 transition-colors"
                aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-white/97 dark:bg-[#0b1120]/97 backdrop-blur-xl md:hidden no-print"
          >
            <nav className="flex flex-col items-center justify-center h-full gap-6">
              {navLinks.map((link, idx) => {
                const isResume = link.href === "/resume";
                const isActive = isResume
                  ? pathname === "/resume"
                  : activeSection === link.href.split("#")[1];
                return (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ delay: idx * 0.06 + 0.05, duration: 0.3 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "text-2xl font-semibold transition-colors",
                        isActive
                          ? "text-stone-900 dark:text-indigo-400"
                          : "text-text-secondary dark:text-text-secondary-dark hover:text-text-primary dark:hover:text-white"
                      )}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
