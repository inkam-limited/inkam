import { LabTest, Transaction } from "@prisma/client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import prisma from "@/db";
export const agentCommissionRate = 0.5;

const AgentTransactionList = ({
  transactions,
}: {
  transactions: Transaction[];
}) => {
  return (
    <div>
      <Table>
        <TableCaption>A list of your recent transactions.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Agent</TableHead>
            <TableHead>Lab Test</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-center">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions &&
            transactions.map(async function (transaction) {
              const testName = await prisma.labTest.findUnique({
                where: {
                  testId: transaction.labTestId,
                },
                select: {
                  name: true,
                },
              });

              return (
                <TableRow key={transaction.transactionId}>
                  <TableCell>{transaction.createdAt.toDateString()}</TableCell>
                  <TableCell>{transaction.agentName}</TableCell>
                  <TableCell>{testName?.name}</TableCell>
                  <TableCell className="text-center">
                    {transaction.status}
                  </TableCell>
                  <TableCell
                    className={
                      transaction.status === "PROVIDED"
                        ? "bg-green-500 text-white font-bold text-center"
                        : "text-center"
                    }
                  >
                    {transaction.inkam * agentCommissionRate}
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </div>
  );
};

export default AgentTransactionList;
