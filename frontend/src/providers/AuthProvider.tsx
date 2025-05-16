import { useAuth } from "@clerk/clerk-react"
import { useEffect, useState } from "react";
import { axiosInstance } from '../lib/axios.ts'
import { Loader } from 'lucide-react'
import { useChatStore } from "@/store/useChatStore.tsx";

const updateApiToken = async (token: string | null) => {
    if (token) {
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
    } else {
        delete axiosInstance.defaults.headers.common['Authorization']
    }
}

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const { getToken, isLoaded } = useAuth();
    const [loading, setLoading] = useState(false);

    const { checkAdmin } = useChatStore();

    useEffect(() => {
        const initAuth = async () => {
            if(!isLoaded) return;
            setLoading(true);
            try {
                const token = await getToken();
                updateApiToken(token);
                if(token) {
                    checkAdmin();
                }
            } catch (error) {
                console.log("Error in auth provider", error);
            } finally {
                setLoading(false);
            }
        }
        initAuth();
    }, [getToken, isLoaded]);

    if (loading) return <div className="flex items-center justify-center h-screen" role="status">
        <Loader className="animate-spin size-8 text-emerald-500" />
    </div>

    return <>{children}</>;
}

export default AuthProvider
 