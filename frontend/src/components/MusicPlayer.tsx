import { useEffect, useRef } from "react";
import { usePlayerStore } from "@/store/usePlayerStore";
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeOff, ListMusic, Text } from "lucide-react";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const prevSongRef = useRef<string | null>(null);

  const {
    currentSong,
    isPlaying,
    playNext,
    playPrevious,
    togglePlay,
    volume,
    setVolume,
    prevVolume,
    currentTime,
    setCurrentTime,
    duration,
    setDuration,
  } = usePlayerStore();

  // Sync volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Sync play/pause
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [isPlaying]);


  // Playback events
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleEnded = () => playNext();

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [playNext, setCurrentTime, setDuration]);

  // Song change
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentSong) return;

    const isNewSong = prevSongRef.current !== currentSong.audioUrl;
    if (isNewSong) {
      audio.src = currentSong.audioUrl;
      audio.currentTime = 0;
      prevSongRef.current = currentSong.audioUrl;

      if (isPlaying) {
        audio.play();
      }
    }
  }, [currentSong, isPlaying]);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const percent = Number(e.target.value);
    const seekTime = (percent / 100) * duration;
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  return (
    <div className="fixed bottom-0 left-2 right-2 rounded-md bg-gray-900 text-white px-6 py-4 z-50 shadow-inner">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-5  justify-between items-center">
        {/* Left: Song Info */}
        <div className="flex items-center w-[180px] gap-4">
          <img className="size-10" src={currentSong?.imageUrl} alt={currentSong?.title} />
          <div>
            <p className="text-sm font-semibold">{currentSong?.title}</p>
            <p className="text-xs text-gray-400">artist</p>
          </div>
        </div>

        {/* Center: Controls + Seekbar */}
        <div className="flex flex-col items-center w-1/2">
          <div className="flex items-center gap-6 mb-3">
            <button onClick={playPrevious} className="hover:scale-105 transition">
              <SkipBack className="w-5 h-5" />
            </button>
            <button onClick={togglePlay} className="bg-white text-black rounded-full p-2 hover:scale-105 transition">
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </button>
            <button onClick={playNext} className="hover:scale-105 transition">
              <SkipForward className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center justify-between gap-3 w-full text-xs text-gray-400">
            <p>{formatTime(currentTime)}</p>
            <input
              type="range"
              min="0"
              max="100"
              value={duration ? (currentTime / duration) * 100 : 0}
              onChange={handleSeek}
              className="w-full h-1 rounded-lg bg-green-400 appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-green-400 [&::-webkit-slider-thumb]:bg-black"
            />
            <p>{formatTime(duration)}</p>
          </div>
        </div>

        {/* Right: Volume and Extras */}
        <div className="flex items-center gap-4">
          <button onClick={() => setVolume(volume > 0 ? 0 : prevVolume)}>
            {volume > 0 ? <Volume2 /> : <VolumeOff />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2.5 [&::-webkit-slider-thumb]:h-2.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
          />
          <button title="Queue">
            <ListMusic className="w-5 h-5" />
          </button>
          <button title="Lyrics">
            <Text className="w-5 h-5" />
          </button>
        </div>
      </div>

      <audio ref={audioRef} />
    </div>
  );
}

// Utility to format time
const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor(time % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${seconds}`;
};
