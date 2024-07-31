import { Loader2 } from "lucide-react";
import React, { Suspense } from "react";

const SuspenseLoader = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense
      fallback={
        <div className="w-full h-full flex-col flex justify-center items-center">
          <Loader2 className="animate-spin h-12 w-12" />
          <h1 className="text-center text-2xl font-bold">Loading...</h1>
        </div>
      }
    >
      {children}
    </Suspense>
  );
};

export default SuspenseLoader;
