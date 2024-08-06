"use client";
import React from "react";
import Link from "next/link";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
const Sidebar = () => {
  const pathName = usePathname();

  const isActive = (field: string) => {
    return pathName === `/dashboard/${field}`
      ? "bg-neutral-800 font-bold text-white hover:text-neutral-100/70"
      : "";
  };
  const cols = [
    { field: "agents", value: "agents" },
    { field: "transactions", value: "transactions" },
    { field: "settings", value: "settings" },
    { field: "pharmacies", value: "pharmacies" },
    { field: "maps", value: "maps" },
  ];

  return (
    <div className="col-span-3 space-y-2 flex flex-col pe-4">
      {cols.map((col) => {
        return (
          <Link
            key={col.field}
            href={`/dashboard/${col.field}`}
            className={cn(
              "font-semibold capitalize w-full text-start hover:text-neutral-500/70 px-4 py-2 rounded-lg",
              isActive(col.field)
            )}
          >
            {col.value}
          </Link>
        );
      })}
    </div>
  );
};

export default Sidebar;
