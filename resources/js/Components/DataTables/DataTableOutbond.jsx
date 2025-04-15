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
import { FaEdit, FaEye, FaTrash, FaCopy } from "react-icons/fa";
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
import { ButtonModalOutbound } from "@/Components/ButtonModalOutbound";
import { UpdateOutboundModal } from "../update/UpdateOutbound";
import { ButtonDialogDelete } from "../ButtonDialogDelete";
import { ViewOutboundDetailModal } from "../viewsdetails/ViewOutboundDetailModal";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { router } from "@inertiajs/react";
import toast from "react-hot-toast";

export function DataTableOutbound({ data, userRole, supplierData, productData, dataStocks, usr, roleName }) {

  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  // state data outbound dan modal
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  // State untuk modal detail
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedOutbound, setSelectedOutbound] = useState(null);

  const handleDelete = () => {
    if (!selectedId) return;

    // Mapping role endpoint
    const rolePaths = {
      admin: "/admin/outbound",
      wrhs: "/wrhs/outbound",
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

  // handle update
  const handleUpdate = (outbound) => {
    setSelectedProduct(outbound);
    setUpdateModalOpen(true);
  };

  // handle views details
  const handleViewDetails = (outbound) => {
    setSelectedOutbound(outbound);
    setDetailModalOpen(true);
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
      accessorKey: "product_id",
      header: "Product",
      cell: ({ row }) => {
        const stock = dataStocks.find(stock => stock.product.id === row.getValue("product_id"));
        return <div className="capitalize">{stock ? stock.product.name : "Unknown"}</div>;
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
      accessorKey: "receiver",
      header: "To",
      cell: ({ row }) => <div className="capitalize">{row.getValue("receiver")}</div>,
    },
    {
      accessorKey: "category_id",
      header: "Category",
      cell: ({ row }) => {
        const stock = dataStocks.find(stock => stock.product.id === row.getValue("product_id"));
        return <div className="capitalize">{stock ? stock.product.category?.name : "Unknown"}</div>;
      },
    },    
    {
      accessorKey: "out_status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("out_status");
        return (
          <div
            className={`capitalize text-center rounded-xl text-white p-2 ${
              status === "preparing" ? "bg-orange-400" : status === "shipping process" ? "bg-[#FFC107]" : "bg-lime-400"
            }`}
          >
            {status ?? "N/A"}
          </div>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
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
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(item.id)} className="cursor-pointer">
                <FaCopy size={16} className="text-blue-500 "/>Copy payment ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {item.out_status === "preparing" ? (
                <DropdownMenuItem onClick={() => handleUpdate(item)} className="cursor-pointer">
                <FaEdit size={16} className="text-yellow-500 "/>Update
                </DropdownMenuItem>
              ) : (
                <></>
              )}
              
              <DropdownMenuItem onClick={() => handleViewDetails(item)} className="cursor-pointer">
                <FaEye size={16} className="text-green-500 "/>View details
              </DropdownMenuItem>
              {item.out_status === "preparing" ? (
                <DropdownMenuItem onClick={() => { setSelectedId(item.id); setOpen(true); }} className="cursor-pointer">
                  <FaTrash size={16} className="text-red-500"/>Delete
                </DropdownMenuItem>
              ) : (
                <></>
              )}
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
      <UpdateOutboundModal
        open={updateModalOpen}
        onClose={() => setUpdateModalOpen(false)}
        outbound={selectedProduct}
        productData={productData}
        userRole={userRole}
        dataStocks={dataStocks}
      />
      <ViewOutboundDetailModal
        open={detailModalOpen}
        onClose={() => setDetailModalOpen(false)}
        outbound={selectedOutbound}
        productData={productData}
        userRole={userRole}
        user={usr}
      />
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
            placeholder="Search by Name, Date Out, or Category"
            value={table.getState().globalFilter || ""}
            onChange={(event) => table.setGlobalFilter(event.target.value)}
            className="max-w-xs text-sm"
          />
        </div>
        <ButtonModalOutbound userRole={userRole} dataStocks={dataStocks} usr={usr} />
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

export default DataTableOutbound;