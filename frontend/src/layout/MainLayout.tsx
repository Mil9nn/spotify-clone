import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { Outlet } from 'react-router-dom'
import LeftSidebar from './components/LeftSidebar'
import FriendsActivity from "./components/FriendsActivity"
import MusicPlayer from "@/components/MusicPlayer"
import { useEffect, useState } from "react"
const MainLayout = () => {
  const [isMobile, setIsMobile] = useState(false);

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
        <ResizablePanel className="h-90vh" minSize={isMobile ? 0 : 10} maxSize={30} defaultSize={20}>
          <MusicPlayer />
          <LeftSidebar />
        </ResizablePanel>
        <ResizableHandle />

        {/* Main Content */}
        <ResizablePanel defaultSize={isMobile ? 50 : 80}>
          <div className="py-2">
            <Outlet />
          </div>
        </ResizablePanel>
        {!isMobile && <>
          <ResizableHandle />
          <ResizablePanel minSize={0} maxSize={25} collapsedSize={0} defaultSize={20}>
            <FriendsActivity />
          </ResizablePanel>
        </>}
      </ResizablePanelGroup>
    </div>
  )
}

export default MainLayout
