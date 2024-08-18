"use client";
import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import {
  Coins,
  Gem,
  HomeIcon,
  MapIcon,
  MemoryStickIcon,
  Settings,
  StoreIcon,
  User2Icon,
} from "lucide-react";
import { Role, User } from "@prisma/client";

const Sidebar = ({ dbUser }: { dbUser: User | null }) => {
  const pathName = usePathname();

  const isActive = (field: string) => {
    return pathName === `/dashboard/${field}`
      ? "bg-neutral-800 font-bold text-white hover:text-neutral-100/70"
      : "";
  };

  const cols = [
    {
      field: "",
      value: "Home",
      icon: HomeIcon,
      roles: [Role.MODERATOR, Role.ADMIN, Role.PARTNER],
    },
    {
      field: "agents",
      value: "Agents",
      icon: User2Icon,
      roles: [Role.MODERATOR, Role.ADMIN],
    },
    {
      field: "pharmacies",
      value: "Pharmacies",
      icon: StoreIcon,
      roles: [Role.MODERATOR, Role.ADMIN, Role.PARTNER],
    },
    {
      field: "transactions",
      value: "Transactions",
      icon: Gem,
      roles: [Role.MODERATOR, Role.ADMIN, Role.PARTNER],
    },
    {
      field: "maps",
      value: "Maps",
      icon: MapIcon,
      roles: [Role.MODERATOR, Role.ADMIN, Role.PARTNER],
    },
    {
      field: "settings",
      value: "Settings",
      icon: Settings,
      roles: [Role.MODERATOR, Role.ADMIN],
    },
    {
      field: "payments",
      value: "Payments",
      icon: Coins,
      roles: [Role.MODERATOR, Role.ADMIN, Role.PARTNER],
    },
    {
      field: "invoices",
      value: "Invoices",
      icon: MemoryStickIcon,
      roles: [Role.MODERATOR, Role.ADMIN],
    },
  ];

  return (
    <div className="col-span-3 space-y-2 flex flex-col pe-4">
      {cols.map((col) => {
        if (!dbUser || !col.roles.includes(dbUser.role)) {
          return null;
        }
        return (
          <Link
            key={col.field}
            href={`/dashboard/${col.field}`}
            className={cn(
              "font-semibold capitalize flex items-center w-full text-start hover:text-neutral-500/70 px-4 py-2 rounded-lg gap-2",
              isActive(col.field)
            )}
          >
            <col.icon /> <span>{col.value}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default Sidebar;
