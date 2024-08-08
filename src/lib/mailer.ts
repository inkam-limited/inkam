"use server";
import { Resend } from "resend";
import DiagnosticConfirmationEmail from "./email";

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
      from: "Inkam <onboarding@resend.dev>",
      to: ["inkamlimited@gmail.com"],
      subject: "Test mail",
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
