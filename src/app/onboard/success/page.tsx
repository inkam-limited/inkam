import Image from "next/image";
import React from "react";
import TelegramButton from "./TelegramButton";

const SuccessPage = () => {
  return (
    <div className="flex h-[100svh] items-center justify-center gap-4 px-2 py-4 text-neutral-900 ">
      <TelegramButton />
    </div>
  );
};

export default SuccessPage;
