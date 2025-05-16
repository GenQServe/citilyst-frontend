import { Button } from "@/components/ui/button";
import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import useGSAP from "@/hooks/use-gsap";

const Dashboard = () => {
  const dashboardRef = useRef(null);
  const cardsRef = useRef([]);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      dashboardRef.current.querySelector("h1"),
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.5 }
    )
      .fromTo(
        dashboardRef.current.querySelector("p"),
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.5 },
        "-=0.3"
      )
      .fromTo(
        cardsRef.current,
        { opacity: 0, y: 30, stagger: 0.1 },
        { opacity: 1, y: 0, stagger: 0.1 },
        "-=0.2"
      );
  }, []);

  const addToCardsRef = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  return (
    <div className="container mx-auto p-4" ref={dashboardRef}>
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <p className="mb-4">Manage your Citilyst application here.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-4 border rounded-md" ref={addToCardsRef}>
          <h2 className="font-bold">Users</h2>
          <p>Manage system users</p>
          <Button className="mt-2" variant="outline">
            Manage
          </Button>
        </div>
        <div className="p-4 border rounded-md" ref={addToCardsRef}>
          <h2 className="font-bold">Settings</h2>
          <p>System configuration</p>
          <Button className="mt-2" variant="outline">
            Configure
          </Button>
        </div>
        <div className="p-4 border rounded-md" ref={addToCardsRef}>
          <h2 className="font-bold">Reports</h2>
          <p>View analytics</p>
          <Button className="mt-2" variant="outline">
            View
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
