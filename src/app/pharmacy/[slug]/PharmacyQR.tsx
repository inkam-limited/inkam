"use client";
import { Button } from "@/components/ui/button";
import { LegacyRef, RefObject, useRef } from "react";
import { QRCode } from "react-qrcode-logo";

function PharmacyQR({ link }: { link: string }) {
  const ref = useRef<QRCode | null>(null);

  const download = () => {
    if (ref.current) {
      ref.current.download("png", "pharmacy-qr.png");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <QRCode
        style={{ width: "100%", height: "100%" }}
        logoImage="/amarlab-logo.png"
        value={link}
        size={500}
        ecLevel="H"
        bgColor="#ffffff"
        fgColor="#2596be"
        logoHeight={200}
        logoWidth={200}
        qrStyle="dots"
        enableCORS={true}
        ref={ref}
      />
      <Button className="w-full mt-4" onClick={download}>
        Download QR Code
      </Button>
    </div>
  );
}

export default PharmacyQR;
