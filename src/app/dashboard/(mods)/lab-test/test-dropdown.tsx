"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import React from "react";
import { deleteLabTest } from "./actions";
import { toast } from "sonner";

const deleteAgentHandler = async (testId: string) => {
  const response = await deleteLabTest(testId);
  if (response.success) {
    toast.success(response.message);
  } else {
    toast.error(response.message);
  }
};

const AgentDropdown = ({ testId }: { testId: string }) => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-full">
            Actions
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <Button onClick={() => deleteAgentHandler(testId)} variant="ghost">
              Delete
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default AgentDropdown;
