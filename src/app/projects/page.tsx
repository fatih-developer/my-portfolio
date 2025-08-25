import { Metadata } from 'next'
import ProjectsContent from './components/ProjectsContent'

export const metadata: Metadata = {
  title: 'Portfolio Projects - React & TypeScript Developer',
  description: 'Explore my latest web development projects built with React, TypeScript, Next.js, Node.js, and other modern technologies.',
  keywords: ['portfolio projects', 'React projects', 'TypeScript projects', 'web development portfolio', 'Next.js applications'],
  openGraph: {
    title: 'Portfolio Projects by Fatih Ünal - React & TypeScript Developer',
    description: 'Explore my latest web development projects built with React, TypeScript, Next.js, and other modern technologies.',
    type: 'website',
    url: '/projects',
    images: [
      {
        url: '/images/projects-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Fatih Ünal Portfolio Projects'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio Projects by Fatih Ünal - React & TypeScript Developer',
    description: 'Explore my latest web development projects built with React, TypeScript, Next.js, and other modern technologies.',
    images: ['/images/projects-og.jpg']
  }
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Portfolio Projects',
  description: 'A collection of web development projects by Fatih Ünal',
  url: '/projects',
  author: {
    '@type': 'Person',
    name: 'Fatih Ünal',
    url: '/'
  }
}

export default function ProjectsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProjectsContent />
    </>
  )
}