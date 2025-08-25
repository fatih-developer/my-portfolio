import { AboutData, aboutData } from '@/lib/data/about-data';
import { HeroSection } from '@/components/about/hero-section';
import { SkillsSection } from '@/components/about/skills-section';
import { ExperienceSection } from '@/components/about/experience-section';
import { PersonalSection } from '@/components/about/personal-section';
import './about.css';
import { metadata } from './metadata';

export { metadata };

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <HeroSection data={aboutData.personal} />
        <SkillsSection skills={aboutData.skills} />
        <ExperienceSection experience={aboutData.experience} />
        <PersonalSection personal={aboutData.personal} />
      </div>
    </div>
  );
}