import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { Menu, X, LayoutGrid } from "lucide-react";

const FloatingNavbar = () => {
  const navbarRef = useRef(null);
  const navbarContentRef = useRef(null);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isFloating, setIsFloating] = useState(false);

  useEffect(() => {
    const navbar = navbarRef.current;
    const navbarContent = navbarContentRef.current;

    gsap.set(navbar, {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      width: "100%",
      padding: "16px 0",
      borderRadius: "0px",
      boxShadow: "none",
      backdropFilter: "none",
      backgroundColor: "#9CDE9F",
      border: "none",
      zIndex: 100,
      margin: "0 auto",
    });

    const tl = gsap.timeline({ paused: true });

    tl.to(navbar, {
      top: 16,
      left: "50%",
      xPercent: -50,
      width: "80%",
      padding: "10px 0",
      borderRadius: "16px",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
      backdropFilter: "blur(12px)",
      backgroundColor: "#9CDE9F",
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
        setIsFloating(true);
      } else {
        tl.progress(0);
        setIsFloating(false);
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

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <nav
      ref={navbarRef}
      className="w-full fixed top-0 left-0 z-50 bg-[#9CDE9F]"
    >
      <div
        ref={navbarContentRef}
        className="container mx-auto px-4 flex items-center justify-between"
      >
        <Link
          to="/"
          className="text-xl font-bold flex items-center gap-2 text-black"
        >
          <LayoutGrid className="w-6 h-6" />
          CityList
        </Link>

        <div className="hidden lg:flex items-center justify-center flex-1">
          <div className="flex items-center gap-2">
            <Link
              to="/home"
              className={cn(
                "inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-black hover:bg-[#9DB17C] hover:text-black focus:bg-[#9DB17C] focus:text-black",
                isActiveLink("/home") && "bg-[#9DB17C] text-black font-medium"
              )}
            >
              Beranda
            </Link>
            <Link
              to="/user"
              className={cn(
                "inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-black hover:bg-[#9DB17C] hover:text-black focus:bg-[#9DB17C] focus:text-black",
                isActiveLink("/user") && "bg-[#9DB17C] text-black font-medium"
              )}
            >
              Buat Laporan
            </Link>
            <Link
              to="/walikota"
              className={cn(
                "inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-black hover:bg-[#9DB17C] hover:text-black focus:bg-[#9DB17C] focus:text-black",
                isActiveLink("/walikota") &&
                  "bg-[#9DB17C] text-black font-medium"
              )}
            >
              Cek Status
            </Link>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-2">
          <Link to="/login">
            <Button
              size="sm"
              className="rounded-full bg-[#9DB17C] text-white hover:bg-[#8CA06B] focus:bg-[#8CA06B] border-none"
            >
              Masuk
            </Button>
          </Link>
          <Link to="/register">
            <Button
              size="sm"
              variant="outline"
              className="rounded-full border-[#9DB17C] text-[#9DB17C] hover:bg-[#9DB17C]/10 hover:text-[#8CA06B] focus:bg-[#9DB17C]/10"
            >
              Daftar
            </Button>
          </Link>
        </div>

        <div className="lg:hidden">
          <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-black hover:bg-[#9DB17C] focus:bg-[#9DB17C] relative flex items-center justify-center"
                onClick={toggleMenu}
              >
                <span className="w-6 h-6 relative flex items-center justify-center">
                  <Menu
                    className={`absolute transition-all duration-300 ${
                      menuOpen
                        ? "opacity-0 rotate-90 scale-0"
                        : "opacity-100 rotate-0 scale-100"
                    }`}
                    size={24}
                  />
                  <X
                    className={`absolute transition-all duration-300 ${
                      menuOpen
                        ? "opacity-100 rotate-0 scale-100"
                        : "opacity-0 -rotate-90 scale-0"
                    }`}
                    size={24}
                  />
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              ref={dropdownRef}
              align="end"
              className="w-[100vw] bg-[#9CDE9F] border-none mt-2 px-6 py-4 shadow-lg rounded-xl"
              sideOffset={8}
              onCloseAutoFocus={(e) => e.preventDefault()}
            >
              <div className="flex flex-col gap-4 animate-in slide-in-from-top-5 duration-300">
                <Link
                  to="/home"
                  className={cn(
                    "text-lg transition-colors hover:text-black flex items-center gap-2 text-black py-2",
                    isActiveLink("/home") && "bg-[#9DB17C] rounded-md px-3 py-2"
                  )}
                  onClick={() => setMenuOpen(false)}
                >
                  Beranda
                </Link>
                <Link
                  to="/user"
                  className={cn(
                    "text-lg transition-colors hover:text-black flex items-center gap-2 text-black py-2",
                    isActiveLink("/user") && "bg-[#9DB17C] rounded-md px-3 py-2"
                  )}
                  onClick={() => setMenuOpen(false)}
                >
                  Buat Laporan
                </Link>
                <Link
                  to="/walikota"
                  className={cn(
                    "text-lg transition-colors hover:text-black flex items-center gap-2 text-black py-2",
                    isActiveLink("/walikota") &&
                      "bg-[#9DB17C] rounded-md px-3 py-2"
                  )}
                  onClick={() => setMenuOpen(false)}
                >
                  Cek Status
                </Link>
                <div className="pt-2 mt-2 border-t border-[#8CA06B]/30">
                  <div className="grid grid-cols-2 gap-2">
                    <Link to="/login">
                      <Button
                        size="sm"
                        className="w-full rounded-full bg-[#9DB17C] text-white hover:bg-[#8CA06B] focus:bg-[#8CA06B] border-none"
                        onClick={() => setMenuOpen(false)}
                      >
                        Masuk
                      </Button>
                    </Link>
                    <Link to="/register">
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full rounded-full border-[#9DB17C] text-[#9DB17C] hover:bg-[#9DB17C]/10 hover:text-[#8CA06B] focus:bg-[#9DB17C]/10"
                        onClick={() => setMenuOpen(false)}
                      >
                        Daftar
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default FloatingNavbar;
