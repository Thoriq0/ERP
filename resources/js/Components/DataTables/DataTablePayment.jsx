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
import { ButtonDialogDelete } from "../ButtonDialogDelete";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { router } from "@inertiajs/react";
import toast from "react-hot-toast";

export function DataTablePayment({data, userRole}) {
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  // console.log(data);
  const handleDelete = () => {
    // console.log(`Deleting item with ID: ${selectedId}`);
    // Tambahkan logic API untuk delete di sini
    setOpen(false); // Tutup modal setelah delete
  };

  const handlePayment = () => {
    const selectedRows = table.getFilteredSelectedRowModel().rows;
    if (selectedRows.length === 0) {
      alert("Pilih minimal satu data untuk pembayaran!");
      return;
    }
  
    const today = new Date().toISOString().split("T")[0];
  
    const payments = selectedRows.map((row) => ({
      payment_id: row.original.id,
      account_payable_id: row.original.account_payable?.id,
      inbound_id: row.original.account_payable?.inbound.id,
      supplier_id: row.original.account_payable?.inbound?.product?.supplier?.id,
      total_amount: row.original.account_payable?.total_amount,
      due_date: row.original.account_payable?.due_date,
      payment_date: today,
      supplier_ac: row.original.account_payable?.inbound?.product?.supplier?.account_number || "",
      ap_code: row.original.account_payable?.ap_code,
    }));
  
    router.post(
      "/admin/payment",
      { payments },
      {
        onSuccess: () => {
          toast.success("Pembayaran berhasil diproses! 🎉", { duration: 5000 });
        },
        onError: (errors) => {
          toast.error("Gagal memproses pembayaran! ❌", { duration: 5000 });
          console.error("Error:", errors);
        },
      }
    );
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
      accessorKey: "account_payable.ap_code",
      header: "AP Code",
      cell: ({ row }) => (
        <div className="capitalize  ">
          {row.original.account_payable?.ap_code}
        </div>
      ),
    },
    {
      accessorKey: "account_payable.inbound.product.supplier.name",
      header: "Supplier Name",
      cell: ({ row }) => <div className="capitalize">{row.original.account_payable?.inbound?.product?.supplier?.name || "Belum terdaftar"}</div>,
    },
    // {
    //   accessorKey: "inbound.product.supplier.contact",
    //   header: "Supplier Contact",
    //   cell: ({ row }) => <div className="capitalize">{row.original.inbound?.product?.supplier?.contact || "Belum terdaftar"}</div>,
    // },
    {
      accessorKey: "account_payable.inbound.product.supplier.account_number",
      header: "Supplier AC",
      cell: ({ row }) => (
        <div className="capitalize">
          {row.original.account_payable?.inbound?.product?.supplier?.account_number || "Belum terdaftar"}
        </div>
      ),
    },
    {
      accessorKey: "account_payable.total_amount",
      header: "Total Amount",
      cell: ({ row }) => (
        <div className="text-right">
          {row.original.account_payable?.total_amount
            ? `Rp ${row.original.account_payable.total_amount.toLocaleString("id-ID")}`
            : "-"}
        </div>
      ),
    },
    {
        accessorKey: "account_payable.due_date",
        header: "Due Date",
        cell: ({ row }) => {
          const dueDate = row.original.account_payable?.due_date;
          if (!dueDate) return <div className="text-center">-</div>;
      
          const due = new Date(dueDate);
          const today = new Date();
          const diffDays = Math.ceil((due - today) / (1000 * 60 * 60 * 24));
      
          let emoji = " ";
          if (diffDays < 0) {
            emoji = "❌"; // Sudah lewat due date
          } else if (diffDays === 0) {
            emoji = "⏳"; // Due date hari ini
          } else if (diffDays <= 3) {
            emoji = "⚠️"; // Due date dalam 3 hari ke depan
          }
      
          return (
            <div className="text-center">
              {emoji} {due.toLocaleDateString("id-ID")}
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
            placeholder="Search by Name, Date In, Supplier or Category"
            value={table.getState().globalFilter || ""}
            onChange={(event) => table.setGlobalFilter(event.target.value)}
            className="max-w-xs"
          />
        </div>
        <div className="flex space-x-2">
            <Button className="bg-indigo-700 hover:bg-indigo-500" onClick={handlePayment} >
                Payment Product
            </Button>
        </div>
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

export default DataTablePayment;