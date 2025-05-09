// import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';

import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/home/HomePage"
import AuthCallback from "./pages/home/auth-callback/AuthCallback"

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/auth-callback" element={<AuthCallback />} />
    </Routes>
    </>
  )
}

export default App

{/* <header>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header> */}
