"use client";
import React from "react";
import { trpc } from "../_trpc/client";
import DashboardPage from "@/components/dashboard/DashboardPage";

const Dashboard = () => {
  const { data, isLoading, isError } = trpc.getUsers.useQuery();

  if (isLoading) return <div>Loading...</div>;

  return <DashboardPage users={data} />;
};

export default Dashboard;
