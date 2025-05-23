import api from "@/lib/api";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

// Function to get user reports
export const getUserReports = async () => {
  const token = Cookies.get("token");

  if (!token) {
    throw new Error("Token tidak ditemukan");
  }

  try {
    const decoded = jwtDecode(token);
    const userId = decoded.sub;

    if (!userId) {
      throw new Error("User ID tidak valid");
    }

    const response = await api.get(`/reports/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user reports:", error);
    throw error;
  }
};

// Function to generate a report description
export const generateReportDescription = async (reportData) => {
  const response = await api.post("/reports/generate-description", reportData);
  return response.data;
};

// Function to submit a report
export const submitReport = async (reportData) => {
  const response = await api.post("/reports/", reportData);
  return response.data;
};

// Function to upload report images
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
