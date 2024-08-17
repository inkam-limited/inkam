"use server";

import prisma from "@/db";

export const generatePayment = async ({ agentId }: { agentId: string }) => {
  await prisma.agent.update({
    where: {
      agentId,
    },
    data: {
      agentPayment: {
        set: 0,
      },
      transaction: {
        updateMany: {
          where: {
            isPaid: true,
          },
          data: {
            isPaid: false,
          },
        },
      },
    },
    include: {
      transaction: true,
    },
  });

  return { success: true };
};
