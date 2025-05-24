import api from "@/lib/api";

// User services
export const getAllUsers = async () => {
  try {
    const response = await api.get("/user/");
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

// Report services
export const getAllReports = async () => {
  try {
    const response = await api.get("/reports/");
    return response.data;
  } catch (error) {
    console.error("Error fetching reports:", error);
    throw error;
  }
};

// Get recent reports (sorted by created_at)
export const getRecentReports = async (limit = 5) => {
  try {
    const response = await api.get("/reports/");
    const sortedReports = response.data.data.sort((a, b) => 
      new Date(b.created_at) - new Date(a.created_at)
    ).slice(0, limit);
    
    return { data: sortedReports };
  } catch (error) {
    console.error("Error fetching recent reports:", error);
    throw error;
  }
};