import React from "react";
import DashboardNavbar from "./DashboardNavBar";
import {
  getKindeServerSession,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/server";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";
import { Button } from "@/components/ui/button";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
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
    <div className="w-full max-w-7xl h-[100svh] mx-auto px-4 py-2">
      <DashboardNavbar user={user} />
      {children}
    </div>
  );
};

export default DashboardLayout;