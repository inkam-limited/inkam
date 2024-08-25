"use server";

import prisma from "@/db";
export type SalesData = {
  date: Date;
  totalSales: string;
  transactionCount: number;
};

export async function getDailySales() {
  const salesData: SalesData[] = await prisma.$queryRaw`
    SELECT 
      DATE("createdAt") as "date",
      SUM("amount") as "totalSales",
      COUNT("transactionId") as "transactionCount"
    FROM "Transaction"
    GROUP BY DATE("createdAt")
    ORDER BY DATE("createdAt") ASC;
  `;

  const formattedData = salesData.map((data) => ({
    date: data.date.toISOString().split("T")[0],
    sales: parseFloat(data.totalSales),
    transactionCount: Number(data.transactionCount), // Convert BigInt to Number
  }));

  return formattedData;
}
export const getLabTest = async (id: string) => {
  const labTest = await prisma.labTest.findFirst({
    where: {
      testId: id,
    },
  });
  return labTest;
};
