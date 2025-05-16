import { ScrollArea } from '@/components/ui/scroll-area';
import { useMusicStore } from '@/store/useMusicStore';
import { useStatStore } from '@/store/useStatStore';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';

import AddSongDialog from './AddSongDialog';
import StatusCard from '@/components/StatusCard';

const SongsTabContent = () => {
    const { songs, fetchAllSongs } = useMusicStore();
    const { isDeleting, isUploading, fetchStats, deleteSong } = useStatStore();
    const [showForm, setShowForm] = useState(false);

    const handleDelete = async (songId) => {
        await deleteSong(songId);
        await fetchAllSongs(); // Re-fetch after deletion
        await fetchStats();
    };

    if (isUploading) return <StatusCard status="uploading" />
    if (isDeleting) return <StatusCard status="deleting" />

    return (
        <div>
            <div className="relative space-y-2">
                <div className="flex items-center justify-between px-5">
                    <h3 className="text-lg font-semibold text-white">Songs Library</h3>
                    <button onClick={() => setShowForm(!showForm)}
                        className="text-sm bg-green-600 text-white px-4 py-1.5 rounded hover:bg-green-700 transition">
                        {showForm ? "Cancel" : "+ Add Song"}
                    </button>
                </div>

                {showForm && <AddSongDialog />}

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
                        {songs.map((song) => {
                            return <tbody>
                                <tr key={song._id} className="border-b border-zinc-700 hover:bg-zinc-700/30 transition">
                                    <td className="flex items-center gap-2 px-4 py-3">
                                        <img className="size-7" src={song.imageUrl} alt={song.title} />
                                        <span>{song.title}</span>
                                    </td>
                                    <td className="px-4 py-3">{song.artist}</td>
                                    <td className="px-4 py-3">{song.updatedAt.split('T')[0]}</td>
                                    <td className="px-4 py-3 text-center space-x-3">
                                        <button disabled={isDeleting} onClick={() => { handleDelete(song._id) }} className="text-red-400 hover:text-red-500 transition cursor-pointer">
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
