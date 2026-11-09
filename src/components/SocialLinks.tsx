import { personalInfo } from "@/data/portfolio";

const links = [
  { label: "GitHub", href: personalInfo.github, external: true },
  { label: "LinkedIn", href: personalInfo.linkedin, external: true },
  { label: "Email", href: `mailto:${personalInfo.email}`, external: false },
];

export default function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex flex-wrap items-center gap-x-5 gap-y-2 text-sm ${className}`}>
      {links.map((link) => (
        <li key={link.label}>
          <a
            href={link.href}
            className="link"
            {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  );
}
