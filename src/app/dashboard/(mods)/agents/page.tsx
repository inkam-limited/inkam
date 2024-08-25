import prisma from "@/db";
import { Agent } from "@prisma/client";

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
  const page = Number(searchParams["page"] ?? "1");
  const per_page = Number(searchParams["per_page"] ?? "10");

  const skip = (page - 1) * per_page;

  // Fetch total count of agents to determine the last page
  const totalAgents = await prisma.agent.count();
  const totalPages = Math.ceil(totalAgents / per_page);

  const agents: Agent[] = await prisma.agent.findMany({
    where: {
      AgentType: {
        not: "PHARMACY",
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    skip: skip,
    take: per_page,
  });

  return (
    <div>
      <div className="space-y-4">
        <h2 className="text-4xl font-bold dark:text-neutral-300">All Agents</h2>
        <SuspenseLoader>
          <AgentList agents={agents} />
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
    </div>
  );
};

export default PharmacyDashboard;
