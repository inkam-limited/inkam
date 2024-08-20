"use server";
import prisma from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Role, TransactionStatus } from "@prisma/client";

export const updateTransactionStatus = async (
  transactionId: string,
  newStatus: TransactionStatus
) => {
  const { getUser } = await getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return {
      success: true,
      message: "You must be logged in to update the transaction status",
    };
  }

  const dbUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
    select: {
      role: true,
    },
  });

  if (dbUser?.role !== Role.PARTNER) {
    return {
      success: true,
      message: "You must be Amarlab to update the transaction status",
    };
  }

  const isProvided = await prisma.transaction.findUnique({
    where: {
      transactionId: transactionId,
    },
    select: {
      status: true,
    },
  });

  if (isProvided?.status === TransactionStatus.PROVIDED) {
    return {
      success: true,
      message: "Service already provided",
    };
  }

  try {
    await prisma.transaction.update({
      where: {
        transactionId: transactionId,
      },
      data: {
        status: newStatus,
      },
    });

    return {
      success: true,
      message: "Transaction status updated successfully",
    };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
};
