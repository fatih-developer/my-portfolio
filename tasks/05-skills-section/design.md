# Skills/Expertise Section - Design Document

## Component Architecture

### Component Structure
```
SkillsSection/
├── SectionHeader/
│   ├── Title
│   ├── Subtitle
│   └── Description
├── SkillsGrid/
│   ├── SkillCategory[]
│   │   ├── CategoryHeader
│   │   ├── CategoryIcon
│   │   └── SkillList[]
│   └── SkillItem[]
│       ├── SkillName
│       ├── ProficiencyIndicator
│       ├── ExperienceInfo
│       └── SkillBadge
└── SkillsFooter/ (optional)
    ├── LearningNote
    └── SkillsLegend
```

### Component Interfaces

#### SkillsSection Component
```tsx
interface SkillsSectionProps {
  title?: string;
  subtitle?: string;
  showLegend?: boolean;
  compact?: boolean;
  className?: string;
}

interface SkillsData {
  categories: SkillCategory[];
  metadata: {
    lastUpdated: string;
    totalSkills: number;
    totalYearsExperience: number;
  };
}
```

#### SkillCategory Component
```tsx
interface SkillCategoryProps {
  category: SkillCategory;
  layout?: 'grid' | 'list';
  showProgress?: boolean;
  interactive?: boolean;
}

interface SkillCategory {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType;
  color: string;
  skills: Skill[];
  featured?: boolean;
}
```

#### SkillItem Component
```tsx
interface SkillItemProps {
  skill: Skill;
  showProgress?: boolean;
  showExperience?: boolean;
  interactive?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

interface Skill {
  id: string;
  name: string;
  category: string;
  proficiency: ProficiencyLevel;
  yearsExperience?: number;
  status: SkillStatus;
  icon?: React.ComponentType;
  color?: string;
  projects?: string[]; // Array of project IDs that use this skill
  certifications?: Certification[];
  description?: string;
}

type ProficiencyLevel = 'learning' | 'beginner' | 'intermediate' | 'advanced' | 'expert';
type SkillStatus = 'current' | 'familiar' | 'learning' | 'past';

interface Certification {
  name: string;
  issuer: string;
  date: string;
  url?: string;
}
```

#### ProficiencyIndicator Component
```tsx
interface ProficiencyIndicatorProps {
  level: ProficiencyLevel;
  type: 'bar' | 'stars' | 'badge' | 'circle';
  showLabel?: boolean;
  animated?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const proficiencyConfig = {
  learning: { value: 20, label: 'Learning', color: '#f59e0b' },
  beginner: { value: 40, label: 'Beginner', color: '#ef4444' },
  intermediate: { value: 60, label: 'Intermediate', color: '#3b82f6' },
  advanced: { value: 80, label: 'Advanced', color: '#8b5cf6' },
  expert: { value: 100, label: 'Expert', color: '#10b981' }
};
```

## Data Models

### Skills Data Structure
```tsx
const skillsData: SkillsData = {
  categories: [
    {
      id: 'frontend',
      name: 'Frontend Development',
      description: 'User interface technologies and frameworks',
      icon: Monitor,
      color: '#3b82f6',
      featured: true,
      skills: [
        {
          id: 'react',
          name: 'React',
          category: 'frontend',
          proficiency: 'advanced',
          yearsExperience: 3,
          status: 'current',
          projects: ['portfolio', 'ecommerce-app'],
          description: 'Component-based UI library for building user interfaces'
        },
        {
          id: 'typescript',
          name: 'TypeScript',
          category: 'frontend',
          proficiency: 'advanced',
          yearsExperience: 2,
          status: 'current',
          projects: ['portfolio', 'task-manager']
        },
        // ... more skills
      ]
    },
    {
      id: 'backend',
      name: 'Backend Development',
      description: 'Server-side technologies and databases',
      icon: Server,
      color: '#10b981',
      skills: [
        // Backend skills...
      ]
    },
    {
      id: 'tools',
      name: 'Development Tools',
      description: 'Development environment and productivity tools',
      icon: Wrench,
      color: '#f59e0b',
      skills: [
        // Tool skills...
      ]
    },
    {
      id: 'design',
      name: 'Design & UX',
      description: 'User experience and visual design',
      icon: Palette,
      color: '#8b5cf6',
      skills: [
        // Design skills...
      ]
    }
  ],
  metadata: {
    lastUpdated: '2024-08-25',
    totalSkills: 24,
    totalYearsExperience: 5
  }
};
```

## UI/UX Design Specifications

### Layout & Grid System
```css
.skills-section {
  /* Container */
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 20px;
}

.skills-grid {
  display: grid;
  gap: 48px;
  margin-top: 48px;
}

/* Category layouts */
.skill-category {
  display: grid;
  gap: 24px;
}

.category-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.skills-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
}

/* Responsive breakpoints */
@media (min-width: 768px) {
  .skills-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .skills-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 64px;
  }
}
```

### Typography Hierarchy
```css
.skills-title {
  font-size: 48px;
  font-weight: 700;
  line-height: 1.2;
  color: #1f2937;
  text-align: center;
  margin-bottom: 16px;
}

.skills-subtitle {
  font-size: 20px;
  color: #6b7280;
  text-align: center;
  margin-bottom: 48px;
}

.category-title {
  font-size: 24px;
  font-weight: 600;
  color: #1f2937;
}

.category-description {
  font-size: 14px;
  color: #6b7280;
  margin-top: 4px;
}

.skill-name {
  font-size: 16px;
  font-weight: 500;
  color: #374151;
}

.skill-experience {
  font-size: 12px;
  color: #9ca3af;
  margin-top: 2px;
}
```

### Color System
```css
:root {
  /* Category colors */
  --frontend: #3b82f6;
  --frontend-light: #dbeafe;
  --backend: #10b981;
  --backend-light: #d1fae5;
  --tools: #f59e0b;
  --tools-light: #fef3c7;
  --design: #8b5cf6;
  --design-light: #ede9fe;
  
  /* Proficiency colors */
  --learning: #f59e0b;
  --beginner: #ef4444;
  --intermediate: #3b82f6;
  --advanced: #8b5cf6;
  --expert: #10b981;
  
  /* Status colors */
  --current: #10b981;
  --familiar: #6b7280;
  --learning-status: #f59e0b;
  --past: #9ca3af;
}
```

### Skill Card Design
```css
.skill-item {
  /* Layout */
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  
  /* Styling */
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  transition: all 0.2s ease;
}

.skill-item:hover {
  border-color: var(--category-color);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-1px);
}

.skill-info {
  flex: 1;
  min-width: 0;
}

.skill-indicator {
  flex-shrink: 0;
  margin-left: 16px;
}
```

### Proficiency Indicator Designs

#### Progress Bar Style
```css
.proficiency-bar {
  width: 80px;
  height: 6px;
  background: #e5e7eb;
  border-radius: 3px;
  overflow: hidden;
}

.proficiency-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--level-color), var(--level-color-light));
  border-radius: 3px;
  transition: width 0.8s ease;
}
```

#### Star Rating Style
```css
.proficiency-stars {
  display: flex;
  gap: 2px;
}

.star {
  width: 14px;
  height: 14px;
  color: #d1d5db;
  transition: color 0.2s ease;
}

.star.filled {
  color: var(--level-color);
}
```

#### Badge Style
```css
.proficiency-badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  background: var(--level-color-light);
  color: var(--level-color);
}
```

## Responsive Design

### Mobile Layout (< 768px)
```css
.skills-mobile {
  padding: 40px 16px;
}

.skills-title {
  font-size: 32px;
}

.skills-grid {
  grid-template-columns: 1fr;
  gap: 32px;
}

.skills-list {
  grid-template-columns: 1fr;
  gap: 12px;
}

.skill-item {
  padding: 12px 16px;
}

.proficiency-bar {
  width: 60px;
}
```

### Tablet Layout (768px - 1024px)
```css
.skills-tablet {
  padding: 60px 24px;
}

.skills-grid {
  grid-template-columns: 1fr;
  gap: 40px;
}

.skills-list {
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
}
```

### Desktop Layout (> 1024px)
```css
.skills-desktop {
  padding: 80px 32px;
}

.skills-grid {
  grid-template-columns: repeat(2, 1fr);
  gap: 64px;
}

.skills-list {
  grid-template-columns: 1fr;
  gap: 16px;
}
```

## Animations & Interactions

### Loading Animations
```tsx
const skillItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.1,
      duration: 0.5,
      ease: "easeOut"
    }
  })
};

const proficiencyBarVariants = {
  hidden: { width: 0 },
  visible: (proficiency: number) => ({
    width: `${proficiency}%`,
    transition: {
      delay: 0.5,
      duration: 0.8,
      ease: "easeOut"
    }
  })
};
```

### Hover Interactions
```tsx
const skillCardVariants = {
  initial: { scale: 1, y: 0 },
  hover: { 
    scale: 1.02, 
    y: -2,
    transition: { duration: 0.2 }
  }
};

const categoryIconVariants = {
  initial: { rotate: 0 },
  hover: { rotate: 5, transition: { duration: 0.2 } }
};
```

### Scroll-triggered Animations
```tsx
const useScrollTrigger = (threshold = 0.3) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
};
```

## Accessibility Features

### Screen Reader Support
```tsx
const SkillItem = ({ skill }: SkillItemProps) => (
  <div
    role="listitem"
    aria-describedby={`skill-${skill.id}-description`}
  >
    <div className="skill-info">
      <h4>{skill.name}</h4>
      <div
        id={`skill-${skill.id}-description`}
        className="sr-only"
      >
        {skill.name} with {skill.proficiency} proficiency level
        {skill.yearsExperience && `, ${skill.yearsExperience} years of experience`}
      </div>
    </div>
    
    <div
      role="progressbar"
      aria-label={`${skill.name} proficiency`}
      aria-valuenow={proficiencyConfig[skill.proficiency].value}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuetext={proficiencyConfig[skill.proficiency].label}
    >
      <ProficiencyIndicator level={skill.proficiency} />
    </div>
  </div>
);
```

### Keyboard Navigation
```tsx
const SkillCategory = ({ category }: SkillCategoryProps) => (
  <section
    aria-labelledby={`category-${category.id}-title`}
    tabIndex={0}
    className="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg"
  >
    <h3 id={`category-${category.id}-title`} className="category-title">
      {category.name}
    </h3>
    
    <ul role="list" className="skills-list">
      {category.skills.map(skill => (
        <SkillItem key={skill.id} skill={skill} />
      ))}
    </ul>
  </section>
);
```

### Color Accessibility
```css
/* High contrast mode support */
@media (prefers-contrast: high) {
  .skill-item {
    border-width: 2px;
    border-color: #000000;
  }
  
  .proficiency-fill {
    background: #000000;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .skill-item {
    transition: none;
  }
  
  .proficiency-fill {
    transition: none;
  }
}
```

## State Management

### Skills Context
```tsx
interface SkillsContextType {
  skills: SkillsData;
  filters: SkillFilters;
  setFilters: (filters: SkillFilters) => void;
  filteredSkills: SkillCategory[];
}

interface SkillFilters {
  proficiency: ProficiencyLevel[];
  status: SkillStatus[];
  category: string[];
  search: string;
}

const SkillsContext = createContext<SkillsContextType | null>(null);
```

### Local State Management
```tsx
const useSkills = () => {
  const [filters, setFilters] = useState<SkillFilters>({
    proficiency: [],
    status: [],
    category: [],
    search: ''
  });

  const filteredSkills = useMemo(() => {
    return skillsData.categories.map(category => ({
      ...category,
      skills: category.skills.filter(skill => {
        // Apply filters
        return filterSkill(skill, filters);
      })
    })).filter(category => category.skills.length > 0);
  }, [filters]);

  return { filters, setFilters, filteredSkills };
};
```

## Performance Optimizations

### Memoization
```tsx
const SkillItem = memo(({ skill }: SkillItemProps) => {
  // Component implementation
});

const ProficiencyIndicator = memo(({ level, type }: ProficiencyIndicatorProps) => {
  // Memoized to prevent re-renders when parent updates
});
```

### Lazy Loading
```tsx
const SkillsSection = lazy(() => import('./SkillsSection'));

// In parent component
<Suspense fallback={<SkillsSkeleton />}>
  <SkillsSection />
</Suspense>
```

### Virtual Scrolling (for large skill lists)
```tsx
const VirtualSkillsList = ({ skills }: { skills: Skill[] }) => {
  const { height, scrollElementRef } = useVirtualizer({
    count: skills.length,
    getScrollElement: () => scrollElementRef.current,
    estimateSize: () => 60,
    overscan: 5
  });

  // Implementation...
};
```

## Error Handling

### Graceful Degradation
```tsx
const SkillsErrorBoundary = ({ children }: { children: React.ReactNode }) => (
  <ErrorBoundary
    fallback={
      <div className="skills-error">
        <h3>Skills information temporarily unavailable</h3>
        <p>Please refresh the page to try again.</p>
      </div>
    }
  >
    {children}
  </ErrorBoundary>
);
```

### Loading States
```tsx
const SkillsSkeleton = () => (
  <div className="skills-skeleton">
    {[...Array(4)].map((_, categoryIndex) => (
      <div key={categoryIndex} className="category-skeleton">
        <div className="h-6 bg-gray-200 rounded w-48 mb-4"></div>
        {[...Array(6)].map((_, skillIndex) => (
          <div key={skillIndex} className="skill-skeleton">
            <div className="h-4 bg-gray-200 rounded w-32"></div>
            <div className="h-2 bg-gray-200 rounded w-20"></div>
          </div>
        ))}
      </div>
    ))}
  </div>
);
```

## SEO & Structured Data

### Skills Schema Markup
```json
{
  "@type": "Person",
  "name": "Fatih Ünal",
  "knowsAbout": [
    {
      "@type": "Thing",
      "name": "React",
      "description": "Advanced proficiency in React development"
    },
    {
      "@type": "Thing", 
      "name": "TypeScript",
      "description": "Advanced proficiency in TypeScript development"
    }
  ],
  "hasOccupation": {
    "@type": "Occupation",
    "name": "Software Developer",
    "skills": ["React", "TypeScript", "Node.js", "Next.js"]
  }
}
```