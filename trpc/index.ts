import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { TRPCError } from "@trpc/server";
import { protectedProcedure, publicProcedure, router } from "./trpc";
import prisma from "@/db";
import { AGENTTYPE, User } from "@prisma/client";
import { createAgentSchema, createTransactionSchema } from "@/lib/schema";
import { redirect } from "next/navigation";
import { z } from "zod";

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
          name: user.given_name,
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
      const labTests = await prisma.labTest.findUnique({
        where: {
          testId: input.labTestId,
        },
      });

      if (!labTests) {
        throw new TRPCError({ code: "BAD_REQUEST" });
      }
      try {
        await prisma.transaction.create({
          data: {
            agentNumber: input.agentNumber,
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
        console.log(error);
        throw new TRPCError({ code: "BAD_REQUEST" });
      } finally {
        redirect(
          `/transaction/lead/${labTests.testId}?ref=${input.customerNumber}&test=${labTests.name}`
        );
      }
    }),
  createAgent: publicProcedure
    .input(createAgentSchema)
    .mutation(async ({ input }) => {
      const numberExists = await prisma.agent.findFirst({
        where: {
          number: input.number,
        },
      });
      if (numberExists) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Number already exists",
        });
      }
      try {
        const agent = await prisma.agent.create({
          data: {
            name: input.name,
            number: input.number,
            address: input.address,
            latitude: input.latitude,
            longitude: input.longitude,
            managerName: input.managerName ?? "",
            ownerNumber: input.ownerNumber ?? "",
            AgentType: "INDIVIDUAL",
          },
        });
        return {
          success: true,
          agent: { agentName: agent.name, AgentType: agent.AgentType },
        };
      } catch (error) {
        console.log(error);
        throw new TRPCError({ code: "BAD_REQUEST" });
      }
    }),
  createPharmacy: publicProcedure
    .input(createAgentSchema)
    .mutation(async ({ input }) => {
      const numberExists = await prisma.agent.findFirst({
        where: {
          number: input.number,
        },
      });
      if (numberExists) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Number already exists",
        });
      }
      try {
        await prisma.agent.create({
          data: {
            name: input.name,
            number: input.number,
            address: input.address,
            latitude: input.latitude,
            longitude: input.longitude,
            managerName: input.managerName ?? "",
            ownerNumber: input.ownerNumber ?? "",
            AgentType: AGENTTYPE.PHARMACY,
          },
        });
        return { success: true };
      } catch (error) {
        console.log(error);
        throw new TRPCError({ code: "BAD_REQUEST" });
      }
    }),
  getAgentTransactions: publicProcedure
    .input(z.object({ agentNumber: z.string() }))
    .query(async ({ input }) => {
      const transactions = await prisma.transaction.findMany({
        where: {
          agentNumber: input.agentNumber,
        },
      });
      return transactions;
    }),
});

export type AppRouter = typeof appRouter;
