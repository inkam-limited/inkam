import { Card, CardContent, CardHeader } from "@/components/ui/card";
import prisma from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Role } from "@prisma/client";
import { Loader2, MailWarningIcon } from "lucide-react";
import React, { PropsWithChildren } from "react";

const layout = async ({ children }: PropsWithChildren) => {
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

  if (dbUser.role !== Role.ADMIN && dbUser.role !== Role.MODERATOR) {
    return (
      <div className="w-full h-full">
        <Card>
          <CardHeader>
            You do not have permission to access this page.
          </CardHeader>
          <CardContent className="flex items-center gap-2">
            <MailWarningIcon className="w-8 h-8 text-red-500" />
            <p>Contact your admin to gain access.</p>
          </CardContent>
        </Card>
      </div>
    );
  }
  return <div>{children}</div>;
};

export default layout;
