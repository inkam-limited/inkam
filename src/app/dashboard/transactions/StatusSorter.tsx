"use client";
import { buttonVariants } from "@/components/ui/button";
import { TransactionStatus } from "@prisma/client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const StatusSorter = ({
  page,
  per_page,
  status,
}: {
  page: number;
  per_page: number;
  status: TransactionStatus;
}) => {
  const pathName = usePathname();
  return (
    <div className="flex gap-2">
      <Link
        className={buttonVariants({
          variant: status === TransactionStatus.PENDING ? "default" : "outline",
        })}
        href={{
          pathname: pathName,
          query: {
            status: TransactionStatus.PENDING,
            page: page,
            per_page: per_page,
          },
        }}
      >
        Pending
      </Link>
      <Link
        className={buttonVariants({
          variant:
            status === TransactionStatus.SCHEDULED ? "default" : "outline",
        })}
        href={{
          pathname: pathName,
          query: {
            status: TransactionStatus.SCHEDULED,
            page: page,
            per_page: per_page,
          },
        }}
      >
        Scheduled
      </Link>
      <Link
        className={buttonVariants({
          variant: status === TransactionStatus.FAILED ? "default" : "outline",
        })}
        href={{
          pathname: pathName,
          query: {
            status: TransactionStatus.FAILED,
            page: page,
            per_page: per_page,
          },
        }}
      >
        Failed
      </Link>
      <Link
        className={buttonVariants({
          variant:
            status === TransactionStatus.PROVIDED ? "default" : "outline",
        })}
        href={{
          pathname: pathName,
          query: {
            status: TransactionStatus.PROVIDED,
            page: page,
            per_page: per_page,
          },
        }}
      >
        Provided
      </Link>
    </div>
  );
};

export default StatusSorter;
