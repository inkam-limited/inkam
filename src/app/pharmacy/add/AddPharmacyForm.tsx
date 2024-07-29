"use client";
import { useRouter } from "next/navigation";
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

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { createAgentSchema } from "@/lib/schema";
import { trpc } from "@/app/_trpc/client";

const AddPharmacyForm = () => {
  const router = useRouter();
  const { mutate, isLoading } = trpc.createAgent.useMutation();

  const form = useForm<z.infer<typeof createAgentSchema>>({
    resolver: zodResolver(createAgentSchema),
    defaultValues: {
      name: "",
      number: "",
      location: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof createAgentSchema>) => {
    try {
      mutate(data);
    } catch (error) {
      console.log(error);
    } finally {
      router.push("/pharmacy/dashboard");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pharmacy Name</FormLabel>
              <FormControl>
                <Input placeholder="Pharmacy name" {...field} />
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
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pharmacy address</FormLabel>
              <FormControl>
                <Input placeholder="input address" {...field} />
              </FormControl>
              <FormDescription>Input address</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Owner Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="Owner phone number" {...field} />
              </FormControl>
              <FormDescription>Input your phone number</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">{isLoading ? "submitting..." : "Submit"}</Button>
      </form>
    </Form>
  );
};

export default AddPharmacyForm;
