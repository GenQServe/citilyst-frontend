import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,

} from "@/components/ui/navigation-menu";

import {
  Menu,
  LayoutGrid,
} from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const FloatingNavbar = () => {
  const navbarRef = useRef(null);
  const navbarContentRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const navbar = navbarRef.current;
    const navbarContent = navbarContentRef.current;

    gsap.set(navbar, {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      padding: "16px 0",
      borderRadius: "0px",
      boxShadow: "none",
      backdropFilter: "none",
      backgroundColor: "#9CDE9F", // Changed to light green color
      border: "none",
      zIndex: 100,
    });

    const tl = gsap.timeline({ paused: true });

    tl.to(navbar, {
      top: 16,
      left: "50%",
      xPercent: -50,
      width: "90%",
      padding: "10px 0",
      borderRadius: "16px",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
      backdropFilter: "blur(12px)",
      backgroundColor: "#9CDE9F", // Kept consistent color
      border: "none",
      duration: 0.4,
      ease: "power3.out",
    });

    tl.to(
      navbarContent,
      {
        padding: "0 16px",
        maxWidth: "100%",
        duration: 0.3,
        ease: "power2.out",
      },
      "<"
    );

    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 50) {
        const progress = Math.min(1, (scrollY - 50) / 100);
        tl.progress(progress);
      } else {
        tl.progress(0);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      tl.kill();
    };
  }, []);

  const isActiveLink = (path) => {
    return location.pathname.startsWith(path);
  };

  return (
    <nav ref={navbarRef} className="w-full fixed top-0 left-0 z-50 bg-[#9CDE9F]">
      <div
        ref={navbarContentRef}
        className="container mx-auto px-4 flex items-center justify-between"
      >
        <Link to="/" className="text-xl font-bold flex items-center gap-2 text-black">
          <LayoutGrid className="w-6 h-6" />
          CityList
        </Link>

        <div className="hidden md:block">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/home">
                  <NavigationMenuLink
                    className={cn(
                      "inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-black hover:bg-[#9DB17C] hover:text-black focus:bg-[#9DB17C] focus:text-black",
                      isActiveLink("/home") && "bg-[#9DB17C] text-black font-medium"
                    )}
                  >
                    Beranda
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/user">
                  <NavigationMenuLink
                    className={cn(
                      "inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-black hover:bg-[#9DB17C] hover:text-black focus:bg-[#9DB17C] focus:text-black",
                      isActiveLink("/user") && "bg-[#9DB17C] text-black font-medium"
                    )}
                  >
                    Buat Laporan
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/walikota">
                  <NavigationMenuLink
                    className={cn(
                      "inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-black hover:bg-[#9DB17C] hover:text-black focus:bg-[#9DB17C] focus:text-black",
                      isActiveLink("/walikota") && "bg-[#9DB17C] text-black font-medium"
                    )}
                  >
                    Cek Status
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Button 
            size="sm" 
            className="rounded-full bg-[#9DB17C] text-black hover:bg-[#8CA06B] focus:bg-[#8CA06B] border-none"
          >
            Masuk
          </Button>
        </div>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full text-black hover:bg-[#9DB17C] focus:bg-[#9DB17C]">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-[#9CDE9F] border-none w-[85vw] max-w-[300px] overflow-y-auto pt-10 px-5">
              <div className="flex flex-col gap-6 mt-16">
                <Link
                  to="/home"
                  className={cn(
                    "text-xl transition-colors hover:text-black flex items-center gap-2 text-black py-2",
                    isActiveLink("/home") && "bg-[#9DB17C] rounded-md px-3 py-2"
                  )}
                >
                  Beranda
                </Link>
                <Link
                  to="/user"
                  className={cn(
                    "text-xl transition-colors hover:text-black flex items-center gap-2 text-black py-2",
                    isActiveLink("/user") && "bg-[#9DB17C] rounded-md px-3 py-2"
                  )}
                >
                  Buat Laporan
                </Link>
                <Link
                  to="/walikota"
                  className={cn(
                    "text-xl transition-colors hover:text-black flex items-center gap-2 text-black py-2",
                    isActiveLink("/walikota") && "bg-[#9DB17C] rounded-md px-3 py-2"
                  )}
                >
                  Cek Status
                </Link>
                <div className="flex items-center gap-4 mt-6">
                  <Button size="sm" className="w-full rounded-full bg-[#9DB17C] text-black hover:bg-[#8CA06B]">
                    Masuk
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        
      </div>
    </nav>
  );
};

export default FloatingNavbar;