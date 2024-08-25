import prisma from "@/db";
import React from "react";
import PharmacyQR from "./PharmacyQR";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TransactionStatus } from "@prisma/client";
import StatusSorter from "@/app/dashboard/transactions/StatusSorter";
import SuspenseLoader from "@/components/SuspenseLoader";
import TransactionList from "@/app/dashboard/transactions/TransactionList";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const PharmacyPage = async ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const tStatus = searchParams["status"] as TransactionStatus;
  const page = Number(searchParams["page"] ?? "1");
  const per_page = Number(searchParams["per_page"] ?? "10");

  const skip = (page - 1) * per_page;

  // Fetch total count of agents to determine the last page
  const totalTransactions = await prisma.transaction.count({
    where: { agentId: params.slug, status: tStatus },
  });
  const totalPages = Math.ceil(totalTransactions / per_page);
  const shop = await prisma.agent.findUnique({
    where: {
      agentId: params.slug,
    },
  });

  if (!shop) {
    return <div>Shop not found</div>;
  }
  const transactions = await prisma.transaction.findMany({
    where: {
      agentId: shop.agentId,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      labTest: true,
    },
    skip: skip, // Skip to the correct offset
    take: per_page, // Only retrieve the first 10 records
  });

  const paymentAmount = await prisma.transaction.aggregate({
    _sum: {
      amount: true,
      inkam: true,
    },
    where: {
      isPaid: false,
      agentId: shop.agentId,
      status: TransactionStatus.PROVIDED,
    },
  });

  return (
    <div>
      <h2 className="text-2xl font-bold py-4">Pharmacy Leads</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-7xl mx-auto">
        <div className="flex justify-center flex-col col-span-1 gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader>{shop.name}</CardHeader>
              <CardContent>
                <Link
                  className="text-xl font-bold text-primary"
                  href={`tel:${shop.number}`}
                  rel="noopener noreferrer"
                >
                  Call: <p>{shop.number}</p>
                </Link>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="font-bold">Due amount</CardHeader>
              <CardContent className="text-4xl font-bold text-primary">
                {paymentAmount._sum.inkam ?? 0}
              </CardContent>
            </Card>
          </div>
          <PharmacyQR
            link={`${process.env.NEXT_PUBLIC_URL}/transaction/lead/${shop.agentId}`}
          />
          <Link
            href={`/transaction/lead/${shop.agentId}`}
            className={cn(buttonVariants({ variant: "secondary" }))}
          >
            Generate Lead
          </Link>
        </div>
        <div className="col-span-2">
          <h2 className="text-2xl font-bold py-4">All Transactions</h2>
          <StatusSorter page={page} per_page={per_page} status={tStatus} />
          <SuspenseLoader>
            <TransactionList transactions={transactions} />
          </SuspenseLoader>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                {page > 1 && (
                  <PaginationPrevious
                    href={{
                      pathname: `/pharmacy/${shop.agentId}`,
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
                      pathname: `/pharmacy/${shop.agentId}`,
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
      </div>
    </div>
  );
};

export default PharmacyPage;
