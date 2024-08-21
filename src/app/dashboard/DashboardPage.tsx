import SuspenseLoader from "@/components/SuspenseLoader";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import prisma from "@/db";
import { cn } from "@/lib/utils";
import { TransactionStatus } from "@prisma/client";
import Link from "next/link";
import { Suspense } from "react";

export async function DashboardPage() {
  const totalSales = await prisma.transaction.aggregate({
    where: {
      status: {
        in: [TransactionStatus.PROVIDED],
      },
    },
    _sum: {
      inkam: true,
      amount: true,
    },
    _count: {
      amount: true,
      inkam: true,
    },
  });
  const orderPending = await prisma.transaction.aggregate({
    where: {
      isPaid: false,
      status: {
        in: [TransactionStatus.PENDING, TransactionStatus.SCHEDULED],
      },
    },
    _sum: {
      amount: true,
      inkam: true,
    },
    _count: {
      amount: true,
      inkam: true,
    },
  });

  const orderFailed = await prisma.transaction.aggregate({
    where: {
      status: {
        in: [TransactionStatus.FAILED],
      },
    },
    _sum: {
      amount: true,
      inkam: true,
    },
    _count: {
      amount: true,
      inkam: true,
    },
  });

  const data = [
    {
      name: "Total Orders",
      value: `BDT ${totalSales._sum.amount ?? 0}`,
      qty: totalSales._count.amount,
      gradient: "bg-gradient-to-r from-blue-600 to-violet-600 text-white",
      detail: {
        link: "/dashboard/transactions",
        title: "View Transactions",
      },
    },
    {
      name: "Total Commission",
      value: `BDT ${totalSales._sum.inkam ?? 0}`,
      qty: totalSales._count.inkam,
      gradient: "bg-gradient-to-r from-red-500 to-orange-500 text-white",
      detail: {
        link: "/dashboard/payments",
        title: "View Payments",
      },
    },
    {
      name: "Service Pending",
      value: `BDT ${orderPending._sum.amount || 0}`,
      qty: orderPending._count.amount,
      gradient: "bg-gradient-to-r from-red-500 to-orange-500 text-white",
      detail: {
        link: "/dashboard/transactions",
        title: "View Transactions",
      },
    },
    {
      name: "Commission Pending",
      value: `BDT ${orderPending._sum.inkam || 0}`,
      qty: orderPending._count.inkam,
      gradient: "bg-gradient-to-r from-red-500 to-orange-500 text-white",
      detail: {
        link: "/dashboard/invoices",
        title: "View Invoices",
      },
    },
    {
      name: "Order Failed",
      value: `BDT ${orderFailed._sum.amount || 0}`,
      qty: orderFailed._count.inkam,
      gradient: "bg-gradient-to-r from-red-500 to-orange-500 text-white",
    },
    {
      name: "Commission Failed",
      value: `BDT ${orderFailed._sum.inkam || 0}`,
      qty: orderFailed._count.inkam,
      gradient: "bg-gradient-to-r from-red-500 to-orange-500 text-white",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2  gap-4">
      {data && data.length > 0
        ? data.map((d) => (
            <Suspense
              key={d.name}
              fallback={<Skeleton className="h-8 w-full" />}
            >
              <Card key={d.name} className={cn(d.gradient, "border-none")}>
                <CardHeader>
                  <CardTitle>{d.name}</CardTitle>
                </CardHeader>
                <CardContent className="text-3xl font-bold">
                  {d.value}
                </CardContent>
                {d.qty ? (
                  <CardFooter>
                    <span className="text-sm text-neutral-50">
                      From {d.qty} orders
                    </span>
                  </CardFooter>
                ) : null}
                {d.detail ? (
                  <CardFooter>
                    <Link
                      className={buttonVariants({ variant: "secondary" })}
                      href={d.detail.link}
                    >
                      {d.detail.title}
                    </Link>
                  </CardFooter>
                ) : (
                  <Skeleton className="h-8 w-full" />
                )}
              </Card>
            </Suspense>
          ))
        : null}
    </div>
  );
}
