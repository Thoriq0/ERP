import React, { useState, useEffect } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { FiFilter } from "react-icons/fi";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
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
import toast from "react-hot-toast";
import { router } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";
import AdjustPrestockModal from "../AdjustPrestockModal";

export default function DataTablePrestock({ stagingData, userRole }) {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const { flash } = usePage().props;

  const [showAdjustModal, setShowAdjustModal] = useState(false);
  const [selectedProductsData, setSelectedProductsData] = useState([]);

  useEffect(() => {
    if (flash?.success) {
      toast.success(flash.success, { duration: 5000 });
    }
    if (flash?.error) {
      toast.error(flash.error, { duration: 5000 });
    }
  }, [flash]);

  // Handle Adjust Stock
  const handleAdjustStock = () => {
    if (selectedProducts.length === 0) {
      toast.error("No products selected!");
      return;
    }
  
    // Cek apakah produk sudah berstatus 'validated'
    const unvalidatedProducts = stagingData.filter(
      (product) => selectedProducts.includes(product.id) && product.status === "validated"
    );
    

    if (unvalidatedProducts.length > 0) {
      toast.error("Some products already validated");
      return;
    }

    const filteredProducts = stagingData
    .filter((product) => selectedProducts.includes(product.id))
    .map((product) => ({
      id: product.id,
      name: product.inbound.product?.name ?? "Unknown Product", 
      inboundId: product.inbound.id ?? 0,
    }));
  
    setSelectedProductsData(filteredProducts);
    setShowAdjustModal(true);

  }

  // Handle Transfer Stock
  const handleTransferStock = () => {
    if (selectedProducts.length === 0) {
      toast.error("No products selected!");
      return;
    }
  
    // Cek apakah ada produk yang belum berstatus 'validated'
    const unvalidatedProducts = stagingData.filter(
      (product) => selectedProducts.includes(product.id) && product.status !== "validated"
    );
    // console.log(unvalidatedProducts)
  
    if (unvalidatedProducts.length > 0) {
      toast.error("Some products have not been validated. Please validate them first!");
      return;
    }
  
    // Cek apakah ada produk yang sudah memiliki stock_status 'In Stock'
    const alreadyInStock = stagingData.filter(
      (product) => selectedProducts.includes(product.id) && product.stock_status === "In Stock"
    );
  
    if (alreadyInStock.length > 0) {
      toast.error("Some products are already in stock and cannot be transferred!");
      return;
    }
  
    // Cek apakah ada produk yang sudah memiliki status_payment 'scheduled'
    const alreadyPayment = stagingData.filter(
      (product) => selectedProducts.includes(product.id) && product.payment_status !== "paid"
    );
  
    if (alreadyPayment.length > 0) {
      toast.error("Some products have not been paid!");
      return;
    }
  
    // Mapping role endpoint
    const rolePaths = {
      admin: "/admin/validatestock",
      wrhs: "/wrhs/validatestock",
    };
  
    const userPath = rolePaths[userRole];
  
    if (!userPath) {
      toast.error("You don't have permission to validate stock!");
      return;
    }
  
    // Kirim data ke endpoint berdasarkan role
    router.post(
      userPath,
      { selected_products: selectedProducts },
      {
        onSuccess: () => {
          toast.success("Stock validation successful! 🎉", { duration: 5000 });
        },
        onError: (err) => {
          console.error(err);
          toast.error("Stock validation failed! ❌", { duration: 5000 });
        },
      }
    );
  };

  const handleValidateStock = () => {
    if (selectedProducts.length === 0) {
      toast.error("No products selected!");
      return;
    }
  
    // Ambil data lengkap berdasarkan ID
    const selectedFullData = stagingData.filter(item => selectedProducts.includes(item.id));
  
    const withInboundCode = selectedFullData.filter(item => item.inbound?.inbound_code);
    const withoutInboundCode = selectedFullData.filter(item => !item.inbound?.inbound_code);
  
    if (withoutInboundCode.length > 0) {
      // toast.error("Some selected items don't have an inbound code. They will be ignored.");
    }
  
    const selectedCodes = withInboundCode.map(item => item.inbound.inbound_code);
    const uniqueCodes = [...new Set(selectedCodes)];
  
    for (let code of uniqueCodes) {
      const allWithCode = stagingData.filter(item => item.inbound?.inbound_code === code);
      const selectedWithCode = withInboundCode.filter(item => item.inbound?.inbound_code === code);
  
      if (selectedWithCode.length < allWithCode.length) {
        toast.error(`Please select all data with inbound code: ${code}`);
        return; // STOP di sini
      }
    }
  
    // Mapping role endpoint
    const rolePaths = {
      admin: "/admin/qcstock",
      wrhs: "/wrhs/qcstock",
    };
  
    const userPath = rolePaths[userRole];
  
    if (!userPath) {
      toast.error("You don't have permission to validate stock!");
      return;
    }
  
    // Kalau semua aman, lanjut kirim ID doang
    const idsToSend = selectedFullData.map(item => item.id);
  
    router.post(
      userPath,
      { selected_products: idsToSend },
      {
        onError: (err) => {
          console.error(err);
          toast.error("Validation failed!");
        },
        onSuccess: () => {
          // toast.success("Validation success!");
        }
      }
    );
  };
  


  const columns = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => {
            table.toggleAllPageRowsSelected(!!value);
            setSelectedProducts(value ? stagingData.map((row) => row.id) : []);
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
      accessorKey: "inbound.product.name",
      header: "Product Name",
      cell: ({ row }) => (
        <div className="capitalize">
          {row.original.inbound?.product?.name || "Unknown"}
        </div>
      ),
    },
    {
      accessorKey: "inbound.product.name",
      header: "Inbound Code",
      cell: ({ row }) => (
        <div className="capitalize">
          {
            row.original.inbound?.inbound_code === null || row.original.inbound?.inbound_code === 0
            ? "Single Inbound"
            : row.original.inbound?.inbound_code
          }
        </div>
      ),
    },
    {
      accessorKey: "inbound.qty",
      header: "QTY",
      cell: ({ row }) => (
        <div className="capitalize">{row.original.inbound?.qty ?? "N/A"}</div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status");
        return (
          <div
            className={`capitalize text-center rounded-xl text-white p-2 ${
              status === "validating" ? "bg-[#FFC107]" : "bg-[#28A745]"
            }`}
          >
            {status ?? "N/A"}
          </div>
        );
      },
    },
    
    // {
    //   accessorKey: "inbound.product.category.name",
    //   header: "Category",
    //   cell: ({ row }) => (
    //     <div className="capitalize">
    //       {row.original.inbound?.product?.category?.name || "Unknown"}
    //     </div>
    //   ),
    // },
    {
      accessorKey: "inbound.product.supplier.name",
      header: "Supplier",
      cell: ({ row }) => (
        <div className="capitalize">
          {row.original.inbound?.product?.supplier?.name || "Unknown"}
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
      accessorKey: "payment_status",
      header: "Payment",
      cell: ({ row }) => {
        const status = row.getValue("payment_status");
        return (
          <div
            className={`capitalize text-center rounded-xl text-white p-2 ${
              status === "unpaid" ? "bg-[#e55353]" : status === "paid" ? "bg-[#3ac66c]": "bg-[#ebb523]"
            }`}
          >
            {status ?? "N/A"}
          </div>
        );
      },
    },
    {
      accessorKey: "stock_status",
      header: "Stock",
      cell: ({ row }) => {
        const status = row.getValue("stock_status");
        return (
          <div
            className={`capitalize text-center rounded-xl text-white p-2 ${
              status === "On Hold" ? "bg-[#ffcb3b]" : "bg-[#3ac66c]"
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
    data: stagingData,
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
              <Button
                variant="outline"
                className="border-solid border-2 border-primaryPurple"
              >
                <FiFilter size={24} />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Input
            placeholder="Search by Name, Date In"
            value={table.getState().globalFilter || ""}
            onChange={(event) => table.setGlobalFilter(event.target.value)}
            className="max-w-xs"
          />
        </div>
        <div className="flex space-x-2">
          <Button className="bg-orange-400 hover:bg-orange-500" onClick={handleAdjustStock}>
            Fail QTY
          </Button>
          <Button className="bg-green-400 hover:bg-green-500" onClick={handleValidateStock}>
            Validate Stock
          </Button>
          <Button className="bg-indigo-400 hover:bg-indigo-500" onClick={handleTransferStock}>
            Transfer Stock
          </Button>
          
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader className="bg-gray-200 text-black">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
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
      {showAdjustModal && (
        <AdjustPrestockModal
          products={selectedProductsData}
          // productName={}
          onClose={() => setShowAdjustModal(false)}
          userRole={userRole}
        />
      )}
    </div>
  );
}
