"use client";
import { User } from "@prisma/client";
import React from "react";
import { Button } from "../ui/button";
import { seed } from "@/lib/seed";

const cols = [{ field: "settings", title: "settings" }];

const DashboardPage = ({ users }: { users: any }) => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <div className="grid grid-cols-12 gap-4 p-12">
        <div className="col-span-4">
          {cols.map((col) => (
            <div key={col.field}>
              <h2>{col.title}</h2>
            </div>
          ))}
        </div>
        <div className="col-span-8">
          {users.map((user: User) => (
            <div key={user.id}>
              <h2>{user.email}</h2>
              <p>{user.role}</p>
            </div>
          ))}
        </div>
      </div>
      <Button onClick={() => seed()}>seed</Button>
    </div>
  );
};

export default DashboardPage;
