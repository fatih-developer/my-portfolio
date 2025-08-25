import { render, screen } from '@testing-library/react';
import AboutPage from '@/app/about/page';
import { act } from 'react-dom/test-utils';

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

describe('AboutPage Responsive Design', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024, // Default to desktop
    });
  });

  it('renders correctly on desktop', async () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1200,
    });

    await act(async () => {
      render(<AboutPage />);
    });

    // Check that elements render correctly on desktop
    expect(screen.getByText('Fatih Ünal')).toBeInTheDocument();
  });

  it('renders correctly on mobile', async () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 320,
    });

    await act(async () => {
      render(<AboutPage />);
    });

    // Check that elements render correctly on mobile
    expect(screen.getByText('Fatih Ünal')).toBeInTheDocument();
  });

  it('renders correctly on tablet', async () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 768,
    });

    await act(async () => {
      render(<AboutPage />);
    });

    // Check that elements render correctly on tablet
    expect(screen.getByText('Fatih Ünal')).toBeInTheDocument();
  });
});