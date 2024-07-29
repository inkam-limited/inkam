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
import { useEffect, useState } from "react";
import { getDistricts, getDivisions } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { createAgentSchema } from "../../lib/schema";
import { trpc } from "../_trpc/client";

export default function OnboardingForm() {
  const router = useRouter();
  const [divisions, setDivisions] = useState<{ division: string }[]>([]);
  const [districts, setDistricts] = useState<{ district: string }[]>([]);
  const form = useForm<z.infer<typeof createAgentSchema>>({
    resolver: zodResolver(createAgentSchema),
    defaultValues: {
      name: "",
      number: "",
      division: "",
      district: "",
    },
  });
  const selectedDivision = form.watch("division");
  const { mutate, isLoading } = trpc.createAgent.useMutation();

  useEffect(() => {
    getDivisions().then((data) => {
      setDivisions(data);
    });
    if (selectedDivision) {
      getDistricts(selectedDivision).then((data) => {
        setDistricts(data);
      });
    }
  }, [selectedDivision]);

  const onSubmit = async (data: z.infer<typeof createAgentSchema>) => {
    try {
      mutate(data);
    } catch (error) {
      console.log(error);
    } finally {
      router.push("onboard/success");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="gap-4 w-full flex-col flex max-w-lg border border-neutral-300 rounded-lg px-4 py-8"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Agent Name</FormLabel>
              <FormControl>
                <Input placeholder="Your name" {...field} />
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
          name="number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="Your number" {...field} />
              </FormControl>
              <FormDescription>Input your phone number </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="division"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Division</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your division" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {divisions.map((data) => (
                      <SelectItem value={data.division} key={data.division}>
                        {data.division}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        {selectedDivision && (
          <FormField
            control={form.control}
            name="district"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>District</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your division" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {districts.map((data) => (
                        <SelectItem value={data.district} key={data.district}>
                          {data.district}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        )}
        <Button type="submit">{isLoading ? "submitting..." : "Submit"}</Button>
      </form>
    </Form>
  );
}
