import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const FeedbackCardSkeleton = () => {
  return (
    <Card className="relative p-6 shadow-lg bg-white rounded-xl border-none h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <Skeleton className="h-8 w-8 rounded-full" />
        <div className="space-y-1">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-3 w-32" />
        </div>
      </div>
      <div className="space-y-2 flex-grow">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[80%]" />
        <Skeleton className="h-4 w-[90%]" />
      </div>
    </Card>
  );
};

export default FeedbackCardSkeleton;
