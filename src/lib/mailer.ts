import { render } from "@react-email/components";
import nodemailer from "nodemailer";
import { Html, Button } from "@react-email/components";
import { Email } from "./email";

const transporter = nodemailer.createTransport({
  host: "smtp.forwardemail.net",
  port: 465,
  secure: true,
  auth: {
    user: "my_user",
    pass: "my_password",
  },
});

const emailHtml = render(Email({ url: "https://example.com" }));

const options = {
  from: "you@example.com",
  to: "user@gmail.com",
  subject: "Hello World",
  html: emailHtml,
};

export const sendMail = async () => {
  await transporter.sendMail(options);
};
