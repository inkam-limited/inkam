import prisma from "@/db";
import InvoiceList from "./InvoiceList";
import { ArrowLeftSquare } from "lucide-react";
import Link from "next/link";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import SuspenseLoader from "@/components/SuspenseLoader";

const page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const page = Number(searchParams["page"] ?? "1");
  const per_page = Number(searchParams["per_page"] ?? "10");

  const skip = (page - 1) * per_page;

  // Fetch total count of agents to determine the last page
  const totalInvoices = await prisma.invoice.count();
  const totalPages = Math.ceil(totalInvoices / per_page);
  const invoices = await prisma.invoice.findMany({
    where: {
      disbursed: false,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div>
      <h1 className="text-4xl font-bold dark:text-neutral-300">Invoices</h1>
      <SuspenseLoader>
        <InvoiceList invoices={invoices} />
      </SuspenseLoader>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            {page > 1 && (
              <PaginationPrevious
                href={{
                  pathname: "/dashboard/invoices",
                  query: {
                    page: page - 1,
                    per_page: per_page,
                  },
                }}
              />
            )}
          </PaginationItem>
          <PaginationItem></PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            {page < totalPages && (
              <PaginationNext
                href={{
                  pathname: "/dashboard/invoices",
                  query: {
                    page: page + 1,
                    per_page: per_page,
                  },
                }}
              />
            )}
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default page;
