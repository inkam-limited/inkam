import React from "react";

const TransactionLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-[100svh]">
      <div className="flex justify-between items-center mx-auto w-full h-16 px-4 py-2 bg-white">
        <div className="text-2xl font-bold">Transaction</div>
      </div>
      <div className="mx-auto w-full flex items-center flex-col gap-4 px-4 py-4">
        {children}
      </div>
    </div>
  );
};

export default TransactionLayout;
