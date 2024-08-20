"use server";

import prisma from "@/db";
import { sendInvoice } from "@/lib/mailer";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Prisma, Role } from "@prisma/client";
import { redirect } from "next/navigation";

export const createInvoice = async () => {
  const { getUser } = await getKindeServerSession();
  const user = await getUser();
  if (!user) {
    return { success: false, message: "You need to login to continue" };
  }
  const dbUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });
  if (!dbUser) {
    redirect("/auth-callback?origin=dashboard/payments");
  }

  if (dbUser?.role !== Role.PARTNER) {
    return { success: true, message: "Only Amarlab can create invoices" };
  }

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

  if (transactions.length === 0 && transactions === null) {
    return { success: true, message: "No transactions to invoice" };
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
      isPaid: false,
    },
    data: {
      isPaid: true,
    },
  });
  await sendInvoice({
    invoice,
  });

  console.log(invoice);
  return { success: true, message: "Invoice created successfully" };
};
