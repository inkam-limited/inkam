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
import { createAgent } from "@/app/actions/agent.actions";

const AddPharmacyPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof createAgentSchema>>({
    resolver: zodResolver(createAgentSchema),
    defaultValues: {
      name: "",
      number: "",
      location: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof createAgentSchema>) => {
    setIsLoading(true);
    const validateData = createAgentSchema.safeParse(data);
    if (validateData.success && validateData.data) {
      const result = await createAgent(validateData.data);
      if (result) {
        router.push("/pharmacy/dashboard");
      }
    }
  };

  return (
    <div className="w-full max-w-lg flex items-center justify-center  h-full">
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
                <FormLabel>Agent address</FormLabel>
                <FormControl>
                  <Input placeholder="shop address" {...field} />
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
                <FormDescription>Input your phone number </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">
            {isLoading ? "submitting..." : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AddPharmacyPage;
