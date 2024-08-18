"use client";

import { Invoice } from "@prisma/client";

const RenderedPdf = ({ invoice }: { invoice: Invoice }) => {
  return (
    <div>
      <h1>Invoice #{invoice.id}</h1>
      <p>Amount: {invoice.amount}</p>
      <p>Date: {invoice.createdAt.toDateString()}</p>
    </div>
  );
};
export default RenderedPdf;
