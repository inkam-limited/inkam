"use client";
import { Role, User } from "@prisma/client";
import React from "react";
import { UsersTable } from "./UsersTable";
import { useRouter } from "next/navigation";
import { trpc } from "@/app/_trpc/client";
const cols = [{ field: "settings", value: "settings" }];

const DashboardPage = () => {
  const router = useRouter();
  const { data, isLoading, isError } = trpc.getUsers.useQuery();

  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <div className="grid grid-cols-12 gap-4 p-12">
        <div className="col-span-3">
          {cols.map((col) => (
            <div key={col.field}>
              <h2 className="text-lg font-bold capitalize">{col.value}</h2>
            </div>
          ))}
        </div>
        <UsersTable users={data as any} />
      </div>
    </div>
  );
};

export default DashboardPage;
