import { create } from 'zustand';
import type { Song } from '@/types';

interface PlayerStore {
    currentSong: Song | null;
    isPlaying: boolean;
    queue: Song[];
    currentIndex: number;
    volume: number;
    prevVolume: number;
    setVolume: (volume: number) => void;
    currentTime: number;
    setCurrentTime: (time: number) => void;
    duration: number;
    setDuration: (duration: number) => void;

    initializeQueue: (songs: Song[]) => void;
    playAlbum: (songs: Song[], startIndex?: number) => void;
    setCurrentSong: (song: Song | null) => void;
    togglePlay: () => void;
    playNext: () => void;
    playPrevious: () => void;
}

export const usePlayerStore = create<PlayerStore>((set, get) => ({
    currentSong: null,
    isPlaying: false,
    queue: [],
    currentIndex: -1,
    volume: 1,
    prevVolume: 1,
    currentTime: 0,
    setCurrentTime: (currentTime) => set({ currentTime: currentTime }),
    duration: 0,
    setDuration: (duration) => set({ duration: duration }),

    setVolume: (volume) => set((state) => ({
        volume,
        prevVolume: volume > 0 ? volume : state.prevVolume,
    })),

    initializeQueue: (songs: Song[]) => {
        set({
            queue: songs,
            currentIndex: get().currentIndex === -1 ? 0 : get().currentIndex,
            currentSong: get().currentSong || songs[0],
        })
    },

    playAlbum: (songs: Song[], startIndex = 0) => {
        if (songs.length === 0) return;

        const song = songs[startIndex];

        set({
            queue: songs,
            currentIndex: startIndex,
            currentSong: song,
            isPlaying: true
        })
    },

    setCurrentSong: (song: Song | null) => {
        if (!song) return;

        const songIndex = get().queue.findIndex((s) => s._id === song._id);
        set({
            currentSong: song,
            currentIndex: songIndex !== -1 ? songIndex : 0,
            isPlaying: true
        })
    },

    togglePlay: () => {
        set({ isPlaying: !get().isPlaying });
    },

    playNext: () => {
        const { queue, currentIndex } = get();
        const nextIndex = currentIndex + 1;

        if (nextIndex < queue.length) {
            const nextSong = queue[nextIndex];
            set({
                currentSong: nextSong,
                currentIndex: nextIndex,
                isPlaying: true
            })
        } else {
            set({ isPlaying: false });
        }
    },
    playPrevious: () => {
        const { queue, currentIndex } = get();
        const previousIndex = currentIndex - 1;

        if (previousIndex >= 0) {
            const previousSong = queue[previousIndex];
            set({
                currentSong: previousSong,
                currentIndex: previousIndex,
                isPlaying: true
            })
        } else {
            set({ isPlaying: false });
        }
    },
}))