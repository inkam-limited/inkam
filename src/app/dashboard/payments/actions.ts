"use server";

import prisma from "@/db";
import { Prisma } from "@prisma/client";

export const createInvoice = async () => {
  const transactions = await prisma.transaction.groupBy({
    by: ["agentId", "agentName"],
    where: {
      status: "PROVIDED",
      isPaid: false,
    },
    _sum: {
      inkam: true,
    },
  });

  console.log(transactions);
  if (transactions.length === 0 && transactions === null) {
    return { success: false, message: "No transactions to invoice" };
  }
  const invoice = await prisma.invoice.create({
    data: {
      amount: transactions.reduce((acc, curr) => acc + curr._sum.inkam!, 0),
      data: transactions as Prisma.JsonArray,
    },
  });

  await prisma.transaction.updateMany({
    where: {
      agentId: {
        in: transactions.map((t) => t.agentId),
      },
      status: "PROVIDED",
    },
    data: {
      isPaid: true,
    },
  });

  console.log(invoice);
  return { success: true };
};
