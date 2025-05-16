import { create } from 'zustand';
import { axiosInstance } from '@/lib/axios';
import toast from 'react-hot-toast';

interface StatsData {
  totalSongs: number;
  totalAlbums: number;
  totalArtists: number;
  totalUsers: number;
}

interface StatStore {
  stats: StatsData | null;
  fetchStats: () => Promise<void>;
  isDeleting: boolean;
  isUploading: boolean;
  setIsDeleting: (isDeleting: boolean) => void;
  setisUploading: (isUploading: boolean) => void;
  addSong: (data: FormData) => Promise<void>;
  deleteSong: (id: string) => Promise<void>;
  addAlbum: (data: FormData) => Promise<void>;
  deleteAlbum: (id: string) => Promise<void>;
}

export const useStatStore = create<StatStore>((set) => ({
  stats: null,
  isDeleting: false,
  isUploading: false,
  setIsDeleting: (isDeleting) => set({ isDeleting }),
  setisUploading: (isUploading) => set({ isUploading }),

  fetchStats: async () => {
    try {
      const response = await axiosInstance.get("/stats");
      set({ stats: response.data });
    } catch (error) {
      console.log("Error getting song count", error);
    }
  },

  addSong: async (data: FormData) => {
    set({ isUploading: true });
    try {
      const response = await axiosInstance.post("/admin/songs", data, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      if (response.status === 201) toast.success("Song uploaded successfully!");
    } catch (error) {
      console.error("Upload Error:", error);
      toast.error("Error uploading the song");
    } finally {
      set({ isUploading: false });
    }
  },

  deleteSong: async (id: string) => {
    set({ isDeleting: true });
    try {
      const response = await axiosInstance.delete(`/admin/songs/${id}`);
      if (response.status === 200) toast.success("Song deleted successfully!");
    } catch (error) {
      console.log("Error deleting song", error);
    } finally {
      set({ isDeleting: false });
    }
  },

  addAlbum: async (data: FormData) => {
    set({ isUploading: true });
    try {
      const response = await axiosInstance.post("/admin/albums", data, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      if (response.status === 201) toast.success("Album created successfully!");
    } catch (error) {
      console.error("Upload Error:", error);
      toast.error("Error creating the album");
    } finally {
      set({ isUploading: false });
    }
  },

  deleteAlbum: async (id: string) => {
    set({ isDeleting: true });
    try {
      const response = await axiosInstance.delete(`/admin/albums/${id}`);
      if (response.status === 200) toast.success("Album deleted successfully!");
    } catch (error) {
      console.log("Error deleting album", error);
    } finally {
      set({ isDeleting: false });
    }
  },
}));