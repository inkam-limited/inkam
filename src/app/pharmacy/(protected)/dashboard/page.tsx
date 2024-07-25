import { buttonVariants } from "@/components/ui/button";
import prisma from "@/db";
import { Agent } from "@prisma/client";
import Link from "next/link";
import React from "react";
import PharmacyList from "./PharmacyList";

const PharmacyDashboard = async () => {
  const pharmacies: Agent[] = await prisma.agent.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div>
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold py-4">Add a new pharmacy</h2>
        <PharmacyList pharmacies={pharmacies} />
      </div>
    </div>
  );
};

export default PharmacyDashboard;
