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
  TestTube,
  User2Icon,
} from "lucide-react";
import { Role, User } from "@prisma/client";

interface SidebarProps {
  dbUser: User | null;
}

interface SidebarItem {
  field: string;
  value: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  roles: Role[];
}

const Sidebar: React.FC<SidebarProps> = ({ dbUser }) => {
  const pathName = usePathname();

  const isActive = (field: string) =>
    pathName === `/dashboard/${field}`
      ? "bg-neutral-800 font-bold text-white hover:text-neutral-100/70"
      : "";

  const sidebarItems: SidebarItem[] = [
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
      field: "lab-test",
      value: "lab test",
      icon: TestTube,
      roles: [Role.MODERATOR, Role.ADMIN],
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
    <div className="md:col-span-3 space-y-2 grid grid-cols-3 md:flex md:flex-col md:pe-4">
      {sidebarItems.map((item) => {
        if (!dbUser || !item.roles.includes(dbUser.role)) {
          return null;
        }

        return (
          <Link
            key={item.field}
            href={`/dashboard/${item.field}`}
            className={cn(
              "font-semibold capitalize flex items-center w-full text-start hover:text-neutral-500/70 px-4 py-2 rounded-lg gap-2",
              isActive(item.field)
            )}
          >
            <item.icon className="w-5 h-5 shrink-0" />
            <span>{item.value}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default Sidebar;
