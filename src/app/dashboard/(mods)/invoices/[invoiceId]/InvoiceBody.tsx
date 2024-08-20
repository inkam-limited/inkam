"use client";
import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Badge } from "@/components/ui/badge";
import { Invoice } from "@prisma/client";
import { Button } from "@/components/ui/button";
export type AgentTransactionSummary = {
  _sum: {
    [key: string]: number | null; // Assuming the values in _sum are numeric or null
  };
  agentId: string;
  agentName: string;
};
const InvoiceBody = ({ invoice }: { invoice: Invoice }) => {
  const agentData = invoice?.data as AgentTransactionSummary[];

  const contentToPrint = useRef(null);
  const handlePrint = useReactToPrint({
    documentTitle: "Print This Document",
    onBeforePrint: () => console.log("before printing..."),
    onAfterPrint: () => console.log("after printing..."),
    removeAfterPrint: true,
  });

  return (
    <div ref={contentToPrint} className="p-8">
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
      <div>
        <h2 className="text-2xl font-bold py-8 underline">Invoice details</h2>
        {agentData.map((agent, index) => (
          <div key={index}>
            <p className="text-xl font-bold">Agent {index + 1}</p>
            <div key={index} className="grid grid-cols-2 items-center">
              <div className="py-4">
                <p className="text-lg font-bold">Agent Name</p>
                <p className="text-lg">Payment Amount</p>
              </div>
              <div className="py-4">
                <p className="text-lg font-bold">{agent.agentName}</p>
                <p className="text-lg">
                  BDT <span className="ml-0.5">{agent._sum.inkam}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Button
        onClick={() => {
          handlePrint(null, () => contentToPrint.current);
        }}
        className="print:hidden"
      >
        PRINT
      </Button>
    </div>
  );
};

export default InvoiceBody;
