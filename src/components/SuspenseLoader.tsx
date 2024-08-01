import { Loader2 } from "lucide-react";
import React, { Suspense } from "react";

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
            <Loader2 className="animate-spin h-12 w-12" />
            <h1 className="text-center text-2xl font-bold">Loading...</h1>
          </div>
        )
      }
    >
      {children}
    </Suspense>
  );
};

export default SuspenseLoader;
