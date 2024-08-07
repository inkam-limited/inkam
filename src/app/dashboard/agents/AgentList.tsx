import { Agent, Prisma } from "@prisma/client";
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
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const AgentList = ({ agents }: { agents: Agent[] }) => {
  return (
    <Table>
      <TableCaption>A list of your recent pharmacies.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Name</TableHead>
          <TableHead>Number</TableHead>
          <TableHead>District</TableHead>
          <TableHead className="">Joined</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {agents.map(async function (agent) {
          let address;
          if (
            agent?.address &&
            typeof agent?.address === "object" &&
            Array.isArray(agent?.address)
          ) {
            const addressObj = agent?.address as Prisma.JsonArray;

            address = addressObj;
          }

          return (
            <TableRow key={agent.agentId}>
              <TableCell className="font-medium">
                <Link
                  href={`/pharmacy/${agent.agentId}`}
                  className={buttonVariants({ variant: "link" })}
                >
                  {agent.name}
                </Link>
              </TableCell>
              <TableCell>{agent.number}</TableCell>
              <TableCell className="max-w-9">
                {agent.address?.toString().replaceAll(",", ", ")}
              </TableCell>
              <TableCell>{agent.createdAt.toDateString()}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full">
                      Actions
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <Link href={`/pharmacy/${agent.agentId}`}>View</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href={`/pharmacy/${agent.agentId}`}>Edit</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href={`/pharmacy/${agent.agentId}`}>Delete</Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default AgentList;
