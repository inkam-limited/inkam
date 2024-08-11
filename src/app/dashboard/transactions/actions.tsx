"use server";

import prisma from "@/db";
import { TransactionStatus } from "@prisma/client";

export const updateTransactionStatus = async (
  transactionId: string,
  newStatus: TransactionStatus
) => {
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
