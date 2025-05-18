import { useRef, useEffect } from "react";
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

const Home = () => {
  const heroRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get("token");

    if (token) {
      Cookies.set("token", token, {
        path: "/",
        expires: 30,
        sameSite: "Lax",
      });
      toast.success("Login berhasil!");
      navigate("/home", { replace: true });
    }
  }, [location, navigate]);

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
      <Hero />
      <WhyChoose />
      <HowWorks />
      <FeaturesHighlight />
      <FeedbackCarousel />
      <FAQ />
      <CallToAction />
    </div>
  );
};

export default Home;
