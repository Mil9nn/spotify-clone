import { create } from 'zustand';
import { axiosInstance } from '@/lib/axios';

interface User {
  _id: string;
  fullName: string;
  imageUrl: string;
  isOnline: boolean;
  song: string;
}

interface ChatStore {
    users: User[];
    getUsers: () => Promise<void>;
    isLoading: boolean;
    isAdmin: boolean;
    checkAdmin: () => Promise<void>;
}

export const useChatStore = create<ChatStore>((set => ({
    users: [],
    isLoading: false,
    isAdmin: false,

     getUsers: async () => {
        set({ isLoading: true});
        try {
            const response = await axiosInstance.get('/users');
            set({ users: response.data });
        } catch (error) {
            console.log("Error getting albums", error);
        } finally {
            set({ isLoading: false });
        }
    },

    checkAdmin: async () => {
        try {
            const response = await axiosInstance.get('/admin/check');
            set({ isAdmin: response.data });
        } catch (error) {
            console.log("Error checking admin", error);
        }
    }
})))