"use client";
import { ReactNode, useEffect, useState } from "react";

const DomLoaded = ({ children }: { children: ReactNode }) => {
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  return <>{domLoaded && children}</>;
};

export default DomLoaded;
