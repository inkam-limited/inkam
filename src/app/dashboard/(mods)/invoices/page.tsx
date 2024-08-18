import prisma from "@/db";
import InvoiceList from "./InvoiceList";

const page = async () => {
  const invoices = await prisma.invoice.findMany({
    where: {
      disbursed: false,
    },
  });

  return (
    <div>
      <h1>Invoices</h1>
      <InvoiceList invoices={invoices} />
    </div>
  );
};

export default page;
