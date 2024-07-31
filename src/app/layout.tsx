import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Providers from "./_trpc/Provider";

const font = localFont({
  src: "../fonts/DMSans-VariableFont_opsz,wght.ttf",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Inkam Leads",
  description: "Delivering the best home diagnostic experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
