import Image from "next/image";
import React from "react";

const SuccessPage = () => {
  return (
    <div>
      <Image src="/logo.png" className="object-cover" alt="logo" fill />
    </div>
  );
};

export default SuccessPage;
