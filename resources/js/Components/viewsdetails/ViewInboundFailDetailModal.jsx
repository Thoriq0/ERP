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

export function ViewInboundFailDetailModal({ open, onClose, inbndf }) {
  
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[500px] max-w-[375px] md:max-w-[750px] overflow-y-auto border border-gray-300 p-8 md:p-10 rounded-md">
        <DialogHeader>
          <DialogTitle>Pre-stock Adjustment Details</DialogTitle>
          <DialogDescription>
            Below are the details of the pre-stock adjustment.
          </DialogDescription>
          <hr />
        </DialogHeader>
        <div className="mt-4 space-y-2">

          <div className="flex">
            <strong className="min-w-[150px]">Product Name</strong>
            <span className="mr-2">:</span>
            <span>{inbndf?.inbound?.product?.name || "Tidak Diketahui"}</span>
          </div>

          <div className="flex">
            <strong className="min-w-[150px]">Adjusted Quantity</strong>
            <span className="mr-2">:</span>
            <span>{inbndf?.adjust_qty|| "Tidak Diketahui"}</span>
          </div>

          <div className="flex">
            <strong className="min-w-[150px]">Product Supplier</strong>
            <span className="mr-2">:</span>
            <span>{inbndf?.inbound?.product?.supplier?.name || "Tidak Diketahui"}</span>
          </div>

          <div className="flex">
            <strong className="min-w-[150px]">Supplier Contact</strong>
            <span className="mr-2">:</span>
            <span>{inbndf?.inbound?.product?.supplier?.contact || "Tidak Diketahui"}</span>
          </div>

          <div className="flex">
            <strong className="min-w-[150px]">Inbound Status</strong>
            <span className="mr-2">:</span>
            <span>{inbndf?.inbound?.qc_status || "Tidak Diketahui"}</span>
          </div>

          <div className="flex">
            <strong className="min-w-[150px]">Supplier Address</strong>
            <span className="mr-2">:</span>
            <span>{inbndf?.inbound?.product?.supplier?.address || "Tidak Diketahui"}</span>
          </div>

          <div className="flex">
            <strong className="min-w-[150px]">Note</strong>
            <span className="mr-2">:</span>
            <span>{inbndf?.note}</span>
          </div>

          <div className="flex">
            <strong className="min-w-[150px]">Adjustment Date</strong>
            <span className="mr-2">:</span>
            <span>{new Date(inbndf?.created_at).toLocaleString("id-ID")}</span>
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