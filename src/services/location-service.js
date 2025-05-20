import api from "@/lib/api";

export const getDistrictsWithVillages = async () => {
  const response = await api.get("/districts/with-villages");
  return response.data;
};

export const getReportCategories = async () => {
  const response = await api.get("/reports/category");
  return response.data;
};
