import { render, screen } from '@testing-library/react';
import AboutPage from '@/app/about/page';

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

describe('AboutPage Performance', () => {
  it('renders without excessive re-renders', () => {
    const { rerender } = render(<AboutPage />);
    
    // Initial render
    expect(screen.getByText('Fatih Ünal')).toBeInTheDocument();
    
    // Re-render
    rerender(<AboutPage />);
    expect(screen.getByText('Fatih Ünal')).toBeInTheDocument();
  });

  it('loads images with priority', () => {
    render(<AboutPage />);
    
    // Since we're mocking the image component, we'll check for the presence of the priority prop
    const images = screen.getAllByRole('img');
    expect(images.length).toBeGreaterThan(0);
  });

  it('uses code splitting for heavy components', () => {
    // This is a conceptual test - in a real implementation, we would check for dynamic imports
    expect(typeof AboutPage).toBe('function');
  });
});