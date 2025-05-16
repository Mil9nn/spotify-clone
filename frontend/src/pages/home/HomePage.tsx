import Topbar from "@/components/Topbar";
import { useMusicStore } from "@/store/useMusicStore";
import { useEffect } from "react";
import FeaturedSection from "./components/FeaturedSection";
import { ScrollArea } from "@/components/ui/scroll-area";
import SectionGrid from "./components/SectionGrid";
import { usePlayerStore } from "@/store/usePlayerStore";
import NoSongs from "./components/NoSongs";
import { FeaturedGridSkeleton } from "./skeletons/FeaturedGridSkeleton";
import SectionGridSkeleton from "./skeletons/SectionGridSkeleton";

const HomePage = () => {
	const {
		fetchAllSongs,
		fetchFeaturedSongs,
		fetchMadeForYouSongs,
		fetchTrendingSongs,
		isLoading,
		songs,
		madeForYouSongs,
		featuredSongs,
		trendingSongs,
	} = useMusicStore();

	const { initializeQueue } = usePlayerStore();

	useEffect(() => {
		fetchAllSongs();
		fetchFeaturedSongs();
		fetchMadeForYouSongs();
		fetchTrendingSongs();
	}, [fetchAllSongs, fetchFeaturedSongs, fetchMadeForYouSongs, fetchTrendingSongs]);

	useEffect(() => {
		if (madeForYouSongs.length > 0 && featuredSongs.length > 0 && trendingSongs.length > 0) {
			const allSongs = [...featuredSongs, ...madeForYouSongs, ...trendingSongs];
			initializeQueue(allSongs);
		}
	}, [initializeQueue, madeForYouSongs, trendingSongs, featuredSongs]);

	return (
		<main className='rounded-md overflow-hidden bg-gradient-to-b from-zinc-800 to-zinc-900'>
			<Topbar />
			{!isLoading && songs.length === 0 ? (<NoSongs />) : (<ScrollArea className='h-[calc(100vh-170px)]'>
				<div className='p-4 sm:p-6'>
					<h1 className='text-2xl sm:text-3xl font-bold mb-6'>Good afternoon</h1>
					{isLoading ? <FeaturedGridSkeleton /> : <FeaturedSection />}

					{isLoading ? <SectionGridSkeleton /> : <div className='space-y-8'>
						<SectionGrid title='Made For You' songs={madeForYouSongs} isLoading={isLoading} />
						<SectionGrid title='Trending' songs={trendingSongs} isLoading={isLoading} />
					</div>}
				</div>
			</ScrollArea>)}
		</main>
	);
};
export default HomePage;