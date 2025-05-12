import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Home, List, MessageCircle } from 'lucide-react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { useEffect } from 'react'

import { Link } from 'react-router-dom'
import { useMusicStore } from '@/store/useMusicStore'
import PlaylistSkeleton from '../skeletons/PlaylistSkeleton'

const LeftSidebar = () => {
    const { albums, getAlbums, isLoadingAlbums } = useMusicStore();

    useEffect(() => {
        getAlbums();
    }, []);

    return (
        <div className="flex flex-col h-full p-3">

            <div className="flex flex-col gap-3 bg-zinc-900 p-2 py-4 rounded-md">
                <Link to="/" className={cn(buttonVariants({ variant: "ghost", className: "flex justify-start" }))}>
                    <Home className="w-5 h-5" />
                    <span className="hidden sm:inline">Home</span>
                </Link>
                {<Link to="/messages" className={cn(buttonVariants({ variant: "ghost", className: "flex justify-start" }))}>
                    <MessageCircle className="w-5 h-5" />
                    <span className="hidden sm:inline">Messages</span>
                </Link>}
            </div>

            {/* Playlist Section */}
            <div className="mt-4 flex-1 overflow-y-auto bg-zinc-900 p-2 rounded-md">
                <h3 className="flex items-center gap-3 text-xs text-gray-400 uppercase tracking-wider mb-5">
                    <List />
                    <span className="hidden sm:inline">Playlists</span>
                </h3>

                {isLoadingAlbums ? <PlaylistSkeleton /> : (<ScrollArea className="rounded-md">
                    <div className="p-4 gap-3 flex flex-col">
                        {
                            albums.map((album) => {
                                return <Link key={album._id} to={`/albums/${album._id}`} className="flex items-start gap-4">
                                    <img src={album.imageUrl} alt="Album Cover" className="w-13 h-13 object-cover rounded-md" />
                                    <div className="hidden md:block">
                                        <div className="text-sm font-semibold">{album.title}</div>
                                        <div className="text-xs text-gray-500 truncate w-full">Albums • {album.artist}</div>
                                    </div>
                                </Link>
                            })
                        }
                    </div>
                </ScrollArea>)}
            </div>

        </div>
    )
}

export default LeftSidebar
