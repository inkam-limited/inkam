import PharmacyList from "@/app/pharmacy/dashboard/PharmacyList";
import prisma from "@/db";
import { Agent } from "@prisma/client";
import Link from "next/link";
import React from "react";
import AgentList from "./AgentList";

const PharmacyDashboard = async () => {
  const agents: Agent[] = await prisma.agent.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div>
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">All Agents</h2>
        <AgentList agents={agents} />
      </div>
    </div>
  );
};

export default PharmacyDashboard;
