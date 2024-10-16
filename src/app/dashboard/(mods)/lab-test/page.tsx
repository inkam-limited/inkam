import prisma from "@/db";
import { Agent, LabTest } from "@prisma/client";

import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import SuspenseLoader from "@/components/SuspenseLoader";
import AgentList from "./test-list";

const AgentsPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const page = Number(searchParams["page"] ?? "1");
  const per_page = Number(searchParams["per_page"] ?? "10");

  const skip = (page - 1) * per_page;

  // Fetch total count of agents to determine the last page
  const totalTests = await prisma.labTest.count();
  const totalPages = Math.ceil(totalTests / per_page);

  const tests: LabTest[] = await prisma.labTest.findMany({
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
          <AgentList tests={tests} />
        </SuspenseLoader>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              {page > 1 && (
                <PaginationPrevious
                  href={{
                    pathname: "/dashboard/lab-test",
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
              <p>
                Page {page} of {totalPages}
              </p>
            </PaginationItem>
            <PaginationItem>
              {page < totalPages && (
                <PaginationNext
                  href={{
                    pathname: "/dashboard/lab-test",
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

export default AgentsPage;
