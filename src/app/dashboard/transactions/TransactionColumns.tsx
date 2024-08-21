"use client";

import { Transaction } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "agentName",
    header: "Agent Name",
  },
  {
    accessorKey: "agentNumber",
    header: "Agent Number",
  },
  {
    accessorKey: "customerNumber",
    header: "Customer Number",
  },
  {
    accessorKey: "amount",
    header: "price",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
];
