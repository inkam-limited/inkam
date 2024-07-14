import React from "react";
import { Charts } from "./Charts";
import prisma from "@/db";

const fetchData = async () => {
  const agentData = await prisma.agent.findMany();
  return agentData;
};

const DashboardPage = async () => {
  const agents = await fetchData();
  return (
    <div className="maxw-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1>
        <Charts agents={agents} />
      </h1>
    </div>
  );
};

export default DashboardPage;
