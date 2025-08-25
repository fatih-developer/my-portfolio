'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { ProjectFilter } from '@/lib/types/project'
import { projects } from '@/lib/data/projects'
import ProjectGrid from './ProjectGrid'
import ProjectFilters from './ProjectFilters'
import ErrorBoundary from './ErrorBoundary'
import { Separator } from '@/components/ui/separator'

const headerVariants = {
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

const contentVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      delay: 0.2,
      ease: "easeOut"
    }
  }
}

export default function ProjectsContent() {
  const [filters, setFilters] = useState<ProjectFilter>({
    search: '',
    categories: [],
    technologies: [],
    status: []
  })

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase()
        const matchesSearch = 
          project.title.toLowerCase().includes(searchLower) ||
          project.shortDescription.toLowerCase().includes(searchLower) ||
          project.fullDescription.toLowerCase().includes(searchLower) ||
          project.technologies.some(tech => tech.toLowerCase().includes(searchLower))
        
        if (!matchesSearch) return false
      }

      // Category filter
      if (filters.categories.length > 0) {
        if (!filters.categories.includes(project.category)) return false
      }

      // Technology filter
      if (filters.technologies.length > 0) {
        const hasMatchingTech = filters.technologies.some(tech => 
          project.technologies.includes(tech)
        )
        if (!hasMatchingTech) return false
      }

      // Status filter
      if (filters.status.length > 0) {
        if (!filters.status.includes(project.status)) return false
      }

      return true
    })
  }, [filters])

  const handleFiltersChange = (newFilters: ProjectFilter) => {
    setFilters(newFilters)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Page Header */}
      <motion.header 
        variants={headerVariants}
        initial="initial"
        animate="animate"
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          My Projects
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          A collection of web applications, tools, and experiments built with modern technologies. 
          Each project represents a learning journey and showcases different aspects of full-stack development.
        </p>
        <div className="flex items-center justify-center gap-4 mt-6 text-sm text-muted-foreground">
          <span>{projects.length} Total Projects</span>
          <Separator orientation="vertical" className="h-4" />
          <span>{projects.filter(p => p.featured).length} Featured</span>
          <Separator orientation="vertical" className="h-4" />
          <span>{projects.filter(p => p.status === 'completed').length} Completed</span>
        </div>
      </motion.header>

      <motion.div
        variants={contentVariants}
        initial="initial"
        animate="animate"
        className="grid grid-cols-1 lg:grid-cols-4 gap-8"
      >
        {/* Filters Sidebar */}
        <aside className="lg:col-span-1">
          <div className="sticky top-24">
            <ErrorBoundary>
              <ProjectFilters
                filters={filters}
                onFiltersChange={handleFiltersChange}
                totalProjects={projects.length}
                filteredCount={filteredProjects.length}
              />
            </ErrorBoundary>
          </div>
        </aside>

        {/* Projects Grid */}
        <main className="lg:col-span-3">
          <ErrorBoundary>
            <ProjectGrid 
              projects={filteredProjects}
              showFeatured={filters.search === '' && 
                filters.categories.length === 0 && 
                filters.technologies.length === 0 && 
                filters.status.length === 0}
            />
          </ErrorBoundary>
        </main>
      </motion.div>
    </div>
  )
}