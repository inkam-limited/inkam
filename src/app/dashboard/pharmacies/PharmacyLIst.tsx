import { Agent } from "@prisma/client";
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

const PharmacyList = ({ pharmacies }: { pharmacies: Agent[] }) => {
  return (
    <Table>
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
        {pharmacies.map(async function (agent) {
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
              <TableCell>{agent.district}</TableCell>
              <TableCell>{agent.createdAt.toDateString()}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default PharmacyList;
