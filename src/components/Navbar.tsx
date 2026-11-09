"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Menu, Moon, Sun, X } from "lucide-react";
import { ScrollProgress } from "@/components/Motion";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "À propos", id: "about" },
  { name: "Projets", id: "projects" },
  { name: "Expériences", id: "experience" },
  { name: "Compétences", id: "skills" },
  { name: "Contact", id: "contact" },
];

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="h-11 w-11" aria-hidden="true" />;

  const isDark = resolvedTheme === "dark";
  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="flex h-11 w-11 items-center justify-center text-muted transition-colors hover:text-ink"
      aria-label={isDark ? "Activer le thème clair" : "Activer le thème sombre"}
    >
      {isDark ? <Sun size={16} aria-hidden="true" /> : <Moon size={16} aria-hidden="true" />}
    </button>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  useEffect(() => {
    if (pathname !== "/" || typeof IntersectionObserver === "undefined") {
      setActiveSection("");
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        }
      },
      { rootMargin: "-30% 0px -65% 0px" },
    );
    for (const { id } of navLinks) {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    }
    return () => observer.disconnect();
  }, [pathname]);

  const linkClass = (active: boolean) =>
    cn("transition-colors hover:text-ink", active ? "text-ink" : "text-muted");

  return (
    <header className="no-print sticky top-0 z-50 border-b border-line bg-canvas">
      <div className="page flex h-16 items-center justify-between">
        <Link href="/" className="text-sm font-medium tracking-tight">
          Mohamed Kebe
        </Link>

        <nav aria-label="Navigation principale" className="hidden items-center gap-7 text-sm md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              href={`/#${link.id}`}
              className={linkClass(activeSection === link.id)}
              aria-current={activeSection === link.id ? "location" : undefined}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/resume"
            className={linkClass(pathname === "/resume")}
            aria-current={pathname === "/resume" ? "page" : undefined}
          >
            CV
          </Link>
        </nav>

        <div className="-mr-3 flex items-center">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="flex h-11 w-11 items-center justify-center md:hidden"
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav id="mobile-menu" aria-label="Navigation mobile" className="border-t border-line md:hidden">
          <ul className="page py-2">
            {[...navLinks.map((link) => ({ name: link.name, href: `/#${link.id}` })), { name: "CV", href: "/resume" }].map(
              (link) => (
                <li key={link.href}>
                  <Link href={link.href} onClick={() => setMenuOpen(false)} className="block py-3 text-base">
                    {link.name}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>
      )}
      <ScrollProgress />
    </header>
  );
}
