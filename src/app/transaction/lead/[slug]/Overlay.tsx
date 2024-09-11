import { Card } from "@/components/ui/card";
import React from "react";
import { IoBagCheckOutline } from "react-icons/io5";
import { BiInjection } from "react-icons/bi";
import { CiMedicalClipboard } from "react-icons/ci";
import { Button } from "@/components/ui/button";

const steps = [
  {
    step: "Step 01:",
    name: "Order tests",
    sub: "Book tests & checkups",
    icon: <IoBagCheckOutline />,
  },
  {
    step: "Step 02:",
    name: "Provide Sample",
    sub: "From your doorstep",
    icon: <BiInjection />,
  },
  {
    step: "Step 03:",
    name: "Get Report",
    sub: "Your report delivered",
    icon: <CiMedicalClipboard />,
  },
];

const Overlay = ({
  setNoticeOpen,
}: {
  setNoticeOpen: (open: boolean) => void;
}) => {
  return (
    <div className="absolute inset-0 h-full w-full bg-gradient-to-br from-gray-900/40 to-gray-800/40 via-blue-700/30 backdrop-blur-xl z-50">
      <div className="flex gap-4 flex-col items-center justify-center h-full w-full">
        <div className="max-w-lg px-4 space-y-8">
          {steps.map((step, i) => {
            return (
              <div className="flex flex-col" key={i}>
                <div className="flex items-center">
                  <span className="text-3xl mr-2">{step.icon}</span>
                  <div>
                    <h3 className="text-xl font-semibold">
                      {step.step} <span>{step.name}</span>
                    </h3>
                    <span>{step.sub}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <Button
          onClick={() => setNoticeOpen(false)}
          size="lg"
          className="mt-6 uppercase"
          variant="outline"
        >
          I understand
        </Button>
      </div>
    </div>
  );
};

export default Overlay;
