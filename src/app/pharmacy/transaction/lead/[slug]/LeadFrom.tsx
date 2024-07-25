"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Agent } from "@prisma/client";
import { createTransactionSchema } from "@/lib/schema";
import { createTransaction } from "@/actions/agent.actions";
import { useRouter } from "next/navigation";

export default function LeadGenerationForm({ pharmacy }: { pharmacy: Agent }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof createTransactionSchema>>({
    resolver: zodResolver(createTransactionSchema),
    defaultValues: {
      agentId: pharmacy.id,
      agentName: pharmacy.name,
      customerName: "",
      customerNumber: "",
      customerLocation: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof createTransactionSchema>) => {
    setIsLoading(true);
    const validateData = createTransactionSchema.safeParse(data);
    if (validateData.success) {
      const result = await createTransaction(validateData.data);
      if (result) {
        console.log(result);
        router.push(
          `/pharmacy/transaction/success?ref=${result.customerNumber}`
        );
      }
    } else {
      console.log(validateData.error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 flex flex-col "
      >
        <FormField
          control={form.control}
          name="agentId"
          render={({ field }) => (
            <FormItem hidden>
              <FormControl>
                <Input disabled hidden {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="agentName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pharmacy Name</FormLabel>
              <FormControl>
                <Input disabled {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="customerName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Patient Name</FormLabel>
              <FormControl>
                <Input placeholder="Your name" {...field} />
              </FormControl>
              <FormDescription>Input patient Name</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="customerNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Patient Number</FormLabel>
              <FormControl>
                <Input placeholder="Your number" {...field} />
              </FormControl>
              <FormDescription>Input patient number</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="customerLocation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Patient Address</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormDescription>Input patient name</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">{isLoading ? "submitting..." : "Submit"}</Button>
      </form>
    </Form>
  );
}
