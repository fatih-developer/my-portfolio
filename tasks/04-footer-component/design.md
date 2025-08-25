# Footer Component - Design Document

## Component Architecture

### Component Structure
```
Footer/
├── FooterContainer
├── FooterContent/
│   ├── FooterBrand/
│   │   ├── Logo (optional)
│   │   ├── Name
│   │   └── Tagline
│   ├── FooterNavigation/
│   │   ├── NavLink[]
│   │   └── ActiveIndicator
│   ├── FooterSocial/
│   │   ├── SocialLink[]
│   │   └── SocialIcon[]
│   └── FooterInfo/
│       ├── Copyright
│       ├── TechStack (optional)
│       └── LastUpdated (optional)
└── FooterSeparator
```

### Component Interfaces

#### Footer Component
```tsx
interface FooterProps {
  className?: string;
  showTechStack?: boolean;
  showLastUpdated?: boolean;
  currentPath?: string;
}

interface FooterData {
  brand: {
    name: string;
    tagline: string;
    logo?: string;
  };
  navigation: NavigationLink[];
  social: SocialLink[];
  info: {
    copyright: string;
    techStack?: TechStackItem[];
    lastUpdated?: string;
    repositoryUrl?: string;
  };
}
```

#### NavigationLink Component
```tsx
interface NavigationLinkProps {
  href: string;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

interface NavigationLink {
  href: string;
  label: string;
  external?: boolean;
}
```

#### SocialLink Component
```tsx
interface SocialLinkProps {
  platform: SocialPlatform;
  url: string;
  username?: string;
  ariaLabel?: string;
}

interface SocialPlatform {
  name: string;
  icon: React.ComponentType;
  color: string;
  hoverColor: string;
}

interface SocialLink {
  platform: string;
  url: string;
  username: string;
  verified?: boolean;
}
```

#### TechStack Component
```tsx
interface TechStackProps {
  items: TechStackItem[];
  compact?: boolean;
}

interface TechStackItem {
  name: string;
  url?: string;
  icon?: React.ComponentType;
}
```

## Data Models

### Footer Configuration
```tsx
const footerData: FooterData = {
  brand: {
    name: "Fatih Ünal",
    tagline: "Software Developer & Problem Solver"
  },
  navigation: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/contact", label: "Contact" }
  ],
  social: [
    {
      platform: "linkedin",
      url: "https://linkedin.com/in/fatih-unal",
      username: "fatih-unal"
    },
    {
      platform: "github", 
      url: "https://github.com/fatih-unal",
      username: "fatih-unal"
    },
    {
      platform: "twitter",
      url: "https://twitter.com/fatih_unal",
      username: "fatih_unal"
    }
  ],
  info: {
    copyright: `© ${new Date().getFullYear()} Fatih Ünal. All rights reserved.`,
    techStack: [
      { name: "Next.js", url: "https://nextjs.org" },
      { name: "TypeScript", url: "https://typescriptlang.org" },
      { name: "Tailwind CSS", url: "https://tailwindcss.com" }
    ],
    repositoryUrl: "https://github.com/fatih-unal/portfolio"
  }
};
```

## UI/UX Design Specifications

### Layout & Structure
```css
.footer {
  /* Layout */
  padding: 48px 0 24px;
  border-top: 1px solid #e5e7eb;
  background: #f8fafc;
  
  /* Container */
  max-width: 1200px;
  margin: 0 auto;
  padding-left: 20px;
  padding-right: 20px;
}

.footer-content {
  display: grid;
  gap: 32px;
  text-align: center;
}

/* Desktop Layout */
@media (min-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr auto auto;
    text-align: left;
    align-items: center;
    gap: 48px;
  }
  
  .footer-social {
    justify-self: end;
  }
}
```

### Typography Hierarchy
```css
.footer-name {
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 4px;
}

.footer-tagline {
  font-size: 14px;
  color: #6b7280;
  margin-bottom: 16px;
}

.footer-nav-link {
  font-size: 14px;
  font-weight: 500;
  color: #4b5563;
  transition: color 0.2s ease;
}

.footer-nav-link:hover {
  color: #3b82f6;
}

.footer-copyright {
  font-size: 12px;
  color: #9ca3af;
  text-align: center;
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid #e5e7eb;
}
```

### Color System
```css
:root {
  /* Footer colors */
  --footer-bg: #f8fafc;
  --footer-border: #e5e7eb;
  --footer-text-primary: #1f2937;
  --footer-text-secondary: #6b7280;
  --footer-text-muted: #9ca3af;
  --footer-link: #4b5563;
  --footer-link-hover: #3b82f6;
  
  /* Social media colors */
  --linkedin: #0077b5;
  --linkedin-hover: #005885;
  --github: #333333;
  --github-hover: #24292e;
  --twitter: #1da1f2;
  --twitter-hover: #0d8bd9;
}
```

### Responsive Design

#### Mobile Layout (< 768px)
```css
.footer-mobile {
  text-align: center;
  padding: 32px 0;
}

.footer-sections {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.footer-navigation {
  display: flex;
  justify-content: center;
  gap: 24px;
  flex-wrap: wrap;
}

.footer-social {
  display: flex;
  justify-content: center;
  gap: 16px;
}
```

#### Tablet Layout (768px - 1024px)
```css
.footer-tablet {
  padding: 40px 0;
}

.footer-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  align-items: start;
}

.footer-brand {
  text-align: left;
}

.footer-nav-social {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: end;
}
```

#### Desktop Layout (> 1024px)
```css
.footer-desktop {
  padding: 48px 0 24px;
}

.footer-content {
  display: grid;
  grid-template-columns: 2fr 1fr auto;
  gap: 48px;
  align-items: center;
}

.footer-brand {
  text-align: left;
}

.footer-navigation {
  display: flex;
  gap: 32px;
  justify-content: center;
}

.footer-social {
  display: flex;
  gap: 16px;
}
```

## Component Styling

### Social Media Icons
```css
.social-icon {
  width: 20px;
  height: 20px;
  padding: 8px;
  border-radius: 6px;
  background: transparent;
  color: #6b7280;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.social-icon:hover {
  background: var(--platform-color);
  color: white;
  transform: translateY(-1px);
}

.social-icon.linkedin:hover {
  background: var(--linkedin);
}

.social-icon.github:hover {
  background: var(--github);
}

.social-icon.twitter:hover {
  background: var(--twitter);
}
```

### Navigation Links
```css
.footer-nav-link {
  position: relative;
  padding: 8px 0;
  text-decoration: none;
  transition: all 0.2s ease;
}

.footer-nav-link::after {
  content: '';
  position: absolute;
  width: 0;
  height: 1px;
  bottom: 4px;
  left: 0;
  background: #3b82f6;
  transition: width 0.2s ease;
}

.footer-nav-link:hover::after,
.footer-nav-link.active::after {
  width: 100%;
}
```

### Tech Stack Display
```css
.tech-stack {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #9ca3af;
  margin-top: 8px;
}

.tech-stack-item {
  color: #6b7280;
  text-decoration: none;
  transition: color 0.2s ease;
}

.tech-stack-item:hover {
  color: #3b82f6;
}

.tech-stack-separator {
  margin: 0 4px;
  color: #d1d5db;
}
```

## Animations & Interactions

### Hover Effects
```tsx
const socialIconVariants = {
  initial: { scale: 1, y: 0 },
  hover: { 
    scale: 1.1, 
    y: -2,
    transition: { duration: 0.2 }
  }
};

const navLinkVariants = {
  initial: { color: "#6b7280" },
  hover: { 
    color: "#3b82f6",
    transition: { duration: 0.2 }
  }
};
```

### Loading States
```tsx
const FooterSkeleton = () => (
  <footer className="border-t bg-gray-50">
    <div className="container mx-auto px-4 py-8">
      <div className="animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-48 mx-auto"></div>
        <div className="flex justify-center gap-4 mt-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="w-6 h-6 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    </div>
  </footer>
);
```

## Accessibility Features

### Screen Reader Support
```tsx
const Footer = () => (
  <footer role="contentinfo" aria-label="Site footer">
    <div className="container">
      <nav aria-label="Footer navigation">
        <ul role="list">
          {navigationLinks.map(link => (
            <li key={link.href}>
              <a href={link.href} aria-current={isActive ? 'page' : undefined}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      
      <div aria-label="Social media links">
        {socialLinks.map(social => (
          <a
            key={social.platform}
            href={social.url}
            aria-label={`Visit ${social.platform} profile`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <SocialIcon platform={social.platform} />
          </a>
        ))}
      </div>
    </div>
  </footer>
);
```

### Keyboard Navigation
```tsx
const FooterLink = ({ href, children, onClick }) => {
  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick ? onClick() : window.location.href = href;
    }
  };

  return (
    <a
      href={href}
      onKeyPress={handleKeyPress}
      className="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
    >
      {children}
    </a>
  );
};
```

## State Management

### Footer Context (Optional)
```tsx
interface FooterContextType {
  currentYear: number;
  lastUpdated: string;
  showTechStack: boolean;
  socialLinks: SocialLink[];
}

const FooterContext = createContext<FooterContextType | null>(null);

export const useFooter = () => {
  const context = useContext(FooterContext);
  if (!context) {
    throw new Error('useFooter must be used within FooterProvider');
  }
  return context;
};
```

### Dynamic Updates
```tsx
const useDynamicFooter = () => {
  const [currentYear] = useState(() => new Date().getFullYear());
  const [lastUpdated] = useState(() => {
    // Could be from build time or API
    return new Date().toISOString();
  });

  return { currentYear, lastUpdated };
};
```

## Performance Optimizations

### Code Splitting
```tsx
// Lazy load non-critical footer components
const TechStackDisplay = lazy(() => import('./TechStackDisplay'));
const LastUpdated = lazy(() => import('./LastUpdated'));

const Footer = () => (
  <footer>
    <FooterCore />
    <Suspense fallback={<div className="h-4" />}>
      <TechStackDisplay />
    </Suspense>
  </footer>
);
```

### Icon Optimization
```tsx
// Use tree-shakeable icon imports
import { Github, Linkedin, Twitter } from 'lucide-react';

const socialIcons = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
} as const;

const SocialIcon = ({ platform }: { platform: keyof typeof socialIcons }) => {
  const IconComponent = socialIcons[platform];
  return <IconComponent size={20} />;
};
```

## SEO Considerations

### Structured Data
```json
{
  "@type": "WebSite",
  "name": "Fatih Ünal Portfolio",
  "url": "https://portfolio.com",
  "author": {
    "@type": "Person",
    "name": "Fatih Ünal"
  },
  "sameAs": [
    "https://linkedin.com/in/fatih-unal",
    "https://github.com/fatih-unal"
  ]
}
```

### Footer SEO Best Practices
```tsx
const Footer = () => (
  <footer itemScope itemType="https://schema.org/WPFooter">
    <div className="container">
      <address itemScope itemType="https://schema.org/Person">
        <span itemProp="name">Fatih Ünal</span>
      </address>
      
      <nav itemScope itemType="https://schema.org/SiteNavigationElement">
        {/* Navigation links */}
      </nav>
    </div>
  </footer>
);
```

## Error Handling

### Graceful Degradation
```tsx
const SafeFooter = () => {
  return (
    <ErrorBoundary
      fallback={
        <footer className="py-8 text-center">
          <p>© {new Date().getFullYear()} Fatih Ünal</p>
        </footer>
      }
    >
      <Footer />
    </ErrorBoundary>
  );
};
```

### Network Failures
```tsx
const SocialLink = ({ url, platform }) => {
  const [isReachable, setIsReachable] = useState(true);

  useEffect(() => {
    // Optional: Check if social media links are accessible
    // Could show different styling for unreachable links
  }, [url]);

  return (
    <a
      href={url}
      className={cn(
        "social-link",
        !isReachable && "opacity-50"
      )}
      target="_blank"
      rel="noopener noreferrer"
    >
      <SocialIcon platform={platform} />
    </a>
  );
};
```