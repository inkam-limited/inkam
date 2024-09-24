"use server";
import { Resend } from "resend";
import DiagnosticConfirmationEmail from "./email";
import InvoiceEmail from "./InvoiceEmail";
import { Invoice } from "@prisma/client";
import { AgentTransactionSummary } from "@/app/dashboard/(mods)/invoices/[invoiceId]/InvoiceBody";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendMail = async ({
  patientName,
  patientNumber,
  testName,
  address,
}: {
  patientName: string;
  patientNumber: string;
  testName: string;
  address: string;
}) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "Inkam Labs <orders@labs.inkam.app>",
      to: [
        "inkamlimited@gmail.com",
        "nibir@inkam.app",
        "khalid@inkam.app",
        "tofael@inkam.app",
        "orders@amarlab.com",
        "nazmul.islam@inkam.app",
      ],
      subject: "Order placement",
      react: DiagnosticConfirmationEmail({
        patientName,
        patientNumber,
        testName,
        address,
      }) as React.ReactElement,
    });
    if (error) {
      console.error(error);
    } else {
      console.log(data);
    }
  } catch (error) {
    console.error(error);
  }
};

export const sendInvoice = async ({ invoice }: { invoice: Invoice }) => {
  const agentData = invoice?.data as AgentTransactionSummary[];

  try {
    const { data, error } = await resend.emails.send({
      from: "Inkam Labs <orders@labs.inkam.app>",
      to: [
        "inkamlimited@gmail.com",
        "nibir@inkam.app",
        "khalid@inkam.app",
        "tofael@inkam.app",
        "orders@amarlab.com",
      ],
      subject: "Payment Confirmation",
      react: InvoiceEmail({
        invoice,
        agentData,
      }) as React.ReactElement,
    });
    if (error) {
      console.error(error);
    } else {
      console.log(data);
    }
  } catch (error) {
    console.error(error);
  }
};
