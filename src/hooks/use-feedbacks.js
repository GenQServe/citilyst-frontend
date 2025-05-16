import { useQuery } from "@tanstack/react-query";
import { fetchFeedback } from "@/services/feedback-service";

export const useFeedbacks = () => {
  return useQuery({
    queryKey: ["feedbacks"],
    queryFn: fetchFeedback,
    staleTime: 1000 * 60 * 5,
    retry: 2,
    refetchOnWindowFocus: false,
  });
};
