import Image from "next/image";
import React from "react";
import FadeInWhenVisible from "./Fade";

const PeoplePrimary = () => {
  return (
    <FadeInWhenVisible>
      <div className="relative  h-[300px] md:w-full overflow-hidden rounded-3xl w-[80%] mx-auto">
        <Image
          src="https://scontent.whatsapp.net/v/t39.8562-34/315574582_669241857978207_6336028129238262344_n.png?ccb=1-7&_nc_sid=73b08c&_nc_ohc=fndDdPaKvJIQ7kNvgGbDMTB&_nc_ht=scontent.whatsapp.net&oh=01_Q5AaIMX6oMCCz6Jz-YVbWlNDS8F_H0MJDjBvT4BTu4HMsGCP&oe=66BF68CC"
          className="object-cover md:object-contain hidden md:block"
          alt="hero"
          fill
        />
        <Image
          src="https://scontent.whatsapp.net/v/t39.8562-34/316527053_519225873581614_3866221552589773492_n.png?ccb=1-7&_nc_sid=73b08c&_nc_ohc=SgCzgnBXYcUQ7kNvgHYPsQm&_nc_ht=scontent.whatsapp.net&oh=01_Q5AaIKbSy-WwNrMQu7QU02eg5LY_q2m9zTDxL3p7njyGGU7N&oe=66BF830B"
          className="object-contain md:hidden"
          alt="hero"
          fill
        />
      </div>
    </FadeInWhenVisible>
  );
};

export default PeoplePrimary;
