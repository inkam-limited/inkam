import { Agent, Prisma } from "@prisma/client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import SuspenseLoader from "@/components/SuspenseLoader";
import AgentDropdown from "./agent-dropdown";

const AgentList = ({ agents }: { agents: Agent[] }) => {
  return (
    <Table className="w-full">
      <TableCaption>A list of your recent pharmacies.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Name</TableHead>
          <TableHead>Number</TableHead>
          <TableHead>District</TableHead>
          <TableHead className="">Joined</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <SuspenseLoader>
          {agents.map(async function (agent) {
            let address;
            if (
              agent?.address &&
              typeof agent?.address === "object" &&
              Array.isArray(agent?.address)
            ) {
              const addressObj = agent?.address as Prisma.JsonArray;

              address = addressObj;
            }

            return (
              <TableRow key={agent.agentId}>
                <TableCell className="font-medium">
                  <Link
                    href={`/pharmacy/${agent.agentId}`}
                    className={buttonVariants({ variant: "link" })}
                  >
                    {agent.name}
                  </Link>
                </TableCell>
                <TableCell>{agent.number}</TableCell>
                <TableCell className="max-w-9">
                  {agent.address?.toString().replaceAll(",", ", ")}
                </TableCell>
                <TableCell>{agent.createdAt.toDateString()}</TableCell>
                <TableCell>
                  <AgentDropdown agentId={agent.agentId} />
                </TableCell>
              </TableRow>
            );
          })}
        </SuspenseLoader>
      </TableBody>
    </Table>
  );
};

export default AgentList;
