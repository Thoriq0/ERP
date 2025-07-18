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

export function ViewStokDetailModal({ open, onClose, stock, adjust }) {
  console.log(adjust)
  const adjustmentLogs = adjust.filter(
    (item) => item.product_id === stock?.product?.id
  );

  const groupedAdjustments = adjustmentLogs.reduce((acc, item) => {
    const status = item.status;
    acc[status] = (acc[status] || 0) + item.qty;
    return acc;
  }, {});

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[500px] max-w-[375px] md:max-w-[750px] overflow-y-auto border border-gray-300 p-8 md:p-10 rounded-md custom-scrollbar">
        <DialogHeader>
          <DialogTitle>Detail Data Stok</DialogTitle>
          <DialogDescription>
            Berikut adalah detail data stok.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 space-y-2">
          <div className="flex">
            <strong className="min-w-[150px]">Nama Product</strong>
            <span className="mr-2">:</span>
            <span>{stock?.product?.name || "Tidak Diketahui"}</span>
          </div>
          <div className="flex">
            <strong className="min-w-[150px]">Jumlah Product</strong>
            <span className="mr-2">:</span>
            <span>{stock?.qty || "Tidak Diketahui"}</span>
          </div>
          <div className="flex">
            <strong className="min-w-[150px]">Nama Supplier</strong>
            <span className="mr-2">:</span>
            <span>{stock?.product?.supplier?.name || "Tidak Diketahui"}</span>
          </div>
          <div className="flex">
            <strong className="min-w-[150px]">Category Product</strong>
            <span className="mr-2">:</span>
            <span>{stock?.product?.category?.name || "Tidak Diketahui"}</span>
          </div>
          <div className="flex">
            <strong className="min-w-[150px]">Warehouse</strong>
            <span className="mr-2">:</span>
            <span>{stock?.warehouse || "Tidak Diketahui"}</span>
          </div>
          <div className="flex">
            <strong className="min-w-[150px]">Last Update</strong>
            <span className="mr-2">:</span>
            <span>{new Date(stock?.created_at).toLocaleString("id-ID")}</span>
          </div>
          <div className="mt-6">
            <h4 className="font-semibold mb-2">Log Penyesuaian Stok:</h4>
            {Object.keys(groupedAdjustments).length === 0 ? (
              <p className="text-sm text-gray-500">Belum ada penyesuaian stok.</p>
            ) : (
              <ul className="list-disc ml-5 text-sm space-y-1">
                {Object.entries(groupedAdjustments).map(([status, qty]) => (
                  <li key={status}>
                    <strong className="capitalize">{status}</strong>: {qty}
                  </li>
                ))}
              </ul>
            )}
          </div>
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