"use client";

import React, { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { ButtonModalShipment } from "../ButtonModalShipment";

export function DataTableShipmentOrder({ data, smls, userRole }) {
  const [selectedId, setSelectedId] = useState([]);

  const columns = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => {
            table.toggleAllPageRowsSelected(!!value);
            setSelectedId(value ? data.map((row) => row.id) : []);
          }}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => {
            row.toggleSelected(!!value);
            setSelectedId((prev) =>
              value
                ? [...prev, row.original.id]
                : prev.filter((id) => id !== row.original.id)
            );
          }}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "outbound.product.name",
      header: "Product",
      cell: ({ row }) => (
        <div className="capitalize">
          {row.original.outbound?.product?.name ?? "Unknown"}
        </div>
      ),
    },
    {
      accessorKey: "created_at",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date Out
          <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => {
        const rawDate = row.original.outbound?.created_at ?? "Unknown";
        const date = new Date(rawDate);

        const formattedDate = new Intl.DateTimeFormat("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }).format(date);

        return <div className="lowercase">{formattedDate}</div>;
      },
    },
    {
      accessorKey: "outbound.qty",
      header: "QTY",
      cell: ({ row }) => <div className="capitalize">{row.original.outbound?.qty ?? "0"}</div>,
    },
    {
      accessorKey: "outbound.product.category.name",
      header: "Category",
      cell: ({ row }) => (
        <div className="capitalize">
          {row.original.outbound?.product?.category?.name ?? "Unknown"}
        </div>
      ),
    },
    {
      accessorKey: "outbound.product.supplier.name",
      header: "Supplier",
      cell: ({ row }) => (
        <div className="capitalize">
          {row.original.outbound?.product?.supplier?.name ?? "Unknown"}
        </div>
      ),
    },
    {
      accessorKey: "outbound.receiver",
      header: "Receiver",
      cell: ({ row }) => (
        <div className="capitalize">
          {row.original.outbound?.receiver ?? "Unknown"}
        </div>
      ),
    },
    {
      accessorKey: "status_shipment",
      header: "Shipment Status",
      cell: ({ row }) => (
        <div className={`capitalize text-center rounded-xl text-white p-2 ${
          row.original.status_shipment === "preparing" ? "bg-orange-400" : "bg-lime-400"
        }`}>
          {row.original.status_shipment ?? "Tidak Tersedia"}
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: { pagination: { pageSize: 10 } },
  });

  return (
    <div className="w-full">
      <div className="flex justify-between items-center py-1 mb-2">
        <h1 className="font-extrabold text-xl">Shipment Order</h1>
        <ButtonModalShipment selectedId={selectedId} shipment={smls} userRole={userRole} />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader className="bg-gray-200 text-black">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">No results.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <button
          className="px-3 py-1 border rounded-md flex items-center disabled:opacity-50"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <AiOutlineLeft className="mr-1" /> Back
        </button>
        <button
          className="px-3 py-1 border rounded-md flex items-center bg-PurpleFive text-white disabled:opacity-50"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next <AiOutlineRight className="ml-1" />
        </button>
      </div>
    </div>
  );
}

export default DataTableShipmentOrder;
