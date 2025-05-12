import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import { LayoutDashboard } from "lucide-react";
import SignInOAuthButtons from './SignInOAuthButtons';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';

const Topbar = () => {
    const isAdmin = true;
    return (
        <header className="flex justify-between items-center px-6 py-4 bg-black text-white shadow">
            {/* Left: Logo and Title */}
            <div className="flex items-center space-x-3">
                {/* Replace with your logo */}
                <div className="text-2xl font-bold"><img src="/spotifyLogo.svg" className="invert" alt="spotify-logo" /></div>
                <h1 className="text-xl font-semibold">Spotify</h1>
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
                                    <span className="ml-2">Admin Dashboard</span>
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