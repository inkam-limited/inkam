"use server";

import prisma from "@/db";
import { createAgentSchema } from "@/lib/schema";
import { z } from "zod";

const editAgent = async (
  agentId: string,
  data: z.infer<typeof createAgentSchema>
) => {
  const agent = await prisma.agent.findUnique({
    where: {
      agentId: agentId,
    },
  });

  if (!agent) {
    throw new Error("Agent not found");
  }

  await prisma.agent.update({
    where: {
      agentId: agentId,
    },
    data: {
      name: data.name,
      number: data.number,
      ownerNumber: data.ownerNumber,
      managerName: data.managerName,
      address: data.address,
    },
  });
  return { success: true };
};

export { editAgent };
