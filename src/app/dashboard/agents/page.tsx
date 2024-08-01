import PharmacyList from "@/app/pharmacy/dashboard/PharmacyList";
import prisma from "@/db";
import { Agent } from "@prisma/client";
import Link from "next/link";
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

import AgentList from "./AgentList";
import SuspenseLoader from "@/components/SuspenseLoader";

const PharmacyDashboard = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  console.log(searchParams);
  const page = Number(searchParams["page"]) ?? 1;
  const per_page = Number(searchParams["per_page"]) ?? 5;
  console.log(page, per_page);

  const start = page - 1 * per_page; // 0, 5, 10 ...

  const agents: Agent[] = await prisma.agent.findMany({
    orderBy: {
      createdAt: "desc",
    },
    // skip: start,
    // take: per_page,
  });

  // mocked, skipped and limited in the real app

  return (
    <div>
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">All Agents</h2>
        <SuspenseLoader>
          <AgentList agents={agents} />
        </SuspenseLoader>
        {/* <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href={`dashboard/agents?page=${
                  page - 1 > 0 ? page - 1 : 1
                }&per_page=${per_page}`}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                href={`dashboard/agents?page=${page + 1}&per_page=${per_page}`}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination> */}
      </div>
    </div>
  );
};

export default PharmacyDashboard;
