import { useRef } from "react";
import { gsap } from "gsap";
import { Card, CardContent } from "@/components/ui/card";
import { icons } from "@/constants/icons";
import useGSAP from "@/hooks/use-gsap";

const featureData = [
  {
    icon: icons.formSparkle,
    title: "Form Laporan Resmi Otomatis",
    description:
      "Tulis keluhan dengan bahasa sehari-hari, kami bantu ubah jadi laporan resmi.",
  },
  {
    icon: icons.circle,
    title: "Judul Laporan Otomatis",
    description:
      "Dengan teknologi AI, kami merangkum keluhan anda menjadi judul laporan yang jelas dan singkat",
  },
  {
    icon: icons.progress,
    title: "Pantau Status",
    description:
      "Pantau progress laporan secara real-time kapan saja di mana saja.",
  },
  {
    icon: icons.mail,
    title: "Notifikasi Update",
    description: "Dapatkan notifikasi melalui email secara berkala",
  },
];

const WhyChoose = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);

  useGSAP(() => {
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    timeline.fromTo(
      titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );

    cardsRef.current.forEach((card, index) => {
      timeline.fromTo(
        card,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.4"
      );
    });
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-20 lg:py-24 bg-[#F4FFEE]">
      <div className="container mx-auto px-5 md:px-8 lg:px-10 xl:px-12">
        <h2
          ref={titleRef}
          className="text-2xl md:text-4xl lg:text-5xl font-semibold text-center mb-12 md:mb-16 lg:mb-20"
        >
          Kenapa Pilih CityList?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-6 lg:gap-4 xl:gap-8 px-2 sm:px-4 md:px-6">
          {featureData.map((feature, index) => (
            <Card
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="bg-white border-none rounded-xl shadow-md hover:shadow-xl transform transition-all duration-300 hover:-translate-y-2 aspect-square overflow-hidden"
            >
              <CardContent className="flex flex-col items-center justify-center text-center p-5 sm:p-6 lg:p-4 xl:p-6 h-full">
                <div className="flex items-center justify-center mb-4 lg:mb-2 xl:mb-4">
                  <img
                    src={feature.icon}
                    alt={feature.title}
                    className="w-16 h-16 sm:w-18 sm:h-18 lg:w-16 lg:h-16 xl:w-20 xl:h-20"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <h3 className="text-lg sm:text-xl lg:text-lg xl:text-2xl font-bold mb-2 lg:mb-1 xl:mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm lg:text-xs xl:text-base">
                    {feature.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
