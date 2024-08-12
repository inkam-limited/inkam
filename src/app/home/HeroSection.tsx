import { DownloadIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

const HeroSection = () => {
  return (
    <>
      <div className="container mx-auto">
        <div className="py-8">
          <div className="relative grid h-[700px] w-full overflow-hidden rounded-3xl">
            <Image
              src="https://scontent.whatsapp.net/v/t39.8562-34/316546300_547692113846445_7299710494491288098_n.png?ccb=1-7&_nc_sid=73b08c&_nc_ohc=_mUQfzIHhNkQ7kNvgErURLy&_nc_ht=scontent.whatsapp.net&oh=01_Q5AaIC2kRBW5Y1OximIcoPIrmWsaFgN_SBfxr7I7lYHnJ_Bt&oe=66BF6A25"
              className="object-cover"
              alt="hero"
              fill
            />
            <div className="z-10 flex flex-col gap-6 p-8 place-content-end pb-24 text-white">
              <h1 className="text-4xl font-bold">Message Privately</h1>
              <p className="text-lg max-w-xl">
                Simple, reliable, private messaging and calling for free*,
                available all over the world.
              </p>
              <button className="bg-green-400 mt-8 border text-black border-black w-fit p-4 flex rounded-full">
                Download
                <DownloadIcon className="ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
