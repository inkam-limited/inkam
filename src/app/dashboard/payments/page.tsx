import prisma from "@/db";
import { Agent, Transaction } from "@prisma/client";

import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import SuspenseLoader from "@/components/SuspenseLoader";
import AllPayments from "./AllPayments";
import PaymentControls from "./PaymentControls";

const PaymentsPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  // Fetch total count of agents to determine the last page
  const totalPayment = await prisma.transaction.count({
    where: {
      status: "PROVIDED",
      isPaid: false,
    },
  });

  const transactions = await prisma.transaction.groupBy({
    by: ["agentId", "agentName"],
    where: {
      status: "PROVIDED",
      isPaid: false,
    },
    _sum: {
      inkam: true,
    },
  });

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="space-y-4">
        <h2 className="text-4xl font-bold dark:text-neutral-300">
          All Payments
        </h2>
        <SuspenseLoader>
          <AllPayments transactions={transactions} />
        </SuspenseLoader>
      </div>

      {transactions.length > 0 ? (
        <PaymentControls />
      ) : (
        "No transactions to invoice"
      )}
    </div>
  );
};

export default PaymentsPage;
