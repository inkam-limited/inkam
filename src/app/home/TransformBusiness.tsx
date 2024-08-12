import React from "react";
import RevealingText from "./Fade";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import FadeInWhenVisible from "./Fade";
import Image from "next/image";

const TransformBusiness = () => {
  return (
    <section className="container py-16 grid grid-cols-1 gap-4 md:grid-cols-2 px-4 md:px-12 md:h-[800px]">
      <FadeInWhenVisible>
        <div className="flex flex-col justify-center h-full gap-4 py-16">
          <p className="text-left md:text-6xl text-3xl font-light">
            Transform your business
          </p>
          <p>
            WhatsApp Business helps you reach your customers globally to deliver
            compelling experiences at scale. Showcase your products and
            services, increase sales, and build relationships all with WhatsApp.
          </p>
          <Link href="#" className="border-b border-black w-fit">
            Learn more <span>→</span>
          </Link>
        </div>
      </FadeInWhenVisible>
      <FadeInWhenVisible>
        <div className="relative w-full md:h-full h-[500px] max-w-sm mx-auto">
          <Image
            src="https://scontent.whatsapp.net/v/t39.8562-34/318710741_2062713840591076_973067294545082880_n.png?ccb=1-7&_nc_sid=73b08c&_nc_ohc=-2J01E1y67oQ7kNvgFSRKgA&_nc_ht=scontent.whatsapp.net&oh=01_Q5AaIEDC8zEwWmvKZfg7zzaR4P6PweZ546n2QIJRgK8US-rd&oe=66BFB26F"
            alt="image"
            fill
            className="object-contain w-full h-full"
          />
        </div>
      </FadeInWhenVisible>
    </section>
  );
};

export default TransformBusiness;
