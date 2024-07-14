import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";

const DashboardHeader = ({ user }: { user: KindeUser }) => {
  return (
    <div className="flex items-center justify-between p-4 sticky bg-neutral-50 border-b border-neutral-200">
      <h1>Dashboard</h1>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <p>{user.email}</p>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogoutLink>Logout</LogoutLink>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default DashboardHeader;
