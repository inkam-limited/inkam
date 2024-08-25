"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { createInvoice } from "./actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";

const PaymentControls = ({}) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    setLoading(true);
    createInvoice().then((res) => {
      if (res.success) {
        toast.success(res.message);
        router.refresh();
      } else {
        setLoading(false);
        toast.error(res.message);
      }
    });
  };

  return (
    <div className="border rounded-md p-4">
      {loading ? (
        <Button className="w-full" disabled>
          <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />
          Creating Invoice...
        </Button>
      ) : (
        <Button className="w-full" onClick={handleClick}>
          Create Invoice
        </Button>
      )}
    </div>
  );
};

export default PaymentControls;
