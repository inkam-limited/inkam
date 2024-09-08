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
import { buttonVariants } from "@/components/ui/button";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import AgentDropdown from "../(mods)/agents/agent-dropdown";

const PharmacyList = ({ pharmacies }: { pharmacies: Agent[] }) => {
  return (
    <Table>
      <TableCaption>A list of your recent pharmacies.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Name</TableHead>
          <TableHead>Number</TableHead>
          <TableHead>Address</TableHead>
          <TableHead className="">Joined</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {pharmacies.map(async function (agent) {
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
            <Suspense
              key={agent.agentId}
              fallback={<Skeleton className="h-8 min-w-16 w-full" />}
            >
              <TableRow>
                <TableCell className="font-medium">
                  <Link
                    href={`/pharmacy/${agent.agentId}`}
                    className={buttonVariants({ variant: "link" })}
                  >
                    {agent.name}
                  </Link>
                </TableCell>
                <TableCell>{agent.number}</TableCell>
                <TableCell>
                  {(agent.address?.toString().split(",")[1] &&
                    agent.address?.toString().split(",")[2]) ||
                    agent.address?.toString().split(",")[2] ||
                    agent.address?.toString().split(",")[3]}
                </TableCell>
                <TableCell>{agent.createdAt.toDateString()}</TableCell>
                <TableCell>
                  <AgentDropdown agentId={agent.agentId} />
                </TableCell>
              </TableRow>
            </Suspense>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default PharmacyList;
