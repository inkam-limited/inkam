import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "./trpc";
import prisma from "@/db";
import { User, Transaction } from "@prisma/client";
import { createTransactionSchema } from "@/lib/schema";
import { redirect } from "next/navigation";

export const appRouter = router({
  authCallback: publicProcedure.query(async () => {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user?.id || !user.email) throw new TRPCError({ code: "UNAUTHORIZED" });
    const dbUser = await prisma.user.findFirst({
      where: {
        id: user.id,
      },
    });
    if (!dbUser) {
      await prisma.user.create({
        data: {
          id: user.id,
          email: user.email,
        },
      });
    }

    return { success: true };
  }),
  getUsers: protectedProcedure.query(async () => {
    const users: User[] = await prisma.user.findMany();
    return users;
  }),
  getLabTests: publicProcedure.query(async () => {
    const labTests = await prisma.labTest.findMany();
    return labTests;
  }),
  createTransaction: protectedProcedure
    .input(createTransactionSchema)
    .mutation(async ({ input }) => {
      try {
        await prisma.transaction.create({
          data: {
            agentId: input.agentId,
            agentName: input.agentName,
            customerNumber: input.customerNumber,
            customerName: input.customerName,
            customerLocation: input.customerLocation,
            labTestId: input.labTestId,
          },
        });

        return { success: true };
      } catch (error) {
        throw new TRPCError({ code: "BAD_REQUEST" });
      }
    }),
});

export type AppRouter = typeof appRouter;
