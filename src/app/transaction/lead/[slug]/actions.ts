"use server";

import prisma from "@/db";
import { TRPCError } from "@trpc/server";

export const createTransaction = async (data: { [key: string]: string }) => {
  try {
    await prisma.transaction.create({
      data: {
        agentNumber: data.agentNumber,
        agentId: data.agentId,
        agentName: data.agentName,
        customerName: data.customerName,
        customerNumber: data.customerNumber,
        customerLocation: data.customerLocation,
        labTestId: data.labTestId,
      },
    });
  } catch (error: any) {
    if (error.code === "P2002") {
      throw new TRPCError({
        code: "CONFLICT",
        message: "Agent Number already exists",
      });
    }
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Something went wrong",
    });
  }
  return { success: true };
};
