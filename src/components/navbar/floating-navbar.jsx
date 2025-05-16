import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoonIcon,
  SunIcon,
  Menu,
  LayoutGrid,
  Home,
  User,
  Building,
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
      backgroundColor: "rgba(255, 255, 255, 1)",
      border: "1px solid rgba(229, 231, 235, 1)",
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
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
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
    <nav ref={navbarRef} className="w-full fixed top-0 left-0 z-50">
      <div
        ref={navbarContentRef}
        className="container mx-auto px-4 flex items-center justify-between"
      >
        <Link to="/" className="text-xl font-bold flex items-center gap-2">
          <LayoutGrid className="w-6 h-6" />
          Citilyst
        </Link>

        <div className="hidden md:block">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/home">
                  <NavigationMenuLink
                    className={cn(
                      navigationMenuTriggerStyle(),
                      isActiveLink("/home") && "text-primary font-medium"
                    )}
                  >
                    <Home className="w-4 h-4 mr-2" />
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className={
                    isActiveLink("/user") && "text-primary font-medium"
                  }
                >
                  <User className="w-4 h-4 mr-2" />
                  User
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[300px] gap-3 p-4">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/user/home"
                          className="block select-none rounded-md p-3 hover:bg-accent"
                        >
                          <div className="text-sm font-medium">Dashboard</div>
                          <div className="mt-1 text-xs text-muted-foreground">
                            User dashboard overview
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/user/profile"
                          className="block select-none rounded-md p-3 hover:bg-accent"
                        >
                          <div className="text-sm font-medium">Profile</div>
                          <div className="mt-1 text-xs text-muted-foreground">
                            Manage your profile
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/walikota">
                  <NavigationMenuLink
                    className={cn(
                      navigationMenuTriggerStyle(),
                      isActiveLink("/walikota") && "text-primary font-medium"
                    )}
                  >
                    <Building className="w-4 h-4 mr-2" />
                    Walikota
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full h-9 w-9"
              >
                <SunIcon className="h-4 w-4 rotate-0 scale-100 transition-all" />
                <MoonIcon className="absolute h-4 w-4 rotate-90 scale-0 transition-all" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Light</DropdownMenuItem>
              <DropdownMenuItem>Dark</DropdownMenuItem>
              <DropdownMenuItem>System</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button size="sm" className="rounded-full">
            Login
          </Button>
        </div>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-6 mt-10">
                <Link
                  to="/home"
                  className={cn(
                    "text-xl transition-colors hover:text-primary flex items-center gap-2",
                    isActiveLink("/home") && "text-primary font-medium"
                  )}
                >
                  <Home className="w-5 h-5" />
                  Home
                </Link>
                <Link
                  to="/user"
                  className={cn(
                    "text-xl transition-colors hover:text-primary flex items-center gap-2",
                    isActiveLink("/user") && "text-primary font-medium"
                  )}
                >
                  <User className="w-5 h-5" />
                  User Area
                </Link>
                <Link
                  to="/walikota"
                  className={cn(
                    "text-xl transition-colors hover:text-primary flex items-center gap-2",
                    isActiveLink("/walikota") && "text-primary font-medium"
                  )}
                >
                  <Building className="w-5 h-5" />
                  Walikota
                </Link>
                <div className="flex items-center gap-4 mt-6">
                  <Button size="sm" className="w-full rounded-full">
                    Login
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
