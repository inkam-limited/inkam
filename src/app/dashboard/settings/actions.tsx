"use server";

import prisma from "@/db";
import { Prisma, Role } from "@prisma/client";

export const updateUserRole = async (userId: string, role: Role) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      role,
    },
  });
};
