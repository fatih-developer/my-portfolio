# Projects/Portfolio Page - Design Document

## Component Architecture

### Page Structure
```
ProjectsPage/
├── PageHeader/
│   ├── Title
│   ├── Description
│   └── ProjectCount
├── FilterSection/
│   ├── SearchInput
│   ├── TechnologyFilter
│   ├── CategoryFilter
│   └── ClearFilters
├── ProjectGrid/
│   ├── FeaturedProjects/
│   └── ProjectCard[]
└── ProjectModal/ (or separate pages)
    ├── ProjectGallery
    ├── ProjectDetails
    ├── TechStack
    └── ProjectLinks
```

### Component Interfaces

#### ProjectCard Component
```tsx
interface ProjectCardProps {
  project: Project;
  featured?: boolean;
  onClick: (projectId: string) => void;
  className?: string;
}

interface Project {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  technologies: string[];
  category: ProjectCategory;
  status: 'completed' | 'in-progress' | 'archived';
  startDate: string;
  endDate?: string;
  featured: boolean;
  images: ProjectImage[];
  links: ProjectLinks;
  metrics?: ProjectMetrics;
}

interface ProjectImage {
  url: string;
  alt: string;
  type: 'screenshot' | 'mockup' | 'diagram';
  featured?: boolean;
}

interface ProjectLinks {
  demo?: string;
  github?: string;
  caseStudy?: string;
  design?: string;
}

interface ProjectMetrics {
  duration: string;
  teamSize?: number;
  impact?: string;
  technologies: number;
}
```

#### FilterSection Component
```tsx
interface FilterSectionProps {
  technologies: string[];
  categories: ProjectCategory[];
  activeFilters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onSearch: (query: string) => void;
  searchQuery: string;
}

interface FilterState {
  technologies: string[];
  categories: string[];
  status: string[];
}

type ProjectCategory = 
  | 'web-application' 
  | 'frontend' 
  | 'backend' 
  | 'mobile' 
  | 'open-source' 
  | 'learning';
```

#### ProjectModal Component
```tsx
interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
}
```

## Data Models

### Projects Data Structure
```tsx
interface ProjectsData {
  featured: Project[];
  all: Project[];
  categories: CategoryInfo[];
  technologies: TechnologyInfo[];
}

interface CategoryInfo {
  id: string;
  name: string;
  description: string;
  icon: string;
  count: number;
}

interface TechnologyInfo {
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'cloud' | 'tools';
  icon?: string;
  color?: string;
  count: number;
}
```

### State Management
```tsx
interface ProjectsPageState {
  projects: Project[];
  filteredProjects: Project[];
  loading: boolean;
  selectedProject: Project | null;
  modalOpen: boolean;
  filters: FilterState;
  searchQuery: string;
  sortBy: 'date' | 'title' | 'technology';
  sortOrder: 'asc' | 'desc';
}
```

## UI/UX Design Specifications

### Layout & Grid System
- Container max-width: 1200px
- Featured projects: 2-column grid on desktop, 1-column on mobile
- Regular projects: 3-column grid on desktop, 2-column tablet, 1-column mobile
- Grid gap: 24px desktop, 16px mobile
- Section spacing: 80px vertical desktop, 40px mobile

### Project Card Design
```css
.project-card {
  /* Dimensions */
  aspect-ratio: 4/3;
  border-radius: 12px;
  padding: 24px;
  
  /* Styling */
  background: white;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  
  /* Hover state */
  transition: all 0.2s ease;
}

.project-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.featured-project {
  /* Larger size for featured projects */
  grid-column: span 2;
  aspect-ratio: 16/9;
}
```

### Typography Hierarchy
- Page title: 48px desktop, 36px mobile (Inter Bold)
- Project titles: 20px (Inter Semibold)
- Project descriptions: 16px (Inter Regular)
- Technology tags: 12px (Inter Medium, uppercase)
- Filter labels: 14px (Inter Medium)

### Color System
```css
:root {
  /* Project categories */
  --web-app: #3b82f6;      /* Blue */
  --frontend: #8b5cf6;     /* Purple */
  --backend: #059669;      /* Green */
  --mobile: #f59e0b;       /* Amber */
  --open-source: #ef4444;  /* Red */
  --learning: #6b7280;     /* Gray */
  
  /* Technology colors */
  --react: #61dafb;
  --vue: #4fc08d;
  --node: #339933;
  --typescript: #3178c6;
  
  /* Status indicators */
  --completed: #10b981;
  --in-progress: #f59e0b;
  --archived: #6b7280;
}
```

### Filter Section Design
- Horizontal layout on desktop, stacked on mobile
- Search bar: Full-width input with search icon
- Filter chips: Rounded buttons with count badges
- Active filters highlighted with primary color
- Clear filters button when filters are applied

## Responsive Design

### Breakpoint Strategy
```css
/* Mobile: 320px - 640px */
.projects-grid {
  grid-template-columns: 1fr;
  gap: 16px;
}

/* Tablet: 640px - 1024px */
@media (min-width: 640px) {
  .projects-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
}

/* Desktop: 1024px+ */
@media (min-width: 1024px) {
  .projects-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }
  
  .featured-projects {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

### Mobile Optimizations
- Touch-friendly filter buttons (minimum 44px height)
- Swipe gestures for project image galleries
- Simplified project cards with essential information
- Sticky filter section on scroll
- Pull-to-refresh functionality

## Animations & Interactions

### Page Load Animations
```tsx
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};
```

### Filter Animations
- Smooth fade out/in when filtering projects
- Loading skeleton while searching
- Slide-in animation for filter chips
- Bounce animation for "no results" state

### Modal Animations
- Backdrop fade-in with blur effect
- Modal slide-up from bottom on mobile, scale-in on desktop
- Image gallery with smooth transitions
- Exit animations when closing modal

## Search & Filter Logic

### Search Implementation
```tsx
const searchProjects = (projects: Project[], query: string) => {
  const lowercaseQuery = query.toLowerCase();
  return projects.filter(project => 
    project.title.toLowerCase().includes(lowercaseQuery) ||
    project.shortDescription.toLowerCase().includes(lowercaseQuery) ||
    project.technologies.some(tech => 
      tech.toLowerCase().includes(lowercaseQuery)
    )
  );
};
```

### Filter Implementation
```tsx
const filterProjects = (projects: Project[], filters: FilterState) => {
  return projects.filter(project => {
    const technologyMatch = filters.technologies.length === 0 || 
      filters.technologies.some(tech => project.technologies.includes(tech));
    
    const categoryMatch = filters.categories.length === 0 ||
      filters.categories.includes(project.category);
    
    const statusMatch = filters.status.length === 0 ||
      filters.status.includes(project.status);
    
    return technologyMatch && categoryMatch && statusMatch;
  });
};
```

## Performance Optimizations

### Image Optimization
- Next.js Image component for automatic optimization
- WebP/AVIF formats with fallbacks
- Placeholder blur while loading
- Lazy loading for project images
- Different sizes for different viewports

### Virtual Scrolling
- Implement virtual scrolling for large project lists (50+ projects)
- Only render visible project cards
- Smooth scrolling with momentum

### Code Splitting
- Lazy load project modal component
- Dynamic imports for heavy filtering libraries
- Separate bundles for different project categories

## Accessibility Features

### Screen Reader Support
```tsx
// Example ARIA labels
<div role="grid" aria-label="Projects portfolio">
  <div role="gridcell" aria-describedby="project-description">
    <h3 id="project-title">Project Name</h3>
    <p id="project-description">Project description...</p>
  </div>
</div>
```

### Keyboard Navigation
- Tab order: filters → search → project cards → modal
- Arrow key navigation within filter groups
- Enter/Space to open project modals
- Escape to close modals and clear search

### Focus Management
- Focus trap in modal dialogs
- Clear focus indicators for all interactive elements
- Skip links for main content
- Focus restoration after modal close

## SEO Considerations

### Meta Tags per Project
```tsx
const projectMeta = {
  title: `${project.title} - Fatih Ünal Portfolio`,
  description: project.shortDescription,
  keywords: project.technologies.join(', '),
  ogImage: project.images[0]?.url,
  ogUrl: `/projects/${project.id}`
};
```

### Structured Data
```json
{
  "@type": "CreativeWork",
  "name": "Project Title",
  "description": "Project description",
  "author": {
    "@type": "Person",
    "name": "Fatih Ünal"
  },
  "dateCreated": "2024-01-01",
  "url": "https://portfolio.com/projects/project-slug"
}
```

## Error Handling

### Loading States
- Skeleton components while projects load
- Progressive enhancement for JavaScript disabled
- Graceful degradation for image loading failures

### Empty States
- No projects found illustration
- Clear call-to-action when no results
- Suggestions for refining search/filters

### Error Boundaries
- Catch project loading errors
- Display fallback UI for broken project cards
- Retry mechanism for failed requests