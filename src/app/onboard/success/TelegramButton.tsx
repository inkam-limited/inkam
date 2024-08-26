import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const TelegramButton = () => {
  return (
    <Link
      href="https://t.me/+Aye58XOcH8k3NzI9"
      className="grid grid-cols-1  gap-4 px-8 py-12 space-y-8 max-w-96 text-neutral-900 rounded-lg  border border-solid"
    >
      <div className="flex-1 dark:text-neutral-100">
        <h1 className="text-3xl font-bold">Success!</h1>
        <p className="text-lg">
          Join telegram group to get updates about inkam microworks
        </p>
      </div>
      <div className="h-full flex hover:bg-blue-500 hover:text-neutral-50 dark:hover:bg-neutral-700 dark:hover:text-neutral-100 transition-all border rounded-full border-solid items-center justify-between  w-full">
        <div className="relative  hover:text-neutral-50 transition-all  h-[100px] w-[100px]  shrink-0">
          <Image
            src="/telegram_logo.svg"
            className="object-contain"
            alt="logo"
            fill
          />
        </div>
        <p className="px-4 flex-1 text-center text-3xl font-bold dark:text-neutral-50 ">
          Join
        </p>
      </div>
    </Link>
  );
};

export default TelegramButton;
