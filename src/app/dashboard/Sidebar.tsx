"use client";
import React from "react";
import Link from "next/link";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import {
  CurrencyIcon,
  MapIcon,
  Settings,
  StoreIcon,
  User2Icon,
} from "lucide-react";
const Sidebar = () => {
  const pathName = usePathname();

  const isActive = (field: string) => {
    return pathName === `/dashboard/${field}`
      ? "bg-neutral-800 font-bold text-white hover:text-neutral-100/70"
      : "";
  };
  const cols = [
    { field: "agents", value: "agents", icon: User2Icon },
    { field: "transactions", value: "transactions", icon: CurrencyIcon },
    { field: "settings", value: "settings", icon: Settings },
    { field: "pharmacies", value: "pharmacies", icon: StoreIcon },
    { field: "maps", value: "maps", icon: MapIcon },
  ];

  return (
    <div className="col-span-3 space-y-2 flex flex-col pe-4">
      {cols.map((col) => {
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
