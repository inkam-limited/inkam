import prisma from "@/db";
import React from "react";
import PharmacyQR from "./PharmacyQR";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Agent } from "@prisma/client";
import TransactionTable from "./TransactionTable";

const PharmacyPage = async ({ params }: { params: { slug: string } }) => {
  const shop = await prisma.agent.findUnique({
    where: {
      id: params.slug,
    },
  });

  if (!shop) {
    return <div>Shop not found</div>;
  }

  const transactions = await prisma.transaction.findMany({
    where: {
      agentId: shop.id,
    },
  });
  console.log(transactions);
  return (
    <div className="grid grid-cols-2 gap-4 w-full max-w-7xl mx-auto px-4">
      <div className="flex justify-center flex-col gap-4">
        <h1 className="text-2xl font-bold">{shop.name}</h1>
        <p>{shop.number}</p>
      </div>
      <div className="flex flex-col gap-4">
        <PharmacyQR
          link={`${process.env.NEXT_PUBLIC_URL}/pharmacy/transaction/lead/${shop.id}`}
        />
        <Link href={`/pharmacy/transaction/lead/${shop.id}`}>
          <Button variant="outline">Generate Lead</Button>
        </Link>
      </div>
      <div className="col-span-1 md:col-span-2">
        <TransactionTable transactions={transactions} />
      </div>
    </div>
  );
};

export default PharmacyPage;
