"use client";
import { buttonVariants } from "@/components/ui/button";
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

const DATA = [{ title: "Pharmacy Dashboard", link: "/pharmacy/dashboard" }];

const DashboardNavbar = ({ user }: { user: KindeUser | null }) => {
  const pathName = usePathname();

  return (
    <div className="flex border-b border-gray-200 items-center justify-between py-2">
      <div className="relative w-[100px] h-[50px]">
        <Image alt="inkam-logo" className="object-cover" fill src="/logo.png" />
      </div>
      <div className="space-x-2 flex items-center">
        {DATA.map(function (d) {
          return (
            <Link
              key={d.title}
              className={buttonVariants({
                variant: pathName === d.link ? "default" : "secondary",
              })}
              href={d.link}
            >
              {d.title}
            </Link>
          );
        })}
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
