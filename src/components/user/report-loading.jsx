import { Skeleton } from "@/components/ui/skeleton";

export function ReportLoading() {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <Skeleton className="h-10 w-[250px]" />
        <Skeleton className="h-9 w-[120px]" />
      </div>

      <div className="border rounded-md p-4 mt-4">
        <div className="space-y-3">
          <Skeleton className="h-10 w-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      </div>
    </div>
  );
}
