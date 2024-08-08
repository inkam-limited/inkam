import React, { Suspense } from "react";
import OnboardingForm from "./OnboardingForm";
import Image from "next/image";
import { Button } from "@/components/ui/button";
const page = () => {
  return (
    <div>
      <div className="flex px-4 flex-col gap-6 h-[100svh] justify-center items-center">
        <div className="relative h-[80px] w-[300px]">
          <Image src="/logo.png" className="object-cover" alt="logo" fill />
        </div>
        <h1 className="text-xl font-bold">Lets get started..</h1>
        <OnboardingForm />
      </div>
    </div>
  );
};

export default page;
