import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { generateReportDescription } from "@/services/report-service";
import { useDispatch } from "react-redux";
import { clearReportForm } from "@/features/slices/reportSlice";

export function useGenerateReportDescription() {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: generateReportDescription,
    onSuccess: (data) => {
      toast.success(
        "Laporan berhasil dikirim! Tim kami akan segera meninjau laporan Anda."
      );
      dispatch(clearReportForm());
      return data;
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Gagal mengirim laporan");
    },
  });
}
