# About Page - Design Document

## Component Architecture

### Page Structure
```
AboutPage/
├── HeroSection/
│   ├── ProfileImage
│   ├── IntroText
│   └── DownloadCV
├── SkillsSection/
│   ├── SkillCategory[]
│   └── SkillItem[]
├── ExperienceSection/
│   ├── CurrentRole
│   └── CareerHighlights
└── PersonalSection/
    ├── Interests
    └── Goals
```

### Component Interfaces

#### ProfileImage Component
```tsx
interface ProfileImageProps {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}
```

#### SkillCategory Component
```tsx
interface SkillCategoryProps {
  title: string;
  skills: Skill[];
  icon?: React.ComponentType;
}

interface Skill {
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  yearsOfExperience?: number;
}
```

#### ExperienceSection Component
```tsx
interface ExperienceSectionProps {
  currentRole: {
    title: string;
    company: string;
    duration: string;
    description: string;
  };
  highlights: string[];
}
```

## Data Models

### About Data Structure
```tsx
interface AboutData {
  personal: {
    name: string;
    title: string;
    location: string;
    bio: string;
    profileImage: string;
    cvDownloadUrl: string;
  };
  skills: SkillCategory[];
  experience: {
    current: JobPosition;
    highlights: Achievement[];
  };
  personal: {
    interests: string[];
    goals: string[];
    motivation: string;
  };
}

interface SkillCategory {
  id: string;
  title: string;
  icon: string;
  skills: Skill[];
}

interface JobPosition {
  title: string;
  company: string;
  startDate: string;
  endDate?: string;
  description: string;
  technologies: string[];
}

interface Achievement {
  title: string;
  description: string;
  date: string;
  type: 'project' | 'certification' | 'award' | 'milestone';
}
```

## UI/UX Design Specifications

### Layout & Spacing
- Max width: 1200px with centered container
- Section padding: 80px vertical on desktop, 40px on mobile
- Grid system: CSS Grid with 12-column layout
- Gap between sections: 120px desktop, 60px mobile

### Typography
- Headings: Inter font family
  - H1: 48px desktop, 32px mobile (font-weight: 700)
  - H2: 36px desktop, 28px mobile (font-weight: 600)
  - H3: 24px desktop, 20px mobile (font-weight: 600)
- Body text: 18px desktop, 16px mobile (font-weight: 400)
- Line height: 1.6 for body, 1.2 for headings

### Color Scheme
```css
:root {
  --primary: #0ea5e9;     /* Sky blue */
  --primary-dark: #0284c7;
  --secondary: #64748b;    /* Slate gray */
  --accent: #f59e0b;       /* Amber */
  --text-primary: #1e293b;
  --text-secondary: #64748b;
  --background: #ffffff;
  --surface: #f8fafc;
  --border: #e2e8f0;
}
```

### Component Styling

#### Profile Section
- Circular profile image: 200px diameter desktop, 150px mobile
- Gradient border around profile image
- Introduction text: centered layout with max-width 600px
- Download CV button: Primary color, rounded corners, hover effects

#### Skills Section
- Card-based layout with grid system
- Each skill category in separate card with icon
- Skill items with proficiency indicators (progress bars or star ratings)
- Hover effects on skill cards

#### Experience Section
- Timeline-style layout for career progression
- Current role highlighted with different styling
- Achievement badges or icons
- Expandable sections for detailed descriptions

### Responsive Breakpoints
```css
/* Mobile first approach */
@media (min-width: 640px) { /* sm */ }
@media (min-width: 768px) { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
```

## Animations & Interactions

### Page Load Animations
- Fade in from bottom for each section (staggered timing)
- Profile image scale-in effect
- Skills appear with sliding animation

### Hover States
- Skill cards: subtle lift and shadow increase
- Download CV button: color transition and scale
- Achievement items: highlight background

### Scroll Animations
- Progress indicators for skills appear when in viewport
- Fade-in effects triggered by intersection observer

## State Management

### Local State Requirements
```tsx
const [isLoading, setIsLoading] = useState(true);
const [activeSkillCategory, setActiveSkillCategory] = useState('frontend');
const [isVisible, setIsVisible] = useState(false); // For scroll animations
```

### No Global State Required
- Static content doesn't require complex state management
- Use React Query if CV download needs tracking

## Error Handling

### CV Download Errors
- Fallback UI if CV file is unavailable
- Toast notification for download status
- Retry mechanism for failed downloads

### Image Loading Errors
- Fallback placeholder for profile image
- Lazy loading with skeleton components
- Progressive enhancement for WebP/AVIF support

## Performance Considerations

### Image Optimization
- Next.js Image component with priority loading for profile image
- Multiple image formats (WebP, AVIF) with fallbacks
- Responsive image sizes for different viewports

### Code Splitting
- Dynamic imports for heavy animation libraries
- Lazy load non-critical sections below the fold

### Core Web Vitals
- Target LCP < 2.5s through image optimization
- Target CLS < 0.1 with proper image dimensions
- Target FID < 100ms with minimal JavaScript

## Accessibility Features

### Screen Reader Support
- Proper ARIA labels for interactive elements
- Alt text for all images including decorative ones
- Logical tab order and focus management

### Keyboard Navigation
- All interactive elements focusable via keyboard
- Clear focus indicators
- Skip links for main content

### Color Accessibility
- WCAG AA contrast ratios (4.5:1 minimum)
- No reliance on color alone for information
- High contrast mode support