import React from "react";
import DashboardNavbar from "./_components/DashboardNavBar";
import {
  getKindeServerSession,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/server";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";
import { Button } from "@/components/ui/button";
import Sidebar from "./_components/Sidebar";
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

  // if (dbUser?.role !== Role.ADMIN) {
  //   return (
  //     <div className="flex flex-col items-center justify-center h-[100svh]">
  //       <h1 className="text-center text-3xl font-bold mb-3">
  //         You need to be an admin to continue
  //       </h1>
  //       <div className="flex gap-2">
  //         <LogoutLink postLogoutRedirectURL="/">
  //           <Button size="lg" variant="outline">
  //             Logout
  //           </Button>
  //         </LogoutLink>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="w-full max-w-7xl  mx-auto px-4">
      <DashboardNavbar user={user} />
      <div className="md:grid min-h-[calc(100svh-4rem)] grid-cols-6 gap-4">
        <div className="col-span-1 print:hidden pt-8 md:border-r md:border-gray-200 dark:md:border-gray-700">
          <Sidebar dbUser={dbUser} />
        </div>
        <div className="col-span-5 pt-8 min-h-64">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
