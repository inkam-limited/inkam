"use server";

import prisma from "@/db";
import { createAgentSchema, createTransactionSchema } from "@/lib/schema";
import { z } from "zod";

export async function createAgent(data: z.infer<typeof createAgentSchema>) {
  try {
    const agent = await prisma.agent.create({
      data: {
        name: data.name,
        number: data.number,
        division: data.division ?? "",
        district: data.district ?? "",
        location: data.location ?? "",
      },
    });
    return agent;
  } catch (error) {
    throw new Error("Error creating agent");
  }
}

export async function createTransaction(
  data: z.infer<typeof createTransactionSchema>
) {
  try {
    const transaction = await prisma.transaction.create({
      data: {
        agentId: data.agentId,
        agentName: data.agentName,
        customerName: data.customerName,
        customerLocation: data.customerLocation,
        customerNumber: data.customerNumber,
      },
    });
    return transaction;
  } catch (error) {
    throw new Error("Error creating transaction");
  }
}
