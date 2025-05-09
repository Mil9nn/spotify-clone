import { useAuth } from "@clerk/clerk-react"


const AuthProvider = () => {
    const {getToken, userId} = useAuth();
  return (
    <div>
      
    </div>
  )
}

export default AuthProvider
