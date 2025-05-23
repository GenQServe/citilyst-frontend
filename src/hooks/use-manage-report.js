import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getAllReports, updateReport, getReportDetail } from "@/services/use-manage";

export function useGetAllReports() {
  return useQuery({
    queryKey: ["reports"],
    queryFn: getAllReports,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1, // Only retry once
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Gagal mengambil data laporan"
      );
    },
  });
}

export function useGetReportDetail(reportId) {
  return useQuery({
    queryKey: ["report", reportId],
    queryFn: () => getReportDetail(reportId),
    enabled: !!reportId,
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Gagal mengambil detail laporan"
      );
    },
  });
}

export function useUpdateReport() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: updateReport,
    onSuccess: () => {
      toast.success("Status laporan berhasil diperbarui");
      queryClient.invalidateQueries({ queryKey: ["reports"] });
    },
    onError: (error) => {
      // Improved error handling
      const errorDetails = error.response?.data?.detail;
      let errorMessage = "Gagal memperbarui status laporan";
      
      if (Array.isArray(errorDetails) && errorDetails.length > 0) {
        // Display the first validation error from array
        const firstError = errorDetails[0];
        if (typeof firstError === 'object' && firstError.msg) {
          errorMessage = firstError.msg;
        } else if (typeof firstError === 'string') {
          errorMessage = firstError;
        }
        console.log("Validation errors:", errorDetails);
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      
      toast.error(errorMessage);
    },
  });
}