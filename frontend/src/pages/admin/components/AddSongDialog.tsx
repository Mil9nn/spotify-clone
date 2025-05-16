import { ScrollArea } from "@/components/ui/scroll-area"
import { useStatStore } from "@/store/useStatStore";
import { useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useMusicStore } from "@/store/useMusicStore";

const AddSongDialog = () => {
    const [formData, setFormData] = useState({
        title: "",
        artist: "",
        album: "",
        duration: "",
        imageFile: null,
        audioFile: null,
    });

    const { fetchStats, addSong } = useStatStore();
    const { albums, fetchAllSongs } = useMusicStore();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append("title", formData.title);
        data.append("artist", formData.artist);
        data.append("albumId", formData.album);
        data.append("duration", formData.duration);
        data.append("audioFile", formData.audioFile);
        data.append("imageFile", formData.imageFile);

        await addSong(data);

        await fetchAllSongs();
        await fetchStats();
    };

    return (
        <div className="absolute min-w-full z-5">

            <ScrollArea className="h-69">
                <form onSubmit={handleSubmit} className="space-y-4 bg-zinc-800 p-6 border border-zinc-700">
                    <h4 className="text-md font-semibold text-zinc-200">Song Details</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-zinc-400 mb-1">Song Title</label>
                            <input
                                name="title"
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                required
                                placeholder="Enter song title"
                                className="w-full px-3 py-2 rounded bg-zinc-900 text-white border border-zinc-700"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-zinc-400 mb-1">Artist</label>
                            <input
                                name="artist"
                                type="text"
                                value={formData.artist}
                                onChange={(e) => setFormData({ ...formData, artist: e.target.value })}
                                required
                                className="w-full px-3 py-2 rounded bg-zinc-900 text-white border border-zinc-700"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-zinc-400 mb-1">Image</label>
                            <input
                                name="image"
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                    setFormData({ ...formData, imageFile: e.target.files[0] })
                                }
                                required
                                className="w-full text-sm text-zinc-300 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-green-600 file:text-white hover:file:bg-green-700"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-zinc-400 mb-1">Audio File</label>
                            <input
                                name="audio"
                                type="file"
                                onChange={(e) =>
                                    setFormData({ ...formData, audioFile: e.target.files[0] })
                                }
                                accept="audio/*"
                                required
                                className="w-full text-sm text-zinc-300 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-green-600 file:text-white hover:file:bg-green-700"
                            />
                        </div>
                        <div className='space-y-2'>
                            <label className='text-sm font-medium'>Album (Optional)</label>
                            <Select value={formData.album}
                                onValueChange={(value) => setFormData({ ...formData, album: value })}>
                                <SelectTrigger className='bg-zinc-800 border-zinc-700'>
                                    <SelectValue placeholder='Select album' />
                                </SelectTrigger>
                                <SelectContent className='bg-zinc-800 border-zinc-700'>
                                    <SelectItem value='none'>No Album (Single)</SelectItem>
                                    {albums.map((album) => (
                                        <SelectItem key={album._id} value={album._id}>
                                            {album.title}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition">
                        Upload Song
                    </button>
                </form>
            </ScrollArea>
        </div>
    )
}

export default AddSongDialog
