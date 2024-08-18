import { Transaction } from "@prisma/client";
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

const AllPayments = ({
  agents,
}: {
  agents: {
    agentId: string;
    name: string;
    number: string;
    transaction: Transaction[];
  }[];
}) => {
  return (
    <Table>
      <TableCaption>A list of your recent pharmacies.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Name</TableHead>
          <TableHead>Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {agents.map(async function (agent) {
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
              <TableCell>
                {agent.transaction.reduce((a, b) => a + b.inkam, 0)}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default AllPayments;
