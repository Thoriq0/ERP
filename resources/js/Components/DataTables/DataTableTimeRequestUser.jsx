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
import { ButtonDialogDelete } from "../ButtonDialogDelete";
import { ButtonModalTimeRequest } from "../ButtonModalTimeRequest";
import { UpdateTimeModal } from "../update/UpdateTimeModal";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { FaEdit, FaEye, FaTrash, FaCopy } from "react-icons/fa";
import { router } from "@inertiajs/react";

export function DataTableTimeRequestUser({data, userRole, employee, selectedIds}) {
  const [open, setOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const handleDelete = () => {
      if (!selectedId) return;
  
      // Mapping role endpoint
      const rolePaths = {
        admin: "/admin/time",
        wrhs: "/hr/time",
        fnc: "/fnc/time",
        staff: "/staff/time",
      };
  
      const userPath = rolePaths[userRole];
  
      router.delete(`${userPath}/${selectedId}`, {
        onSuccess: () => {
          toast.success("Inbound berhasil dihapus! 🗑️", { duration: 5000 });
        },
        onError: (err) => {
          // console.error(err);
          toast.error("Gagal menghapus Inbound! ❌", { duration: 5000 });
        },
      });
      setOpen(false);
    };
    const handleUpdate = (time) => {
      setSelectedItem(time);
      setUpdateModalOpen(true);
    };
    
    const oks = () => {
      const rolePaths = {
        admin: "/admin/time/validate",
        wrhs: "/hr/time/validate",
      };
    
      const userPath = rolePaths[userRole];
    
      router.post(userPath, { selected: selectedIds }, {
        onSuccess: () => {
          toast.success("Validasi berhasil dikirim! ✅", { duration: 5000 });
        },
        onError: () => {
          toast.error("Gagal mengirim validasi! ❌", { duration: 5000 });
        },
      });
    }

  const columns = [
    {
      accessorKey: "createdBy",
      header: "Name",
      cell: ({ row }) => <div className="capitalize">{row.getValue("createdBy")}</div>,
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
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <div className="capitalize bg-orange-400 p-2 rounded-md text-white text-center font-semibold">{row.getValue("status")}</div>,
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
              <DropdownMenuSeparator />
    
              {/* Tampilkan tombol Update kalau status belum validated */}
              {item.status !== 'validated' && (
                <DropdownMenuItem onClick={() => handleUpdate(item)} className="cursor-pointer">
                  <FaEdit size={16} className="text-yellow-500" />Update
                </DropdownMenuItem>
              )}
    
              <DropdownMenuItem
                onClick={() => {
                  setSelectedId(item.id);
                  setOpen(true);
                }}
                className="cursor-pointer"
              >
                <FaTrash size={16} className="text-red-500" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    }    
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
      <UpdateTimeModal
            open={updateModalOpen}
            onClose={() => setUpdateModalOpen(false)}
            data={data}
            time={selectedItem}
            employee={employee}
            userRole={userRole}
      />
      <h1 className="font-extrabold text-xl">Data Time Off Request</h1>
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
            <ButtonModalTimeRequest userRole={userRole} employee={employee} />
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
export default DataTableTimeRequestUser;