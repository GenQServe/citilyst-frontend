import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export const useGSAP = (animationFunction, dependencies = []) => {
  const ctx = useRef(gsap.context(() => {}));

  useEffect(() => {
    ctx.current.revert();

    ctx.current = gsap.context(animationFunction);

    return () => ctx.current.revert();
  }, dependencies);

  return ctx;
};

export default useGSAP;
