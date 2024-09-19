"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronUpIcon, ChevronDownIcon, SearchIcon } from "lucide-react";
import { LabTest } from "@prisma/client";

// Sample data for lab tests

export default function LabTestPriceTable({
  data,
}: {
  data: Partial<LabTest>[];
}) {
  const [sortColumn, setSortColumn] = useState<any>("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filters, setFilters] = useState<{
    name: string;
    price: [number, number];
    discount: [number, number];
  }>({
    name: "",
    price: [0, 100],
    discount: [0, 15],
  });
  const itemsPerPage = 5;

  const handleSort = (column: string) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleFilterChange = (filterType: string, value: string | number[]) => {
    setFilters((prev) => ({ ...prev, [filterType]: value }));
    setCurrentPage(1);
  };

  return (
    <div className="container mx-auto p-6 bg-gradient-to-br from-blue-50 to-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-blue-800">
        Lab Test Price List
      </h1>
      <div className="overflow-x-auto">
        <table className="w-full bg-white border border-blue-200 rounded-lg overflow-hidden">
          <thead className="bg-blue-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-blue-800 uppercase tracking-wider cursor-pointer hover:bg-blue-200 transition-colors">
                <div className="flex items-center">Test Name</div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-blue-800 uppercase tracking-wider cursor-pointer hover:bg-blue-200 transition-colors">
                <div className="flex items-center">Test Price</div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-blue-800 uppercase tracking-wider cursor-pointer hover:bg-blue-200 transition-colors">
                <div className="flex items-center">Test Commission</div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-blue-100">
            {data.map((item, index) => (
              <tr
                key={item.name}
                className={index % 2 === 0 ? "bg-blue-50" : "bg-white"}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  {item.name?.toUpperCase()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  {Number(item.price)}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  {`BDT ${Number(item.commission) * 0.5}`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
