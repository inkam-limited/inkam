"use client";

import { useState } from "react";
import { trpc } from "../_trpc/client";
import { Input } from "@/components/ui/input";

const page = () => {
  const [number, setNumber] = useState<string>("");
  const {
    data: transactions,
    isLoading: isTransactionsLoading,
    isError,
  } = trpc.getAgentTransactions.useQuery({
    agentNumber: "0812345678",
  });

  return (
    <div>
      <Input
        placeholder="Enter Agent Number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />
      <button
        onClick={() =>
          trpc.getAgentTransactions.useQuery({ agentNumber: number })
        }
      >
        Search
      </button>
      {isTransactionsLoading && <div>Loading...</div>}
      {transactions && <div>Transactions</div>}
      {isError && <div>Error</div>}
    </div>
  );
};

export default page;
