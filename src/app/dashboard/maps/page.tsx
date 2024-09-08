import AgentMap from "@/components/AgentMap";
import prisma from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import React from "react";

const page = async () => {
  const agents = await prisma.agent.findMany({
    where: {
      AgentType: "PHARMACY",
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      AgentType: true,
      name: true,
      agentId: true,
      latitude: true,
      longitude: true,
    },
  });
  return (
    <div className="w-full -mt-8">
      <AgentMap agents={agents} />
    </div>
  );
};

export default page;
