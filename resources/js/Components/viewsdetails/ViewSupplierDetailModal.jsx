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
      <DialogContent className="max-h-[500px] max-w-[375px] md:max-w-[750px] overflow-y-auto border border-gray-300 p-7 md:p-10 rounded-md">
        <DialogHeader>
        <DialogTitle>Supplier Details</DialogTitle>
        <DialogDescription>
          Below are the details of the supplier.
        </DialogDescription>
          <hr />
        </DialogHeader>
        <div className="mt-4 space-y-2">
          <div className="flex">
            <strong className="min-w-[180px]">Supplier Name</strong>
            <span className="mr-2">:</span>
            <span>{supplier?.name || "Tidak Diketahui"}</span>
          </div>
          <div className="flex">
            <strong className="min-w-[180px]">Contact Supplier</strong>
            <span className="mr-2">:</span>
            <span>{supplier?.contact || "Tidak Diketahui"}</span>
          </div>
          <div className="flex">
            <strong className="min-w-[180px]">Address</strong>
            <span className="mr-2">:</span>
            <span>{supplier?.address || "Tidak Diketahui"}</span>
          </div>
          <div className="flex">
            <strong className="min-w-[180px]">Bank Account Number</strong>
            <span className="mr-2">:</span>
            <span>{supplier?.account_number || "Tidak Diketahui"}</span>
          </div>
          <div className="flex">
            <strong className="min-w-[180px]">Account Holder Name</strong>
            <span className="mr-2">:</span>
            <span>{supplier?.account_name || "Tidak Diketahui"}</span>
          </div>
          <div className="flex">
            <strong className="min-w-[180px]">Bank Name</strong>
            <span className="mr-2">:</span>
            <span>{supplier?.account_bank_name || "Tidak Diketahui"}</span>
          </div>
          <div className="flex">
            <strong className="min-w-[180px]">Created At</strong>
            <span className="mr-2">:</span>
            <span>{new Date(supplier?.created_at).toLocaleString("id-ID")}</span>
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