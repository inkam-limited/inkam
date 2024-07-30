"use client";

import { trpc } from "@/app/_trpc/client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Role, User } from "@prisma/client";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

const userRoles = ["ADMIN", "AGENT", "USER"] as Role[];

export function UsersTable({ users }: { users: User[] }) {
  const { data, isLoading, isError, mutate } =
    trpc.changeUserRole.useMutation();
  const handleRoleChange = async (id: string, role: Role) => {
    await mutate({ id, role });
  };
  return (
    <div className="col-span-8">
      {users.map((user: User) => (
        <div key={user.id} className="flex gap-2">
          <h2>{user.email}</h2>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Button variant="outline">{user.role}</Button>
              )}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Select Role</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={user.role}
                onValueChange={(value) =>
                  handleRoleChange(user.id, value as Role)
                }
              >
                {userRoles.map((role) => (
                  <DropdownMenuRadioItem key={role} value={role}>
                    {role}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ))}
    </div>
  );
}
