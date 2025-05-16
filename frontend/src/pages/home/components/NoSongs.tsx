import { Music2 } from 'lucide-react';

export default function NoSongs() {
  return (
    <div className="flex flex-col h-[86vh] items-center justify-center text-center p-10 text-white shadow-md">
      <Music2 className="w-12 h-12 text-green-500 mb-4" />
      <h2 className="text-xl font-semibold">No Songs Available</h2>
      <p className="text-sm text-zinc-400 mt-2">You haven't uploaded any songs yet.</p>
    </div>
  );
}