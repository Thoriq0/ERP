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

import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Input } from "./ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { ButtonModalInbound } from "@/Components/ButtonModalInbound";
import { ButtonDialogDelete } from "./ButtonDialogDelete";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { router } from "@inertiajs/react";
import toast from "react-hot-toast";

export function DataTableInbound({data, userRole, supplierData, productData}) {
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  // console.log(userRole, "role get");

  const handleDelete = () => {
    if (!selectedId) return;

    // Mapping role endpoint
    const rolePaths = {
      admin: "/admin/inbound",
      wrhs: "/wrhs/inbound",
    };

    const userPath = rolePaths[userRole];
  
    router.delete(`${userPath}/${selectedId}`, {
      onSuccess: () => {
        toast.success("Produk berhasil dihapus! 🗑️", { duration: 5000 });
      },
      onError: (err) => {
        console.error(err);
        toast.error("Gagal menghapus produk! ❌", { duration: 5000 });
      },
    });
    setOpen(false); 
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
          Date In
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
      accessorKey: "supplier_id",
      header: "Supplier",
      cell: ({ row }) => {
        const supplier = supplierData.find(sup => sup.id === row.getValue("supplier_id"));
        return <div className="capitalize">{supplier ? supplier.name : "Unknown"}</div>;
      },
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
            placeholder="Search by Name, Date In, Supplier or Category"
            value={table.getState().globalFilter || ""}
            onChange={(event) => table.setGlobalFilter(event.target.value)}
            className="max-w-xs"
          />
        </div>
        <ButtonModalInbound userRole={userRole} supplierData={supplierData} productData={productData} />
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

export default DataTableInbound;