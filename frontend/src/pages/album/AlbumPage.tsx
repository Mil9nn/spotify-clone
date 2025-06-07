import AlbumPageSkeleton from "@/layout/skeletons/AlbumPageSkeleton";
import { useMusicStore } from "@/store/useMusicStore";
import { usePlayerStore } from "@/store/usePlayerStore";
import { CalendarDays, Clock, Menu, Music, Pause, Play } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const AlbumPage = () => {
  const { getAlbumById, selectedAlbum, isLoading, setHideSideBar } = useMusicStore();
  const { currentSong, isPlaying, playAlbum, togglePlay } = usePlayerStore();
  const { albumId } = useParams();

  useEffect(() => {
    getAlbumById(albumId);
  }, [getAlbumById, albumId]);

  if (isLoading) return null;

  if (!selectedAlbum) return <AlbumPageSkeleton />

  const handlePlayAlbum = () => {
    if (!selectedAlbum) return;

    const isCurrentAlbumPlaying = selectedAlbum?.songs.some((song) => song._id === currentSong?._id);
    if (isCurrentAlbumPlaying) {
      togglePlay();
    } else {
      playAlbum(selectedAlbum?.songs);
    }
  }

  const handlePlaySong = (index: number) => {
    if (!selectedAlbum) return;

    playAlbum(selectedAlbum?.songs, index)
  }

  return (
    <div className="">
      <div className="bg-zinc-900 text-white md:h-[85vh] shadow-lg rounded-md relative overflow-hidden">
        {/* Sidebar Menu Button */}
        <button
          className="cursor-pointer md:hidden text-white absolute z-20 top-3 left-3"
          onClick={() => setHideSideBar(false)}
        >
          <Menu />
        </button>

        {/* Background gradient */}
        <div className="absolute top-0 left-0 w-full h-80 bg-gradient-to-b from-[#5038a0] to-transparent z-0 rounded-t-md"></div>

        {/* Album Header Section */}
        <div className="relative z-10 flex flex-col md:flex-row md:items-center items-start gap-4 md:gap-8 p-4 md:p-6">
          <img
            className="w-48 h-48 md:w-60 md:h-60 object-cover rounded-md"
            src={selectedAlbum.imageUrl}
            alt={selectedAlbum.title}
          />
          <div className="flex-1">
            <h2 className="text-sm uppercase tracking-wide text-gray-200 font-medium mb-1">Album</h2>
            <h1 className="text-3xl md:text-5xl font-bold mb-2">{selectedAlbum.title}</h1>
            <p className="text-sm md:text-base text-gray-300 font-semibold">
              {selectedAlbum.artist} • {selectedAlbum.songs.length} songs • {selectedAlbum.releaseYear}
            </p>
          </div>

          {/* Play Button */}
          <div className="absolute md:static bottom-3 right-3 z-20">
            <button
              onClick={handlePlayAlbum}
              className="w-12 h-12 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center shadow-md transition"
            >
              {isPlaying ? <Pause className="text-black" /> : <Play className="text-black" />}
            </button>
          </div>
        </div>

        {/* Song List Table */}
        <div className="h-[255px] md:h-full overflow-auto overflow-x-auto px-4 md:px-6 pb-6">
          <table className="min-w-full divide-y divide-zinc-700 text-left">
            <thead className="bg-zinc-900 text-zinc-400 text-sm">
              <tr>
                <th className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span>#</span>
                  </div>
                </th>
                <th className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Music className="w-4 h-4" />
                    <span>Title</span>
                  </div>
                </th>
                <th className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <CalendarDays className="w-4 h-4" />
                    <span>Release Date</span>
                  </div>
                </th>
                <th className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>Duration</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800 text-sm">
              {selectedAlbum.songs.map((song, index) => {
                const isCurrentSong = currentSong?._id === song._id;
                return (
                  <tr
                    onClick={() => handlePlaySong(index)}
                    key={song._id}
                    className="hover:bg-zinc-800 group transition cursor-pointer"
                  >
                    <td className="p-3 w-12">
                      {isCurrentSong && isPlaying ? (
                        <Music className="text-green-500" />
                      ) : (
                        <>
                          <span className="group-hover:hidden">{index + 1}</span>
                          <Play className="hidden group-hover:block" />
                        </>
                      )}
                    </td>
                    <td className="p-2">
                      <div className="flex items-center gap-4">
                        <img
                          src={song.imageUrl}
                          alt={song.title}
                          className="w-10 h-10 object-cover rounded"
                        />
                        <div>
                          <p className="font-medium text-white">{song.title}</p>
                          <p className="text-zinc-400 text-xs">{song.artist}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-zinc-300">{song.createdAt.split('T')[0]}</td>
                    <td className="px-4 py-4 text-zinc-300">{song.duration}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AlbumPage
