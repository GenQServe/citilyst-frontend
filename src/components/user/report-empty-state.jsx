import { FileQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function ReportEmptyState() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center border border-dashed border-gray-200 rounded-lg bg-white">
      <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
        <FileQuestion className="h-8 w-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-900">Belum ada laporan</h3>
      <p className="mt-2 text-sm text-gray-500 max-w-sm">
        Anda belum membuat laporan apapun. Mulai laporkan masalah di sekitar
        Anda sekarang.
      </p>
      <Button
        className="mt-6 bg-[#9DB17C] hover:bg-[#8CA06B]"
        onClick={() => navigate("/user/create-report")}
      >
        Buat Laporan Baru
      </Button>
    </div>
  );
}
