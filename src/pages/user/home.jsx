import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "sonner";
import useGSAP from "@/hooks/use-gsap";
import WhyChoose from "@/components/home-user/why-choose";
import HowWorks from "@/components/home-user/how-works";
import Hero from "@/components/home-user/hero";
import CallToAction from "@/components/home-user/call-to-action";
import FeaturesHighlight from "@/components/home-user/features-highlight";
import FeedbackCarousel from "@/components/feedback/feedback-carousel";
import FAQ from "@/components/home-user/faq";
import { useUserProfile } from "@/hooks/use-auth";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const Home = () => {
  const heroRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [showProfileAlert, setShowProfileAlert] = useState(false);
  const [incompleteFields, setIncompleteFields] = useState([]);
  const [navbarVisible, setNavbarVisible] = useState(true);

  const token = Cookies.get("token");
  const { data: userProfile } = useUserProfile();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const urlToken = searchParams.get("token");

    if (urlToken) {
      Cookies.set("token", urlToken, {
        path: "/",
        expires: 30,
        sameSite: "Lax",
      });
      toast.success("Login berhasil!");
      navigate("/home", { replace: true });
    }
  }, [location, navigate]);

  useEffect(() => {
    if (token && userProfile) {
      const missingFields = [];

      if (!userProfile.phone_number) missingFields.push("Nomor Telepon");
      if (!userProfile.address) missingFields.push("Alamat");
      if (!userProfile.nik) missingFields.push("NIK");

      if (missingFields.length > 0) {
        setIncompleteFields(missingFields);
        setShowProfileAlert(true);
        setNavbarVisible(false);
      }
    }
  }, [userProfile, token]);

  useEffect(() => {
    const navbarElement = document.querySelector("nav");
    if (navbarElement) {
      if (showProfileAlert) {
        navbarElement.style.zIndex = "10";
      } else {
        navbarElement.style.zIndex = "50";
        setNavbarVisible(true);
      }
    }
  }, [showProfileAlert]);

  const handleCompleteProfile = () => {
    navigate("/profile");
    setShowProfileAlert(false);
  };

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      heroRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.2 }
    );
  }, []);

  return (
    <>
      <div className="space-y-20">
        <Hero ref={heroRef} />
        <WhyChoose />
        <HowWorks />
        <FeaturesHighlight />
        <FeedbackCarousel />
        <FAQ />
        <CallToAction />
      </div>

      <Dialog
        open={showProfileAlert}
        onOpenChange={(open) => {
          setShowProfileAlert(open);
          setNavbarVisible(!open);
        }}
      >
        <DialogContent className="z-[100] max-w-[95%] w-full sm:max-w-md rounded-lg bg-gradient-to-b from-[#F4FFEE] to-[#E0F5E0]">
          <DialogHeader>
            <DialogTitle className="text-left text-xl text-green-800">
              Lengkapi Profil CityList Anda
            </DialogTitle>
            <DialogDescription className="text-green-700 text-left">
              Untuk mengoptimalkan pengalaman pelaporan dan memastikan
              keakuratan informasi, silakan lengkapi data profil Anda. Profil
              lengkap membantu kami:
              <ul className="mt-3 space-y-2">
                <li className="flex items-start">
                  <span className="mr-2 mt-1 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
                    <span className="h-2 w-2 rounded-full bg-green-500"></span>
                  </span>
                  <span className="text-left">
                    Memverifikasi pelaporan dari warga yang sah
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-1 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
                    <span className="h-2 w-2 rounded-full bg-green-500"></span>
                  </span>
                  <span className="text-left">
                    Memetakan lokasi permasalahan dengan tepat
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-1 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
                    <span className="h-2 w-2 rounded-full bg-green-500"></span>
                  </span>
                  <span className="text-left">
                    Mengirim update status penanganan masalah
                  </span>
                </li>
              </ul>
              <div className="mt-4 p-3 bg-amber-50 rounded-md border border-amber-200">
                <p className="font-medium text-amber-700">
                  Data yang perlu dilengkapi:
                </p>
                <ul className="mt-2 space-y-1.5">
                  {incompleteFields.map((field) => (
                    <li
                      key={field}
                      className="flex items-center text-amber-700"
                    >
                      <span className="mr-2 text-amber-500">•</span>
                      {field}
                    </li>
                  ))}
                </ul>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-center gap-2 mt-2">
            <Button
              onClick={handleCompleteProfile}
              className="bg-[#9CDE9F] hover:bg-green-500 flex-1 sm:flex-none text-green-900 hover:text-white"
            >
              Lengkapi Profil
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowProfileAlert(false)}
              className="flex-1 sm:flex-none border-green-300 text-green-800 hover:bg-green-50"
            >
              Nanti
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Home;
