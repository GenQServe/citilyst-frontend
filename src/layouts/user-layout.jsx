import { useRef } from "react";
import { Outlet } from "react-router-dom";
import FloatingNavbar from "@/components/navbar/floating-navbar";
import useGSAP from "@/hooks/use-gsap";
import { gsap } from "gsap";

const UserLayout = () => {
  const mainRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      mainRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8 }
    );
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <FloatingNavbar />

      <main ref={mainRef} className="flex-1 pt-20 pb-12">
        <Outlet />
      </main>

      <footer className="py-6 bg-secondary/20 border-t border-border">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Citilyst. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default UserLayout;
