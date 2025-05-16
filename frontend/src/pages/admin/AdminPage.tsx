import { useMusicStore } from "@/store/useMusicStore";
import { useStatStore } from "@/store/useStatStore";
import { useEffect, useState } from "react";
import DashboardStats from "./components/DashboardStats";
import SongsTabContent from "./components/SongsTabContent";
import AlbumsTabContent from "./components/AlbumsTabContent";

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("Tab-1");
  const { fetchStats } = useStatStore();
  const { fetchAllSongs, getAlbums } = useMusicStore();

  useEffect(() => {
    fetchStats();
    fetchAllSongs();
    getAlbums();
  }, [fetchStats, fetchAllSongs, getAlbums]);

  return (
    <div className="space-y-8 bg-zinc-900 text-zinc-100 rounded-md min-h-[86vh]">
      {/* Header */}
      <div className="px-6 py-3 space-y-1">
        <h2 className="text-2xl font-bold text-white">Music Manager</h2>
        <p className="text-sm text-zinc-400">
          Manage your music albums and tracks here.
        </p>
      </div>

      <DashboardStats />

      {/* Tabs */}
      <div className="flex gap-4 border-b border-zinc-700 px-6">
        <button onClick={() => { setActiveTab("Tab-1") }} className={`text-sm font-medium cursor-pointer text-green-500 hover:text-green-400 ${activeTab === "Tab-1" && "border-b-2 border-green-500"}`}>
          Songs
        </button>
        <button onClick={() => { setActiveTab("Tab-2") }} className={`text-sm font-medium cursor-pointer text-green-500 ${activeTab === "Tab-2" && "border-b-2 border-green-500"} hover:text-green-400`}>
          Albums
        </button>
      </div>

      {activeTab === "Tab-1" ? <SongsTabContent /> : <AlbumsTabContent />}
    </div>
  );
};

export default AdminPage;
