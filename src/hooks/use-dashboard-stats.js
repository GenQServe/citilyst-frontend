import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { getAllUsers, getAllReports, getRecentReports } from "@/services/dashboard-service";
import { format } from "date-fns";
import { id } from "date-fns/locale";

// Hook for getting all users count
export function useUsersCount() {
  return useQuery({
    queryKey: ["usersCount"],
    queryFn: async () => {
      const data = await getAllUsers();
      return {
        totalUsers: data.data.length || 0
      };
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Gagal mengambil data pengguna"
      );
    },
  });
}

// Hook for getting report statistics
export function useReportsStats() {
  return useQuery({
    queryKey: ["reportsStats"],
    queryFn: async () => {
      const data = await getAllReports();
      const reports = data.data || [];
      
      // Count reports by status
      const pendingCount = reports.filter(report => 
        report.status.toLowerCase() === "pending").length;
      
      const resolvedCount = reports.filter(report => 
        report.status.toLowerCase() === "resolved").length;
      
      return {
        totalReports: reports.length,
        pendingReports: pendingCount,
        resolvedReports: resolvedCount,
      };
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Gagal mengambil statistik laporan"
      );
    },
  });
}

// Hook for getting recent reports
export function useRecentReports(limit = 5) {
  return useQuery({
    queryKey: ["recentReports", limit],
    queryFn: async () => {
      const data = await getRecentReports(limit);
      
      // Format the reports for display
      return data.data.map(report => ({
        id: report.report_id,
        title: report.title || `Laporan ${report.category_name}`,
        status: report.status.toUpperCase(),
        date: format(new Date(report.created_at), "dd MMM yyyy", { locale: id }),
        category: report.category_name,
      }));
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Gagal mengambil laporan terbaru"
      );
    },
  });
}

// Hook for monthly reports chart data
export function useMonthlyReportsChart() {
  return useQuery({
    queryKey: ["monthlyReportsChart"],
    queryFn: async () => {
      const data = await getAllReports();
      const reports = data.data || [];
      
      // Data 6 bulan terakhir
      const months = [];
      const today = new Date();
      
      for (let i = 5; i >= 0; i--) {
        const month = new Date(today.getFullYear(), today.getMonth() - i, 1);
        months.push({
          month: month,
          label: format(month, "MMM yyyy", { locale: id })
        });
      }
      
      // Menghitung jumlah laporan per bulan dan status
      const chartData = months.map(({ month, label }) => {
        const monthStart = new Date(month.getFullYear(), month.getMonth(), 1);
        const monthEnd = new Date(month.getFullYear(), month.getMonth() + 1, 0);
        
        const monthReports = reports.filter(report => {
          const reportDate = new Date(report.created_at);
          return reportDate >= monthStart && reportDate <= monthEnd;
        });
        
        const pending = monthReports.filter(report => 
          report.status.toLowerCase() === "pending").length;
          
        const inProgress = monthReports.filter(report => 
          report.status.toLowerCase() === "in_progress" || 
          report.status.toLowerCase() === "inprogress").length;
          
        const resolved = monthReports.filter(report => 
          report.status.toLowerCase() === "resolved").length;
          
        const rejected = monthReports.filter(report => 
          report.status.toLowerCase() === "rejected").length;
        
        return {
          label,
          pending,
          inProgress,
          resolved,
          rejected,
          total: monthReports.length
        };
      });
      
      return chartData;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Gagal mengambil data grafik laporan"
      );
    },
  });
}