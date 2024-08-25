import prisma from "@/db";
import React, { Suspense } from "react";
import TransactionList from "./TransactionList";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { TransactionStatus } from "@prisma/client";
import StatusSorter from "./StatusSorter";
import { Skeleton } from "@/components/ui/skeleton";

const TransactionPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const tStatus = searchParams["status"] as TransactionStatus;
  const page = Number(searchParams["page"] ?? "1");
  const per_page = Number(searchParams["per_page"] ?? "10");

  const skip = (page - 1) * per_page;

  // Fetch total count of agents to determine the last page
  const totalAgents = await prisma.transaction.count({
    where: { status: tStatus },
  });
  const totalPages = Math.ceil(totalAgents / per_page);

  const transactions = await prisma.transaction.findMany({
    where: {
      status: tStatus,
    },
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
      <h2 className="text-4xl font-bold dark:text-neutral-300">
        All Transactions
      </h2>
      <StatusSorter page={page} per_page={per_page} status={tStatus} />
      <TransactionList transactions={transactions} />
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            {page > 1 && (
              <PaginationPrevious
                href={{
                  pathname: "/dashboard/transactions",
                  query: {
                    status: tStatus,
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
                  pathname: "/dashboard/transactions",
                  query: {
                    status: tStatus,
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
