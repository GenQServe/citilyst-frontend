import { Skeleton } from "@/components/ui/skeleton";

export const PageSkeleton = () => {
  return (
    <div className="w-full h-screen">
      <div className="fixed top-0 w-full p-4 bg-[#9CDE9F] shadow-sm">
        <div className="flex items-center justify-between container mx-auto">
          <Skeleton className="h-8 w-32" />
          <div className="hidden md:flex gap-4">
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-8 w-24" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
        </div>
      </div>

      <div className="container mx-auto pt-24 px-4">
        <Skeleton className="h-64 w-full mb-8 rounded-xl" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Skeleton className="h-40 w-full rounded-lg" />
          <Skeleton className="h-40 w-full rounded-lg" />
          <Skeleton className="h-40 w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
};
