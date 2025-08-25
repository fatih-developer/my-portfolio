import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function ProjectCardSkeleton({ featured = false }: { featured?: boolean }) {
  return (
    <Card className={`h-full overflow-hidden ${featured ? 'lg:col-span-2' : ''}`}>
      {/* Image skeleton */}
      <div className="aspect-video">
        <Skeleton className="h-full w-full" />
      </div>

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <Skeleton className="h-6 w-3/4" />
          {featured && <Skeleton className="h-5 w-16" />}
        </div>
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </CardHeader>

      <CardContent className="py-0">
        {/* Technology tags skeleton */}
        <div className="flex flex-wrap gap-1 mb-4">
          {Array.from({ length: featured ? 6 : 4 }).map((_, i) => (
            <Skeleton key={i} className="h-5 w-16" />
          ))}
        </div>

        {/* Metrics skeleton */}
        <div className="flex items-center gap-4 mb-4">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-24" />
        </div>
      </CardContent>

      <CardFooter className="pt-4">
        <div className="flex items-center gap-2 w-full">
          <Skeleton className="h-8 flex-1" />
          <Skeleton className="h-8 flex-1" />
          <Skeleton className="h-8 w-24" />
        </div>
      </CardFooter>
    </Card>
  )
}

export function ProjectGridSkeleton() {
  return (
    <div className="space-y-12">
      {/* Featured Projects Skeleton */}
      <section>
        <div className="mb-8">
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-5 w-96" />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {Array.from({ length: 2 }).map((_, i) => (
            <ProjectCardSkeleton key={i} featured />
          ))}
        </div>
      </section>

      {/* All Projects Skeleton */}
      <section>
        <div className="mb-8">
          <Skeleton className="h-8 w-36 mb-2" />
          <Skeleton className="h-5 w-80" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <ProjectCardSkeleton key={i} />
          ))}
        </div>
      </section>
    </div>
  )
}

export function FiltersSkeleton() {
  return (
    <div className="space-y-6 p-6 bg-card rounded-lg border">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-5 w-16" />
      </div>

      {/* Search */}
      <Skeleton className="h-10 w-full" />

      {/* Status Filter */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-12" />
        <Skeleton className="h-10 w-full" />
      </div>

      {/* Categories */}
      <div className="space-y-3">
        <Skeleton className="h-4 w-20" />
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-6 w-20" />
          ))}
        </div>
      </div>

      {/* Technologies */}
      <div className="space-y-3">
        <Skeleton className="h-4 w-24" />
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-5 w-16" />
          ))}
        </div>
      </div>
    </div>
  )
}