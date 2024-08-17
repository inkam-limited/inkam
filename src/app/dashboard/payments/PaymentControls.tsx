"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { createInvoice } from "./actions";
import { useRouter } from "next/navigation";

const PaymentControls = ({}) => {
  const router = useRouter();
  return (
    <div className="border rounded-md p-4">
      <Button
        onClick={() => {
          createInvoice();
          router.refresh();
        }}
      >
        Create Invoice
      </Button>
    </div>
  );
};

export default PaymentControls;
