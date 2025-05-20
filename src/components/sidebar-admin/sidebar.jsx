import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { images } from "@/constants/images";
import {
  LayoutDashboard,
  Package,
  ClipboardList,
  LogOut,
  ChevronRight,
} from "lucide-react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";

const menus = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Manage-Report",
    path: "/waste-types",
    icon: ClipboardList,
  },
];

export default function CustomSidebar({ isOpen, toggleSidebar, isMobile }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("token");
    toast.success("Logout successful");
    navigate("/", { replace: true });
  };

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) {
      toggleSidebar();
    }
  };

  const getUserName = () => {
    try {
      const token = Cookies.get("token");
      if (!token) return "User";

      const decoded = jwtDecode(token);
      return decoded.name || "User";
    } catch (error) {
      return "User";
    }
  };

  return (
    <>
      <div
        className={cn(
          "fixed top-0 left-0 z-30 h-full bg-white border-r border-gray-200 shadow-lg transition-all duration-300 overflow-y-auto md:pt-28 lg:pt-16",
          isMobile ? "w-[270px]" : "w-[280px]",
          isOpen
            ? "translate-x-0"
            : isMobile
            ? "-translate-x-full"
            : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div>
              <img
                src={images.logo}
                alt="CityList Logo"
                className="h-11 w-auto object-contain"
                style={{ width: '100%', maxWidth: '180px' }}
              />
            </div>
            <div>
              <span className="font-bold text-xl whitespace-nowrap">
                CityList
              </span>
              <p className="text-xs text-gray-500 mt-[-2px]">
                Welcome, {getUserName()}
              </p>
            </div>
          </div>
        </div>

        <div className="h-px bg-gray-200 my-2"></div>

        <div className="px-3">
          <ul className="flex flex-col gap-1">
            {menus.map((menu) => (
              <li key={menu.path}>
                <button
                  onClick={() => handleNavigation(menu.path)}
                  className={cn(
                    "w-full flex items-center gap-3 py-3.5 px-4 rounded-lg transition-all duration-200 font-medium",
                    location.pathname === menu.path
                      ? "bg-green-50 text-green-600"
                      : "hover:bg-gray-100"
                  )}
                >
                  <menu.icon
                    className={cn(
                      "h-5 w-5 flex-shrink-0",
                      location.pathname === menu.path
                        ? "text-green-500"
                        : "text-gray-500"
                    )}
                  />
                  <span className="flex-1">{menu.label}</span>
                  <ChevronRight
                    className={cn(
                      "h-4 w-4",
                      location.pathname === menu.path
                        ? "text-green-500 opacity-100"
                        : "opacity-40"
                    )}
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto p-3 pb-5">
          <div className="h-px bg-gray-200 mb-3"></div>
          <ul>
            <li>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 py-3.5 px-4 rounded-lg transition-colors text-red-500 hover:bg-red-50 hover:text-red-600 font-medium"
              >
                <LogOut className="h-5 w-5 flex-shrink-0" />
                <span className="flex-1">Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </div>

      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
}
