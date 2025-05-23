import api from "@/lib/api";

export const generateReportDescription = async (reportData) => {
  const response = await api.post("/reports/generate-description", reportData);
  return response.data;
};

export const submitReport = async (reportData) => {
  const response = await api.post("/reports/", reportData);
  return response.data;
};

export const uploadReportImages = async ({ reportId, images }) => {
  const formData = new FormData();
  formData.append("report_id", reportId);

  images.forEach((image) => {
    formData.append("files", image.file);
  });

  const response = await api.post("/reports/images", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
