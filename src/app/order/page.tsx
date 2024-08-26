"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";

const formSchema = z.object({
  skills: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

function page() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      skills: "",
    },
  });
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "skills",
  });
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {fields.map((field, index) => (
          <FormField
            key={field.id}
            control={form.control}
            name={`skills.${index}.name`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button
          onClick={() => {
            append("");
          }}
        >
          Add Username
        </Button>
        {fields.map((field, index) => (
          <Button
            key={field.id}
            onClick={() => {
              remove(index);
            }}
          >
            Remove Username
          </Button>
        ))}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
export default page;
