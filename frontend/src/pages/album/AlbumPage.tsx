import AlbumPageSkeleton from "@/layout/skeletons/AlbumPageSkeleton";
import { useMusicStore } from "@/store/useMusicStore";
import { usePlayerStore } from "@/store/usePlayerStore";
import { CalendarDays, Clock, Music, Pause, Play } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const AlbumPage = () => {
  const { getAlbumById, selectedAlbum, isLoading } = useMusicStore();
  const { currentSong, isPlaying, playAlbum, togglePlay } = usePlayerStore();
  const { albumId } = useParams();

  useEffect(() => {
    getAlbumById(albumId);
  }, [getAlbumById, albumId]);

  if (isLoading) return null;

  if (!selectedAlbum) return <AlbumPageSkeleton />

  const handlePlayAlbum = () => {
    if(!selectedAlbum) return;

    const isCurrentAlbumPlaying = selectedAlbum?.songs.some((song) => song._id === currentSong?._id);
    if(isCurrentAlbumPlaying) {
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
      <div className="relative bg-zinc-900 text-white p-6 shadow-lg h-[86vh] rounded-md">
        <div className="absolute top-0 left-0 w-full h-85 bg-gradient-to-b from-[#5038a0] to-transparent rounded-md"></div>

        <div className="flex items-center gap-5 relative z-10 mb-5">
          <img
            className="w-60 h-60 object-cover rounded-md mb-4"
            src={selectedAlbum.imageUrl}
            alt={selectedAlbum.title}
          />
          <div>
            <h2 className="text-sm uppercase tracking-wide text-gray-200 mb-1 font-medium">Album</h2>
            <p className="text-5xl font-bold mb-2">{selectedAlbum.title}</p>
            <p className="text-sm text-gray-300 font-semibold">
              {selectedAlbum.artist} • {selectedAlbum.songs.length} songs • {selectedAlbum.releaseYear}
            </p>
          </div>

          <button onClick={handlePlayAlbum} className="absolute -bottom-5 w-12 h-12 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center shadow-md transition">
          {isPlaying ? (<Pause className="text-black" />) : (<Play className="text-black" />)}
        </button>
        </div>

        {/* song list */}
        <div className="relative h-80 overflow-y-auto pb-10">
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
                  <tr onClick={() => {handlePlaySong(index)}} key={song._id} className="hover:bg-zinc-800 group transition">
                    <td className="p-3 w-13">
                      {isCurrentSong && isPlaying ? (<Music className="text-green-500" />) : (<span className="group-hover:hidden">{index + 1}</span>)}
                      {!isCurrentSong && <Play className="hidden group-hover:block" />}
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
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>)
}

export default AlbumPage
