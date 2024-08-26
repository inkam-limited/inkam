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
import { Autocomplete, Libraries, useLoadScript } from "@react-google-maps/api";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { revalidatePath } from "next/cache";
const libraries = ["places"] as Libraries;

const AddPharmacyForm = () => {
  const router = useRouter();
  const [searchResult, setSearchResult] =
    useState<google.maps.places.Autocomplete>();
  const { isLoaded } = useLoadScript({
    id: process.env.GOOGLE_MAPS_ID,
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY as string,
    libraries,
  });
  const { mutate, isLoading } = trpc.createPharmacy.useMutation({
    onSuccess: () => {
      toast.success("Pharmacy created successfully");
      router.push("/dashboard/pharmacies");
      router.refresh();
    },
    onError: (error: any) => {
      toast.error(`Error: ${error.shape?.message ?? error.message}`);
      console.log(error);
    },
  });

  const form = useForm<z.infer<typeof createAgentSchema>>({
    resolver: zodResolver(createAgentSchema),
    defaultValues: {
      name: "",
      number: "",
      latitude: 0,
      longitude: 0,
      ownerNumber: "",
      managerName: "",
      address: [],
    },
  });

  function onLoad(autocomplete: google.maps.places.Autocomplete) {
    setSearchResult(autocomplete);
  }

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

  const onSubmit = async (data: z.infer<typeof createAgentSchema>) => {
    try {
      mutate(data);
    } catch (error: any) {
      if (error.shape?.code === "CONFLICT") {
        form.setError("number", {
          type: "conflict",
          message: "Manager Number already exists",
        });
      }
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

        <FormItem>
          <FormLabel>Location</FormLabel>
          {isLoaded ? (
            <Autocomplete onLoad={onLoad} onPlaceChanged={locationSelected}>
              <Input placeholder="Search for a location" />
            </Autocomplete>
          ) : (
            <Skeleton className="w-full h-8" />
          )}
        </FormItem>

        <Button type="submit">{isLoading ? "Submitting..." : "Submit"}</Button>
      </form>
    </Form>
  );
};

export default AddPharmacyForm;
