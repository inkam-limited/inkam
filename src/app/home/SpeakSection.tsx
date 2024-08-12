import React from "react";
import RevealingText from "./Fade";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import FadeInWhenVisible from "./Fade";
import Image from "next/image";

const SpeakSection = () => {
  return (
    <section className=" bg-[#111B21]">
      <div className="container py-16 grid grid-cols-1 gap-16 md:grid-cols-2 px-4 md:px-12 md:h-[800px] text-white">
        <FadeInWhenVisible className="order-2 md:order-1">
          <div className="relative w-full md:h-full h-[500px] ">
            <Image
              src="https://scontent.whatsapp.net/v/t39.8562-34/316036583_870096634427722_4468595013887544943_n.png?ccb=1-7&_nc_sid=73b08c&_nc_ohc=a44WYroS_aAQ7kNvgHtftin&_nc_ht=scontent.whatsapp.net&oh=01_Q5AaIHysv3Tf4wsOr6AaiZqMqtrn5W6qJqWSXFUwQtNHAwj7&oe=66BF6671"
              alt="image"
              fill
              className="object-contain w-full h-full"
            />
          </div>
        </FadeInWhenVisible>
        <FadeInWhenVisible className="order-1 md:order-2">
          <div className="flex flex-col gap-4 py-16 justify-center h-full">
            <p className="text-left md:text-6xl text-3xl font-light">
              Speak <br /> <span className="text-green-500">freely</span>
            </p>
            <p>
              With end-to-end encryption, your personal messages and calls are
              secured. Only you and the person you're talking to can read or
              listen to them, and nobody in between, not even WhatsApp.
            </p>
            <Link href="#" className="border-b border-green-500 w-fit">
              Learn more <span>→</span>
            </Link>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
};

export default SpeakSection;
