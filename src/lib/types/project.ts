export interface Project {
  id: string
  title: string
  slug: string
  shortDescription: string
  fullDescription: string
  technologies: string[]
  category: ProjectCategory
  status: ProjectStatus
  startDate: string
  endDate?: string
  featured: boolean
  images: ProjectImage[]
  links: ProjectLinks
  metrics?: ProjectMetrics
  challenges?: string[]
  highlights?: string[]
}

export interface ProjectImage {
  url: string
  alt: string
  type: 'screenshot' | 'mockup' | 'diagram' | 'logo'
  featured?: boolean
}

export interface ProjectLinks {
  demo?: string
  github?: string
  caseStudy?: string
  design?: string
}

export interface ProjectMetrics {
  duration: string
  teamSize?: number
  impact?: string
  technologies: number
}

export type ProjectCategory = 
  | 'web-application'
  | 'frontend'
  | 'backend'
  | 'mobile'
  | 'open-source'
  | 'learning'

export type ProjectStatus = 'completed' | 'in-progress' | 'archived'

export interface ProjectFilter {
  technologies: string[]
  categories: ProjectCategory[]
  status: ProjectStatus[]
  search: string
}

export interface TechnologyInfo {
  name: string
  category: 'frontend' | 'backend' | 'database' | 'cloud' | 'tools'
  icon?: string
  color?: string
  count: number
}

export interface CategoryInfo {
  id: ProjectCategory
  name: string
  description: string
  icon: string
  count: number
}