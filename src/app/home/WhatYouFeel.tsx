import React from "react";
import RevealingText from "./Fade";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import FadeInWhenVisible from "./Fade";
import Image from "next/image";

const WhatYouFeel = () => {
  return (
    <section className="container py-16 grid grid-cols-1 gap-4 md:grid-cols-2 px-4 md:px-12 md:h-[800px]">
      <FadeInWhenVisible className="md:order-2">
        <div className="flex flex-col justify-center h-full gap-4 py-16">
          <p className="text-left md:text-6xl text-3xl font-light">
            Say what you feel
          </p>
          <p>
            Express yourself without words. Use stickers and GIFs or share
            everyday moments on Status. Record a voice message for a quick hello
            or a longer story.
          </p>
          <Link href="#" className="border-b border-black w-fit">
            Learn more <span>→</span>
          </Link>
        </div>
      </FadeInWhenVisible>
      <FadeInWhenVisible className="md:order-1">
        <div className="relative w-full md:h-full h-[500px] max-w-sm mx-auto">
          <Image
            src="https://scontent.whatsapp.net/v/t39.8562-34/317083769_795673198165216_6941067459072265627_n.png?ccb=1-7&_nc_sid=73b08c&_nc_ohc=0Q8QpNzb9RsQ7kNvgHqtBTI&_nc_ht=scontent.whatsapp.net&oh=01_Q5AaIFWgCXIlTcJNEAp7yzyFdvNAuXHVShUcWmgGt3KXRi8N&oe=66BFD26E"
            alt="image"
            fill
            className="object-contain w-full h-full"
          />
          <Image
            src="https://scontent.whatsapp.net/v/t39.8562-34/312201775_3436222206622878_5992065132121718104_n.png?ccb=1-7&_nc_sid=73b08c&_nc_ohc=CNr6rLysNLsQ7kNvgHSXXIx&_nc_ht=scontent.whatsapp.net&oh=01_Q5AaIEFfhPucn7zOKjSY1Z7P2DZuTZsGniGZv6e_u6lYSXBe&oe=66BFC756"
            alt="image"
            fill
            className="object-contain w-full h-full"
          />
        </div>
      </FadeInWhenVisible>
    </section>
  );
};

export default WhatYouFeel;
