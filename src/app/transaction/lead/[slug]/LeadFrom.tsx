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
import { Agent, Transaction } from "@prisma/client";
import { createTransactionSchema } from "@/lib/schema";
import { createTransaction } from "@/actions/agent.actions";
import { useRouter } from "next/navigation";
import { trpc } from "@/app/_trpc/client";

export default function LeadGenerationForm({ pharmacy }: { pharmacy: Agent }) {
  const { data: labTests } = trpc.getLabTests.useQuery();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const { mutate } = trpc.createTransaction.useMutation();

  const form = useForm<z.infer<typeof createTransactionSchema>>({
    resolver: zodResolver(createTransactionSchema),
    defaultValues: {
      agentId: pharmacy.id,
      agentName: pharmacy.name,
      customerName: "",
      customerNumber: "",
      customerLocation: "",
      labTestId: "",
    },
  });
  const onSubmit = async (data: z.infer<typeof createTransactionSchema>) => {
    const test = data.labTestId
      ? labTests && labTests.find((test) => test.id === data.labTestId)?.name
      : "";
    setIsLoading(true);
    await mutate(data);
    router.push(`/transaction/success?ref=${data.customerNumber}&test=${test}`);
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
        <FormField
          control={form.control}
          name="labTestId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lab Test</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your lab test" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {labTests !== undefined &&
                      labTests.map((data) => (
                        <SelectItem value={data.id} key={data.id}>
                          {data.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">{isLoading ? "submitting..." : "Submit"}</Button>
      </form>
    </Form>
  );
}
