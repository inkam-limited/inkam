import prisma from "@/db";
import React from "react";
import PharmacyQR from "./PharmacyQR";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import TransactionTable from "./TransactionTable";
import { cn } from "@/lib/utils";

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
  });

  return (
    <div>
      <h2 className="text-2xl font-bold py-4">Pharmacy Leads</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-7xl mx-auto">
        <div className="flex justify-center flex-col col-span-1 gap-4">
          <h1 className="text-2xl font-bold">{shop.name}</h1>
          <p>{shop.number}</p>
          <PharmacyQR
            link={`${process.env.NEXT_PUBLIC_URL}/transaction/lead/${shop.agentId}`}
          />
          <Link
            href={`/transaction/lead/${shop.agentId}`}
            className={cn(buttonVariants({ variant: "default" }))}
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
