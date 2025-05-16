import { useStatStore } from '@/store/useStatStore';
import { Album, Mic, Music, Users } from 'lucide-react';

const DashboardStats = () => {
    const { stats } = useStatStore();

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 px-6">
            {[
                { icon: <Music className="size-10 text-blue-400 dark:text-blue-300" />, label: "Total Songs", count: stats.totalSongs },
                { icon: <Album className="size-10 text-purple-400 dark:text-purple-300" />, label: "Total Albums", count: stats.totalAlbums },
                { icon: <Mic className="size-10 text-pink-400 dark:text-pink-300" />, label: "Total Artists", count: stats.totalArtists },
                { icon: <Users className="size-10 text-emerald-400 dark:text-emerald-300" />, label: "Total Users", count: stats.totalUsers },
            ].map(({ icon, label, count }) => (
                <div key={label} className="bg-zinc-800 flex items-center gap-2 rounded-xl shadow-sm border border-zinc-700 p-4 text-center">
                    <p>{icon}</p>
                    <div>
                        <p className="hidden md:block text-sm text-zinc-400">{label}</p>
                        <p className="text-xl font-semibold text-white">{count}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default DashboardStats
