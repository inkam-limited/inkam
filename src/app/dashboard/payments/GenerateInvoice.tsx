"use client";

import { Button } from "@/components/ui/button";
import { Invoice, Prisma } from "@prisma/client";

const GenerateInvoice = ({ invoice }: { invoice: Invoice }) => {
  const invoiceTransactions = invoice.data as Prisma.JsonArray;
  const viewInvoice = () => {
    console.log(invoiceTransactions);
  };
  return <Button onClick={viewInvoice}>View Invoice</Button>;
};

export default GenerateInvoice;
