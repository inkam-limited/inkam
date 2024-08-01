import SuspenseLoader from "@/components/SuspenseLoader";
import { Button } from "@/components/ui/button";
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

export async function DashboardPage() {
  const numberOfPharmacies = await prisma.agent.count();
  const numberOfTransactions = await prisma.transaction.count();

  const data = [
    { name: "Pharmacies", value: numberOfPharmacies },
    { name: "Transactions", value: numberOfTransactions },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {data.map((d) => (
        <SuspenseLoader
          key={d.name}
          fallback={<Skeleton className="h-full w-full" />}
        >
          <Card key={d.name}>
            <CardHeader>
              <CardTitle>{d.name}</CardTitle>
              <CardContent className="text-5xl font-bold">
                {d.value}
              </CardContent>
            </CardHeader>
          </Card>
        </SuspenseLoader>
      ))}
    </div>
  );
}
