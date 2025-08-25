# Dark/Light Mode Toggle - Design Document

## Architecture Overview

### Theme System Architecture
```
ThemeSystem/
├── ThemeProvider/
│   ├── ThemeContext
│   ├── ThemeState
│   └── SystemPreferenceDetection
├── ThemeToggle/
│   ├── ToggleButton
│   ├── ThemeIcon
│   └── ToggleAnimation
├── ThemeConfiguration/
│   ├── LightTheme
│   ├── DarkTheme
│   └── ThemeVariables
└── ThemeUtils/
    ├── StoragePersistence
    ├── SystemDetection
    └── SSRSupport
```

## Component Interfaces

### ThemeProvider Component
```tsx
interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
  attribute?: string;
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean;
}

interface ThemeContextType {
  theme: Theme;
  systemTheme: Theme | undefined;
  setTheme: (theme: Theme) => void;
  themes: string[];
}

type Theme = 'light' | 'dark' | 'system';
```

### ThemeToggle Component
```tsx
interface ThemeToggleProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'button' | 'switch' | 'icon';
  showLabel?: boolean;
  position?: 'navbar' | 'floating' | 'inline';
}

interface ThemeToggleState {
  isTransitioning: boolean;
  currentTheme: Theme;
  systemTheme?: Theme;
}
```

### Theme Configuration
```tsx
interface ThemeConfig {
  name: string;
  colors: ThemeColors;
  components: ComponentThemes;
  animations: ThemeAnimations;
}

interface ThemeColors {
  // Base colors
  background: string;
  foreground: string;
  
  // Component colors
  card: string;
  'card-foreground': string;
  popover: string;
  'popover-foreground': string;
  
  // Semantic colors
  primary: string;
  'primary-foreground': string;
  secondary: string;
  'secondary-foreground': string;
  muted: string;
  'muted-foreground': string;
  accent: string;
  'accent-foreground': string;
  
  // State colors
  destructive: string;
  'destructive-foreground': string;
  
  // Interface colors
  border: string;
  input: string;
  ring: string;
  
  // Custom portfolio colors
  'hero-gradient-start': string;
  'hero-gradient-end': string;
  'skill-category-bg': string;
  'project-card-bg': string;
}

interface ComponentThemes {
  navbar: NavbarTheme;
  hero: HeroTheme;
  skills: SkillsTheme;
  projects: ProjectsTheme;
  footer: FooterTheme;
}
```

## Theme System Implementation

### CSS Custom Properties Strategy
```css
:root {
  /* Light theme (default) */
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --card: 0 0% 100%;
  --card-foreground: 222.2 84% 4.9%;
  --popover: 0 0% 100%;
  --popover-foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;
  --secondary: 210 40% 96%;
  --secondary-foreground: 222.2 47.4% 11.2%;
  --muted: 210 40% 96%;
  --muted-foreground: 215.4 16.3% 46.9%;
  --accent: 210 40% 96%;
  --accent-foreground: 222.2 47.4% 11.2%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 210 40% 98%;
  --border: 214.3 31.8% 91.4%;
  --input: 214.3 31.8% 91.4%;
  --ring: 222.2 47.4% 11.2%;
  --radius: 0.5rem;
}

.dark {
  /* Dark theme overrides */
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  --card: 222.2 47.4% 11.2%;
  --card-foreground: 210 40% 98%;
  --popover: 222.2 47.4% 11.2%;
  --popover-foreground: 210 40% 98%;
  --primary: 210 40% 98%;
  --primary-foreground: 222.2 47.4% 11.2%;
  --secondary: 217.2 32.6% 17.5%;
  --secondary-foreground: 210 40% 98%;
  --muted: 217.2 32.6% 17.5%;
  --muted-foreground: 215 20.2% 65.1%;
  --accent: 217.2 32.6% 17.5%;
  --accent-foreground: 210 40% 98%;
  --destructive: 0 62.8% 30.6%;
  --destructive-foreground: 210 40% 98%;
  --border: 217.2 32.6% 17.5%;
  --input: 217.2 32.6% 17.5%;
  --ring: 212.7 26.8% 83.9%;
}
```

### Tailwind CSS Configuration
```js
// tailwind.config.js
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, hsl(var(--hero-gradient-start)), hsl(var(--hero-gradient-end)))',
      },
      keyframes: {
        'theme-transition': {
          '0%': { opacity: '0.8' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'theme-transition': 'theme-transition 0.2s ease-in-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
```

## Theme Toggle Design Specifications

### Toggle Button Variants

#### Icon Button Style
```css
.theme-toggle {
  /* Base styles */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  border: 1px solid hsl(var(--border));
  background: hsl(var(--background));
  color: hsl(var(--foreground));
  
  /* Transitions */
  transition: all 0.2s ease-in-out;
  
  /* States */
  &:hover {
    background: hsl(var(--accent));
    border-color: hsl(var(--ring));
  }
  
  &:focus-visible {
    outline: 2px solid hsl(var(--ring));
    outline-offset: 2px;
  }
}

.theme-icon {
  width: 20px;
  height: 20px;
  transition: all 0.3s ease-in-out;
}

/* Icon animations */
.theme-icon.sun {
  transform: rotate(0deg) scale(1);
}

.dark .theme-icon.sun {
  transform: rotate(90deg) scale(0);
}

.theme-icon.moon {
  transform: rotate(90deg) scale(0);
}

.dark .theme-icon.moon {
  transform: rotate(0deg) scale(1);
}
```

#### Switch Style Toggle
```css
.theme-switch {
  position: relative;
  display: inline-flex;
  align-items: center;
  width: 48px;
  height: 24px;
  background: hsl(var(--muted));
  border-radius: 12px;
  border: 1px solid hsl(var(--border));
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.theme-switch-thumb {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 18px;
  height: 18px;
  background: hsl(var(--background));
  border-radius: 50%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;
}

.dark .theme-switch {
  background: hsl(var(--primary));
}

.dark .theme-switch-thumb {
  transform: translateX(22px);
}
```

### Toggle Positioning Options

#### Navbar Integration
```css
.navbar-theme-toggle {
  margin-left: auto;
  margin-right: 16px;
}

@media (max-width: 768px) {
  .navbar-theme-toggle {
    order: -1;
    margin-right: 8px;
    margin-left: 0;
  }
}
```

#### Floating Toggle
```css
.floating-theme-toggle {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 50;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

@media (max-width: 768px) {
  .floating-theme-toggle {
    bottom: 16px;
    right: 16px;
  }
}
```

## Component Theme Adaptations

### Navigation Bar Theming
```css
.navbar {
  background: hsl(var(--background) / 0.8);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid hsl(var(--border));
}

.navbar-link {
  color: hsl(var(--foreground));
  transition: color 0.2s ease-in-out;
}

.navbar-link:hover {
  color: hsl(var(--primary));
}

.navbar-brand {
  color: hsl(var(--foreground));
  font-weight: 600;
}
```

### Hero Section Theming
```css
.hero-section {
  background: linear-gradient(135deg, 
    hsl(var(--hero-gradient-start)), 
    hsl(var(--hero-gradient-end))
  );
}

.hero-title {
  color: hsl(var(--foreground));
}

.hero-subtitle {
  color: hsl(var(--muted-foreground));
}

.hero-cta-button {
  background: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
  border: 1px solid hsl(var(--border));
}
```

### Card Components Theming
```css
.card {
  background: hsl(var(--card));
  color: hsl(var(--card-foreground));
  border: 1px solid hsl(var(--border));
  box-shadow: 0 1px 3px hsl(var(--foreground) / 0.1);
}

.project-card:hover {
  border-color: hsl(var(--ring));
  box-shadow: 0 4px 12px hsl(var(--foreground) / 0.15);
}

.skill-card {
  background: hsl(var(--secondary));
  color: hsl(var(--secondary-foreground));
}
```

### Footer Theming
```css
.footer {
  background: hsl(var(--muted));
  border-top: 1px solid hsl(var(--border));
}

.footer-text {
  color: hsl(var(--muted-foreground));
}

.footer-link {
  color: hsl(var(--foreground));
  transition: color 0.2s ease-in-out;
}

.footer-link:hover {
  color: hsl(var(--primary));
}
```

## Animation & Transition System

### Theme Transition Animation
```css
* {
  transition: 
    background-color 0.2s ease-in-out,
    border-color 0.2s ease-in-out,
    color 0.2s ease-in-out,
    box-shadow 0.2s ease-in-out;
}

/* Disable transitions during theme change to prevent flicker */
.theme-transitioning * {
  transition: none !important;
}
```

### Icon Animation System
```tsx
const IconVariants = {
  sun: {
    initial: { rotate: 90, scale: 0, opacity: 0 },
    animate: { rotate: 0, scale: 1, opacity: 1 },
    exit: { rotate: -90, scale: 0, opacity: 0 }
  },
  moon: {
    initial: { rotate: -90, scale: 0, opacity: 0 },
    animate: { rotate: 0, scale: 1, opacity: 1 },
    exit: { rotate: 90, scale: 0, opacity: 0 }
  }
};

const ThemeIcon = ({ theme }: { theme: Theme }) => {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={theme}
        variants={IconVariants[theme === 'dark' ? 'moon' : 'sun']}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.2 }}
      >
        {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
      </motion.div>
    </AnimatePresence>
  );
};
```

## State Management Implementation

### Theme Context Provider
```tsx
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme = 'system',
  storageKey = 'portfolio-theme',
  attribute = 'class',
  enableSystem = true,
  disableTransitionOnChange = false,
}) => {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [systemTheme, setSystemTheme] = useState<Theme | undefined>();

  useEffect(() => {
    // System theme detection
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const updateSystemTheme = () => {
      setSystemTheme(mediaQuery.matches ? 'dark' : 'light');
    };

    updateSystemTheme();
    mediaQuery.addEventListener('change', updateSystemTheme);

    return () => mediaQuery.removeEventListener('change', updateSystemTheme);
  }, []);

  const setTheme = useCallback((newTheme: Theme) => {
    if (disableTransitionOnChange) {
      document.documentElement.classList.add('theme-transitioning');
      setTimeout(() => {
        document.documentElement.classList.remove('theme-transitioning');
      }, 0);
    }

    setThemeState(newTheme);
    localStorage.setItem(storageKey, newTheme);

    const resolvedTheme = newTheme === 'system' ? systemTheme : newTheme;
    
    if (attribute === 'class') {
      document.documentElement.classList.remove('light', 'dark');
      if (resolvedTheme) {
        document.documentElement.classList.add(resolvedTheme);
      }
    } else {
      document.documentElement.setAttribute(attribute, resolvedTheme || '');
    }
  }, [systemTheme, storageKey, attribute, disableTransitionOnChange]);

  const value: ThemeContextType = {
    theme,
    systemTheme,
    setTheme,
    themes: ['light', 'dark', ...(enableSystem ? ['system'] : [])]
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
```

### Theme Hook
```tsx
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
```

## Server-Side Rendering Support

### Hydration Mismatch Prevention
```tsx
export const ThemeScript = () => {
  const codeToRunOnClient = `
    (function() {
      try {
        var theme = localStorage.getItem('portfolio-theme') || 'system';
        var systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        var resolvedTheme = theme === 'system' ? systemTheme : theme;
        
        if (resolvedTheme === 'dark') {
          document.documentElement.classList.add('dark');
        }
      } catch (e) {}
    })()
  `;

  return <script dangerouslySetInnerHTML={{ __html: codeToRunOnClient }} />;
};

// In _document.tsx or layout
<Head>
  <ThemeScript />
</Head>
```

### SSR-Safe Theme Detection
```tsx
const useIsomorphicLayoutEffect = 
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export const useTheme = () => {
  const [mounted, setMounted] = useState(false);

  useIsomorphicLayoutEffect(() => {
    setMounted(true);
  }, []);

  // Return safe defaults during SSR
  if (!mounted) {
    return {
      theme: 'light',
      setTheme: () => {},
      systemTheme: undefined,
      themes: ['light', 'dark', 'system']
    };
  }

  // Return actual theme values after hydration
  return useThemeContext();
};
```

## Accessibility Implementation

### Screen Reader Announcements
```tsx
const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [announcement, setAnnouncement] = useState('');

  const handleThemeChange = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    setAnnouncement(`Theme changed to ${newTheme} mode`);
  };

  return (
    <>
      <button
        onClick={handleThemeChange}
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        aria-describedby="theme-announcement"
      >
        <ThemeIcon theme={theme} />
      </button>
      
      <div
        id="theme-announcement"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
    </>
  );
};
```

### Keyboard Navigation Support
```tsx
const ThemeToggle = () => {
  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleThemeChange();
    }
  };

  return (
    <button
      onKeyDown={handleKeyPress}
      className="focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-md"
    >
      {/* Toggle content */}
    </button>
  );
};
```

## Performance Optimizations

### Efficient Theme Switching
```tsx
const optimizeThemeTransition = () => {
  // Disable transitions during theme change
  const style = document.createElement('style');
  style.innerHTML = '* { transition: none !important; }';
  document.head.appendChild(style);

  // Re-enable transitions after next frame
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.head.removeChild(style);
    });
  });
};
```

### Lazy Theme Loading
```tsx
const ThemeProvider = dynamic(() => import('./ThemeProvider'), {
  ssr: false,
  loading: () => <div className="theme-loading" />
});
```

### Memoized Theme Context
```tsx
const ThemeProvider = ({ children, ...props }) => {
  const value = useMemo(
    () => ({ theme, setTheme, systemTheme, themes }),
    [theme, setTheme, systemTheme]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
```