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
import { FaCopy, FaEdit, FaEye, FaTrash } from "react-icons/fa";
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
import { ButtonModalProduct } from "@/Components/ButtonModalProduct";
import { ButtonDialogDelete } from "../ButtonDialogDelete";
import { UpdateProductModal } from "../update/UpdateProductModal";
import { ViewProdukDetailModal } from "../viewsdetails/ViewProdukDetailModal";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { router } from "@inertiajs/react";
import toast from "react-hot-toast";
import echo from "@/echo";

export function DataTableProduct({ data, userRole, categoryData, supplierData }) {
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  // state & select data product dan modal
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // State untuk modal detail
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedProduk, setSelectedProduk] = useState(null);

  useEffect(() => {
    const channel = echo.channel('models');

    channel.listen('.model.changed', (e) => {
      if (e.model === 'product') {
        setTimeout(() => {
                    router.reload({ only: ['product'], preserveScroll: true });
                }, 1700);
      } 
      else if (e.model === 'category') {
        setTimeout(() => {
          router.reload({ only: ['categories'], preserveScroll: true });
                }, 1700);
      }
      else if (e.model === 'supplier') {
        setTimeout(() => {
          router.reload({ only: ['suppliers'], preserveScroll: true });
                }, 1700);
      }
    });

    return () => {
      channel.stopListening('.model.changed');
    };
  }, []);

  const handleDelete = () => {
    if (!selectedId) return;

    // Mapping role endpoint
    const rolePaths = {
      admin: "/admin/product",
      wrhs: "/wrhs/product",
    };
    
    const userPath = rolePaths[userRole];

    router.delete(`${userPath}/${selectedId}`, {
      onSuccess: () => {
        toast.success("Product successfully deleted! 🗑️", { duration: 5000 });
      },
      onError: (err) => {
        console.error(err);
        toast.error("Failed to delete product data!❌", { duration: 5000 });
      },
    });
    setOpen(false);
  };

  function handleExport() {
    const rolePaths = {
      admin: "/admin/product/export",
      wrhs: "/wrhs/product/export",
    };
  
    const userExportPath = rolePaths[userRole];
  
    if (!userExportPath) {
      toast.error("Role tidak valid! ❌");
      return;
    }
  
    window.location.href = userExportPath;
  }

  const handleUpdate = (product) => {
    setSelectedProduct(product);
    setUpdateModalOpen(true);
  };

  // handle views details
  const handleViewDetails = (product) => {
    setSelectedProduk(product);
    setDetailModalOpen(true);
  };

  const columns = [
    {
      id: "no",
      header: () => <div className="text-center">No</div>,
      cell: ({ row }) => (
        <div className="text-center">{row.index + 1}</div>
      ),
    },
    {
      accessorKey: "sku",
      header: "SKU",
      cell: ({ row }) => <div className="capitalize">{row.getValue("sku")}</div>,
    },
    {
      accessorKey: "name",
      header: "Product Name",
      cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
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
      accessorKey: "category_id",
      header: "Category",
      cell: ({ row }) => {
        const category = categoryData.find(cat => cat.id === row.getValue("category_id"));
        return <div className="capitalize">{category ? category.name : "Unknown"}</div>;
      },
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
      id: "actions",
      header: "Action",
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
            <DropdownMenuContent align="end" className="cursor-pointer">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => {
                navigator.clipboard.writeText(item.sku) 
                toast.success('SKU Copied! ')
                }} className="cursor-pointer">
                <FaCopy size={16} className="text-blue-500"/>Copy SKU Product
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleUpdate(item)} className="cursor-pointer">
                <FaEdit size={16} className="text-yellow-500"/>Update
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleViewDetails(item)} className="cursor-pointer">
                <FaEye size={16} className="text-green-500"/>View details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => { setSelectedId(item.id); setOpen(true); }} className="cursor-pointer">
                <FaTrash size={16} className="text-red-500"/>Delete
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
      <UpdateProductModal
        open={updateModalOpen}
        onClose={() => setUpdateModalOpen(false)}
        product={selectedProduct}
        categoryData={categoryData}
        supplierData={supplierData}
        userRole={userRole}
      />
      <ViewProdukDetailModal
        open={detailModalOpen}
        onClose={() => setDetailModalOpen(false)}
        product={selectedProduk}
        categoryData={categoryData}
        supplierData={supplierData}
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
            placeholder="Search by Product Name, SKU or Other"
            value={table.getState().globalFilter || ""}
            onChange={(event) => table.setGlobalFilter(event.target.value)}
            className="max-w-xs"
          />
        </div>
        <div className="flex  space-x-2">
                <Button className="bg-green-400 hover:bg-green-500" onClick={handleExport}>Export</Button>
                <ButtonModalProduct userRole={userRole} categoryData={categoryData} supplierData={supplierData} />
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

export default DataTableProduct;