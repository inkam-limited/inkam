import SuspenseLoader from "@/components/SuspenseLoader";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import prisma from "@/db";
import React from "react";
import AgentTransactionList from "./AgentTransactionList";
import { Transaction } from "@prisma/client";
import CreatePayment from "./CreatePayment";

const page = async ({ params }: { params: { agentNumber: string } }) => {
  const agentData = await prisma.agent.findUnique({
    where: {
      number: params.agentNumber,
    },
    include: {
      transaction: {
        where: {
          isPaid: false,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  return (
    <div className="max-w-2xl w-full mx-auto p-4 flex flex-col gap-4">
      <h1>Agent Transactions</h1>
      <Card>
        <CardHeader className="font-bold">Agent Details</CardHeader>
        <CardContent className="grid grid-cols-2 gap-4  items-center">
          <div className="border border-neutral-500 p-4 rounded-md">
            <p>
              Name <span>{agentData?.name}</span>
            </p>
          </div>
          <div className="border border-neutral-500 p-4 rounded-md">
            <p>
              Number: <span>{agentData?.number}</span>
            </p>
          </div>
          <div className="border border-neutral-500 p-4 rounded-md">
            <p>
              inkam:{" "}
              <span>
                {agentData &&
                  agentData?.transaction?.reduce(
                    (a: number, b: Transaction) => a + b.inkam,
                    0
                  ) * 0.2}
              </span>
            </p>
          </div>

          <CreatePayment agentId={agentData?.agentId as string} />
        </CardContent>
      </Card>

      {agentData?.transaction !== undefined &&
      agentData?.transaction.length > 0 ? (
        <AgentTransactionList
          transactions={agentData?.transaction as Transaction[]}
        />
      ) : (
        <div>No transactions found</div>
      )}
    </div>
  );
};

export default page;
