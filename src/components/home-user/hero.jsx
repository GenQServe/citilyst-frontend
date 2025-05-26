import { useRef } from "react";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";
import useGSAP from "@/hooks/use-gsap";
import { Button } from "@/components/ui/button";
import { images } from "@/constants/images";
import { FiArrowRight } from "react-icons/fi";
import Cookies from "js-cookie";

const Hero = () => {
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);
  const buttonRef = useRef(null);
  const navigate = useNavigate();

  useGSAP(() => {
    const timeline = gsap.timeline();

    timeline
      .fromTo(
        textRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      )
      .fromTo(
        imageRef.current,
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" },
        "-=0.4"
      )
      .fromTo(
        buttonRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
        "-=0.4"
      );
  }, []);

  const handleCreateReport = () => {
    const token = Cookies.get("token");
    if (!token) {
      navigate("/login", { state: { returnTo: "/user/create-report" } });
    } else {
      navigate("/user/create-report");
    }
  };

  return (
    <section ref={heroRef} className="py-12 md:py-20 overflow-hidden ">
      <div className="container mx-auto px-4 sm:px-5 md:px-8 lg:px-4 xl:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div ref={textRef} className="space-y-6 items-start">
            <h1 className="text-3xl md:text-4xl lg:text-[2.6rem] xl:text-5xl font-bold leading-tight">
              Laporkan Keluhan <br />
              Wujudkan Perubahan
            </h1>
            <p className="text-gray-700 text-base md:text-lg max-w-md">
              Solusi cerdas untuk menyampaikan keluhan warga dengan resmi,
              tertata, dan sampai ke pemerintah.
            </p>
            <div ref={buttonRef}>
              <Button
                onClick={handleCreateReport}
                className="bg-[#9DB17C] hover:bg-[#8CA06B] text-white px-6 py-2 rounded-md flex items-center gap-2"
              >
                Buat Laporan Sekarang
                <FiArrowRight size={18} />
              </Button>
            </div>
          </div>
          <div
            ref={imageRef}
            className="relative order-first md:order-last rounded-lg overflow-hidden"
          >
            <img
              src={images.heroNewBanner}
              alt="Citizen reporting using CitiLyst"
              className="w-full h-auto lg:h-[300px] xl:h-[400px] object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
