import { useLayoutEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

const GSAPProvider = ({ children }) => {
  const [isGSAPReady, setIsGSAPReady] = useState(false);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    gsap.defaults({
      ease: "power3.out",
      duration: 0.8,
    });

    setIsGSAPReady(true);

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return isGSAPReady ? children : null;
};

export default GSAPProvider;
