import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Invoice } from "@prisma/client";
import { ActivityIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const InvoiceList = ({ invoices }: { invoices: Invoice[] }) => {
  console.log(invoices);
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Amount</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>
            <ActivityIcon />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.id}>
            <TableCell>{invoice.amount}</TableCell>
            <TableCell>{invoice.createdAt.toDateString()}</TableCell>
            <TableCell>
              <Link href={`/dashboard/invoices/${invoice.id}`}>View</Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default InvoiceList;
