"use client"; // Import this to use the client-side component

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { TransactionStatus } from "@prisma/client"; // Importing the enum from Prisma
import { updateTransactionStatus } from "./actions";
import { toast } from "sonner";

interface TransactionStatusDropdownProps {
  amount: number;
  transactionId: string;
  currentStatus: TransactionStatus;
  agentId: string;
  isPaid: boolean;
}

const TransactionStatusDropdown: React.FC<TransactionStatusDropdownProps> = ({
  isPaid,
  transactionId,
  currentStatus,
}) => {
  const router = useRouter();

  const handleStatusChange = async (value: string) => {
    const newStatus = value as TransactionStatus;
    const res = await updateTransactionStatus(transactionId, newStatus);
    if (res.success) {
      router.refresh(); // Refresh the page or data to reflect changes
      toast.success(res.message);
    }
  };

  const getButtonVariant = (status: TransactionStatus) => {
    if (status === TransactionStatus.PENDING) {
      return "outline";
    } else if (status === TransactionStatus.SCHEDULED) {
      return "secondary";
    } else if (status === TransactionStatus.FAILED) {
      return "destructive";
    } else if (status === TransactionStatus.PROVIDED) {
      return "default";
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={getButtonVariant(currentStatus)}>
          <span>
            {currentStatus === TransactionStatus.PROVIDED && isPaid === false
              ? "Payment pending"
              : currentStatus}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Transaction Status</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={currentStatus}
          onValueChange={handleStatusChange}
        >
          <DropdownMenuRadioItem value={TransactionStatus.PENDING}>
            Pending
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value={TransactionStatus.SCHEDULED}>
            Scheduled
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value={TransactionStatus.FAILED}>
            Failed
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value={TransactionStatus.PROVIDED}>
            Provided
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TransactionStatusDropdown;
