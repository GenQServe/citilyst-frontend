import api from "@/lib/api";

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
    // Map statuses to format expected by backend
    const statusMap = {
      "PENDING": "pending",
      "INPROGRESS": "in_progress", // Change to in_progress with underscore
      "RESOLVED": "resolved",
      "REJECTED": "rejected"
    };
    
    // Format the data according to what the API expects
    const formattedData = {
      status: statusMap[data.status] || data.status.toLowerCase(),
      feedback: data.feedback || ""
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