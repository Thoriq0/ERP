"use client"

import React, { useState } from "react";
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
import { ButtonModalUsrwrhs } from "@/Components/ButtonModalUsrwrhs";
import { ButtonDialogDelete } from "../ButtonDialogDelete";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { router } from "@inertiajs/react";
import toast from "react-hot-toast";


export function DataTableOutbound({data}) {
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleDelete = (id) => {
    if (!id) return;
  
    router.delete(`/admin/user/${id}`, {
      onSuccess: () => {
        toast.success("Penggua berhasil dihapus! 🗑️", { duration: 5000 });
      },
      onError: (err) => {
        console.error(err);
        toast.error("Gagal menghapus Pengguna! ❌", { duration: 5000 });
      },
    });
  };

  const columns = [
    // {
    //   id: "select",
    //   header: ({ table }) => (
    //     <Checkbox
    //       checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
    //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
    //       aria-label="Select all"
    //     />
    //   ),
    //   cell: ({ row }) => (
    //     <Checkbox
    //       checked={row.getIsSelected()}
    //       onCheckedChange={(value) => row.toggleSelected(!!value)}
    //       aria-label="Select row"
    //     />
    //   ),
    //   enableSorting: false,
    //   enableHiding: false,
    // },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
    },
    {
      accessorKey: "email",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Email
          <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => {
        const roleMap = {
          fnc: "Finance",
          wrhs: "Warehouse",
          hr: "Human Resource",
        };
        return <div className="capitalize">{roleMap[row.getValue("role")] || row.getValue("role")}</div>;  
      }
    },
    {
      accessorKey: "address",
      header: "Address",
      cell: ({ row }) => {
        const address = row.getValue("address") || "";
        const maxLength = 26;
        return (
          <div className="capitalize">
            {address.length > maxLength ? address.slice(0, maxLength) + "..." : address}
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status");
        const isActive = status === "active";
    
        return (
          <div
            className={`px-3 py-1 rounded-full text-white w-fit text-sm text-center font-semibold ${
              isActive ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {status}
          </div>
        );
      },
    },
    {
      id: "actions",
      enableHiding: false,
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
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(payment.id)}>
                Copy payment ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View customer</DropdownMenuItem>
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
      <ButtonDialogDelete open={open} onOpenChange={setOpen} onDelete={handleDelete} />
      <div className="flex justify-between items-center py-4">
        <div className="flex items-center space-x-4 w-[50%]">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="border-solid border-2 border-primaryPurple">
              <FiFilter size={24} />Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter(
                  (column) => column.getCanHide()
                )
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
        </DropdownMenu>
          <Input
            placeholder="Search by Name, Email or Role"
            value={table.getState().globalFilter || ""}
            onChange={(event) => table.setGlobalFilter(event.target.value)}
            className="max-w-xs text-sm"
          />
        </div>
        <ButtonModalUsrwrhs/>
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

        {/* Nomor halaman */}
        {/* <div className="flex space-x-2">
          {Array.from({ length: table.getPageCount() }, (_, i) => (
            <button
              key={i}
              onClick={() => table.setPageIndex(i)}
              className={`px-3 py-1 border rounded-md ${table.getState().pagination.pageIndex === i ? "bg-PurpleFive text-white" : "bg-white"}`}
            >
              {i + 1}
            </button>
          ))}
        </div> */}

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

export default DataTableOutbound;