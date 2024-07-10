import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return <div className="h-[100svh]">{children}</div>;
};

export default layout;
