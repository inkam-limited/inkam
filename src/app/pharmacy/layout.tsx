import React from "react";
import PharmacyNav from "./PharmacyNav";
import {
  getKindeServerSession,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/server";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";
import { Button } from "@/components/ui/button";

const ProtectedPharmacyLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { getUser } = await getKindeServerSession();
  const user: KindeUser | null = await getUser();
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-[100svh]">
        <h1 className="text-center text-3xl font-bold mb-3">
          You need to login to continue
        </h1>
        <LoginLink postLoginRedirectURL="/auth-callback?origin=pharmacy/dashboard">
          <Button size="lg" variant="default">
            Login
          </Button>
        </LoginLink>
      </div>
    );
  }

  return (
    <main className="w-full max-w-7xl h-[100svh] justify-between items-center mx-auto px-4 bg-white">
      <PharmacyNav user={user} />
      {children}
    </main>
  );
};

export default ProtectedPharmacyLayout;
