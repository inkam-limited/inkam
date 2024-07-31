"use client";
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
import Link from "next/link";
import ReactPaginate from "react-paginate";
import SuspenseLoader from "@/components/SuspenseLoader";
import DomLoaded from "@/components/DomLoaded";
import { Button } from "@/components/ui/button";

const TransactionList = ({ transactions }: { transactions: Transaction[] }) => {
  const itemsPerPage = 10;

  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = transactions.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(transactions.length / itemsPerPage);

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % transactions.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

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
          </TableRow>
        </TableHeader>
        <DomLoaded>
          <TableBody>
            {currentItems &&
              currentItems.map(async function (transaction) {
                return (
                  <TableRow key={transaction.transactionId}>
                    <TableCell className="font-medium">
                      {transaction.customerName}
                    </TableCell>
                    <TableCell>{transaction.customerNumber}</TableCell>
                    <TableCell>{transaction.customerLocation}</TableCell>
                    <TableCell className="">{transaction.agentName}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </DomLoaded>
      </Table>
      <ReactPaginate
        breakLabel="..."
        nextLabel={<Button>Next</Button>}
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        className="flex gap-4 justify-between items-center w-fit mx-auto mt-4"
        pageCount={pageCount}
        previousLabel={<Button>Previous</Button>}
        renderOnZeroPageCount={null}
      />
    </div>
  );
};

export default TransactionList;
