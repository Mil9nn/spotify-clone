import { axiosInstance } from "@/lib/axios";
import { useUser } from "@clerk/clerk-react";
import { Loader2 } from "lucide-react"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthCallback = () => {
    const navigate = useNavigate();

    const { isLoaded, user } = useUser();

    useEffect(() => {
      if(!isLoaded || !user) return; // wait until both are ready

       const syncUser = async () => {
         try {
          await axiosInstance.post('/auth/callback', {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            imageUrl: user.imageUrl
          })
        } catch (error) {
          console.log("Error in auth callback", error);
        } finally {
          navigate('/');
        }
       }
       syncUser();
    }, [isLoaded, user, navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
      <Loader2 className="w-10 h-10 animate-spin mb-4" />
      <p className="text-lg font-medium">Logging you in...</p>
    </div>
  )
}

export default AuthCallback
