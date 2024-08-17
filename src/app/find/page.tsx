"use client";

import { useState } from "react";
import { trpc } from "../_trpc/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Transaction } from "@prisma/client";
import AgentTransaction from "./AgentTransaction";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const [agentNumber, setAgentNumber] = useState<string>("");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [noData, setNoData] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const agentTransaction = trpc.getAgentTransactions.useQuery(
    { agentNumber: agentNumber },
    {
      enabled: false, // Disable automatic fetching
    }
  );

  const handleClick = async () => {
    if (agentNumber) {
      router.push(`/find/${agentNumber}`);
    }
  };

  return (
    <div className="flex flex-col gap-4 h-[100svh] w-full p-8">
      <Card className="max-w-lg w-full mx-auto p-4 flex flex-col gap-4">
        <Label className="text-xl">
          Input your Agent Number to search for transactions
        </Label>
        <Input
          placeholder="Enter Agent Number"
          value={agentNumber}
          onChange={(e) => setAgentNumber(e.target.value)}
        />
        <Button variant="default" onClick={handleClick}>
          {isFetching ? "Loading..." : "Search"}
        </Button>
        {transactions.length > 0 && (
          <AgentTransaction transactions={transactions} />
        )}
        {noData && <div>No transactions found</div>}
      </Card>
    </div>
  );
};

export default Page;
