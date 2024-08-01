import prisma from "@/db";
import React from "react";
import TransactionList from "./TransactionList";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import SuspenseLoader from "@/components/SuspenseLoader";

const TransactionPage = async ({
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

  const transactions = await prisma.transaction.findMany({
    orderBy: {
      createdAt: "desc",
    },
    skip: skip,
    take: per_page,
    include: {
      agent: true,
      labTest: true,
    },
  });

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">All Transactions</h2>
      <SuspenseLoader>
        <TransactionList transactions={transactions} />
      </SuspenseLoader>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            {page > 1 && (
              <PaginationPrevious
                href={{
                  pathname: "/dashboard/transactions",
                  query: {
                    page: page - 1,
                    per_page: per_page,
                  },
                }}
              />
            )}
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            {page < totalPages && (
              <PaginationNext
                href={{
                  pathname: "/dashboard/transactions",
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
  );
};

export default TransactionPage;
