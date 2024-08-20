import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import prisma from "@/db";
import { cn } from "@/lib/utils";
import { ArrowLeftSquare } from "lucide-react";
import Link from "next/link";
import React from "react";
import InvoiceBody from "./InvoiceBody";

const page = async ({ params }: { params: { invoiceId: string } }) => {
  const invoice = await prisma.invoice.findUnique({
    where: {
      id: params.invoiceId,
    },
  });

  return (
    <>
      <InvoiceBody invoice={invoice!} />
    </>
  );
};

export default page;
