"use client";

import React from "react";
import { useQRCode } from "next-qrcode";

function PharmacyQR({ link }: { link: string }) {
  const { Image } = useQRCode();

  return (
    <Image
      text={link}
      options={{
        type: "image/jpeg ",
        quality: 0.3,
        errorCorrectionLevel: "M",
        margin: 3,
        scale: 2,
        width: 500,
        color: {
          dark: "#333",
          light: "#fff",
        },
      }}
    />
  );
}

export default PharmacyQR;
