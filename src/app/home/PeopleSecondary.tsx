import Image from "next/image";
import React from "react";
import FadeInWhenVisible from "./Fade";

const PeopleSecondary = () => {
  return (
    <FadeInWhenVisible>
      <div className="relative  h-[300px] md:w-full overflow-hidden rounded-3xl w-[80%] mx-auto">
        <Image
          src="https://scontent.whatsapp.net/v/t39.8562-34/315632381_5616928641708856_9210500231334849736_n.png?ccb=1-7&_nc_sid=73b08c&_nc_ohc=dVKz6bIcZegQ7kNvgHYx4Sv&_nc_ht=scontent.whatsapp.net&oh=01_Q5AaIJA_NPhFnajWyrOFZvNapTnqzqMMX5fFAzcBBMrpZxzk&oe=66BF7ECD"
          className="object-cover md:object-contain hidden md:block"
          alt="hero"
          fill
        />
        <Image
          src="https://scontent.whatsapp.net/v/t39.8562-34/316548958_5436561303122573_4246709535004834509_n.png?ccb=1-7&_nc_sid=73b08c&_nc_ohc=iPRxoxUC46QQ7kNvgFUjk9M&_nc_ht=scontent.whatsapp.net&oh=01_Q5AaILIMtxcz2_7FvGEeiRtZShuw30UJIDM1i6D366XyKPX-&oe=66BF5977"
          className="object-contain md:hidden"
          alt="hero"
          fill
        />
      </div>
    </FadeInWhenVisible>
  );
};

export default PeopleSecondary;
