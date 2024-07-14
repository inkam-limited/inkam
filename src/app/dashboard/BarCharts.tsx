"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
} from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Agent } from "@prisma/client";
import { useMemo } from "react";
import { subDays, format } from "date-fns";

interface ChartData {
  day: string;
  count: number;
}

// Helper function to format the date as 'MMM dd'
const formatDate = (date: Date): string => format(date, "MMM dd");

const BarCharts = ({ agents }: { agents: Agent[] }) => {
  // Calculate the date 7 days ago
  const sevenDaysAgo = subDays(new Date(), 7);

  // Filter agents to include only those created in the last 7 days
  const recentAgents = agents.filter(
    (agent) => new Date(agent.createdAt) >= sevenDaysAgo
  );

  // Aggregate agents by day
  const chartData: ChartData[] = useMemo(() => {
    const data: Record<string, ChartData> = recentAgents.reduce(
      (acc, agent) => {
        const day = formatDate(new Date(agent.createdAt));
        if (!acc[day]) {
          acc[day] = { day, count: 0 };
        }
        acc[day].count += 1;
        return acc;
      },
      {} as Record<string, ChartData>
    );

    // Ensure all 7 days are present in the chartData
    const completeData = Array.from({ length: 7 }, (_, i) => {
      const day = formatDate(subDays(new Date(), 6 - i));
      return {
        day,
        count: data[day]?.count ?? 0,
      };
    });

    return completeData;
  }, [recentAgents]);

  const chartConfig: ChartConfig = {
    agents: {
      label: "Agents",
      color: "#2563eb",
    },
  };

  return (
    <ChartContainer config={chartConfig} className="h-[400px] w-full mt-2">
      <BarChart data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="day"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <YAxis />
        <Tooltip content={<ChartTooltipContent />} />
        {/* <Legend content={<ChartLegendContent />} /> */}
        <Bar
          dataKey="count"
          fill={chartConfig.agents.color}
          radius={[10, 10, 0, 0]}
        />
      </BarChart>
    </ChartContainer>
  );
};

export default BarCharts;
