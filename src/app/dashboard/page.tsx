import React, { Suspense } from "react";
import { DashboardPage } from "./DashboardPage";
import SuspenseLoader from "@/components/SuspenseLoader";

const Dashboard = () => {
  return (
    <SuspenseLoader>
      <DashboardPage />
    </SuspenseLoader>
  );
};

export default Dashboard;
