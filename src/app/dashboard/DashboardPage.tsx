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
import Link from "next/link";

export async function DashboardPage() {
  const numberOfPharmacies = await prisma.agent.count({
    where: { AgentType: "PHARMACY" },
  });
  const numberOfTransactions = await prisma.transaction.count();
  const transactionAmount = await prisma.transaction.findMany({
    select: {
      labTest: {
        select: {
          price: true,
          commission: true,
        },
      },
    },
  });
  const totalCommission = transactionAmount
    .map((t) => parseFloat(t.labTest?.commission)) // Convert commission to a float
    .reduce((acc, curr) => acc + curr, 0);
  const totalPrice = transactionAmount
    .map((t) => parseFloat(t.labTest?.price)) // Convert commission to a float
    .reduce((acc, curr) => acc + curr, 0);

  const data = [
    { name: "Pharmacies", value: numberOfPharmacies },
    { name: "Transactions", value: numberOfTransactions },
    {
      name: "Total Sales",
      value: `BDT ${totalPrice}`,
      gradient: "bg-gradient-to-r from-blue-600 to-violet-600 text-white",
      detail: {
        link: "/dashboard/transactions",
        title: "View Transactions",
      },
    },
    {
      name: "Total Commission",
      value: `BDT ${totalCommission}`,
      gradient: "bg-gradient-to-r from-red-500 to-orange-500 text-white",
      detail: {
        link: "/dashboard/payments",
        title: "View Payments",
      },
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {data.map((d) => (
        <SuspenseLoader
          key={d.name}
          fallback={<Skeleton className="h-full w-full" />}
        >
          <Card key={d.name} className={d.gradient}>
            <CardHeader>
              <CardTitle>{d.name}</CardTitle>
            </CardHeader>
            <CardContent className="text-5xl font-bold">{d.value}</CardContent>
            {d.detail && (
              <CardFooter>
                <Link
                  className={buttonVariants({ variant: "secondary" })}
                  href={d.detail.link}
                >
                  {d.detail.title}
                </Link>
              </CardFooter>
            )}
          </Card>
        </SuspenseLoader>
      ))}
    </div>
  );
}
