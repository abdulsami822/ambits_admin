"use client";

import React from "react";
import ServerDataTable from "@/components/ui/table/serverside/data-table.jsx";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, ExternalLink } from "lucide-react";
import { DateTime } from "luxon";
import Link from "next/link";
import { GET_PROJECT_DETAILS_PAGE } from "@/constants/routes.constants";
import { Text } from "@radix-ui/themes";
import { ExternalLinkIcon } from "@radix-ui/react-icons";

const columns = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
    cell: (info) => {
      return (
        <Link href={GET_PROJECT_DETAILS_PAGE(info.row.original.projectId)}>
          <Text color="indigo" className="flex items-center gap-1">
            {info.getValue() || "N/A"}
            <ExternalLinkIcon />
          </Text>
        </Link>
      );
    },
  },
  {
    accessorKey: "projectCost",
    header: "Project Cost",
    cell: (info) => {
      return <div>{info.getValue() || "N/A"}</div>;
    },
  },
  {
    accessorKey: "landSize",
    header: "Land Size",
    cell: (info) => {
      return <div>{info.getValue() || "N/A"}</div>;
    },
  },

  {
    accessorKey: "noOfTickets",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          No. of Tickets
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
    cell: (info) => {
      return <div>{info.getValue() || "N/A"}</div>;
    },
  },
  {
    accessorKey: "ticketCost",
    header: "Ticket Cost",
    cell: (info) => {
      return <div>{info.getValue() || "N/A"}</div>;
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created At
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
    cell: (info) => {
      let createdAt = info.getValue();
      createdAt = DateTime.fromISO(createdAt).toFormat("ff");
      return <div>{createdAt || "N/A"}</div>;
    },
  },
];

export default function ProjectsTable({ data, onChange, loading, ...props }) {
  return (
    <div className="">
      <ServerDataTable
        columns={columns}
        data={data}
        onChange={onChange}
        loading={loading}
        filterColumnConfig={{
          placeholder: "Search Name",
          columnId: "name",
        }}
        {...props}
      />
    </div>
  );
}
