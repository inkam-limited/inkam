"use server";

import prisma from "@/db";
import { TRPCError } from "@trpc/server";

export type ICreateTransaction = {
  agentNumber: string;
  agentId: string;
  agentName: string;
  customerName: string;
  customerNumber: string;
  customerLocation: string;
  labTestId: string;
  amount: number;
  inkam: number;
};

export const createTransaction = async (data: ICreateTransaction) => {
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
        amount: data.amount,
        inkam: data.inkam,
      },
      include: {
        Payment: true,
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
