import { Card, Skeleton } from '@/components/ui'

export default function AdminDashboardLoading() {
  return (
    <div className="p-8 pb-12 overflow-y-auto max-h-[calc(100vh-64px)]">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
        <div className="space-y-2">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-4 w-32" />
        </div>
        <div className="flex gap-4 mt-6 md:mt-0">
          <Skeleton className="h-10 w-28" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="bg-dark-900/40 border-white/5 p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2 flex-1">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-8 w-12" />
                <Skeleton className="h-3 w-16" />
              </div>
              <Skeleton className="w-14 h-14 rounded-2xl" />
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Blog Posts Skeleton */}
        <Card className="border-white/5 bg-dark-900/40 p-0 overflow-hidden">
          <div className="p-6 border-b border-white/5 flex justify-between items-center">
            <div className="space-y-2">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-3 w-48" />
            </div>
            <Skeleton className="h-4 w-16" />
          </div>
          <div className="divide-y divide-white/5">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="p-4 space-y-2">
                <Skeleton className="h-5 w-3/4" />
                <div className="flex gap-2">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Research Skeleton */}
        <Card className="border-white/5 bg-dark-900/40 p-0 overflow-hidden">
          <div className="p-6 border-b border-white/5 flex justify-between items-center">
            <div className="space-y-2">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-3 w-48" />
            </div>
            <Skeleton className="h-4 w-16" />
          </div>
          <div className="divide-y divide-white/5">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="p-4 space-y-2">
                <Skeleton className="h-5 w-3/4" />
                <div className="flex gap-2">
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
