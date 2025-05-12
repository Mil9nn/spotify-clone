import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { Outlet } from 'react-router-dom'
import LeftSidebar from './components/LeftSidebar'
import Topbar from '@/components/Topbar'

const MainLayout = () => {

  const isMobile = window.innerWidth < 768;

  return (
    <div className="h-screen w-screen bg-black text-white">
      <ResizablePanelGroup direction="horizontal" className="w-screen rounded-md border md:min-w-[450px]">
        <ResizablePanel className="h-screen" minSize={isMobile ? 0 : 10} maxSize={30} defaultSize={20}> 
          <LeftSidebar />
        </ResizablePanel>

        <ResizableHandle />
        <ResizablePanel minSize={60} maxSize={80} defaultSize={isMobile ? 80 : 60}>
          <Topbar />
          <Outlet />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel minSize={0} maxSize={25} collapsedSize={0} defaultSize={20}>
          Three
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}

export default MainLayout
