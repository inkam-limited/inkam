"use server";

import prisma from "@/db";
import { TRPCError } from "@trpc/server";
import { redirect } from "next/navigation";

export const createTransaction = async ({
  labTestId,
  agentId,
  customerNumber,
  customerName,
  customerLocation,
  agentName,
  agentNumber,
}: {
  agentName: string;
  labTestId: string;
  agentId: string;
  customerNumber: string;
  customerName: string;
  customerLocation: string;
  agentNumber: string;
}) => {
  debugger;
  const labTests = await prisma.labTest.findUnique({
    where: {
      testId: labTestId,
    },
  });
  if (!labTests) {
    throw new TRPCError({ code: "BAD_REQUEST" });
  }
  try {
    await prisma.transaction.create({
      data: {
        agentNumber,
        agentId,
        agentName,
        customerNumber,
        customerName,
        customerLocation,
        labTestId,
      },
    });
    return { success: true };
  } catch (error) {
    console.log(error);
    throw new TRPCError({ code: "BAD_REQUEST" });
  }
};
