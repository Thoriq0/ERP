import React, { useEffect, useRef, useState } from "react";
import JsBarcode from "jsbarcode";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";

export function ViewProdukDetailModal({ open, onClose, product, supplierData, categoryData }) {
  const supplier = supplierData.find(sup => sup.id === product?.supplier_id);
  const category = categoryData.find(cat => cat.id === product?.category_id);

  // Ref untuk barcode
  const barcodeRef = useRef(null);
  const [barcodeKey, setBarcodeKey] = useState(0);
  // console.log(product)
  useEffect(() => {
    if (open && product?.sku) {
      setBarcodeKey(prevKey => prevKey + 1);
      setTimeout(() => {
        if (barcodeRef.current) {
          const barcodeData = `${product.sku}`;
          JsBarcode(barcodeRef.current, barcodeData, {
            format: "CODE128",
            displayValue: true,
            lineColor: "#000",
            width: 2,
            height: 50,
          });
        }
      }, 100);
    }
  }, [open, product?.sku, product?.name, supplier?.name]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[500px] max-w-[375px] md:max-w-[750px] overflow-y-auto border border-gray-300 p-5 md:p-8 rounded-md">
        <DialogHeader>
          <DialogTitle>Detail Data Produk</DialogTitle>
          <DialogDescription>
            Berikut adalah detail data Produk.
          </DialogDescription>
          <hr />
        </DialogHeader>
        <div className="mt-4 space-y-2 text-sm">
          <div className="flex">
            <strong className="min-w-[150px]">SKU</strong>
            <span className="mr-2">:</span>
            <span>{product?.sku || "Tidak Diketahui"}</span>
          </div>
          <div className="flex">
            <strong className="min-w-[150px]">Nama Product</strong>
            <span className="mr-2">:</span>
            <span>{product?.name || "Tidak Diketahui"}</span>
          </div>
          <div className="flex">
            <strong className="min-w-[150px]">Kategori Product</strong>
            <span className="mr-2">:</span>
            <span>{category?.name || "Tidak Diketahui"}</span>
          </div>
          <div className="flex">
            <strong className="min-w-[150px]">Nama Supplier</strong>
            <span className="mr-2">:</span>
            <span>{supplier?.name || "Tidak Diketahui"}</span>
          </div>
          <div className="flex">
            <strong className="min-w-[150px]">Tanggal Dibuat</strong>
            <span className="mr-2">:</span>
            <span>{new Date(product?.created_at).toLocaleString("id-ID")}</span>
          </div>

          {/* Barcode */}
          {product?.sku && (
            <div className="flex flex-col items-center mt-4 pt-3">
              <strong className="mb-2">Barcode</strong>
              <svg ref={barcodeRef} key={barcodeKey}></svg>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button
            type="button"
            className="max-w-[100px] md:w-full bg-gray-200 text-black border border-gray-400 mt-5 hover:bg-gray-300"
            onClick={onClose}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
