import api from "@/lib/api";

export const fetchFeedback = async () => {
  try {
    const response = await api.get("/feedback-user/");
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch feedback";
    throw new Error(errorMessage);
  }
};
