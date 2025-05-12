import { Button } from './ui/button'
import { useSignIn } from '@clerk/clerk-react'

const SignInOAuthButtons = () => {
  const { signIn, isLoaded } = useSignIn();

  if (!isLoaded) return null;

  const signInWithGoogle = async () => {
    signIn?.authenticateWithRedirect({
      strategy: 'oauth_google',
      redirectUrl: '/sso-callback',
      redirectUrlComplete: '/auth-callback',
    })
  }

  return <Button onClick={signInWithGoogle} variant={"secondary"} className="w-full text-white border-zinc-200 h-11">
    <img className="w-5 h-5 invert" src="/google.svg" alt="google-icon" />
    <span>Continue with Google</span>
  </Button>
}

export default SignInOAuthButtons
