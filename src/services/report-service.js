import api from "@/lib/api";

export const generateReportDescription = async (reportData) => {
  const response = await api.post("/reports/generate-description", reportData);
  return response.data;
};
