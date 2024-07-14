import React from "react";
import DashboardPage from "./page";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import DashboardHeader from "./shared/DashboardHeader";
const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const { getUser } = await getKindeServerSession();

  const user = await getUser();

  if (!user) {
    return redirect("/");
  }

  return (
    <div>
      <DashboardHeader user={user} />
      <div>{children}</div>
    </div>
  );
};

export default DashboardLayout;
