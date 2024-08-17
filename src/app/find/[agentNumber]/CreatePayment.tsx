"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { generatePayment } from "./actions";
const CreatePayment = ({ agentId }: { agentId: string }) => {
  const [loading, setLoading] = React.useState(false);
  const handleClick = () => {
    setLoading(true);
    generatePayment({ agentId });
  };

  return (
    <Button onClick={handleClick} className="w-full h-full">
      Create Payment
    </Button>
  );
};

export default CreatePayment;
