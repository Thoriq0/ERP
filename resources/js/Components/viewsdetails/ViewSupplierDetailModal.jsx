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

export function ViewSupplierDetailModal({ open, onClose, supplier }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[500px] md:max-w-[600px] overflow-y-auto border border-gray-300 p-10 rounded-md custom-scrollbar">
        <DialogHeader>
          <DialogTitle>Detail Data Supplier</DialogTitle>
          <DialogDescription>
            Berikut adalah detail data Supplier.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 space-y-2">
          <div className="flex">
            <strong className="min-w-[150px]">Nama Supplier</strong>
            <span className="mr-2">:</span>
            <span>{supplier?.name || "Tidak Diketahui"}</span>
          </div>
          <div className="flex">
            <strong className="min-w-[150px]">Contact Supplier</strong>
            <span className="mr-2">:</span>
            <span>{supplier?.contact || "Tidak Diketahui"}</span>
          </div>
          <div className="flex">
            <strong className="min-w-[150px]">Alamat Supplier</strong>
            <span className="mr-2">:</span>
            <span>{supplier?.address || "Tidak Diketahui"}</span>
          </div>
          <div className="flex">
            <strong className="min-w-[150px]">Rekening Bank</strong>
            <span className="mr-2">:</span>
            <span>{supplier?.account_number || "Tidak Diketahui"}</span>
          </div>
          <div className="flex">
            <strong className="min-w-[150px]">A/N Rekening</strong>
            <span className="mr-2">:</span>
            <span>{supplier?.account_name || "Tidak Diketahui"}</span>
          </div>
          <div className="flex">
            <strong className="min-w-[150px]">Nama Bank</strong>
            <span className="mr-2">:</span>
            <span>{supplier?.account_bank_name || "Tidak Diketahui"}</span>
          </div>
          <div className="flex">
            <strong className="min-w-[150px]">Tanggal Dibuat</strong>
            <span className="mr-2">:</span>
            <span>{new Date(supplier?.created_at).toLocaleString("id-ID")}</span>
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