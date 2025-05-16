export const FeaturedGridSkeleton = () => (
  <div className="mb-8">
    <div className="flex items-center justify-between mb-4">
      <div className="h-6 w-40 bg-zinc-600 rounded animate-pulse" />
      <div className="h-4 w-16 bg-zinc-600 rounded animate-pulse" />
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="group relative flex items-center rounded-lg overflow-hidden p-3 pr-12 bg-zinc-700 animate-pulse"
        >
          <div className="w-15 h-15 bg-zinc-600 rounded-md" />
          <div className="ml-4 flex-1 space-y-2 overflow-hidden">
            <div className="h-4 bg-zinc-600 rounded w-3/4" />
            <div className="h-3 bg-zinc-600 rounded w-1/2" />
          </div>
          <div className="absolute right-3 w-8 h-8 bg-zinc-600 rounded-md" />
        </div>
      ))}
    </div>
  </div>
);