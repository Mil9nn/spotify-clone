import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/home/HomePage"
import AuthCallback from "./pages/auth-callback/AuthCallback"
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react"
import MainLayout from "./layout/MainLayout"
import ChatContainer from './layout/components/ChatContainer'
import AlbumPage from './pages/album/AlbumPage'

function App() {

  return (
    <>
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/albums/:albumId" element={<AlbumPage />} />
        <Route path="/messages" element={<ChatContainer />} />
      </Route>
      <Route path="/sso-callback" element={<AuthenticateWithRedirectCallback signUpForceRedirectUrl={"/auth/callback"} />} />
      <Route path="/auth-callback" element={<AuthCallback />} />
    </Routes>
    </>
  )
}

export default App
