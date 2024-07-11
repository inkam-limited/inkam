"use server";

import prisma from "@/db";
import { z } from "zod";
import { formSchema } from "../onboard/OnboardingForm";

export async function createUser(data: z.infer<typeof formSchema>) {
  try {
    const user = await prisma.agent.create({
      data: {
        name: data.name,
        number: data.number,
        division: data.division,
        district: data.district,
      },
    });

    return user;
  } catch (error) {
    throw new Error("Error creating user");
  }
}
