"use client";
import { Role, User } from "@prisma/client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ReactPaginate from "react-paginate";
import DomLoaded from "@/components/DomLoaded";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { updateUserRole } from "./actions";
import { useRouter } from "next/navigation";

const UserSettings = ({ users }: { users: User[] }) => {
  const router = useRouter();
  const itemsPerPage = 10;

  const [itemOffset, setItemOffset] = useState(0);
  const [userRoles, setUserRoles] = useState<Record<string, Role>>(
    Object.fromEntries(users.map((user) => [user.id, user.role]))
  );

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = users.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(users.length / itemsPerPage);

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % users.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  const handleRoleChange = (userId: string, value: string) => {
    const newRole = value as Role;
    updateUserRole(userId, newRole);
    setUserRoles((prevRoles) => ({ ...prevRoles, [userId]: newRole }));
    router.refresh();
  };

  return (
    <>
      <Table>
        <TableCaption>A list of your recent users.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Number</TableHead>
            <TableHead className="">Role</TableHead>
            <TableHead className="">Joined</TableHead>
          </TableRow>
        </TableHeader>
        <DomLoaded>
          <TableBody>
            {currentItems &&
              currentItems.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline">{user.role}</Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuRadioGroup
                          value={userRoles[user.id]}
                          onValueChange={(value) =>
                            handleRoleChange(user.id, value)
                          }
                        >
                          <DropdownMenuRadioItem value={Role.ADMIN}>
                            Admin
                          </DropdownMenuRadioItem>
                          <DropdownMenuRadioItem value={Role.MODERATOR}>
                            Moderator
                          </DropdownMenuRadioItem>
                          <DropdownMenuRadioItem value={Role.PARTNER}>
                            Partner
                          </DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                  <TableCell>
                    {new Date(user.createdAt).toDateString()}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </DomLoaded>
      </Table>
      <ReactPaginate
        breakLabel="..."
        nextLabel={<Button>Next</Button>}
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        className="flex gap-4 justify-between items-center w-fit mx-auto mt-4"
        pageCount={pageCount}
        previousLabel={<Button>Previous</Button>}
        renderOnZeroPageCount={null}
      />
    </>
  );
};

export default UserSettings;
