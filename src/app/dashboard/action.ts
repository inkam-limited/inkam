"use server";

import prisma from "@/db";

export const getLabTest = async (id: string) => {
  const labTest = await prisma.labTest.findFirst({
    where: {
      testId: id,
    },
  });
  return labTest;
};
