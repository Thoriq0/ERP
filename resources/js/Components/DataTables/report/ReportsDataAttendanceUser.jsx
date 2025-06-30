import React, { useState } from "react";
import { usePage } from '@inertiajs/react';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { FiFilter } from "react-icons/fi";
import { Button } from "../../ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { Input } from "../../ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

export function ReportsDataAttendanceUser({ data, user }) {
    const { props } = usePage();
    const currentUser = props.auth.user;

    function groupAttendance(data, users) {
        const grouped = {};

        // Filter data hanya milik user yang sedang login
        const filteredData = data.filter(item => item.user_id === currentUser.id);

        filteredData.forEach(item => {
            const dateObj = new Date(item.created_at);
            const dateKey = `${item.user_id}_${dateObj.toLocaleDateString("id-ID")}`;
            const time = dateObj.toLocaleTimeString("id-ID", {
                hour: "2-digit",
                minute: "2-digit",
        });

        const foundUser = users.find((usr) => usr.id === item.user_id);

        if (!grouped[dateKey]) {
            grouped[dateKey] = {
            user_id: item.user_id,
            name: foundUser ? foundUser.name : "Unknown",
            role: foundUser ? foundUser.role : "Unknown",
            date: dateObj.toLocaleDateString("id-ID"),
            in: "-",
            out: "-",
            };
        }

        if (item.status.toLowerCase() === "in") grouped[dateKey].in = time;
        if (item.status.toLowerCase() === "out") grouped[dateKey].out = time;
        });

        return Object.values(grouped);
    }

    const columns = [
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => (
        <div className="capitalize">
            {row.getValue("name")?.length > 9
            ? row.getValue("name").slice(0, 9) + "..."
            : row.getValue("name")}
        </div>
        ),
    },
    {
        accessorKey: "role",
        header: "Role",
        cell: ({ row }) => (
        <div className="capitalize">
            {row.getValue("role")?.length > 9
            ? row.getValue("role").slice(0, 9) + "..."
            : row.getValue("role")}
        </div>
        ),
    },
    {
        accessorKey: "date",
        header: "Date",
        cell: ({ row }) => row.getValue("date"),
    },
    {
        accessorKey: "in",
        header: "In",
        cell: ({ row }) => row.getValue("in"),
    },
    {
        accessorKey: "out",
        header: "Out",
        cell: ({ row }) => row.getValue("out"),
    },
    ];
    
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const groupedData = groupAttendance(data, user);
  const table = useReactTable({
    data: groupedData,
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
    initialState: { 
      pagination: { pageSize: 10 },
      sorting: [{ id: "created_at", desc: true }] // Default sorting ke data terbaru
    },
  });

  return (
    <div className="w-full">
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
                <Button className="bg-PurpleFive hover:bg-indigo-700" >
                    Download
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

export default ReportsDataAttendanceUser;