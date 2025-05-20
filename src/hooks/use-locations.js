import { useQuery } from "@tanstack/react-query";
import {
  getDistrictsWithVillages,
  getReportCategories,
} from "@/services/location-service";

export function useDistrictsWithVillages() {
  return useQuery({
    queryKey: ["districts-with-villages"],
    queryFn: getDistrictsWithVillages,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}

export function useReportCategories() {
  return useQuery({
    queryKey: ["report-categories"],
    queryFn: getReportCategories,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}
