"use client"
import React, { useState, useEffect } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";
import { FiFilter } from "react-icons/fi";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Input } from "../ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { router } from "@inertiajs/react";

export function DataTableValidasiTimeRequest({data, employee, selectedIds, setSelectedIds}) {
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  // console.log(data, employee)

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
    
            const newSelectedIds = value
              ? table
                  .getFilteredRowModel()
                  .rows.map((row) => row.original.id)
              : [];
            setSelectedIds(newSelectedIds);
          }}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => {
            row.toggleSelected(!!value);
    
            setSelectedIds((prev) => {
              const id = row.original.id;
              if (value) {
                return [...prev, id];
              } else {
                return prev.filter((i) => i !== id);
              }
            });
          }}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },    
    {
      id: "name",
      header: "Name",
      cell: ({ row }) => {
        const item = row.original;
        const emp = employee.find((e) => e.id === item.employee_id);
        return <div className="capitalize">{emp?.name || "-"}</div>;
      },
    },
    {
      accessorKey: "created_at",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created At
          <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => {
        const rawDate = row.getValue("created_at");
        const date = new Date(rawDate);
    
        // Format ke "HH:mm dd-MM-yyyy"
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
      id: "departemen",
      header: "Departemen",
      cell: ({ row }) => {
        const item = row.original;
        const emp = employee.find((e) => e.id === item.employee_id);
        return <div className="capitalize">{emp?.departemen || "-"}</div>;
      },
    },

    {
      accessorKey: "note",
      header: "Note",
      cell: ({ row }) => <div className="capitalize">{row.getValue("note")}</div>,
    },
    {
      accessorKey: "dueto",
      header: "End Date",
      cell: ({ row }) => {
        const raw = row.getValue("dueto"); // data raw 
        let dates = [];
    
        try {
          dates = JSON.parse(raw); // convert array
        } catch (err) {
          console.error("Gagal parse JSON:", raw);
        }
    
        const lastDate = dates[dates.length - 1]; // tanggal terakhir
        return <div className="capitalize">{lastDate || "-"}</div>;
      },
    },
    
    {
      id: "actions",
      enableHiding: false,
      header: "Action",
      cell: ({ row }) => {
        const item = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>View payment details</DropdownMenuItem>
              <DropdownMenuItem onClick={() => { setSelectedId(item.id); setOpen(true); }}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
            
          </DropdownMenu>
          
        );
      },
    },
  ];

  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: { sorting, columnFilters, columnVisibility, rowSelection },
    initialState: { pagination: { pageSize: 10 } },
  });

  return (
    <div className="w-full">
        <div className="flex justify-between items-center py-4">
            <h1 className="font-extrabold text-xl">Data Validasi (there will be changes title)</h1>
        </div>
        <div className="rounded-md border">
            <Table>
            <TableHeader className="bg-gray-200 text-black">
                {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</TableHead>
                    ))}
                </TableRow>
                ))}
            </TableHeader>
            <TableBody>
                {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id}>{row.getVisibleCells().map((cell) => <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>)}</TableRow>
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
            
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
            
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

export default DataTableValidasiTimeRequest;