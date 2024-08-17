"use server";

import prisma from "@/db";
import { TransactionStatus, Transaction } from "@prisma/client";

// if (!transaction) {
//   return { success: false };
// }
// if (transaction.status === TransactionStatus.PROVIDED) {
//   const payment = await prisma.payment.create({
//     data: {
//       amount: transaction.amount,
//       agentId,
//       status: PaymentStatus.PENDING,
//       transactionId: transaction.transactionId,
//     },
//   });
//   return {
//     success: true,
//     message: "Payment created successfully",
//   };
// }

export const updateAgentPayment = async (
  agentId: string,
  newAmount: number
) => {
  try {
    console.log("updateAgentPayment", newAmount);
    const updatedData = await prisma.agent.update({
      where: {
        agentId: agentId,
      },
      data: {
        payment: {
          increment: newAmount,
        },
        agentPayment: {
          increment: newAmount * 0.2,
        },
      },
    });
    console.log(updatedData);
    return {
      success: true,
      message: "Agent payment updated successfully",
    };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
};

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
