import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import React from "react";

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
            <Link href={`/pharmacy/${agentId}`}>View</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href={`/pharmacy/${agentId}/edit`}>Edit</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href={`/pharmacy/${agentId}/delete`}>Delete</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default AgentDropdown;
