"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { QRCode } from "react-qrcode-logo";

function PharmacyQR({
  link,
  name,
  number,
}: {
  link: string;
  name: string;
  number: string;
}) {
  const [downloaded, setDownloaded] = useState(false);
  const ref = useRef<QRCode | null>(null);

  const download = () => {
    if (ref.current) {
      ref.current.download("png", `${name}-${number}.png`);
    }
  };

  return (
    <div className="flex h-36  items-center justify-center">
      <QRCode
        style={{ width: "100%", height: "100%", objectFit: "contain" }}
        logoImage="/amarlab-logo.png"
        value={link}
        size={500}
        ecLevel="H"
        bgColor="#ffffff"
        fgColor="#2596be"
        logoHeight={100}
        logoWidth={100}
        qrStyle="dots"
        enableCORS={true}
        ref={ref}
      />
      <Button className="w-full mt-4" disabled={downloaded} onClick={download}>
        Download QR Code
      </Button>
    </div>
  );
}

export default PharmacyQR;
