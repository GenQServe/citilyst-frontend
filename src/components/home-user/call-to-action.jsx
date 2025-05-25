import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import useGSAP from "@/hooks/use-gsap";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";

const CallToAction = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const textRef = useRef(null);
  const buttonsRef = useRef(null);
  const navigate = useNavigate();

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
        headingRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
      )
      .fromTo(
        textRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
        "-=0.3"
      )
      .fromTo(
        buttonsRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
        "-=0.2"
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

  const handleCheckStatus = () => {
    const token = Cookies.get("token");
    if (!token) {
      navigate("/login", { state: { returnTo: "/user/check-status" } });
    } else {
      navigate("/user/check-status");
    }
  };

  return (
    <section ref={sectionRef} className="py-20 overflow-hidden">
      <div className="container mx-auto px-5 text-center">
        <h2 ref={headingRef} className="text-3xl md:text-4xl font-bold mb-4">
          Transparan. Cepat. Tepat.
        </h2>

        <p
          ref={textRef}
          className="text-gray-700 text-base md:text-lg max-w-2xl mx-auto mb-8"
        >
          Laporkan masalah lingkungan sekitar, biar pemerintah tangani dengan
          sat set
        </p>

        <div
          ref={buttonsRef}
          className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto"
        >
          <Button
            onClick={handleCreateReport}
            className="flex-1 bg-[#9DB17C] hover:bg-[#8CA06B] text-white px-6 py-2"
          >
            Lapor Sekarang
          </Button>

          <Button
            onClick={handleCheckStatus}
            variant="outline"
            className="flex-1 border-[#9DB17C] text-[#9DB17C] hover:bg-[#9DB17C]/10"
          >
            Cek Status
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
