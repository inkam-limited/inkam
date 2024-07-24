import { buttonVariants } from "@/components/ui/button";
import prisma from "@/db";
import { Agent } from "@prisma/client";
import Link from "next/link";
import React from "react";

const page = async () => {
  const pharmacyList: Agent[] = await prisma.agent.findMany();

  return (
    <div>
      <div className="flex flex-col gap-4">
        {pharmacyList.map((pharmacy) => (
          <div
            key={pharmacy.id}
            className="flex justify-between items-center gap-4"
          >
            <h1 className="text-2xl font-bold">{pharmacy.name}</h1>
            <p>{pharmacy.number}</p>
            <Link href={`/pharmacy/${pharmacy.id}`}>
              <button className={buttonVariants({ variant: "link" })}>
                Generate QR
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
