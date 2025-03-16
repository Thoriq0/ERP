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
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { ButtonModalShipment } from "../ButtonModalShipment";

export function DataTableShipmentOrder({data}) {
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleDelete = () => {
    console.log(`Deleting item with ID: ${selectedId}`);
    // Tambahkan logic API untuk delete di sini
    setOpen(false); // Tutup modal setelah delete
  };

    const columns = [
     {
       id: "select",
       header: ({ table }) => (
         <Checkbox
           checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
           onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
           aria-label="Select all"
         />
       ),
       cell: ({ row }) => (
         <Checkbox
           checked={row.getIsSelected()}
           onCheckedChange={(value) => row.toggleSelected(!!value)}
           aria-label="Select row"
         />
       ),
       enableSorting: false,
       enableHiding: false,
     },
     {
       accessorKey: "product_id",
       header: "Product",
       cell: ({ row }) => {
         const product = productData.find(prod => prod.id === row.getValue("product_id"));
         return <div className="capitalize">{product ? product.name : "Unknown"}</div>;
       },
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
       accessorKey: "qty",
       header: "QTY",
       cell: ({ row }) => <div className="capitalize">{row.getValue("qty")}</div>,
     },
     {
       accessorKey: "category_id",
       header: "Category",
       cell: ({ row }) => {
         const product = productData.find(prod => prod.id === row.getValue("product_id"));
         return <div className="capitalize">{product ? product.category?.name : "Unknown"}</div>;
       },
     },
     {
       accessorKey: "pic",
       header: "PIC",
       cell: ({ row }) => <div className="capitalize ">{row.getValue("pic")}</div>,
     },
     {
       accessorKey: "payment_status",
       header: "Status",
       cell: ({ row }) => {
         const status = row.getValue("payment_status");
         return (
           <div
             className={`capitalize text-center rounded-xl text-white p-2 ${
               status === "unpaid" ? "bg-orange-400" : status === "schedule" ? "bg-yellow-400" : "bg-lime-400"
             }`}
           >
             {status ?? "N/A"}
           </div>
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
        <div className="flex justify-between items-center py-1 mb-2">
            <h1 className="font-extrabold text-xl">Shipment Order</h1>
            <ButtonModalShipment  />
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

export default DataTableShipmentOrder;