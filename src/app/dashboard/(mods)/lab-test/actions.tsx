"use server";

import prisma from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";

export const deleteLabTest = async (testId: string) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    throw new Error("You are not logged in");
  }

  const dbUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });

  if (!dbUser) {
    throw new Error("User not found");
  }

  if (dbUser.role !== "ADMIN") {
    throw new Error("You do not have permission to delete this agent");
  }

  const agent = await prisma.labTest.findUnique({
    where: {
      testId,
    },
  });

  if (!agent) {
    throw new Error("Agent not found");
  }

  try {
    await prisma.labTest.delete({
      where: {
        testId,
      },
    });

    revalidatePath("dashboard/lab-test");
    return { success: true, message: "Lab test deleted successfully" };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};
