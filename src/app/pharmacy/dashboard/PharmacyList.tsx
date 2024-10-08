import { Agent } from "@prisma/client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

const PharmacyList = ({ pharmacies }: { pharmacies: Agent[] }) => {
  return (
    <div>
      <Table>
        <TableCaption>A list of your recent pharmacies.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Number</TableHead>
            <TableHead>Address</TableHead>
            <TableHead className="text-right">View</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pharmacies.map(function (pharmacy) {
            return (
              <TableRow key={pharmacy.agentId}>
                <TableCell className="font-medium">{pharmacy.name}</TableCell>
                <TableCell>{pharmacy.number}</TableCell>
                <TableCell className="text-right">
                  <Link
                    href={`/pharmacy/${pharmacy.agentId}`}
                    className={buttonVariants({ variant: "link" })}
                  >
                    Generate QR
                  </Link>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default PharmacyList;
