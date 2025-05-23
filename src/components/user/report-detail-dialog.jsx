import { format } from "date-fns";
import { id } from "date-fns/locale";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ReportProgressTracker } from "./report-progress-tracker";
import { MapPin, FileText, ExternalLink, Calendar, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const getStatusClass = (status) => {
  if (!status) return "";

  status = status.toLowerCase();

  if (status === "pending")
    return "bg-yellow-100 text-yellow-800 border-yellow-200";
  if (status === "in_progress" || status === "inprogress")
    return "bg-blue-100 text-blue-800 border-blue-200";
  if (status === "resolved")
    return "bg-green-100 text-green-800 border-green-200";
  if (status === "rejected") return "bg-red-100 text-red-800 border-red-200";

  return "bg-gray-100 text-gray-800 border-gray-200";
};

const getStatusDisplay = (status) => {
  if (!status) return "-";

  status = status.toLowerCase();

  if (status === "pending") return "Menunggu";
  if (status === "in_progress" || status === "inprogress") return "Diproses";
  if (status === "resolved") return "Selesai";
  if (status === "rejected") return "Ditolak";

  return status;
};

export function ReportDetailDialog({ isOpen, onClose, report }) {
  if (!report) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md rounded-lg z-[100] ">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Detail Laporan
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <Badge className={cn("mb-1.5", getStatusClass(report.status))}>
                {getStatusDisplay(report.status)}
              </Badge>
              <h3 className="text-base font-medium">
                Laporan {report.category_name}
              </h3>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">
                ID: {report.report_id.substring(0, 8)}
              </p>
            </div>
          </div>

          <div className="pt-1 pb-1">
            <ReportProgressTracker status={report.status} />
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex items-center gap-1.5 mb-1.5 text-sm text-gray-500">
                <MapPin className="h-3.5 w-3.5" />
                <span>Lokasi</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-gray-50">
                <div>
                  <p className="font-medium text-sm">
                    {report.village_name}, {report.district_name}
                  </p>
                  <p className="text-xs text-gray-600 mt-0.5">
                    {report.location}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-gray-500 pt-1">
              <div className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                <span>
                  {format(new Date(report.created_at), "dd MMMM yyyy", {
                    locale: id,
                  })}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                <span>
                  Update:{" "}
                  {format(new Date(report.updated_at), "dd MMM, HH:mm", {
                    locale: id,
                  })}
                </span>
              </div>
            </div>

            {report.feedback && (
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 mt-1">
                <p className="text-xs text-gray-600 mb-1 font-medium">
                  Umpan Balik:
                </p>
                <p className="italic text-sm">{report.feedback}</p>
              </div>
            )}

            {report.file_url && (
              <div className="pt-1">
                <Button
                  variant="outline"
                  className="w-full justify-center h-9 text-sm"
                  onClick={() => window.open(report.file_url, "_blank")}
                >
                  <FileText className="h-3.5 w-3.5 mr-1.5" />
                  <span>Lihat Dokumen Laporan</span>
                  <ExternalLink className="h-3 w-3 ml-1.5" />
                </Button>
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button
            className="w-full bg-[#9DB17C] hover:bg-[#8CA06B]"
            onClick={onClose}
          >
            Tutup
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
