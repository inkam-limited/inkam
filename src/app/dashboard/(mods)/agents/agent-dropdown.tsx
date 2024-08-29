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
import { deleteAgent } from "./actions";
import { toast } from "sonner";

const deleteAgentHandler = async (agentId: string) => {
  const response = await deleteAgent(agentId);
  if (response.success) {
    toast.success(response.message);
  } else {
    toast.error(response.message);
  }
};

const AgentDropdown = ({ agentId }: { agentId: string }) => {
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
            <Link
              className={buttonVariants({ variant: "ghost" })}
              href={`/pharmacy/${agentId}`}
            >
              View
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              className={buttonVariants({ variant: "ghost" })}
              href={`/pharmacy/${agentId}/edit`}
            >
              Edit
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Button onClick={() => deleteAgentHandler(agentId)} variant="ghost">
              Delete
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default AgentDropdown;
