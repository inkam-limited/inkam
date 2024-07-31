import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import prisma from "@/db";

export async function DashboardPage() {
  const pharmacies = await prisma.agent.findMany({});
  const transactions = await prisma.transaction.findMany({});

  const data = [
    { name: "Pharmacies", value: pharmacies.length },
    { name: "Transactions", value: transactions.length },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {data.map((d) => (
        <Card key={d.name}>
          <CardHeader>
            <CardTitle>{d.name}</CardTitle>
            <CardContent className="text-5xl font-bold">{d.value}</CardContent>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
