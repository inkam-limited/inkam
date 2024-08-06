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
import { useGeolocated } from "react-geolocated";
import { Autocomplete, Libraries, useLoadScript } from "@react-google-maps/api";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
const libraries = ["places"] as Libraries;
export default function OnboardingForm() {
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: true,
      },
      userDecisionTimeout: 5000,
    });

  const router = useRouter();
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
      name: "",
      number: "",
      latitude: 0,
      longitude: 0,
    },
  });

  const { mutate, isLoading, error } = trpc.createAgent.useMutation();

  if (error) {
    toast.error(error.message);
  }
  useEffect(() => {
    if (isGeolocationAvailable) {
      const geoLocation = {
        latitude: coords?.latitude,
        longitude: coords?.longitude,
      };
      form.setValue("latitude", geoLocation.latitude);
      form.setValue("longitude", geoLocation.longitude);
    }
  }, [coords, isGeolocationAvailable]);

  function onLoad(autocomplete: google.maps.places.Autocomplete) {
    setSearchResult(autocomplete);
  }

  function locationSelected() {
    if (searchResult) {
      const place = searchResult.getPlace();
      const geoLatitude = place.geometry?.location?.lat();
      const geoLongitude = place.geometry?.location?.lng();
      if (!isGeolocationAvailable || !isGeolocationEnabled) {
        form.setValue("latitude", geoLatitude);
        form.setValue("longitude", geoLongitude);
      }
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
      router.push("onboard/success");
      toast.success("Agent created successfully");
    } catch (error) {
      console.log(error);
      toast.error("Error creating agent");
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
}
