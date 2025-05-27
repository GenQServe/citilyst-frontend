import api from "@/lib/api";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

export const getAllReports = async () => {
  try {
    const response = await api.get("/reports/");
    return response.data;
  } catch (error) {
    console.error("Error fetching reports:", error);
    throw error;
  }
};

export const updateReport = async ({ reportId, data }) => {
  try {
    const userId = data.user_id;
    if (!userId) {
      throw new Error("User ID pelapor diperlukan");
    }

    const statusMap = {
      PENDING: "pending",
      INPROGRESS: "in_progress",
      RESOLVED: "resolved",
      REJECTED: "rejected",
    };

    const formattedData = {
      report_id: reportId,
      user_id: userId,
      status: statusMap[data.status] || data.status.toLowerCase(),
      feedback: data.feedback || "",
    };

    console.log("Sending data to API:", formattedData);

    const response = await api.put(`/reports/${reportId}`, formattedData);
    return response.data;
  } catch (error) {
    console.error("Error updating report:", error.response?.data || error);
    throw error;
  }
};

export const getReportDetail = async (reportId) => {
  try {
    const response = await api.get(`/reports/${reportId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching report detail:", error);
    throw error;
  }
};
