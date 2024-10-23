import prisma from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Role } from "@prisma/client";
import { Loader2, MailWarningIcon } from "lucide-react";
import React, { Suspense } from "react";
import UserSettings from "./UserSetting";
import SuspenseLoader from "@/components/SuspenseLoader";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import PharmacyQR from "@/app/pharmacy/[slug]/PharmacyQR";
import { Button } from "@/components/ui/button";
import { seed } from "@/lib/seed";

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
  const users = await prisma.user.findMany();
  const pharmacies = await prisma.agent.findMany({
    where: {
      AgentType: "PHARMACY",
    },
    select: {
      name: true,
      number: true,
      agentId: true,
    },
  });
  console.log(pharmacies.length);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-4xl font-bold dark:text-neutral-300">Settings</h1>
      <SuspenseLoader>
        <UserSettings users={users} />
      </SuspenseLoader>

      {/* <h2>Download all qr</h2>
      <div className="grid grid-cols-4 gap-4">
        {pharmacies.map((pharmacy) => (
          <PharmacyQR
            link={`https://labs.inkam.app/transaction/lead/${pharmacy.agentId}`}
            name={pharmacy.name}
            number={pharmacy.number}
            key={pharmacy.agentId}
          />
        ))}
      </div> */}
    </div>
  );
};

export default SettingsPage;
