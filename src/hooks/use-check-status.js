import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { getUserReports } from "@/services/report-service";

// Hook for getting user reports
export function useUserReports() {
  return useQuery({
    queryKey: ["userReports"],
    queryFn: getUserReports,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Gagal mengambil data laporan"
      );
    },
  });
}
