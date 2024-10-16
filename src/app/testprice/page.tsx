import prisma from "@/db";
import React from "react";
import LabTestPriceTable from "./test-price-table";

const TestPricePage = async () => {
  const labTest = await prisma.labTest.findMany({
    select: {
      commission: true,
      price: true,
      name: true,
    },
  });

  return (
    <div>
      <LabTestPriceTable data={labTest} />
    </div>
  );
};

export default TestPricePage;
