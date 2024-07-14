import { Agent } from "@prisma/client";
import BarCharts from "./BarCharts";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export function Charts({ agents }: { agents: Agent[] }) {
  return (
    <div className="flex flex-col gap-4 py-10">
      <h1 className="text-2xl font-bold">Agent List</h1>
      <DataTable columns={columns} data={agents} />
      <h2 className="text-2xl font-bold">Onboarding by day</h2>
      <BarCharts agents={agents} />
    </div>
  );
}
