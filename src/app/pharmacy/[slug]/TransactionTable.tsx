import { Transaction } from "@prisma/client";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const TransactionTable = ({
  transactions,
}: {
  transactions: Transaction[];
}) => {
  return (
    <div>
      <div>
        <Table>
          <TableCaption>A list of your recent leads.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Customer Name</TableHead>
              <TableHead>Customer Number</TableHead>
              <TableHead>Customer Location</TableHead>
              <TableHead className="text-right">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map(function (transaction) {
              return (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">
                    {transaction.customerName}
                  </TableCell>
                  <TableCell>{transaction.customerNumber}</TableCell>
                  <TableCell>{transaction.customerLocation}</TableCell>
                  <TableCell className="text-right">
                    {transaction.updatedAt.toLocaleDateString()}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TransactionTable;
