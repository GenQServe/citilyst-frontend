import { useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { gsap } from "gsap";

const FeedbackCard = ({ feedback }) => {
  const cardRef = useRef(null);

  const getFallbackInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : "U";
  };

  useEffect(() => {
    const card = cardRef.current;

    const enterAnimation = () => {
      gsap.to(card, {
        y: -8,
        scale: 1.02,
        boxShadow:
          "0 20px 25px -5px rgba(0, 0, 0, 0.15), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const leaveAnimation = () => {
      gsap.to(card, {
        y: 0,
        scale: 1,
        boxShadow:
          "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)",
        duration: 0.3,
        ease: "power2.out",
      });
    };

    card.addEventListener("mouseenter", enterAnimation);
    card.addEventListener("mouseleave", leaveAnimation);

    return () => {
      card.removeEventListener("mouseenter", enterAnimation);
      card.removeEventListener("mouseleave", leaveAnimation);
    };
  }, []);

  return (
    <Card
      ref={cardRef}
      className="relative p-6 shadow-lg bg-white rounded-xl border-none h-full flex flex-col"
    >
      <div className="flex items-center gap-2 mb-4">
        <Avatar className="h-8 w-8">
          <AvatarImage src={feedback.user_image_url} alt={feedback.user_name} />
          <AvatarFallback>
            {getFallbackInitial(feedback.user_name)}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-bold text-base">{feedback.user_name}</p>
          <p className="text-sm text-muted-foreground">• {feedback.location}</p>
        </div>
      </div>
      <blockquote className="flex-grow">
        <p className="text-base font-medium italic">"{feedback.description}"</p>
      </blockquote>
    </Card>
  );
};

export default FeedbackCard;
