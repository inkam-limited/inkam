"use client";
import { useEffect, useRef, useState } from "react";
import { QRCodeCanvas } from "qrcode.react"; // Another QR Code library using canvas
import { toPng } from "html-to-image";
import { saveAs } from "file-saver";
import { Button } from "@/components/ui/button";

export default function PharmacyQR({
  link,
  name,
  number,
}: {
  link: string;
  name: string;
  number: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const qrRef = useRef<HTMLDivElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Function to draw the QR code on the background image using canvas
  const drawOnCanvas = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.src = "/qr-template.jpg";
    img.onload = async () => {
      // Set the canvas size to the size of the background image
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw the background image
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Convert the QR code to an image
      if (!qrRef.current) return;
      const qrDataUrl = await toPng(qrRef.current, { quality: 1.0 });

      if (!qrDataUrl) return;
      const qrImg = new Image();
      qrImg.src = qrDataUrl;
      qrImg.onload = () => {
        // Draw the QR code on the canvas (centered in the white square)
        const qrSize = 250; // Size of the QR code
        const centerX = canvas.width / 2 - qrSize / 2;
        const centerY = canvas.height / 2 - qrSize / 2;
        ctx.drawImage(qrImg, centerX, centerY, qrSize, qrSize);

        setIsProcessing(false); // Set processing state to false
      };
    };
  };

  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.toBlob((blob) => {
        if (blob) {
          saveAs(blob, `${name}-${number}.png`);
        }
      });
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div ref={qrRef}>
        <QRCodeCanvas
          value={link}
          size={250}
          bgColor="#ffffff"
          fgColor="#2596be"
          level="H"
        />
      </div>

      <canvas ref={canvasRef} className="mt-4"></canvas>

      <Button
        className="w-full mt-4"
        onClick={() => {
          setIsProcessing(true);
          drawOnCanvas();
        }}
        disabled={isProcessing}
      >
        Generate QR on Template
      </Button>

      <Button
        className="w-full mt-4"
        onClick={downloadImage}
        disabled={isProcessing}
      >
        Download Processed Image
      </Button>
    </div>
  );
}
