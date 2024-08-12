import { Button } from "@/components/ui/button";
import { DownloadIcon, MenuIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

const data = [
  { name: "Features", href: "#" },
  { name: "Help Center", href: "#" },
  { name: "Blog", href: "#" },
  { name: "For Business", href: "#" },
  { name: "Download", href: "#" },
];

const NavBar = () => {
  return (
    <div className="container md:py-4 sticky top-0 z-50 bg-green-100/50 backdrop-blur-md">
      <div className="flex justify-between items-center py-4 mx-auto h-[58px]">
        <div className="block md:hidden">
          <MenuIcon />
        </div>
        <div className="shrink-0 size-24 md:size-32 relative">
          <Image
            src="https://static.whatsapp.net/rsrc.php/yZ/r/JvsnINJ2CZv.svg"
            fill
            alt="logo"
          />
        </div>
        <div className=" hidden md:flex  gap-4">
          {data.map((item, index) => (
            <div key={index}>
              <a className="p-2" href={item.href}>
                {item.name}
              </a>
            </div>
          ))}
        </div>
        <button className="bg-green-300 border border-black p-1 md:p-4 md:flex rounded-full">
          <span className="hidden md:block">Download</span>
          <DownloadIcon className="md:ml-2" />
        </button>
      </div>
    </div>
  );
};

export default NavBar;
