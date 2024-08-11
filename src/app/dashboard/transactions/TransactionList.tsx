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
import TransactionStatus from "./TransactionStatus";

const TransactionList = ({ transactions }: { transactions: Transaction[] }) => {
  return (
    <div>
      <Table>
        <TableCaption>A list of your recent pharmacies.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Number</TableHead>
            <TableHead>Address</TableHead>
            <TableHead className="">Agent</TableHead>
            <TableHead className="">Lab Test</TableHead>
            <TableHead className="">Status</TableHead>
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
                  <TableCell className="font-medium">
                    {transaction.customerName}
                  </TableCell>
                  <TableCell>{transaction.customerNumber}</TableCell>
                  <TableCell>{transaction.customerLocation}</TableCell>
                  <TableCell>{transaction.agentName}</TableCell>
                  <TableCell>{testName?.name}</TableCell>
                  <TableCell>
                    <TransactionStatus
                      currentStatus={transaction.status}
                      transactionId={transaction.transactionId}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </div>
  );
};

export default TransactionList;
