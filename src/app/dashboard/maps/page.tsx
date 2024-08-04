import AgentMap from "@/components/AgentMap";
import prisma from "@/db";
import React from "react";

const page = async () => {
  const agents = await prisma.agent.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      AgentType: true,
      name: true,
      latitude: true,
      longitude: true,
      agentId: true,
    },
  });
  return (
    <div className="w-full -mt-8">
      <AgentMap agents={agents} />
    </div>
  );
};

export default page;
