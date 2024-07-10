import React from "react";
import OnboardingForm from "./OnboardingForm";
import Image from "next/image";
import { connectDB } from "@/db/connection";
// connectDB();
const page = () => {
  return (
    <div className="flex flex-col gap-4 h-[100svh] justify-center items-center">
      <div className="relative w-full h-[80px] sm:w-[400px]">
        <Image src="/logo.png" className="object-cover" alt="logo" fill />
      </div>
      <OnboardingForm />
    </div>
  );
};

export default page;
