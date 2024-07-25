"use client";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const DATA = [
  { title: "Add Pharmacy", link: "/pharmacy/add" },
  { title: "Dashboard", link: "/pharmacy/dashboard" },
];

const PharmacyNav = () => {
  const pathName = usePathname();

  console.log(pathName);
  return (
    <div className="flex items-center justify-between py-2">
      <div className="relative w-[100px] h-[50px]">
        <Image alt="inkam-logo" className="object-cover" fill src="/logo.png" />
      </div>
      <div className="space-x-2">
        {DATA.map(function (d) {
          return (
            <Link
              className={buttonVariants({
                variant: pathName === d.link ? "default" : "secondary",
              })}
              href={d.link}
            >
              {d.title}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default PharmacyNav;
