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
      label: "Mudah:",
      description: "Cukup ketik keluhan, kami bantu format otomatis.",
    },
    {
      id: 2,
      label: "Cepat:",
      description: "Laporan diteruskan untuk intervensi tepat.",
    },
    {
      id: 3,
      label: "Transparan:",
      description: "Status laporan bisa dipantau kapan saja.",
    },
    {
      id: 4,
      label: "Resmi:",
      description: "Langsung terhubung ke instansi terkait.",
    },
    {
      id: 5,
      label: "Notifikasi:",
      description: "Update laporan dikirim rutin lewat email.",
    },
    {
      id: 6,
      label: "AI Bantu:",
      description: "AI bantu buat laporan resmi secara efisien.",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-14 md:py-16 lg:py-20 overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 xl:gap-16 items-center">
          <div
            ref={imageRef}
            className="relative flex justify-center md:justify-start order-2 md:order-1"
          >
            <img
              src={images.reportPhoto}
              alt="lebih mudah lapor"
              className="object-contain w-full max-h-[250px] md:max-h-[320px] lg:max-h-[360px] xl:max-h-[400px]"
            />
          </div>

          <div className="text-left order-1 md:order-2">
            <h2
              ref={titleRef}
              className="text-2xl md:text-3xl lg:text-3xl xl:text-4xl font-bold mb-4 md:mb-6 lg:mb-8"
            >
              Lapor Lebih Mudah dengan CityList
            </h2>

            <div className="space-y-3 sm:space-y-4 md:space-y-4 lg:space-y-5">
              {features.map((feature, index) => (
                <div
                  key={feature.id}
                  ref={(el) => (featuresRef.current[index] = el)}
                  className="flex items-center bg-white rounded-xl px-3 sm:px-4 md:px-4 lg:px-5 xl:px-6 py-2.5 sm:py-3 md:py-3 lg:py-3.5 xl:py-4 shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 md:w-6 md:h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8 mr-2 sm:mr-3 md:mr-3 lg:mr-4 xl:mr-4 bg-[#9CDE9F] rounded-full flex items-center justify-center text-white">
                    <Check
                      size={12}
                      strokeWidth={3}
                      className="sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 lg:h-4 lg:w-4 xl:h-5 xl:w-5"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-left lg:flex lg:items-center break-words lg:break-normal">
                      <span className="font-medium text-[#4E9F60] text-xs sm:text-xs md:text-xs lg:text-xs xl:text-sm lg:leading-normal">
                        {feature.label}
                      </span>
                      <span className="inline-block w-1"></span>
                      <span className="text-gray-700 text-xs sm:text-xs md:text-xs lg:text-xs xl:text-sm lg:leading-normal">
                        {feature.description}
                      </span>
                    </div>
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
