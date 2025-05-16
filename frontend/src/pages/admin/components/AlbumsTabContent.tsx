import { ScrollArea } from '@/components/ui/scroll-area';
import { useMusicStore } from '@/store/useMusicStore';
import { useStatStore } from '@/store/useStatStore';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';

import AddAlbumDialog from './AddAlbumDialog';
import StatusCard from '@/components/StatusCard';

const SongsTabContent = () => {
    const { fetchAllSongs, albums, getAlbums } = useMusicStore();
    const { isDeleting, isUploading, fetchStats, deleteAlbum } = useStatStore();
    const [showForm, setShowForm] = useState(false);

    const handleDelete = async (albumId: unknown) => {
        await deleteAlbum(albumId);
        await getAlbums();
        await fetchAllSongs(); // Re-fetch after deletion
        await fetchStats();
    };

    if (isUploading) return <StatusCard status="uploading" />
    if (isDeleting) return <StatusCard status="deleting" />

    return (
        <div>
            <div className="relative space-y-2">
                <div className="flex items-center justify-between px-5">
                    <h3 className="text-lg font-semibold text-white">Albums Library</h3>
                    <button onClick={() => setShowForm(!showForm)}
                        className="text-sm bg-green-600 text-white px-4 py-1.5 rounded hover:bg-green-700 transition">
                        {showForm ? "Cancel" : "+ Add Album"}
                    </button>
                </div>

                {showForm && <AddAlbumDialog />}

                {/* Songs List Placeholder */}
                <ScrollArea className='h-[calc(100vh-433px)]'>
                    <table className="min-w-full text-sm text-left text-zinc-300">
                        <thead className="text-xs uppercase text-zinc-400 border-b border-zinc-700">
                            <tr>
                                <th className="px-4 py-3">Title</th>
                                <th className="px-4 py-3">Artist</th>
                                <th className="px-4 py-3">Release Date</th>
                                <th className="px-4 py-3 text-center">Actions</th>
                            </tr>
                        </thead>
                        {albums.map((album) => {
                            return <tbody>
                                <tr key={album._id} className="border-b border-zinc-700 hover:bg-zinc-700/30 transition">
                                    <td className="flex items-center gap-2 px-4 py-3">
                                        <img className="size-7" src={album.imageUrl} alt={album.title} />
                                        <span>{album.title}</span>
                                    </td>
                                    <td className="px-4 py-3">{album.artist}</td>
                                    <td className="px-4 py-3">{album.updatedAt.split('T')[0]}</td>
                                    <td className="px-4 py-3 text-center space-x-3">
                                        <button disabled={isDeleting} onClick={() => { handleDelete(album._id) }} className="text-red-400 hover:text-red-500 transition cursor-pointer">
                                            <Trash2 className="w-4 h-4 inline" />
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        })}
                    </table>
                </ScrollArea>
            </div>
        </div>
    )
}

export default SongsTabContent
