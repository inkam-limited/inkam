"use server";
import { Email } from "./email";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendMail = async () => {
  try {
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ["inkamlimited@gmail.com"],
      subject: "Test mail",
      react: Email({ url: "John@inkam.app" }) as React.ReactElement,
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
