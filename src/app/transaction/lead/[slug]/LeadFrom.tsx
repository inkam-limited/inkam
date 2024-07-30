"use client";
import { set, z } from "zod";
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
import { useEffect, useState } from "react";
import { Agent } from "@prisma/client";
import { createTransactionSchema } from "@/lib/schema";
import { useRouter } from "next/navigation";
import { trpc } from "@/app/_trpc/client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CaretSortIcon } from "@radix-ui/react-icons";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { CheckIcon } from "lucide-react";

export default function LeadGenerationForm({ pharmacy }: { pharmacy: Agent }) {
  const { data: labTests, isLoading: isLabTestsLoading } =
    trpc.getLabTests.useQuery();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentTestId, setCurrentTestId] = useState<string>("");
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { mutate } = trpc.createTransaction.useMutation();

  const form = useForm<z.infer<typeof createTransactionSchema>>({
    resolver: zodResolver(createTransactionSchema),
    defaultValues: {
      agentId: pharmacy.id,
      agentName: pharmacy.name,
      customerName: "",
      customerNumber: "",
      customerLocation: "",
      labTestId: currentTestId,
    },
  });

  useEffect(() => {
    form.setValue("labTestId", currentTestId);
  }, [currentTestId]);

  const onSubmit = async (data: z.infer<typeof createTransactionSchema>) => {
    console.log(data);
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
        {labTests !== undefined && !isLabTestsLoading ? (
          <FormField
            control={form.control}
            name="labTestId"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Select test</FormLabel>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? labTests.find(
                              (language) => language.id === field.value
                            )?.name
                          : "Select test"}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent
                    align="start"
                    className="min-w-[200px] md:min-w-[500px]"
                  >
                    <Command>
                      <CommandInput
                        placeholder="Search test..."
                        className="h-9"
                      />
                      <CommandList>
                        <CommandEmpty>No tests found.</CommandEmpty>
                        <CommandGroup>
                          {labTests.map((language) => (
                            <CommandItem
                              asChild
                              value={language.name}
                              key={language.name}
                              onSelect={() => {
                                setCurrentTestId(language.id);
                              }}
                            >
                              <>
                                <Button
                                  variant="ghost"
                                  className="text-left w-full"
                                  onClick={() => {
                                    setCurrentTestId(language.id);
                                    setOpen(false);
                                  }}
                                >
                                  {language.name}
                                </Button>
                                <CheckIcon
                                  className={cn(
                                    "ml-auto h-4 w-4",
                                    language.name === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Select the lab test that you want to use.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        ) : null}
        <Button type="submit">{isLoading ? "submitting..." : "Submit"}</Button>
      </form>
    </Form>
  );
}
