"use client";
import { Agent } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Autocomplete, Libraries, useLoadScript } from "@react-google-maps/api";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createAgentSchema } from "../../../../lib/schema";
import { toast } from "sonner";
import { set, z } from "zod";
import { Skeleton } from "@/components/ui/skeleton";
import { editAgent } from "../../actions";
import { LoaderCircleIcon } from "lucide-react";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";
const libraries = ["places"] as Libraries;

const EditAgentForm = ({ agent }: { agent: Agent }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchResult, setSearchResult] =
    useState<google.maps.places.Autocomplete>();
  const { isLoaded } = useLoadScript({
    id: process.env.GOOGLE_MAPS_ID,
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY as string,
    libraries,
  });
  const form = useForm<z.infer<typeof createAgentSchema>>({
    resolver: zodResolver(createAgentSchema),
    defaultValues: {
      name: agent.name,
      number: agent.number,
      latitude: 0,
      longitude: 0,
      ownerNumber: agent.ownerNumber || "",
      managerName: agent.managerName || "",
      address: agent.address || [],
    },
  });

  function locationSelected() {
    if (searchResult) {
      const place = searchResult.getPlace();
      const geoLatitude = place.geometry?.location?.lat();
      const geoLongitude = place.geometry?.location?.lng();
      form.setValue("latitude", geoLatitude || 0);
      form.setValue("longitude", geoLongitude || 0);
      const mapAddress = place.address_components;
      if (mapAddress) {
        const address = mapAddress.map((address) => address.short_name);
        form.setValue("address", address);
      }
    }
  }

  function onLoad(autocomplete: google.maps.places.Autocomplete) {
    setSearchResult(autocomplete);
  }

  const onSubmit = async (data: z.infer<typeof createAgentSchema>) => {
    console.log(form.getValues("address"));
    try {
      if (form.getValues("address").length === 0) {
        form.setError("address", {
          type: "required",
          message: "Address is required",
        });
        toast.error("Address is required");
        return;
      }
      setIsLoading(true);
      await editAgent(agent.agentId, data);
      toast.success("Updated successfully");
      setIsLoading(false);
      router.refresh();
      router.push(`/pharmacy/${agent.agentId}`);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      toast.error("Error creating agent");
    }
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-8 md:grid-cols-2 "
        >
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
            name="managerName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Manager Name</FormLabel>
                <FormControl>
                  <Input placeholder="Manager name" {...field} />
                </FormControl>
                <FormDescription>This is your manager name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="ownerNumber"
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
          <FormField
            control={form.control}
            name="number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Managers Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="Manager phone number" {...field} />
                </FormControl>
                <FormDescription>Input managers phone number</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormItem className="col-span-1 md:col-span-2">
            <FormLabel>Location</FormLabel>
            {isLoaded ? (
              <Autocomplete onLoad={onLoad} onPlaceChanged={locationSelected}>
                <Input placeholder="Search for a location" />
              </Autocomplete>
            ) : (
              <Skeleton className="w-full h-8" />
            )}
          </FormItem>

          <Button className="col-span-1 md:col-span-2" type="submit">
            {isLoading ? (
              <LoaderCircleIcon className="animate-spin h-5 w-5" />
            ) : (
              "Save"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default EditAgentForm;
