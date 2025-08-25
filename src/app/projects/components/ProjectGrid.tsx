'use client'

import { motion } from 'framer-motion'
import { Project } from '@/lib/types/project'
import ProjectCard from './ProjectCard'

interface ProjectGridProps {
  projects: Project[]
  showFeatured?: boolean
}

const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
}

export default function ProjectGrid({ projects, showFeatured = true }: ProjectGridProps) {
  const featuredProjects = projects.filter(project => project.featured)
  const regularProjects = projects.filter(project => !project.featured)

  if (projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-lg font-semibold mb-2">No projects found</h3>
        <p className="text-muted-foreground max-w-md">
          Try adjusting your search criteria or clearing the filters to see more projects.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-12">
      {/* Featured Projects */}
      {showFeatured && featuredProjects.length > 0 && (
        <motion.section
          variants={containerVariants}
          initial="initial"
          animate="animate"
        >
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">Featured Projects</h2>
            <p className="text-muted-foreground">
              Highlighted projects showcasing my best work and latest technologies.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {featuredProjects.map((project) => (
              <motion.div key={project.id} variants={itemVariants}>
                <ProjectCard 
                  project={project} 
                  featured 
                  className="lg:col-span-1"
                />
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      {/* All Projects or Regular Projects */}
      <motion.section
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        {showFeatured && featuredProjects.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">All Projects</h2>
            <p className="text-muted-foreground">
              A comprehensive collection of my development work across different technologies.
            </p>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(showFeatured ? projects : regularProjects).map((project) => (
            <motion.div key={project.id} variants={itemVariants}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  )
}