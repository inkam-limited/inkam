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
        <TableCaption>A list of your recent invoices.</TableCaption>
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
              <TableRow>
                <TableCell className="font-medium">{pharmacy.name}</TableCell>
                <TableCell>{pharmacy.number}</TableCell>
                <TableCell>{pharmacy.location}</TableCell>
                <TableCell className="text-right">
                  <Link
                    href={`/pharmacy/${pharmacy.id}`}
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
