import prisma from "@/db";
import { Agent, Transaction } from "@prisma/client";

import React from "react";
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
import AllPayments from "./AllPayments";
import PaymentControls from "./PaymentControls";
import GenerateInvoice from "./GenerateInvoice";

const PharmacyDashboard = async ({
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

  const agents = await prisma.agent.findMany({
    where: {
      transaction: {
        some: {
          isPaid: false,
          status: "PROVIDED",
        },
      },
    },
    skip,
    take: per_page,
    orderBy: {
      name: "asc",
    },
    select: {
      agentId: true,
      name: true,
      number: true,
      transaction: true,
    },
  });

  const invoices = await prisma.invoice.findMany({
    where: {
      disbursed: false,
    },
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-7xl mx-auto">
      <div className="space-y-4 col-span-2">
        <h2 className="text-2xl font-bold">All Payments</h2>
        <SuspenseLoader>
          <AllPayments agents={agents} />
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
      <div className="space-y-4 col-span-1">
        <PaymentControls />
        {invoices && invoices.length > 0 && (
          <div>
            {invoices.map((invoice) => (
              <div key={invoice.id}>
                <GenerateInvoice invoice={invoice} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PharmacyDashboard;
