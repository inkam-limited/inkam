import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "./trpc";
import prisma from "@/db";
import { User } from "@prisma/client";

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
  hello: publicProcedure.query(async () => {
    const users = await prisma.user.findMany();
    console.log(users);
    return { message: "hello", success: true };
  }),
});

export type AppRouter = typeof appRouter;
