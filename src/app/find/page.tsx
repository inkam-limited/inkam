"use client";

import { useState } from "react";
import { trpc } from "../_trpc/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Transaction } from "@prisma/client";

const Page = () => {
  const [agentNumber, setAgentNumber] = useState<string>("");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [noData, setNoData] = useState<boolean>(false);

  const agentTransaction = trpc.getAgentTransactions.useQuery(
    { agentNumber: agentNumber },
    {
      enabled: false, // Disable automatic fetching
    }
  );

  const handleClick = async () => {
    const result = await agentTransaction.refetch();
    if (result.data && result.data.length > 0) {
      const parsedTransactions = result.data.map((transaction) => ({
        ...transaction,
        createdAt: new Date(transaction.createdAt),
        updatedAt: new Date(transaction.updatedAt),
      }));
      setTransactions(parsedTransactions);
      setNoData(false);
    } else {
      setTransactions([]);
      setNoData(true);
    }
  };

  return (
    <div className="flex flex-col gap-4 h-[100svh] w-full">
      <Card>
        <Input
          placeholder="Enter Agent Number"
          value={agentNumber}
          onChange={(e) => setAgentNumber(e.target.value)}
        />
        <Button variant="default" onClick={handleClick}>
          Search
        </Button>
        {transactions.length > 0 && (
          <div className="flex flex-col gap-4">
            {transactions.map((transaction) => (
              <div key={transaction.transactionId}>
                <div>{transaction.agentNumber}</div>
                <div>{transaction.customerNumber}</div>
                <div>{transaction.labTestId}</div>
              </div>
            ))}
          </div>
        )}
        {noData && <div>No transactions found</div>}
      </Card>
    </div>
  );
};

export default Page;
