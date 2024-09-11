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
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { CheckIcon, LoaderCircleIcon } from "lucide-react";
import useMediaQuery from "@custom-react-hooks/use-media-query";
import { createTransaction } from "./actions";
import { sendMail } from "@/lib/mailer";
import { Badge } from "@/components/ui/badge";
import Overlay from "./Overlay";

export default function LeadGenerationForm({ pharmacy }: { pharmacy: Agent }) {
  const { data: labTests, isLoading: isLabTestsLoading } =
    trpc.getLabTests.useQuery();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentTestId, setCurrentTestId] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [inkam, setInkam] = useState<number>(0);
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [noticeOpen, setNoticeOpen] = useState(true);
  const isWide = useMediaQuery("(min-width: 600px)");
  const form = useForm<z.infer<typeof createTransactionSchema>>({
    resolver: zodResolver(createTransactionSchema),
    defaultValues: {
      agentId: pharmacy.agentId,
      agentName: pharmacy.name,
      customerName: "",
      customerNumber: "",
      customerLocation: "",
      labTestId: currentTestId,
      agentNumber: pharmacy.number,
      amount: 0,
      inkam: 0,
    },
  });

  useEffect(() => {
    form.setValue("labTestId", currentTestId);
    form.setValue("amount", amount);
    form.setValue("inkam", inkam);
  }, [currentTestId, inkam, amount]);

  const onSubmit = async (data: z.infer<typeof createTransactionSchema>) => {
    const test = data.labTestId
      ? labTests &&
        labTests.find((test) => test.testId === data.labTestId)?.name
      : "";
    if (!test) {
      return;
    }
    setIsLoading(true);
    const { success } = await createTransaction(data);
    if (success) {
      const res = await sendMail({
        patientName: data.customerName,
        patientNumber: data.customerNumber,
        testName: test,
        address: data.customerLocation,
      });
      console.log(res);
      router.push(
        `/transaction/success?ref=${data.customerNumber}&test=${test}`
      );
    } else {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 flex flex-col w-full max-w-7xl mx-auto px-4 z-20"
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
              <FormItem hidden>
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
          {isWide && labTests !== undefined && !isLabTestsLoading ? (
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
                                (language) => language.testId === field.value
                              )?.name
                            : "Select test"}
                          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent
                      align="start"
                      className="min-w-[300px] md:min-w-[500px]"
                    >
                      <Command>
                        <CommandInput
                          placeholder="Search test..."
                          className="h-9"
                        />
                        <CommandList>
                          <CommandEmpty>No tests found.</CommandEmpty>
                          <CommandGroup>
                            {labTests.map((test) => (
                              <CommandItem
                                asChild
                                value={test.name}
                                key={test.name}
                                onSelect={() => {
                                  setCurrentTestId(test.testId);
                                  setInkam(parseFloat(test.commission));
                                  setAmount(parseFloat(test.price));
                                }}
                              >
                                <>
                                  <Button
                                    variant="ghost"
                                    className="text-left w-full flex justify-between gap-2"
                                    onClick={() => {
                                      setCurrentTestId(test.testId);
                                      setAmount(parseFloat(test.price));
                                      setInkam(parseFloat(test.commission));
                                      setOpen(false);
                                    }}
                                  >
                                    <span className="text-left overflow-hidden text-ellipsis whitespace-nowrap">
                                      {test.name}
                                    </span>
                                    <Badge className="bg-gradient-to-bl from-blue-500 to-fuchsia-600 text-white">
                                      BDT {test.price}
                                    </Badge>
                                  </Button>
                                  <CheckIcon
                                    className={cn(
                                      "ml-auto h-4 w-4",
                                      test.name === field.value
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
          ) : !isWide && labTests !== undefined && !isLabTestsLoading ? (
            <FormField
              control={form.control}
              name="labTestId"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Select test</FormLabel>
                  <Drawer open={open} onOpenChange={setOpen}>
                    <DrawerTrigger asChild>
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
                                (language) => language.testId === field.value
                              )?.name
                            : "Select test"}
                          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </DrawerTrigger>
                    <DrawerContent className="min-w-[200px] md:min-w-[500px]">
                      <Command>
                        <CommandInput
                          placeholder="Search test..."
                          className="h-9"
                        />
                        <CommandList>
                          <CommandEmpty>No tests found.</CommandEmpty>
                          <CommandGroup>
                            {labTests.map((test) => (
                              <CommandItem
                                asChild
                                value={test.name}
                                key={test.name}
                                onSelect={() => {
                                  setCurrentTestId(test.testId);
                                  setAmount(parseFloat(test.price));
                                  setInkam(parseFloat(test.commission));
                                }}
                              >
                                <>
                                  <Button
                                    variant="ghost"
                                    className="text-left w-full flex justify-between gap-2"
                                    onClick={() => {
                                      setCurrentTestId(test.testId);
                                      setAmount(parseFloat(test.price));
                                      setInkam(parseFloat(test.commission));
                                      setOpen(false);
                                    }}
                                  >
                                    <span className="text-left overflow-hidden text-ellipsis whitespace-nowrap">
                                      {test.name}
                                    </span>
                                    <Badge className="bg-gradient-to-bl from-blue-500 to-fuchsia-600 text-white">
                                      BDT {test.price}
                                    </Badge>
                                  </Button>
                                  <CheckIcon
                                    className={cn(
                                      "ml-auto h-4 w-4",
                                      test.name === field.value
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
                    </DrawerContent>
                  </Drawer>
                  <FormDescription>
                    Select the lab test that you want to use.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : null}
          {isLoading ? (
            <Button size="lg" type="submit" disabled>
              <LoaderCircleIcon className="w-5 h-5 animate-spin" />
            </Button>
          ) : (
            <button
              type="submit"
              className="bg-gradient-to-bl px-4 py-2 rounded-lg from-blue-800 to-fuchsia-800 text-white backdrop-blur-lg"
            >
              Submit
            </button>
          )}
        </form>
      </Form>
      {noticeOpen && <Overlay setNoticeOpen={setNoticeOpen} />}
      <div className="bg-blue-500/30 absolute top-[-6rem] -z-10 right-[11rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[10rem] sm:w-[68.75rem] dark:bg-blue-500/30"></div>
      <div className="bg-yellow-300/30 absolute bottom-[-1rem] -z-10 right-[-35rem] h-[31.25rem] w-[50rem] rounded-full blur-[10rem] sm:w-[68.75rem] md:right-[-33rem] lg:right-[-28rem] xl:right-[-15rem] 2xl:right-[-5rem] dark:bg-yellow-500/30"></div>
    </>
  );
}
