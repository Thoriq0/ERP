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
import { FaEdit, FaEye, FaTrash, FaCopy } from "react-icons/fa";
import toast from "react-hot-toast";
import { router } from "@inertiajs/react";
import { useForm, usePage } from "@inertiajs/react";
// import { ButtonModalDelivery } from "../ButtonModalDelivery";

export function DataTableDelivery({data, userRole}) {
  const { flash } = usePage().props;
  const [open, setOpen] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    if (flash?.success) {
      toast.success(flash.success, { duration: 5000 });
      // onClose();
    }
    if (flash?.error) {
      toast.error(flash.error, { duration: 5000 });
    }
  }, [flash]);

  const handleValidateStock = () => {
      if (selectedProducts.length === 0) {
        toast.error("No products selected!");
        return;
      }

      const deliveredProducts = selectedProducts.filter((id) => {
        const product = data.find((item) => item.id === id);
        return product?.status_shipment === "Delivered";
      });
    
      if (deliveredProducts.length > 0) {
        toast.error("The product has been shipped!");
        return;
      }

    // Mapping role endpoint
    const rolePaths = {
      admin: "/admin/delivery",
      wrhs: "/wrhs/delivery",
    };

    const userPath = rolePaths[userRole];

    if (!userPath) {
      toast.error("You don't have permission to validate stock!");
      return;
    }

    router.post(
      userPath, // ✅ Gunakan path sesuai role
      { selected_products: selectedProducts }, // ✅ Kirim hanya array ID
      {
        onError: (err) => {
          console.error(err);
          toast.error("Validation failed!");
        },
      }
    );
  }

  
    const columns = [
     {
       id: "select",
       header: ({ table }) => (
         <Checkbox
           checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
           onCheckedChange={(value) => {
            table.toggleAllPageRowsSelected(!!value);
            setSelectedProducts(value ? data.map((row) => row.id) : []);
          }}
           aria-label="Select all"
         />
       ),
       cell: ({ row }) => (
         <Checkbox
           checked={row.getIsSelected()}
           onCheckedChange={(value) => {
            row.toggleSelected(!!value);
            setSelectedProducts((prev) =>
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
           accessorKey: "outbound.receiver",
           header: "Receiver",
           cell: ({ row }) => (
             <div className="capitalize">
               {row.original.outbound?.receiver ?? "Unknown"}
             </div>
           ),
         },
         {
           accessorKey: "delivery_estimate",
           header: "Delivery Estimate",
           cell: ({ row }) => {
             const rawDate = row.original.delivery_estimate;
             return rawDate ? new Date(rawDate).toLocaleDateString("id-ID") : "N/A";
           },
         },
          {
           accessorKey: "status_shipment",
           header: "Shipment Status",
           cell: ({ row }) => (
             <div className={`capitalize text-center rounded-xl text-white p-2 ${
               row.original.status_shipment === "Delivered" ? "bg-green-400" : "bg-lime-400"
             }`}>
               {row.original.status_shipment ?? "Tidak Tersedia"}
             </div>
           ),
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
                    placeholder="Search by Name, Date In, Supplier or Category"
                    value={table.getState().globalFilter || ""}
                    onChange={(event) => table.setGlobalFilter(event.target.value)}
                    className="max-w-xs"
                />
            </div>
            <div className="flex space-x-2">
              {/* <Button className="bg-indigo-700 hover:bg-indigo-500" >
                Transfer Stock
              </Button> */}
              <Button className="bg-green-600 hover:bg-green-400" onClick={handleValidateStock}>
                Delivered
              </Button>
            </div>
            {/* <ButtonModalDelivery /> */}
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

export default DataTableDelivery;