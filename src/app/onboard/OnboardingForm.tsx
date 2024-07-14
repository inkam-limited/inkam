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
import { createUser } from "../actions/user.actions";
import { useRouter } from "next/navigation";

export const formSchema = z.object({
  name: z.string().min(1, { message: "Please enter your name" }),
  number: z
    .string()
    .min(1, { message: "Please enter your phone number" })
    .max(11, { message: "Valid phone number is 11 digits" })
    .startsWith("0", { message: "Number must start with 0" }),
  division: z.string().min(1, { message: "Please select your division" }),
  district: z.string().min(1, { message: "Please select your district" }),
});

export default function OnboardingForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const [divisions, setDivisions] = useState<{ division: string }[]>([]);
  const [districts, setDistricts] = useState<{ district: string }[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      number: "",
      division: "",
      district: "",
    },
  });
  const selectedDivision = form.watch("division");

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

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    const validateData = formSchema.safeParse(data);
    if (validateData.success) {
      console.log(validateData.data);
      const newUser = await createUser(validateData.data);
      console.log(newUser);
      router.push("onboard/success");
    } else {
      console.log(validateData.error);
    }
  };

  return (
    <div className="w-full max-w-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
          <Button type="submit">
            {isLoading ? "submitting..." : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
