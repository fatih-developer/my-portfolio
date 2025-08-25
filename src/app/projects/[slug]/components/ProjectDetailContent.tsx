'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Project } from '@/lib/types/project'
import { 
  ArrowLeft, 
  ExternalLink, 
  Github, 
  Calendar, 
  Users, 
  Clock,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  Archive
} from 'lucide-react'
import { format } from 'date-fns'

interface ProjectDetailContentProps {
  project: Project
  previousProject: Project | null
  nextProject: Project | null
}

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
}

const imageVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.8,
      delay: 0.2,
      ease: "easeOut"
    }
  }
}

export default function ProjectDetailContent({
  project,
  previousProject,
  nextProject
}: ProjectDetailContentProps) {
  const featuredImage = project.images.find(img => img.featured) || project.images[0]
  
  const statusConfig = {
    completed: {
      icon: CheckCircle,
      label: 'Completed',
      color: 'text-green-600',
      bg: 'bg-green-50 dark:bg-green-950'
    },
    'in-progress': {
      icon: AlertCircle,
      label: 'In Progress',
      color: 'text-blue-600',
      bg: 'bg-blue-50 dark:bg-blue-950'
    },
    archived: {
      icon: Archive,
      label: 'Archived',
      color: 'text-gray-600',
      bg: 'bg-gray-50 dark:bg-gray-950'
    }
  }

  const status = statusConfig[project.status]
  const StatusIcon = status.icon

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      className="container mx-auto px-4 py-8"
    >
      {/* Back Navigation */}
      <div className="mb-8">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/projects">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Projects
          </Link>
        </Button>
        
        {/* Breadcrumb */}
        <nav className="text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">Home</Link>
          {' > '}
          <Link href="/projects" className="hover:text-foreground">Projects</Link>
          {' > '}
          <span className="text-foreground">{project.title}</span>
        </nav>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Hero Section */}
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl md:text-4xl font-bold">{project.title}</h1>
                  {project.featured && (
                    <Badge variant="secondary">Featured</Badge>
                  )}
                </div>
                
                <div className="flex items-center gap-2 mb-4">
                  <StatusIcon className={`h-4 w-4 ${status.color}`} />
                  <span className={`text-sm font-medium ${status.color}`}>
                    {status.label}
                  </span>
                </div>
                
                <p className="text-lg text-muted-foreground">
                  {project.shortDescription}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              {project.links.demo && (
                <Button asChild>
                  <Link href={project.links.demo} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Demo
                  </Link>
                </Button>
              )}
              {project.links.github && (
                <Button variant="outline" asChild>
                  <Link href={project.links.github} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4 mr-2" />
                    View Code
                  </Link>
                </Button>
              )}
              {project.links.caseStudy && (
                <Button variant="outline" asChild>
                  <Link href={project.links.caseStudy} target="_blank" rel="noopener noreferrer">
                    Case Study
                  </Link>
                </Button>
              )}
            </div>
          </div>

          {/* Featured Image */}
          {featuredImage && (
            <motion.div
              variants={imageVariants}
              className="relative aspect-video rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800"
            >
              <Image
                src={featuredImage.url}
                alt={featuredImage.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 66vw"
                priority
              />
            </motion.div>
          )}

          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle>Project Overview</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray dark:prose-invert max-w-none">
              <p>{project.fullDescription}</p>
            </CardContent>
          </Card>

          {/* Technologies */}
          <Card>
            <CardHeader>
              <CardTitle>Technologies Used</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Challenges */}
          {project.challenges && project.challenges.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Challenges & Solutions</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {project.challenges.map((challenge, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0" />
                      <span className="text-muted-foreground">{challenge}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Highlights */}
          {project.highlights && project.highlights.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Key Highlights</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {project.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Additional Images */}
          {project.images.length > 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Gallery</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.images.filter(img => !img.featured).map((image, index) => (
                    <div key={index} className="relative aspect-video rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                      <Image
                        src={image.url}
                        alt={image.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Project Info */}
          <Card>
            <CardHeader>
              <CardTitle>Project Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="text-sm font-medium">Timeline</div>
                  <div className="text-sm text-muted-foreground">
                    {format(new Date(project.startDate), 'MMM yyyy')}
                    {project.endDate && ` - ${format(new Date(project.endDate), 'MMM yyyy')}`}
                  </div>
                </div>
              </div>

              {project.metrics?.duration && (
                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-sm font-medium">Duration</div>
                    <div className="text-sm text-muted-foreground">
                      {project.metrics.duration}
                    </div>
                  </div>
                </div>
              )}

              {project.metrics?.teamSize && (
                <div className="flex items-center gap-3">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-sm font-medium">Team Size</div>
                    <div className="text-sm text-muted-foreground">
                      {project.metrics.teamSize} {project.metrics.teamSize === 1 ? 'person' : 'people'}
                    </div>
                  </div>
                </div>
              )}

              {project.metrics?.impact && (
                <div>
                  <div className="text-sm font-medium mb-1">Impact</div>
                  <div className="text-sm text-muted-foreground">
                    {project.metrics.impact}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Navigation */}
          {(previousProject || nextProject) && (
            <Card>
              <CardHeader>
                <CardTitle>Other Projects</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {previousProject && (
                  <Link
                    href={`/projects/${previousProject.slug}`}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <ChevronLeft className="h-4 w-4 text-muted-foreground" />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-muted-foreground uppercase tracking-wider">
                        Previous
                      </div>
                      <div className="font-medium truncate">
                        {previousProject.title}
                      </div>
                    </div>
                  </Link>
                )}

                {nextProject && (
                  <Link
                    href={`/projects/${nextProject.slug}`}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-muted-foreground uppercase tracking-wider">
                        Next
                      </div>
                      <div className="font-medium truncate">
                        {nextProject.title}
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </Link>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </motion.div>
  )
}