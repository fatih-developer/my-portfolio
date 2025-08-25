# SEO Optimization - Design Document

## SEO Architecture Overview

### SEO System Structure
```
SEOSystem/
├── MetaData/
│   ├── PageMeta
│   ├── OpenGraph
│   ├── TwitterCards
│   └── StructuredData
├── SiteStructure/
│   ├── Sitemap
│   ├── RobotsTxt
│   ├── Canonical URLs
│   └── Navigation
├── Performance/
│   ├── CoreWebVitals
│   ├── ImageOptimization
│   ├── CodeSplitting
│   └── Caching
└── Analytics/
    ├── SearchConsole
    ├── Performance Monitoring
    └── Keyword Tracking
```

## Component Interfaces

### SEO Meta Component
```tsx
interface SEOMetaProps {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  noindex?: boolean;
  nofollow?: boolean;
}

interface PageSEOData {
  title: string;
  description: string;
  keywords: string[];
  image: string;
  url: string;
  breadcrumbs: Breadcrumb[];
  structuredData: any;
  openGraph: OpenGraphData;
  twitterCard: TwitterCardData;
}
```

### Structured Data Interfaces
```tsx
interface PersonSchema {
  '@type': 'Person';
  name: string;
  jobTitle: string;
  description: string;
  url: string;
  image: string;
  email: string;
  sameAs: string[];
  knowsAbout: string[];
  worksFor?: Organization;
  address?: PostalAddress;
}

interface WebsiteSchema {
  '@type': 'WebSite';
  name: string;
  url: string;
  description: string;
  author: PersonSchema;
  inLanguage: string;
  copyrightYear: number;
  potentialAction?: SearchAction;
}

interface PortfolioProjectSchema {
  '@type': 'CreativeWork';
  name: string;
  description: string;
  url: string;
  image: string[];
  author: PersonSchema;
  dateCreated: string;
  dateModified?: string;
  genre: string[];
  keywords: string[];
}
```

### Breadcrumb Component
```tsx
interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  className?: string;
}

interface BreadcrumbItem {
  label: string;
  href: string;
  current?: boolean;
}

interface BreadcrumbListSchema {
  '@type': 'BreadcrumbList';
  itemListElement: BreadcrumbListItem[];
}
```

## SEO Configuration System

### Site-wide SEO Configuration
```tsx
const seoConfig = {
  defaultTitle: 'Fatih Ünal - Software Developer & Problem Solver',
  titleTemplate: '%s | Fatih Ünal',
  defaultDescription: 'Experienced software developer specializing in React, TypeScript, and modern web technologies. View my portfolio and get in touch for collaboration.',
  siteUrl: 'https://fatih-unal.com',
  defaultImage: '/images/og-image.jpg',
  twitterHandle: '@fatih_unal',
  author: {
    name: 'Fatih Ünal',
    email: 'contact@fatih-unal.com',
    twitter: '@fatih_unal',
    linkedin: 'https://linkedin.com/in/fatih-unal',
    github: 'https://github.com/fatih-unal'
  },
  organization: {
    name: 'Fatih Ünal - Software Developer',
    logo: '/images/logo.png',
    url: 'https://fatih-unal.com'
  }
};

const pageConfigs: Record<string, PageSEOConfig> = {
  home: {
    title: 'Software Developer & Problem Solver',
    description: 'Experienced software developer specializing in React, TypeScript, Next.js, and modern web technologies. Available for new opportunities.',
    keywords: ['Fatih Ünal', 'software developer', 'React developer', 'TypeScript', 'frontend developer', 'full-stack developer'],
    path: '/',
    breadcrumbs: [
      { label: 'Home', href: '/' }
    ]
  },
  about: {
    title: 'About - Software Developer Experience & Skills',
    description: 'Learn about my journey as a software developer, technical expertise in React and TypeScript, and professional experience in modern web development.',
    keywords: ['about Fatih Ünal', 'software developer experience', 'React expertise', 'TypeScript skills', 'web development background'],
    path: '/about',
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'About', href: '/about', current: true }
    ]
  },
  projects: {
    title: 'Portfolio Projects - React & TypeScript Developer',
    description: 'Explore my latest web development projects built with React, TypeScript, Next.js, Node.js, and other modern technologies.',
    keywords: ['portfolio projects', 'React projects', 'TypeScript projects', 'web development portfolio', 'Next.js applications'],
    path: '/projects',
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Projects', href: '/projects', current: true }
    ]
  },
  contact: {
    title: 'Contact - Available for Development Projects',
    description: 'Get in touch with Fatih Ünal for software development opportunities, freelance projects, or professional collaboration.',
    keywords: ['contact Fatih Ünal', 'hire developer', 'freelance developer', 'software development services'],
    path: '/contact',
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Contact', href: '/contact', current: true }
    ]
  }
};
```

## Meta Tags Implementation

### SEO Head Component
```tsx
const SEOHead: React.FC<SEOMetaProps> = ({
  title,
  description,
  keywords = [],
  image,
  url,
  type = 'website',
  noindex = false,
  nofollow = false
}) => {
  const fullTitle = title.includes('|') ? title : `${title} | ${seoConfig.defaultTitle}`;
  const fullUrl = url ? `${seoConfig.siteUrl}${url}` : seoConfig.siteUrl;
  const imageUrl = image ? `${seoConfig.siteUrl}${image}` : `${seoConfig.siteUrl}${seoConfig.defaultImage}`;

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(', ')} />
      )}
      <meta name="author" content={seoConfig.author.name} />
      <link rel="canonical" href={fullUrl} />

      {/* Robots Meta */}
      <meta 
        name="robots" 
        content={`${noindex ? 'noindex' : 'index'},${nofollow ? 'nofollow' : 'follow'}`} 
      />

      {/* Open Graph Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={seoConfig.defaultTitle} />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={seoConfig.twitterHandle} />
      <meta name="twitter:creator" content={seoConfig.twitterHandle} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {/* Additional Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta httpEquiv="Content-Language" content="en" />
      <meta name="theme-color" content="#0ea5e9" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    </Head>
  );
};
```

### Page-specific SEO Component
```tsx
const PageSEO: React.FC<{ pageKey: keyof typeof pageConfigs }> = ({ pageKey }) => {
  const config = pageConfigs[pageKey];
  
  return (
    <>
      <SEOHead
        title={config.title}
        description={config.description}
        keywords={config.keywords}
        url={config.path}
      />
      <BreadcrumbStructuredData items={config.breadcrumbs} />
    </>
  );
};
```

## Structured Data Implementation

### JSON-LD Structured Data Component
```tsx
const StructuredData: React.FC<{ data: any }> = ({ data }) => (
  <Head>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          ...data
        })
      }}
    />
  </Head>
);

// Person Schema for About page
const PersonStructuredData: React.FC = () => {
  const personData: PersonSchema = {
    '@type': 'Person',
    name: 'Fatih Ünal',
    jobTitle: 'Software Developer',
    description: 'Experienced software developer specializing in React, TypeScript, and modern web technologies',
    url: seoConfig.siteUrl,
    image: `${seoConfig.siteUrl}/images/profile.jpg`,
    email: seoConfig.author.email,
    sameAs: [
      seoConfig.author.linkedin,
      seoConfig.author.github,
      `https://twitter.com/${seoConfig.twitterHandle.replace('@', '')}`
    ],
    knowsAbout: [
      'JavaScript',
      'TypeScript',
      'React',
      'Next.js',
      'Node.js',
      'Web Development',
      'Frontend Development',
      'Full Stack Development'
    ]
  };

  return <StructuredData data={personData} />;
};

// Website Schema for home page
const WebsiteStructuredData: React.FC = () => {
  const websiteData: WebsiteSchema = {
    '@type': 'WebSite',
    name: seoConfig.defaultTitle,
    url: seoConfig.siteUrl,
    description: seoConfig.defaultDescription,
    author: {
      '@type': 'Person',
      name: seoConfig.author.name
    },
    inLanguage: 'en-US',
    copyrightYear: new Date().getFullYear()
  };

  return <StructuredData data={websiteData} />;
};
```

### Project Portfolio Structured Data
```tsx
const ProjectStructuredData: React.FC<{ project: Project }> = ({ project }) => {
  const projectData: PortfolioProjectSchema = {
    '@type': 'CreativeWork',
    name: project.title,
    description: project.description,
    url: `${seoConfig.siteUrl}/projects/${project.slug}`,
    image: project.images.map(img => `${seoConfig.siteUrl}${img.url}`),
    author: {
      '@type': 'Person',
      name: seoConfig.author.name,
      url: seoConfig.siteUrl
    },
    dateCreated: project.startDate,
    dateModified: project.endDate,
    genre: project.categories,
    keywords: project.technologies
  };

  return <StructuredData data={projectData} />;
};
```

## URL Structure & Navigation

### URL Strategy
```
Portfolio URL Structure:
/                     -> Home page
/about               -> About page
/projects            -> Projects listing
/projects/[slug]     -> Individual project pages
/contact            -> Contact page

Clean URL patterns:
- No trailing slashes
- Lowercase URLs
- Hyphens for word separation
- Descriptive slugs for projects
```

### Canonical URL Implementation
```tsx
const CanonicalURL: React.FC<{ path: string }> = ({ path }) => (
  <Head>
    <link rel="canonical" href={`${seoConfig.siteUrl}${path}`} />
  </Head>
);

// Usage in pages
const AboutPage = () => (
  <>
    <CanonicalURL path="/about" />
    <PageSEO pageKey="about" />
    {/* Page content */}
  </>
);
```

### Breadcrumb Navigation
```tsx
const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, separator = '/', className }) => (
  <nav aria-label="Breadcrumb" className={className}>
    <ol className="flex items-center space-x-2">
      {items.map((item, index) => (
        <li key={item.href} className="flex items-center">
          {index > 0 && (
            <span className="mx-2 text-gray-500">{separator}</span>
          )}
          {item.current ? (
            <span className="text-gray-900 font-medium" aria-current="page">
              {item.label}
            </span>
          ) : (
            <Link
              href={item.href}
              className="text-blue-600 hover:text-blue-800 hover:underline"
            >
              {item.label}
            </Link>
          )}
        </li>
      ))}
    </ol>
  </nav>
);

const BreadcrumbStructuredData: React.FC<{ items: BreadcrumbItem[] }> = ({ items }) => {
  const breadcrumbData: BreadcrumbListSchema = {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: `${seoConfig.siteUrl}${item.href}`
    }))
  };

  return <StructuredData data={breadcrumbData} />;
};
```

## Site Configuration Files

### Sitemap Generation
```tsx
// pages/sitemap.xml.tsx or app/sitemap.xml/route.ts
export default function Sitemap() {
  const pages = [
    {
      url: `${seoConfig.siteUrl}/`,
      lastModified: new Date(),
      changeFreq: 'monthly',
      priority: 1.0
    },
    {
      url: `${seoConfig.siteUrl}/about`,
      lastModified: new Date(),
      changeFreq: 'monthly',
      priority: 0.8
    },
    {
      url: `${seoConfig.siteUrl}/projects`,
      lastModified: new Date(),
      changeFreq: 'weekly',
      priority: 0.9
    },
    {
      url: `${seoConfig.siteUrl}/contact`,
      lastModified: new Date(),
      changeFreq: 'monthly',
      priority: 0.7
    }
  ];

  // Add project pages dynamically
  const projectPages = projects.map(project => ({
    url: `${seoConfig.siteUrl}/projects/${project.slug}`,
    lastModified: new Date(project.updatedAt || project.createdAt),
    changeFreq: 'monthly' as const,
    priority: 0.6
  }));

  return [...pages, ...projectPages];
}
```

### Robots.txt Configuration
```txt
# public/robots.txt
User-agent: *
Allow: /

# Disallow admin or private areas (if any)
Disallow: /admin/
Disallow: /private/
Disallow: /_next/
Disallow: /api/

# Point to sitemap
Sitemap: https://fatih-unal.com/sitemap.xml

# Crawl-delay for respectful crawling
Crawl-delay: 1
```

## Performance Optimization for SEO

### Core Web Vitals Optimization
```tsx
// Image optimization component
const OptimizedImage: React.FC<{
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
}> = ({ src, alt, width, height, priority = false }) => (
  <Image
    src={src}
    alt={alt}
    width={width}
    height={height}
    priority={priority}
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    placeholder="blur"
    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
    className="transition-opacity duration-200"
    loading={priority ? 'eager' : 'lazy'}
  />
);

// Critical CSS inlining for above-the-fold content
const CriticalCSS = () => (
  <style jsx>{`
    /* Critical CSS for above-the-fold content */
    .hero-section {
      min-height: 100vh;
      display: flex;
      align-items: center;
      background: linear-gradient(135deg, #0ea5e9, #3b82f6);
    }
    
    .navbar {
      position: fixed;
      top: 0;
      width: 100%;
      background: rgba(255, 255, 255, 0.9);
      backdrop-filter: blur(10px);
      z-index: 50;
    }
  `}</style>
);
```

### Code Splitting for SEO
```tsx
// Lazy load non-critical components
const SkillsSection = dynamic(() => import('../components/SkillsSection'), {
  loading: () => <div className="h-96 animate-pulse bg-gray-100" />
});

const ProjectsGrid = dynamic(() => import('../components/ProjectsGrid'), {
  loading: () => <ProjectsGridSkeleton />
});

// Preload critical route components
const router = useRouter();
useEffect(() => {
  router.prefetch('/about');
  router.prefetch('/projects');
  router.prefetch('/contact');
}, [router]);
```

## Analytics & Monitoring Integration

### Search Console Integration
```tsx
// Google Search Console verification
const SearchConsoleVerification = () => (
  <Head>
    <meta name="google-site-verification" content="your-verification-code" />
  </Head>
);

// Bing Webmaster Tools verification
const BingVerification = () => (
  <Head>
    <meta name="msvalidate.01" content="your-bing-verification-code" />
  </Head>
);
```

### Performance Monitoring
```tsx
// Web Vitals monitoring
export const reportWebVitals = (metric: NextWebVitalsMetric) => {
  // Send to analytics service
  if (metric.label === 'web-vital') {
    console.log(metric); // Replace with actual analytics
    
    // Example: Send to Google Analytics
    gtag('event', metric.name, {
      event_category: 'Web Vitals',
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      event_label: metric.id,
      non_interaction: true,
    });
  }
};
```

## Error Handling & SEO

### 404 Page Optimization
```tsx
// pages/404.tsx
const Custom404 = () => (
  <>
    <SEOHead
      title="Page Not Found - 404 Error"
      description="The page you're looking for doesn't exist. Visit our home page to explore Fatih Ünal's portfolio."
      noindex
    />
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist.
        </p>
        <div className="space-x-4">
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go Home
          </Link>
          <Link
            href="/projects"
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            View Projects
          </Link>
        </div>
      </div>
    </div>
  </>
);
```

### Redirect Management
```tsx
// next.config.js redirects for SEO
module.exports = {
  async redirects() {
    return [
      {
        source: '/portfolio',
        destination: '/projects',
        permanent: true,
      },
      {
        source: '/work',
        destination: '/projects',
        permanent: true,
      },
      {
        source: '/resume',
        destination: '/about',
        permanent: false,
      }
    ];
  }
};
```

## SEO Testing & Validation

### SEO Audit Component
```tsx
const SEOAudit: React.FC = () => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      // Check for common SEO issues
      const checkSEO = () => {
        // Check for title tag
        const title = document.querySelector('title');
        if (!title || title.textContent!.length > 60) {
          console.warn('SEO: Title tag missing or too long');
        }

        // Check for meta description
        const metaDesc = document.querySelector('meta[name="description"]');
        if (!metaDesc) {
          console.warn('SEO: Meta description missing');
        }

        // Check for H1 tag
        const h1 = document.querySelector('h1');
        if (!h1) {
          console.warn('SEO: H1 tag missing');
        }

        // Check for alt text on images
        const images = document.querySelectorAll('img:not([alt])');
        if (images.length > 0) {
          console.warn(`SEO: ${images.length} images missing alt text`);
        }
      };

      setTimeout(checkSEO, 1000);
    }
  }, []);

  return null;
};
```

### Schema Validation
```tsx
const validateSchema = (schema: any) => {
  // Basic schema validation
  const requiredFields = ['@type', '@context'];
  const missingFields = requiredFields.filter(field => !schema[field]);
  
  if (missingFields.length > 0) {
    console.error('Schema validation failed:', { missingFields, schema });
  }
  
  return missingFields.length === 0;
};
```