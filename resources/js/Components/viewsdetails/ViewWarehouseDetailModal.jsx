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

export function ViewWarehouseDetailModal({ open, onClose, warehouse }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[500px] max-w-[375px] md:max-w-[750px] overflow-y-auto border border-gray-300 p-8 md:p-10 rounded-md">
        <DialogHeader>
          <DialogTitle>Detail Data warehouse</DialogTitle>
          <DialogDescription>
            Berikut adalah detail data warehouse.
          </DialogDescription>
          <hr />
        </DialogHeader>
        <div className="mt-4 space-y-2">
          <div className="flex">
            <strong className="min-w-[150px]">Nama warehouse</strong>
            <span className="mr-2">:</span>
            <span>{warehouse?.name || "Tidak Diketahui"}</span>
          </div>


          <div className="flex">
            <strong className="min-w-[150px]">Tanggal Dibuat</strong>
            <span className="mr-2">:</span>
            <span>{new Date(warehouse?.created_at).toLocaleString("id-ID")}</span>
          </div>

          <div className="flex">
            <strong className="min-w-[150px]">Location</strong>
            <span className="mr-2">:</span>
            <span>{warehouse?.location || "Tidak Diketahui"}</span>
          </div>

          <div className="flex">
            <strong className="min-w-[150px]">Alamat</strong>
            <span className="mr-2">:</span>
            <span>{warehouse?.address || "Tidak Diketahui"}</span>
          </div>

          <div className="flex">
            <strong className="min-w-[150px]">Nama Operator</strong>
            <span className="mr-2">:</span>
            <span>{warehouse?.operator || "Tidak Diketahui"}</span>
          </div>

          <div className="flex">
            <strong className="min-w-[150px]">Contact</strong>
            <span className="mr-2">:</span>
            <span>{warehouse?.contact || "Tidak Diketahui"}</span>
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