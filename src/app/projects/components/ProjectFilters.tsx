'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select'
import { ProjectFilter, ProjectCategory, ProjectStatus } from '@/lib/types/project'
import { categories, technologies } from '@/lib/data/projects'
import { Search, X, Filter } from 'lucide-react'

interface ProjectFiltersProps {
  filters: ProjectFilter
  onFiltersChange: (filters: ProjectFilter) => void
  totalProjects: number
  filteredCount: number
}

export default function ProjectFilters({
  filters,
  onFiltersChange,
  totalProjects,
  filteredCount
}: ProjectFiltersProps) {
  const [searchInput, setSearchInput] = useState(filters.search)

  const handleSearchChange = (value: string) => {
    setSearchInput(value)
    onFiltersChange({ ...filters, search: value })
  }

  const handleCategoryToggle = (category: ProjectCategory) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category]
    
    onFiltersChange({ ...filters, categories: newCategories })
  }

  const handleTechnologyToggle = (technology: string) => {
    const newTechnologies = filters.technologies.includes(technology)
      ? filters.technologies.filter(t => t !== technology)
      : [...filters.technologies, technology]
    
    onFiltersChange({ ...filters, technologies: newTechnologies })
  }

  const handleStatusChange = (status: string) => {
    const newStatus = status === 'all' ? [] : [status as ProjectStatus]
    onFiltersChange({ ...filters, status: newStatus })
  }

  const clearAllFilters = () => {
    setSearchInput('')
    onFiltersChange({
      search: '',
      categories: [],
      technologies: [],
      status: []
    })
  }

  const hasActiveFilters = filters.search || 
    filters.categories.length > 0 || 
    filters.technologies.length > 0 || 
    filters.status.length > 0

  return (
    <div className="space-y-6 p-6 bg-card rounded-lg border">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          <h2 className="font-semibold">Filters</h2>
          <Badge variant="secondary" className="ml-2">
            {filteredCount} of {totalProjects}
          </Badge>
        </div>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            Clear All
            <X className="h-3 w-3 ml-1" />
          </Button>
        )}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search projects..."
          value={searchInput}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Status Filter */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Status</label>
        <Select
          value={filters.status.length === 0 ? 'all' : filters.status[0]}
          onValueChange={handleStatusChange}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Categories */}
      <div className="space-y-3">
        <label className="text-sm font-medium">Categories</label>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Badge
              key={category.id}
              variant={filters.categories.includes(category.id) ? "default" : "outline"}
              className="cursor-pointer hover:bg-primary/10 transition-colors"
              onClick={() => handleCategoryToggle(category.id)}
            >
              {category.name}
              {category.count > 0 && (
                <span className="ml-1 text-xs opacity-75">
                  ({category.count})
                </span>
              )}
            </Badge>
          ))}
        </div>
      </div>

      {/* Technologies */}
      <div className="space-y-3">
        <label className="text-sm font-medium">Technologies</label>
        <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
          {technologies
            .filter(tech => tech.count > 0)
            .sort((a, b) => b.count - a.count)
            .map((tech) => (
            <Badge
              key={tech.name}
              variant={filters.technologies.includes(tech.name) ? "default" : "outline"}
              className="cursor-pointer hover:bg-primary/10 transition-colors text-xs"
              onClick={() => handleTechnologyToggle(tech.name)}
              style={{
                borderColor: filters.technologies.includes(tech.name) ? tech.color : undefined,
                backgroundColor: filters.technologies.includes(tech.name) ? `${tech.color}20` : undefined
              }}
            >
              {tech.name}
              <span className="ml-1 text-xs opacity-75">
                ({tech.count})
              </span>
            </Badge>
          ))}
        </div>
      </div>

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <div className="pt-4 border-t space-y-2">
          <div className="text-sm font-medium">Active Filters:</div>
          <div className="flex flex-wrap gap-2">
            {filters.search && (
              <Badge variant="secondary" className="gap-1">
                Search: &ldquo;{filters.search}&rdquo;
                <X 
                  className="h-3 w-3 cursor-pointer hover:text-destructive" 
                  onClick={() => handleSearchChange('')}
                />
              </Badge>
            )}
            {filters.categories.map((category) => (
              <Badge key={category} variant="secondary" className="gap-1">
                {categories.find(c => c.id === category)?.name}
                <X 
                  className="h-3 w-3 cursor-pointer hover:text-destructive" 
                  onClick={() => handleCategoryToggle(category)}
                />
              </Badge>
            ))}
            {filters.technologies.map((tech) => (
              <Badge key={tech} variant="secondary" className="gap-1">
                {tech}
                <X 
                  className="h-3 w-3 cursor-pointer hover:text-destructive" 
                  onClick={() => handleTechnologyToggle(tech)}
                />
              </Badge>
            ))}
            {filters.status.map((status) => (
              <Badge key={status} variant="secondary" className="gap-1">
                {status === 'in-progress' ? 'In Progress' : status}
                <X 
                  className="h-3 w-3 cursor-pointer hover:text-destructive" 
                  onClick={() => handleStatusChange('all')}
                />
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}