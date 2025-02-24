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

export function ViewInboundDetailModal({ open, onClose, inbound, productData }) {

  const product = productData.find(prod => prod.id === inbound?.product_id);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[500px] md:max-w-[600px] overflow-y-auto border border-gray-300 p-10 rounded-md custom-scrollbar">
        <DialogHeader>
          <DialogTitle>Detail Data Inbound</DialogTitle>
          <DialogDescription>
            Berikut adalah detail data inbound.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 space-y-2">
          <div className="flex">
            <strong className="min-w-[150px]">Nama Product</strong>
            <span className="mr-2">:</span>
            <span>{product?.name || "Tidak Diketahui"}</span>
          </div>
          <div className="flex">
            <strong className="min-w-[150px]">Jumlah Product</strong>
            <span className="mr-2">:</span>
            <span>{inbound?.qty || "Tidak Diketahui"}</span>
          </div>
          <div className="flex">
            <strong className="min-w-[150px]">Penerima</strong>
            <span className="mr-2">:</span>
            <span>{inbound?.pic || "Tidak Diketahui"}</span>
          </div>
          <div className="flex">
            <strong className="min-w-[150px]">Nama Supplier</strong>
            <span className="mr-2">:</span>
            <span>{product?.supplier?.name || "Tidak Diketahui"}</span>
          </div>
          <div className="flex">
            <strong className="min-w-[150px]">Category Product</strong>
            <span className="mr-2">:</span>
            <span>{product?.category?.name || "Tidak Diketahui"}</span>
          </div>
          <div className="flex">
            <strong className="min-w-[150px]">PIC</strong>
            <span className="mr-2">:</span>
            <span>{inbound?.pic || "Tidak Diketahui"}</span>
          </div>
          <div className="flex">
            <strong className="min-w-[150px]">Tanggal Masuk</strong>
            <span className="mr-2">:</span>
            <span>{new Date(inbound?.created_at).toLocaleString("id-ID")}</span>
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