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
import prisma from "@/db";
import TransactionStatusDropdown from "./TransactionStatus";

const TransactionList = ({ transactions }: { transactions: Transaction[] }) => {
  return (
    <div>
      <Table>
        <TableCaption>A list of your recent pharmacies.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Number</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Agent</TableHead>
            <TableHead>Lab Test</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Commission</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions &&
            transactions.map(async function (transaction) {
              const testName = await prisma.labTest.findUnique({
                where: {
                  testId: transaction.labTestId,
                },
                select: {
                  name: true,
                },
              });
              return (
                <TableRow key={transaction.transactionId}>
                  <TableCell className="font-medium">
                    {transaction.customerName}
                  </TableCell>
                  <TableCell>{transaction.customerNumber}</TableCell>
                  <TableCell className="line-clamp-2">
                    {transaction.customerLocation}
                  </TableCell>
                  <TableCell>{transaction.agentName}</TableCell>
                  <TableCell>{testName?.name}</TableCell>
                  <TableCell>
                    {transaction.amount === 0 ? "-" : transaction.amount}
                  </TableCell>
                  <TableCell>
                    {transaction.inkam === 0 ? "-" : transaction.inkam}
                  </TableCell>
                  <TableCell className="relative">
                    <TransactionStatusDropdown
                      isPaid={transaction.isPaid}
                      agentId={transaction.agentId}
                      amount={transaction.amount}
                      currentStatus={transaction.status}
                      transactionId={transaction.transactionId}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </div>
  );
};

export default TransactionList;
