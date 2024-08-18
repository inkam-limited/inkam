import { Badge } from "@/components/ui/badge";
import prisma from "@/db";
import React from "react";
type AgentTransactionSummary = {
  _sum: {
    [key: string]: number | null; // Assuming the values in _sum are numeric or null
  };
  agentId: string;
  agentName: string;
};

const page = async ({ params }: { params: { invoiceId: string } }) => {
  const invoice = await prisma.invoice.findUnique({
    where: {
      id: params.invoiceId,
    },
  });

  const agentData = invoice?.data as AgentTransactionSummary[];

  return (
    <>
      <div className="flex flex-col gap-4">
        <div>
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold">Invoice</h1>
            <Badge variant="default" className="rounded-full text-xs px-2 h-6">
              {invoice?.disbursed ? "Closed" : "Open"}
            </Badge>
          </div>
          <p className="text-base font-bold">
            Date: {invoice?.createdAt.toDateString()}
          </p>
        </div>
        <div>
          <p className="text-2xl">Amount: {invoice?.amount}</p>
          <p className="text-base font-bold">Inkam commission</p>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold">Invoice details</h2>
        {agentData.map((agent, index) => (
          <>
            <p className="text-xl font-bold">Agent {index + 1}</p>
            <div
              key={index}
              className="grid grid-cols-2 space-y-4 items-center "
            >
              <div>
                <p className="text-lg font-bold">Agent Name</p>
                <p className="text-lg">Payment Amount</p>
              </div>
              <div>
                <p className="text-lg font-bold">{agent.agentName}</p>
                <p className="text-lg">BDT{agent._sum.inkam}</p>
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  );
};

export default page;
