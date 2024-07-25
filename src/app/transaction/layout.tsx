import React from "react";

const TransactionLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full max-w-7xl h-[100svh] mx-auto px-4 py-2">
      {children}
    </div>
  );
};

export default TransactionLayout;
