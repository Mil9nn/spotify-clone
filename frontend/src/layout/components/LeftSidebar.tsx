import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Home, List, MessageCircle, X } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect } from 'react';

import { Link } from 'react-router-dom';
import { useMusicStore } from '@/store/useMusicStore';
import PlaylistSkeleton from '../skeletons/PlaylistSkeleton';

const LeftSidebar = () => {
    const { albums, hideSidebar, setHideSideBar, getAlbums, isLoading, selectedAlbum } = useMusicStore();

    useEffect(() => {
        getAlbums();
    }, [getAlbums]);

    return (
        <div
            className={cn(
                "z-20 w-full bg-black absolute md:static flex flex-col h-[88vh] p-2 transition-all duration-300",
                hideSidebar ? "left-[-100%]" : "left-0"
            )}
        >
            <div className="flex flex-col gap-3 bg-zinc-900 p-2 py-4 rounded-md">
                <div className="flex justify-between items-center md:hidden">
                    <div className="flex items-center space-x-3">
                        <div className="text-2xl font-bold w-8"><img src="/spotifyLogo.svg" className="invert" alt="spotify-logo" /></div>
                        <h1 className="text-xl font-semibold">Spotify</h1>
                    </div>
                    <button onClick={() => setHideSideBar(true)} className="block md:hidden self-end bg-zinc-800 p-2 rounded-md hover:bg-zinc-700 transition-colors cursor-pointer">
                        <X />
                    </button>
                </div>

                <Link onClick={() => setHideSideBar(true)} to="/" className={cn(buttonVariants({ variant: "ghost", className: "flex justify-start" }))}>
                    <Home className="w-5 h-5" />
                    <span>Home</span>
                </Link>

                <Link to="/messages" className={cn(buttonVariants({ variant: "ghost", className: "flex justify-start" })) + "hidden"}>
                    <MessageCircle className="w-5 h-5" />
                    <span>Messages</span>
                </Link>
            </div>

            {/* Playlist Section */}
            <div className="mt-2 flex-1 overflow-y-auto bg-zinc-900 sm:p-2 rounded-md">
                <h3 className="flex p-2 items-center gap-3 text-xs text-gray-400 uppercase tracking-wider">
                    <List />
                    <span>Playlists</span>
                </h3>

                {isLoading ? (
                    <PlaylistSkeleton />
                ) : (
                    <ScrollArea className="rounded-md h-[300px] md:h-[calc(100vh-235px)]">
                        <div className="p-4 gap-3 flex flex-col">
                            {albums.map((album) => (
                                <Link
                                    key={album._id}
                                    to={`/albums/${album._id}`}
                                    className={`flex items-start gap-4 hover:bg-zinc-800 transition-colors rounded-md ${selectedAlbum?._id === album._id ? 'bg-zinc-800' : ''}`}
                                    onClick={() => setHideSideBar(true)}
                                >
                                    <img
                                        src={album.imageUrl}
                                        alt="Album Cover"
                                        className="w-13 h-13 object-cover rounded-md"
                                    />
                                    <div className="pt-2">
                                        <div className="text-sm font-semibold">{album.title}</div>
                                        <div className="text-xs text-gray-500 truncate w-full">
                                            Albums • {album.artist}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </ScrollArea>
                )}
            </div>
        </div>
    );
};

export default LeftSidebar;
