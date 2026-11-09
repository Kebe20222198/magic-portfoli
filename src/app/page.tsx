import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";
import {
  AboutSection,
  ContactSection,
  EducationSection,
  ExperienceSection,
  FieldNotesSection,
  OtherWorkSection,
  SkillsSection,
} from "@/components/HomeSections";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ExperienceSection />
      <FieldNotesSection />
      <SkillsSection />
      <EducationSection />
      <OtherWorkSection />
      <ContactSection />
    </>
  );
}
