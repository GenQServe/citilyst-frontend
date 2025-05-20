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

const NavbarAdmin = ({ toggleSidebar, isMobileView }) => {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
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

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#9CDE9F] border-b border-gray-200 shadow-sm">
        <div className="flex h-16 items-center justify-between px-4">
          <div className="flex items-center">
            {isMobileView && (
              <Button
                variant="ghost"
                size="icon"
                className="mr-2"
                onClick={toggleSidebar}
                aria-label="Toggle sidebar"
              >
                <Menu className="h-5 w-5" />
              </Button>
            )}

            <div className="ml-4 lg:ml-0">
                <img
                src={images.cityListLogo}
                alt="CityList Logo"
                className="h-11 w-auto"
                style={{ minWidth: 120, maxWidth: 180 }}
                />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 hover:bg-gray-100"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder-avatar.jpg" />
                    <AvatarFallback className="bg-[#9DB17C] text-white">
                      {userInfo.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium">{userInfo.name}</p>
                    <p className="text-xs text-gray-500">Administrator</p>
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-56">
                <div className="p-2">
                  <p className="text-sm font-medium">{userInfo.name}</p>
                  <p className="text-xs text-gray-500 truncate">{userInfo.email}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/walikota/profile")}>
                  Pengaturan Profil
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/walikota/settings")}>
                  Pengaturan Sistem
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="text-red-500 focus:text-red-500" 
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
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Konfirmasi Logout</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin keluar dari akun admin?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction className="bg-red-500 hover:bg-red-600" onClick={handleLogout}>
              Ya, Logout
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default NavbarAdmin;