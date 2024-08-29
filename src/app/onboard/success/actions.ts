"use server";

import prisma from "@/db";
import { createAgentSchema } from "@/lib/schema";
import { z } from "zod";

export const createAgent = async (agent: z.infer<typeof createAgentSchema>) => {
  const existingAgent = await prisma.agent.findFirst({
    where: {
      number: agent.number,
    },
  });

  if (existingAgent) {
    return { success: false, message: "Number already exists" };
  }

  try {
    await prisma.agent.create({
      data: {
        name: agent.name,
        number: agent.number,
        address: agent.address,
        AgentType: "INDIVIDUAL",
      },
    });
    return { success: true, message: "Agents created Successfully" };
  } catch (error) {
    console.log(error);
    throw new Error("Error creating agent");
  }
};
