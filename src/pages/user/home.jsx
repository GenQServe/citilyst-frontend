import { useRef } from "react";
import { gsap } from "gsap";
import useGSAP from "@/hooks/use-gsap";
import WhyChoose from "@/components/why-choose";

const Home = () => {
  const heroRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      heroRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.2 }
    );
  }, []);

  return (
    <div className="space-y-20">
      <section ref={heroRef} className="container mx-auto px-4 py-16">
        <h1 className="text-5xl font-bold mb-6">Selamat Datang di Citilyst</h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          Platform pelaporan dan pengaduan masyarakat modern yang menghubungkan
          warga dengan pemerintah kota.
        </p>
      </section>

      <WhyChoose />
    </div>
  );
};

export default Home;
