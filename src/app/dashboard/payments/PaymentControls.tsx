"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { createInvoice } from "./actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const PaymentControls = ({}) => {
  const router = useRouter();
  return (
    <div className="border rounded-md p-4">
      <Button
        className="w-full"
        onClick={() => {
          createInvoice().then((res) => {
            if (res.success) {
              toast.success(res.message);
              router.refresh();
            } else {
              toast.error(res.message);
            }
          });
        }}
      >
        Create Invoice
      </Button>
    </div>
  );
};

export default PaymentControls;
