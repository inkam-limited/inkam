"use server";

import prisma from "@/db";
import { createAgentSchema } from "@/lib/schema";
import { z } from "zod";
import sharp from "sharp";

const editAgent = async (
  agentId: string,
  data: z.infer<typeof createAgentSchema>
) => {
  const agent = await prisma.agent.findUnique({
    where: {
      agentId: agentId,
    },
  });

  if (!agent) {
    throw new Error("Agent not found");
  }

  await prisma.agent.update({
    where: {
      agentId: agentId,
    },
    data: {
      name: data.name,
      number: data.number,
      ownerNumber: data.ownerNumber,
      managerName: data.managerName,
      address: data.address,
    },
  });
  return { success: true };
};

const processQRCode = async ({
  qrDataUrl,
  name,
  number,
}: {
  qrDataUrl: string;
  name: string;
  number: string;
}) => {
  const base64Data = qrDataUrl.replace(/^data:image\/png;base64,/, "");
  const qrBuffer = Buffer.from(base64Data, "base64");
  const background = sharp("./qr-template.jpg");
  // console.log(background);
  const qrResized = sharp(qrBuffer).resize(250, 250); //
  // const processedImage = await background
  //   .composite([{ input: await qrResized.toBuffer(), top: 275, left: 275 }]) // Adjust `top` and `left` for correct placement
  //   .toBuffer();
  // return processedImage;
  console.log(__dirname);
  // const outputFileName = `/public/processed/processed-${name}-${number}.png`;
  // return await sharp(processedImage).toFile(outputFileName);
};

export { editAgent, processQRCode };
