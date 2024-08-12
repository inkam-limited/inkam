import React from "react";
import RevealingText from "./Fade";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import FadeInWhenVisible from "./Fade";
import Image from "next/image";

const KeepInTouch = () => {
  return (
    <section className="container py-16 grid grid-cols-1 gap-4 md:grid-cols-2 px-4 md:px-12 md:h-[800px]">
      <FadeInWhenVisible>
        <div className="flex flex-col justify-center h-full gap-4 py-16">
          <p className="text-left md:text-6xl text-3xl font-light">
            Keep in touch with your groups
          </p>
          <p>
            Whether it's planning an outing with friends or simply staying on
            top of your family chats, group conversations should feel
            effortless.
          </p>
          <Link href="#" className="border-b border-black w-fit">
            Learn more <span>→</span>
          </Link>
        </div>
      </FadeInWhenVisible>
      <FadeInWhenVisible>
        <div className="relative w-full md:h-full h-[500px] max-w-sm mx-auto">
          <Image
            src="https://scontent.whatsapp.net/v/t39.8562-34/318716844_644367477472796_6799212725643495984_n.png?ccb=1-7&_nc_sid=73b08c&_nc_ohc=sRGkw1Z-WDAQ7kNvgGGMT8V&_nc_ht=scontent.whatsapp.net&oh=01_Q5AaIN-ECk31gM--_b-VVQ066N_IG1ar2GwMR6P5FjfcvYx7&oe=66BFB6E5"
            alt="image"
            fill
            className="object-contain w-full h-full"
          />
          <Image
            src="https://scontent.whatsapp.net/v/t39.8562-34/318759416_815630979518701_2490140615586319278_n.png?ccb=1-7&_nc_sid=73b08c&_nc_ohc=QRPPuxVGFugQ7kNvgGTRUee&_nc_ht=scontent.whatsapp.net&oh=01_Q5AaIP9DJ9T4zKkVZ7R2M-fMCNRjimkNLGa88R4Jd0nh1w1Y&oe=66BFC18D"
            alt="image"
            fill
            className="object-contain"
          />
        </div>
      </FadeInWhenVisible>
    </section>
  );
};

export default KeepInTouch;
