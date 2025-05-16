import { useRef } from "react";
import { gsap } from "gsap";
import useGSAP from "@/hooks/use-gsap";
import { Check } from "lucide-react";
import { images } from "@/constants/images";

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
          ease: "power2.out",
        },
        "-=0.3"
      );
  }, []);

  const features = [
    {
      id: 1,
      label: "Mudah digunakan:",
      description: "Ketik keluhan sehari-hari, kami format-kan untuk Anda.",
    },
    {
      id: 2,
      label: "Cepat & Akurat:",
      description: "Pemerintah bisa intervensi lebih cepat & tepat",
    },
    {
      id: 3,
      label: "Transparan:",
      description: "Pantau status laporan kapan saja.",
    },
    {
      id: 4,
      label: "Aman & Resmi:",
      description: "Disalurkan langsung ke instansi terkait.",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-14 md:py-16 lg:py-20 bg-[#F4FFEE] overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 lg:gap-12 items-center">
          <div
            ref={imageRef}
            className="relative flex justify-center md:justify-start"
          >
            <img
              src={images.reportPhoto}
              alt="lebih mudah lapor"
              className="object-contain w-full max-h-[250px] md:max-h-[350px] lg:max-h-[400px]"
            />
          </div>

          <div className="text-left">
            <h2
              ref={titleRef}
              className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6"
            >
              Lapor Lebih Mudah dengan CityList
            </h2>

            <div className="space-y-4 md:space-y-5">
              {features.map((feature, index) => (
                <div
                  key={feature.id}
                  ref={(el) => (featuresRef.current[index] = el)}
                  className="flex items-start bg-white rounded-xl px-4 py-3 shadow-sm"
                >
                  <div className="flex-shrink-0 w-6 h-6 mr-3 bg-[#9CDE9F] rounded-full flex items-center justify-center text-white">
                    <Check size={14} strokeWidth={3} />
                  </div>
                  <div>
                    <span className="font-medium text-[#4E9F60] text-sm md:text-base">
                      {feature.label}
                    </span>{" "}
                    <span className="text-gray-700 text-xs md:text-sm">
                      {feature.description}
                    </span>
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
