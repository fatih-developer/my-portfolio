# Performance Optimization - Design Document

## Performance Architecture Overview

### Performance System Architecture
```
PerformanceSystem/
├── LoadingOptimization/
│   ├── CriticalResourceLoading
│   ├── CodeSplitting
│   ├── LazyLoading
│   └── Preloading
├── AssetOptimization/
│   ├── ImageOptimization
│   ├── FontOptimization
│   ├── BundleOptimization
│   └── CacheStrategies
├── RenderOptimization/
│   ├── SSROptimization
│   ├── ComponentOptimization
│   ├── StateOptimization
│   └── AnimationOptimization
└── MonitoringAndMeasurement/
    ├── PerformanceMetrics
    ├── RealUserMonitoring
    ├── PerformanceBudgets
    └── ContinuousMonitoring
```

## Core Web Vitals Optimization Strategy

### Largest Contentful Paint (LCP) Optimization
```tsx
// Critical resource preloading for LCP
const LCPOptimization = {
  // Preload critical images
  preloadHeroImage: () => (
    <Head>
      <link
        rel="preload"
        as="image"
        href="/images/hero-bg.webp"
        type="image/webp"
      />
      <link
        rel="preload"
        as="image"
        href="/images/profile-hero.webp"
        type="image/webp"
      />
    </Head>
  ),

  // Critical font preloading
  preloadCriticalFonts: () => (
    <Head>
      <link
        rel="preload"
        href="/fonts/inter-var.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
    </Head>
  ),

  // Critical CSS inlining
  inlineCriticalCSS: () => (
    <style jsx>{`
      /* Critical above-the-fold styles */
      .hero-section {
        min-height: 100vh;
        display: flex;
        align-items: center;
        background: linear-gradient(135deg, #0ea5e9, #3b82f6);
      }
      
      .hero-title {
        font-size: 3rem;
        font-weight: 700;
        color: white;
        line-height: 1.1;
      }
      
      @media (max-width: 768px) {
        .hero-title {
          font-size: 2rem;
        }
      }
    `}</style>
  )
};
```

### Cumulative Layout Shift (CLS) Prevention
```tsx
// Aspect ratio containers to prevent layout shifts
const AspectRatioContainer = styled.div<{ ratio: number }>`
  position: relative;
  width: 100%;
  padding-bottom: ${props => (1 / props.ratio) * 100}%;
  
  > * {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

// Image component with size reservations
const OptimizedImage: React.FC<{
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
}> = ({ src, alt, width, height, priority = false }) => (
  <div style={{ aspectRatio: `${width}/${height}` }}>
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover'
      }}
    />
  </div>
);

// Font loading with proper fallbacks to prevent layout shift
const fontOptimization = {
  fontDisplay: 'swap',
  fallbackFonts: [
    'system-ui',
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Roboto',
    'Helvetica Neue',
    'Arial',
    'sans-serif'
  ]
};
```

### First Input Delay (FID) Optimization
```tsx
// Code splitting for reduced main thread blocking
const OptimizedComponents = {
  // Critical components (loaded immediately)
  Navbar: dynamic(() => import('@/components/Navbar'), { ssr: true }),
  Hero: dynamic(() => import('@/components/Hero'), { ssr: true }),
  
  // Non-critical components (lazy loaded)
  Skills: dynamic(() => import('@/components/Skills'), {
    loading: () => <SkillsSkeleton />,
    ssr: false
  }),
  
  Projects: dynamic(() => import('@/components/Projects'), {
    loading: () => <ProjectsSkeleton />,
    ssr: false
  }),
  
  Contact: dynamic(() => import('@/components/Contact'), {
    loading: () => <ContactSkeleton />,
    ssr: false
  })
};

// Efficient event handling to minimize input delay
const useOptimizedEventHandler = () => {
  const handleClick = useCallback(
    debounce((event: React.MouseEvent) => {
      // Handle click with minimal processing
      event.preventDefault();
      // Efficient state updates
    }, 16), // ~60fps
    []
  );

  return { handleClick };
};

// Web Worker for heavy computations
const useWebWorker = (workerScript: string) => {
  const [worker, setWorker] = useState<Worker | null>(null);

  useEffect(() => {
    const w = new Worker(workerScript);
    setWorker(w);
    
    return () => w.terminate();
  }, [workerScript]);

  const postMessage = useCallback((data: any) => {
    worker?.postMessage(data);
  }, [worker]);

  return { worker, postMessage };
};
```

## Asset Optimization Strategies

### Image Optimization System
```tsx
// Next.js Image optimization configuration
const imageOptimization = {
  domains: ['images.unsplash.com', 'cdn.example.com'],
  formats: ['image/avif', 'image/webp'],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
  dangerouslyAllowSVG: false,
  contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;"
};

// Progressive image loading component
const ProgressiveImage: React.FC<{
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}> = ({ src, alt, width, height, className }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div className={`relative ${className}`}>
      {!imageLoaded && !imageError && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded" />
      )}
      
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        onLoad={() => setImageLoaded(true)}
        onError={() => setImageError(true)}
        className={`transition-opacity duration-200 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        priority={false}
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,..."
      />
      
      {imageError && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <span className="text-gray-400">Image unavailable</span>
        </div>
      )}
    </div>
  );
};

// Lazy loading with Intersection Observer
const useLazyLoading = (threshold = 0.1) => {
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
      { threshold, rootMargin: '50px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
};
```

### Font Optimization Strategy
```tsx
// Font loading optimization
const fontOptimization = {
  // Critical font preloading
  preloadFonts: [
    {
      href: '/fonts/inter-var.woff2',
      type: 'font/woff2',
      weight: '100 900'
    }
  ],
  
  // Font display strategy
  fontDisplaySwap: `
    @font-face {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 100 900;
      font-display: swap;
      src: url('/fonts/inter-var.woff2') format('woff2');
    }
  `,
  
  // System font fallbacks
  fontStack: [
    'Inter',
    'system-ui',
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Roboto',
    'Helvetica Neue',
    'Arial',
    'sans-serif'
  ]
};

// Font loading hook with fallback
const useFontLoading = () => {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    if (document.fonts) {
      document.fonts.ready.then(() => {
        setFontLoaded(true);
      });
    } else {
      // Fallback for older browsers
      setTimeout(() => setFontLoaded(true), 3000);
    }
  }, []);

  return fontLoaded;
};
```

### Bundle Optimization Configuration
```typescript
// Next.js bundle optimization
const nextConfig = {
  experimental: {
    optimizeCss: true,
    esmExternals: true
  },
  
  // Bundle analyzer integration
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Bundle splitting optimization
    config.optimization.splitChunks = {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          enforce: true
        },
        common: {
          minChunks: 2,
          chunks: 'all',
          enforce: true
        }
      }
    };

    // Tree shaking optimization
    config.optimization.usedExports = true;
    config.optimization.sideEffects = false;

    // Compression
    if (!dev) {
      config.plugins.push(
        new webpack.optimize.LimitChunkCountPlugin({
          maxChunks: 5
        })
      );
    }

    return config;
  },
  
  // Compression configuration
  compress: true,
  
  // Image optimization
  images: imageOptimization,
  
  // Static optimization
  trailingSlash: false,
  
  // Headers for caching
  async headers() {
    return [
      {
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      {
        source: '/fonts/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      }
    ];
  }
};
```

## React Performance Optimization

### Component Optimization Strategies
```tsx
// Memoization for expensive computations
const ExpensiveComponent = memo(({ data }: { data: any[] }) => {
  const expensiveValue = useMemo(() => {
    return data.reduce((acc, item) => {
      // Expensive computation
      return acc + item.value;
    }, 0);
  }, [data]);

  return <div>{expensiveValue}</div>;
});

// Callback optimization
const OptimizedParent = () => {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState<string[]>([]);

  // Memoized callback to prevent child re-renders
  const handleItemClick = useCallback(
    (itemId: string) => {
      setItems(prev => prev.filter(id => id !== itemId));
    },
    []
  );

  // Memoized callback for count updates
  const increment = useCallback(() => {
    setCount(prev => prev + 1);
  }, []);

  return (
    <div>
      <button onClick={increment}>Count: {count}</button>
      <ItemList items={items} onItemClick={handleItemClick} />
    </div>
  );
};

// Virtual scrolling for large lists
const VirtualizedList: React.FC<{
  items: any[];
  itemHeight: number;
  containerHeight: number;
}> = ({ items, itemHeight, containerHeight }) => {
  const [scrollTop, setScrollTop] = useState(0);

  const visibleItemCount = Math.ceil(containerHeight / itemHeight);
  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(startIndex + visibleItemCount, items.length);
  const visibleItems = items.slice(startIndex, endIndex);

  const totalHeight = items.length * itemHeight;
  const offsetY = startIndex * itemHeight;

  return (
    <div
      style={{ height: containerHeight, overflow: 'auto' }}
      onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
    >
      <div style={{ height: totalHeight }}>
        <div style={{ transform: `translateY(${offsetY}px)` }}>
          {visibleItems.map((item, index) => (
            <div
              key={startIndex + index}
              style={{ height: itemHeight }}
            >
              {/* Item content */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
```

### State Management Optimization
```tsx
// Optimized context to prevent unnecessary re-renders
const ThemeContext = createContext<{
  theme: Theme;
  setTheme: (theme: Theme) => void;
} | null>(null);

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>('light');

  // Memoize context value
  const value = useMemo(
    () => ({ theme, setTheme }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// Split context for different concerns
const UserContext = createContext<User | null>(null);
const UserDispatchContext = createContext<Dispatch<UserAction> | null>(null);

// Optimized reducer with immer for immutable updates
const userReducer = produce((draft: User, action: UserAction) => {
  switch (action.type) {
    case 'UPDATE_PROFILE':
      draft.profile = action.payload;
      break;
    case 'UPDATE_PREFERENCES':
      draft.preferences = action.payload;
      break;
  }
});
```

## Animation Performance Optimization

### Hardware-Accelerated Animations
```tsx
// Use transform and opacity for smooth animations
const AnimatedComponent = styled(motion.div)`
  /* Hardware acceleration triggers */
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000px;
  
  /* Smooth animations */
  transition: transform 0.2s ease, opacity 0.2s ease;
`;

// Framer Motion performance optimizations
const motionVariants = {
  // Use transform properties for performance
  initial: { 
    opacity: 0, 
    y: 20,
    scale: 0.95
  },
  animate: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 300
    }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    scale: 0.95,
    transition: { duration: 0.2 }
  }
};

// Optimized scroll-triggered animations
const useScrollAnimation = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { 
    once: true, 
    margin: "-100px" 
  });

  return { ref, isInView };
};

// Reduced motion support
const useReducedMotion = () => {
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  
  return useMemo(() => ({
    transition: prefersReducedMotion ? { duration: 0 } : undefined,
    initial: prefersReducedMotion ? false : undefined
  }), [prefersReducedMotion]);
};
```

### Efficient Animation Implementation
```tsx
// CSS-based animations for simple effects
const pulseAnimation = css`
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
  
  .pulse {
    animation: pulse 2s infinite;
  }
`;

// requestAnimationFrame for complex animations
const useRAF = (callback: () => void, deps: any[]) => {
  const rafRef = useRef<number>();

  useEffect(() => {
    const tick = () => {
      callback();
      rafRef.current = requestAnimationFrame(tick);
    };
    
    rafRef.current = requestAnimationFrame(tick);
    
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, deps);
};

// Intersection Observer for scroll animations
const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, {
      threshold: 0.1,
      rootMargin: '0px',
      ...options
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return { ref, isIntersecting };
};
```

## Caching and Storage Strategies

### Service Worker Implementation
```typescript
// Service Worker for caching strategy
const CACHE_NAME = 'portfolio-v1';
const STATIC_ASSETS = [
  '/',
  '/about',
  '/projects',
  '/contact',
  '/fonts/inter-var.woff2',
  '/images/profile.webp'
];

// Install event
self.addEventListener('install', (event: ExtendableEvent) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(STATIC_ASSETS))
  );
});

// Fetch event with cache-first strategy for static assets
self.addEventListener('fetch', (event: FetchEvent) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      })
  );
});

// Background sync for offline form submissions
self.addEventListener('sync', (event: SyncEvent) => {
  if (event.tag === 'contact-form') {
    event.waitUntil(syncContactForm());
  }
});
```

### Browser Caching Configuration
```typescript
// HTTP caching headers configuration
const cacheHeaders = {
  // Static assets (1 year)
  staticAssets: {
    'Cache-Control': 'public, max-age=31536000, immutable'
  },
  
  // HTML pages (1 hour with revalidation)
  htmlPages: {
    'Cache-Control': 'public, max-age=3600, must-revalidate'
  },
  
  // API responses (5 minutes)
  apiResponses: {
    'Cache-Control': 'public, max-age=300, s-maxage=300'
  },
  
  // Images (1 week)
  images: {
    'Cache-Control': 'public, max-age=604800, immutable'
  }
};

// localStorage optimization for user preferences
const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      if (typeof window !== 'undefined') {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      }
      return initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setValue] as const;
};
```

## Performance Monitoring System

### Real User Monitoring (RUM)
```tsx
// Performance monitoring hook
const usePerformanceMonitoring = () => {
  useEffect(() => {
    // Monitor Core Web Vitals
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(console.log);
      getFID(console.log);
      getFCP(console.log);
      getLCP(console.log);
      getTTFB(console.log);
    });

    // Monitor custom performance metrics
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        // Log performance entries
        console.log(entry);
      }
    });

    observer.observe({ entryTypes: ['measure', 'navigation', 'resource'] });

    return () => observer.disconnect();
  }, []);
};

// Performance budget monitoring
const PERFORMANCE_BUDGETS = {
  maxBundleSize: 200 * 1024, // 200KB
  maxImageSize: 500 * 1024,  // 500KB
  maxTTI: 3500,              // 3.5 seconds
  maxLCP: 2500,              // 2.5 seconds
  maxCLS: 0.1,               // 0.1 layout shift
  maxFID: 100                // 100ms
};

const checkPerformanceBudgets = (metrics: PerformanceMetrics) => {
  const violations = [];
  
  if (metrics.bundleSize > PERFORMANCE_BUDGETS.maxBundleSize) {
    violations.push('Bundle size exceeds budget');
  }
  
  if (metrics.LCP > PERFORMANCE_BUDGETS.maxLCP) {
    violations.push('LCP exceeds budget');
  }
  
  // ... other checks
  
  return violations;
};
```

### Continuous Performance Testing
```typescript
// Automated performance testing
const performanceTest = async (url: string) => {
  const lighthouse = await import('lighthouse');
  const chrome = await import('chrome-launcher');
  
  const chromeInstance = await chrome.launch({ chromeFlags: ['--headless'] });
  
  try {
    const results = await lighthouse(url, {
      port: chromeInstance.port,
      onlyCategories: ['performance'],
      settings: {
        onlyAudits: [
          'first-contentful-paint',
          'largest-contentful-paint',
          'first-input-delay',
          'cumulative-layout-shift',
          'speed-index',
          'interactive'
        ]
      }
    });

    return {
      performance: results.lhr.categories.performance.score * 100,
      metrics: {
        FCP: results.lhr.audits['first-contentful-paint'].numericValue,
        LCP: results.lhr.audits['largest-contentful-paint'].numericValue,
        FID: results.lhr.audits['max-potential-fid'].numericValue,
        CLS: results.lhr.audits['cumulative-layout-shift'].numericValue,
        SI: results.lhr.audits['speed-index'].numericValue,
        TTI: results.lhr.audits['interactive'].numericValue
      }
    };
  } finally {
    await chromeInstance.kill();
  }
};

// Performance regression detection
const detectPerformanceRegression = (
  currentMetrics: PerformanceMetrics,
  baselineMetrics: PerformanceMetrics,
  threshold = 0.1 // 10% regression threshold
) => {
  const regressions = [];
  
  for (const [metric, currentValue] of Object.entries(currentMetrics)) {
    const baselineValue = baselineMetrics[metric as keyof PerformanceMetrics];
    const regression = (currentValue - baselineValue) / baselineValue;
    
    if (regression > threshold) {
      regressions.push({
        metric,
        regression: Math.round(regression * 100),
        current: currentValue,
        baseline: baselineValue
      });
    }
  }
  
  return regressions;
};
```