import prisma from "@/db";
import React, { Suspense } from "react";
import TransactionList from "./TransactionList";

const TransactionPage = async () => {
  const transactions = await prisma.transaction.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      agent: true,
      labTest: true,
    },
  });

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">All Transactions</h2>
      <Suspense fallback={<div>Loading...</div>}>
        <TransactionList transactions={transactions} />
      </Suspense>
    </div>
  );
};

export default TransactionPage;
