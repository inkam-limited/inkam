import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "./trpc";
import prisma from "@/db";
import { User, Transaction } from "@prisma/client";
import { createAgentSchema, createTransactionSchema } from "@/lib/schema";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

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
  changeUserRole: protectedProcedure
    .input(
      z.object({ id: z.string(), role: z.enum(["ADMIN", "AGENT", "USER"]) })
    )
    .mutation(async ({ input }) => {
      try {
        const user = await prisma.user.findUnique({
          where: {
            id: input.id,
          },
        });

        if (!user) {
          throw new TRPCError({ code: "BAD_REQUEST" });
        }

        await prisma.user.update({
          where: {
            id: input.id,
          },
          data: {
            role: input.role,
          },
        });
      } catch (error) {
        throw new TRPCError({ code: "BAD_REQUEST" });
      } finally {
        revalidatePath("/dashboard");
      }

      return { success: true };
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
        console.log(input);
        return { success: true };
      } catch (error) {
        throw new TRPCError({ code: "BAD_REQUEST" });
      }
    }),
  createAgent: publicProcedure
    .input(createAgentSchema)
    .mutation(async ({ input }) => {
      try {
        await prisma.agent.create({
          data: {
            name: input.name,
            number: input.number,
            division: input.division,
            district: input.district,
            location: input.location,
          },
        });
        return { success: true };
      } catch (error) {
        throw new TRPCError({ code: "BAD_REQUEST" });
      }
    }),
});

export type AppRouter = typeof appRouter;
