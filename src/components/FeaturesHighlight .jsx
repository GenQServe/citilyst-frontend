import { useRef } from "react";
import { gsap } from "gsap";
import useGSAP from "@/hooks/use-gsap";
import laporPhoto from "@/constants/lapor.png";
const FeaturesHighlight = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const featuresRef = useRef([]);
  const imageRef = useRef(null);

  useGSAP(() => {
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    timeline
      .fromTo(
        titleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
      )
      .fromTo(
        imageRef.current,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.6, ease: "power3.out" },
        "-=0.3"
      )
      .fromTo(
        featuresRef.current,
        { opacity: 0, y: 15 },
        { 
          opacity: 1, 
          y: 0, 
          stagger: 0.1, 
          duration: 0.5, 
          ease: "power2.out" 
        },
        "-=0.3"
      );
  }, []);

  const features = [
    {
      id: 1,
      icon: "✓",
      label: "Mudah digunakan:",
      description: "Ketik keluhan sehari-hari, kami format-kan untuk Anda."
    },
    {
      id: 2,
      icon: "✓",
      label: "Cepat & Akurat:",
      description: "Pemerintah bisa intervensi lebih cepat & tepat"
    },
    {
      id: 3, 
      icon: "✓",
      label: "Transparan:",
      description: "Pantau status laporan kapan saja."
    },
    {
      id: 4,
      icon: "✓",
      label: "Aman & Resmi:",
      description: "Disalurkan langsung ke instansi terkait."
    }
  ];

  return (
    <section 
      ref={sectionRef} 
      className="py-14 md:py-16 lg:py-20 bg-[#F4FFEE] overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-4 lg:px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
          <div
            ref={imageRef}
            className="relative flex justify-center"
          >
            <img
              src={laporPhoto}
              alt="lebih mudah lapor"
              className="object-contain max-h-[220px] md:max-h-[300px] lg:max-h-[350px]"
            />
          </div>
          
          {/* Text on the right */}
          <div className="px-2 md:px-3 text-center md:text-left">
            <h6
              ref={titleRef}
              className="text-xl md:text-2xl lg:text-3xl font-bold mb-2 md:mb-3"
            >
              Lapor Lebih Mudah dengan CityList
            </h6>

            <div className="space-y-2 mt-4">
              {features.map((feature, index) => (
                <div 
                  key={feature.id} 
                  ref={(el) => featuresRef.current[index] = el}
                  className="flex items-center bg-white rounded-full px-2.5 py-1 shadow-sm"
                >
                  <div className="flex-shrink-0 w-3.5 h-3.5 mr-1.5 bg-[#9CDE9F] rounded-full flex items-center justify-center text-white text-[0.6rem]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <div>
                    <span className="font-medium text-[#4E9F60] text-[0.65rem] sm:text-xs">{feature.label}</span>{" "}
                    <span className="text-gray-700 text-[0.6rem] sm:text-[0.65rem]">{feature.description}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesHighlight;