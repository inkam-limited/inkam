import { z } from "zod";

export const createAgentSchema = z.object({
  name: z.string().min(1, { message: "Please enter your name" }),
  number: z
    .string()
    .min(1, { message: "Please enter your phone number" })
    .max(11, { message: "Valid phone number is 11 digits" })
    .refine((val) => val.startsWith("0"), {
      message: "Number must start with 0",
    }),
  address: z.any(),
  managerName: z
    .string()
    .min(1, { message: "Please enter your manager name" })
    .optional(),
  ownerNumber: z
    .string()
    .min(1, { message: "Please enter your phone number" })
    .optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
});

export const createTransactionSchema = z.object({
  agentId: z.string(),
  agentName: z.string().min(1, { message: "Please enter agent name" }),
  customerName: z.string().min(1, { message: "Please customer your name" }),
  customerNumber: z
    .string()
    .min(1, { message: "Please enter your phone number" })
    .max(11, { message: "Valid phone number is 11 digits" })
    .refine((val) => val.startsWith("0"), {
      message: "Number must start with 0",
    }),
  customerLocation: z.string().min(1, { message: "Please input your address" }),
  labTestId: z.string().min(1, { message: "Please select a lab test" }),
});
