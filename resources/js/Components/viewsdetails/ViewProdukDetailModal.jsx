import React from "react";
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

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[500px] md:max-w-[600px] overflow-y-auto border border-gray-300 p-10 rounded-md custom-scrollbar">
        <DialogHeader>
          <DialogTitle>Detail Data Produk</DialogTitle>
          <DialogDescription>
            Berikut adalah detail data Produk.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 space-y-2">
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
            <strong className="min-w-[150px]">Tanggal Masuk</strong>
            <span className="mr-2">:</span>
            <span>{new Date(product?.created_at).toLocaleString("id-ID")}</span>
          </div>
        </div>
        <DialogFooter>
          <Button
            type="button"
            className="bg-gray-200 text-black border border-gray-400 mt-5 hover:bg-gray-300"
            onClick={onClose}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}