const AlbumPageSkeleton = () => {
  return (
    <div className="relative bg-zinc-900 text-white p-6 shadow-lg h-screen animate-pulse">
      <div className="absolute top-0 left-0 w-full h-85 bg-gradient-to-b from-[#5038a0] to-transparent"></div>

      {/* Album Info */}
      <div className="flex items-center gap-5 relative z-10 mb-5">
        <div className="w-60 h-60 bg-zinc-700 rounded-md mb-4"></div>
        <div className="flex flex-col gap-3">
          <div className="w-16 h-4 bg-zinc-700 rounded"></div>
          <div className="w-64 h-10 bg-zinc-700 rounded"></div>
          <div className="w-48 h-4 bg-zinc-700 rounded"></div>
        </div>
      </div>

      {/* Play Button */}
      <div className="w-12 h-12 rounded-full bg-zinc-700 mb-4"></div>

      {/* Songs List Skeleton */}
      <div className="h-80 overflow-y-auto space-y-4 mt-6">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center gap-4 px-4 py-2">
            <div className="w-4 h-4 bg-zinc-700 rounded"></div>
            <div className="flex items-center gap-4 flex-1">
              <div className="w-14 h-14 bg-zinc-700 rounded"></div>
              <div className="flex flex-col gap-2 w-full">
                <div className="w-1/2 h-4 bg-zinc-700 rounded"></div>
                <div className="w-1/3 h-3 bg-zinc-700 rounded"></div>
              </div>
            </div>
            <div className="w-24 h-4 bg-zinc-700 rounded"></div>
            <div className="w-12 h-4 bg-zinc-700 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlbumPageSkeleton;
