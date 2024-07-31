"use client";
import { User } from "@prisma/client";
import React, { Suspense, useState } from "react";
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
import ReactPaginate from "react-paginate";
import DomLoaded from "@/components/DomLoaded";
import { Button } from "@react-email/components";

const UserSettings = ({ users }: { users: User[] }) => {
  const itemsPerPage = 10;

  const [itemOffset, setItemOffset] = useState(0);

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
  return (
    <>
      <Table>
        <TableCaption>A list of your recent pharmacies.</TableCaption>
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
              currentItems.map(async function (user) {
                return (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell className="">
                      {user.createdAt.toDateString()}
                    </TableCell>
                  </TableRow>
                );
              })}
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
