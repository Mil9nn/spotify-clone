import { axiosInstance } from '@/lib/axios';
import { create } from 'zustand'

interface Song {
    _id: string;
    title: string;
    duration: string;
    artist: string;
    imageUrl: string;
    audioUrl: string;
    createdAt: string;
    updatedAt: string;
    albumId: string;
}

interface Album {
  _id: string;
  imageUrl: string;
  title: string;
  artist: string;
  releaseYear: number;
  updatedAt: string;
}

interface selectedAlbum {
    _id: string;
    title: string;
    imageUrl: string;
    artist: string;
    songs: Song[];
    releaseYear: string;
    createdAt: string;
}

interface MusicStore {
    albums: Album[];
    users: unknown[];
    songs: unknown[];
    isLoading: boolean;
    selectedAlbum: selectedAlbum | null;
    getAlbums: () => Promise<void>;
    getAlbumById: (id: unknown) => Promise<void>;
    fetchAllSongs: () => Promise<void>;
    fetchFeaturedSongs: () => Promise<void>;
    fetchTrendingSongs: () => Promise<void>;
    fetchMadeForYouSongs: () => Promise<void>;
    featuredSongs: Song[];
    trendingSongs: Song[];
    madeForYouSongs: Song[];
}

export const useMusicStore = create<MusicStore>((set) => ({

    albums: [],
    users: [],
    songs: [],
    isLoading: false,
    selectedAlbum: null,
    featuredSongs: [],
    trendingSongs: [],
    madeForYouSongs: [],

    getAlbums: async () => {
        set({ isLoading: true })
        try {
            const response = await axiosInstance.get("/albums");
            set({ albums: response.data });
        } catch (error) {
            console.log("Error getting albums", error);
        } finally {
            set({ isLoading: false });
        }
    },

    getAlbumById: async (id: unknown) => {
        try {
            const response = await axiosInstance.get(`/albums/${id}`);
            set({ selectedAlbum: response.data });
        } catch (error) {
            console.log("Error getting albums", error);
        }
    },

    fetchAllSongs: async () => {
        set({ isLoading: true });
        try {
            const response = await axiosInstance.get("/songs");
            set({ songs: response.data });
        } catch (error) {
            console.log("Error getting all songs", error);
        } finally {
            set({ isLoading: false });
        }
    },

    fetchFeaturedSongs: async () => {
        set({ isLoading: true });
        try {
            const response = await axiosInstance.get("/songs/featured");
            set({ featuredSongs: response.data });
        } catch (error) {
            console.log("Error getting featured songs", error);
        } finally {
            set({ isLoading: false });
        }
    },

    fetchMadeForYouSongs: async () => {
        set({ isLoading: true });
        try {
            const response = await axiosInstance.get("/songs/made-for-you");
            set({ trendingSongs: response.data });
        } catch (error) {
            console.log("Error getting featured songs", error);
        } finally {
            set({ isLoading: false });
        }
    },

    fetchTrendingSongs: async () => {
        set({ isLoading: true });
        try {
            const response = await axiosInstance.get("/songs/trending");
            set({ madeForYouSongs: response.data });
        } catch (error) {
            console.log("Error getting featured songs", error);
        } finally {
            set({ isLoading: false });
        }
    },

}))