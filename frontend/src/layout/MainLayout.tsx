import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Outlet } from 'react-router-dom';
import LeftSidebar from './components/LeftSidebar';
import FriendsActivity from "./components/FriendsActivity";
import MusicPlayer from "@/components/MusicPlayer";
import { useEffect, useState } from "react";
import { useMusicStore } from "@/store/useMusicStore";

const MainLayout = () => {
  const [isMobile, setIsMobile] = useState(false);
  const { hideSidebar } = useMusicStore();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="h-screen w-screen bg-black text-white">
      <ResizablePanelGroup direction="horizontal" className="w-screen rounded-md border md:min-w-[450px]">

        {/* Left Sidebar Panel - Always visible on desktop */}
        {(!isMobile || (isMobile && !hideSidebar)) && (
          <>
            <ResizablePanel minSize={10} maxSize={30} defaultSize={30}>
              <MusicPlayer />
              <LeftSidebar />
            </ResizablePanel>
            <ResizableHandle />
          </>
        )}

        {/* Main Content */}
        <ResizablePanel defaultSize={(!isMobile || (isMobile && hideSidebar)) ? 100 : 80}>
          <div className="py-2 h-full w-full">
            <Outlet />
          </div>
        </ResizablePanel>

        {/* Right Panel - only on desktop */}
        {!isMobile && (
          <>
            <ResizableHandle />
            <ResizablePanel minSize={0} maxSize={25} collapsedSize={0} defaultSize={20}>
              <FriendsActivity />
            </ResizablePanel>
          </>
        )}
      </ResizablePanelGroup>
    </div>
  );
};

export default MainLayout;
