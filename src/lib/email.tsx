import * as React from "react";
import { render } from "@react-email/components";
import { Html, Button } from "@react-email/components";

export function Email(props = { url: "" }) {
  const { url } = props;

  return (
    <Html lang="en">
      <Button href={url}>Click me</Button>
    </Html>
  );
}