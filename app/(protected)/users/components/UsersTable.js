"use client";

import React from "react";
import ServerDataTable from "@/components/ui/table/serverside/data-table.jsx";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { DateTime } from "luxon";

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
      return <div>{info.getValue() || "N/A"}</div>;
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
  },
  {
    accessorKey: "mobile",
    header: "Mobile",
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

export default function UsersTable({ data, onChange, loading, ...props }) {
  return (
    <div className="container py-10 mx-auto">
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
