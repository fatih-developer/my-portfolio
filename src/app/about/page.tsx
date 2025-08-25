import { AboutData, aboutData } from '@/lib/data/about-data';
import { HeroSection } from '@/components/about/hero-section';
import { SkillsSection } from '@/components/about/skills-section';
import { ExperienceSection } from '@/components/about/experience-section';
import { PersonalSection } from '@/components/about/personal-section';
import './about.css';
import { metadata } from './metadata';
import { personSchema } from '@/lib/data/person-schema';
import Script from 'next/script';

export { metadata };

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Script
        id="person-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personSchema),
        }}
      />
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <HeroSection data={aboutData.personal} />
        <SkillsSection skills={aboutData.skills} />
        <ExperienceSection experience={aboutData.experience} />
        <PersonalSection personal={aboutData.personal} />
      </div>
    </div>
  );
}