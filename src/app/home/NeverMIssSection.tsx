import React from "react";
import RevealingText from "./Fade";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import FadeInWhenVisible from "./Fade";
import Image from "next/image";

const NeverMIssSection = () => {
  return (
    <section className="container py-16 grid grid-cols-1 gap-4 md:grid-cols-2 px-4 md:px-12 md:h-[800px]">
      <FadeInWhenVisible>
        <div className="flex flex-col gap-4 py-16 justify-center h-full">
          <p className="text-left md:text-6xl text-3xl font-light">
            Never miss a moment with voice and video calls
          </p>
          <p>
            From a group call to classmates to a quick call with mom, feel like
            you’re in the same room with voice and video calls.
          </p>
          <Link href="#" className="border-b border-black w-fit">
            Learn more <span>→</span>
          </Link>
        </div>
      </FadeInWhenVisible>
      <FadeInWhenVisible>
        <div className="relative w-full md:h-full h-[500px]">
          <Image
            src="https://scontent.whatsapp.net/v/t39.8562-34/316211879_640016534274402_8272733547019635528_n.png?ccb=1-7&_nc_sid=73b08c&_nc_ohc=Nor4ZPIl50QQ7kNvgHKRYIb&_nc_ht=scontent.whatsapp.net&oh=01_Q5AaICF4zcRjxxNQfaZLPRkQzQENvQcfio4w6rpeXjhSA_0T&oe=66BF6E96"
            alt="image"
            fill
            className="object-contain w-full h-full"
          />
        </div>
      </FadeInWhenVisible>
    </section>
  );
};

export default NeverMIssSection;
