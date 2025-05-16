import { axiosInstance } from '@/lib/axios';
import { create } from 'zustand'

import type { MusicStore } from "@/types";

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
            set({ madeForYouSongs: response.data });
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
            set({ trendingSongs: response.data });
        } catch (error) {
            console.log("Error getting featured songs", error);
        } finally {
            set({ isLoading: false });
        }
    },

}))