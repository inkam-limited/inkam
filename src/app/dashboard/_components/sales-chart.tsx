import React, { Suspense } from "react";

import Chart from "./chart";
import { getDailySales } from "../action";
import { Skeleton } from "@/components/ui/skeleton";

const SalesChart = async () => {
  const data = await getDailySales();
  return (
    <div className="col-span-1 sm:col-span-2 md:col-span-3">
      <h1 className="text-2xl py-2 font-bold text-neutral-300">Weekly Sales</h1>
      <Suspense fallback={<Skeleton className="h-60 min-w-16 w-full" />}>
        <Chart data={data} />
      </Suspense>
    </div>
  );
};

export default SalesChart;
