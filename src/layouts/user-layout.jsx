import { useRef } from "react";
import { Outlet } from "react-router-dom";
import FloatingNavbar from "@/components/navbar/floating-navbar";
import Footer from "@/components/footer";
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
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#F4FFEE] via-[#E8F7E4] to-[#D6EFDB]">
      <FloatingNavbar />

      <main ref={mainRef} className="flex-1 pt-20 pb-12">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default UserLayout;
