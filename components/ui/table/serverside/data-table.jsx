"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table/table";

import { useDebounceEffect } from "@/hooks/useDebounceEffect";
import { DataTablePagination } from "./table-pagination";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Loader from "../../loader";
import { StorageService } from "@/services/StorageService";

/**
 *
 * @param {Obj} props
 * @param {Obj[]} props.columns
 * @param {React.MutableRefObject<unknown>} props.tableConfigState
 * @param {Function} props.onChange
 * @param {any[]} props.data
 * @param {Boolean} props.loading
 * @param {Obj} props.filterColumnConfig
 * @param {String} props.filterColumnConfig.placeholder
 * @param {String} props.filterColumnConfig.columnId
 * @returns
 */

export default function ServerDataTable({
  columns,
  tableConfigState,
  onChange,
  totalCount,
  data,
  loading,
  filterColumnConfig,
  initialPaginationConfig,
}) {
  const [pagination, setPagination] = useState({
    pageIndex: initialPaginationConfig?.pageIndex
      ? parseInt(initialPaginationConfig?.pageIndex) - 1
      : 0,
    pageSize: StorageService.getRowPerPageOption(),
  });

  const tablePagination = {
    ...pagination,
    totalCount,
    setPagination,
  };

  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    onColumnFiltersChange: setColumnFilters,
    state: {
      sorting,
      columnFilters,
    },
    onSortingChange: setSorting,
  });

  useDebounceEffect(
    300,
    () => {
      const tableState = {
        pagination,
        sorting,
        columnFilters,
      };

      if (StorageService.getRowPerPageOption() !== pagination.pageSize) {
        StorageService.setRowPerPageOption(pagination.pageSize);
      }

      if (typeof onChange === "function") onChange(tableState);

      if (tableConfigState) tableConfigState.current = tableState;
    },
    [pagination, sorting, columnFilters]
  );

  return (
    <div className="space-y-2">
      <div className="flex items-center py-4">
        <Input
          placeholder={filterColumnConfig.placeholder || "Search"}
          value={
            table.getColumn(filterColumnConfig.columnId)?.getFilterValue() ?? ""
          }
          onChange={(event) =>
            table
              .getColumn(filterColumnConfig.columnId)
              ?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <div
        className={cn(
          "border rounded-md",
          loading && "opacity-50 pointer-events-none cursor-not-allowed "
        )}
      >
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          {!data?.length && loading && (
            <div className="flex items-center justify-center p-4">
              <Loader />
            </div>
          )}
          {data?.length && (
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          )}
        </Table>
      </div>
      <DataTablePagination pagination={tablePagination} />
    </div>
  );
}
