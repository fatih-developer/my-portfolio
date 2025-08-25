import { ProjectGridSkeleton, FiltersSkeleton } from './components/LoadingSkeleton'

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Page Header Skeleton */}
      <header className="text-center mb-16">
        <div className="h-12 w-64 bg-gray-200 dark:bg-gray-800 rounded-lg mx-auto mb-4 animate-pulse" />
        <div className="h-6 w-96 bg-gray-200 dark:bg-gray-800 rounded mx-auto mb-2 animate-pulse" />
        <div className="h-6 w-80 bg-gray-200 dark:bg-gray-800 rounded mx-auto mb-6 animate-pulse" />
        <div className="flex items-center justify-center gap-4">
          <div className="h-4 w-24 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
          <div className="h-4 w-px bg-gray-300" />
          <div className="h-4 w-20 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
          <div className="h-4 w-px bg-gray-300" />
          <div className="h-4 w-20 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar Skeleton */}
        <aside className="lg:col-span-1">
          <FiltersSkeleton />
        </aside>

        {/* Projects Grid Skeleton */}
        <main className="lg:col-span-3">
          <ProjectGridSkeleton />
        </main>
      </div>
    </div>
  )
}