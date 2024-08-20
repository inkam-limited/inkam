"use client";
import { Transaction, TransactionStatus } from "@prisma/client";
import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import TransactionStatusDropdown from "@/app/dashboard/transactions/TransactionStatus";
const itemsPerPage = 10;
const TransactionTable = ({
  transactions,
}: {
  transactions: Transaction[];
}) => {
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = transactions.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(transactions.length / itemsPerPage);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % transactions.length;
    setItemOffset(newOffset);
  };

  return (
    <div>
      <div>
        <Table>
          <TableCaption>Total {transactions.length} transactions</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Customer Name</TableHead>
              <TableHead>Test value</TableHead>
              <TableHead>Commission</TableHead>
              <TableHead>Customer Number</TableHead>
              <TableHead>Customer Location</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Test Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map(function (transaction) {
              return (
                <TableRow key={transaction.transactionId}>
                  <TableCell className="font-medium">
                    {transaction.customerName}
                  </TableCell>
                  <TableCell className="font-medium">
                    {transaction.amount}
                  </TableCell>
                  <TableCell className="font-medium">
                    {transaction.inkam}
                  </TableCell>
                  <TableCell>{transaction.customerNumber}</TableCell>
                  <TableCell>{transaction.customerLocation}</TableCell>
                  <TableCell className="text-right">
                    {transaction.updatedAt.toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <TransactionStatusDropdown
                      isPaid={transaction.isPaid}
                      agentId={transaction.agentId}
                      amount={transaction.amount}
                      currentStatus={transaction.status}
                      transactionId={transaction.transactionId}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <ReactPaginate
          breakLabel="..."
          nextLabel={<Button variant="ghost">Next</Button>}
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          className="flex justify-center gap-4 items-center my-2"
          previousLabel={<Button variant="ghost">Previous</Button>}
          renderOnZeroPageCount={null}
        />
      </div>
    </div>
  );
};

export default TransactionTable;
