import { ScrollArea } from "@/components/ui/scroll-area"
import { useStatStore } from "@/store/useStatStore";
import { useState } from "react";
import { useMusicStore } from "@/store/useMusicStore";

interface AlbumFormData {
    title: string;
    artist: string;
    releaseYear: string;
    imageFile: File | null;
}


const AddAlbumDialog = () => {
    const [formData, setFormData] = useState<AlbumFormData>({
        title: "",
        artist: "",
        releaseYear: '',
        imageFile: null,
    });

    const { fetchStats, addAlbum } = useStatStore();
    const { getAlbums } = useMusicStore();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data = new FormData();
        data.append("title", formData.title);
        data.append("artist", formData.artist);
        data.append("releaseYear", formData.releaseYear);

        if (formData.imageFile) {
            data.append("imageFile", formData.imageFile);
        }

        await addAlbum(data);

        await getAlbums();
        await fetchStats();
    };

    return (
        <div className="absolute min-w-full z-5">

            <ScrollArea>
                <form onSubmit={handleSubmit} className="space-y-4 bg-zinc-800 p-6 border border-zinc-700">
                    <h4 className="text-md font-semibold text-zinc-200">Album Details</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-zinc-400 mb-1">Album Title</label>
                            <input
                                name="title"
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                required
                                placeholder="Enter album title"
                                className="w-full px-3 py-2 rounded bg-zinc-900 text-white border border-zinc-700"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-zinc-400 mb-1">Artist</label>
                            <input
                                name="artist"
                                type="text"
                                value={formData.artist}
                                placeholder="Enter artist name"
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
                                    setFormData({ ...formData, imageFile: e.target.files?.[0] || null })
                                }
                                required
                                className="w-full text-sm text-zinc-300 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-green-600 file:text-white hover:file:bg-green-700"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-zinc-400 mb-1">Release Year</label>
                            <input
                                name="releaseYear"
                                type="number"
                                value={formData.releaseYear}
                                placeholder="2025"
                                onChange={(e) => setFormData({ ...formData, releaseYear: e.target.value })}
                                required
                                className="w-full px-3 py-2 rounded bg-zinc-900 text-white border border-zinc-700"
                            />
                        </div>


                    </div>

                    <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition">
                        Upload Album
                    </button>
                </form>
            </ScrollArea>
        </div>
    )
}

export default AddAlbumDialog
