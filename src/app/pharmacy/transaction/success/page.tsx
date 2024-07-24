"use client";
import { useSearchParams } from "next/navigation";
import React, { Suspense } from "react";

const PhoneNumber = () => {
  const searchParams = useSearchParams();
  const number = searchParams.get("ref");

  return (
    <span>
      {number?.slice(0, 3)}-{number?.slice(3, 6)}-{number?.slice(6, 10)}
    </span>
  );
};

const TransactionSuccess = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold">Transaction Successful</h1>
      <p>You will be contacted soon</p>
      <p>
        at{" "}
        <Suspense fallback={<span>Loading...</span>}>
          <PhoneNumber />
        </Suspense>
      </p>
    </div>
  );
};

export default TransactionSuccess;
