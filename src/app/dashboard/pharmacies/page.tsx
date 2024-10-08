import prisma from "@/db";
import { Agent } from "@prisma/client";
import React, { Suspense } from "react";
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
import PharmacyList from "./PharmacyLIst";

const PharmacyPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const page = Number(searchParams["page"] ?? "1");
  const per_page = Number(searchParams["per_page"] ?? "10");

  const skip = (page - 1) * per_page;

  // Fetch total count of agents to determine the last page
  const totalAgents = await prisma.agent.count({
    where: { AgentType: "PHARMACY" },
  });
  const totalPages = Math.ceil(totalAgents / per_page);

  const pharmacies: Agent[] = await prisma.agent.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      AgentType: "PHARMACY",
    },
    skip: skip,
    take: per_page,
  });

  return (
    <div>
      <div className="space-y-4">
        <h2 className="text-4xl font-bold dark:text-neutral-300">
          All Pharmacies
        </h2>

        <SuspenseLoader>
          <PharmacyList pharmacies={pharmacies} />
        </SuspenseLoader>

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              {page > 1 && (
                <PaginationPrevious
                  href={{
                    pathname: "/dashboard/pharmacies",
                    query: {
                      page: page - 1,
                      per_page: per_page,
                    },
                  }}
                />
              )}
            </PaginationItem>
            <PaginationItem>{`Page ${page} of ${totalPages}`}</PaginationItem>
            <PaginationItem>
              {page < totalPages && (
                <PaginationNext
                  href={{
                    pathname: "/dashboard/pharmacies",
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

export default PharmacyPage;
