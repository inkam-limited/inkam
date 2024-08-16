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
  transactions,
}: {
  transactions: {
    _sum: { amount: number | null };
    _count: { amount: number };
    agentId: string;
    agentName: string;
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
        {transactions.map(async function (agent) {
          // console.log(totalTransactions);

          return (
            <TableRow key={agent.agentId}>
              <TableCell className="font-medium">
                <Link
                  href={`/pharmacy/${agent.agentId}`}
                  className={buttonVariants({ variant: "link" })}
                >
                  {agent.agentName}
                </Link>
              </TableCell>
              <TableCell>{agent._sum?.amount}</TableCell>

              {/* <TableCell> */}
              {/* <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full">
                      Actions
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <Link href={`/pharmacy/${agent.agentId}`}>View</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href={`/pharmacy/${agent.agentId}`}>Edit</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href={`/pharmacy/${agent.agentId}`}>Delete</Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu> */}
              {/* </TableCell> */}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default AllPayments;
