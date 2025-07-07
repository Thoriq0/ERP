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
import { ButtonModalSupplier } from "@/Components/ButtonModalSupplier";
import { ButtonDialogDelete } from "../ButtonDialogDelete";
import { UpdateSupplierModal } from "../update/UpdateSupplierModal";
import { ViewSupplierDetailModal } from "../viewsdetails/ViewSupplierDetailModal";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { FaCopy, FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { router } from "@inertiajs/react";
import toast from "react-hot-toast";

export function DataTableSupplier({data, userRole}) {
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  // select data supplier dan modal
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);

  // State untuk modal detail
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedSupplierViews, setSelectedSupplierViews] = useState(null);

  // console.log(userRole, "role get");

  function handleExport() {
      const rolePaths = {
        admin: "/admin/supplier/export",
        wrhs: "/wrhs/supplier/export",
      };
    
      const userExportPath = rolePaths[userRole];
    
      if (!userExportPath) {
        toast.error("Role tidak valid! ❌");
        return;
      }
    
      window.location.href = userExportPath;
    }

  const handleDelete = () => {
    if (!selectedId) return;

    // Mapping role endpoint
    const rolePaths = {
      admin: "/admin/supplier",
      wrhs: "/wrhs/supplier",
    };

    const userPath = rolePaths[userRole];
  
    router.delete(`${userPath}/${selectedId}`, {
      onSuccess: () => {
        toast.success("Supplier data deleted successfully! 🗑️", { duration: 5000 });
      },
      onError: (err) => {
        console.error(err);
        toast.error("Failed to delete supplier data! ❌", { duration: 5000 });
      },
    });
    setOpen(false); 
  };

  const handleUpdate = (supplier,contact, address) => {
    setSelectedSupplier(supplier);
    setSelectedContact(contact);
    setSelectedAddress(address);
    setUpdateModalOpen(true);
  };

  // handle views details
  const handleViewDetails = (supplier) => {
    setSelectedSupplierViews(supplier);
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
      id: "no",
      header: () => <div className="text-center">No</div>,
      cell: ({ row }) => (
        <div className="text-center">{row.index + 1}</div>
      ),
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => {
        const name = row.getValue("name")?.toString() || "";
        const words = name.split(" ");
        const displayText = words.length > 3 ? words.slice(0, 3).join(" ") + "..." : name;
    
        return (
          <div className="capitalize" title={name}>
            {displayText}
          </div>
        );
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
      sortingFn: "datetime",
    },
    {
      accessorKey: "contact",
      header: "Contact",
      cell: ({ row }) => (
        <div className="capitalize">
          {row.getValue("contact")?.trim() || "Belum Terdaftar"}
        </div>
      ),
    },
    {
      accessorKey: "address",
      header: "Address",
      cell: ({ row }) => {
        const address = row.getValue("address")?.trim() || "Belum Terdaftar";
        return (
          <div className="capitalize">
            {address.length > 20 ? address.slice(0, 20) + "..." : address}
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
          <DropdownMenu >
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="cursor-pointer">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => {
                navigator.clipboard.writeText(item.contact)
                toast.success("Contact Copied!");
                }} className="cursor-pointer">
                <FaCopy size={16} className="text-blue-500 "/>Copy supplier contact
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleUpdate(item, item.contact, item.address)} className="cursor-pointer">
                <FaEdit size={16} className="text-yellow-500"/>Update
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleViewDetails(item)}  className="cursor-pointer">
                <FaEye size={16} className="text-green-500"/>View details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => { setSelectedId(item.id); setOpen(true); }} className="cursor-pointer">
                <FaTrash size={16} className="text-red-500"/> Delete
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
      <UpdateSupplierModal
          open={updateModalOpen}
          onClose={() => setUpdateModalOpen(false)}
          supplier={selectedSupplier}
          contactData={selectedContact}
          addressData={selectedAddress}
          userRole={userRole}
      />
      <ViewSupplierDetailModal
        open={detailModalOpen}
        onClose={() => setDetailModalOpen(false)}
        supplier={selectedSupplierViews}
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
            placeholder="Search by Name or Other"
            value={table.getState().globalFilter || ""}
            onChange={(event) => table.setGlobalFilter(event.target.value)}
            className="max-w-xs"
          />
        </div>
        <div className="flex  space-x-2">
            <Button className="bg-green-400 hover:bg-green-500" onClick={handleExport}>Export</Button>
            <ButtonModalSupplier userRole={userRole}/>
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

export default DataTableSupplier;