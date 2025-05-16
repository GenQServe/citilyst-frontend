import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import useGSAP from "@/hooks/use-gsap";
import { images } from "@/constants/images";

const steps = [
  {
    number: 1,
    title: "Verifikasi Identitas",
    description:
      "Sesuaikan data diri kamu untuk meningkatkan keamanan, mencegah penyalahgunaan, dan memastikan layanan publik berjalan lancar.",
  },
  {
    number: 2,
    title: "Masukkan Detail Laporan",
    description:
      "Masukkan kategori, tulis keluhan, masukkan lokasi kejadian, dan unggah foto sesuai laporan.",
  },
  {
    number: 3,
    title: "Preview Laporan",
    description:
      "Periksa detail laporan untuk memastikan keakuratan dan kelengkapan data.",
  },
  {
    number: 4,
    title: "Kirim Laporan",
    description: "Laporan siap dikirim ke pihak pemerintah.",
  },
  {
    number: 5,
    title: "Pantau Status",
    description: "Cek status laporan kapan saja secara real-time.",
  },
];

const HowWorks = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const stepsRef = useRef(null);
  const imageRef = useRef(null);
  const descriptionRefs = useRef({});
  const [activeSteps, setActiveSteps] = useState({});

  const toggleStep = (stepNumber) => {
    setActiveSteps((prev) => ({
      ...prev,
      [stepNumber]: !prev[stepNumber],
    }));
  };

  useEffect(() => {
    Object.keys(activeSteps).forEach((stepNumber) => {
      if (activeSteps[stepNumber] && descriptionRefs.current[stepNumber]) {
        gsap.fromTo(
          descriptionRefs.current[stepNumber],
          {
            opacity: 0,
            height: 0,
            y: -10,
          },
          {
            opacity: 1,
            height: "auto",
            y: 0,
            duration: 0.3,
            ease: "power2.out",
          }
        );
      }
    });
  }, [activeSteps]);

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
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
      )
      .fromTo(
        ".step-item",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.1,
          ease: "power2.out",
        },
        "-=0.2"
      )
      .fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.7, ease: "back.out(1.2)" },
        "-=0.5"
      );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-20 lg:py-24 bg-[#F4FFEE] overflow-hidden"
    >
      <div className="container mx-auto px-5 md:px-8 lg:px-10 xl:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
          <div className="px-4 md:px-6 lg:px-8 lg:text-left text-center">
            <h2
              ref={titleRef}
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
            >
              Cara Kerja CityList
            </h2>

            <h3 className="text-xl md:text-2xl font-medium mb-8">
              Hanya dengan{" "}
              <span className="text-[#4E9F60]">5 langkah mudah</span>:
            </h3>

            <div ref={stepsRef} className="space-y-3">
              {steps.map((step) => (
                <div key={step.number} className="step-item">
                  <div
                    className="flex items-center gap-4 cursor-pointer p-3 rounded-lg transition-all"
                    onClick={() => toggleStep(step.number)}
                  >
                    <div className="flex-shrink-0">
                      <span
                        className={`flex items-center justify-center w-8 h-8 rounded-full border-2 font-semibold ${
                          activeSteps[step.number]
                            ? "bg-[#4E9F60] text-[#F4FFEE]"
                            : "bg-[#F4FFEE] text-[#4E9F60]"
                        } ${
                          activeSteps[step.number]
                            ? "border-[#4E9F60]"
                            : "border-[#4E9F60]"
                        }`}
                      >
                        {step.number}
                      </span>
                    </div>
                    <h4
                      className={`text-lg font-bold flex-1 ${
                        activeSteps[step.number]
                          ? "text-[#4E9F60]"
                          : "text-[#4E9F60] "
                      }`}
                    >
                      {step.title}
                    </h4>
                  </div>

                  {activeSteps[step.number] && (
                    <div
                      ref={(el) => (descriptionRefs.current[step.number] = el)}
                      className="pl-16 pr-4 py-3 rounded-b-lg mt-1 overflow-hidden"
                    >
                      <p className="text-base text-black font-semibold">
                        {step.description}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div
            ref={imageRef}
            className="relative h-full order-first md:order-last"
          >
            <img
              src={images.peopleWithForm}
              alt="Cara Kerja Citilyst"
              className="object-contain max-h-[300px] md:max-h-[450px] mx-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowWorks;
