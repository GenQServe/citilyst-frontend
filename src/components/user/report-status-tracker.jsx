import { Check, Clock, X, AlertTriangle, LucideLoader } from "lucide-react";
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
    icon: LucideLoader,
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

export function ReportStatusTracker({ status }) {
  // Normalize status to handle different formats
  const normalizedStatus =
    status === "inprogress" ? "in_progress" : status?.toLowerCase();
  const steps = Object.keys(statuses);
  const currentIndex = steps.indexOf(normalizedStatus);

  return (
    <div className="w-full space-y-8 md:space-y-0">
      {/* Desktop/Tablet (horizontal) */}
      <div className="hidden md:flex items-center justify-between">
        {steps.map((step, index) => {
          const isPassed = index <= currentIndex;
          const isCurrent = index === currentIndex;
          const StatusIcon = statuses[step].icon;

          return (
            <div
              key={step}
              className="flex flex-col items-center relative w-full"
            >
              {/* Connecting line */}
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "absolute top-5 h-0.5 w-full right-1/2 -mr-2",
                    isPassed
                      ? `bg-${statuses[step].color.split("-")[1]}-500`
                      : "bg-gray-200"
                  )}
                />
              )}

              {/* Status icon */}
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center mb-2 z-10",
                  isPassed ? statuses[step].bgColor : "bg-gray-100",
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

              {/* Status label */}
              <p
                className={cn(
                  "font-medium text-sm",
                  isPassed ? statuses[step].color : "text-gray-400",
                  isCurrent && "font-semibold"
                )}
              >
                {statuses[step].label}
              </p>
            </div>
          );
        })}
      </div>

      {/* Mobile (vertical) */}
      <div className="md:hidden space-y-6">
        {steps.map((step, index) => {
          const isPassed = index <= currentIndex;
          const isCurrent = index === currentIndex;
          const StatusIcon = statuses[step].icon;

          return (
            <div key={step} className="flex items-start relative">
              {/* Connecting line */}
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "absolute top-10 left-5 h-full w-0.5",
                    isPassed ? statuses[step].color : "bg-gray-200"
                  )}
                />
              )}

              {/* Status icon */}
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center mr-4 z-10",
                  isPassed ? statuses[step].bgColor : "bg-gray-100",
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

              {/* Status content */}
              <div className="flex-1">
                <p
                  className={cn(
                    "font-semibold",
                    isPassed ? statuses[step].color : "text-gray-400"
                  )}
                >
                  {statuses[step].label}
                </p>
                <p
                  className={cn(
                    "text-sm",
                    isPassed ? "text-gray-600" : "text-gray-400"
                  )}
                >
                  {statuses[step].description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
