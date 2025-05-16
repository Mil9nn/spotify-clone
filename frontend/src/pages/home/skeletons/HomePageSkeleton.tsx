

export const GridSongSectionSkeleton = ({ title }: { title: string }) => (
  <section className="mb-8">
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-lg font-semibold text-white">{title}</h2>
      <div className="h-4 w-16 bg-zinc-600 rounded animate-pulse" />
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="rounded-lg bg-zinc-700 animate-pulse overflow-hidden"
        >
          <div className="h-40 bg-zinc-600" />
          <div className="p-3 space-y-2">
            <div className="h-4 bg-zinc-600 rounded w-3/4" />
            <div className="h-3 bg-zinc-600 rounded w-1/2" />
          </div>
        </div>
      ))}
    </div>
  </section>
);
