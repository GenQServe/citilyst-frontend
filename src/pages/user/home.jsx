import { useRef } from "react";
import { gsap } from "gsap";
import useGSAP from "@/hooks/use-gsap";
import WhyChoose from "@/components/why-choose";
import HowWorks from "@/components/how-works";
import Hero from "@/components/hero";
import CallToAction from "@/components/call-to-action";
import FeaturesHighlight from "@/components/features-highlight";
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
