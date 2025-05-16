import { useRef } from "react";
import { gsap } from "gsap";
import useGSAP from "@/hooks/use-gsap";
import WhyChoose from "@/components/home-user/why-choose";
import HowWorks from "@/components/home-user/how-works";
import Hero from "@/components/home-user/hero";
import CallToAction from "@/components/home-user/call-to-action";
import FeaturesHighlight from "@/components/home-user/features-highlight";
import FeedbackCarousel from "@/components/feedback/feedback-carousel";

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
      <Hero />
      <WhyChoose />
      <HowWorks />
      <FeaturesHighlight />
      <FeedbackCarousel />
      <CallToAction />
    </div>
  );
};

export default Home;
