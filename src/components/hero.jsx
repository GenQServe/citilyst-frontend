import { useRef } from "react";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";
import useGSAP from "@/hooks/use-gsap";
import { Button } from "@/components/ui/button";
import heroPhoto from "@/constants/heroPhoto.png"; // Fixed import statement

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
    navigate("/user/create-report");
  };

  return (
    <section ref={heroRef} className="py-12 md:py-20 bg-[#F4FFEE] overflow-hidden ">
    <div className="container mx-auto px-4 sm:px-5 md:px-8 lg:px-4 xl:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div ref={textRef} className="space-y-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
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
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </Button>
            </div>
          </div>
          <div 
            ref={imageRef} 
            className="relative order-first md:order-last rounded-lg overflow-hidden shadow-xl"
          >
            <img
              src={heroPhoto} // Using the imported image
              alt="Citizen reporting using CitiLyst"
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;