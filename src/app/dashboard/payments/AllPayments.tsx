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
    agentId: string;
    agentName: string;
    _sum: { inkam: number | null };
  }[];
}) => {
  return (
    <Table>
      <TableCaption>A list of your recent pharmacies.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Due Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map(async function (transaction) {
          return (
            <TableRow key={transaction.agentId}>
              <TableCell className="font-medium">
                <Link
                  href={`/pharmacy/${transaction.agentId}`}
                  className={buttonVariants({ variant: "link" })}
                >
                  {transaction.agentName}
                </Link>
              </TableCell>
              <TableCell>{transaction._sum.inkam}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default AllPayments;
