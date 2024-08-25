import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const loading = () => {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 min-w-16 w-full" />
      <Skeleton className="h-8 min-w-16 w-full" />
      <Skeleton className="h-6 min-w-16 w-full" />
      <Skeleton className="h-6 min-w-16 w-full" />
      <Skeleton className="h-6 min-w-16 w-full" />
      <Skeleton className="h-6 min-w-16 w-full" />
    </div>
  );
};

export default loading;
