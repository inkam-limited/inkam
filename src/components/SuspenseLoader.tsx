import { Loader2 } from "lucide-react";
import React, { Suspense } from "react";
import { Skeleton } from "./ui/skeleton";

const SuspenseLoader = ({
  children,
  fallback,
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) => {
  return (
    <Suspense
      fallback={
        fallback ?? (
          <div className="w-full h-full flex-col flex justify-center items-center">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
        )
      }
    >
      {children}
    </Suspense>
  );
};

export default SuspenseLoader;
