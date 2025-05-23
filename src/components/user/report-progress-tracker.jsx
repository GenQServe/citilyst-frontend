import { Check, Clock, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const statuses = {
  pending: {
    label: "Menunggu",
    description: "Laporan sedang menunggu untuk ditinjau",
    icon: Clock,
    color: "text-amber-500",
    bgColor: "bg-amber-100",
    borderColor: "border-amber-200",
  },
  in_progress: {
    label: "Diproses",
    description: "Laporan sedang dalam proses penanganan",
    icon: ArrowRight,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    borderColor: "border-blue-200",
  },
  resolved: {
    label: "Selesai",
    description: "Laporan telah selesai ditangani",
    icon: Check,
    color: "text-green-600",
    bgColor: "bg-green-100",
    borderColor: "border-green-200",
  },
  rejected: {
    label: "Ditolak",
    description: "Laporan ditolak karena tidak valid",
    icon: X,
    color: "text-red-600",
    bgColor: "bg-red-100",
    borderColor: "border-red-200",
  },
};

export function ReportProgressTracker({ status }) {
  const normalizedStatus =
    status === "inprogress" ? "in_progress" : status?.toLowerCase();

  let steps = ["pending", "in_progress"];
  if (normalizedStatus === "resolved") {
    steps.push("resolved");
  } else if (normalizedStatus === "rejected") {
    steps.push("rejected");
  } else {
    steps.push("resolved");
  }

  const currentIndex = steps.indexOf(normalizedStatus);

  return (
    <div className="w-full py-4">
      <div className="relative">
        <div className="absolute left-0 top-1/2 h-1 w-full -translate-y-1/2 bg-gradient-to-r from-amber-100 via-blue-100 to-green-100 rounded-full"></div>

        <div className="relative flex justify-between">
          {steps.map((step, index) => {
            const isPassed = index <= currentIndex;
            const isCurrent = index === currentIndex;
            const StatusIcon = statuses[step].icon;

            return (
              <div key={step} className="flex flex-col items-center relative">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center z-10 transition-all",
                    isPassed ? statuses[step].bgColor : "bg-gray-100",
                    isPassed && "shadow-md",
                    isCurrent &&
                      `ring-4 ring-${statuses[step].color.split("-")[1]}-200`
                  )}
                >
                  <StatusIcon
                    className={cn(
                      "h-5 w-5",
                      isPassed ? statuses[step].color : "text-gray-400"
                    )}
                    strokeWidth={isPassed ? 2.5 : 2}
                  />
                </div>

                <div className="mt-2 text-center">
                  <p
                    className={cn(
                      "text-sm font-medium",
                      isPassed ? statuses[step].color : "text-gray-400",
                      isCurrent && "font-semibold"
                    )}
                  >
                    {statuses[step].label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
