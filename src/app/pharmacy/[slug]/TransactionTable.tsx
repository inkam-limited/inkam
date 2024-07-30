"use client";
import { Transaction } from "@prisma/client";
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
  console.log(transactions);
  return (
    <div>
      <div>
        <Table>
          <TableCaption>Total {transactions.length} transactions</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Customer Name</TableHead>
              <TableHead>Customer Number</TableHead>
              <TableHead>Customer Location</TableHead>
              <TableHead className="text-right">Date</TableHead>
              <TableHead className="text-right">Status</TableHead>
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
                  <TableCell className="text-right">
                    {transaction.status}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <ReactPaginate
          breakLabel="..."
          nextLabel={<Button variant="outline">Next</Button>}
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          className="flex justify-center gap-4 items-center my-2"
          previousLabel={<Button variant="outline">Previous</Button>}
          renderOnZeroPageCount={null}
        />
      </div>
    </div>
  );
};

export default TransactionTable;
