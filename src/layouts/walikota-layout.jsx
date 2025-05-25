import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import CustomSidebar from "@/components/sidebar-admin/sidebar";
import Navbar from "@/components/sidebar-admin/navbar-admin";

const WalikotaLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setWindowWidth(width);
      setIsTablet(width >= 640 && width < 1024);

      if (width >= 1024) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const isMobileView = windowWidth < 640;

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Navbar
        isMobileView={isMobileView}
        isTablet={isTablet}
        toggleSidebar={toggleSidebar}
      />

      <div className="flex h-full flex-1 pt-[60px] sm:pt-[64px]">
        <CustomSidebar
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          isMobile={windowWidth < 1024}
          role="admin"
        />

        <main
          className={`flex-1 transition-all duration-300 px-4 py-6 sm:p-6 ${
            windowWidth < 1024
              ? "ml-0"
              : isSidebarOpen
              ? "ml-0 lg:ml-[280px]"
              : "ml-0"
          }`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default WalikotaLayout;
