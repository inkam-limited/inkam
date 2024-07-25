import React from "react";
import PharmacyNav from "./PharmacyNav";

const ProtectedPharmacyLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <main className="w-full max-w-7xl h-[100svh] justify-between items-center mx-auto px-4 py-2 bg-white">
      <PharmacyNav />
      {children}
    </main>
  );
};

export default ProtectedPharmacyLayout;
