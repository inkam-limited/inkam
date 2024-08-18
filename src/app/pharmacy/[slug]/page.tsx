import prisma from "@/db";
import React from "react";
import PharmacyQR from "./PharmacyQR";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import TransactionTable from "./TransactionTable";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TransactionStatus } from "@prisma/client";

const PharmacyPage = async ({ params }: { params: { slug: string } }) => {
  const shop = await prisma.agent.findUnique({
    where: {
      agentId: params.slug,
    },
  });

  if (!shop) {
    return <div>Shop not found</div>;
  }
  const transactions = await prisma.transaction.findMany({
    where: {
      agentId: shop.agentId,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      labTest: true,
    },
  });

  const paymentAmount = await prisma.transaction.aggregate({
    _sum: {
      amount: true,
      inkam: true,
    },
    where: {
      isPaid: false,
      agentId: shop.agentId,
      status: TransactionStatus.PROVIDED,
    },
  });

  return (
    <div>
      <h2 className="text-2xl font-bold py-4">Pharmacy Leads</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-7xl mx-auto">
        <div className="flex justify-center flex-col col-span-1 gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader>{shop.name}</CardHeader>
              <CardContent>
                <Link
                  className="text-pretty text-primary"
                  href={`tel:${shop.number}`}
                  rel="noopener noreferrer"
                >
                  Call: <p>{shop.number}</p>
                </Link>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="font-bold">Due amount</CardHeader>
              <CardContent className="text-4xl font-bold text-primary">
                {paymentAmount._sum.inkam ?? 0}
              </CardContent>
            </Card>
          </div>
          <PharmacyQR
            link={`${process.env.NEXT_PUBLIC_URL}/transaction/lead/${shop.agentId}`}
          />
          <Link
            href={`/transaction/lead/${shop.agentId}`}
            className={cn(buttonVariants({ variant: "secondary" }))}
          >
            Generate Lead
          </Link>
        </div>
        <div className="md:col-span-2">
          <TransactionTable transactions={transactions} />
        </div>
      </div>
    </div>
  );
};

export default PharmacyPage;
