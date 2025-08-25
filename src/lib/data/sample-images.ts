// Sample placeholder images for development
// Replace these with actual project images when available

export const placeholderImages = {
  portfolio: {
    hero: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop&crop=entropy',
    projects: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=450&fit=crop&crop=entropy',
    mobile: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=600&fit=crop&crop=entropy'
  },
  dashboard: {
    overview: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop&crop=entropy',
    products: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=450&fit=crop&crop=entropy',
    analytics: 'https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?w=800&h=450&fit=crop&crop=entropy'
  },
  taskManager: {
    board: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=450&fit=crop&crop=entropy',
    details: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&h=450&fit=crop&crop=entropy'
  },
  weatherApi: {
    docs: 'https://images.unsplash.com/photo-1527474305487-b87b222841cc?w=800&h=450&fit=crop&crop=entropy'
  },
  componentLibrary: {
    storybook: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=450&fit=crop&crop=entropy'
  },
  learningPlatform: {
    interface: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=450&fit=crop&crop=entropy'
  }
}

// Function to get project images with placeholder fallbacks
export function getProjectImage(projectSlug: string, imageType: string): string {
  const projectImages = placeholderImages[projectSlug as keyof typeof placeholderImages]
  
  if (projectImages && imageType in projectImages) {
    return projectImages[imageType as keyof typeof projectImages]
  }
  
  // Fallback to a generic placeholder
  return 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop&crop=entropy'
}