import { personalInfo } from "@/data/portfolio";
import SocialLinks from "@/components/SocialLinks";

export default function Footer() {
  return (
    <footer className="no-print border-t border-line">
      <div className="page flex flex-col gap-4 py-8 text-sm text-muted max-sm:items-center max-sm:text-center sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {personalInfo.name}
        </p>
        <SocialLinks />
      </div>
    </footer>
  );
}
