import SuspenseLoader from "@/components/SuspenseLoader";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import prisma from "@/db";
import React from "react";
import AgentTransactionList, {
  agentCommissionRate,
} from "./AgentTransactionList";
import { Transaction, TransactionStatus } from "@prisma/client";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const page = async ({
  params,
  searchParams,
}: {
  params: { agentNumber: string };
  searchParams: { [key: string]: string };
}) => {
  const tStatus = searchParams["status"] as TransactionStatus;
  const page = Number(searchParams["page"] ?? "1");
  const per_page = Number(searchParams["per_page"] ?? "10");

  const skip = (page - 1) * per_page;

  // Fetch total count of agents to determine the last page
  const totalTransactions = await prisma.transaction.count({
    where: {
      agentNumber: params.agentNumber,
      status: {
        in: [
          TransactionStatus.PROVIDED,
          TransactionStatus.FAILED,
          TransactionStatus.PENDING,
          TransactionStatus.SCHEDULED,
        ],
      },
    },
  });
  const totalPages = Math.ceil(totalTransactions / per_page);
  const agentData = await prisma.agent.findUnique({
    where: {
      number: params.agentNumber,
    },
    include: {
      transaction: {
        orderBy: {
          createdAt: "desc",
        },
        skip: 0,
        take: 10,
      },
    },
  });

  const totalPayments = await prisma.transaction.aggregate({
    where: {
      agentNumber: params.agentNumber,
      isPaid: true,
      status: {
        in: [TransactionStatus.PROVIDED],
      },
    },
    _sum: {
      inkam: true,
    },
    _count: {
      inkam: true,
    },
  });

  const pendingPayments = await prisma.transaction.aggregate({
    where: {
      agentNumber: params.agentNumber,
      status: TransactionStatus.PROVIDED,
      isPaid: false,
    },
    _sum: {
      inkam: true,
    },
    _count: {
      inkam: true,
    },
  });

  return (
    <div className="max-w-2xl w-full mx-auto p-4 flex flex-col gap-4">
      <h1>Agent Transactions</h1>
      <Card>
        <CardHeader className="font-bold">Agent Details</CardHeader>
        <CardContent className="grid grid-cols-2 gap-4  items-center">
          <div className="border border-neutral-500 p-4 rounded-md">
            <p className="flex items-center gap-2">
              Name: <span>{agentData?.name}</span>
            </p>
          </div>
          <div className="border border-neutral-500 p-4 rounded-md">
            <p className="flex items-center gap-2">
              Number: <span>{agentData?.number}</span>
            </p>
          </div>
          <div className="border border-neutral-500 p-4 rounded-md">
            <p className="flex items-center gap-2">
              Total inkam:
              <span>
                {totalPayments &&
                  (totalPayments._sum.inkam as number) * agentCommissionRate}
              </span>
            </p>
          </div>
          <div className="border border-neutral-500 p-4 rounded-md">
            <p className="flex items-center gap-2">
              Pending inkam:
              <span>
                {pendingPayments._sum.inkam
                  ? pendingPayments._sum.inkam * agentCommissionRate
                  : 0}
              </span>
            </p>
          </div>
        </CardContent>
      </Card>

      {agentData?.transaction !== undefined &&
      agentData?.transaction.length > 0 ? (
        <AgentTransactionList
          transactions={agentData?.transaction as Transaction[]}
        />
      ) : (
        <div>No transactions found</div>
      )}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            {page > 1 && (
              <PaginationPrevious
                href={{
                  pathname: `find/${params.agentNumber}`,
                  query: {
                    page: page - 1,
                    per_page: per_page,
                  },
                }}
              />
            )}
          </PaginationItem>

          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            {page < totalPages && (
              <PaginationNext
                href={{
                  pathname: `find/${params.agentNumber}`,
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

export default page;
