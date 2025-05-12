
const PlaylistSkeleton = () => {
  return (
    <div className="flex flex-col justify-start gap-5">
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="flex items-start gap-4 animate-pulse">
          {/* Skeleton Image */}
          <div className="w-16 h-16 bg-zinc-700 rounded" />

          {/* Skeleton Text */}
          <div className="hidden md:flex flex-col gap-2">
            <div className="w-32 h-4 bg-zinc-700 rounded" />
            <div className="w-48 h-3 bg-zinc-600 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlaylistSkeleton;
