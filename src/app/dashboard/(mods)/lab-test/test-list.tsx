import { LabTest, Prisma } from "@prisma/client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SuspenseLoader from "@/components/SuspenseLoader";
import AgentDropdown from "./test-dropdown";

const AgentList = ({ tests }: { tests: LabTest[] }) => {
  return (
    <Table className="w-full">
      <TableCaption>A list of your recent pharmacies.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="flex-grow">Name</TableHead>
          <TableHead>Test Price</TableHead>
          <TableHead>Commission</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <SuspenseLoader>
          {tests.map(async function (test) {
            return (
              <TableRow key={test.testId}>
                <TableCell>{test.name}</TableCell>
                <TableCell>{test.price}</TableCell>
                <TableCell>{test.commission}</TableCell>
                <TableCell>
                  <AgentDropdown testId={test.testId} />
                </TableCell>
              </TableRow>
            );
          })}
        </SuspenseLoader>
      </TableBody>
    </Table>
  );
};

export default AgentList;
