import React, { useState, useMemo, useEffect } from "react";
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
import { ButtonModalAp } from "@/Components/ButtonModalAp";
import { UpdateApModal } from "../update/UpdateApModal";
import { ViewApDetailModal } from "../viewsdetails/ViewApDetailModal"; 
import { ButtonDialogDelete } from "../ButtonDialogDelete";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { FaEdit, FaEye, FaTrash, FaCopy } from "react-icons/fa";
import { router } from "@inertiajs/react";
import toast from "react-hot-toast";
import echo from "@/echo";

export default function DataTableAccountPayable({ data, userRole, productData, apData, bp }) {
  
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  // console.log(apData)
  // select data inbound dan modal
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // select data inbound dan modal
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedInbound, setSelectedInbound] = useState(null);

  useEffect(() => {
      const channel = echo.channel('models');
  
      channel.listen('.model.changed', (e) => {
        if (e.model === 'account_payable') {
          setTimeout(() => {
                      router.reload({ only: ['ap'], preserveScroll: true });
                  }, 1700);
        } 
        else if (e.model === 'product') {
          setTimeout(() => {
            router.reload({ only: ['products'], preserveScroll: true });
                  }, 1700);
        }
        else if (e.model === 'inbound') {
          setTimeout(() => {
            router.reload({ only: ['inbound'], preserveScroll: true });
                  }, 1700);
        }
      });
  
      return () => {
        channel.stopListening('.model.changed');
      };
    }, []);

  const handleDelete = () => {
    if (!selectedId) return;
    const rolePaths = {
      admin: "/admin/ap",
      fnc: "/finance/ap",
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

  const handleUpdate = (inbound) => {
    setSelectedProduct(inbound);
    setUpdateModalOpen(true);
  };
  const handleViewDetails = (inbound) => {
    setSelectedInbound(inbound);
    setDetailModalOpen(true);
  };
  

  const columns = [
    {
        accessorKey: "ap_code",
        header: "Invoice Code",
        cell: ({ row }) => (
          <div className="capitalize">{row.getValue("ap_code")}</div>
        ),
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
      accessorKey: "inbound.qty",
      header: "QTY",
      cell: ({ row }) => {
        const qty = row.original?.inbound?.qty;
        const totalQty = row.original?.total_qty;
    
        return (
          <div className="capitalize">
            {totalQty === 0 || totalQty === undefined
              ? (qty ?? "General Purchase")
              : totalQty}
          </div>
        );
      },
    },
    {
        accessorKey: "unit_price",
        header: "Unit Price",
        cell: ({ row }) => (
            <div className="capitalize">
            {
              row.original?.inbound?.inbound_code === null ||row.original?.inbound?.inbound_code === undefined
              ? row.getValue("unit_price") === null 
                ? 'General Purchase' 
                : row.getValue("unit_price") === 0 
                  ? 0 
                  : row.getValue("unit_price")
              : "Bundling Inbound"
            }
            
            </div>
        ),
    },
    {
        accessorKey: "tax",
        header: "Tax",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("tax") ? `${row.getValue("tax")} %` : 'Include'}</div>
        ),
    },
    {
        accessorKey: "total_amount",
        header: "Total Amount",
        cell: ({ row }) => (
            <div className="capitalize">Rp.{row.original?.grand_total.toLocaleString("id-ID")}</div>
        ),
    },
    {
      accessorKey: "status_payment",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status_payment");
        return (
          <div
            className={`capitalize text-center rounded-xl text-white p-2 
            ${status === "paid" ? "bg-emerald-500" :
              status === "unpaid" ? "bg-rose-500" :
              status === "schedule" ? "bg-amber-400" :
              status === "overdue" ? "bg-red-700" :
              status === "processing" ? "bg-blue-500" :
              status === "draft" ? "bg-gray-500" :
              status === "canceled" ? "bg-gray-700" :
              "bg-lime-400"}`
            }
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
        const isPaid = item.status_payment === "paid";
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
              <DropdownMenuItem
                onClick={() => {
                  navigator.clipboard.writeText(item.ap_code);
                  toast.success("Invoice code copied!");
                }}
                className="cursor-pointer"
              >
                <FaCopy size={16} className="text-blue-500" /> Copy Invoice Code
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {!isPaid && (
                <DropdownMenuItem onClick={() => handleUpdate(item)} className="cursor-pointer">
                  <FaEdit size={16} className="text-yellow-500"/> Update
                </DropdownMenuItem>
              )}
              <DropdownMenuItem onClick={() => handleViewDetails(item)} className="cursor-pointer">
                <FaEye size={16} className="text-green-500 "/>View details
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

  // const uniqueAPData = useMemo(() => {
  //   return Array.from(
  //     new Map(apData.map(item => [item.ap_code, item])).values()
  //   );
  // }, [apData]);

  const uniqueAPData = useMemo(() => {
    const apMap = new Map();
  
    apData.forEach(item => {
      const key = item.ap_code;
      const qty = item.inbound?.qty || 0;
      const total = item?.total_amount || 0;
  
      if (apMap.has(key)) {
        const existing = apMap.get(key);
        existing.total_qty += qty; 
        existing.grand_total += total;
      } else {
        // Clone item & tambah total_qty baru
        apMap.set(key, { ...item, total_qty: qty, grand_total: total });
      }
    });
  
    return Array.from(apMap.values());
  }, [apData]);

  // console.log(uniqueAPData)
  const table = useReactTable({
    data: uniqueAPData,
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
      <UpdateApModal
          open={updateModalOpen}
          onClose={() => setUpdateModalOpen(false)}
          inbound={selectedProduct}
          select={selectedProduct}
          productData={productData}
          userRole={userRole}
          apData={apData}
          bp={bp}
      />
      <ViewApDetailModal
        open={detailModalOpen}
        onClose={() => setDetailModalOpen(false)}
        inbound={selectedInbound}
        productData={productData}
        apData={apData} 
        bp={bp}
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
            placeholder="Search by Invoice Code or Other"
            value={table.getState().globalFilter || ""}
            onChange={(event) => table.setGlobalFilter(event.target.value)}
            className="max-w-xs"
          />
        </div>
        <ButtonModalAp inbound={selectedProduct}
          productData={productData}
          userRole={userRole}
          apData={apData}
          bp={bp} />
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