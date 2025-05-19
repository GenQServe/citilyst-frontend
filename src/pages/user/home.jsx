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
    if (userProfile) {
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
  }, [userProfile]);

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
        <DialogContent className="z-[100]">
          <DialogHeader>
            <DialogTitle>Lengkapi Profil Anda</DialogTitle>
            <DialogDescription>
              Untuk meningkatkan pengalaman penggunaan dan memastikan keamanan
              transaksi, silakan lengkapi data profil Anda. Data ini diperlukan
              untuk:
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Verifikasi identitas pengguna</li>
                <li>Pengiriman dokumen penting</li>
                <li>Komunikasi terkait layanan</li>
              </ul>
              <div className="mt-3 p-3 bg-amber-50 rounded-md border border-amber-200">
                <p className="font-medium text-amber-700">
                  Data yang perlu dilengkapi:
                </p>
                <ul className="list-disc pl-5 mt-1 text-amber-700">
                  {incompleteFields.map((field) => (
                    <li key={field}>{field}</li>
                  ))}
                </ul>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={handleCompleteProfile}
              className="bg-[#9CDE9F] hover:bg-green-500"
            >
              Lengkapi Profil
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowProfileAlert(false)}
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
