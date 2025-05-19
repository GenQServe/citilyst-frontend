import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@/hooks/use-gsap";
import { useFeedbacks } from "@/hooks/use-feedbacks";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import FeedbackCard from "./feedback-card";
import FeedbackCardSkeleton from "./feedback-card-skeleton";
import { AlertCircle } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const FeedbackCarousel = () => {
  const { data, isLoading, isError, error, refetch } = useFeedbacks();
  const carouselRef = useRef(null);
  const titleRef = useRef(null);
  const carouselApiRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
    ).fromTo(
      carouselRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      "-=0.3"
    );
  }, []);

  if (isError) {
    return (
      <div className="py-16">
        <div className="container mx-auto px-4">
          <h2
            ref={titleRef}
            className="text-3xl md:text-4xl font-bold text-center mb-10"
          >
            Keluhan Warga yang Beres!
          </h2>
          <div className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow-lg">
            <Alert variant="destructive" className="mb-6 border-red-300">
              <AlertCircle className="h-5 w-5" />
              <AlertTitle className="text-lg font-medium">
                Gagal memuat data
              </AlertTitle>
              <AlertDescription className="mt-2">
                {error?.message ||
                  "Terjadi kesalahan saat memuat data ulasan pengguna."}
              </AlertDescription>
            </Alert>
            <div className="flex justify-center">
              <Button
                onClick={() => refetch()}
                variant="default"
                size="lg"
                className="bg-[#9DB17C] hover:bg-[#8CA06B] text-white px-8 py-2 rounded-md font-medium"
              >
                Coba lagi
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const feedbacks = data?.data || [];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2
          ref={titleRef}
          className="text-3xl md:text-4xl font-bold text-center mb-8"
        >
          Keluhan Warga yang Beres!
        </h2>

        <div ref={carouselRef} className="mx-auto max-w-6xl">
          <div className="flex justify-end gap-2 mb-6">
            <Button
              variant="outline"
              size="icon"
              className="bg-[#9DB17C] text-white hover:bg-[#8CA06B] border-none rounded-full"
              onClick={() => carouselApiRef.current?.scrollPrev()}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="bg-[#9DB17C] text-white hover:bg-[#8CA06B] border-none rounded-full"
              onClick={() => carouselApiRef.current?.scrollNext()}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
            setApi={(api) => (carouselApiRef.current = api)}
          >
            <CarouselContent className="py-8 px-1">
              {isLoading
                ? Array(3)
                    .fill(0)
                    .map((_, index) => (
                      <CarouselItem
                        key={index}
                        className="md:basis-1/2 lg:basis-1/3 h-full pl-4"
                      >
                        <div className="h-full">
                          <FeedbackCardSkeleton />
                        </div>
                      </CarouselItem>
                    ))
                : feedbacks.map((feedback) => (
                    <CarouselItem
                      key={feedback.id}
                      className="md:basis-1/2 lg:basis-1/3 h-full pl-4"
                    >
                      <div className="h-full">
                        <FeedbackCard feedback={feedback} />
                      </div>
                    </CarouselItem>
                  ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default FeedbackCarousel;
