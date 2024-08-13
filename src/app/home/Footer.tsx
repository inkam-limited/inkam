import { DownloadIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

const footerData = [
  {
    name: "What we do",
    sub: [
      { name: "Features", href: "#" },
      { name: "Blog", href: "#" },
      { name: "Security", href: "#" },
      { name: "For Business", href: "#" },
    ],
  },
  {
    name: "Who we are",
    sub: [
      { name: "About us", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Brand Center", href: "#" },
      { name: "Privacy", href: "#" },
    ],
  },
  {
    name: "Use WhatsApp",
    sub: [
      { name: "Android", href: "#" },
      { name: "iPhone", href: "#" },
      { name: "Mac/PC", href: "#" },
      { name: "WhatsApp Web", href: "#" },
    ],
  },
  {
    name: "Need help?",
    sub: [
      { name: "Contact Us", href: "#" },
      { name: "Help Center", href: "#" },
      { name: "Download", href: "#" },
      { name: "Security Advisories", href: "#" },
    ],
  },
];

const Footer = () => {
  return (
    <div className="bg-[#111B21] py-12">
      <div className="container mx-auto grid">
        <button className="bg-green-300 border w-fit border-black p-1 md:p-4 md:flex rounded-full">
          <span className="hidden md:block">Download</span>
          <DownloadIcon className="md:ml-2" />
        </button>
        <div className="relative">
          <Image
            fill
            alt="footer-logo"
            src="https://static.whatsapp.net/rsrc.php/ya/r/GjxmhIpug9B.svg"
          />
        </div>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 mt-4">
          {footerData.map((item, index) => (
            <div key={index}>
              <p className="text-white/90 text-sm md:text-base">{item.name}</p>
              <ul className="flex flex-col gap-2 md:gap-4 pt-4">
                {item.sub.map((sub, index) => (
                  <li key={index}>
                    <a className="text-white" href={sub.href}>
                      {sub.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;
