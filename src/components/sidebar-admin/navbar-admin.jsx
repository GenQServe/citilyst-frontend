import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { images } from "@/constants/images";
import { Menu, Bell, Search, ChevronDown, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";

const NavbarAdmin = ({ toggleSidebar, isMobileView, isTablet }) => {
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const navigate = useNavigate();

  const getUserInfo = () => {
    try {
      const token = Cookies.get("token");
      if (!token) return { name: "Admin", role: "admin" };

      const decoded = jwtDecode(token);
      return {
        name: decoded.name || "Admin",
        role: decoded.role || "admin",
        email: decoded.email || "admin@citilyst.com",
      };
    } catch (error) {
      return { name: "Admin", role: "admin" };
    }
  };

  const userInfo = getUserInfo();

  const handleLogout = () => {
    Cookies.remove("token");
    toast.success("Berhasil logout");
    navigate("/login", { replace: true });
  };

  const getInitials = (name) => {
    if (!name) return "A";
    const names = name.split(" ");
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    return (
      names[0].charAt(0) + names[names.length - 1].charAt(0)
    ).toUpperCase();
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#9CDE9F] border-b border-gray-200 shadow-sm">
        <div className="flex h-14 sm:h-16 items-center justify-between px-2 sm:px-4">
          <div className="flex items-center">
            {(isMobileView || isTablet) && (
              <Button
                variant="ghost"
                size="icon"
                className="mr-1 sm:mr-2"
                onClick={toggleSidebar}
                aria-label="Toggle sidebar"
              >
                <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            )}

            <div
              className={`${
                isMobileView ? "ml-1" : "ml-4 lg:ml-0"
              } flex items-center`}
            >
              <img
                src={images.cityListLogo}
                alt="CityList Logo"
                className="h-8 sm:h-10 md:h-11 w-auto"
                style={{
                  minWidth: isMobileView ? 100 : 120,
                  maxWidth: isMobileView ? 140 : 180,
                }}
              />
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-1 sm:gap-2 hover:bg-[#a1e6a4] px-1 sm:px-3 py-1"
                >
                  <Avatar className="h-7 w-7 sm:h-8 sm:w-8">
                    <AvatarImage src="/placeholder-avatar.jpg" />
                    <AvatarFallback className="bg-[#9DB17C] text-white text-xs sm:text-sm">
                      {getInitials(userInfo.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium line-clamp-1">
                      {userInfo.name}
                    </p>
                    <p className="text-xs text-gray-600">Administrator</p>
                  </div>
                  <div className="block md:hidden text-left">
                    <p className="text-xs sm:text-sm font-medium line-clamp-1 max-w-[80px] sm:max-w-[100px]">
                      {userInfo.name}
                    </p>
                  </div>
                  <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-56">
                <div className="p-2">
                  <p className="text-sm font-medium">{userInfo.name}</p>
                  <p className="text-xs text-gray-500 truncate">
                    {userInfo.email}
                  </p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-red-500 focus:text-red-500 cursor-pointer"
                  onClick={() => setLogoutDialogOpen(true)}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <AlertDialog open={logoutDialogOpen} onOpenChange={setLogoutDialogOpen}>
        <AlertDialogContent className="max-w-[90%] sm:max-w-lg">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-lg sm:text-xl">
              Konfirmasi Logout
            </AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin keluar dari akun admin?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0">
            <AlertDialogCancel className="w-full sm:w-auto mt-2 sm:mt-0">
              Batal
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500 hover:bg-red-600 w-full sm:w-auto"
              onClick={handleLogout}
            >
              Ya, Logout
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default NavbarAdmin;
