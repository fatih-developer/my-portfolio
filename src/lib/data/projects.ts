import { Project, CategoryInfo, TechnologyInfo } from '@/lib/types/project'
import { placeholderImages } from './sample-images'

export const projects: Project[] = [
  {
    id: '1',
    title: 'Personal Portfolio Website',
    slug: 'personal-portfolio',
    shortDescription: 'A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS.',
    fullDescription: 'This portfolio website showcases my skills, projects, and experience as a software developer. Built with modern web technologies including Next.js 14, TypeScript, Tailwind CSS, and Framer Motion. Features include dark/light mode, responsive design, SEO optimization, and performance optimization.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'shadcn/ui'],
    category: 'frontend',
    status: 'completed',
    startDate: '2024-08-01',
    endDate: '2024-08-25',
    featured: true,
    images: [
      {
        url: placeholderImages.portfolio.hero,
        alt: 'Portfolio website hero section',
        type: 'screenshot',
        featured: true
      },
      {
        url: placeholderImages.portfolio.projects,
        alt: 'Portfolio projects page',
        type: 'screenshot'
      },
      {
        url: placeholderImages.portfolio.mobile,
        alt: 'Portfolio mobile responsive design',
        type: 'screenshot'
      }
    ],
    links: {
      demo: 'https://fatih-unal.dev',
      github: 'https://github.com/fatih-unal/portfolio'
    },
    metrics: {
      duration: '3 weeks',
      teamSize: 1,
      impact: 'Personal branding and professional showcase',
      technologies: 5
    },
    challenges: [
      'Implementing smooth animations while maintaining performance',
      'Creating a responsive design that works across all devices',
      'Optimizing Core Web Vitals for better SEO'
    ],
    highlights: [
      'Achieved 95+ Lighthouse performance score',
      'Fully accessible with WCAG AA compliance',
      'Dark/light mode with smooth transitions',
      'SEO optimized with structured data'
    ]
  },
  {
    id: '2',
    title: 'E-commerce Dashboard',
    slug: 'ecommerce-dashboard',
    shortDescription: 'A comprehensive admin dashboard for e-commerce management with React and Node.js.',
    fullDescription: 'A full-stack e-commerce dashboard application built with React, Node.js, and PostgreSQL. Features include product management, order tracking, customer analytics, inventory management, and real-time notifications. The application uses modern state management with Redux Toolkit and implements real-time updates with WebSocket connections.',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Redux Toolkit', 'Express.js', 'Socket.io'],
    category: 'web-application',
    status: 'completed',
    startDate: '2024-06-01',
    endDate: '2024-07-15',
    featured: true,
    images: [
      {
        url: placeholderImages.dashboard.overview,
        alt: 'E-commerce dashboard overview',
        type: 'screenshot',
        featured: true
      },
      {
        url: placeholderImages.dashboard.products,
        alt: 'Product management interface',
        type: 'screenshot'
      },
      {
        url: placeholderImages.dashboard.analytics,
        alt: 'Sales analytics dashboard',
        type: 'screenshot'
      }
    ],
    links: {
      demo: 'https://ecommerce-dashboard-demo.vercel.app',
      github: 'https://github.com/fatih-unal/ecommerce-dashboard'
    },
    metrics: {
      duration: '6 weeks',
      teamSize: 3,
      impact: 'Increased admin efficiency by 40%',
      technologies: 6
    },
    challenges: [
      'Implementing real-time data synchronization',
      'Managing complex state with multiple data sources',
      'Optimizing performance for large datasets'
    ],
    highlights: [
      'Real-time order notifications and updates',
      'Advanced filtering and search capabilities',
      'Responsive design optimized for mobile admin use',
      'Role-based access control and permissions'
    ]
  },
  {
    id: '3',
    title: 'Task Management App',
    slug: 'task-management-app',
    shortDescription: 'A collaborative task management application with drag-and-drop functionality.',
    fullDescription: 'A modern task management application built with React and TypeScript. Features include drag-and-drop task organization, team collaboration, deadline tracking, file attachments, and project analytics. The application uses React Query for efficient data fetching and state synchronization.',
    technologies: ['React', 'TypeScript', 'React Query', 'Zustand', 'Tailwind CSS'],
    category: 'web-application',
    status: 'in-progress',
    startDate: '2024-07-15',
    featured: true,
    images: [
      {
        url: placeholderImages.taskManager.board,
        alt: 'Task management board with drag and drop',
        type: 'screenshot',
        featured: true
      },
      {
        url: placeholderImages.taskManager.details,
        alt: 'Task detail modal with comments',
        type: 'screenshot'
      }
    ],
    links: {
      demo: 'https://task-manager-demo.vercel.app',
      github: 'https://github.com/fatih-unal/task-manager'
    },
    metrics: {
      duration: '4 weeks (ongoing)',
      teamSize: 2,
      technologies: 5
    },
    challenges: [
      'Implementing smooth drag-and-drop interactions',
      'Managing real-time collaboration features',
      'Optimizing performance with large numbers of tasks'
    ],
    highlights: [
      'Intuitive drag-and-drop interface',
      'Real-time collaboration with multiple users',
      'Advanced task filtering and search',
      'Mobile-responsive design'
    ]
  },
  {
    id: '4',
    title: 'Weather API Integration',
    slug: 'weather-api',
    shortDescription: 'A REST API service for weather data aggregation and caching.',
    fullDescription: 'A Node.js REST API service that aggregates weather data from multiple sources, implements intelligent caching strategies, and provides a unified interface for weather applications. Built with Express.js, Redis for caching, and includes comprehensive API documentation.',
    technologies: ['Node.js', 'Express.js', 'Redis', 'MongoDB', 'OpenAPI'],
    category: 'backend',
    status: 'completed',
    startDate: '2024-05-01',
    endDate: '2024-05-20',
    featured: false,
    images: [
      {
        url: placeholderImages.weatherApi.docs,
        alt: 'Weather API documentation',
        type: 'screenshot',
        featured: true
      }
    ],
    links: {
      github: 'https://github.com/fatih-unal/weather-api',
      demo: 'https://weather-api-docs.vercel.app'
    },
    metrics: {
      duration: '3 weeks',
      teamSize: 1,
      impact: 'Serves 10K+ API requests daily',
      technologies: 5
    }
  },
  {
    id: '5',
    title: 'React Component Library',
    slug: 'react-component-library',
    shortDescription: 'A comprehensive React component library with TypeScript and Storybook.',
    fullDescription: 'A reusable React component library built with TypeScript, styled with Tailwind CSS, and documented with Storybook. Includes common UI components like buttons, forms, modals, and data tables with comprehensive testing and accessibility features.',
    technologies: ['React', 'TypeScript', 'Storybook', 'Jest', 'Testing Library'],
    category: 'open-source',
    status: 'completed',
    startDate: '2024-04-01',
    endDate: '2024-04-30',
    featured: false,
    images: [
      {
        url: placeholderImages.componentLibrary.storybook,
        alt: 'Component library Storybook interface',
        type: 'screenshot',
        featured: true
      }
    ],
    links: {
      github: 'https://github.com/fatih-unal/react-components',
      demo: 'https://react-components-storybook.vercel.app'
    },
    metrics: {
      duration: '4 weeks',
      teamSize: 1,
      impact: '50+ components with full TypeScript support',
      technologies: 5
    }
  },
  {
    id: '6',
    title: 'Learning Platform',
    slug: 'learning-platform',
    shortDescription: 'An interactive learning platform for programming tutorials and exercises.',
    fullDescription: 'An educational platform for learning programming concepts through interactive tutorials, code challenges, and progress tracking. Built with Next.js, includes user authentication, progress tracking, and an integrated code editor.',
    technologies: ['Next.js', 'Prisma', 'PostgreSQL', 'NextAuth.js', 'CodeMirror'],
    category: 'learning',
    status: 'archived',
    startDate: '2024-02-01',
    endDate: '2024-03-15',
    featured: false,
    images: [
      {
        url: placeholderImages.learningPlatform.interface,
        alt: 'Learning platform interface',
        type: 'screenshot',
        featured: true
      }
    ],
    links: {
      github: 'https://github.com/fatih-unal/learning-platform'
    },
    metrics: {
      duration: '6 weeks',
      teamSize: 2,
      technologies: 5
    }
  }
]

export const categories: CategoryInfo[] = [
  {
    id: 'web-application',
    name: 'Web Applications',
    description: 'Full-stack web applications with modern frameworks',
    icon: 'Globe',
    count: projects.filter(p => p.category === 'web-application').length
  },
  {
    id: 'frontend',
    name: 'Frontend Projects',
    description: 'User interface and client-side applications',
    icon: 'Monitor',
    count: projects.filter(p => p.category === 'frontend').length
  },
  {
    id: 'backend',
    name: 'Backend Services',
    description: 'Server-side applications and APIs',
    icon: 'Server',
    count: projects.filter(p => p.category === 'backend').length
  },
  {
    id: 'mobile',
    name: 'Mobile Apps',
    description: 'Mobile applications and responsive web apps',
    icon: 'Smartphone',
    count: projects.filter(p => p.category === 'mobile').length
  },
  {
    id: 'open-source',
    name: 'Open Source',
    description: 'Open source contributions and libraries',
    icon: 'Code',
    count: projects.filter(p => p.category === 'open-source').length
  },
  {
    id: 'learning',
    name: 'Learning Projects',
    description: 'Educational and experimental projects',
    icon: 'BookOpen',
    count: projects.filter(p => p.category === 'learning').length
  }
]

export const technologies: TechnologyInfo[] = [
  { name: 'React', category: 'frontend', color: '#61DAFB', count: projects.filter(p => p.technologies.includes('React')).length },
  { name: 'Next.js', category: 'frontend', color: '#000000', count: projects.filter(p => p.technologies.includes('Next.js')).length },
  { name: 'TypeScript', category: 'frontend', color: '#3178C6', count: projects.filter(p => p.technologies.includes('TypeScript')).length },
  { name: 'Node.js', category: 'backend', color: '#339933', count: projects.filter(p => p.technologies.includes('Node.js')).length },
  { name: 'Tailwind CSS', category: 'frontend', color: '#06B6D4', count: projects.filter(p => p.technologies.includes('Tailwind CSS')).length },
  { name: 'PostgreSQL', category: 'database', color: '#336791', count: projects.filter(p => p.technologies.includes('PostgreSQL')).length },
  { name: 'Express.js', category: 'backend', color: '#000000', count: projects.filter(p => p.technologies.includes('Express.js')).length },
  { name: 'Redis', category: 'database', color: '#DC382D', count: projects.filter(p => p.technologies.includes('Redis')).length },
  { name: 'MongoDB', category: 'database', color: '#47A248', count: projects.filter(p => p.technologies.includes('MongoDB')).length },
  { name: 'Framer Motion', category: 'frontend', color: '#0055FF', count: projects.filter(p => p.technologies.includes('Framer Motion')).length }
]

// Helper functions
export function getFeaturedProjects(): Project[] {
  return projects.filter(project => project.featured)
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find(project => project.slug === slug)
}

export function getProjectsByCategory(category: string): Project[] {
  return projects.filter(project => project.category === category)
}

export function getProjectsByTechnology(technology: string): Project[] {
  return projects.filter(project => project.technologies.includes(technology))
}