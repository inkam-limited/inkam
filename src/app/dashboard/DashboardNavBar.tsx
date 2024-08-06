"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { LogIn } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const DashboardNavbar = ({ user }: { user: KindeUser | null }) => {
  const pathName = usePathname();

  return (
    <div className="flex border-b border-gray-200 items-center justify-between h-[4rem]">
      <Link href="/dashboard" className="relative w-[100px] h-[50px]">
        <Image alt="inkam-logo" className="object-cover" fill src="/logo.png" />
      </Link>
      <div className="space-x-2 flex items-center">
        {pathName === "/dashboard/pharmacies" && (
          <Link href="/dashboard/pharmacies/add">
            <Button variant="default">New Pharmacy</Button>
          </Link>
        )}
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none">
              {user.picture && (
                <Image
                  alt="user-picture"
                  width={30}
                  height={30}
                  className="rounded-full"
                  src={user.picture}
                />
              )}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <LogoutLink postLogoutRedirectURL="/">Logout</LogoutLink>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <LoginLink postLoginRedirectURL={pathName}>
            <LogIn />
          </LoginLink>
        )}
      </div>
    </div>
  );
};

export default DashboardNavbar;
