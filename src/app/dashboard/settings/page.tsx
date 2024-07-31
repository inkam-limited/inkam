import prisma from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Role, User } from "@prisma/client";
import { Loader2 } from "lucide-react";
import React, { Suspense } from "react";
import UserSettings from "./UserSetting";
import SuspenseLoader from "@/components/SuspenseLoader";

const SettingsPage = async () => {
  const { getUser } = await getKindeServerSession();
  const loggedInUser = await getUser();
  if (!loggedInUser) {
    return (
      <div className="w-full h-full">
        <Loader2 className="animate-spin h-12 w-12" />
      </div>
    );
  }

  const dbUser = await prisma.user.findUnique({
    where: {
      id: loggedInUser.id,
    },
    select: {
      role: true,
    },
  });
  if (!dbUser) {
    return (
      <div className="w-full h-full">
        <h1>Error Fetching User Data</h1>
      </div>
    );
  }

  if (dbUser.role !== Role.ADMIN) {
    return (
      <div className="w-full h-full">
        <h1>You do not have permission to access this page.</h1>
      </div>
    );
  }
  const users = await prisma.user.findMany();

  return (
    <SuspenseLoader>
      <UserSettings users={users} />
    </SuspenseLoader>
  );
};

export default SettingsPage;
