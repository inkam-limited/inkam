"use client";
import React from "react";
import { ChartContainer, type ChartConfig } from "@/components/ui/chart";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Chart = ({
  data,
}: {
  data: { date: string; sales: number; transactionCount: number }[];
}) => {
  console.log(data);
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />

        {/* YAxis for Sales */}
        <YAxis
          yAxisId="left"
          label={{ value: "Total Sales", angle: -90, position: "insideLeft" }}
        />

        {/* YAxis for Transaction Count */}
        <YAxis
          yAxisId="right"
          orientation="right"
          label={{
            value: "Number of Transactions",
            angle: -90,
            position: "insideRight",
          }}
        />

        <Tooltip />
        <Legend />

        {/* Line for Total Sales */}
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="sales"
          stroke="#8884d8"
          name="Total Sales"
        />

        {/* Line for Transaction Count */}
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="transactionCount"
          stroke="#82ca9d"
          name="Number of Transactions"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Chart;
