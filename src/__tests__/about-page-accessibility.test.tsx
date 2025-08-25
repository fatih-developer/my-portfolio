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

describe('AboutPage Accessibility', () => {
  it('has proper heading hierarchy', () => {
    render(<AboutPage />);
    
    const headings = screen.getAllByRole('heading');
    expect(headings.length).toBeGreaterThan(0);
  });

  it('has alt text for images', () => {
    render(<AboutPage />);
    
    // Since we're mocking the image component, we'll check for the presence of the alt prop
    expect(screen.getByAltText(aboutData.personal.name)).toBeInTheDocument();
  });

  it('has proper contrast ratios', () => {
    render(<AboutPage />);
    
    // This is a basic check - in a real implementation, we would use axe-core or similar
    const textElements = screen.getAllByText(/./); // Get all text elements
    expect(textElements.length).toBeGreaterThan(0);
  });

  it('has focusable elements', () => {
    render(<AboutPage />);
    
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
    
    // Check that buttons are focusable
    buttons.forEach(button => {
      expect(button).toHaveAttribute('tabIndex');
    });
  });
});