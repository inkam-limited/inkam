import React from "react";
import DashboardNavbar from "./DashboardNavBar";
import {
  getKindeServerSession,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/server";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";
import { Button } from "@/components/ui/button";
import Sidebar from "./Sidebar";
import { Role } from "@prisma/client";
import prisma from "@/db";
import { redirect } from "next/navigation";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const { getUser } = await getKindeServerSession();
  const user: KindeUser | null = await getUser();
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-[100svh]">
        <h1 className="text-center text-3xl font-bold mb-3">
          You need to login to continue
        </h1>
        <LoginLink postLoginRedirectURL="/auth-callback?origin=dashboard">
          <Button size="lg" variant="default">
            Login
          </Button>
        </LoginLink>
      </div>
    );
  }
  const dbUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });

  if (!dbUser) {
    redirect("/auth-callback?origin=dashboard");
  }

  if (dbUser?.role !== Role.ADMIN) {
    return (
      <div className="flex flex-col items-center justify-center h-[100svh]">
        <h1 className="text-center text-3xl font-bold mb-3">
          You need to be an admin to continue
        </h1>
        <LoginLink postLoginRedirectURL="/auth-callback?origin=dashboard">
          <Button size="lg" variant="default">
            Login
          </Button>
        </LoginLink>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl  mx-auto px-4">
      <DashboardNavbar user={user} />

      <div className="md:grid min-h-[calc(100svh-4rem)] grid-cols-4  px-4 gap-4">
        <div className="col-span-1 pt-8 border-r border-gray-200">
          <Sidebar />
        </div>
        <div className="col-span-3 pt-8">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
