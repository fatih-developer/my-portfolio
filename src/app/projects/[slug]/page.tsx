import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getProjectBySlug, projects } from '@/lib/data/projects'
import ProjectDetailContent from './components/ProjectDetailContent'

interface ProjectPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = getProjectBySlug(params.slug)

  if (!project) {
    return {
      title: 'Project Not Found',
      description: 'The requested project could not be found.'
    }
  }

  const featuredImage = project.images.find(img => img.featured) || project.images[0]

  return {
    title: `${project.title} - Project Details`,
    description: project.shortDescription,
    keywords: [...project.technologies, project.category, 'project', 'portfolio'],
    openGraph: {
      title: `${project.title} - Fatih Ünal Portfolio`,
      description: project.shortDescription,
      type: 'article',
      url: `/projects/${project.slug}`,
      images: featuredImage ? [{
        url: featuredImage.url,
        width: 1200,
        height: 630,
        alt: featuredImage.alt
      }] : [],
      publishedTime: project.startDate,
      modifiedTime: project.endDate || project.startDate,
      authors: ['Fatih Ünal'],
      tags: project.technologies
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} - Fatih Ünal Portfolio`,
      description: project.shortDescription,
      images: featuredImage ? [featuredImage.url] : []
    }
  }
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = getProjectBySlug(params.slug)

  if (!project) {
    notFound()
  }

  const projectIndex = projects.findIndex(p => p.slug === params.slug)
  const previousProject = projectIndex > 0 ? projects[projectIndex - 1] : null
  const nextProject = projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null

  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.fullDescription,
    url: `/projects/${project.slug}`,
    image: project.images.map(img => img.url),
    author: {
      '@type': 'Person',
      name: 'Fatih Ünal',
      url: '/'
    },
    dateCreated: project.startDate,
    dateModified: project.endDate || project.startDate,
    genre: project.technologies,
    keywords: project.technologies.join(', '),
    publisher: {
      '@type': 'Person',
      name: 'Fatih Ünal'
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `/projects/${project.slug}`
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProjectDetailContent 
        project={project}
        previousProject={previousProject}
        nextProject={nextProject}
      />
    </>
  )
}