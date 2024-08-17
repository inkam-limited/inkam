import { Button } from "@react-email/components";
import React from "react";
import PaymentControls from "./PaymentControls";

const layout = ({ children }: { children: React.ReactNode }) => {
  return <main>{children}</main>;
};

export default layout;
