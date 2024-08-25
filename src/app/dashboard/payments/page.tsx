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
  const page = Number(searchParams["page"] ?? "1");
  const per_page = Number(searchParams["per_page"] ?? "10");

  const skip = (page - 1) * per_page;

  // Fetch total count of agents to determine the last page
  const totalAgents = await prisma.agent.count();
  const totalPages = Math.ceil(totalAgents / per_page);

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
        <h2 className="text-2xl font-bold">All Payments</h2>
        <SuspenseLoader>
          <AllPayments transactions={transactions} />
        </SuspenseLoader>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              {page > 1 && (
                <PaginationPrevious
                  href={{
                    pathname: "/dashboard/agents",
                    query: {
                      page: page - 1,
                      per_page: per_page,
                    },
                  }}
                />
              )}
            </PaginationItem>
            <PaginationItem></PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              {page < totalPages && (
                <PaginationNext
                  href={{
                    pathname: "/dashboard/agents",
                    query: {
                      page: page + 1,
                      per_page: per_page,
                    },
                  }}
                />
              )}
            </PaginationItem>
          </PaginationContent>
        </Pagination>
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
