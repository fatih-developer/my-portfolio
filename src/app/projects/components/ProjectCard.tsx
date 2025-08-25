'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Project } from '@/lib/types/project'
import { ExternalLink, Github, Calendar, Users } from 'lucide-react'
import { format } from 'date-fns'

interface ProjectCardProps {
  project: Project
  featured?: boolean
  className?: string
}

const cardVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  },
  hover: {
    y: -5,
    transition: { duration: 0.2, ease: "easeInOut" }
  }
}

const imageVariants = {
  initial: { scale: 1 },
  hover: { 
    scale: 1.05,
    transition: { duration: 0.3, ease: "easeInOut" }
  }
}

export default function ProjectCard({ project, featured = false, className }: ProjectCardProps) {
  const featuredImage = project.images.find(img => img.featured) || project.images[0]
  const statusColors = {
    completed: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    'in-progress': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    archived: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
  }

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      className={className}
    >
      <Card className={`h-full overflow-hidden group ${featured ? 'lg:col-span-2' : ''}`}>
        {/* Project Image */}
        <div className="relative aspect-video overflow-hidden bg-gray-100 dark:bg-gray-800">
          {featuredImage ? (
            <motion.div
              variants={imageVariants}
              className="h-full w-full"
            >
              <Image
                src={featuredImage.url}
                alt={featuredImage.alt}
                fill
                className="object-cover transition-transform duration-300"
                sizes={featured ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 33vw"}
              />
            </motion.div>
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <div className="text-4xl font-bold text-gray-400 dark:text-gray-600">
                {project.title.charAt(0)}
              </div>
            </div>
          )}
          
          {/* Status Badge */}
          <div className="absolute top-3 right-3">
            <Badge variant="secondary" className={statusColors[project.status]}>
              {project.status === 'in-progress' ? 'In Progress' : project.status}
            </Badge>
          </div>
        </div>

        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold leading-tight group-hover:text-primary transition-colors">
              {project.title}
            </h3>
            {project.featured && (
              <Badge variant="outline" className="shrink-0">
                Featured
              </Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {project.shortDescription}
          </p>
        </CardHeader>

        <CardContent className="py-0">
          {/* Technology Tags */}
          <div className="flex flex-wrap gap-1 mb-4">
            {project.technologies.slice(0, featured ? 6 : 4).map((tech) => (
              <Badge key={tech} variant="outline" className="text-xs">
                {tech}
              </Badge>
            ))}
            {project.technologies.length > (featured ? 6 : 4) && (
              <Badge variant="outline" className="text-xs">
                +{project.technologies.length - (featured ? 6 : 4)} more
              </Badge>
            )}
          </div>

          {/* Project Metrics */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{format(new Date(project.startDate), 'MMM yyyy')}</span>
            </div>
            {project.metrics?.teamSize && (
              <div className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                <span>{project.metrics.teamSize} {project.metrics.teamSize === 1 ? 'person' : 'people'}</span>
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="pt-4">
          <div className="flex items-center gap-2 w-full">
            {project.links.demo && (
              <Button variant="default" size="sm" asChild className="flex-1">
                <Link href={project.links.demo} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-3 w-3 mr-1" />
                  Demo
                </Link>
              </Button>
            )}
            {project.links.github && (
              <Button variant="outline" size="sm" asChild className="flex-1">
                <Link href={project.links.github} target="_blank" rel="noopener noreferrer">
                  <Github className="h-3 w-3 mr-1" />
                  Code
                </Link>
              </Button>
            )}
            <Button variant="ghost" size="sm" asChild>
              <Link href={`/projects/${project.slug}`}>
                View Details
              </Link>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}