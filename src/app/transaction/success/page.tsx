"use client";
import { CheckCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React, { Suspense } from "react";

const PhoneNumber = () => {
  const searchParams = useSearchParams();
  const number = searchParams.get("ref");
  const labTest = searchParams.get("test");

  return (
    <div className="flex flex-col items-center gap-2 p-4 border  rounded-lg">
      <p>
        For test{" "}
        <span className="text-green-600 font-semibold"> {labTest}</span>
      </p>
      <p>You will be contacted soon at</p>
      <span>
        {number?.slice(0, 3)}-{number?.slice(3, 6)}-{number?.slice(6, 10)}
      </span>
    </div>
  );
};

const TransactionSuccess = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[100svh]">
      <div className="flex flex-col items-center gap-2">
        <CheckCircle className="h-16 w-16 text-green-500 transition-all animate-in ease-in" />
        <h1 className="text-3xl font-bold text-blue-700">
          Transaction Successful
        </h1>
      </div>

      <Suspense fallback={<span>Loading...</span>}>
        <PhoneNumber />
      </Suspense>
    </div>
  );
};

export default TransactionSuccess;
