import { Transaction } from "@prisma/client";
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

import SuspenseLoader from "@/components/SuspenseLoader";
import DomLoaded from "@/components/DomLoaded";

const AgentTransaction = ({
  transactions,
}: {
  transactions: Transaction[];
}) => {
  return (
    <div>
      <Table>
        <TableCaption>A list of your recent pharmacies.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>

            <TableHead className="">Agent</TableHead>
            <TableHead className="">Lab Test</TableHead>
          </TableRow>
        </TableHeader>
        <DomLoaded>
          <TableBody>
            {transactions &&
              transactions.map(async function (transaction) {
                return (
                  <SuspenseLoader>
                    <TableRow key={transaction.transactionId}>
                      <TableCell className="font-medium">
                        {transaction.customerName}
                      </TableCell>

                      <TableCell>{transaction.agentName}</TableCell>
                      <TableCell>{transaction.status}</TableCell>
                    </TableRow>
                  </SuspenseLoader>
                );
              })}
          </TableBody>
        </DomLoaded>
      </Table>
    </div>
  );
};

export default AgentTransaction;
