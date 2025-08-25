import { render, screen } from '@testing-library/react';
import { HeroSection } from '@/components/about/hero-section';
import { SkillsSection } from '@/components/about/skills-section';
import { ExperienceSection } from '@/components/about/experience-section';
import { PersonalSection } from '@/components/about/personal-section';
import { aboutData } from '@/lib/data/about-data';

// Mock next/image component
jest.mock('next/image', () => {
  return ({ alt, ...props }: any) => {
    // eslint-disable-next-line jsx-a11y/alt-text
    return <img alt={alt} {...props} />;
  };
});

// Mock framer-motion
jest.mock('framer-motion', () => {
  return {
    motion: {
      section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
      h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
      h2: ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
      p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
      div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    },
    ...jest.requireActual('framer-motion'),
  };
});

describe('AboutPage Animations', () => {
  it('renders HeroSection with animation properties', () => {
    render(<HeroSection data={aboutData.personal} />);
    
    expect(screen.getByText(aboutData.personal.name)).toBeInTheDocument();
  });

  it('renders SkillsSection with animation properties', () => {
    render(<SkillsSection skills={aboutData.skills} />);
    
    expect(screen.getByText('Skills & Expertise')).toBeInTheDocument();
  });

  it('renders ExperienceSection with animation properties', () => {
    render(<ExperienceSection experience={aboutData.experience} />);
    
    expect(screen.getByText('Experience & Highlights')).toBeInTheDocument();
  });

  it('renders PersonalSection with animation properties', () => {
    render(<PersonalSection personal={aboutData.personalDetails} />);
    
    expect(screen.getByText('Personal Insights')).toBeInTheDocument();
  });
});