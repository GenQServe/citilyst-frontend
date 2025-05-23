import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  generateReportDescription,
  submitReport,
  uploadReportImages,
} from "@/services/report-service";
import { useDispatch } from "react-redux";
import {
  setGeneratedReport,
  setIsSubmitting,
  clearReportForm,
  setImagesUrl,
} from "@/features/slices/reportSlice";
import { useNavigate } from "react-router-dom";

export function useGenerateReportDescription() {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: generateReportDescription,
    onSuccess: (data) => {
      dispatch(setGeneratedReport(data.data));
      dispatch(setIsSubmitting(false));
      return data;
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Gagal membuat deskripsi laporan"
      );
      dispatch(setIsSubmitting(false));
    },
  });
}

export function useSubmitReport() {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: submitReport,
    onSuccess: (data) => {
      dispatch(setIsSubmitting(false));
      return data;
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Gagal mengirim laporan");
      dispatch(setIsSubmitting(false));
    },
  });
}

export function useUploadReportImages() {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: uploadReportImages,
    onSuccess: (data) => {
      dispatch(setImagesUrl(data.data));
      return data;
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Gagal mengunggah gambar laporan"
      );
      dispatch(setIsSubmitting(false));
    },
  });
}
