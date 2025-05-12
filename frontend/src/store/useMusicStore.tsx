import { axiosInstance } from '@/lib/axios';
import { create } from 'zustand'

export type Album = {
    _id: string;
    title: string;
    artist: string;
    imageUrl: string;
};

type MusicStore = {
    albums: Album[];
    isLoadingAlbums: boolean;
    selectedAlbum: Album | null;
    getAlbums: () => void;
};


export const useMusicStore = create<MusicStore>((set) => ({
    albums: [],
    isLoadingAlbums: false,

    selectedAlbum: null,

    getAlbums: async () => {
        set({ isLoadingAlbums: true})
        try {
            const response = await axiosInstance.get("/albums");
            console.log(response.data);
            set({ albums: response.data });
        } catch (error) {
            console.log("Error getting albums", error);
        } finally {
            set({ isLoadingAlbums: false });
        }
    },

    getAlbumById: async (id) => {
        
        try {
            const response = await axiosInstance.get(`/albums/${id}`);
            console.log(response.data);
            set({ selectedAlbum: response.data });
        } catch (error) {
            console.log("Error getting albums", error);
        } 
    }
}))