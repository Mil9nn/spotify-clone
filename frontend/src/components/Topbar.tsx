import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import { LayoutDashboard } from "lucide-react";
import SignInOAuthButtons from './SignInOAuthButtons';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { useChatStore } from '@/store/useChatStore';

const Topbar = () => {
    const { isAdmin } = useChatStore();
    return (
        <header className="flex justify-between items-center px-6 py-4 bg-zinc-900 text-white shadow rounded-t-md">
            {/* Left: Logo and Title */}
            <div className="flex items-center space-x-3">
                {/* Replace with your logo */}
                <div className="text-2xl font-bold w-8"><img src="/spotifyLogo.svg" className="invert" alt="spotify-logo" /></div>
                <h1 className="hidden sm:block text-xl font-semibold">Spotify</h1>
            </div>

            {/* Right: Google Button */}
            <div className="flex items-center gap-3">
                <div>
                    <SignedOut>
                        <SignInOAuthButtons />
                    </SignedOut>
                    <SignedIn>
                        {isAdmin && (
                            <Button variant={"secondary"} className="p-5">
                                <Link to="/admin" className="flex items-center">
                                    <LayoutDashboard className="w-5 h-5" />
                                    <span className="hidden sm:inline ml-2">Admin Dashboard</span>
                                </Link>
                            </Button>
                        )}
                    </SignedIn>
                </div>
                <SignedIn><UserButton /></SignedIn>
            </div>
        </header>
    );
};

export default Topbar;