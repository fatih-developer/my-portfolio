import { render, screen } from '@testing-library/react';
import AboutPage from '@/app/about/page';
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

describe('AboutPage', () => {
  it('renders personal information correctly', () => {
    render(<AboutPage />);
    
    expect(screen.getByText(aboutData.personal.name)).toBeInTheDocument();
    expect(screen.getByText(aboutData.personal.title)).toBeInTheDocument();
    expect(screen.getByText(aboutData.personal.location)).toBeInTheDocument();
    expect(screen.getByText(aboutData.personal.bio)).toBeInTheDocument();
  });

  it('renders skills sections correctly', () => {
    render(<AboutPage />);
    
    aboutData.skills.forEach(skillCategory => {
      expect(screen.getByText(skillCategory.title)).toBeInTheDocument();
    });
  });

  it('renders experience information correctly', () => {
    render(<AboutPage />);
    
    expect(screen.getByText(aboutData.experience.current.title)).toBeInTheDocument();
    expect(screen.getByText(aboutData.experience.current.company)).toBeInTheDocument();
    
    aboutData.experience.highlights.forEach(highlight => {
      expect(screen.getByText(highlight)).toBeInTheDocument();
    });
  });

  it('renders personal insights correctly', () => {
    render(<AboutPage />);
    
    aboutData.personalDetails.interests.forEach(interest => {
      expect(screen.getByText(interest)).toBeInTheDocument();
    });
    
    aboutData.personalDetails.goals.forEach(goal => {
      expect(screen.getByText(goal)).toBeInTheDocument();
    });
    
    expect(screen.getByText(aboutData.personalDetails.motivation)).toBeInTheDocument();
  });
});